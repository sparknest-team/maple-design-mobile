import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import vm from 'node:vm'

const uiDirectory = fileURLToPath(new URL('../../packages/ui/', import.meta.url))
const generator = new URL('../../packages/cli/lib/node/compiler/generateLibraryEntry.js', import.meta.url).href

test('regenerating library exports retains the named NavMenuItem and both resolver aliases', async () => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import { exportedComponentTokens } from ${JSON.stringify(generator)}; process.stdout.write(JSON.stringify(await exportedComponentTokens('nav-menu')));`,
    ],
    { cwd: uiDirectory },
  )
  const tokens = JSON.parse(stdout)
  for (const token of ['NavMenuItem', '_NavMenuComponent', '_NavMenuItemComponent']) {
    assert(tokens.includes(token), `missing generated public export: ${token}`)
  }
  assert.equal(tokens.filter((token) => token === 'NavMenuItem').length, 1)
})

test('published ESM and CJS NavMenu entries retain their public contracts', async () => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
    import assert from 'node:assert/strict';
    import { createRequire } from 'node:module';
    const esm = await import('./es/nav-menu/index.mjs');
    const cjs = createRequire(import.meta.url)('./lib/nav-menu/index.js');
    for (const api of [esm, cjs]) {
      assert.equal(api.NavMenu.Item, api.NavMenuItem);
      assert.equal(api.NavMenu, api._NavMenuComponent);
      assert.equal(api.NavMenuItem, api._NavMenuItemComponent);
      assert.equal(api.navMenuItemProps.popupLayout.default, 'full-width');
    }
    console.log('published NavMenu component contracts passed');
  `,
    ],
    { cwd: uiDirectory },
  )
  assert.match(stdout, /published NavMenu component contracts passed/)
})

test('browser UMD exposes NavMenu and Item without Node globals', async () => {
  const require = createRequire(new URL('../../packages/ui/package.json', import.meta.url))
  const { JSDOM } = require('jsdom')
  const dom = new JSDOM('<!doctype html><body></body>', { runScripts: 'outside-only', pretendToBeVisual: true })
  let app
  try {
    assert.equal(typeof dom.window.process, 'undefined')
    vm.runInContext(
      await readFile(require.resolve('vue/dist/vue.global.prod.js'), 'utf8'),
      dom.getInternalVMContext(),
      { timeout: 5000 },
    )
    vm.runInContext(
      await readFile(new URL('../../packages/ui/umd/maple.js', import.meta.url), 'utf8'),
      dom.getInternalVMContext(),
      { timeout: 5000 },
    )
    const api = dom.window.Maple
    assert.equal(api.NavMenu.Item, api.NavMenuItem)
    assert.equal(api.NavMenu, api._NavMenuComponent)
    assert.equal(api.NavMenuItem, api._NavMenuItemComponent)
    assert.equal(api.navMenuItemProps.popupLayout.default, 'full-width')
    const vue = dom.window.Vue
    const selected = vue.ref(null)
    const host = dom.window.document.createElement('div')
    dom.window.document.body.appendChild(host)
    app = vue.createApp({
      render: () =>
        vue.h(
          api.NavMenu,
          { popupContainer: false },
          {
            default: () =>
              vue.h(api.NavMenuItem, {
                label: '分类',
                options: [
                  { key: 0, label: '全部' },
                  { key: 'design', label: '设计资源' },
                ],
                modelValue: selected.value,
                'onUpdate:modelValue': (value) => {
                  selected.value = value
                },
              }),
          },
        ),
    })
    app.mount(host)
    await vue.nextTick()
    host.querySelector('[data-nav-item]').click()
    await vue.nextTick()
    const option = Array.from(dom.window.document.querySelectorAll('[data-nav-option]')).find(
      (element) => element.textContent === '设计资源',
    )
    assert.ok(option, 'actual UMD mounts the independent options panel')
    option.click()
    await vue.nextTick()
    assert.equal(selected.value, 'design')
    assert.equal(host.querySelector('[data-nav-item]').textContent, '设计资源')
    assert.equal(host.querySelector('[data-nav-item]').getAttribute('aria-expanded'), 'false')
  } finally {
    app?.unmount()
    dom.window.close()
  }
})
