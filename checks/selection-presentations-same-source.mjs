import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeBoundImports } from './normalize-bound-imports.mjs'
import { normalizeTypeScript, normalizeVueSource } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui/src')
const files = [
  'trigger/interaction.ts',
  'trigger/reference-click.ts',
  'trigger/__tests__/reference-open-guard.spec.ts',
  '_components/selected-options/context.ts',
  '_components/selected-options/style/index.less',
  '_components/selected-options/style/token.less',
  'cascader/CascaderEditor.vue',
  'cascader/CascaderEditorPanel.vue',
  '_components/field-presentation/with-field-presentation.ts',
  '_components/field-presentation/__tests__/reference-events.spec.js',
  'date-range/__tests__/reference-events.spec.js',
  'checkbox/group-presentation.ts',
  'checkbox/__tests__/group-instance-return.spec.ts',
  '_components/field-presentation/__tests__/instance-methods.spec.ts',
  '_components/field-presentation/__tests__/instance-activation.spec.ts',
  '_components/field-presentation/__tests__/instance-consumers.spec.ts',
  '_components/field-presentation/__tests__/instance-refresh.spec.ts',
  '_components/field-presentation/use-field-search.ts',
  '_components/field-presentation/option-labels.ts',
  'auto-complete/auto-complete.tsx',
  'auto-complete/presentation.ts',
  'select/Option.vue',
  'select/types.ts',
  'select/utils.ts',
  'select/SelectMenu.tsx',
  'select/use-select-controller.ts',
  'select/__tests__/controller-props.spec.ts',
  'select/native-editor-owner.ts',
  'select/__tests__/native-owner.spec.ts',
  'select/__tests__/accessible-relations.spec.ts',
  'select/__tests__/diagnostics.spec.ts',
  '_utils/selection-validation.ts',
  'select/hooks/use-options.ts',
  'select/SelectDropdown.vue',
  'cascader/types.ts',
  'select/select.tsx',
  'select/__tests__/instance-targets.spec.ts',
  'select/__tests__/loading-actions.spec.ts',
  'people-select/people-select.tsx',
  'people-select/PeopleSelect.ts',
  'people-select/Person.vue',
  'people-select/types.ts',
  'people-select/emits.ts',
  'people-select/__tests__/public-contract.spec.ts',
  'select/hooks/use-select.ts',
  'cascader/cascader-search-panel.tsx',
  'select/emits.ts',
  'cascader/utils.ts',
  'cascader/use-cascader-controller.ts',
  'cascader/use-lazy-options.ts',
  'cascader/__tests__/lazy-lifecycle.spec.ts',
  'cascader/__tests__/reactive-index.spec.ts',
  'cascader/__tests__/panel-direction.spec.ts',
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
    .replaceAll('../_hooks/use-form-item', '../form/item-provide')
    .replaceAll('@cedar-design/use', '@maple-design/use')
    .replaceAll('./checkbox-group.vue', './CheckboxGroup.vue')
    .replaceAll('@cedar-design/icons-vue/icon-right', '@maple-design/icons-vue')
    .replaceAll('@cedar-design/icons-vue/icon-loading', '@maple-design/icons-vue')
    .replaceAll('@cedar-design/icons-vue', '@maple-design/icons-vue')
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('_utils/option-data', 'utils/option-data')
    .replaceAll('_utils/text-input-value', 'utils/text-input-value')
    .replaceAll('_utils/empty-value', 'utils/empty-value')
    .replaceAll('../scrollbar', '../_components/selection-scrollbar')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
const canonical = (source, file) =>
  /\.tsx?$/.test(file)
    ? normalizeTypeScript(source)
    : file.endsWith('.vue')
      ? normalizeVueSource(source)
      : normalizeBoundImports(source)
for (const file of files) {
  const c = readFileSync(resolve(cedar, file), 'utf8')
  const m = readFileSync(resolve(maple, file), 'utf8')
  assert.equal(
    await canonical(toMaple(c), file),
    await canonical(m, file),
    file + ' differs: copy Cedar and adjust local imports/prefixes',
  )
  assert.doesNotMatch(m, /from ['"][^'"]*(?:cedar-design|@cedar-design\/ui|platform)/)
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
