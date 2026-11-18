import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/ui/src')
// Public presentation props and endpoint gestures differ across mobile and desktop.
// Mobile DatePanel footer/quick-view composition also differs; selection and value owners remain paired.
// Their entry/session suites run independently; keep shared selection transactions and value rules identical.
const files = [
  'date/date-format.ts',
  'date/date-value.ts',
  'date/date-locale.ts',
  'date/__tests__/date-locale.test.ts',
  'date/__tests__/date-text.test.ts',
  'date/__tests__/text-entry.test.ts',
  'date/__tests__/field-panel-events.test.ts',
  'date/date-current.ts',
  'date/date-labels.ts',
  'date/normalize-date-range.ts',
  'date/calendar-value.ts',
  'date/date-rules.ts',
  'date/date-time-rules.ts',
  'date/core-props.ts',
  'date/panel-tools-props.ts',
  'date/use-date-panel-tools.ts',
  'date/DateShortcuts.vue',
  'date/__tests__/date-panel-tools.test.ts',
  'date/__tests__/date-panel-tools-owner.test.ts',
  'date/events.ts',
  'date/use-date-selection.ts',
  'date/panel-state.ts',
  'date/field-state.ts',
  'date/presentation-options.ts',
  'date/__tests__/field-panel-options.test.ts',
  'date/presentation/calendar-layout.ts',
  'date/DateField.vue',
  'date/Date.vue',
  'date/DatePicker.vue',
  'date-range/DateRange.vue',
  'date-range/DateRangePicker.vue',
  'date/__tests__/date-format.test.ts',
  'date/__tests__/date-contract.test.ts',
  'date/__tests__/date-owners.test.ts',
  'date/__tests__/date-ssr.test.ts',
]
const normalize = (text) =>
  text
    .replace(/^.*\['presentation' in options && options.presentation === 'calendarClock'.*\n/gm, '')
    .replaceAll('../_utils/empty-value', '../utils/empty-value')
    .replaceAll('../_utils/global-config', '../utils/components')
    .replaceAll('{ dateProps as fieldProps }', '{ props as fieldProps }')
    .replaceAll('{ dateRangeProps as fieldProps }', '{ props as fieldProps }')

assert.equal(new Set(files).size, files.length, 'Source pair entries must be unique')
// Keep the mobile-only presentation contract explicit before comparing shared owners.
const mobileRangeEntry = '    endpoint-selection\n'
const mobilePanelOptions =
  "  interactiveMode?: import('./calendar-viewport-props').CalendarInteractiveMode\n  useVirtualScroll?: boolean\n"
for (const file of files) {
  const desktop = readFileSync(resolve(cedar, file), 'utf8')
  let mobile = readFileSync(resolve(maple, file), 'utf8')
  if (file === 'date-range/DateRange.vue') {
    assert.ok(mobile.includes(mobileRangeEntry), 'Mobile range fields must use endpoint selection')
    assert.ok(!desktop.includes(mobileRangeEntry), 'Desktop range fields use two-endpoint selection')
    mobile = mobile.replace(mobileRangeEntry, '')
  }
  if (file === 'date-range/DateRange.vue' || file === 'date-range/DateRangePicker.vue') {
    // Mobile range renderers are supplied only by range entries to keep Date's bundle lean.
    // Desktop DatePicker forwards a range attribute and retains its shared range renderer.
    for (const line of [
      "import { provideRangeRenderer } from '../date/range-renderer'\n",
      "import RangeContent from './presentation/RangeContent.vue'\n",
      'provideRangeRenderer(RangeContent)\n\n',
    ]) {
      assert.ok(mobile.includes(line), `${file}: missing mobile renderer ownership`)
      assert.ok(!desktop.includes(line), `${file}: unexpected desktop renderer ownership`)
      mobile = mobile.replace(line, '')
    }
  }
  if (file === 'date/panel-state.ts') {
    assert.ok(mobile.includes(mobilePanelOptions), 'Mobile panels must declare their viewport options')
    assert.ok(!desktop.includes('interactiveMode?'), 'Desktop panels do not expose mobile viewport modes')
    assert.ok(!desktop.includes('useVirtualScroll?'), 'Desktop panels do not expose mobile virtual scrolling')
    mobile = mobile.replace(mobilePanelOptions, '')
  }
  assert.equal(normalize(desktop), normalize(mobile), file)
}
for (const root of [cedar, maple]) {
  for (const file of ['date/Date.vue', 'date-range/DateRange.vue']) {
    const source = readFileSync(resolve(root, file), 'utf8')
    assert.match(source, /<DateField\b/)
    assert.doesNotMatch(source, /useFieldValue|useDateSelection|useFieldTransaction/)
  }
  for (const file of ['date/presentation/DateFieldContent.vue', 'date/presentation/DatePanelContent.vue']) {
    assert.doesNotMatch(
      readFileSync(resolve(root, file), 'utf8'),
      /useFieldValue|useDateSelection|useFieldTransaction/,
      file,
    )
  }
}
console.log(
  'Date family: ' + files.length + ' independent source/test pairs and field/panel presentation boundaries verified.',
)
