import type {
  DateEmits,
  DatePickerEmits,
  DatePickerOptions,
  DatePickerProps,
  DatePickerType,
  DateProps,
  DateRangeEmits,
  DateRangePickerEmits,
  DateRangePickerOptions,
  DateRangePickerProps,
  DateRangePickerType,
  DateRangeProps,
  DateShortcut,
  DateShortcutsPosition,
  DateWeekStart,
} from '@maple-design/ui'
import { DatePicker } from '@maple-design/ui/date'
import type { DatePickerProps as SubpathPanel } from '@maple-design/ui/date'
import { DateRangePicker } from '@maple-design/ui/date-range'
import type { DateRangePickerProps as SubpathRange } from '@maple-design/ui/date-range'

const week: DateWeekStart = 1
const type: DatePickerType = 'month'
const rangeType: DateRangePickerType = 'date'
const field: DateProps = { open: true, variant: 'outline', datePickerProps: { dayStartOfWeek: week } }
const range: DateRangeProps = { dateRangePickerProps: { dayStartOfWeek: week } }
const panel: DatePickerProps = { type, dayStartOfWeek: week, disableConfirm: false, modelValue: new Date() }
const rangePanel: DateRangePickerProps = {
  type: rangeType,
  disabled: [false, true],
  modelValue: ['2025-01-01', '2025-01-03'],
}
const options: DatePickerOptions = { dayStartOfWeek: week }
const rangeOptions: DateRangePickerOptions = { dayStartOfWeek: week }
const subpath: SubpathPanel = panel
const subpathRange: SubpathRange = rangePanel
const change: DatePickerEmits['change'] = ['2025-01-01', new Date(), '01/01/2025']
const confirm: DateRangePickerEmits['confirm'] = [['2025-01-01'], [new Date()], ['01/01/2025']]
const focus: DateEmits['focus'] = []
const open: DateRangeEmits['update:open'] = [true]
// @ts-expect-error Pure panels do not control a popup.
const badPanel: DatePickerProps = { open: true }
// @ts-expect-error Input appearance belongs to the field.
const badRangePanel: DateRangePickerProps = { variant: 'outline' }
// @ts-expect-error Removed pre-release alias.
const oldWeek: DatePickerProps = { firstDayOfWeek: 1 }
// @ts-expect-error Week starts are numeric.
const stringWeek: DatePickerProps = { dayStartOfWeek: '1' }
// @ts-expect-error Week range is zero to six.
const badWeek: DateWeekStart = 7
// @ts-expect-error Nested options cannot own the model.
const badOptions: DatePickerOptions = { modelValue: '2025-01-01' }
// @ts-expect-error Nested options cannot own the rules.
const badRangeOptions: DateRangePickerOptions = { disabledDate: () => true }
// @ts-expect-error Field control is a boolean event.
const badOpen: DateEmits['update:open'] = ['true']
void [
  field,
  range,
  panel,
  rangePanel,
  options,
  rangeOptions,
  subpath,
  subpathRange,
  change,
  confirm,
  focus,
  open,
  badPanel,
  badRangePanel,
  oldWeek,
  stringWeek,
  badWeek,
  badOptions,
  badRangeOptions,
  badOpen,
  DatePicker,
  DateRangePicker,
]

const shortcut: DateShortcut = { label: 'next', value: () => new Date(), disabled: false }
const position: DateShortcutsPosition = 'bottom'
const toolsPanel: DatePickerProps = { shortcuts: [shortcut], shortcutsPosition: position, pickerValue: new Date() }
const navigate: DatePickerEmits['update:pickerValue'] = [new Date()]
const shortcutEvent: DateRangePickerEmits['select-shortcut'] = [shortcut]
// @ts-expect-error Shortcut position is a closed enum.
const badPosition: DateShortcutsPosition = 'top'
void [toolsPanel, navigate, shortcutEvent, badPosition]

const currentPanel: DatePickerProps = { showCurrent: false, showNowButton: true }
const currentOptions: DatePickerOptions = { showNowButton: false }
const rangeInteraction: DateRangePickerProps = { exchangeTime: false, showCurrent: false }
// @ts-expect-error Removed pre-release current action name.
const oldNow: DatePickerProps = { showNowBtn: true }
// @ts-expect-error Range panels do not offer single-current selection.
const rangeNow: DateRangePickerProps = { showNowButton: true }
void [currentPanel, currentOptions, rangeInteraction, oldNow, rangeNow]

