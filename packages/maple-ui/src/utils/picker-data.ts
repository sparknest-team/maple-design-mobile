/** Calendar/clock arithmetic has no timezone or rendering dependency. Month is 1-based. */
export function calendarMonthDays(year: number, month: number) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return NaN
  }
  if (month === 2) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31
}
export function clockSeconds(hour: number, minute: number, second = 0): number | null {
  if (
    ![hour, minute, second].every(Number.isInteger) ||
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
export function parseClock(time: string | undefined | null) {
  if (typeof time !== 'string' || !/^\d{1,2}:\d{1,2}(?::\d{1,2})?$/.test(time)) {
    return null
  }
  const [hour, minute, second = 0] = time.split(':').map(Number)
  return clockSeconds(hour, minute, second)
}
export function isOvernight(start: number | null, end: number | null) {
  return start !== null && end !== null && end < start
}
export function clockHour(hour: number, period?: 'am' | 'pm') {
  return period ? (hour % 12) + (period === 'pm' ? 12 : 0) : hour
}
export function unitSequence(length: number, step = 1): number[] {
  const increment = Number.isFinite(step) && step > 0 ? Math.max(1, Math.floor(step)) : 1
  return Array.from({ length: Math.ceil(length / increment) }, (_, index) => index * increment)
}
