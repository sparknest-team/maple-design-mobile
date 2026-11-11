import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import { MapleStyleImports } from '../lib/index.js'

const cliRequire = createRequire(new URL('../../cli/package.json', import.meta.url))
const viteRequire = createRequire(cliRequire.resolve('vite'))
const { parseAst } = await import(viteRequire.resolve('rollup/parseAst'))
const transform = (source, options, id = '/src/demo.js') =>
  MapleStyleImports(options).transform.call({ parse: parseAst }, source, id)

test('explicit functions and aliases add the original export styles', () => {
  const source = "import { Message as notify, Dialog } from '@maple-design/ui-vue'; notify('hello')"
  const result = transform(source)
  assert(result.code.includes('import "@maple-design/ui-vue/message/style";'))
  assert(result.code.includes('import "@maple-design/ui-vue/dialog/style";'))
  assert(result.code.startsWith(source))
})
test('components and internal resolver imports share the same style mapping', () => {
  const result = transform(
    "import { Button, _ButtonComponent, Row, GridItem, imagePreview } from '@maple-design/ui-vue'",
  )
  assert.equal(result.code.match(/import "@maple-design\/ui-vue\/button\/style";/g).length, 1)
  for (const name of ['row', 'grid', 'image']) {
    assert(result.code.includes('@maple-design/ui-vue/' + name + '/style'))
  }
})
test('is idempotent and does not duplicate existing side-effect imports', () => {
  const result = transform("import { Message } from '@maple-design/ui-vue'")
  assert.equal(transform(result.code), undefined)
  assert.equal(
    transform("import { Message } from '@maple-design/ui-vue'; import '@maple-design/ui-vue/message/style'"),
    undefined,
  )
})
test('ignores other packages, namespace imports, comments, strings and styleless exports', () => {
  for (const source of [
    "import { Message } from 'another-library'",
    "import * as Maple from '@maple-design/ui-vue'",
    "// import { Message } from '@maple-design/ui-vue'",
    `const text = "import { Message } from '@maple-design/ui-vue'"`,
    "import { Locale, Themes, messageProps } from '@maple-design/ui-vue'",
    "import { providePeopleSelect, peopleSelectConfigKey } from '@maple-design/ui-vue'",
  ]) {
    assert.equal(transform(source), undefined)
  }
})
test('supports disabling styles and skips non-script requests', () => {
  const source = "import { Message } from '@maple-design/ui-vue'"
  assert.equal(transform(source, { importStyle: false }), undefined)
  assert.equal(transform(source, {}, '/src/demo.vue?vue&type=style&index=0'), undefined)
  assert.equal(transform(source, {}, '/src/demo.css'), undefined)
})
test('runs after TypeScript erasure without generating styles for type-only imports', async () => {
  const vite = await import(cliRequire.resolve('vite'))
  const { transformWithEsbuild } = vite.default ?? vite
  const { code } = await transformWithEsbuild(
    "import type { MessageOptions } from '@maple-design/ui-vue'; import { Message as notify } from '@maple-design/ui-vue'; notify('hello')",
    '/src/demo.ts',
    { loader: 'ts' },
  )
  const result = transform(code, {}, '/src/demo.ts')
  assert(result.code.includes('@maple-design/ui-vue/message/style'))
  assert(!result.code.includes('message-options/style'))
})

test('covers Maple programmatic API style mappings', () => {
  for (const [name, style] of [
    ['Message', 'message'],
    ['Dialog', 'dialog'],
    ['ActionSheet', 'action-sheet'],
    ['Picker', 'picker'],
    ['LoadingBar', 'loading-bar'],
    ['ImagePreview', 'image'],
    ['imagePreview', 'image'],
  ]) {
    const result = transform('import { ' + name + " as invoke } from '@maple-design/ui-vue'; invoke({})")
    assert(result.code.includes('@maple-design/ui-vue/' + style + '/style'), name)
  }
})

test('TabBar and TabBarItem resolve to the renamed component and shared style entry', async () => {
  const { MapleResolver } = await import('../lib/index.js')
  const resolver = MapleResolver().find((item) => item.type === 'component')
  for (const name of ['TabBar', 'TabBarItem']) {
    const result = resolver.resolve('Mp' + name)
    assert.equal(result.name, '_' + name + 'Component')
    assert.deepEqual(result.sideEffects, ['@maple-design/ui-vue/tab-bar/style'])
  }
  assert.equal(resolver.resolve('MpBottomNavigation'), undefined)
  assert.equal(resolver.resolve('MpBottomNavigationItem'), undefined)
})

// NavMenuItem is a public subcomponent sharing its parent's style entry.
test('NavMenu and NavMenuItem share the nav-menu style entry', () => {
  const result = transform("import { NavMenu, NavMenuItem, _NavMenuItemComponent } from '@maple-design/ui-vue'")
  assert.equal(result.code.match(/import "@maple-design\/ui-vue\/nav-menu\/style";/g).length, 1)
  assert(!result.code.includes('@maple-design/ui-vue/nav-menu-item/style'))
})
