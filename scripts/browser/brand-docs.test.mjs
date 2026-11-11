import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { extname, resolve, sep } from 'node:path'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium, devices } from 'playwright'
import { demoControl } from '../../../design-ui/browser/demo-control.mjs'
import { copyProductionSnapshot } from '../../../design-ui/browser/snapshot.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
let browser
let server
let directory
let origin
before(
  async () => {
    directory = await mkdtemp(resolve(tmpdir(), 'maple-brand-docs-'))
    await copyProductionSnapshot(resolve(root, 'packages/ui/site'), directory)
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
for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(
      brand + ' ' + mode + ' booking preview loads from production docs through the resolver',
      { timeout: 60000 },
      async () => {
        const context = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' })
        try {
          await context.addInitScript(
            ({ brand, mode }) => {
              localStorage.setItem('MAPLE_V3_THEME', brand + (mode === 'dark' ? 'DarkTheme' : 'LightTheme'))
              localStorage.setItem('MAPLE_V3_THEME_DEMO', brand + (mode === 'dark' ? 'DarkTheme' : 'LightTheme'))
            },
            { brand, mode },
          )
          await context.route('**/*', (route) =>
            new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
          )
          const page = await context.newPage()
          const errors = []
          page.on('pageerror', (error) => errors.push(error.message))
          await page.goto(origin + '/#/zh-CN/themes')
          const preview = page.locator('.theme-form-preview')
          const name = preview.getByRole('textbox', { name: '联系人', exact: true })
          await name.waitFor()
          assert.equal(
            await name.evaluate((el) => getComputedStyle(el.closest('.mp-field-decorator')).borderRadius),
            brand === 'alps' ? '0px' : '24px',
          )
          assert.equal(await name.getAttribute('autocomplete'), 'off')
          for (const active of [brand === 'alps' ? 'firefly' : 'alps', brand]) {
            const label = (active === 'alps' ? 'Alps 乐道' : 'Firefly 萤火虫') + (mode === 'dark' ? '暗色' : '')
            await page.getByRole('button', { name: label, exact: true }).click()
            await page.waitForFunction(
              (radius) =>
                getComputedStyle(document.querySelector('input[aria-label="联系人"]').closest('.mp-field-decorator'))
                  .borderRadius === radius,
              active === 'alps' ? '0px' : '24px',
            )
          }
          const form = preview.locator('form')
          await form.evaluate((el) => el.requestSubmit())
          await preview.locator('.mp-field-decorator--error').waitFor()
          assert.equal(await preview.getByRole('status').filter({ hasText: '预约信息校验通过' }).count(), 0)
          await name.fill('Theme preview')
          await form.evaluate((el) => el.requestSubmit())
          await preview.getByRole('status').filter({ hasText: '预约信息校验通过' }).waitFor()
          assert.equal(await preview.getByRole('switch').getAttribute('aria-checked'), 'true')
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
          await page.getByText('选择、开关与上传 / Selection, switches and uploads', { exact: true }).click()
          await page.locator('.form-state-demo').waitFor()
          assert.deepEqual(errors, [])
        } finally {
          await context.close()
        }
      },
    )
  }
}

