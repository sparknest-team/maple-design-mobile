import dayjs, { type Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const validZones = new Map<string, boolean>()
const offsetDays = new Map<string, Set<number>>()
const civilDates = new Map<string, Dayjs | undefined>()
function cache<K, V>(map: Map<K, V>, key: K, value: V, limit = 512) {
  if (map.size >= limit) {
    map.delete(map.keys().next().value!)
  }
  map.set(key, value)
  return value
}
export function validTimeZone(zone: string) {
  if (validZones.has(zone)) {
    return validZones.get(zone)!
  }
  try {
    new Intl.DateTimeFormat('en', { timeZone: zone })
    return cache(validZones, zone, true, 64)
  } catch {
    return cache(validZones, zone, false, 64)
  }
}
/** Strict civil time to instant. Gaps fail closed; folds choose the earliest instant. */
export function zonedCivilDate(text: string, format: string, locale: string, zone: string): Dayjs | undefined {
  if (!validTimeZone(zone)) {
    return undefined
  }
  const key = JSON.stringify([zone, format, locale, text])
  if (civilDates.has(key)) {
    return civilDates.get(key)
  }
  const parse = dayjs.utc as unknown as (text: string, format: string, locale: string, strict: boolean) => Dayjs
  const civil = parse(text, format, locale, true)
  if (!civil.isValid()) {
    return undefined
  }
  const stamp = civil.valueOf()
  const signature = civil.format('YYYY-MM-DD HH:mm:ss.SSS')
  const dayKey = `${zone}|${Math.floor(stamp / 86400000)}`
  const offsets =
    offsetDays.get(dayKey) ??
    cache(
      offsetDays,
      dayKey,
      new Set(
        [-36, -12, 0, 12, 36].map((hour) =>
          dayjs(stamp + hour * 3600000)
            .tz(zone)
            .utcOffset(),
        ),
      ),
      64,
    )
  const candidates = [...offsets]
    .map((offset) =>
      dayjs(stamp - offset * 60000)
        .tz(zone)
        .locale(locale),
    )
    .filter((date) => date.format('YYYY-MM-DD HH:mm:ss.SSS') === signature)
    .sort((a, b) => a.valueOf() - b.valueOf())
  return cache(civilDates, key, candidates[0])
}
