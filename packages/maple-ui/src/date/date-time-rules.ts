import { computed, type ComputedRef } from 'vue'
import type { DateDisabledTime, DateRules } from './date-rules'
import { parseDateValue, type DateSide } from './date-value'

/** Hierarchical time constraints: a partly available hour/minute must remain selectable. */
export function dateTimeDisabledRules(current: Date, options: DateRules, side: DateSide = 'start'): DateDisabledTime {
  const minimum = parseDateValue(options.min, options)
  const maximum = parseDateValue(options.max, options)
  function blocked(unit: 'hour' | 'minute' | 'second', hour: number, minute = 0, second = 0) {
    const value = new Date(current.getTime())
    value.setHours(hour, minute, second, 0)
    const date = parseDateValue(value)
    if (!date || (options.min !== undefined && !minimum) || (options.max !== undefined && !maximum)) {
      return true
    }
    if ((minimum && date.endOf(unit).isBefore(minimum)) || (maximum && date.startOf(unit).isAfter(maximum))) {
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
