import {
  formatTimeValue,
  isFormattedTimeAllowed,
  toClockValue,
  type FormattedTimeRules,
  type TimeValue,
} from './time-value'

export type TimeCommitRules = FormattedTimeRules & { showNextDay?: boolean }
export type TimeCommitInput = null | TimeValue | Array<TimeValue | null | undefined> | undefined

/** One commit boundary for typed fields, popup fields and standalone panels. */
export function getTimeCommitValue(
  value: TimeCommitInput,
  rules: TimeCommitRules,
  range = false,
): string | string[] | undefined {
  if (range) {
    if (!Array.isArray(value) || value.length !== 2 || value[0] === undefined || value[1] === undefined) {
      return undefined
    }
    if (!value.every((part) => isFormattedTimeAllowed(part, rules))) {
      return undefined
    }
    if (!rules.showNextDay && toClockValue(value[0], rules)! > toClockValue(value[1], rules)!) {
      return undefined
    }
    return value.map((part) => formatTimeValue(part, rules)!)
  }
  return !Array.isArray(value) && isFormattedTimeAllowed(value, rules) ? formatTimeValue(value, rules) : undefined
}
