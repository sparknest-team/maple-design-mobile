import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { markdown } from '../../packages/maple-vite-plugins/lib/index.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
const source = resolve(root, 'packages/maple-ui/src')
const require = createRequire(resolve(root, 'packages/maple-ui/package.json'))
const { parse, compileTemplate } = require('vue/compiler-sfc')
const pluginRequire = createRequire(resolve(root, 'packages/maple-vite-plugins/package.json'))
const markdownIt = pluginRequire('markdown-it')

function countAuthoredDemos(content) {
  const counts = { tags: 0, fences: 0 }
  for (const token of markdownIt({ html: true }).parse(content, {})) {
    if (token.type === 'fence' && token.info.trim() === 'demo') {
      counts.fences++
    } else if (token.type === 'html_block' || token.type === 'inline') {
      const html =
        token.type === 'html_block'
          ? token.content
          : (token.children ?? [])
              .filter((child) => child.type === 'html_inline')
              .map((child) => child.content)
              .join('')
      counts.tags += (html.match(/<demo\b[^>]*\bsrc\s*=\s*(['"])[^'"]+\1[^>]*(?:\/>|>\s*<\/demo>)/g) ?? []).length
    }
  }
  return { ...counts, total: counts.tags + counts.fences }
}

test('authored demo counts include both live syntaxes and exclude documentation code samples', () => {
  const content = [
    '```html',
    '<demo src="./sample.vue"></demo>',
    '```',
    '',
    '````markdown',
    '```demo',
    './sample.vue',
    '```',
    '````',
    '',
    '`<demo src="./inline-sample.vue"></demo>`',
    '',
    '<demo src="./basic.vue"></demo>',
    '',
    '<demo src="./states.vue" />',
    '',
    '```demo',
    './live.vue',
    '```',
  ].join('\n')
  assert.deepEqual(countAuthoredDemos(content), { tags: 2, fences: 1, total: 3 })
})

function render(content, id = resolve(source, 'verification-code/docs/zh-CN.md')) {
  const watched = []
  const plugin = markdown({})
  const result = plugin.transform.call(
    {
      addWatchFile: (file) => watched.push(file),
      error: (error) => {
        throw error
      },
    },
    content,
    id,
  )
  const { descriptor, errors } = parse(result)
  assert.deepEqual(errors, [])
  const template = compileTemplate({ source: descriptor.template.content, filename: id, id: 'syntax-test' })
  assert.deepEqual(template.errors, [])
  return { result, watched }
}

test('paired and self-closing live demo tags produce separate source cards', () => {
  const { result, watched } = render(
    '# Examples\n\n<demo src="../example/demos/basic.vue"></demo>\n<demo src="../example/demos/appearance.vue" />\n',
  )
  assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, 2)
  assert.ok(result.includes("import MapleDemo0 from '../example/demos/basic.vue'"))
  assert.ok(result.includes("import MapleDemo1 from '../example/demos/appearance.vue'"))
  assert.equal(watched.length, 2)
  assert.ok(!result.includes("from '../example/index.vue'"))
})

test('fenced demo and HTML demo syntaxes can be mixed without losing description or source order', () => {
  const { result } = render(
    '# Examples\n\nDescription before\n\n```demo\n../example/demos/basic.vue\n```\n\nDescription after\n\n<demo src="../example/demos/states.vue"></demo>\n',
  )
  assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, 2)
  assert.ok(result.indexOf('Description before') < result.indexOf('<MapleDemo0>'))
  assert.ok(result.indexOf('<MapleDemo0>') < result.indexOf('Description after'))
  assert.ok(result.indexOf('Description after') < result.indexOf('<MapleDemo1>'))
})

test('demo tags inside code samples are never executed or watched', () => {
  const { result, watched } = render(
    '# Syntax\n\n```html\n<demo src="./not-a-real-file.vue"></demo>\n```\n\n<demo src="../example/demos/basic.vue"></demo>\n',
  )
  assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, 1)
  assert.equal(watched.length, 1)
  assert.ok(result.includes('not-a-real-file.vue'))
})

test('actual bilingual VerificationCode and Upload docs expose every authored demo independently', () => {
  for (const component of ['verification-code', 'upload']) {
    for (const language of ['zh-CN', 'en-US']) {
      const id = resolve(source, component, 'docs', `${language}.md`)
      const content = readFileSync(id, 'utf8')
      const { total: expected } = countAuthoredDemos(content)
      const { result, watched } = render(content, id)
      assert.ok(expected >= 4)
      assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, expected)
      assert.equal(watched.length, expected)
    }
  }
})

test('all component docs render each live demo reference independently', () => {
  let pages = 0
  for (const component of readdirSync(source, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    for (const language of ['zh-CN', 'en-US']) {
      const id = resolve(source, component.name, 'docs', `${language}.md`)
      let content
      try {
        content = readFileSync(id, 'utf8')
      } catch {
        continue
      }
      const { total } = countAuthoredDemos(content)
      if (!total) {
        continue
      }
      const { result, watched } = render(content, id)
      assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, total, id)
      assert.equal(watched.length, total, id)
      pages++
    }
  }
  // Keep broad real-page coverage when authors move between HTML tags and demo fences.
  assert.ok(pages >= 6)
})

test('editing a referenced demo invalidates the Markdown module so its source also refreshes', () => {
  const plugin = markdown({})
  const id = resolve(source, 'verification-code/docs/zh-CN.md')
  const watched = []
  plugin.transform.call(
    {
      addWatchFile: (file) => watched.push(file),
      error: (error) => {
        throw error
      },
    },
    '<demo src="../example/demos/basic.vue"></demo>\n',
    id,
  )
  const markdownModule = { id }
  const demoModule = { id: watched[0] }
  const invalidated = []
  const result = plugin.handleHotUpdate({
    file: watched[0],
    modules: [demoModule],
    server: {
      moduleGraph: {
        getModuleById: (file) => (file === id ? markdownModule : undefined),
        invalidateModule: (module) => invalidated.push(module),
      },
    },
  })
  assert.deepEqual(invalidated, [markdownModule])
  assert.deepEqual(result, [demoModule, markdownModule])
})

test('Fab live cards have no second static source toolbar for the same examples', () => {
  for (const language of ['zh-CN', 'en-US']) {
    const id = resolve(source, 'fab/docs', `${language}.md`)
    const content = readFileSync(id, 'utf8')
    for (const section of content.split(/(?=^#{1,4} )/m)) {
      if (!/```demo\b/.test(section)) {
        continue
      }
      assert.ok(!/```(?:html|vue)\s*\n[\s\S]*?<(?:script|template)\b/.test(section))
    }
    const { result } = render(content, id)
    assert.equal((result.match(/<mp-site-demo-preview /g) ?? []).length, countAuthoredDemos(content).total)
  }
})
