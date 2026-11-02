import { computed, type ComputedRef } from 'vue'
import type { DateDisabledTime, DateRules } from './date-rules'
import { parseDateValue, type DateSide } from './date-value'
import type { DisabledTime } from './time-constraints'

function dateTimeBlocked(current: Date, options: DateRules, side: DateSide) {
  const minimum = parseDateValue(options.min, options)
  const maximum = parseDateValue(options.max, options)
  const wall = parseDateValue(current, options)
  return function blocked(unit: 'hour' | 'minute' | 'second', hour: number, minute = 0, second = 0) {
    const value = new Date(current.getTime())
    value.setHours(hour, minute, second, 0)
    const civil = (minute: number, second: number) =>
      parseDateValue(
        `${wall?.format('YYYY-MM-DD')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
        { ...options, valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      )
    let date = options.timeZone ? civil(minute, second) : parseDateValue(value)
    let last = date ? date.valueOf() + (unit === 'hour' ? 3600000 : unit === 'minute' ? 60000 : 1000) - 1 : undefined
    if (options.timeZone && unit === 'hour') {
      // Some zones skip only half an hour. Keep the remaining part selectable.
      for (let candidate = 0; !date && candidate < 60; candidate++) {
        date = civil(candidate, 0)
      }
      let end = civil(59, 59)
      for (let candidate = 58; !end && candidate >= 0; candidate--) {
        end = civil(candidate, 59)
      }
      last = end ? end.valueOf() + 999 : undefined
    }
    if (date) {
      value.setTime(date.valueOf())
    }
    if (
      !date ||
      last === undefined ||
      (options.min !== undefined && !minimum) ||
      (options.max !== undefined && !maximum)
    ) {
      return true
    }
    if ((minimum && last < minimum.valueOf()) || (maximum && date.valueOf() > maximum.valueOf())) {
      return true
    }
    if (options.disabledDate?.(value, side)) {
      return true
    }
    const rules = options.disabledTime?.(value, side)
    if (rules?.disabledHours?.().includes(hour)) {
      return true
    }
    if (unit !== 'hour' && rules?.disabledMinutes?.(hour).includes(minute)) {
      return true
    }
    return unit === 'second' && Boolean(rules?.disabledSeconds?.(hour, minute).includes(second))
  }
}

/** Evaluate only the requested candidate; quick choices do not need every second in a minute. */
export function dateTimeDisabledPredicates(current: Date, options: DateRules, side: DateSide = 'start'): DisabledTime {
  const blocked = dateTimeBlocked(current, options, side)
  const wall = parseDateValue(current, options)
  const candidates = new Map<string, ComputedRef<boolean>>()
  function candidate(unit: 'hour' | 'minute' | 'second', hour: number, minute = 0, second = 0) {
    const key = `${unit}:${hour}:${minute}:${second}`
    if (!candidates.has(key)) {
      candidates.set(
        key,
        computed(() => blocked(unit, hour, minute, second)),
      )
    }
    return candidates.get(key)!.value
  }
  return {
    hours: (hour) => candidate('hour', hour),
    minutes: (minute, hour = wall?.hour() ?? 0) => candidate('minute', hour, minute),
    seconds: (second, hour = wall?.hour() ?? 0, minute = wall?.minute() ?? 0) =>
      candidate('second', hour, minute, second),
  }
}

/** Hierarchical time constraints: a partly available hour/minute must remain selectable. */
export function dateTimeDisabledRules(current: Date, options: DateRules, side: DateSide = 'start'): DateDisabledTime {
  const blocked = dateTimeBlocked(current, options, side)
  const hours = computed(() => Array.from({ length: 24 }, (_, index) => index).filter((hour) => blocked('hour', hour)))
  const minutes = new Map<number, ComputedRef<number[]>>()
  const seconds = new Map<string, ComputedRef<number[]>>()
  return {
    disabledHours: () => hours.value,
    disabledMinutes: (hour) => {
      if (!minutes.has(hour)) {
        minutes.set(
          hour,
          computed(() =>
            Array.from({ length: 60 }, (_, index) => index).filter((minute) => blocked('minute', hour, minute)),
          ),
        )
      }
      return minutes.get(hour)!.value
    },
    disabledSeconds: (hour, minute) => {
      const key = hour + ':' + minute
      if (!seconds.has(key)) {
        seconds.set(
          key,
          computed(() =>
            Array.from({ length: 60 }, (_, index) => index).filter((second) => blocked('second', hour, minute, second)),
          ),
        )
      }
      return seconds.get(key)!.value
    },
  }
}