test(
  'theme overrides stay local and SafeArea examples expose focused controls in both languages',
  { timeout: 90000 },
  async () => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    try {
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      for (const language of ['zh-CN', 'en-US']) {
        await page.goto(origin + '/#/' + language + '/themes')
        const demo = page.locator('.local-theme-demo')
        await demo.waitFor()
        const buttons = demo.getByRole('button')
        const original = await buttons.nth(0).evaluate((el) => getComputedStyle(el).backgroundColor)
        await demo.getByText('蓝色 / Blue', { exact: true }).click()
        assert.equal(await buttons.nth(1).evaluate((el) => getComputedStyle(el).backgroundColor), 'rgb(36, 86, 166)')
        assert.equal(await buttons.nth(0).evaluate((el) => getComputedStyle(el).backgroundColor), original)
        assert.equal(await page.locator('.theme-details [aria-expanded="true"]').count(), 0)
        if (language === 'zh-CN') {
          await mkdir(resolve(root, 'artifacts/page-organization'), { recursive: true })
          await demo.screenshot({ path: resolve(root, 'artifacts/page-organization/theme-local.png') })
        }
        await page.locator('.theme-details .mp-collapse-item__header').nth(1).click()
        await page.locator('.form-state-demo').waitFor()
        await page.goto(origin + '/#/' + language + '/safe-area')
        const basic = page.locator('.safe-area-basic')
        await basic.waitFor().catch((error) => {
          error.message += `\nSafeArea route: ${page.url()}`
          throw error
        })
        const padding = (selector) => basic.locator(selector).evaluate((el) => getComputedStyle(el).paddingBottom)
        assert.equal(await padding('.safe-area-basic__outer'), '24px')
        assert.equal(await padding('.safe-area-basic__nested'), '0px')
        await basic.locator('label.mp-checkbox').click()
        await page.waitForFunction(
          () => getComputedStyle(document.querySelector('.safe-area-basic__nested')).paddingBottom === '24px',
        )
        assert.equal(await padding('.safe-area-basic__nested'), '24px')
        assert.equal(
          await page.locator('.brand-form-options [aria-expanded]').first().getAttribute('aria-expanded'),
          'false',
        )
        if (language === 'zh-CN') {
          await basic.screenshot({ path: resolve(root, 'artifacts/page-organization/safe-area-basic.png') })
          await page
            .locator('.brand-form-demo')
            .screenshot({ path: resolve(root, 'artifacts/page-organization/safe-area-app.png') })
        }
        const simulation = page.getByRole('region', { name: 'App 安全区模拟', exact: true })
        await simulation.getByRole('button', { name: '四边归零', exact: true }).click()
        await page.waitForFunction(
          () => getComputedStyle(document.querySelector('.brand-form-footer')).paddingBottom === '0px',
        )
        await page.locator('.brand-form-options .mp-collapse-item__header').click()
        await demoControl(page, '字段编辑方式').waitFor()
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      }
      assert.deepEqual(errors, [])
    } finally {
      await context.close()
    }
  },
)

test('documentation text uses readable foregrounds across all eight themes', { timeout: 120000 }, async () => {
  for (const theme of [
    'lightTheme',
    'darkTheme',
    'mapleLightTheme',
    'mapleDarkTheme',
    'alpsLightTheme',
    'alpsDarkTheme',
    'fireflyLightTheme',
    'fireflyDarkTheme',
  ]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
    try {
      await context.addInitScript((theme) => localStorage.setItem('MAPLE_V3_THEME', theme), theme)
      const page = await context.newPage()
      for (const [route, selector] of [
        ['showcaseComponents', '.comparison-summary strong, .comparison-summary span, .comparison-more'],
        ['showcase', '.showcase-hub__card h3, .showcase-hub__card p, .showcase-hub__card a'],
        ['quickstart', '.maple-site-doc p code'],
      ]) {
        await page.goto(origin + '/#/zh-CN/' + route)
        await page.locator(selector).first().waitFor()
        const samples = await page.locator(selector).evaluateAll((elements) => {
          const parse = (value) => {
            const rgba = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0]
            if (value.startsWith('color(srgb')) {
              rgba.splice(0, 3, ...rgba.slice(0, 3).map((value) => value * 255))
            }
            return [...rgba.slice(0, 3), rgba[3] ?? 1]
          }
          const blend = (top, base) =>
            top.slice(0, 3).map((channel, index) => channel * top[3] + base[index] * (1 - top[3]))
          const luminance = (rgb) =>
            rgb
              .map((channel) => channel / 255)
              .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
              .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0)
          return elements.map((element) => {
            const ancestors = []
            for (let node = element; node; node = node.parentElement) {
              ancestors.unshift(node)
            }
            const background = ancestors.reduce(
              (color, node) => blend(parse(getComputedStyle(node).backgroundColor), color),
              [255, 255, 255],
            )
            const foreground = blend(parse(getComputedStyle(element).color), background)
            const levels = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
            return { text: element.textContent.trim().slice(0, 50), ratio: (levels[0] + 0.05) / (levels[1] + 0.05) }
          })
        })
        assert.ok(samples.length > 0, `${theme} / ${route} contains text samples`)
        for (const sample of samples) {
          assert.ok(sample.ratio >= 4.5, `${theme} / ${route} / ${sample.text}: ${sample.ratio.toFixed(2)}`)
        }
        if (theme === 'fireflyLightTheme' && route === 'showcaseComponents') {
          await mkdir(resolve(root, 'artifacts/page-organization'), { recursive: true })
          await page
            .locator('.comparison-summary')
            .screenshot({ path: resolve(root, 'artifacts/page-organization/firefly-comparison-readable.png') })
        }
      }
    } finally {
      await context.close()
    }
  }
})
