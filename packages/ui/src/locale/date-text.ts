import { defaultLocaleReady, t } from './state'
import { temporalText } from './temporal-text'
import {
  defaultDateTextDatePickerColumnDay,
  defaultDateTextDatePickerColumnMonth,
  defaultDateTextDatePickerColumnYear,
  defaultDateTextDatePickerHint,
  defaultDateTextDatePickerMonthDict,
  defaultDateTextDatePickerNextMonth,
  defaultDateTextDatePickerNextPeriod,
  defaultDateTextDatePickerNextWeek,
  defaultDateTextDatePickerNextYear,
  defaultDateTextDatePickerPreviousMonth,
  defaultDateTextDatePickerPreviousPeriod,
  defaultDateTextDatePickerPreviousWeek,
  defaultDateTextDatePickerPreviousYear,
  defaultDateTextDatePickerSelected,
  defaultDateTextDatePickerWeekDict,
  defaultDateTextDateRangeOrderError,
  defaultDateTextDateTimeRangeOrderError,
  defaultDateTextRangeEndPlaceholder,
  defaultDateTextRangeStartPlaceholder,
  defaultDateTextTimePickerHint,
  defaultFieldDateRangeEnd,
  defaultFieldDateRangeStart,
} from './zh-CN'

const defaults: Record<string, ReturnType<typeof t>> = {
  datePickerPreviousWeek: defaultDateTextDatePickerPreviousWeek,
  datePickerNextWeek: defaultDateTextDatePickerNextWeek,
  datePickerPreviousMonth: defaultDateTextDatePickerPreviousMonth,
  datePickerNextMonth: defaultDateTextDatePickerNextMonth,
  datePickerPreviousYear: defaultDateTextDatePickerPreviousYear,
  datePickerNextYear: defaultDateTextDatePickerNextYear,
  datePickerPreviousPeriod: defaultDateTextDatePickerPreviousPeriod,
  datePickerNextPeriod: defaultDateTextDatePickerNextPeriod,
  datePickerSelected: defaultDateTextDatePickerSelected,
  dateRangeOrderError: defaultDateTextDateRangeOrderError,
  dateTimeRangeOrderError: defaultDateTextDateTimeRangeOrderError,
  datePickerHint: defaultDateTextDatePickerHint,
  datePickerColumnYear: defaultDateTextDatePickerColumnYear,
  datePickerColumnMonth: defaultDateTextDatePickerColumnMonth,
  datePickerColumnDay: defaultDateTextDatePickerColumnDay,
  timePickerHint: defaultDateTextTimePickerHint,
  rangeStartPlaceholder: defaultDateTextRangeStartPlaceholder,
  rangeEndPlaceholder: defaultDateTextRangeEndPlaceholder,
  datePickerMonthDict: defaultDateTextDatePickerMonthDict,
  datePickerWeekDict: defaultDateTextDatePickerWeekDict,
  dateRangeStart: defaultFieldDateRangeStart,
  dateRangeEnd: defaultFieldDateRangeEnd,
  lang: 'zh-CN',
}
export function dateText(key: string): ReturnType<typeof t> {
  const value = t(key)
  if (defaultLocaleReady.value) {
    return value
  }
  return value ?? (Object.prototype.hasOwnProperty.call(defaults, key) ? defaults[key] : temporalText(key))
}
