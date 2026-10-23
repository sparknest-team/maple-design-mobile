import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  createSiteImportPlugin,
  createSiteResolver,
  getWorkspaceSourceAliases,
} from '../../packages/maple-cli/lib/node/config/site-resolver.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
const source = resolve(root, 'packages/maple-ui/src')
const [components, directives] = createSiteResolver(source)

test('workspace browser dependencies use source without changing standalone projects', () => {
  const aliases = getWorkspaceSourceAliases(source)
  for (const [name, file] of [
    ['@maplejs/maple-shared', 'maple-shared/src/index.ts'],
    ['@maplejs/maple-use', 'maple-use/src/index.ts'],
    ['@maplejs/maple-cli/client', 'maple-cli/src/client/index.ts'],
  ]) {
    assert.equal(aliases.find((alias) => alias.find.test(name))?.replacement, resolve(root, 'packages', file))
  }
  assert.deepEqual(getWorkspaceSourceAliases('/nonexistent/standalone/src'), [])
})

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

test('public function APIs bypass the barrel while SVG and private component resolution stay unchanged', () => {
  assert.equal(components.resolve('Message').from, resolve(source, 'message'))
  assert.equal(components.resolve('Message').name, 'default')
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

test('primary exports and mixed direct imports preserve local names without loading the barrel', () => {
  const transform = createSiteImportPlugin(source).transform
  const result = transform.call(
    {},
    "import { Locale, Context as ctx, imagePreview } from '@maplejs/maple-ui';",
    '/main.ts',
  )
  assert.ok(result.code.includes(`import { default as Locale } from ${JSON.stringify(resolve(source, 'locale'))}`))
  assert.ok(result.code.includes(`import { default as ctx } from ${JSON.stringify(resolve(source, 'context'))}`))
  assert.ok(result.code.includes(`import { imagePreview } from ${JSON.stringify(resolve(source, 'image'))}`))
  assert.ok(!result.code.includes("from '@maplejs/maple-ui'"))
})

test('namespaces, unknown exports and type-only imports retain the root barrel', () => {
  const transform = createSiteImportPlugin(source).transform
  for (const code of [
    "import { missingExport } from '@maplejs/maple-ui';",
    "import * as Maple from '@maplejs/maple-ui';",
    "import type { ImageProps } from '@maplejs/maple-ui';",
    "import '@maplejs/maple-ui/image/style';",
  ]) {
    assert.equal(transform.call({}, code, '/demo.ts'), undefined)
  }
})
