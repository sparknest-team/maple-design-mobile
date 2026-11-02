import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'

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
const output = new URL('../../artifacts/form-control-states/', import.meta.url).pathname
async function contrast(foreground, background = foreground) {
  const fg = await foreground.evaluate((el) => getComputedStyle(el).color)
  return background.evaluate((el, fg) => {
    const rgba = (value) => {
      const p = value.match(/[\d.]+/g)?.map(Number) || []
      return [p[0] || 0, p[1] || 0, p[2] || 0, p[3] ?? 1]
    }
    const over = (f, b) => f.slice(0, 3).map((v, i) => v * f[3] + b[i] * (1 - f[3]))
    const layers = []
    for (let n = el; n; n = n.parentElement) {
      layers.push(rgba(getComputedStyle(n).backgroundColor))
    }
    const bg = layers.reverse().reduce((b, f) => over(f, b), [255, 255, 255])
    const lum = (c) =>
      c
        .map((v) => (v / 255 <= 0.04045 ? v / 3294.6 : ((v / 255 + 0.055) / 1.055) ** 2.4))
        .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0)
    const a = lum(over(rgba(fg), bg)),
      b = lum(bg)
    return { foreground: fg, background: bg, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
  }, fg)
}

test('eight themes: selection, temporal, choice, switch and upload variants/states', { timeout: 600000 }, async () => {
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
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto('http://127.0.0.1:5500/#/zh-CN/themes')
      const demo = page.locator('.form-state-demo')
      await demo.waitFor()
      assert.equal(
        await page.evaluate(() =>
          getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim(),
        ),
        theme.includes('Dark') || theme === 'darkTheme' ? 'dark' : 'light',
      )
      const evidence = { theme, colors: {}, variants: [] }
      for (const variant of ['outline', 'filled', 'standard']) {
        await demo
          .getByRole('radiogroup', { name: '状态对照字段变体', exact: true })
          .getByRole('radio', { name: variant, exact: true })
          .locator('..')
          .click()
        assert.equal(await demo.locator(`.mp-field-decorator--variant-${variant}`).count(), 9)
        for (const state of ['禁用', '只读', '错误', '正常']) {
          await demo
            .getByRole('radiogroup', { name: '状态对照交互状态', exact: true })
            .getByRole('radio', { name: state, exact: true })
            .locator('..')
            .click()
          const inputs = demo.locator(
            '.mp-select input, .mp-cascader input, .mp-date input, .mp-time input, .mp-date-range input, .mp-time-range input',
          )
          for (const input of await inputs.all()) {
            assert.equal(await input.getAttribute('autocomplete'), 'off')
            if (state === '禁用') {
              assert.equal(await input.isDisabled(), true)
            }
            if (state === '只读') {
              assert.notEqual(await input.getAttribute('readonly'), null)
            }
            if (state === '错误') {
              assert.equal(await input.getAttribute('aria-invalid'), 'true')
            }
          }
          if (state === '禁用' || state === '只读') {
            const checked = demo.getByRole('switch', { name: '状态开关 circle', exact: true })
            const before = await checked.getAttribute('aria-checked')
            if (state === '只读') {
              await checked.click()
            } else {
              assert.equal(await checked.isDisabled(), true)
            }
            assert.equal(await checked.getAttribute('aria-checked'), before)
            for (const input of await demo.locator('.mp-upload__input').all()) {
              assert.equal(await input.isDisabled(), true)
            }
            for (const button of await demo
              .locator('.mp-upload__action[aria-label="移除"], .mp-upload__action[aria-label="替换"]')
              .all()) {
              assert.equal(await button.isDisabled(), true)
            }
            const cb = demo.getByRole('group', { name: '状态复选组', exact: true }).getByRole('checkbox').first()
            if (state === '禁用') {
              assert.equal(await cb.isDisabled(), true)
              assert.ok(
                await demo
                  .locator('.mp-upload__item')
                  .first()
                  .evaluate((el) => Number(getComputedStyle(el).opacity) < 1),
              )
            }
          }
        }
        evidence.variants.push(variant)
      }
      const selectedRadio = demo.locator('.mp-radio-group--button .mp-radio--checked .mp-radio__button-label')
      evidence.colors.radioButton = await contrast(selectedRadio)
      evidence.colors.radioCircle = await contrast(
        demo.locator(
          '.mp-radio-group:not(.mp-radio-group--button)[aria-label="状态单选组"] .mp-radio--checked .mp-radio__control',
        ),
      )
      evidence.colors.checkbox = await contrast(
        demo.locator('.mp-checkbox--checked .mp-checkbox__check').last(),
        demo.locator('.mp-checkbox--checked .mp-checkbox__icon').last(),
      )
      for (const v of ['circle', 'round', 'tonal']) {
        for (const checked of [true, false]) {
          const sw = demo.getByRole('switch', { name: `${checked ? '状态开关' : '状态关闭'} ${v}`, exact: true })
          const key = `switch-${v}-${checked}`
          evidence.colors[key] = await contrast(sw.locator('.mp-switch__text'), sw.locator('.mp-switch__track'))
        }
      }
      for (const [key, value] of Object.entries(evidence.colors)) {
        assert.ok(
          value.ratio >= (key === 'radioCircle' || key === 'checkbox' ? 3 : 4.5),
          `${theme} ${key}: ${JSON.stringify(value)}`,
        )
      }
      for (const v of ['circle', 'round', 'line', 'tonal']) {
        const sw = demo.getByRole('switch', { name: `状态开关 ${v}`, exact: true })
        await sw.click()
        assert.equal(await sw.getAttribute('aria-checked'), 'false')
        await sw.click()
        const loading = demo.getByRole('switch', { name: `加载开关 ${v}`, exact: true })
        assert.equal(await loading.isDisabled(), true)
        assert.equal(await loading.getAttribute('aria-busy'), 'true')
      }
      const card = demo.locator('.mp-upload--picture-card .mp-upload__item').first()
      evidence.uploadRadius = await card.evaluate((el) => getComputedStyle(el).borderRadius)
      assert.equal(await card.evaluate((el) => getComputedStyle(el).overflow), 'hidden')
      if (theme.startsWith('firefly')) {
        assert.equal(evidence.uploadRadius, '24px')
      }
      for (const presentation of ['direct', 'popup']) {
        await demo
          .getByRole('radiogroup', { name: '状态对照编辑方式', exact: true })
          .getByRole('radio', { name: presentation === 'direct' ? 'inline 浮层' : 'popup 弹层', exact: true })
          .locator('..')
          .click()
        const clickField = async (label) => {
          const input = demo.getByRole('combobox', { name: label, exact: true }).first()
          if (await input.count()) {
            await input.click()
          } else {
            const reference = demo.getByRole('button', { name: label, exact: true })
            if (await reference.count()) {
              await reference.click()
            } else {
              await demo.getByRole('button', { name: label.replace(/^状态/, ''), exact: true }).click()
            }
          }
        }
        const closeEditor = async () => {
          if (presentation === 'popup') {
            await page
              .locator('.mp-field-presentation__panel:visible')
              .getByRole('button', { name: '关闭', exact: true })
              .click()
          } else {
            await page.keyboard.press('Escape')
          }
        }
        await clickField('状态单选城市')
        const selected = page.getByRole('option', { name: '上海', exact: true }).last()
        await selected.waitFor()
        const value = await contrast(selected)
        assert.ok(value.ratio >= 4.5, `${theme} ${presentation} Select highlight ${value.ratio}`)
        const disabled = page.getByRole('option', { name: '不可选城市', exact: true }).last()
        assert.equal(await disabled.getAttribute('aria-disabled'), 'true')
        if (presentation === 'popup') {
          await page
            .locator('.mp-field-presentation__panel:visible')
            .getByRole('button', { name: '关闭', exact: true })
            .click()
        } else {
          await page.keyboard.press('Escape')
        }
        await clickField('状态日期')
        if (presentation === 'direct') {
          await demo
            .locator('.mp-date')
            .filter({ has: page.getByRole('combobox', { name: '状态日期', exact: true }) })
            .locator('.mp-date__input-trigger')
            .click()
        }
        const day = page
          .locator('.mp-day-picker__button[mp-day-picker-cover], .mp-calendar-viewport button[aria-pressed="true"]')
          .last()
        await day.waitFor()
        const dayColor = await contrast(day)
        evidence.colors[`calendar-${presentation}`] = dayColor
        assert.ok(dayColor.ratio >= 4.5, `${theme} ${presentation} calendar ${dayColor.ratio}`)
        if (presentation === 'direct' && theme.startsWith('firefly')) {
          const panel = page.locator('.mp-date-panel__layout:visible').last()
          assert.equal(await panel.evaluate((el) => getComputedStyle(el).borderRadius), '24px')
          assert.equal(await panel.evaluate((el) => getComputedStyle(el).overflow), 'hidden')
        }
        if (presentation === 'popup') {
          await page
            .locator('.mp-field-presentation__panel:visible')
            .getByRole('button', { name: '关闭', exact: true })
            .click()
        } else {
          await page.keyboard.press('Escape')
        }
        for (const label of ['状态多选城市', '状态单选地区', '状态多选地区']) {
          await clickField(label)
          if (label.includes('地区')) {
            const parent = page.locator('.mp-cascader-option[title="中国"]:visible').last()
            if (await parent.count()) {
              await parent.click()
            }
            const leaf = page.locator('.mp-cascader-option[title="上海"]:visible').last()
            await leaf.waitFor()
            const text = await contrast(leaf.locator('.mp-cascader-option-label-content'))
            assert.ok(text.ratio >= 4.5, `${theme} ${presentation} ${label}: ${text.ratio}`)
            const check = leaf.locator('.mp-cascader-option-check')
            if (await check.count()) {
              assert.ok((await contrast(check)).ratio >= 3, `${theme} Cascader check`)
            }
            assert.equal(
              await page
                .locator('.mp-cascader-option[title="不可选城市"]:visible')
                .last()
                .getAttribute('aria-disabled'),
              'true',
            )
          } else {
            await page.getByRole('option', { name: '上海', exact: true }).last().waitFor()
          }
          await closeEditor()
        }
        for (const label of ['状态日期时间', '状态时间', '状态日期范围', '状态时间范围']) {
          await clickField(label)
          if (presentation === 'direct') {
            const trigger = demo
              .getByRole('combobox', { name: label, exact: true })
              .first()
              .locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," mp-field-decorator ")][1]')
              .locator('button[aria-haspopup="dialog"]')
            if (await trigger.count()) {
              await trigger.click()
            }
          }
          await page.locator('[role="dialog"]:visible').last().waitFor()
          const selectedTime = page.locator('.mp-picker__option[aria-selected="true"] .mp-picker__text:visible').first()
          if (await selectedTime.count()) {
            const color = await contrast(selectedTime)
            assert.ok(color.ratio >= 4.5, `${theme} ${presentation} ${label} selected time: ${color.ratio}`)
          }
          for (const input of await page
            .locator('[role="dialog"]:visible input:not([type="checkbox"]):not([type="radio"])')
            .all()) {
            assert.equal(await input.getAttribute('autocomplete'), 'off')
          }
          await closeEditor()
        }
      }
      for (const input of await demo.locator('input,textarea').all()) {
        assert.equal(await input.getAttribute('autocomplete'), 'off')
      }
      assert.deepEqual(errors, [])
      await demo.screenshot({ path: `${output}/${theme}.png` })
      report.push(evidence)
      await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2))
      console.log(
        `verified ${theme}: selection and temporal editors; 3 field variants; choice, switch and upload states`,
      )
      await context.close()
    }
  } finally {
    await browser.close()
  }
})

