import { getDefaultValueFormat } from './date-format'
import {
  dateUsesSeconds,
  outputDateValue,
  parseDateValue,
  type DateSelection,
  type DateValueOptions,
} from './date-value'

export function calendarValueFormat(options: DateValueOptions) {
  return getDefaultValueFormat(options.type, options.showTime, dateUsesSeconds(options))
}
export function toCalendarValue(
  value: DateSelection,
  options: DateValueOptions,
): string | (string | undefined)[] | undefined {
  const convert = (part: Exclude<DateSelection, unknown[]>): string | undefined =>
    parseDateValue(part, options)?.format(calendarValueFormat(options))
  return Array.isArray(value) ? value.map(convert) : convert(value)
}
export function fromCalendarValue(value: DateSelection, options: DateValueOptions): DateSelection {
  const convert = (part: Exclude<DateSelection, unknown[]>) => {
    const date = parseDateValue(part, { ...options, valueFormat: calendarValueFormat(options) })
    return date ? outputDateValue(date.toDate(), options) : undefined
  }
  return Array.isArray(value) ? value.map(convert) : convert(value)
}
