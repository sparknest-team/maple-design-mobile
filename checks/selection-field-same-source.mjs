import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui')
const groups = {
  'selection-field': [
    'SelectionField.vue',
    'props.ts',
    'selection-key.ts',
    'style/index.ts',
    'style/index.less',
    'style/token.less',
    '__tests__/selection-field.spec.ts',
    '__tests__/selection-key.spec.ts',
  ],
  'picker-field': [
    'PickerField.vue',
    'props.ts',
    'use-field-transaction.ts',
    'style/index.ts',
    'style/index.less',
    'style/token.less',
    '__tests__/picker-field.spec.ts',
    '__tests__/transaction.spec.ts',
    'range-field-context.ts',
    '__tests__/range-field-context.spec.ts',
    'use-field-value.ts',
    'use-field-open.ts',
    '__tests__/state.spec.ts',
  ],
}
groups['picker-field'].push('use-field-focus.ts', '__tests__/focus.spec.ts')
const normalize = (source) =>
  source
    .replaceAll('@cedarjs/icons-vue', '@maplejs/icons-vue')
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
    .replaceAll('c-selection-field-spin', 'mp-selection-field-spin')
    .replace(/\s+/g, ' ')
    .trim()
for (const [group, files] of Object.entries(groups)) {
  for (const file of files) {
    const path = 'src/_components/' + group + '/' + file
    assert.equal(
      normalize(readFileSync(resolve(cedar, path), 'utf8')),
      normalize(readFileSync(resolve(maple, path), 'utf8')),
      group + '/' + file + ' differs',
    )
  }
}
for (const [root, compiler] of [
  [cedar, 'node_modules/less/package.json'],
  [maple, '../maple-cli/node_modules/less/package.json'],
]) {
  const less = createRequire(resolve(root, compiler))('./')
  for (const group of Object.keys(groups)) {
    const filename = resolve(root, 'src/_components/' + group + '/style/index.less')
    const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
    assert.match(css, group === 'selection-field' ? /selection-field:not\(\.[\w-]+--multiple\)/ : /picker-field__input/)
  }
}
for (const component of ['select/select.tsx', 'cascader/Cascader.vue', 'tree-select/TreeSelect.vue']) {
  assert.doesNotMatch(readFileSync(resolve(cedar, 'src', component), 'utf8'), /_components\/select-view/)
}
for (const component of ['date/picker/Picker.vue', 'date/picker/DateRangePicker.vue', 'time/picker/TimePicker.vue']) {
  const source = readFileSync(resolve(cedar, 'src', component), 'utf8')
  assert.doesNotMatch(source, /useFormItem|<Trigger|<DateInput|<DateRangeInput/)
}
console.log(
  'Field layers: 23 independent source pairs, four Less outputs and Cedar ownership boundaries verified. Select/Cascader also have a separate presentation source check.',
)
