import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'
import { normalizeTypeScript } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui/src')
const files = [
  'back-top/BackTop.vue',
  'back-top/props.ts',
  'back-top/use-back-top.ts',
  'ellipsis/Ellipsis.vue',
  'ellipsis/props.ts',
  'back-top/__tests__/contract.test.ts',
  'back-top/__tests__/ssr.test.ts',
  'ellipsis/__tests__/contract.test.ts',
  'back-top/style/index.less',
  'back-top/style/token.less',
  'ellipsis/style/index.less',
  'ellipsis/style/token.less',
]
const normalize = (text) =>
  text
    .replaceAll('../_utils/global-config', '../utils/components')
    .replaceAll('../_utils/maple/elements', '../utils/elements')
    .replaceAll('../_utils/popup-container', '../utils/popup-container')
    .replaceAll('@cedarjs/icons-vue', '@maplejs/icons-vue')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
const canonical = (source, file) =>
  file.endsWith('.ts') ? normalizeTypeScript(normalize(source)) : normalizeBoundImports(normalize(source))
for (const file of files) {
  assert.equal(
    await canonical(readFileSync(resolve(cedar, file), 'utf8'), file),
    await canonical(readFileSync(resolve(maple, file), 'utf8'), file),
    file,
  )
}
for (const root of [cedar, maple]) {
  const view = readFileSync(resolve(root, 'back-top/BackTop.vue'), 'utf8')
  assert.match(view, /<button\b/)
  assert.doesNotMatch(view, /<\w+-button|platform/)
  const ellipsis = readFileSync(resolve(root, 'ellipsis/Ellipsis.vue'), 'utf8')
  assert.match(ellipsis, /props.expand === undefined/)
  assert.doesNotMatch(ellipsis, /platform/)
  assert.match(readFileSync(resolve(root, 'ellipsis/style/index.ts'), 'utf8'), /tooltip\/style/)
}
console.log('BackTop / Ellipsis: ' + files.length + ' independent source, style and test pairs verified.')
