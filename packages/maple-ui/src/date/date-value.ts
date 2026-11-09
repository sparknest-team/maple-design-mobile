import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import { getDefaultFormat, getDefaultValueFormat, type DateFormatMode } from './date-format'
import { dateLocaleName, dateModelLocaleName, scopedDate, type DateLocaleOptions } from './date-locale'
import { validTimeZone, zonedCivilDate } from './time-zone'

dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)

export type DateValue = Date | string | number
export type DateSelection = null | DateValue | (DateValue | null | undefined)[] | undefined
export type DateSide = 'start' | 'end'
export interface DateValueOptions extends DateLocaleOptions {
  timeZone?: string
  type?: DateFormatMode
  showTime?: boolean
  format?: string | ((date: Date) => string)
  valueFormat?: string
}
export function dateDisplayFormat(options: DateValueOptions = {}) {
  return typeof options.format === 'string' ? options.format : getDefaultFormat(options.type, options.showTime)
}
export function dateUsesSeconds(options: DateValueOptions = {}) {
  return /s/.test(dateDisplayFormat(options).replace(/\[[^\]]*\]/g, ''))
}
export function dateValueFormat(options: DateValueOptions = {}) {
  return options.valueFormat || getDefaultValueFormat(options.type, options.showTime)
}
export function parseDateValue(value: DateValue | null | undefined, options: DateValueOptions = {}) {
  if (value === undefined || value === '') {
    return undefined
  }
  const format = dateValueFormat(options)
  if (options.timeZone) {
    if (!validTimeZone(options.timeZone)) {
      return undefined
    }
    return typeof value === 'string'
      ? zonedCivilDate(
          value,
          format === 'Date' || format === 'timestamp' ? dateDisplayFormat(options) : format,
          dateModelLocaleName(options),
          options.timeZone,
        )
      : dayjs(value).isValid()
        ? dayjs(value).tz(options.timeZone).locale(dateModelLocaleName(options))
        : undefined
  }
  const parsed =
    typeof value === 'string'
      ? dayjs(
          value,
          format === 'Date' || format === 'timestamp' ? dateDisplayFormat(options) : format,
          dateModelLocaleName(options),
          true,
        )
      : scopedDate(value, options)
  return parsed.isValid() ? parsed : undefined
}
/** 手输文本遵守展示 format 与界面语言，不能当作模型 valueFormat 解析。 */
export function parseDateText(text: string, options: DateValueOptions = {}) {
  const format = dateDisplayFormat(options)
  const locale = dateLocaleName(options)
  if (options.type === 'week' && format === 'gggg-wo') {
    const match = /^(\d{4})-(\d{1,2})\D+$/.exec(text)
    if (!match || Number(match[2]) < 1 || Number(match[2]) > 53) {
      return undefined
    }
    // yearStart 定义第一周的锚点；startOf('week') 使用实例 weekStart。
    const anchor = dayjs(`${match[1]}-01-01`, 'YYYY-MM-DD', locale, true)
    // Dayjs weekOfYear 读取该元数据，但 ILocale 尚未声明 yearStart。
    const yearStart = (dayjs.Ls[locale] as { yearStart?: number }).yearStart ?? 1
    const parsed = anchor
      .date(yearStart)
      .startOf('week')
      .add(Number(match[2]) - 1, 'week')
    // 同时校验跨年周号、语言序数后缀与严格文本，拒绝不存在的第 53 周。
    return parsed.isValid() && parsed.format(format) === text
      ? options.timeZone
        ? zonedCivilDate(parsed.format('YYYY-MM-DD'), 'YYYY-MM-DD', locale, options.timeZone)
        : parsed
      : undefined
  }
  if (options.timeZone) {
    return zonedCivilDate(text, format, locale, options.timeZone)
  }
  const parsed = dayjs(text, format, locale, true)
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
  if (options.timeZone && !validTimeZone(options.timeZone)) {
    return ''
  }
  return (options.timeZone ? dayjs(date).tz(options.timeZone) : dayjs(date))
    .locale(dateModelLocaleName(options))
    .format(format)
}
export function formatDateValue(value: DateValue | null | undefined, options: DateValueOptions = {}) {
  const date = parseDateValue(value, options)
  if (!date) {
    return ''
  }
  return typeof options.format === 'function'
    ? options.format(date.toDate())
    : date.locale(dateLocaleName(options)).format(dateDisplayFormat(options))
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
