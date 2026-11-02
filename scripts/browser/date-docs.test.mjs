import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { chromium, devices } from 'playwright'
import { chooseDemoOption } from '../../../design-ui/browser/demo-control.mjs'

// Run against a built documentation preview, after build:lib and build:doc.
const origin = process.env.MAPLE_DATE_DOCS_ORIGIN || 'http://127.0.0.1:5500'
let browser
before(async () => {
  browser = await chromium.launch()
})
after(async () => {
  await browser?.close()
})

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
  test(`${theme}: built date and range demos are accessible and the month is not clipped`, async () => {
    const context = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' })
    const errors = []
    try {
      await context.addInitScript((theme) => {
        localStorage.setItem('MAPLE_V3_THEME', theme)
        localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
      }, theme)
      const page = await context.newPage()
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto(origin + '/mobile.html#/date?language=zh-CN')
      const date = page.locator('[data-demo="time-zone-views"]')
      const [mode, label] = [
        ['page', '翻页'],
        ['scroll', '多月虚拟滚动'],
        ['line', '单行周日历'],
      ][
        [
          'lightTheme',
          'darkTheme',
          'mapleLightTheme',
          'mapleDarkTheme',
          'alpsLightTheme',
          'alpsDarkTheme',
          'fireflyLightTheme',
          'fireflyDarkTheme',
        ].indexOf(theme) % 3
      ]
      const chooseMode = async (name) => {
        await chooseDemoOption(page, name, label)
      }
      await chooseMode('示例日历模式')
      await date.getByRole('combobox', { name: '时区预约', exact: true }).tap()
      let editor = page.locator('.mp-date-field-popover')
      await editor.waitFor()
      if (mode === 'page') {
        await editor.locator('.mp-day-picker__body').getByRole('button', { name: '9', exact: true }).tap()
      } else {
        assert.equal(await editor.locator('.mp-calendar-viewport').getAttribute('data-mode'), mode)
        await editor.getByRole('button', { name: '2026-03-09', exact: true }).tap()
      }
      await editor.locator('.mp-date-picker__quick-time').getByRole('option', { name: '02:00', exact: true }).tap()
      if (theme === 'lightTheme') {
        await page.screenshot({
          path: new URL('../../artifacts/date-panels/clickable-date-time.png', import.meta.url).pathname,
          scale: 'css',
        })
      }
      await editor.locator('.mp-date-panel-actions button').last().tap()
      await editor.waitFor({ state: 'hidden' })
      await date.locator('[data-result="instant"]').filter({ hasText: '2026-03-09T06:00:00.000Z' }).waitFor()
      await date.getByRole('button', { name: '纽约秋季第二次 01:30', exact: true }).click()
      await date.locator('[data-result="instant"]').filter({ hasText: '2026-11-01T06:30:00.000Z' }).waitFor()
      await page.goto(origin + '/mobile.html#/date-range?language=zh-CN')
      const range = page.locator('[data-demo="zoned-range"]')
      await range.getByRole('button', { name: '跨月范围', exact: true }).waitFor()
      await range.getByRole('button', { name: '六行月份', exact: true }).click()
      await range.getByRole('combobox', { name: '普通日期范围', exact: true }).first().click()
      const panel = page.locator('.mp-date-field-popover')
      await panel.locator('.mp-date-panel-actions').waitFor()
      assert.equal(await panel.locator('.mp-date-range-picker__summaries').count(), 1)
      await page.waitForTimeout(150)
      const metric = await panel.evaluate((el) => {
        const main = el.querySelector('.mp-date-panel__main'),
          content = main.firstElementChild
        const actions = main.querySelector('.mp-date-panel-actions').getBoundingClientRect()
        const body = main.querySelector('.mp-date-picker__body')
        const day = [...main.querySelectorAll('[mp-day-picker-cover]')]
          .filter((b) => b.textContent.trim() === '31')
          .at(-1)
          .getBoundingClientRect()
        return {
          innerScroll: body.scrollHeight - body.clientHeight,
          scroll: content.scrollHeight - content.clientHeight,
          dayBottom: day.bottom,
          contentBottom: body.getBoundingClientRect().bottom,
          footerBottom: actions.bottom,
          height: innerHeight,
        }
      })
      assert.ok(
        metric.innerScroll <= 1 &&
          metric.scroll <= 1 &&
          metric.dayBottom <= metric.contentBottom + 1 &&
          metric.footerBottom <= metric.height,
        JSON.stringify(metric),
      )
      await panel.locator('.mp-date-panel-actions button').last().click()
      await panel.waitFor({ state: 'hidden' })
      await range.getByRole('button', { name: '截图月份', exact: true }).tap()
      await chooseMode('范围日历模式')
      await range.getByRole('combobox', { name: '普通日期范围', exact: true }).first().tap()
      editor = page.locator('.mp-date-field-popover')
      await editor.waitFor()
      if (mode === 'page') {
        await editor.locator('.mp-day-picker__body').getByRole('button', { name: '2', exact: true }).tap()
      } else {
        assert.equal(await editor.locator('.mp-calendar-viewport').getAttribute('data-mode'), mode)
        await editor.getByRole('button', { name: '2026-10-02', exact: true }).tap()
      }
      await editor.locator('.mp-date-panel-actions button').last().tap()
      await editor.waitFor({ state: 'hidden' })
      await range.locator('[data-result="days"]').filter({ hasText: '2026-10-02' }).waitFor()
      if (theme === 'lightTheme') {
        await range.getByRole('combobox', { name: '普通日期范围', exact: true }).nth(1).tap()
        assert.equal(await panel.locator('.mp-date-range-picker__summary').first().getAttribute('aria-pressed'), 'true')
        await page.screenshot({
          path: new URL('../../artifacts/date-panels/start-panel.png', import.meta.url).pathname,
          scale: 'css',
        })
        await panel.locator('.mp-date-range-picker__summary').nth(1).tap()
        assert.equal(
          await page.locator('.mp-date-field-popover .mp-temporal-current__value').textContent(),
          '2026-10-03',
        )
        await page.screenshot({
          path: new URL('../../artifacts/date-panels/clickable-range.png', import.meta.url).pathname,
          scale: 'css',
        })
      }
      assert.deepEqual(errors, [])
    } finally {
      await context.close()
    }
  })
}
