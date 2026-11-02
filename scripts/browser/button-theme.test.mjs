import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { extname, resolve, sep } from 'node:path'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { copyProductionSnapshot } from '../../../design-ui/browser/snapshot.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
let browser
let server
let directory
let origin
before(
  async () => {
    directory = await mkdtemp(resolve(tmpdir(), 'maple-button-theme-'))
    await copyProductionSnapshot(resolve(root, 'packages/maple-ui/site'), directory)
    server = createServer(async (req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const file = resolve(directory, `.${pathname === '/' ? '/index.html' : pathname}`)
      if (!file.startsWith(`${directory}${sep}`)) {
        return res.writeHead(403).end()
      }
      try {
        const contents = await readFile(file)
        const type = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'text/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.wasm': 'application/wasm',
          '.svg': 'image/svg+xml',
        }[extname(file)]
        res.writeHead(200, { 'Content-Type': type || 'application/octet-stream' }).end(contents)
      } catch {
        res.writeHead(404).end()
      }
    })
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    origin = `http://127.0.0.1:${server.address().port}`
    browser = await chromium.launch()
  },
  { timeout: 60000 },
)
after(async () => {
  await browser?.close()
  server?.closeAllConnections()
  if (server?.listening) {
    await new Promise((resolve) => server.close(resolve))
  }
  if (directory) {
    await rm(directory, { recursive: true, force: true })
  }
})
function sample(el) {
  const rgba = (value) => {
    const parts = value.match(/[\d.]+/g)?.map(Number) || []
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] ?? 1]
  }
  const over = (fg, bg) => fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]))
  const layers = []
  for (let n = el; n; n = n.parentElement) {
    layers.push(rgba(getComputedStyle(n).backgroundColor))
  }
  let background = layers.reverse().reduce((bg, fg) => over(fg, bg), [255, 255, 255])
  const overlay = el.querySelector('.mp-hover-overlay')
  if (overlay) {
    const style = getComputedStyle(overlay)
    const layer = rgba(style.backgroundColor)
    layer[3] *= Number(style.opacity)
    background = over(layer, background)
  }
  const foreground = over(rgba(getComputedStyle(el).color), background)
  const lum = (color) =>
    color
      .map((v) => {
        v /= 255
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
      })
      .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0)
  const a = lum(foreground),
    b = lum(background)
  return { color: getComputedStyle(el).color, background, contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
}
const surfaces = [
  ['light', 'White / 白色', 'rgb(255, 255, 255)'],
  ['muted', 'Light gray / 浅灰', 'rgb(245, 245, 245)'],
  ['dark', 'Dark gray / 深灰', 'rgb(37, 37, 37)'],
  ['navy', 'Navy / 深蓝', 'rgb(23, 34, 75)'],
]
const brandStatuses = ['primary', 'secondary', 'tertiary']
function foreground(mode, status, variant) {
  if (variant === 'default') {
    return mode === 'light' ? 'rgb(23, 34, 75)' : 'rgb(17, 22, 37)'
  }
  if (status === 'primary') {
    return 'rgb(234, 255, 104)'
  }
  if (status === 'secondary') {
    return mode === 'light' ? 'rgb(23, 34, 75)' : 'rgb(235, 238, 255)'
  }
  return mode === 'light' ? 'rgb(154, 137, 235)' : 'rgb(197, 184, 255)'
}
function readableScene(mode, status, variant, surface) {
  const darkSurface = ['navy', 'dark'].includes(surface)
  if (status === 'secondary') {
    if (mode === 'dark' && ['default', 'tonal'].includes(variant)) {
      return true
    }
    return mode === 'dark' ? darkSurface : !darkSurface
  }
  return ['default', 'tonal'].includes(variant) || darkSurface
}
async function switchSurface(page, selector, panel, surface) {
  const [key, label, color] = surface
  if ((await selector.getAttribute('role')) === 'radiogroup') {
    await selector.getByText(label, { exact: true }).click()
  } else {
    await selector.click()
    await page.getByRole('option', { name: label, exact: true }).click()
    await page.keyboard.press('Escape')
  }
  const attribute = (await panel.getAttribute('data-surface')) === null ? 'data-background' : 'data-surface'
  assert.equal(await panel.getAttribute(attribute), key)
  await page.waitForFunction(
    ({ selector, color }) => getComputedStyle(document.querySelector(selector)).backgroundColor === color,
    {
      selector:
        attribute === 'data-surface' ? '.firefly-button-scenes__panel' : '.button-variant-card .mp-card__floater',
      color,
    },
  )
}
async function sampleStates(page, button, metadata, results) {
  await page.mouse.move(0, 0)
  results.push({ ...metadata, state: 'rest', ...(await button.evaluate(sample)) })
  await button.hover()
  results.push({ ...metadata, state: 'hover', ...(await button.evaluate(sample)) })
  await page.mouse.down()
  results.push({ ...metadata, state: 'active', ...(await button.evaluate(sample)) })
  await page.mouse.up()
  await page.mouse.move(0, 0)
}
async function checkRole(button, mode, status, variant) {
  assert.equal(await button.evaluate((el) => getComputedStyle(el).color), foreground(mode, status, variant))
  const background = await button.evaluate((el) => getComputedStyle(el).backgroundColor)
  if (['text', 'outline'].includes(variant)) {
    assert.equal(background, 'rgba(0, 0, 0, 0)')
  }
  if (variant === 'default') {
    const expected = {
      primary: 'rgb(234, 255, 104)',
      secondary: mode === 'light' ? 'rgba(23, 34, 75, 0.08)' : 'rgb(189, 197, 223)',
      tertiary: 'rgb(207, 199, 255)',
    }
    assert.equal(background, expected[status])
  }
}
const disableTransitions = {
  content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
}
for (const mode of ['light', 'dark']) {
  test(
    `Firefly ${mode}: Horo roles, transparent variants, card surfaces and violet interactions`,
    { timeout: 180000 },
    async () => {
      const context = await browser.newContext({ viewport: { width: 1200, height: 1000 }, reducedMotion: 'reduce' })
      try {
        await context.addInitScript(
          (theme) => {
            localStorage.setItem('MAPLE_V3_THEME', theme)
            localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
          },
          mode === 'dark' ? 'fireflyDarkTheme' : 'fireflyLightTheme',
        )
        const page = await context.newPage()
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        await page.goto(origin + '/#/zh-CN/button')
        const selector = page.getByRole('radiogroup', { name: 'Button variant', exact: true })
        await selector.waitFor()
        await page.addStyleTag(disableTransitions)
        const demo = selector.locator('xpath=ancestor::div[contains(@class,"mp-space")][last()]')
        const card = demo.locator('.button-variant-card')
        const backgroundSelector = page.getByRole('radiogroup', { name: 'Button background', exact: true })
        for (const surface of surfaces) {
          await switchSurface(page, backgroundSelector, card, surface)
        }
        const results = []
        await mkdir(resolve(root, 'artifacts/button-theme'), { recursive: true })
        for (const variant of ['default', 'text', 'outline', 'tonal']) {
          await selector.getByText(variant, { exact: true }).click()
          for (const surface of [surfaces[0], surfaces[3]]) {
            await switchSurface(page, backgroundSelector, card, surface)
            const buttons = card.locator(`button.mp-button--variant-${variant}`)
            assert.equal(await buttons.count(), 8)
            for (const status of brandStatuses) {
              const button = buttons.filter({ hasText: new RegExp(`^${status}$`) })
              await checkRole(button, mode, status, variant)
              await sampleStates(
                page,
                button,
                {
                  status,
                  variant,
                  surface: surface[0],
                  checkContrast: readableScene(mode, status, variant, surface[0]),
                },
                results,
              )
            }
            await card.screenshot({
              path: resolve(root, `artifacts/button-theme/${mode}-${variant}-${surface[0]}.png`),
            })
          }
        }
        await page.goto(origin + '/#/zh-CN/showcaseForms')
        const step = page.locator('.workflow-demo__steps [aria-current]').first()
        await step.waitFor()
        results.push({ status: 'workflow-step', checkContrast: true, ...(await step.evaluate(sample)) })
        await page.goto(origin + '/#/zh-CN/themes')
        // Start this visual audit in the requested documentation section after
        // leaving the form showcase, rather than sampling the previous route.
        await page.reload()
        const scenes = page.locator('.firefly-button-scenes')
        await scenes.waitFor()
        await page.addStyleTag(disableTransitions)
        const surfaceSelector = scenes.getByRole('radiogroup', { name: '卡片背景', exact: true })
        const panel = scenes.locator('[data-surface]')
        for (const surface of surfaces) {
          await switchSurface(page, surfaceSelector, panel, surface)
          const buttons = panel.locator('button[data-brand-status]')
          assert.equal(await buttons.count(), 12)
          for (const button of await buttons.all()) {
            const status = await button.getAttribute('data-brand-status')
            const variant = await button.getAttribute('data-brand-variant')
            await checkRole(button, mode, status, variant)
            if (readableScene(mode, status, variant, surface[0])) {
              await sampleStates(page, button, { scene: surface[0], status, variant, checkContrast: true }, results)
            }
          }
          await panel.screenshot({ path: resolve(root, `artifacts/button-theme/${mode}-roles-${surface[0]}.png`) })
        }
        const interactions = scenes.locator('.firefly-interactions')
        assert.equal(
          await interactions
            .locator('.mp-radio--checked .mp-radio__control')
            .evaluate((el) => getComputedStyle(el).color),
          'rgb(207, 199, 255)',
        )
        assert.equal(
          await interactions
            .locator('.mp-checkbox--checked .mp-checkbox__icon')
            .evaluate((el) => getComputedStyle(el).backgroundColor),
          'rgb(207, 199, 255)',
        )
        assert.equal(
          await interactions.locator('.mp-switch__track').evaluate((el) => getComputedStyle(el).backgroundColor),
          'rgb(182, 168, 251)',
        )
        assert.equal(
          await interactions.locator('.mp-slider__fill').evaluate((el) => getComputedStyle(el).backgroundColor),
          'rgb(207, 199, 255)',
        )
        const violet = mode === 'light' ? 'rgb(154, 137, 235)' : 'rgb(197, 184, 255)'
        const link = interactions.locator('.mp-link')
        assert.equal(
          await link.evaluate((el) => getComputedStyle(el).color),
          mode === 'light' ? 'rgb(103, 84, 181)' : violet,
        )
        const input = interactions.getByRole('textbox', { name: '萤火虫焦点示例', exact: true })
        await input.fill('焦点与选择使用紫色')
        assert.equal(
          await interactions
            .locator('.mp-field-decorator__border-state')
            .evaluate((el) => getComputedStyle(el).borderTopColor),
          violet,
        )
        for (const [status, element] of [
          ['link', link],
          ['focused-label', interactions.locator('.mp-field-decorator__placeholder')],
        ]) {
          results.push({ status, checkContrast: true, ...(await element.evaluate(sample)) })
        }
        await interactions.screenshot({ path: resolve(root, `artifacts/button-theme/${mode}-interactions.png`) })
        await page.setViewportSize({ width: 390, height: 844 })
        assert.equal(await scenes.evaluate((el) => el.scrollWidth > el.clientWidth), false)
        await scenes.screenshot({ path: resolve(root, `artifacts/button-theme/${mode}-roles-mobile.png`) })
        await writeFile(resolve(root, `artifacts/button-theme/${mode}-roles.json`), JSON.stringify(results, null, 2))
        for (const value of results) {
          if (value.checkContrast) {
            assert.ok(value.contrast >= 4.5, JSON.stringify(value))
          }
        }
        assert.deepEqual(errors, [])
      } finally {
        await context.close()
      }
    },
  )
}
test('the local Firefly role example does not change any other page theme', { timeout: 180000 }, async () => {
  for (const theme of [
    'lightTheme',
    'darkTheme',
    'mapleLightTheme',
    'mapleDarkTheme',
    'alpsLightTheme',
    'alpsDarkTheme',
  ]) {
    const context = await browser.newContext({ viewport: { width: 1200, height: 1000 } })
    try {
      await context.addInitScript((theme) => {
        localStorage.setItem('MAPLE_V3_THEME', theme)
        localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
      }, theme)
      const page = await context.newPage()
      const rootRoles = () =>
        page.evaluate(() => {
          const style = getComputedStyle(document.documentElement)
          return Object.fromEntries(
            ['--mp-sys-color-action-primary', '--mp-sys-color-content-brand', '--mp-button-secondary-color'].map(
              (key) => [key, style.getPropertyValue(key)],
            ),
          )
        })
      await page.goto(origin + '/#/zh-CN/button')
      await page.getByRole('radiogroup', { name: 'Button variant', exact: true }).waitFor()
      const before = await rootRoles()
      await page.goto(origin + '/#/zh-CN/themes')
      await page.locator('.firefly-interactions').waitFor()
      assert.deepEqual(await rootRoles(), before, theme)
    } finally {
      await context.close()
    }
  }
})
