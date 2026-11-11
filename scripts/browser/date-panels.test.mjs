import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer, jsx, vue } from '../../packages/cli/test-utils/browser-vite.mjs'

const root = fileURLToPath(new URL('../../packages/ui/', import.meta.url))
const output = fileURLToPath(new URL('../../artifacts/date-panels/', import.meta.url))
let server
let browser
const fixture = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{margin:0;background:var(--mp-color-body);color:var(--mp-color-text);font-family:sans-serif} main{padding:32px 20px;width:350px;max-width:calc(100vw - 40px)}
</style></head><body><main><div id="app"></div></main><script type="module">
import {createApp,h,ref,nextTick} from 'vue'
import DateDemo from '/src/date/example/demos/time-zone-views.vue'
import RangeDemo from '/src/date-range/example/demos/zoned-range.vue'
import Themes from '/src/themes/index.ts'
import ThemeProvider from '/src/theme-provider/index.ts'
import DateField from '/src/date/index.ts'
import DateRange from '/src/date-range/index.ts'
import Select from '/src/select/index.ts'
import Button from '/src/button/index.ts'
import Space from '/src/space/index.ts'
import '/src/date/style/index.ts'
import '/src/date-range/style/index.ts'
import '/src/select/style/index.ts'
import '/src/space/style/index.ts'
const open=ref(false), value=ref(['2026-10-01','2026-10-03']), surface=ref('direct'), interactionMode=ref('page'), showTime=ref(false), navigations=ref([])
const themeVars=ref(Themes.default.light)
const app=createApp({render:()=>h(ThemeProvider,{theme:themeVars.value},()=>h('div',[
h(DateRange,{modelValue:value.value,open:open.value,editMode:surface.value,interactiveMode:interactionMode.value,showTime:showTime.value,inputEditable:false,'aria-label':'Geometry range','onUpdate:open':v=>open.value=v,'onUpdate:modelValue':v=>value.value=v,'onUpdate:pickerValue':v=>navigations.value.push(v)}),
h('div',{style:'margin-top:1000px'},[h(DateDemo),h(RangeDemo)])]))})
;[DateField,DateRange,Select,Button,Space].forEach(c=>app.use(c))
app.mount('#app')
window.panelTest={setTheme:(brand,mode)=>themeVars.value=Themes[brand][mode],nextTick,open,value,surface,interactionMode,showTime,navigations}
</script></body></html>`
before(
  async () => {
    await mkdir(output, { recursive: true })
    server = await createServer({
      root,
      configFile: false,
      optimizeDeps: { entries: [], include: ['vue'] },
      plugins: [
        vue(),
        jsx(),
        {
          name: 'date-panel-fixture',
          configureServer(s) {
            s.middlewares.use('/__date-panels', async (_req, res) => {
              res.setHeader('Content-Type', 'text/html')
              res.end(await server.transformIndexHtml('/__date-panels.html', fixture))
            })
          },
        },
      ],
      server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/*'] } },
    })
    await server.listen()
    browser = await chromium.launch({ headless: true })
  },
  { timeout: 60000 },
)

after(async () => {
  await browser?.close()
  await server?.close()
})

async function ready(page) {
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__date-panels`)
  await page.waitForFunction(() => Boolean(window.panelTest))
  await page.getByRole('combobox', { name: 'Geometry range', exact: true }).first().click()
  try {
    await page.locator('.mp-date-field-popover .mp-date-panel-actions').waitFor({ timeout: 5000 })
  } catch (e) {
    await writeFile(`${output}/debug.html`, await page.content())
    await page.screenshot({ path: `${output}/debug.png` })
    throw e
  }
  await page.waitForTimeout(250)
}
async function geometry(page) {
  return page.evaluate(() => {
    const main = document.querySelector('.mp-date-field-popover .mp-date-panel__main')
    const content = main.firstElementChild,
      actions = main.querySelector('.mp-date-panel-actions')
    const rect = (e) => {
      const r = e.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, height: r.height }
    }
    const day = [...main.querySelectorAll('[mp-day-picker-cover]')].filter((e) => e.textContent.trim() === '31').at(-1)
    return {
      panel: rect(main),
      content: rect(content),
      actions: rect(actions),
      day: rect(day),
      scroll: content.scrollHeight - content.clientHeight,
      viewport: innerHeight,
    }
  })
}
for (const brand of ['default', 'maple', 'alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(`${brand}/${mode}: full month fits; small viewport keeps actions reachable`, async () => {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      const errors = []
      page.on('pageerror', (e) => errors.push(e.message))
      try {
        await ready(page)
        await page.evaluate(([b, m]) => window.panelTest.setTheme(b, m), [brand, mode])
        await page.waitForTimeout(100)
        const g = await geometry(page)
        assert.ok(g.scroll <= 1, JSON.stringify(g))
        assert.ok(g.day.bottom <= g.content.bottom + 1, JSON.stringify(g))
        assert.ok(g.panel.top >= 0 && g.actions.bottom <= g.viewport, JSON.stringify(g))
        await page.screenshot({ path: `${output}/${brand}-${mode}.png` })
        await page.setViewportSize({ width: 844, height: 390 })
        await page.waitForTimeout(150)
        const small = await geometry(page)
        assert.ok(small.panel.top >= 0 && small.actions.bottom <= small.viewport, JSON.stringify(small))
        await page.locator('.mp-date-panel-actions button').last().click()
        await page.locator('.mp-date-field-popover').waitFor({ state: 'hidden' })
        assert.deepEqual(errors, [])
      } finally {
        await page.close()
      }
    })
  }
}
test('brand switching restores every computed token of default and Maple', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  try {
    await ready(page)
    const snapshot = () =>
      page.evaluate(() => {
        const root = getComputedStyle(document.documentElement)
        return Object.fromEntries(
          [...root].filter((k) => k.startsWith('--mp-')).map((k) => [k, root.getPropertyValue(k)]),
        )
      })
    for (const old of ['default', 'maple']) {
      for (const mode of ['light', 'dark']) {
        await page.evaluate(([b, m]) => window.panelTest.setTheme(b, m), [old, mode])
        const baseline = await snapshot()
        for (const brand of ['alps', 'firefly']) {
          for (const next of ['light', 'dark']) {
            await page.evaluate(([b, m]) => window.panelTest.setTheme(b, m), [brand, next])
            await page.evaluate(([b, m]) => window.panelTest.setTheme(b, m), [old, mode])
            assert.deepEqual(await snapshot(), baseline, `${old}/${mode} after ${brand}/${next}`)
          }
        }
      }
    }
  } finally {
    await page.close()
  }
})

