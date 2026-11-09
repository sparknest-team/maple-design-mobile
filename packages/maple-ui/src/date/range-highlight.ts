import dayjs from 'dayjs'

/** Empty endpoints must not be parsed as today when drawing a partial range. */
export function isRangeHighlighted(value: string, endpoints: string[], unit: 'day' | 'month' | 'year') {
  const bounds = endpoints
    .filter(Boolean)
    .map((part) => dayjs(part))
    .filter((part) => part.isValid())
    .map((part) => part.startOf(unit).valueOf())
    .sort((a, b) => a - b)
  const current = dayjs(value).startOf(unit).valueOf()
  return bounds.length > 0 && current >= bounds[0] && current <= bounds[bounds.length - 1]
}
