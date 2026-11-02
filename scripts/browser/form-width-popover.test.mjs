import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'

const output = new URL('../../artifacts/form-width-popover/', import.meta.url).pathname
const themes = [
  'lightTheme',
  'darkTheme',
  'mapleLightTheme',
  'mapleDarkTheme',
  'alpsLightTheme',
  'alpsDarkTheme',
  'fireflyLightTheme',
  'fireflyDarkTheme',
]
test('basic form fields fill their row in every theme, and Firefly preserves popover geometry', async () => {
  const browser = await chromium.launch()
  await mkdir(output, { recursive: true })
  try {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      await context.addInitScript((theme) => {
        localStorage.setItem('MAPLE_V3_THEME', theme)
        localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
      }, theme)
      const page = await context.newPage()
      page.on('pageerror', (error) => console.log(theme, 'pageerror:', error.message))
      page.on('requestfailed', (request) =>
        console.log(theme, 'requestfailed:', request.url(), request.failure()?.errorText),
      )
      await page.goto('http://127.0.0.1:5500/#/zh-CN/form')
      await page.waitForFunction(
        (expected) =>
          getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim() === expected,
        /dark/i.test(theme) ? 'dark' : 'light',
      )
      for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 844 })
        for (const name of ['请选择部门', '请选择组织']) {
          const field = page.getByRole('button', { name, exact: true }).first()
          await field.waitFor()
          const widths = await field.evaluate((el) => ({
            field: el.getBoundingClientRect().width,
            row: el.closest('.mp-form-item').getBoundingClientRect().width,
          }))
          assert.ok(Math.abs(widths.field - widths.row) < 1, `${theme}: ${name} ${JSON.stringify(widths)}`)
        }
      }
      await page.setViewportSize({ width: 390, height: 844 })
      await page.getByRole('button', { name: '请选择部门', exact: true }).first().click()
      const dialog = page.getByRole('dialog').filter({ visible: true }).first()
      await dialog.waitFor()
      await dialog.getByRole('option', { name: '吃饭部', exact: true }).click()
      if (await dialog.isVisible()) {
        await dialog.getByRole('button', { name: '确认', exact: true }).click()
      }
      await page
        .getByRole('button', { name: '请选择部门', exact: true })
        .first()
        .filter({ hasText: '吃饭部' })
        .waitFor()
      await page.getByRole('button', { name: '请选择组织', exact: true }).first().click()
      const multiple = page.getByRole('dialog').filter({ visible: true }).first()
      await multiple.getByRole('option', { name: '吃饭组', exact: true }).click()
      await multiple.getByRole('option', { name: '睡觉组', exact: true }).click()
      await multiple.getByRole('button', { name: '确认', exact: true }).click()
      await page
        .getByRole('button', { name: '请选择组织', exact: true })
        .first()
        .filter({ hasText: '吃饭组' })
        .filter({ hasText: '睡觉组' })
        .waitFor()
      if (theme.startsWith('firefly')) {
        await page.screenshot({ path: `${output}/${theme}-form.png` })
        await page.goto('http://127.0.0.1:5500/#/zh-CN/popover')
        await page.getByRole('button', { name: '基本使用', exact: true }).first().click()
        const popover = page.locator('.mp-popover__content').filter({ visible: true }).first()
        await popover.waitFor()
        assert.equal(await popover.evaluate((el) => getComputedStyle(el).borderTopLeftRadius), '24px')
        const arrow = page.locator('.mp-trigger__arrow').filter({ visible: true }).first()
        assert.equal(await arrow.evaluate((el) => getComputedStyle(el).borderTopLeftRadius), '2px')
        await page.screenshot({ path: `${output}/${theme}-popover.png` })
      }
      console.log(`verified ${theme}`)
      await context.close()
    }
  } finally {
    await browser.close()
  }
})
