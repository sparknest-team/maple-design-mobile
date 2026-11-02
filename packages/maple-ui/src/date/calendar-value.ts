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
export function fromCalendarValue(
  value: DateSelection,
  options: DateValueOptions,
  previous?: DateSelection,
): DateSelection {
  const oldValues = Array.isArray(previous) ? previous : [previous]
  const convert = (part: Exclude<DateSelection, unknown[]>, index = 0) => {
    const old = oldValues[index]
    // Civil labels omit the fold occurrence and sub-display precision. Untouched
    // endpoints retain their original instant, especially when that side is locked.
    if (part !== undefined && old !== undefined && toCalendarValue(old, options) === part) {
      return old instanceof Date ? new Date(old.getTime()) : old
    }
    const date = parseDateValue(part, { ...options, valueFormat: calendarValueFormat(options) })
    return date ? outputDateValue(date.toDate(), options) : undefined
  }
  return Array.isArray(value) ? value.map(convert) : convert(value)
}
