import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { createSiteImportPlugin, createSiteResolver } from '../../packages/maple-cli/lib/node/config/site-resolver.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
const source = resolve(root, 'packages/maple-ui/src')
const [components, directives] = createSiteResolver(source)

test('documentation component imports bypass the root barrel, preserving styles', () => {
  for (const [name, directory] of [
    ['MpCell', 'cell'],
    ['MpCascader', 'cascader'],
    ['MpCounter', 'counter'],
  ]) {
    const result = components.resolve(name)
    assert.equal(result.from, resolve(source, directory))
    assert.deepEqual(result.sideEffects, [`@maplejs/maple-ui/${directory}/style`])
  }
})

test('nested components resolve through their actual public exporting module', () => {
  assert.equal(components.resolve('MpFormItem').from, resolve(source, 'form'))
  assert.equal(components.resolve('MpDatePicker').from, resolve(source, 'date'))
  assert.equal(components.resolve('MpGridItem').from, resolve(source, 'grid'))
})

test('directives use direct modules and keep their registered names', () => {
  assert.equal(directives.resolve('Ripple').from, resolve(source, 'ripple'))
  assert.equal(directives.resolve('MpLoading').name, 'vLoading')
  assert.equal(directives.resolve('MpLoading').from, resolve(source, 'loading'))
})

test('public function APIs, SVG packages and unresolved private components are unchanged', () => {
  assert.equal(components.resolve('Message').from, '@maplejs/maple-ui')
  assert.equal(components.resolve('MIconGithub').from, '@maplejs/icons-vue/icon-github')
  assert.equal(components.resolve('MpActionItem'), undefined)
  assert.equal(createSiteResolver(source, { importStyle: false })[0].resolve('MpCell').sideEffects, undefined)
})

test('explicit root function imports resolve directly without changing authored names or injected styles', () => {
  const plugin = createSiteImportPlugin(source)
  const transform = plugin.transform
  const original =
    "import { imagePreview as preview } from '@maplejs/maple-ui';\nimport '@maplejs/maple-ui/image/style';\npreview('/cat.jpg');"
  const result = transform.call({}, original, '/demo.vue')
  assert.ok(result.code.includes(`from ${JSON.stringify(resolve(source, 'image'))}`))
  assert.ok(result.code.includes('imagePreview as preview'))
  assert.ok(result.code.includes("import '@maplejs/maple-ui/image/style'"))
  assert.ok(result.code.endsWith("preview('/cat.jpg');"))
})

test('mixed imports, namespaces and type-only imports retain the root barrel', () => {
  const transform = createSiteImportPlugin(source).transform
  for (const code of [
    "import { Context, imagePreview } from '@maplejs/maple-ui';",
    "import * as Maple from '@maplejs/maple-ui';",
    "import type { ImageProps } from '@maplejs/maple-ui';",
    "import '@maplejs/maple-ui/image/style';",
  ]) {
    assert.equal(transform.call({}, code, '/demo.ts'), undefined)
  }
})
