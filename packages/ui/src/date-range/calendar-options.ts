import type { DatePickerOptions } from '../date/picker-props'

/** 范围内嵌日历的外观选项；不持有值、规则、事件、视口或布局状态。 */
export type DateRangeCalendarOptions = Pick<
  DatePickerOptions,
  'hint' | 'color' | 'titleColor' | 'buttonElevation' | 'touchable'
>

const calendarAppearanceKeys = new Set(['hint', 'color', 'titleColor', 'buttonElevation', 'touchable'])

export function dateRangeCalendarOptions(options?: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(options ?? {}).filter(([key]) => calendarAppearanceKeys.has(key)),
  ) as DateRangeCalendarOptions
}
