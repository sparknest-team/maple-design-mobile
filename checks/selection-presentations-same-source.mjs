import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui/src')
const files = [
  '_components/selected-options/context.ts',
  '_components/selected-options/style/index.less',
  '_components/selected-options/style/token.less',
  'cascader/CascaderEditor.vue',
  'cascader/CascaderEditorPanel.vue',
  '_components/field-presentation/with-field-presentation.ts',
  '_components/field-presentation/use-field-search.ts',
  '_components/field-presentation/option-labels.ts',
  'auto-complete/auto-complete.tsx',
  'auto-complete/presentation.ts',
  'select/Option.vue',
  'select/types.ts',
  'select/utils.ts',
  'select/SelectMenu.tsx',
  'select/use-select-controller.ts',
  'select/hooks/use-options.ts',
  'select/SelectDropdown.vue',
  'cascader/types.ts',
  'select/select.tsx',
  'select/hooks/use-select.ts',
  'cascader/cascader-search-panel.tsx',
  'select/emits.ts',
  'cascader/utils.ts',
  'cascader/use-cascader-controller.ts',
  'cascader/cascader-column.tsx',
  'cascader/CascaderMenu.vue',
  'cascader/Cascader.vue',
  'cascader/cascader-option.tsx',
  'cascader/context.ts',
  'cascader/hooks/use-selected-path.ts',
  'cascader/emits.ts',
  'cascader/base-cascader-panel.tsx',
  'select/Optgroup.vue',
  'select/context.ts',
  'cascader/CascaderPanel.vue',
  '_components/selection-field/use-selection-session.ts',
  '_components/selection-field/SelectionIndicator.vue',
  '_components/selection-field/MenuPresentation.vue',
  '_components/selection-field/style/indicator.less',
  'select/style/index.less',
  'select/style/token.less',
  'cascader/style/index.less',
  'cascader/style/token.less',
]
const toMaple = (source) =>
  source
    .replaceAll('@cedarjs/icons-vue/icon-right', '@maplejs/icons-vue')
    .replaceAll('@cedarjs/icons-vue/icon-loading', '@maplejs/icons-vue')
    .replaceAll('@cedarjs/icons-vue', '@maplejs/icons-vue')
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('_utils/option-data', 'utils/option-data')
    .replaceAll('_utils/text-input-value', 'utils/text-input-value')
    .replaceAll('../scrollbar', '../_components/selection-scrollbar')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
for (const file of files) {
  const c = readFileSync(resolve(cedar, file), 'utf8')
  const m = readFileSync(resolve(maple, file), 'utf8')
  assert.equal(
    normalizeBoundImports(toMaple(c)),
    normalizeBoundImports(m),
    file + ' differs: copy Cedar and adjust local imports/prefixes',
  )
  assert.doesNotMatch(m, /from ['"][^'"]*(?:cedar-design|@cedarjs\/ui|platform)/)
}
for (const [root, compiler] of [
  [cedar, '../node_modules/less/package.json'],
  [maple, '../../maple-cli/node_modules/less/package.json'],
]) {
  const less = createRequire(resolve(root, compiler))('./')
  for (const component of ['select', 'cascader', '_components/selected-options']) {
    const filename = resolve(root, component, 'style/index.less')
    const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
    assert.ok(css.includes(component.split('/').pop()))
  }
}
console.log(
  'Selection presentations: ' +
    files.length +
    ' independent source pairs and six Less outputs verified. Selected-options platform views are covered by component tests.',
)
