import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'

const output = new URL('../../artifacts/form-theme-colors/', import.meta.url).pathname
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
async function colors(locator) {
  return locator.evaluate((el) => {
    const rgba = (text) => {
      const parts = text.match(/[\d.]+/g)?.map(Number) || []
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] ?? 1]
    }
    const over = (fg, bg) => fg.slice(0, 3).map((x, i) => x * fg[3] + bg[i] * (1 - fg[3]))
    const layers = []
    for (let node = el; node; node = node.parentElement) {
      layers.push(rgba(getComputedStyle(node).backgroundColor))
    }
    const background = layers.reverse().reduce((bg, fg) => over(fg, bg), [255, 255, 255])
    const foreground = over(rgba(getComputedStyle(el).color), background)
    const luminance = (rgb) =>
      rgb
        .map((x) => {
          x /= 255
          return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
        })
        .reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0)
    const a = luminance(foreground),
      b = luminance(background)
    return { foreground, background, contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
  })
}
test('all themes: InputNumber and popup selection/clear colors and interactions', async () => {
  const browser = await chromium.launch()
  const report = []
  await mkdir(output, { recursive: true })
  try {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      await context.addInitScript((theme) => {
        localStorage.setItem('MAPLE_V3_THEME', theme)
        localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
      }, theme)
      const page = await context.newPage()
      await page.goto('http://127.0.0.1:5500/#/zh-CN/form')
      await page.waitForFunction(
        (expected) =>
          getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim() === expected,
        /dark/i.test(theme) ? 'dark' : 'light',
      )
      const numberField = page.locator('.mp-input-number').first()
      const input = numberField.locator('input')
      await input.waitFor()
      await numberField.screenshot({ path: `${output}/${theme}-number.png` })
      const samples = {
        number: await colors(input),
        stepButton: await colors(numberField.locator('.mp-input-number__step-button').last()),
      }
      await numberField.locator('.mp-input-number__step-button').last().click()
      await input.evaluate((el) => {
        if (el.value !== '1') {
          throw new Error('number increment did not update')
        }
      })
      await page.getByRole('button', { name: '请选择组织', exact: true }).first().click()
      const dialog = page.getByRole('dialog').filter({ visible: true }).first()
      await dialog.getByRole('option', { name: '吃饭组', exact: true }).click()
      await dialog.getByRole('option', { name: '睡觉组', exact: true }).click()
      const selected = dialog.getByRole('option', { name: '吃饭组', exact: true })
      samples.selected = await colors(selected)
      samples.check = await colors(selected.locator('.mp-select-option-check'))
      const clear = dialog.getByRole('button', { name: '清空', exact: true })
      samples.clear = await colors(clear)
      {
        for (const [state, sample] of Object.entries(samples)) {
          assert.ok(
            sample.contrast >= (state === 'stepButton' ? 3 : 4.5),
            `${theme} ${state}: ${JSON.stringify(sample)}`,
          )
        }
      }
      await page.screenshot({ path: `${output}/${theme}.png` })
      await clear.click()
      assert.equal(await dialog.locator('.mp-select-option-selected').count(), 0)
      await dialog.getByRole('button', { name: '确认', exact: true }).click()
      await dialog.getByRole('alert').waitFor()
      await dialog.getByRole('option', { name: '吃饭组', exact: true }).click()
      await dialog.getByRole('button', { name: '确认', exact: true }).click()
      await dialog.waitFor({ state: 'hidden' })
      report.push({ theme, samples })
      console.log(
        `verified ${theme}: ${Object.entries(samples)
          .map(([k, v]) => `${k}=${v.contrast.toFixed(2)}`)
          .join(', ')}`,
      )
      await context.close()
    }
  } finally {
    await writeFile(`${output}/colors.json`, JSON.stringify(report, null, 2))
    await browser.close()
  }
})
