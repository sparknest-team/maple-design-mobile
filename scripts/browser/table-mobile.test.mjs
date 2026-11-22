import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chromium, devices, firefox, webkit } from 'playwright'
import { browserProfile, contextOptions } from '../../../design-ui/browser/compatibility.mjs'
import { touchDrag } from '../../../design-ui/browser/touch.mjs'

const url = new URL('/mobile.html#/table?language=zh-CN', process.env.MAPLE_DOCS_URL ?? 'http://localhost:8080').href

async function settle(page) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

for (const engine of [chromium, firefox, webkit]) {
  test(engine.name() + ' mobile Table', { timeout: 120000 }, async (t) => {
    const browser = await engine.launch()
    t.after(() => browser.close())
    const profile = browserProfile(engine.name())
    const page = await browser.newPage(contextOptions(profile, 'mobile', devices, browser.version()))
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.locator('[data-demo="virtual-details"] tbody tr').first().waitFor()
    t.diagnostic('Engine version ' + browser.version())

    await t.test('left and right fixed columns follow the split header', async () => {
      const demo = page.locator('[data-demo="fixed-column-and-header"]')
      const body = demo.locator('.mp-table-body')
      const geometry = () =>
        demo.evaluate((el) => {
          const body = el.querySelector('.mp-table-body')
          const header = el.querySelector('.mp-table-header')
          const edges = (node, selector) =>
            Array.from(node.querySelectorAll(selector), (cell) => cell.getBoundingClientRect().left)
          return {
            width: body.clientWidth,
            x: body.scrollLeft,
            header: header.scrollLeft,
            cells: edges(body, 'tbody tr:first-child td'),
            heads: edges(header, 'thead tr:first-child th'),
          }
        })
      const before = await geometry()
      await body.evaluate((el) => {
        el.scrollLeft = 145
      })
      await page.waitForFunction(
        () => document.querySelector('[data-demo="fixed-column-and-header"] .mp-table-header').scrollLeft > 100,
      )
      const after = await geometry()
      assert.equal(after.x, after.header)
      for (const i of [0, before.cells.length - 1]) {
        assert.ok(Math.abs(after.cells[i] - before.cells[i]) <= 1)
        assert.ok(Math.abs(after.cells[i] - after.heads[i]) <= 1)
      }
      assert.ok(before.cells[2] - after.cells[2] > 100)

      const portrait = page.viewportSize()
      for (const size of [{ width: portrait.height, height: portrait.width }, portrait]) {
        await page.setViewportSize(size)
        await settle(page)
        const resized = await geometry()
        assert.ok(
          Math.abs(resized.width - (after.width + size.width - portrait.width)) <= 2,
          'table viewport follows the screen width',
        )
        assert.ok(resized.x > 0 && resized.x === resized.header, 'split header retains its horizontal offset')
        const last = resized.cells.length - 1
        assert.ok(Math.abs(resized.cells[0] - after.cells[0]) <= 1)
        assert.ok(Math.abs(resized.cells[last] - after.cells[last] - (resized.width - after.width)) <= 1)
        assert.ok(resized.cells.every((x, i) => Math.abs(x - resized.heads[i]) <= 1))
      }
    })

    await t.test('diagonal drag stays in the active tab and permits the intended scroll axis', async () => {
      const demo = page.locator('[data-demo="tabs-frozen"]')
      const content = demo.locator('.mp-table-content')
      const cell = demo.locator('tbody tr:first-child td').nth(2)
      assert.ok(
        await content.evaluate((el) => el.clientHeight >= el.querySelector('tbody').offsetHeight),
        'auto-height scrollport contains the rendered rows',
      )
      const active = demo.getByRole('tab', { selected: true })
      const trusted = engine.name() === 'chromium'
      await cell.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      for (const [dx, dy] of [
        [-14, -88],
        [-70, -18],
      ]) {
        await content.evaluate((el) => {
          el.scrollLeft = 0
        })
        await cell.evaluate((el) => el.scrollIntoView({ block: 'center' }))
        await settle(page)
        const top = await page.evaluate(() => scrollY)
        await touchDrag(page, cell, dx, dy)
        if (trusted && Math.abs(dy) > Math.abs(dx)) {
          await page.waitForFunction((y) => scrollY > y + 5, top, { timeout: 3000 })
        }
        if (trusted && Math.abs(dx) > Math.abs(dy)) {
          await page.waitForFunction((el) => el.scrollLeft > 5, await content.elementHandle(), { timeout: 3000 })
        }
        assert.equal(await active.innerText(), '销售')
      }
      t.diagnostic(trusted ? 'Chromium protocol touch input' : 'Synthetic touch events exercise the tab handler only')
    })

    await t.test('variable-height expanded row returns to its measured scroll position', async () => {
      const body = page.locator('[data-demo="virtual-details"] .mp-table-body')
      await body.scrollIntoViewIfNeeded()
      await body.evaluate((el) => {
        el.scrollTop = 540
      })
      await settle(page)
      const target = await body.evaluate((el) => {
        const top = el.getBoundingClientRect().top
        const row = [...el.querySelectorAll('tbody tr')].find(
          (r) => r.querySelector('button') && r.getBoundingClientRect().top > top + 32,
        )
        return row.querySelector('[data-column-key="shipment"]').textContent.trim()
      })
      const row = body.locator('tbody tr').filter({ has: page.getByText(target, { exact: true }) })
      const offset = () =>
        row.evaluate((r) => r.getBoundingClientRect().top - r.closest('.mp-table-body').getBoundingClientRect().top)
      const initial = await offset()
      await row.getByRole('button').click()
      await settle(page)
      const anchor = await offset()
      assert.ok(Math.abs(anchor - initial) <= 2, 'expansion leaves the selected row anchored')
      const saved = await body.evaluate((el) => el.scrollTop)
      const detail = body.getByText('包裹追踪号 · ' + target + '-1', { exact: true })
      await detail.waitFor()
      await body.evaluate((el) => {
        el.scrollTop += 2600
      })
      await row.waitFor({ state: 'detached' })
      await body.evaluate((el, top) => {
        el.scrollTop = top
      }, saved)
      await detail.waitFor()
      await settle(page)
      assert.equal(await row.getByRole('button').getAttribute('aria-expanded'), 'true')
      const drift = Math.abs((await offset()) - anchor)
      assert.ok(drift <= 2, 'row offset drift after recycling: ' + drift)
      const portrait = page.viewportSize()
      for (const size of [{ width: portrait.height, height: portrait.width }, portrait]) {
        await page.setViewportSize(size)
        await settle(page)
        assert.equal(await row.getByRole('button').getAttribute('aria-expanded'), 'true')
        assert.ok(await detail.isVisible())
        const resizedDrift = Math.abs((await offset()) - anchor)
        assert.ok(resizedDrift <= 2, 'expanded row offset drift after resize: ' + resizedDrift)
        t.diagnostic(size.width + '×' + size.height + ' expanded row offset drift: ' + resizedDrift + ' CSS px')
      }
      await row.getByRole('button').click()
      await detail.waitFor({ state: 'detached' })
      t.diagnostic(target + ' returned with ' + drift + ' CSS px drift')
    })
  })
}