// @ts-expect-error Range current highlighting is owned by the top-level panel.
const nestedCurrent: DateRangePickerProps = { datePickerProps: { showCurrent: false } }
// @ts-expect-error Private range calendars do not expose single-current actions.
const nestedNow: DateRangePickerProps = { datePickerProps: { showNowButton: true } }
void [nestedCurrent, nestedNow]

// @ts-expect-error Date panels use global Locale, not component-specific dictionaries.
const localDictionary: DatePickerProps = { locale: {} }
// @ts-expect-error Range panels use the same global Locale.
const rangeLocalDictionary: DateRangePickerProps = { locale: {} }
void [localDictionary, rangeLocalDictionary]

const calendarAppearance: DateRangePickerProps = { datePickerProps: { hint: '设备', color: 'red', touchable: false } }
// @ts-expect-error Nested calendars cannot own viewport.
const nestedViewport: DateRangePickerProps = { datePickerProps: { pickerValue: '2025-01-01' } }
// @ts-expect-error Month abbreviation belongs to the range root.
const nestedAbbreviation: DateRangePickerProps = { datePickerProps: { abbreviation: false } }
// @ts-expect-error Range owns its presentation.
const nestedPresentation: DateRangePickerProps = { datePickerProps: { presentation: 'picker' } }
void [calendarAppearance, nestedViewport, nestedAbbreviation, nestedPresentation]

const rootAppearance: import('@maple-design/ui').DateRangeCalendarOptions = { hint: '设备' }
const subpathAppearance: import('@maple-design/ui/date-range').DateRangeCalendarOptions = rootAppearance
void subpathAppearance

const timeView: import('@maple-design/ui').DateTimePickerOptions = {
  use12Hours: true,
  step: { minute: 15 },
  hideDisabledOptions: true,
}
const dateTimeView: DatePickerProps = { timePickerProps: timeView }
// @ts-expect-error Nested time options cannot override date precision.
const nestedTimeFormat: DatePickerProps = { timePickerProps: { format: 'ss' } }
// @ts-expect-error Date constraints belong to the date root.
const nestedTimeRules: DateRangePickerProps = { timePickerProps: { disabledHours: () => [] } }
void [dateTimeView, nestedTimeFormat, nestedTimeRules]

const wheelView: import('@maple-design/ui').DateWheelOptions = { optionCount: 4, optionHeight: 36 }
const dateWheel: DatePickerProps = { pickerProps: wheelView }
// @ts-expect-error Columns are generated by the date owner.
const nestedColumns: DatePickerProps = { pickerProps: { columns: [] } }
// @ts-expect-error Wheel popup state cannot take over the panel.
const nestedWheelOpen: DateRangePickerProps = { pickerProps: { open: true } }
void [dateWheel, nestedColumns, nestedWheelOpen]

const mobileFieldWheel: DateProps = { pickerProps: { optionCount: 4 } }
const mobileRangeViews: DateRangeProps = { pickerProps: { optionHeight: 36 }, datePickerProps: { hint: '设备' } }
void [mobileFieldWheel, mobileRangeViews]

const rootFieldPresentation: DateProps = { presentation: 'calendar' }
const rootRangePresentation: DateRangeProps = { presentation: 'calendar' }
const rootPanelPresentation: DatePickerProps = { presentation: 'calendarClock' }
const rootRangePanelPresentation: DateRangePickerProps = { presentation: 'picker' }
// @ts-expect-error Field root owns presentation; nested Options cannot change it.
const nestedFieldPresentation: DatePickerOptions = { presentation: 'calendar' }
// @ts-expect-error Range field root owns presentation.
const nestedRangeFieldPresentation: DateRangePickerOptions = { presentation: 'picker' }
// @ts-expect-error Subpath Options have the same boundary.
const nestedSubpathPresentation: import('@maple-design/ui/date').DatePickerOptions = { presentation: 'calendar' }
const nestedRangeSubpathPresentation: import('@maple-design/ui/date-range').DateRangePickerOptions = {
  // @ts-expect-error Range subpath Options cannot own presentation either.
  presentation: 'calendar',
}
void [
  rootFieldPresentation,
  rootRangePresentation,
  rootPanelPresentation,
  rootRangePanelPresentation,
  nestedFieldPresentation,
  nestedRangeFieldPresentation,
  nestedSubpathPresentation,
  nestedRangeSubpathPresentation,
]
