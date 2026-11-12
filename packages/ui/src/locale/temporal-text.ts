import { defaultLocaleReady, t } from './state'
import {
  defaultFieldPickerConfirmButtonText,
  defaultFieldPickerTitle,
  defaultFieldTimeRangeEnd,
  defaultFieldTimeRangeStart,
  defaultTemporalHour,
  defaultTemporalMinute,
  defaultTemporalNextDay,
  defaultTemporalNow,
  defaultTemporalOrderError,
  defaultTemporalPickerCancel,
  defaultTemporalSecond,
} from './zh-CN'

const defaults: Record<string, string> = {
  pickerTitle: defaultFieldPickerTitle,
  pickerConfirmButtonText: defaultFieldPickerConfirmButtonText,
  timeRangeStart: defaultFieldTimeRangeStart,
  timeRangeEnd: defaultFieldTimeRangeEnd,
  pickerCancelButtonText: defaultTemporalPickerCancel,
  timeRangeOrderError: defaultTemporalOrderError,
  datePickerNowButtonText: defaultTemporalNow,
  datePickerColumnHour: defaultTemporalHour,
  datePickerColumnMinute: defaultTemporalMinute,
  datePickerColumnSecond: defaultTemporalSecond,
  timeRangeNextDay: defaultTemporalNextDay,
}
export function temporalText(key: string): ReturnType<typeof t> {
  const value = t(key)
  return defaultLocaleReady.value
    ? value
    : (value ?? (Object.prototype.hasOwnProperty.call(defaults, key) ? defaults[key] : undefined))
}