test('eight themes upload captions and compact Switch variants', { timeout: 120000 }, async () => {
  const browser = await chromium.launch()
  try {
    for (const theme of themes) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 1,
      })
      await context.addInitScript((theme) => {
        localStorage.setItem('MAPLE_V3_THEME', theme)
        localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
      }, theme)
      const page = await context.newPage()
      await page.goto('http://127.0.0.1:5500/#/zh-CN/themes')
      const demo = page.locator('.form-state-demo').first()
      await demo.waitFor()
      const roundedSwitch = demo.getByRole('switch', { name: '状态开关 round', exact: true })
      const shape = await roundedSwitch.evaluate((el) => ({
        radius: parseFloat(getComputedStyle(el).borderTopLeftRadius),
        height: el.getBoundingClientRect().height,
      }))
      assert.ok(shape.radius < shape.height / 2, `${theme}: round must remain distinct from circle`)
      for (const selector of [
        '.mp-upload--picture-card .mp-upload__name',
        '.mp-upload--picture-card .mp-upload__size',
        '.mp-upload--text .mp-upload__item--error .mp-upload__name',
        '.mp-upload--picture-card .mp-upload__duration',
      ]) {
        const color = await contrast(demo.locator(selector).first())
        assert.ok(color.ratio >= 4.5, `${theme} ${selector}: ${JSON.stringify(color)}`)
      }
      const duration = demo.locator('.mp-upload--picture-card .mp-upload__duration').first()
      const badge = await duration.evaluate((el) => {
        const thumb = el.closest('button')
        const meta = el.closest('.mp-upload__item').querySelector('.mp-upload__meta')
        const parent = thumb.getBoundingClientRect(),
          rect = el.getBoundingClientRect()
        const radius = Math.min(
          parseFloat(getComputedStyle(thumb).borderTopRightRadius),
          parent.width / 2,
          parent.height / 2,
        )
        const right = parent.right - rect.right,
          top = rect.top - parent.top
        const caption = meta.getBoundingClientRect()
        return {
          aboveCaption: Number(getComputedStyle(el).zIndex) > (Number(getComputedStyle(meta).zIndex) || 0),
          insideCorner:
            right >= 0 &&
            top >= 0 &&
            rect.left >= parent.left &&
            Math.hypot(Math.max(0, radius - right), Math.max(0, radius - top)) <= radius + 1,
          clearOfCaption:
            rect.bottom <= caption.top ||
            rect.top >= caption.bottom ||
            rect.right <= caption.left ||
            rect.left >= caption.right,
        }
      })
      assert.ok(
        badge.aboveCaption && badge.insideCorner && badge.clearOfCaption,
        `${theme}: video badge must remain above the caption and inside rounded corners`,
      )
      assert.equal(await demo.locator('.mp-upload--picture .mp-upload__duration').count(), 0)
      await demo.locator('.mp-upload--picture .mp-upload__meta').getByText('02:05', { exact: true }).waitFor()
      await mkdir(output, { recursive: true })
      await demo.locator('[data-upload-type="picture-card"]').screenshot({ path: `${output}/${theme}-upload.png` })
      console.log(`verified ${theme}: upload captions, error labels and video duration`)
      await context.close()
    }
  } finally {
    await browser.close()
  }
})
