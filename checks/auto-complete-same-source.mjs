import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertCopiedVueCompat } from '../../design-ui/bin/copied-source-normalization.mjs'
import { normalizeLessSource, normalizeTypeScript } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/ui')
const maple = resolve(workspace, 'maple-design-mobile/packages/ui')
assertCopiedVueCompat(
  readFileSync(resolve(cedar, 'src/_utils/vue-compat.ts'), 'utf8'),
  readFileSync(resolve(maple, 'src/utils/vue-compat.ts'), 'utf8'),
)
const files = [
  '../_hooks/use-option-request.ts',
  'auto-complete.tsx',
  'props.ts',
  'types.ts',
  'trigger-options.ts',
  '__tests__/keyboard-reopen.spec.ts',
  '__tests__/public-contract.spec.ts',
  '__tests__/empty-slot.spec.ts',
  'index.ts',
  'style/index.ts',
  'style/index.less',
  'style/token.less',
  '__tests__/auto-complete.test.tsx',
]
const normalize = (source) =>
  source
    .replaceAll('@cedar-design/use-vue', '@maple-design/use-vue')
    .replaceAll('_utils/empty-value', 'utils/empty-value')
    .replaceAll('_utils/vue-compat', 'utils/vue-compat')
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('_utils/popup-container', 'utils/popup-container')
    .replaceAll('_utils/text-input-value', 'utils/text-input-value')
    .replaceAll('_utils/option-data', 'utils/option-data')
    .replaceAll('_utils/option-data', 'utils/option-data')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
    .replaceAll('c-auto-complete-listbox', 'mp-auto-complete-listbox')
for (const file of files) {
  const c = readFileSync(resolve(cedar, 'src/auto-complete', file), 'utf8')
  const m = readFileSync(resolve(maple, 'src/auto-complete', file), 'utf8')
  const canonical = file.endsWith('.less') ? normalizeLessSource : normalizeTypeScript
  assert.equal(await canonical(normalize(c)), await canonical(normalize(m)), file + ' differs')
  assert.doesNotMatch(m, /from ['"][^'"]*(?:@cedar-design|cedar-design|platform)/)
}
for (const [root, compiler] of [
  [cedar, 'node_modules/less/package.json'],
  [maple, '../cli/node_modules/less/package.json'],
]) {
  const less = createRequire(resolve(root, compiler))('./')
  const filename = resolve(root, 'src/auto-complete/style/index.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  assert.match(css, /auto-complete__dropdown/)
  assert.match(css, /select-popup-option-height/)
}
console.log('AutoComplete and async request owner: 13 independent source/test pairs and both Less outputs verified.')