test('a six-row month keeps the final week visible', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  try {
    await ready(page)
    await page.keyboard.press('Escape')
    await page.evaluate(async () => {
      window.panelTest.value.value = ['2026-08-01', '2026-08-03']
      await window.panelTest.nextTick()
    })
    await page.getByRole('combobox', { name: 'Geometry range', exact: true }).first().click()
    await page.waitForTimeout(250)
    const month = await page.locator('.mp-date-field-popover .mp-date-picker__body').evaluate((el) => ({
      overflow: el.scrollHeight - el.clientHeight,
      lastBottom: [...el.querySelectorAll('[mp-day-picker-cover]')]
        .filter((b) => b.textContent.trim() === '31')
        .at(-1)
        .getBoundingClientRect().bottom,
      bottom: el.getBoundingClientRect().bottom,
    }))
    assert.ok(month.overflow <= 1 && month.lastBottom <= month.bottom + 1, JSON.stringify(month))
  } finally {
    await page.close()
  }
})
test('independent demos mount, expose presets and preserve the second repeated instant', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  try {
    await ready(page)
    await page.keyboard.press('Escape')
    const date = page.locator('.zone-views-demo')
    await date.getByRole('button', { name: '纽约秋季第二次 01:30', exact: true }).click()
    await date.locator('[data-result="instant"]').filter({ hasText: '2026-11-01T06:30:00.000Z' }).waitFor()
    const range = page.locator('.zoned-range-demo')
    await range.getByRole('button', { name: '秋季第二次 01:30', exact: true }).click()
    await range.locator('[data-result="range"]').filter({ hasText: '2026-11-01T06:30:00.000Z' }).waitFor()
    await range.getByRole('button', { name: '跨月范围', exact: true }).click()
    await range.locator('[data-result="range"]').filter({ hasText: '2026-11-02T15:00:00.000Z' }).waitFor()
    assert.deepEqual(errors, [])
  } finally {
    await page.close()
  }
})

