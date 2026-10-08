import type { DateFieldProps } from './field-state'
import type { DatePanelOptions } from './panel-state'
import { datePresentationOptions } from './presentation-options'

const fieldOnly = new Set([
  'hint',
  'line',
  'variant',
  'size',
  'textColor',
  'focusColor',
  'blurColor',
  'placeholder',
  'separator',
  'clearable',
  'error',
  'popupProps',
  'popupContainer',
  'open',
  'defaultOpen',
  'inputEditable',
])
export function dateFieldPanelOptions(
  options: DateFieldProps,
  range: boolean,
): DatePanelOptions & Record<string, unknown> {
  const nested = range && 'dateRangePickerProps' in options ? options.dateRangePickerProps : options.datePickerProps
  return {
    ...datePresentationOptions(nested),
    ...Object.fromEntries(Object.entries(options).filter(([key]) => !fieldOnly.has(key))),
  }
}
