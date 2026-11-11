import type {
  AutoCompleteProps,
  AutoCompleteTriggerOptions,
  CascaderProps,
  CascaderTriggerOptions,
  DatePopupOptions,
  DateProps,
  DateRangePopupOptions,
  DateRangeProps,
  SelectProps,
  SelectTriggerOptions,
  TimeProps,
  TimeRangeProps,
  TriggerProps,
} from '@maple-design/ui-vue'
import type { AutoCompleteTriggerOptions as AutoSubpath } from '@maple-design/ui-vue/auto-complete'
import type { CascaderTriggerOptions as CascaderSubpath } from '@maple-design/ui-vue/cascader'
import type { DatePopupOptions as DateSubpath } from '@maple-design/ui-vue/date'
import type { DateRangePopupOptions as RangeSubpath } from '@maple-design/ui-vue/date-range'
import type { SelectTriggerOptions as SelectSubpath } from '@maple-design/ui-vue/select'

type Assert<T extends true> = T
export type LegacyAuto = Assert<TriggerProps extends NonNullable<AutoCompleteProps['triggerProps']> ? true : false>
export type LegacySelect = Assert<TriggerProps extends NonNullable<SelectProps['triggerProps']> ? true : false>
export type LegacyCascader = Assert<TriggerProps extends NonNullable<CascaderProps['triggerProps']> ? true : false>
const auto: AutoCompleteTriggerOptions = {
  placement: 'top-start',
  popupOffset: 8,
  popupContainer: false,
  popupClass: 'custom',
}
const select: SelectTriggerOptions = { ...auto, unmountOnClose: true, autoFitPopupWidth: false }
const cascader: CascaderTriggerOptions = { ...select, popupTranslate: [0, 12] }
const date: DatePopupOptions = {
  placement: 'top-start',
  popupTranslate: [0, 8],
  popupContainer: false,
  popupStyle: { maxWidth: '320px' },
}
const range: DateRangePopupOptions = date
const subpaths: [AutoSubpath, SelectSubpath, CascaderSubpath, DateSubpath, RangeSubpath] = [
  auto,
  select,
  cascader,
  date,
  range,
]
const hosts: [AutoCompleteProps, SelectProps, CascaderProps, DateProps, DateRangeProps] = [
  { triggerProps: auto },
  { triggerProps: select },
  { triggerProps: cascader },
  { popupProps: date },
  { popupProps: range },
]
// Published wide props keep accepting legacy configuration, including ignored/overridden fields.
const legacy: [AutoCompleteProps, SelectProps, CascaderProps, DateProps, DateRangeProps] = [
  { triggerProps: { open: true, disabled: false } },
  { triggerProps: { defaultOpen: true, disabled: false } },
  { triggerProps: { open: true } },
  { popupProps: { open: true, modelValue: 'legacy', onChange: () => {}, customKey: 1 } },
  { popupProps: { defaultOpen: true, arbitraryLegacyKey: 1 } },
]
// @ts-expect-error Controlled visibility belongs to the host.
const badAuto: AutoCompleteTriggerOptions = { open: true }
// @ts-expect-error Initial visibility also belongs to the host.
const badSelect: SelectTriggerOptions = { defaultOpen: true }
// @ts-expect-error Disabled cannot override the host state in the opt-in type.
const badCascader: CascaderTriggerOptions = { disabled: false }
// @ts-expect-error Internal update listener belongs to the host.
const badListener: AutoCompleteTriggerOptions = { 'onUpdate:open': () => {} }
// @ts-expect-error Date popup field names are checked.
const typo: DatePopupOptions = { popupOffest: 4 }
// @ts-expect-error Date renderer owns this offset.
const badOffset: DatePopupOptions = { popupOffset: 4 }
// @ts-expect-error Date presentation filters listeners at runtime.
const badDateListener: DatePopupOptions = { onChange: () => {} }
// @ts-expect-error Host rules do not belong in nested appearance.
const badRule: DateRangePopupOptions = { min: '2026-01-01' }
const widened = { open: true, placement: 'top-start' as const }
// @ts-expect-error The boundary also catches forbidden fields on a predeclared variable.
const badVariable: SelectTriggerOptions = widened
void [
  subpaths,
  hosts,
  legacy,
  badAuto,
  badSelect,
  badCascader,
  badListener,
  typo,
  badOffset,
  badDateListener,
  badRule,
  badVariable,
]
// @ts-expect-error Existing Time popup presentation boundary remains unchanged.
const badTime: TimeProps = { popupProps: { open: true } }
// @ts-expect-error Existing TimeRange popup presentation boundary remains unchanged.
const badTimeRange: TimeRangeProps = { popupProps: { disabled: false } }
void [badTime, badTimeRange]
