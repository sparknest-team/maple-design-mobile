import type { TimeFormatOptions } from './time-format'
import { parseTimeValue, type TimeValue } from './time-value'

/** The second event argument uses local dates; empty values never become Invalid Date. */
export function getTimeEventDates(
  value: TimeValue | Array<TimeValue | undefined> | undefined,
  options: TimeFormatOptions = {},
): Date | Array<Date | undefined> | undefined {
  return Array.isArray(value)
    ? value.map((part) => parseTimeValue(part, options)?.toDate())
    : parseTimeValue(value, options)?.toDate()
}
