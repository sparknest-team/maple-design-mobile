import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui')
const files = [
  'auto-complete.tsx',
  'props.ts',
  'index.ts',
  'style/index.ts',
  'style/index.less',
  'style/token.less',
  '__tests__/auto-complete.test.tsx',
]
const normalize = (source) =>
  source
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('_utils/popup-container', 'utils/popup-container')
    .replaceAll('_utils/text-input-value', 'utils/text-input-value')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
    .replaceAll('c-auto-complete-listbox', 'mp-auto-complete-listbox')
for (const file of files) {
  const c = readFileSync(resolve(cedar, 'src/auto-complete', file), 'utf8')
  const m = readFileSync(resolve(maple, 'src/auto-complete', file), 'utf8')
  assert.equal(normalize(c), m, file + ' differs')
  assert.doesNotMatch(m, /from ['"][^'"]*(?:@cedarjs|cedar-design|platform)/)
}
for (const [root, compiler] of [
  [cedar, 'node_modules/less/package.json'],
  [maple, '../maple-cli/node_modules/less/package.json'],
]) {
  const less = createRequire(resolve(root, compiler))('./')
  const filename = resolve(root, 'src/auto-complete/style/index.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  assert.match(css, /auto-complete__dropdown/)
  assert.match(css, /select-popup-option-height/)
}
console.log('AutoComplete: 7 independent source/test pairs and both Less outputs verified.')
