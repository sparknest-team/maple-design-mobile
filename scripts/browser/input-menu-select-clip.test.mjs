import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { after, before, test } from 'node:test'
import { chromium } from 'playwright'

const origin = 'http://127.0.0.1:5500'
const output = new URL('../../artifacts/input-menu-select-clip/', import.meta.url).pathname
let browser
before(async () => {
  browser = await chromium.launch()
  await mkdir(output, { recursive: true })
})
after(async () => {
  await browser?.close()
})
for (const mode of ['Light', 'Dark']) {
  test(`Firefly ${mode}: dropdown contents respect the outer radius and remain selectable`, async () => {
    const context = await browser.newContext({ viewport: { width: 430, height: 900 }, reducedMotion: 'reduce' })
    await context.addInitScript((theme) => {
      localStorage.setItem('MAPLE_V3_THEME', theme)
      localStorage.setItem('MAPLE_V3_THEME_DEMO', theme)
    }, `firefly${mode}Theme`)
    const page = await context.newPage()
    try {
      await page.goto(origin + '/#/zh-CN/tooltip')
      await page.getByRole('combobox', { name: 'placementValue', exact: true }).click()
      const dropdown = page.locator('.mp-select-dropdown').filter({ visible: true })
      await dropdown.waitFor()
      assert.equal(await dropdown.evaluate((el) => getComputedStyle(el).overflow), 'hidden')
      const clip = await dropdown.evaluate((el) => {
        const box = el.getBoundingClientRect()
        const hit = document.elementFromPoint(box.left + 2, box.top + 2)
        return { radius: parseFloat(getComputedStyle(el).borderRadius), leaks: el.contains(hit) }
      })
      assert.ok(clip.radius > 8, JSON.stringify(clip))
      assert.equal(clip.leaks, false)
      await page.screenshot({ path: `${output}/firefly-${mode.toLowerCase()}-dropdown.png` })
      await dropdown.getByRole('option').last().click()
      await dropdown.waitFor({ state: 'hidden' })
      assert.equal(
        await page.getByRole('combobox', { name: 'placementValue', exact: true }).getAttribute('aria-expanded'),
        'false',
      )
    } finally {
      await context.close()
    }
  })
}
test('Input menu recovers a stale route chunk after a preview rebuild', async () => {
  const page = await browser.newPage({ viewport: { width: 430, height: 900 } })
  try {
    await page.goto(origin + '/#/zh-CN/tooltip')
    await page.getByRole('combobox', { name: 'placementValue', exact: true }).waitFor()
    const toggle = page.getByRole('button', { name: '文档目录', exact: true })
    if (await toggle.isVisible()) {
      await toggle.click()
    }
    let failed = ''
    const requests = []
    page.on('request', (request) => requests.push(request.url()))
    await page.route('**/assets/*.js', async (route) => {
      if (!failed && route.request().frame() === page.mainFrame()) {
        failed = route.request().url()
        await route.abort('failed')
      } else {
        await route.continue()
      }
    })
    await page.getByRole('link', { name: /^Input 输入框/ }).click()
    await page.waitForURL('**/#/zh-CN/input')
    await page.getByRole('heading', { name: '输入框', exact: true }).waitFor()
    assert.ok(failed)
    assert.ok(requests.filter((url) => url === failed).length >= 2)
    assert.equal(await page.evaluate(() => sessionStorage.getItem('maple-site-route-retry:/')), null)
    await page.screenshot({ path: `${output}/input-menu-recovered.png` })
  } finally {
    await page.close()
  }
})
