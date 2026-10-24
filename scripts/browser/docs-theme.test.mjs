import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { extname, resolve, sep } from 'node:path'
import { after, before, describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium, devices } from 'playwright'

const root = fileURLToPath(new URL('../../', import.meta.url))
const themes = [
  { label: '默认暗色', value: 'darkTheme', dark: true },
  { label: '默认亮色', value: 'lightTheme', dark: false },
  { label: '枫叶暗色', value: 'mapleDarkTheme', dark: true },
  { label: '枫叶亮色', value: 'mapleLightTheme', dark: false },
]
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
}

async function highlightedState(page, dark) {
  await page.waitForFunction((dark) => {
    const blocks = document.querySelectorAll('.mp-code pre.shiki')
    return (
      blocks.length >= 4 &&
      blocks[0].classList.contains(dark ? 'vitesse-dark' : 'vitesse-light') &&
      blocks[2].classList.contains(dark ? 'github-dark' : 'github-light') &&
      blocks[3].classList.contains(dark ? 'vitesse-dark' : 'vitesse-light')
    )
  }, dark)
  // Wait for the site's background transition, without a fixed sleep.
  await page.evaluate(() => Promise.all(document.body.getAnimations().map((animation) => animation.finished)))
  const state = await page.evaluate(() => ({
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    colorScheme: getComputedStyle(document.documentElement).colorScheme,
    background: getComputedStyle(document.body).backgroundColor,
    code: [...document.querySelectorAll('.mp-code')].slice(0, 4).map((element) => {
      const pre = element.querySelector('pre')
      return {
        text: pre.textContent,
        theme: pre.className,
        background: getComputedStyle(pre).backgroundColor,
        colors: [...new Set([...pre.querySelectorAll('span[style]')].map((span) => getComputedStyle(span).color))],
        width: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }
    }),
  }))
  assert.equal(state.documentWidth, state.width, 'page must fit the phone viewport')
  assert.equal(state.colorScheme, dark ? 'dark' : 'light')
  const background = state.background.match(/\d+/g).slice(0, 3).map(Number)
  assert.equal(background.reduce((sum, channel) => sum + channel, 0) < 384, dark, 'page background follows theme')
  assert.match(state.code[0].text, /console\.log\('Hello Maple UI'\)/)
  assert.match(state.code[1].text, /print\('Hello Maple UI'\)/)
  for (const code of state.code) {
    assert.ok(code.colors.length >= 3, 'syntax tokens must be colored')
    assert.ok(code.scrollWidth <= code.width, 'code must fit or wrap within its container')
    const rgb = code.background.match(/\d+/g).slice(0, 3).map(Number)
    assert.equal(rgb.reduce((sum, channel) => sum + channel, 0) < 384, dark, 'code background follows theme')
  }
  return state
}

async function sourceState(page) {
  await page.getByRole('button', { name: '展开源码', exact: true }).first().click()
  const source = page.locator('.loca-doc-preview').first().locator('pre.hljs')
  await source.waitFor({ state: 'visible' })
  const state = await source.evaluate((element) => ({
    text: element.textContent,
    background: getComputedStyle(element).backgroundColor,
    colors: [...new Set([...element.querySelectorAll('span')].map((span) => getComputedStyle(span).color))],
    pageWidth: document.documentElement.scrollWidth,
  }))
  assert.match(state.text, /mp-highlighter-provider/)
  assert.match(state.text, /onThemeChange/)
  assert.ok(state.colors.length >= 3, 'expanded Vue source must be highlighted')
  assert.equal(state.pageWidth, page.viewportSize().width)
  return state
}

