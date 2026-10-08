import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { getDefaultFormat, getDefaultValueFormat, type DateFormatMode } from './date-format'

dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)

export type DateValue = Date | string | number
export type DateSelection = DateValue | (DateValue | undefined)[] | undefined
export type DateSide = 'start' | 'end'
export interface DateValueOptions {
  type?: DateFormatMode
  showTime?: boolean
  useSeconds?: boolean
  format?: string | ((date: Date) => string)
  valueFormat?: string
}
export function dateDisplayFormat(options: DateValueOptions = {}) {
  return typeof options.format === 'string'
    ? options.format
    : getDefaultFormat(options.type, options.showTime, options.useSeconds ?? true)
}
export function dateUsesSeconds(options: DateValueOptions = {}) {
  return /s/.test(dateDisplayFormat(options).replace(/\[[^\]]*\]/g, ''))
}
export function dateValueFormat(options: DateValueOptions = {}) {
  return options.valueFormat || getDefaultValueFormat(options.type, options.showTime, options.useSeconds ?? true)
}
export function parseDateValue(value: DateValue | undefined, options: DateValueOptions = {}) {
  if (value === undefined || value === '') {
    return undefined
  }
  const format = dateValueFormat(options)
  const parsed =
    typeof value === 'string'
      ? dayjs(value, format === 'Date' || format === 'timestamp' ? dateDisplayFormat(options) : format, true)
      : dayjs(value)
  return parsed.isValid() ? parsed : undefined
}
export function outputDateValue(date: Date, options: DateValueOptions = {}): DateValue {
  const format = dateValueFormat(options)
  if (format === 'Date') {
    return new Date(date.getTime())
  }
  if (format === 'timestamp') {
    return date.getTime()
  }
  return dayjs(date).format(format)
}
export function formatDateValue(value: DateValue | undefined, options: DateValueOptions = {}) {
  const date = parseDateValue(value, options)
  if (!date) {
    return ''
  }
  return typeof options.format === 'function' ? options.format(date.toDate()) : date.format(dateDisplayFormat(options))
}
export function dateEventPayload(value: DateSelection, options: DateValueOptions = {}) {
  const values = Array.isArray(value) ? value : [value]
  const dates = values.map((part) => parseDateValue(part, options)?.toDate())
  const texts = values.map((part) => formatDateValue(part, options))
  return Array.isArray(value) ? { dates, texts } : { dates: dates[0], texts: texts[0] }
}
export function sameDateSelection(a: DateSelection, b: DateSelection, options: DateValueOptions = {}) {
  const left = Array.isArray(a) ? a : [a]
  const right = Array.isArray(b) ? b : [b]
  return (
    left.length === right.length &&
    left.every((value, index) => {
      const other = right[index]
      if (value === undefined || other === undefined) {
        return value === other
      }
      return parseDateValue(value, options)?.valueOf() === parseDateValue(other, options)?.valueOf()
    })
  )
}
