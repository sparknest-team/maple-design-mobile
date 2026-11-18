import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer, jsx, vue } from '../../packages/cli/test-utils/browser-vite.mjs'

const root = fileURLToPath(new URL('../../packages/ui/', import.meta.url))
let server
let browser
let page

const fixture = async (_req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(
    await server.transformIndexHtml(
      '/__safe-area-test.html',
      `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><div id="app"></div><div id="bar-root"></div><div id="consumer-root"></div>
<script type="module">
import { createApp, h, reactive, nextTick } from 'vue'
import SafeArea from '/src/safe-area/index.ts'
import Popup from '/src/popup/index.ts'
import Input from '/src/input/index.ts'
import TabBar from '/src/tab-bar/index.ts'
import FloatingPanel from '/src/floating-panel/index.ts'
import Fab from '/src/fab/index.ts'
import Picker from '/src/picker/Picker.vue'
import ActionSheet from '/src/action-sheet/ActionSheet.vue'
import NumberKeyboard from '/src/number-keyboard/index.ts'
import '/src/floating-panel/style/index.ts'
import '/src/picker/style/index.ts'
import '/src/action-sheet/style/index.ts'
import '/src/number-keyboard/style/index.ts'
import '/src/safe-area/style/index.ts'
import '/src/fab/style/index.ts'
import '/src/popup/style/index.ts'
import '/src/input/style/index.ts'
import '/src/tab-bar/style/index.ts'
import '/src/_components/field-presentation/style/index.ts'
const state = reactive({ inline: false, local: false, bottom: 30, consumer: 'tab-bar', safe: true, position: 'bottom-right', rtl: false })
createApp({ render: () => h(SafeArea, { id: 'outer', edges: ['bottom'], insets: state.local ? { bottom: state.bottom } : undefined }, () => [
 h('div', [h(SafeArea, { id: 'inner', edges: ['bottom'] }, () => 'nested')]),
 h(Popup, { open: true, overlay: false, lockScroll: false, placement: 'bottom', popupContainer: state.inline ? false : undefined, safeAreaInsetBottom: true, safeAreaInsetLeft: true, safeAreaInsetRight: true, id: 'portal' }, () => h('div', { class: 'mp-field-presentation__panel', id: 'editor' }, 'editor')),
 h(Input, { id: 'input' })
]) }).mount('#app')
createApp({ render: () => h(TabBar, { id: 'bar', fixed: true, placeholder: true, safeArea: true }) }).mount('#bar-root')
const consumers = { 'tab-bar': TabBar, 'floating-panel': FloatingPanel, fab: Fab, picker: Picker, 'action-sheet': ActionSheet, 'number-keyboard': NumberKeyboard }
createApp({ render: () => h('div', { id: 'consumer-host', dir: state.rtl ? 'rtl' : 'ltr', style: 'position:relative;transform:translateZ(0);width:390px;height:500px' }, [
 h(consumers[state.consumer], { key: state.consumer, safeArea: state.safe, position: state.position, fixed: true, open: true, dynamic: true, overlay: false, lockScroll: false, popupContainer: '#consumer-host', anchors: [240], duration: 0, columns: [[{ text: 'Alice' }]], actions: [{ name: 'Alice' }] }, { default: () => h(SafeArea, { id: 'consumer-nested', edges: ['left', 'right', 'bottom'] }, () => 'content'), fab: () => 'Add' })
]) }).mount('#consumer-root')
window.safeAreaTest = { state, SafeArea, nextTick }
</script>`,
    ),
  )
}

