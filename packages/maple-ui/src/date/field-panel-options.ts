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
  'presentation',
  'panelType',
  'readPretty',
  'beforeCommit',
])
export function dateFieldPanelOptions(
  options: DateFieldProps,
  range: boolean,
): DatePanelOptions & Record<string, unknown> {
  const nested =
    range && 'dateRangePickerProps' in options
      ? options.dateRangePickerProps
      : 'datePickerProps' in options
        ? options.datePickerProps
        : undefined
  const presentation = datePresentationOptions(nested)
  const nestedOptions = Object.fromEntries(
    ['datePickerProps', 'pickerProps'].map((key) => {
      const outer = options[key as keyof DateFieldProps] as Record<string, unknown> | undefined
      return [key, { ...(presentation[key] as Record<string, unknown> | undefined), ...datePresentationOptions(outer) }]
    }),
  )
  return {
    ...presentation,
    ...Object.fromEntries(Object.entries(options).filter(([key]) => !fieldOnly.has(key))),
    ...nestedOptions,
    ...((options as Record<string, any>).panelType ? { presentation: (options as Record<string, any>).panelType } : {}),
  }
}
