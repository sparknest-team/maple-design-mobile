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
export function isDateDisabled(value: DateValue | null | undefined, options: DateRules = {}, side: DateSide = 'start') {
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
  if ((start && point.valueOf() < start.valueOf()) || (end && point.valueOf() > end.valueOf())) {
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
/** Calendar day cells ignore time precision only after parsing the original model and bounds. */
export function isCalendarDateDisabled(
  value: DateValue | null | undefined,
  options: DateRules = {},
  side: DateSide = 'start',
) {
  const date = parseDateValue(value, options)
  const minimum = parseDateValue(options.min, options)
  const maximum = parseDateValue(options.max, options)
  if (!date || (options.min !== undefined && !minimum) || (options.max !== undefined && !maximum)) {
    return true
  }
  return isDateDisabled(
    date.toDate(),
    {
      ...options,
      showTime: false,
      min: minimum?.toDate(),
      max: maximum?.toDate(),
    },
    side,
  )
}
export function isDateEndpointSelectionValid(value: DateSelection, options: DateRules = {}, endpoint?: number) {
  if (!Array.isArray(value) || !value.length || value.length > 2) {
    return false
  }
  if (endpoint !== undefined && isDateDisabled(value[endpoint], options, endpoint === 1 ? 'end' : 'start')) {
    return false
  }
  // Editing one endpoint must not make an incomplete range committable.
  return isDateSelectionValid(value, options, true)
}
export function isDateSelectionValid(value: DateSelection, options: DateRules = {}, range = false, multiple = false) {
  if (range) {
    if (!Array.isArray(value) || value.length !== 2) {
      return false
    }
    if (isDateDisabled(value[0], options, 'start') || isDateDisabled(value[1], options, 'end')) {
      return false
    }
    return parseDateValue(value[0], options)!.valueOf() <= parseDateValue(value[1], options)!.valueOf()
  }
  if (multiple) {
    return Array.isArray(value) && value.every((part) => !isDateDisabled(part, options))
  }
  return !Array.isArray(value) && !isDateDisabled(value, options)
}
