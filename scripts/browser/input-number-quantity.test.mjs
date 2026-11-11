import assert from 'node:assert/strict'
import { mkdir, readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { chromium } from 'playwright'
import { MapleResolver } from '../../packages/resolver/lib/index.js'

const output = new URL('../../artifacts/input-number-quantity/', import.meta.url).pathname
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
test('Counter has no source export or resolver compatibility alias', async () => {
  const resolver = MapleResolver().find((item) => item.type === 'component')
  assert.equal(resolver.resolve('MpCounter'), undefined)
  assert.equal(resolver.resolve('Counter'), undefined)
  assert.ok(resolver.resolve('MpInputNumber'))
  for (const file of ['index.mjs', 'maple.css']) {
    const text = await readFile(new URL(`../../packages/ui/es/${file}`, import.meta.url), 'utf8')
    assert.doesNotMatch(
      text,
      file.endsWith('.css') ? /--mp-counter-|\.mp-counter(?:\b|__)/ : /\bCounter\b|counterProps|\/counter\//,
    )
  }
})
test('quantity controls and asynchronous approvals work in all light and dark themes', async () => {
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
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto('http://127.0.0.1:5500/#/zh-CN/input-number')
      await page.waitForFunction(
        (expected) =>
          getComputedStyle(document.documentElement).getPropertyValue('--mp-color-scheme').trim() === expected,
        /dark/i.test(theme) ? 'dark' : 'light',
      )
      const demo = page.locator('.quantity-controls-demo').first()
      const quantity = demo.getByRole('spinbutton', { name: '数量控制示例', exact: true })
      await quantity.waitFor()
      assert.equal(await quantity.getAttribute('readonly'), '')
      await quantity.press('ArrowUp')
      assert.equal(await quantity.inputValue(), '3')
      await demo.getByText('禁用增加', { exact: true }).click()
      await quantity.press('ArrowUp')
      assert.equal(await quantity.inputValue(), '3')
      await quantity.press('ArrowDown')
      assert.equal(await quantity.inputValue(), '2')
      await demo.getByText('禁用增加', { exact: true }).click()
      await demo.getByText('显示增加', { exact: true }).click()
      await quantity.press('ArrowUp')
      assert.equal(await quantity.inputValue(), '2')
      await demo.getByText('显示增加', { exact: true }).click()
      await demo.getByText('禁止手输', { exact: true }).click()
      await quantity.fill('6')
      await quantity.press('Enter')
      assert.equal(await quantity.inputValue(), '6')
      await demo.getByText('禁止手输', { exact: true }).click()
      await demo.getByText('开启长按', { exact: true }).click()
      const firstField = demo.locator('.mp-input-number').first()
      const plus = firstField.getByRole('button', { name: /增加/ })
      await plus.scrollIntoViewIfNeeded()
      const box = await plus.boundingBox()
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.waitForTimeout(1100)
      await page.mouse.up()
      assert.equal(await quantity.inputValue(), '7')
      const guarded = demo.getByRole('spinbutton', { name: '异步数量示例', exact: true })
      const guardedField = demo.locator('.mp-input-number').nth(1)
      const approve = demo.getByRole('button', { name: '允许本次变更', exact: true })
      const reject = demo.getByRole('button', { name: '拒绝本次变更', exact: true })
      await guarded.press('ArrowUp')
      await approve.waitFor()
      assert.equal(await guardedField.getAttribute('aria-busy'), 'true')
      assert.equal(await guarded.inputValue(), '2')
      await reject.click()
      assert.equal(await guarded.inputValue(), '2')
      await guarded.press('ArrowUp')
      await approve.click()
      await page.waitForFunction(
        () => document.querySelector('.quantity-controls-demo input[aria-label="异步数量示例"]').value === '3',
      )
      await guardedField.locator('.mp-field-decorator__clear-btn').click()
      await approve.click()
      assert.equal(await guarded.inputValue(), '')
      await guarded.press('ArrowUp')
      await demo.getByRole('button', { name: '外部回填 10', exact: true }).click()
      assert.equal(await guarded.inputValue(), '10')
      assert.equal(await approve.isDisabled(), true)
      await guarded.press('ArrowDown')
      await demo.getByRole('button', { name: '模拟失败', exact: true }).click()
      assert.equal(await guarded.inputValue(), '10')
      await guarded.press('ArrowDown')
      await demo.getByRole('button', { name: '禁用控件', exact: true }).click()
      assert.equal(await guarded.isDisabled(), true)
      assert.equal(await approve.isDisabled(), true)
      await demo.getByRole('button', { name: '恢复可用', exact: true }).click()
      assert.equal(await guarded.inputValue(), '10')
      assert.deepEqual(errors, [])
      await demo.screenshot({ path: `${output}/${theme}.png` })
      console.log(`verified ${theme}`)
      await context.close()
    }
  } finally {
    await browser.close()
  }
})
