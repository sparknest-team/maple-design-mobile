import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'

const output = new URL('../../artifacts/inline-selection-summary/', import.meta.url).pathname
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
test('inline menus do not repeat selection management; popup drafts retain it in every theme', async () => {
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
      await page.goto('http://127.0.0.1:5500/#/zh-CN/form')
      await page.waitForFunction(
        (expected) =>
          getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim() === expected,
        /dark/i.test(theme) ? 'dark' : 'light',
      )
      const demo = page.locator('.selection-summary-demo').first()
      for (const component of ['Select', 'Cascader']) {
        const inline = demo.locator('.mp-form-item').filter({ hasText: `${component} · inline` })
        await inline.getByRole('combobox').click()
        assert.equal(await page.locator('.mp-selected-options__summary').filter({ visible: true }).count(), 0)
        assert.equal(await page.locator('.mp-selected-options__details').filter({ visible: true }).count(), 0)
        const option =
          component === 'Select'
            ? page.getByRole('option', { name: 'Beta', exact: true }).filter({ visible: true }).first()
            : page.locator('.mp-cascader-option[title="Beta"]').filter({ visible: true }).first()
        await option.click()
        assert.match(await inline.locator('.mp-selection-field').innerText(), /Beta/)
        await page.keyboard.press('Escape')
        await inline.locator('.mp-field-decorator__clear-btn').click()
        assert.doesNotMatch(await inline.locator('.mp-selection-field').innerText(), /Alpha|Beta/)
        const popup = demo.locator('.mp-form-item').filter({ hasText: `${component} · popup` })
        const reference = popup.locator('.mp-field-presentation__reference')
        await reference.click()
        let dialog = page.getByRole('dialog').filter({ visible: true }).first()
        await dialog.locator('.mp-selected-options__summary').waitFor()
        await dialog.getByRole('button', { name: '清空', exact: true }).click()
        assert.match(await reference.innerText(), /Alpha/)
        await dialog.locator('.mp-field-presentation__close').click()
        assert.match(await reference.innerText(), /Alpha/)
        await reference.click()
        dialog = page.getByRole('dialog').filter({ visible: true }).first()
        await dialog.getByRole('button', { name: '清空', exact: true }).click()
        await dialog.getByRole('button', { name: '确认', exact: true }).click()
        await dialog.waitFor({ state: 'hidden' })
        assert.doesNotMatch(await reference.innerText(), /Alpha/)
      }
      await demo.screenshot({ path: `${output}/${theme}.png` })
      console.log(`verified ${theme}`)
      await context.close()
    }
  } finally {
    await browser.close()
  }
})
