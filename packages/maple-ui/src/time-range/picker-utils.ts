import { isOvernight, parseClock } from '../utils/picker-data'

export const parseTimeToSeconds = parseClock
export function isTimeRangeNextDay(start: string | undefined | null, end: string | undefined | null): boolean {
  return isOvernight(parseClock(start), parseClock(end))
}

/**
 * Sort range to start <= end.
 * When `showNextDay` is true, keep original order (overnight ranges).
 */
export function sortTimeRangeValue(value: string[], showNextDay = false): string[] {
  if (showNextDay || value.length !== 2) {
    return [...value]
  }
  const [start, end] = value
  if (!start || !end || !isTimeRangeNextDay(start, end)) {
    return [...value]
  }
  return [end, start]
}