before(
  async () => {
    server = await createServer({
      root,
      configFile: false,
      optimizeDeps: { entries: [], include: ['vue'] },
      plugins: [
        vue(),
        jsx(),
        {
          name: 'safe-area-test-fixture',
          configureServer(server) {
            server.middlewares.use('/__safe-area-test', fixture)
          },
        },
      ],
      server: { host: '127.0.0.1', port: 0 },
    })
    await server.listen()
    browser = await chromium.launch({ headless: true })
    page = await browser.newPage({ viewport: { width: 390, height: 844 } })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    page.on('pageerror', (error) => console.error('Fixture page error:', error.message))
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.error('Fixture HTTP', response.status(), response.url())
      }
    })
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__safe-area-test`)
    await page.waitForFunction(() => Boolean(window.safeAreaTest), null, { timeout: 20000 })
  },
  { timeout: 60000 },
)

after(async () => {
  await browser?.close()
  await server?.close()
})

test('real DOM consumption, portal ownership, zero overrides and independent theme tokens', async () => {
  const result = await page.evaluate(async () => {
    const { SafeArea, state, nextTick } = window.safeAreaTest
    const padding = (id, side = 'Bottom') => getComputedStyle(document.getElementById(id))['padding' + side]
    SafeArea.setInsets({ bottom: 34, left: 12, right: 8 })
    const global = {
      outer: padding('outer'),
      inner: padding('inner'),
      portal: padding('portal'),
      left: padding('portal', 'Left'),
      right: padding('portal', 'Right'),
      editor: padding('editor'),
    }
    state.local = true
    await nextTick()
    const local = { outer: padding('outer'), inner: padding('inner'), portal: padding('portal') }
    state.bottom = 0
    await nextTick()
    const zero = { outer: padding('outer'), portal: padding('portal') }
    state.inline = true
    await nextTick()
    const inline = { portal: padding('portal'), editor: padding('editor') }
    state.inline = false
    await nextTick()
    const returned = padding('portal')
    document.documentElement.style.setProperty('--mp-input-caret-color', 'rgb(1, 2, 3)')
    document.documentElement.style.setProperty('--mp-sys-font-family', 'monospace')
    const input = document.querySelector('input')
    const theme = { caret: getComputedStyle(input).caretColor, font: getComputedStyle(input).fontFamily }
    SafeArea.setInsets({ bottom: 0 })
    const hostZero = padding('portal')
    SafeArea.setInsets(null)
    const reset = padding('portal')
    const keptTheme = getComputedStyle(input).caretColor
    return { global, local, zero, inline, returned, theme, hostZero, reset, keptTheme }
  })
  assert.deepEqual(result.global, {
    outer: '34px',
    inner: '0px',
    portal: '34px',
    left: '12px',
    right: '8px',
    editor: '8px',
  })
  assert.deepEqual(result.local, { outer: '30px', inner: '0px', portal: '34px' })
  assert.deepEqual(result.zero, { outer: '0px', portal: '34px' })
  assert.deepEqual(result.inline, { portal: '0px', editor: '8px' })
  assert.equal(result.returned, '34px')
  assert.deepEqual(result.theme, { caret: 'rgb(1, 2, 3)', font: 'monospace' })
  assert.equal(result.hostZero, '0px')
  assert.equal(result.reset, '0px')
  assert.equal(result.keptTheme, 'rgb(1, 2, 3)')
})

test('landscape host overrides and clearing a local target', async () => {
  await page.setViewportSize({ width: 844, height: 390 })
  const result = await page.evaluate(() => {
    const { SafeArea } = window.safeAreaTest
    SafeArea.setInsets({ left: 44, right: 20, bottom: 10 })
    SafeArea.setInsets({ left: 5, right: 0, bottom: 0 }, document.body)
    const panel = document.getElementById('portal')
    const sample = () => ['paddingLeft', 'paddingRight', 'paddingBottom'].map((key) => getComputedStyle(panel)[key])
    const local = sample()
    SafeArea.setInsets(null, document.body)
    const root = sample()
    SafeArea.setInsets(null)
    return { local, root, overflow: document.documentElement.scrollWidth > innerWidth }
  })
  assert.deepEqual(result.local, ['5px', '0px', '0px'])
  assert.deepEqual(result.root, ['44px', '20px', '10px'])
  assert.equal(result.overflow, false)
})

test('fixed TabBar placeholder follows native CSS inset changes without Vue props changing', async () => {
  for (const bottom of [34, 0, 18]) {
    await page.evaluate((bottom) => window.safeAreaTest.SafeArea.setInsets({ bottom }), bottom)
    await page.waitForFunction(() => {
      const bar = document.getElementById('bar')
      const placeholder = document.querySelector('.mp-tab-bar__placeholder')
      return Math.abs(bar.getBoundingClientRect().height - placeholder.getBoundingClientRect().height) < 0.1
    })
    assert.equal(await page.locator('#bar').evaluate((el) => getComputedStyle(el).paddingBottom), `${bottom}px`)
  }
})

test('asymmetric side insets resize edge components without overflow or duplicate padding', async () => {
  await page.setViewportSize({ width: 844, height: 700 })
  for (const consumer of ['tab-bar', 'floating-panel', 'picker', 'action-sheet', 'number-keyboard']) {
    for (const [left, right] of [
      [12, 72],
      [72, 12],
      [0, 0],
    ]) {
      await page.evaluate(
        async ({ consumer, left, right }) => {
          const { state, SafeArea, nextTick } = window.safeAreaTest
          state.consumer = consumer
          state.safe = true
          SafeArea.setInsets({ left, right, bottom: 34 })
          await nextTick()
        },
        { consumer, left, right },
      )
      const selector =
        consumer === 'tab-bar'
          ? '.mp-tab-bar'
          : consumer === 'floating-panel'
            ? '.mp-floating-panel'
            : consumer === 'picker'
              ? '.mp-picker__popup'
              : `.mp-${consumer}__popup-radius`
      await page.waitForFunction(
        (selector) => document.querySelectorAll('#consumer-host ' + selector).length === 1,
        selector,
      )
      const el = page.locator('#consumer-host ' + selector)
      await el.waitFor({ state: 'visible' })
      const result = await el.evaluate((el) => {
        const css = getComputedStyle(el)
        const nested = el.querySelector('#consumer-nested')
        const host = document.getElementById('consumer-host').getBoundingClientRect()
        const rect = el.getBoundingClientRect()
        return {
          left: css.paddingLeft,
          right: css.paddingRight,
          width: rect.width,
          hostWidth: host.width,
          nested: nested
            ? ['paddingLeft', 'paddingRight', 'paddingBottom'].map((key) => getComputedStyle(nested)[key])
            : null,
        }
      })
      assert.equal(result.left, `${left}px`, consumer)
      assert.equal(result.right, `${right}px`, consumer)
      assert.ok(Math.abs(result.width - result.hostWidth) < 1, `${consumer} must retain host width`)
      if (result.nested) {
        assert.deepEqual(result.nested, ['0px', '0px', '0px'], consumer)
      }
    }
    await page.evaluate(async () => {
      const { state, SafeArea, nextTick } = window.safeAreaTest
      SafeArea.setInsets({ left: 12, right: 72, bottom: 34 })
      state.safe = false
      await nextTick()
    })
    const selector =
      consumer === 'tab-bar'
        ? '.mp-tab-bar'
        : consumer === 'floating-panel'
          ? '.mp-floating-panel'
          : consumer === 'picker'
            ? '.mp-picker__popup'
            : `.mp-${consumer}__popup-radius`
    await page.waitForFunction(
      (selector) => document.querySelectorAll('#consumer-host ' + selector).length === 1,
      selector,
    )
    assert.deepEqual(
      await page
        .locator('#consumer-host ' + selector)
        .evaluate((el) => [getComputedStyle(el).paddingLeft, getComputedStyle(el).paddingRight]),
      ['0px', '0px'],
      consumer,
    )
  }
})

test('FAB avoids the physical edges at each corner and responds to inset changes', async () => {
  for (const position of ['bottom-right', 'bottom-left', 'top-right', 'top-left']) {
    for (const [left, right] of [
      [12, 72],
      [72, 12],
      [0, 0],
    ]) {
      await page.evaluate(
        async ({ position, left, right }) => {
          const { state, SafeArea, nextTick } = window.safeAreaTest
          state.consumer = 'fab'
          state.safe = true
          state.position = position
          SafeArea.setInsets({ top: 24, bottom: 34, left, right })
          await nextTick()
        },
        { position, left, right },
      )
      const result = await page.locator('#consumer-host .mp-fab').evaluate((el) => {
        const css = getComputedStyle(el)
        const rect = el.querySelector('.mp-fab__trigger').getBoundingClientRect()
        const host = document.getElementById('consumer-host').getBoundingClientRect()
        return {
          margins: [css.marginTop, css.marginRight, css.marginBottom, css.marginLeft],
          left: rect.left - host.left,
          right: host.right - rect.right,
        }
      })
      assert.deepEqual(result.margins, [
        position.startsWith('top') ? '24px' : '0px',
        position.endsWith('right') ? `${right}px` : '0px',
        position.startsWith('bottom') ? '34px' : '0px',
        position.endsWith('left') ? `${left}px` : '0px',
      ])
      assert.ok(Math.abs((position.endsWith('right') ? result.right - right : result.left - left) - 16) < 1)
    }
  }
  await page.evaluate(async () => {
    window.safeAreaTest.state.safe = false
    await window.safeAreaTest.nextTick()
  })
  assert.deepEqual(
    await page
      .locator('#consumer-host .mp-fab')
      .evaluate((el) =>
        ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].map((key) => getComputedStyle(el)[key]),
      ),
    ['0px', '0px', '0px', '0px'],
  )
})

test('TabBar FAB remains centered inside asymmetric usable space in both reading directions', async () => {
  for (const rtl of [false, true]) {
    await page.evaluate(async (rtl) => {
      const { state, SafeArea, nextTick } = window.safeAreaTest
      state.consumer = 'tab-bar'
      state.safe = true
      state.rtl = rtl
      SafeArea.setInsets({ left: 12, right: 72, bottom: 34 })
      await nextTick()
    }, rtl)
    const center = await page.locator('#consumer-host .mp-tab-bar__fab').evaluate((el) => {
      const host = document.getElementById('consumer-host').getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      return (rect.left + rect.right) / 2 - host.left
    })
    assert.ok(Math.abs(center - (12 + (390 - 12 - 72) / 2)) < 1)
  }
  await page.evaluate(() => window.safeAreaTest.SafeArea.setInsets(null))
})