for (const brand of ['alps', 'firefly']) {
  for (const theme of ['light', 'dark']) {
    test(`${brand}/${theme}: opening either endpoint retains both summaries and edits the active endpoint`, async () => {
      const page = await browser.newPage({ viewport: { width: 430, height: 900 }, reducedMotion: 'reduce' })
      const initial = ['2026-10-01 09:00:00', '2026-10-03 11:00:00']
      try {
        await ready(page)
        await page.keyboard.press('Escape')
        await page.evaluate(([b, t]) => window.panelTest.setTheme(b, t), [brand, theme])
        for (const surface of ['direct', 'popup']) {
          for (const mode of ['page', 'scroll', 'line']) {
            for (const endpoint of [0, 1]) {
              await page.evaluate(
                async ({ surface, mode, initial }) => {
                  const state = window.panelTest
                  state.surface.value = surface
                  state.interactionMode.value = mode
                  state.showTime.value = true
                  state.value.value = [...initial]
                  await state.nextTick()
                },
                { surface, mode, initial },
              )
              await page.getByRole('combobox', { name: 'Geometry range', exact: true }).nth(endpoint).click()
              const editor = page.locator('.mp-date-range-picker').filter({ visible: true })
              await editor.waitFor()
              assert.equal(await editor.locator('.mp-date-range-picker__summaries').count(), 1)
              assert.equal(
                await editor.locator('.mp-date-range-picker__summary').first().getAttribute('aria-pressed'),
                'true',
              )
              if (endpoint === 1) {
                await editor.locator('.mp-date-range-picker__summary').nth(1).click()
              }
              assert.equal(
                await editor.locator('.mp-temporal-current__value').textContent(),
                endpoint ? '2026-10-03' : '2026-10-01',
              )
              if (mode === 'page') {
                assert.equal(await editor.locator('.mp-day-picker__button.mp-button--status-primary').count(), 1)
                await editor.locator('.mp-day-picker__body').getByRole('button', { name: '2', exact: true }).click()
              } else {
                assert.equal(await editor.locator('.mp-calendar-viewport button[aria-pressed="true"]').count(), 1)
                assert.equal(await editor.locator('[data-in-range]').count(), 0)
                await editor.getByRole('button', { name: '2026-10-02', exact: true }).click()
              }
              assert.deepEqual(await page.evaluate(() => [...window.panelTest.value.value]), initial)
              await page.getByRole('button', { name: '确认', exact: true }).filter({ visible: true }).click()
              await editor.waitFor({ state: 'hidden' })
              const expected = [...initial]
              expected[endpoint] = '2026-10-02' + (endpoint ? ' 11:00:00' : ' 09:00:00')
              assert.deepEqual(await page.evaluate(() => [...window.panelTest.value.value]), expected)
            }
          }
        }
      } finally {
        await page.close()
      }
    })
  }
}

