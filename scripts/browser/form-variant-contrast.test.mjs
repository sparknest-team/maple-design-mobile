import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'

const output = new URL('../../artifacts/form-variant-contrast/', import.meta.url).pathname
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
  const background = layers.reverse().reduce((bg, fg) => over(fg, bg), [255, 255, 255])
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
test(
  'eight real themes: booking preview and independent field variant/size/state matrix',
  { timeout: 240000 },
  async () => {
    const browser = await chromium.launch()
    const results = []
    await mkdir(output, { recursive: true })
    try {
      for (const theme of themes) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' })
        await context.addInitScript((theme) => {
          localStorage.setItem('MAPLE_V3_THEME', theme)
          localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
        }, theme)
        const page = await context.newPage()
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        await page.goto('http://127.0.0.1:5500/#/zh-CN/themes')
        const form = page.locator('.theme-form-preview').first()
        await form.waitFor()
        assert.equal(
          await page.evaluate(() =>
            getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim(),
          ),
          /dark/i.test(theme) ? 'dark' : 'light',
        )
        const scheme = await page.evaluate(() => ({
          dark: document.documentElement.getAttribute('maple-theme'),
          page: getComputedStyle(document.documentElement).getPropertyValue('--mp-sys-color-surface-page'),
        }))
        await form.getByRole('textbox', { name: '联系人', exact: true }).fill('变体回归')
        await form.getByRole('button', { name: '提交预约', exact: true }).click()
        await form.getByRole('status').filter({ hasText: '预约信息校验通过' }).waitFor()
        const comparison = page.locator('.control-size-comparison').first()
        const input = comparison.locator('[data-control="InputValue"] input')
        const field = comparison.locator('[data-control="InputValue"] .mp-field-decorator')
        for (const variant of ['outline', 'filled', 'standard']) {
          await comparison
            .getByRole('radiogroup', { name: 'Comparison variant', exact: true })
            .getByText(variant, { exact: true })
            .click()
          for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
            await comparison
              .getByRole('radiogroup', { name: 'Comparison size', exact: true })
              .getByText(size, { exact: true })
              .click()
            const cells = await comparison.locator('[data-control]').evaluateAll((es) =>
              es.flatMap((cell) => {
                const field = cell.querySelector('.mp-field-decorator')
                if (!field) {
                  return []
                }
                return [
                  {
                    name: cell.getAttribute('data-control'),
                    classes: field.className,
                    height: field.getBoundingClientRect().height,
                  },
                ]
              }),
            )
            assert.ok(cells.length >= 12)
            for (const cell of cells) {
              assert.ok(
                cell.classes.includes(`--variant-${variant}`),
                `${theme} ${cell.name} ${variant}: ${cell.classes}`,
              )
              assert.ok(cell.classes.includes(`--size-${size}`), `${theme} ${cell.name} ${size}: ${cell.classes}`)
              assert.ok(cell.height > 0)
            }
          }
          await comparison
            .getByRole('radiogroup', { name: 'Comparison size', exact: true })
            .getByText('md', { exact: true })
            .click()
          await page.mouse.move(0, 0)
          const normal = await input.evaluate(sample)
          assert.ok(normal.contrast >= 4.5, `${theme} ${variant} normal ${JSON.stringify(normal)}`)
          const baseFill = await field.evaluate((el) => getComputedStyle(el).backgroundColor)
          await input.focus()
          const focus = await input.evaluate(sample)
          const focusLabel = await field.locator('.mp-field-decorator__placeholder').evaluate(sample)
          assert.ok(focus.contrast >= 4.5, `${theme} ${variant} focus ${JSON.stringify(focus)}`)
          assert.ok(focusLabel.contrast >= 4.5, `${theme} ${variant} focus label ${JSON.stringify(focusLabel)}`)
          if (/^(alps|firefly)/.test(theme) && variant === 'filled') {
            assert.notEqual(await field.evaluate((el) => getComputedStyle(el).backgroundColor), baseFill)
          }
          await input.blur()
          if (variant === 'standard') {
            assert.notEqual(
              await field
                .locator('.mp-field-decorator__border')
                .evaluate((el) => getComputedStyle(el).borderBottomColor),
              'rgba(0, 0, 0, 0)',
            )
          }
          await comparison.getByText('Error / 错误对照', { exact: true }).click()
          const error = await input.evaluate(sample)
          const errorLabel = await field.locator('.mp-field-decorator__placeholder').evaluate(sample)
          assert.ok(error.contrast >= 4.5, `${theme} ${variant} error ${JSON.stringify(error)}`)
          assert.ok(errorLabel.contrast >= 4.5, `${theme} ${variant} error label ${JSON.stringify(errorLabel)}`)
          await comparison.getByText('Error / 错误对照', { exact: true }).click()
          await comparison.getByText('Disabled / 禁用对照', { exact: true }).click()
          assert.equal(await input.isDisabled(), true)
          await comparison.getByText('Disabled / 禁用对照', { exact: true }).click()
          await comparison.getByText('Readonly / 只读对照', { exact: true }).click()
          assert.notEqual(await input.getAttribute('readonly'), null)
          const mark = await comparison.locator('.mp-checkbox--checked .mp-checkbox__check').first().evaluate(sample)
          assert.ok(mark.contrast >= 3, `${theme} checkbox mark ${JSON.stringify(mark)}`)
          await comparison.getByText('Readonly / 只读对照', { exact: true }).click()
          results.push({ theme, scheme, variant, normal, focus, focusLabel, error, errorLabel, mark })
        }
        await comparison.screenshot({ path: `${output}/${theme}.png` })
        assert.deepEqual(errors, [])
        console.log(`verified ${theme}: booking preview + 3 variants × 5 sizes + normal/focus/error/disabled/readonly`)
        await context.close()
      }
    } finally {
      await writeFile(`${output}/contrast.json`, JSON.stringify(results, null, 2))
      await browser.close()
    }
  },
)
