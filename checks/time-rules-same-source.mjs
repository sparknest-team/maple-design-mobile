import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { normalizeTypeScript, normalizeVueSource } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui/src')
const sourcePairs = [
  ['_utils/picker-data.ts', 'utils/picker-data.ts'],
  ['time/time-rules.ts', 'time/time-rules.ts'],
  ['time/__tests__/text-entry.test.ts', 'time/__tests__/text-entry.test.ts'],
  ['time/panel-emits.ts', 'time/panel-emits.ts'],
  ['time/__tests__/range-owner-contract.test.ts', 'time/__tests__/range-owner-contract.test.ts'],
  ['time/field-placeholders.ts', 'time/field-placeholders.ts'],
  ['time/Time.vue', 'time/Time.vue'],
  ['time-range/TimeRange.vue', 'time-range/TimeRange.vue'],
  ['time/TimeField.vue', 'time/TimeField.vue'],
  ['time/field-state.ts', 'time/field-state.ts'],
  ['time/__tests__/field-public-contract.test.ts', 'time/__tests__/field-public-contract.test.ts'],
  ['time/__tests__/field-owner-isolation.test.ts', 'time/__tests__/field-owner-isolation.test.ts'],
  ['time/time-format.ts', 'time/time-format.ts'],
  ['time/time-value.ts', 'time/time-value.ts'],
  ['time/time-events.ts', 'time/time-events.ts'],
  ['time/public-types.ts', 'time/public-types.ts'],
  ['time/__tests__/clear-event-shapes.spec.js', 'time/__tests__/clear-event-shapes.spec.js'],
  ['time/use-time-panel.ts', 'time/use-time-panel.ts'],
  ['time/time-commit.ts', 'time/time-commit.ts'],
  ['time/use-time-field-transaction.ts', 'time/use-time-field-transaction.ts'],
  ['time/use-time-field-controller.ts', 'time/use-time-field-controller.ts'],
  ['time/presentation-props.ts', 'time/presentation-props.ts'],
  ['time/__tests__/presentation-props.test.ts', 'time/__tests__/presentation-props.test.ts'],
  ['time/__tests__/time-field-controller.test.ts', 'time/__tests__/time-field-controller.test.ts'],
  ['time/__tests__/time-field-transaction.test.ts', 'time/__tests__/time-field-transaction.test.ts'],
  ['time/__tests__/time-panel.test.ts', 'time/__tests__/time-panel.test.ts'],
  ['time/__tests__/public-bounds.test.ts', 'time/__tests__/public-bounds.test.ts'],
  ['time/__tests__/content-contract.test.ts', 'time/__tests__/content-contract.test.ts'],
  ['time/__tests__/time-events.test.ts', 'time/__tests__/time-events.test.ts'],
  ['time/__tests__/time-value.test.ts', 'time/__tests__/time-value.test.ts'],
  ['time/__tests__/time-format.test.ts', 'time/__tests__/time-format.test.ts'],
  ['time/__tests__/time-step.test.ts', 'time/__tests__/time-step.test.ts'],
  ['trigger/interaction.ts', 'trigger/interaction.ts'],
  ['trigger/__tests__/interaction.spec.js', 'trigger/__tests__/interaction.spec.js'],
  ['trigger/__tests__/interaction-scope.spec.js', 'trigger/__tests__/interaction-scope.spec.js'],
  ['time/__tests__/time-constraints.test.ts', 'time/__tests__/time-constraints.test.ts'],
  ['time/__tests__/time-rules.test.ts', 'time/__tests__/time-rules.test.ts'],
]
for (const [left, right] of sourcePairs) {
  const normalize = (source) =>
    source
      .replaceAll('_utils/picker-data', 'utils/picker-data')
      .replaceAll('_utils/empty-value', 'utils/empty-value')
      .replaceAll('_utils/global-config', 'utils/components')
      .replaceAll('{ props as timeProps }', '{ timeProps }')
      .replaceAll('{ props as timeRangeProps }', '{ timeRangeProps }')
      .replaceAll('../picker/TimePicker.vue', '../TimePicker.vue')
      .replaceAll('../picker/TimeRangePicker.vue', '../../time-range/TimeRangePicker.vue')
      .replaceAll('../../time-range/presentation/TimePanelContent.vue', '../presentation/TimePanelContent.vue')
      .replaceAll('dayjs/esm/index.js', 'dayjs')
      .replaceAll('dayjs/esm/plugin/customParseFormat/index.js', 'dayjs/plugin/customParseFormat.js')
  const canonical = left.endsWith('.vue') ? normalizeVueSource : normalizeTypeScript
  assert.equal(
    await canonical(normalize(readFileSync(resolve(cedar, left), 'utf8'))),
    await canonical(normalize(readFileSync(resolve(maple, right), 'utf8'))),
    left,
  )
}
const owners = [
  [cedar, 'time/picker/TimeRangePicker.vue', 'time/presentation/TimePanelContent.vue'],
  [cedar, 'time/picker/TimePicker.vue', 'time/presentation/TimePanelContent.vue'],
  [maple, 'time/TimePicker.vue', 'time/presentation/TimePanelContent.vue'],
  [maple, 'time-range/TimeRangePicker.vue', 'time-range/presentation/TimePanelContent.vue'],
]
const templates = owners.map(([root, owner, view]) => {
  const source = readFileSync(resolve(root, owner), 'utf8')
  const content = readFileSync(resolve(root, view), 'utf8')
  assert.match(source, /useTimePanel</, owner)
  assert.doesNotMatch(content, /(?:useTimePanel|useFieldValue|useFieldTransaction)\s*(?:<[^>]+>)?\s*\(/, view)
  return source.slice(0, source.indexOf('<script')).replace(/\s+/g, ' ').trim()
})
for (const template of templates) {
  assert.equal(templates[0], template, 'time panel template')
}
const rangeOwnerBody = (root, path) => {
  const source = readFileSync(resolve(root, path), 'utf8')
  const script = source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script, `${path}: missing script`)
  const file = ts.createSourceFile(path, script, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declaration = file.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .find((item) => ts.isIdentifier(item.name) && item.name.text === 'panel')
  const call = declaration?.initializer
  assert.ok(
    call && ts.isCallExpression(call) && ts.isIdentifier(call.expression) && call.expression.text === 'useTimePanel',
    `${path}: panel must initialize the shared time owner`,
  )
  // Compare the owner call and its events, excluding device-specific presentation setup.
  return call.getText(file).replace(/\s+/g, ' ').trim()
}
assert.equal(
  rangeOwnerBody(cedar, 'time/picker/TimeRangePicker.vue'),
  rangeOwnerBody(maple, 'time-range/TimeRangePicker.vue'),
  'range owner event wiring',
)
assert.match(
  readFileSync(resolve(maple, 'time-range/TimeRangePicker.vue'), 'utf8'),
  /provideRangePanel\(\)/,
  'mobile range wheels must provide the active endpoint context',
)
for (const [root, path] of [
  [cedar, 'time/TimeField.vue'],
  [maple, 'time/TimeField.vue'],
]) {
  assert.match(readFileSync(resolve(root, path), 'utf8'), /useTimeFieldController</, path)
}
const timeField = readFileSync(resolve(cedar, 'time/TimeField.vue'), 'utf8')
const dateField = readFileSync(resolve(cedar, 'date/DateField.vue'), 'utf8')
assert.doesNotMatch(timeField, /from ['"][^'"]*\/date\//, 'time owner must not import date parsing')
assert.doesNotMatch(
  dateField,
  /useTimeFieldController|kind === ['"]time['"]/,
  'date owner must not retain dead time branches',
)
for (const root of [cedar, maple]) {
  for (const path of ['time/Time.vue', 'time-range/TimeRange.vue']) {
    const source = readFileSync(resolve(root, path), 'utf8')
    assert.match(source, /<TimeField\b/, path)
    assert.doesNotMatch(source, /TemporalField|useTimeFieldController|useFieldValue/, path)
  }
  const content = readFileSync(resolve(root, 'time/presentation/TimeFieldContent.vue'), 'utf8')
  assert.doesNotMatch(
    content,
    /(?:useTimeFieldController|useFieldTransaction|useFieldValue)\s*(?:<[^>]+>)?\s*\(/,
    'field view cannot own a second transaction',
  )
  assert.match(content, /TimeFieldContentProps/, 'field view consumes the typed owner state')
}
// Both fields consume the API; only the deliberate device default differs.
for (const component of ['time', 'time-range']) {
  assert.match(
    readFileSync(resolve(cedar, component, 'props.ts'), 'utf8'),
    /inputEditable:\s*\{\s*type: Boolean,\s*default: true/,
  )
  assert.match(
    readFileSync(resolve(maple, component, 'props.ts'), 'utf8'),
    /inputEditable:\s*\{\s*type: Boolean,\s*default: false/,
  )
}
for (const root of [cedar, maple]) {
  const view = readFileSync(resolve(root, 'time/presentation/TimeFieldContent.vue'), 'utf8')
  assert.match(view, /:editable="[^"]*fieldProps.inputEditable/)
  assert.match(view, /@commit="state.commitText"/)
}
console.log(
  `Time foundation: ${sourcePairs.length} independent source/test pairs, 4 panel and 2 field presentation boundaries verified; field owners copied, local views remain independent.`,
)
