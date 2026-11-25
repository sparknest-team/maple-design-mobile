import dayjs from 'dayjs'

/** A calendar cell is available when its local day, month, or year intersects the allowed interval. */
export function withinCalendarBounds(value: string, unit: 'day' | 'month' | 'year', min?: string, max?: string) {
  if (!min && !max) {
    return true
  }
  const cell = dayjs(value)
  return (
    (!min || cell.endOf(unit).valueOf() >= dayjs(min).valueOf()) &&
    (!max || cell.startOf(unit).valueOf() <= dayjs(max).valueOf())
  )
}
