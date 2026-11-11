import { clockSeconds, parseClock, unitSequence } from '../utils/picker-data'

export interface ClockParts {
  hour: number
  minute: number
  second: number
}

export interface ClockDisabledRules {
  hours?: () => number[]
  minutes?: (hour: number) => number[]
  seconds?: (hour: number, minute: number) => number[]
}

export interface TimeDisabledRules {
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
}

export interface TimeStep {
  hour?: number
  minute?: number
  second?: number
}

export interface TimeConstraints extends TimeDisabledRules {
  step?: TimeStep
  min?: string
  max?: string
  useSeconds?: boolean
}

/** Canonical public callbacks are evaluated with actual 24-hour values. */
export function isTimeAllowed(value: string | undefined, rules: TimeConstraints) {
  const total = parseClock(value)
  if (total === null) {
    return false
  }
  const hour = Math.floor(total / 3600)
  const minute = Math.floor(total / 60) % 60
  const second = total % 60
  return (
    (rules.useSeconds || second === 0) &&
    unitSequence(24, rules.step?.hour).includes(hour) &&
    unitSequence(60, rules.step?.minute).includes(minute) &&
    unitSequence(60, rules.step?.second).includes(second) &&
    !isClockOutsideBounds({ hour, minute, second }, rules.min, rules.max) &&
    !isClockDisabled(
      { hour, minute, second },
      {
        hours: rules.disabledHours,
        minutes: rules.disabledMinutes,
        seconds: rules.disabledSeconds,
      },
    )
  )
}

/** Build only branches with a selectable descendant; never mutate the supplied model. */
export function getTimeChoices(
  value: string | undefined,
  rules: TimeConstraints,
): { columns: number[][]; value: string | undefined } {
  const total = parseClock(value) ?? 0
  const desired = [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60]
  const lower = parseClock(rules.min) ?? 0
  const upper = parseClock(rules.max) ?? 86399
  const disabledHours = rules.disabledHours?.() ?? []
  const minuteCache = new Map<number, number[]>()
  const secondCache = new Map<number, number[]>()
  const secondsFor = (hour: number, minute: number) => {
    const key = hour * 60 + minute
    if (!secondCache.has(key)) {
      const disabled = rules.disabledSeconds?.(hour, minute) ?? []
      const base = hour * 3600 + minute * 60
      secondCache.set(
        key,
        unitSequence(rules.useSeconds ? 60 : 1, rules.step?.second).filter(
          (second) => base + second >= lower && base + second <= upper && !disabled.includes(second),
        ),
      )
    }
    return secondCache.get(key)!
  }
  const minutesFor = (hour: number) => {
    if (!minuteCache.has(hour)) {
      const disabled = rules.disabledMinutes?.(hour) ?? []
      minuteCache.set(
        hour,
        unitSequence(60, rules.step?.minute).filter(
          (minute) => !disabled.includes(minute) && secondsFor(hour, minute).length > 0,
        ),
      )
    }
    return minuteCache.get(hour)!
  }
  const hours = unitSequence(24, rules.step?.hour).filter(
    (hour) =>
      !disabledHours.includes(hour) &&
      hour * 3600 <= upper &&
      hour * 3600 + 3599 >= lower &&
      minutesFor(hour).length > 0,
  )
  const nearest = (items: number[], target: number) =>
    items.reduce((best, item) => (Math.abs(item - target) < Math.abs(best - target) ? item : best), items[0])
  if (!hours.length) {
    return { columns: rules.useSeconds ? [[], [], []] : [[], []], value: undefined }
  }
  const hour = nearest(hours, desired[0])
  const minutes = minutesFor(hour)
  const minute = nearest(minutes, desired[1])
  const seconds = secondsFor(hour, minute)
  const second = nearest(seconds, desired[2])
  const parts = rules.useSeconds ? [hour, minute, second] : [hour, minute]
  return {
    columns: rules.useSeconds ? [hours, minutes, seconds] : [hours, minutes],
    value: parts.map((part) => String(part).padStart(2, '0')).join(':'),
  }
}

/** Invalid clock values are never selectable; callbacks always receive 24-hour values. */
export function isClockDisabled(value: ClockParts, rules: ClockDisabledRules = {}) {
  const { hour, minute, second } = value
  return (
    clockSeconds(hour, minute, second) === null ||
    Boolean(rules.hours?.().includes(hour)) ||
    Boolean(rules.minutes?.(hour).includes(minute)) ||
    Boolean(rules.seconds?.(hour, minute).includes(second))
  )
}

/** A coarse column is disabled only when its entire interval is outside the inclusive bounds. */
export function isClockOutsideBounds(value: ClockParts, min?: string, max?: string, unit: keyof ClockParts = 'second') {
  const start = clockSeconds(value.hour, unit === 'hour' ? 0 : value.minute, unit === 'second' ? value.second : 0)
  if (start === null) {
    return true
  }
  const end = start + (unit === 'hour' ? 3599 : unit === 'minute' ? 59 : 0)
  const lower = parseClock(min)
  const upper = parseClock(max)
  if (lower !== null && upper !== null && lower > upper) {
    return true
  }
  return (lower !== null && end < lower) || (upper !== null && start > upper)
}
