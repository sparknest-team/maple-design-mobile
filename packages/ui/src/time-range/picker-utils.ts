import { isOvernight, parseClock } from '../utils/picker-data'

export const parseTimeToSeconds = parseClock
export function isTimeRangeNextDay(start: string | undefined | null, end: string | undefined | null): boolean {
  return isOvernight(parseClock(start), parseClock(end))
}