// Tests exercise the production site, not mocked highlighter output. A private
// snapshot prevents another build from replacing chunks during a test run.
describe('phone-width documentation theme regression', { timeout: 600_000 }, () => {
  let browser
  let server
  let directory
  let origin

  before(
    async () => {
      await readFile(resolve(root, 'packages/maple-ui/site/mobile.html')).catch(() => {
        throw new Error('Build the production docs first: pnpm build:doc')
      })
      directory = await mkdtemp(resolve(tmpdir(), 'maple-docs-theme-'))
      await cp(resolve(root, 'packages/maple-ui/site'), directory, { recursive: true })
      server = createServer(async (request, response) => {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
        const file = resolve(directory, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`)
        if (!file.startsWith(`${directory}${sep}`)) {
          response.writeHead(403).end()
          return
        }
        try {
          const body = await readFile(file)
          response.writeHead(200, { 'content-type': contentTypes[extname(file)] ?? 'application/octet-stream' })
          response.end(body)
        } catch {
          response.writeHead(404).end()
        }
      })
      await new Promise((resolve, reject) => {
        server.once('error', reject)
        server.listen(0, '127.0.0.1', resolve)
      })
      origin = `http://127.0.0.1:${server.address().port}`
      browser = await chromium.launch()
    },
    { timeout: 120_000 },
  )

  after(async () => {
    await browser?.close()
    if (server?.listening) {
      server.closeAllConnections()
      await new Promise((resolve) => server.close(resolve))
    }
    if (directory) {
      await rm(directory, { recursive: true, force: true })
    }
  })

  for (const surface of ['example', 'documentation']) {
    for (const width of [320, 375, 390]) {
      it(
        `${surface} at ${width}px: live highlighting and theme persistence across reload`,
        { timeout: 120_000 },
        async () => {
          const demo = surface === 'example'
          const scope = demo ? 'MAPLE_V3_THEME_DEMO' : 'MAPLE_V3_THEME'
          const context = await browser.newContext({
            ...(demo ? devices['iPhone 13'] : {}),
            viewport: { width, height: 844 },
            colorScheme: 'light',
            // Opposite saved scopes expose a demo accidentally reading the site theme.
            storageState: {
              cookies: [],
              origins: [
                {
                  origin,
                  localStorage: [
                    { name: 'MAPLE_V3_THEME', value: 'lightTheme' },
                    { name: 'MAPLE_V3_THEME_DEMO', value: 'darkTheme' },
                  ],
                },
              ],
            },
          })
          try {
            // Analytics is unrelated to local docs and must not make CI depend on an external server.
            await context.route('https://hm.baidu.com/**', (route) =>
              route.fulfill({ contentType: 'text/javascript', body: '' }),
            )
            const page = await context.newPage()
            const failures = []
            const wasmRequests = []
            page.on('pageerror', (error) => failures.push(error.message))
            page.on('requestfailed', (request) => {
              if (request.url().startsWith(origin)) {
                failures.push(`${request.url()}: ${request.failure()?.errorText}`)
              }
            })
            page.on('response', (response) => {
              if (response.url().startsWith(origin) && response.status() >= 400) {
                failures.push(`${response.status()}: ${response.url()}`)
              }
              if (
                response.url().startsWith(origin) &&
                response.url().endsWith('.wasm') &&
                response.request().frame() === page.mainFrame()
              ) {
                wasmRequests.push(response.url())
              }
            })
            await page.goto(`${origin}/${demo ? 'mobile.html#/code?language=zh-CN' : '#/zh-CN/code'}`)
            await highlightedState(page, demo)
            assert.equal(wasmRequests.length, 1)

            for (const theme of themes) {
              if (demo) {
                await page.locator('.theme-button').click()
                await page.locator('.mobile-theme-cell').filter({ hasText: theme.label }).click()
              } else {
                // The docs header hides this control below 562px. Use its real UI,
                // then restore the phone width for assertions and the full reload.
                await page.setViewportSize({ width: 800, height: 844 })
                await page.locator('.maple-site-header__theme').hover()
                await page.locator('.maple-site-header__theme .mp-cell').filter({ hasText: theme.label }).click()
                await page.setViewportSize({ width, height: 844 })
              }
              const switched = await highlightedState(page, theme.dark)
              const beforeReload = wasmRequests.length
              assert.equal(beforeReload, themes.indexOf(theme) + 1, 'theme switches reuse the loaded WASM')
              let source
              if (!demo) {
                source = await sourceState(page)
                assert.ok((await page.locator('table').count()) >= 4, 'Markdown API tables remain rendered')
              }
              assert.equal(await page.evaluate((key) => localStorage.getItem(key), scope), theme.value)
              await page.reload()
              assert.deepEqual(
                await highlightedState(page, theme.dark),
                switched,
                'reload must retain theme and token colors',
              )
              assert.equal(wasmRequests.length, beforeReload + 1, 'each document loads its WASM only once')
              if (demo) {
                await page.locator('.theme-button').click()
                assert.equal(await page.locator('.mobile-theme-cell--active').innerText(), theme.label)
                await page.locator('.mobile-theme-cell--active').click()
              } else {
                assert.deepEqual(await sourceState(page), source, 'expanded source colors survive reload')
                await page.getByRole('button', { name: '收起源码', exact: true }).first().click()
              }
            }
            assert.deepEqual(failures, [], 'no script exceptions or failed local assets')
          } finally {
            await context.close()
          }
        },
      )
    }
  }
})
