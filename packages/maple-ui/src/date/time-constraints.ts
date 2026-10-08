import type { TimeDisabledRules } from '../time/time-rules'

/** Private renderer predicates; public Date APIs use DateDisabledTime callbacks. */
export type DisabledTime = {
  hours?: (hour: number) => boolean
  minutes?: (minute: number, hour?: number) => boolean
  seconds?: (second: number, hour?: number, minute?: number) => boolean
}
export function dateTimeConstraints(value?: DisabledTime): TimeDisabledRules {
  const disabled = (length: number, predicate?: (value: number) => boolean) =>
    Array.from({ length }, (_, index) => index).filter((index) => predicate?.(index))
  return {
    disabledHours: () => disabled(24, value?.hours),
    disabledMinutes: (hour) => disabled(60, (minute) => Boolean(value?.minutes?.(minute, hour))),
    disabledSeconds: (hour, minute) => disabled(60, (second) => Boolean(value?.seconds?.(second, hour, minute))),
  }
}