for (const touch of [false, true]) {
  for (const [mode, label] of [
    ['page', '翻页'],
    ['scroll', '多月虚拟滚动'],
    ['line', '单行周日历'],
  ]) {
    test(`${touch ? 'touch' : 'mouse'}: ${mode} options open selectable date and range panels`, async () => {
      const page = await browser.newPage({
        viewport: { width: 390, height: 844 },
        hasTouch: touch,
        isMobile: touch,
        reducedMotion: 'reduce',
      })
      const errors = []
      page.on('pageerror', (e) => errors.push(e.message))
      const activate = async (locator) => (touch ? locator.tap() : locator.click({ delay: 100 }))
      const chooseMode = async (name) => {
        await activate(page.getByRole('combobox', { name, exact: true }))
        await activate(page.getByRole('option', { name: label, exact: true }).filter({ visible: true }))
        assert.equal(await page.getByRole('combobox', { name, exact: true }).getAttribute('aria-expanded'), 'false')
      }
      const selectDate = async (iso, day, editTime) => {
        const panel = page.locator('.mp-date-field-popover')
        await panel.waitFor()
        if (mode === 'page') {
          assert.equal(await panel.locator('.mp-calendar-viewport').count(), 0)
          await activate(panel.locator('.mp-day-picker__body').getByRole('button', { name: day, exact: true }))
        } else {
          assert.equal(await panel.locator('.mp-calendar-viewport').getAttribute('data-mode'), mode)
          await activate(panel.getByRole('button', { name: iso, exact: true }))
        }
        if (editTime === 'single') {
          await activate(
            panel.locator('.mp-date-picker__quick-time').getByRole('option', { name: '02:00', exact: true }),
          )
          await activate(panel.getByRole('button', { name: '选择时间', exact: true }))
          await activate(
            panel
              .locator('.mp-date-picker__datetime-picker')
              .getByRole('listbox')
              .first()
              .getByRole('option', { name: '03', exact: true }),
          )
        } else if (editTime === 'range') {
          await activate(
            panel.locator('.mp-date-range-picker__quick-time').getByRole('option', { name: '11:00', exact: true }),
          )
        }
        await activate(panel.locator('.mp-date-panel-actions button').last())
        await panel.waitFor({ state: 'hidden' })
      }
      try {
        await ready(page)
        await page.keyboard.press('Escape')
        await chooseMode('示例日历模式')
        await activate(page.getByRole('combobox', { name: '时区预约', exact: true }))
        await selectDate('2026-03-09', '9', 'single')
        await page
          .locator('.zone-views-demo [data-result="instant"]')
          .filter({ hasText: '2026-03-09T07:00:00.000Z' })
          .waitFor()
        await chooseMode('范围日历模式')
        await activate(page.getByRole('combobox', { name: '普通日期范围', exact: true }).first())
        await selectDate('2026-10-02', '2')
        await page.locator('.zoned-range-demo [data-result="days"]').filter({ hasText: '2026-10-02' }).waitFor()
        await activate(page.getByRole('combobox', { name: '跨时区行程', exact: true }).first())
        await selectDate('2026-10-30', '30', 'range')
        await page
          .locator('.zoned-range-demo [data-result="range"]')
          .filter({ hasText: '2026-10-30T15:00:00.000Z' })
          .waitFor()
        assert.deepEqual(errors, [])
      } finally {
        await page.close()
      }
    })
  }
}

for (const brand of ['alps', 'firefly']) {
  for (const theme of ['light', 'dark']) {
    test(`${brand}/${theme}: scroll navigation updates the range viewport in both directions`, async () => {
      const page = await browser.newPage({ viewport: { width: 430, height: 900 }, reducedMotion: 'reduce' })
      try {
        await ready(page)
        await page.keyboard.press('Escape')
        await page.evaluate(([brand, theme]) => window.panelTest.setTheme(brand, theme), [brand, theme])
        for (const surface of ['direct', 'popup']) {
          for (const showTime of [false, true]) {
            const initial = showTime ? ['2026-10-01 09:00:00', '2026-10-03 11:00:00'] : ['2026-10-01', '2026-10-03']
            await page.evaluate(
              async ({ surface, showTime, initial }) => {
                const state = window.panelTest
                state.surface.value = surface
                state.showTime.value = showTime
                state.interactionMode.value = 'scroll'
                state.value.value = initial
                state.navigations.value = []
                await state.nextTick()
              },
              { surface, showTime, initial },
            )
            await page.getByRole('combobox', { name: 'Geometry range', exact: true }).first().click()
            const scroller = page.locator('.mp-calendar-viewport__scroll').filter({ visible: true })
            await scroller.hover()
            const top = await scroller.evaluate((el) => el.scrollTop)
            const monthHeight = await scroller
              .locator('.mp-calendar-viewport__month')
              .first()
              .evaluate((el) => el.getBoundingClientRect().height)
            await page.mouse.wheel(0, monthHeight * 1.1)
            await page.waitForFunction(() => window.panelTest.navigations.value.at(-1)?.[0]?.startsWith('2026-11-01'))
            await page.waitForTimeout(150)
            assert.ok((await scroller.evaluate((el) => el.scrollTop)) > top)
            if (brand === 'alps' && theme === 'light' && surface === 'direct' && !showTime) {
              await scroller.evaluate((el, height) => {
                el.scrollTop = Math.floor(el.scrollTop / height) * height
              }, monthHeight)
              await page.screenshot({ path: `${output}/scroll-next-month.png` })
            }
            await page.mouse.wheel(0, -monthHeight * 2)
            await page.waitForFunction(() => window.panelTest.navigations.value.at(-1)?.[0]?.startsWith('2026-09-01'))
            await page.waitForTimeout(150)
            assert.ok((await scroller.evaluate((el) => el.scrollTop)) < top)
            assert.deepEqual(await page.evaluate(() => [...window.panelTest.value.value]), initial)
            await page.getByRole('button', { name: '确认', exact: true }).filter({ visible: true }).click()
            await scroller.waitFor({ state: 'hidden' })
          }
        }
      } finally {
        await page.close()
      }
    })
  }
}

