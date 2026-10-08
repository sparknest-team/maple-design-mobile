import type { DateFormatMode } from './date-format'
import { parseDateValue, type DateSelection, type DateSide, type DateValue, type DateValueOptions } from './date-value'

export interface DateDisabledTime {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}
export interface DateRules extends DateValueOptions {
  min?: DateValue
  max?: DateValue
  disabledDate?: (date: Date, side: DateSide) => boolean
  disabledTime?: (date: Date, side: DateSide) => DateDisabledTime
}
function unit(type?: DateFormatMode) {
  return type === 'date' || !type ? 'day' : type
}
export function isDateDisabled(value: DateValue | undefined, options: DateRules = {}, side: DateSide = 'start') {
  const date = parseDateValue(value, options)
  if (!date) {
    return true
  }
  const minimum = parseDateValue(options.min, options)
  const maximum = parseDateValue(options.max, options)
  // A supplied invalid boundary is not silently ignored.
  if ((options.min !== undefined && !minimum) || (options.max !== undefined && !maximum)) {
    return true
  }
  const point = options.showTime ? date : date.startOf(unit(options.type))
  const start = minimum && (options.showTime ? minimum : minimum.startOf(unit(options.type)))
  const end = maximum && (options.showTime ? maximum : maximum.startOf(unit(options.type)))
  if ((start && point.isBefore(start)) || (end && point.isAfter(end))) {
    return true
  }
  if (options.disabledDate?.(date.toDate(), side)) {
    return true
  }
  const time = options.showTime ? options.disabledTime?.(date.toDate(), side) : undefined
  return Boolean(
    time?.disabledHours?.().includes(date.hour()) ||
    time?.disabledMinutes?.(date.hour()).includes(date.minute()) ||
    time?.disabledSeconds?.(date.hour(), date.minute()).includes(date.second()),
  )
}
export function isDateSelectionValid(value: DateSelection, options: DateRules = {}, range = false, multiple = false) {
  if (range) {
    if (!Array.isArray(value) || value.length !== 2) {
      return false
    }
    if (isDateDisabled(value[0], options, 'start') || isDateDisabled(value[1], options, 'end')) {
      return false
    }
    return !parseDateValue(value[0], options)!.isAfter(parseDateValue(value[1], options)!)
  }
  if (multiple) {
    return Array.isArray(value) && value.every((part) => !isDateDisabled(part, options))
  }
  return !Array.isArray(value) && !isDateDisabled(value, options)
}
