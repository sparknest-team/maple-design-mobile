import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer, jsx, vue } from '../../packages/maple-cli/test-utils/browser-vite.mjs'

const root = fileURLToPath(new URL('../../packages/maple-ui/', import.meta.url))
let server
let browser
let page

const fixture = async (_req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(
    await server.transformIndexHtml(
      '/__safe-area-test.html',
      `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><div id="app"></div><div id="bar-root"></div>
<script type="module">
import { createApp, h, reactive, nextTick } from 'vue'
import SafeArea from '/src/safe-area/index.ts'
import Popup from '/src/popup/index.ts'
import Input from '/src/input/index.ts'
import TabBar from '/src/tab-bar/index.ts'
import '/src/safe-area/style/index.ts'
import '/src/popup/style/index.ts'
import '/src/input/style/index.ts'
import '/src/tab-bar/style/index.ts'
import '/src/_components/field-presentation/style/index.ts'
const state = reactive({ inline: false, local: false, bottom: 30 })
createApp({ render: () => h(SafeArea, { id: 'outer', edges: ['bottom'], insets: state.local ? { bottom: state.bottom } : undefined }, () => [
 h('div', [h(SafeArea, { id: 'inner', edges: ['bottom'] }, () => 'nested')]),
 h(Popup, { open: true, overlay: false, lockScroll: false, placement: 'bottom', popupContainer: state.inline ? false : undefined, safeAreaInsetBottom: true, safeAreaInsetLeft: true, safeAreaInsetRight: true, id: 'portal' }, () => h('div', { class: 'mp-field-presentation__panel', id: 'editor' }, 'editor')),
 h(Input, { id: 'input' })
]) }).mount('#app')
createApp({ render: () => h(TabBar, { id: 'bar', fixed: true, placeholder: true, safeArea: true }) }).mount('#bar-root')
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
