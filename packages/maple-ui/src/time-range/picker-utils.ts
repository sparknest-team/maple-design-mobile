import { toNumber } from '@maplejs/maple-shared'

/** Parse `HH:mm` / `HH:mm:ss` into total seconds. Returns null if invalid. */
export function parseTimeToSeconds(time: string | undefined | null): number | null {
  if (!time || typeof time !== 'string') {
    return null
  }
  const parts = time.split(':')
  if (parts.length < 2 || parts.length > 3) {
    return null
  }
  const hour = toNumber(parts[0])
  const minute = toNumber(parts[1])
  const second = parts.length === 3 ? toNumber(parts[2]) : 0
  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    Number.isNaN(second) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null
  }
  return hour * 3600 + minute * 60 + second
}

/** True when both sides are valid and end is earlier than start (overnight). */
export function isTimeRangeNextDay(start: string | undefined | null, end: string | undefined | null): boolean {
  const startSeconds = parseTimeToSeconds(start)
  const endSeconds = parseTimeToSeconds(end)
  if (startSeconds === null || endSeconds === null) {
    return false
  }
  return endSeconds < startSeconds
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
