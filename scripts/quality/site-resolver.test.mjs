import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  createSiteImportPlugin,
  createSiteResolver,
  getSiteComponentExcludes,
  getWorkspaceSourceAliases,
} from '../../packages/maple-cli/lib/node/config/site-resolver.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
const source = resolve(root, 'packages/maple-ui/src')
const [components, directives] = createSiteResolver(source)

test('nested documentation examples are admitted while nested implementation files remain excluded', () => {
  const excluded = (path) => getSiteComponentExcludes(source).some((rule) => rule.test(path))
  for (const file of ['date/picker/example/basic.vue', 'style/color/__demos__/basic.vue']) {
    for (const id of [
      resolve(source, file),
      '/@fs' + resolve(source, file),
      resolve(source, file) + '?vue&type=script&lang.ts',
    ]) {
      assert.equal(excluded(id), false, id)
    }
  }
  assert.equal(excluded(resolve(source, 'date/presentation/DateFieldContent.vue')), true)
})

test('internal implementation imports stay explicit without intercepting Vue HMR', () => {
  const excluded = (path) => getSiteComponentExcludes(source).some((rule) => rule.test(path))
  assert.equal(excluded(resolve(source, 'image/ImagePreviewGroup.vue')), true)
  assert.equal(excluded(resolve(source, 'image/preview.ts')), true)
  assert.equal(excluded(resolve(source, 'upload/Upload.vue') + '?vue&type=script&lang.ts'), true)
  assert.equal(excluded('/@fs' + resolve(source, 'image/ImagePreviewGroup.vue')), true)
  assert.equal(excluded(resolve(source, 'upload/example/basic.vue')), false)
  const plugin = createSiteImportPlugin(source)
  assert.equal(plugin.handleHotUpdate, undefined)
  const config = readFileSync(
    new URL('../../packages/maple-cli/src/node/config/vite.config.ts', import.meta.url),
    'utf8',
  )
  for (const name of ['Components', 'AutoImport']) {
    assert.match(config, new RegExp(`${name}\\(\\{[^}]*exclude: getSiteComponentExcludes\\(SRC_DIR\\)`))
  }
})

test('workspace browser dependencies use source without changing standalone projects', () => {
  const aliases = getWorkspaceSourceAliases(source)
  for (const [name, file] of [
    ['@maple-design/shared', 'maple-shared/src/index.ts'],
    ['@maple-design/use', 'maple-use/src/index.ts'],
    ['@maple-design/cli/client', 'maple-cli/src/client/index.ts'],
  ]) {
    assert.equal(aliases.find((alias) => alias.find.test(name))?.replacement, resolve(root, 'packages', file))
  }
  assert.deepEqual(getWorkspaceSourceAliases('/nonexistent/standalone/src'), [])
})

test('automatic imports exclude every implementation file, including SFC queries and /@fs paths', () => {
  const excluded = (file) => getSiteComponentExcludes(source).some((rule) => rule.test(file))
  let count = 0
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        if (!/^(?:__.*__|example|examples|docs)$/.test(entry.name)) {
          walk(file)
        }
      } else if (/\.(?:vue|[cm]?[jt]sx?)$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
        for (const id of [file, `/@fs${file}`, `${file}?vue&type=script&lang.ts`]) {
          assert.ok(excluded(id), id)
        }
        count++
      }
    }
  }
  walk(source)
  assert.ok(count > 500)
})

test('documentation component imports bypass the root barrel, preserving styles', () => {
  for (const [name, directory] of [
    ['MpCell', 'cell'],
    ['MpCascader', 'cascader'],
    ['MpCounter', 'counter'],
  ]) {
    const result = components.resolve(name)
    assert.equal(result.from, resolve(source, directory))
    assert.deepEqual(result.sideEffects, [`@maple-design/ui/${directory}/style`])
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
  assert.equal(components.resolve('MIconGithub').from, '@maple-design/icons-vue/icon-github')
  assert.equal(components.resolve('MpActionItem'), undefined)
  assert.equal(createSiteResolver(source, { importStyle: false })[0].resolve('MpCell').sideEffects, undefined)
})

test('explicit root function imports resolve directly without changing authored names or injected styles', () => {
  const plugin = createSiteImportPlugin(source)
  const transform = plugin.transform
  const original =
    "import { imagePreview as preview } from '@maple-design/ui';\nimport '@maple-design/ui/image/style';\npreview('/cat.jpg');"
  const result = transform.call({}, original, '/demo.vue')
  assert.ok(result.code.includes(`from ${JSON.stringify(resolve(source, 'image'))}`))
  assert.ok(result.code.includes('imagePreview as preview'))
  assert.ok(result.code.includes("import '@maple-design/ui/image/style'"))
  assert.ok(result.code.endsWith("preview('/cat.jpg');"))
})

test('primary exports and mixed direct imports preserve local names without loading the barrel', () => {
  const transform = createSiteImportPlugin(source).transform
  const result = transform.call(
    {},
    "import { Locale, Context as ctx, imagePreview } from '@maple-design/ui';",
    '/main.ts',
  )
  assert.ok(result.code.includes(`import { default as Locale } from ${JSON.stringify(resolve(source, 'locale'))}`))
  assert.ok(result.code.includes(`import { default as ctx } from ${JSON.stringify(resolve(source, 'context'))}`))
  assert.ok(result.code.includes(`import { imagePreview } from ${JSON.stringify(resolve(source, 'image'))}`))
  assert.ok(!result.code.includes("from '@maple-design/ui'"))
})

test('namespaces, unknown exports and type-only imports retain the root barrel', () => {
  const transform = createSiteImportPlugin(source).transform
  for (const code of [
    "import { missingExport } from '@maple-design/ui';",
    "import * as Maple from '@maple-design/ui';",
    "import type { ImageProps } from '@maple-design/ui';",
    "import '@maple-design/ui/image/style';",
  ]) {
    assert.equal(transform.call({}, code, '/demo.ts'), undefined)
  }
})
