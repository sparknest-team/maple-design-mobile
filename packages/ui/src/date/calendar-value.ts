import { getDefaultValueFormat } from './date-format'
import { dateUsesSeconds, outputDateValue, parseDateValue, type DateValueOptions } from './date-value'

export function calendarValueFormat(options: DateValueOptions) {
  return getDefaultValueFormat(options.type, options.showTime, dateUsesSeconds(options))
}
export function toCalendarValue(
  value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined,
  options: DateValueOptions,
): string | (string | undefined)[] | undefined {
  const convert = (part: Date | string | number | null | undefined): string | undefined =>
    parseDateValue(part, options)?.format(calendarValueFormat(options))
  return Array.isArray(value) ? value.map(convert) : convert(value)
}
export function fromCalendarValue(
  value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined,
  options: DateValueOptions,
  previous?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined,
): Date | string | number | (Date | string | number | null | undefined)[] | null | undefined {
  const oldValues = Array.isArray(previous) ? previous : [previous]
  const convert = (part: Date | string | number | null | undefined, index = 0) => {
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