for (const brand of ['default', 'maple', 'alps', 'firefly']) {
  for (const theme of ['light', 'dark']) {
    test(`${brand}/${theme}: compact week strip matches calendar cells`, async () => {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      try {
        await ready(page)
        await page.keyboard.press('Escape')
        await page.evaluate(
          async ([brand, theme]) => {
            const state = window.panelTest
            state.setTheme(brand, theme)
            state.interactionMode.value = 'line'
            state.value.value = ['2026-11-02', '2026-11-03']
            await state.nextTick()
          },
          [brand, theme],
        )
        await page.getByRole('combobox', { name: 'Geometry range', exact: true }).first().click()
        const week = page.locator('.mp-calendar-viewport[data-mode="line"]').filter({ visible: true })
        await week.waitFor()
        assert.equal(await week.locator('.mp-calendar-viewport__period').textContent(), '2026.11.01 – 07')
        assert.equal(await week.locator('.mp-calendar-viewport__weekdays span').count(), 7)
        const selected = week.locator('.mp-calendar-viewport__grid button[aria-pressed="true"]')
        const metrics = await selected.evaluate((el) => {
          const value = el.querySelector('.mp-calendar-viewport__day-value')
          const cell = el.getBoundingClientRect()
          const dot = value.getBoundingClientRect()
          return {
            cellHeight: cell.height,
            dotWidth: dot.width,
            width: getComputedStyle(value).width,
            minWidth: getComputedStyle(value).minWidth,
            flex: getComputedStyle(value).flex,
            token: getComputedStyle(value).getPropertyValue('--mp-day-picker-content-item-button-width'),
            dotHeight: dot.height,
            radius: getComputedStyle(value).borderRadius,
            buttonBackground: getComputedStyle(el).backgroundColor,
            dotBackground: getComputedStyle(value).backgroundColor,
          }
        })
        assert.ok(metrics.cellHeight >= 44, JSON.stringify(metrics))
        assert.ok(metrics.dotHeight < metrics.cellHeight && metrics.dotWidth <= 36, JSON.stringify(metrics))
        assert.equal(metrics.radius, '50%')
        assert.equal(metrics.buttonBackground, 'rgba(0, 0, 0, 0)')
        assert.notEqual(metrics.dotBackground, 'rgba(0, 0, 0, 0)')
        await page.screenshot({ path: `${output}/week-${brand}-${theme}.png` })
        await week.getByRole('button', { name: /Next week|下一周/ }).click()
        assert.equal(await week.locator('.mp-calendar-viewport__period').textContent(), '2026.11.08 – 14')
        await week.getByRole('button', { name: /Previous week|上一周/ }).click()
        assert.equal(await week.locator('.mp-calendar-viewport__period').textContent(), '2026.11.01 – 07')
        assert.deepEqual(await page.evaluate(() => [...window.panelTest.value.value]), ['2026-11-02', '2026-11-03'])
        await week.getByRole('button', { name: '2026-11-01', exact: true }).click()
        await page.getByRole('button', { name: '确认', exact: true }).filter({ visible: true }).click()
        await week.waitFor({ state: 'hidden' })
        assert.deepEqual(await page.evaluate(() => [...window.panelTest.value.value]), ['2026-11-01', '2026-11-03'])
      } finally {
        await page.close()
      }
    })
  }
}
