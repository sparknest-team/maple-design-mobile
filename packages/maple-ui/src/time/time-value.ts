import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { parseClock } from '../utils/picker-data'
import { formatClockLabel, resolveTimeFormat, type TimeFormatOptions } from './time-format'
import { getTimeChoices, isTimeAllowed, type TimeConstraints } from './time-rules'

dayjs.extend(customParseFormat)

/** Input accepts formatted strings, local Date objects or millisecond timestamps. Output is a formatted string. */
export type TimeValue = string | number | Date
export type FormattedTimeRules = TimeFormatOptions & Omit<TimeConstraints, 'useSeconds'>

export function parseTimeValue(value: TimeValue | undefined | null, options: TimeFormatOptions = {}) {
  if (value == null || value === '') {
    return undefined
  }
  const parsed =
    typeof value === 'string' ? dayjs(value, resolveTimeFormat(options).format, 'en', true) : dayjs(value).locale('en')
  return parsed.isValid() ? parsed : undefined
}

export function formatTimeValue(value: TimeValue | undefined | null, options: TimeFormatOptions = {}) {
  return parseTimeValue(value, options)?.format(resolveTimeFormat(options).format)
}

/** Convert only at the renderer boundary; all constraint callbacks receive actual 24-hour values. */
export function toClockValue(value: TimeValue | undefined | null, options: TimeFormatOptions = {}) {
  const parsed = parseTimeValue(value, options)
  if (!parsed) {
    return undefined
  }
  const { columns } = resolveTimeFormat(options)
  return parsed
    .hour(columns.includes('H') || columns.includes('h') ? parsed.hour() : 0)
    .minute(columns.includes('m') ? parsed.minute() : 0)
    .second(columns.includes('s') ? parsed.second() : 0)
    .format('HH:mm:ss')
}

export function fromClockValue(value: string | undefined, options: TimeFormatOptions = {}) {
  const seconds = parseClock(value)
  return seconds === null ? undefined : formatClockLabel(seconds, resolveTimeFormat(options).format)
}

export function getFormattedTimeChoices(value: TimeValue | null | undefined, rules: FormattedTimeRules) {
  const result = getTimeChoices(toClockValue(value, rules), getTimeConstraints(rules))
  return { ...result, value: fromClockValue(result.value, rules) }
}

export function isFormattedTimeAllowed(value: TimeValue | null | undefined, rules: FormattedTimeRules) {
  return isTimeAllowed(toClockValue(value, rules), getTimeConstraints(rules))
}

/** Omitted units are zero, not invisible selectable values. */
export function getTimeConstraints(rules: FormattedTimeRules): TimeConstraints {
  const config = resolveTimeFormat(rules)
  const hour = config.columns.includes('H') || config.columns.includes('h')
  const minute = config.columns.includes('m')
  return {
    ...rules,
    useSeconds: config.useSeconds,
    disabledHours: hour
      ? rules.disabledHours
      : () => [...(rules.disabledHours?.() ?? []), ...Array.from({ length: 23 }, (_, i) => i + 1)],
    disabledMinutes: minute
      ? rules.disabledMinutes
      : (hour) => [...(rules.disabledMinutes?.(hour) ?? []), ...Array.from({ length: 59 }, (_, i) => i + 1)],
  }
}
