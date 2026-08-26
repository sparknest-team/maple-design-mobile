import { toNumber } from '@maplejs/maple-shared'
import dayjs from 'dayjs/esm/index.js'
import type { PickerColumnOption } from '../picker/props'
import type { DisabledTime } from '../time-picker/props'
import { padStart } from '../utils/shared'

export function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

export function dateTimeFormat(useSeconds: boolean) {
  return useSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm'
}

export function defaultDateTime(useSeconds = false) {
  return dayjs().format(dateTimeFormat(useSeconds))
}

export function defaultDate(type: 'year' | 'month' | 'date' = 'date') {
  const now = dayjs()
  if (type === 'year') {
    return now.format('YYYY')
  }
  if (type === 'month') {
    return now.format('YYYY-MM')
  }
  return now.format('YYYY-MM-DD')
}

export function resolveYearRange(min?: string, max?: string) {
  const nowYear = dayjs().year()
  const minYear = min ? dayjs(min).year() : nowYear - 50
  const maxYear = max ? dayjs(max).year() : nowYear + 50
  return {
    minYear: Number.isFinite(minYear) ? minYear : nowYear - 50,
    maxYear: Number.isFinite(maxYear) ? maxYear : nowYear + 50,
  }
}

export function parseDateParts(value: string, type: 'year' | 'month' | 'date') {
  const date = dayjs(value)
  const valid = date.isValid() ? date : dayjs()
  if (type === 'year') {
    return [valid.format('YYYY')]
  }
  if (type === 'month') {
    return [valid.format('YYYY'), valid.format('MM')]
  }
  return [valid.format('YYYY'), valid.format('MM'), valid.format('DD')]
}

export function joinDateParts(values: (string | number)[], type: 'year' | 'month' | 'date') {
  const year = `${toNumber(values[0])}`
  if (type === 'year') {
    return year
  }
  const month = pad(toNumber(values[1] ?? 1))
  if (type === 'month') {
    return `${year}-${month}`
  }
  const maxDay = dayjs(`${year}-${month}-01`).daysInMonth()
  const day = pad(Math.min(toNumber(values[2] ?? 1), maxDay))
  return `${year}-${month}-${day}`
}

export function parseDateTimeParts(value: string, useSeconds: boolean) {
  const date = dayjs(value)
  const valid = date.isValid() ? date : dayjs()
  const parts = [valid.format('YYYY'), valid.format('MM'), valid.format('DD'), valid.format('HH'), valid.format('mm')]
  if (useSeconds) {
    parts.push(valid.format('ss'))
  }
  return parts
}

export function joinDateTimeParts(values: (string | number)[], useSeconds: boolean) {
  const year = `${toNumber(values[0])}`
  const month = pad(toNumber(values[1] ?? 1))
  const maxDay = dayjs(`${year}-${month}-01`).daysInMonth()
  const day = pad(Math.min(toNumber(values[2] ?? 1), maxDay))
  const hour = pad(toNumber(values[3] ?? 0))
  const minute = pad(toNumber(values[4] ?? 0))
  if (useSeconds) {
    return `${year}-${month}-${day} ${hour}:${minute}:${pad(toNumber(values[5] ?? 0))}`
  }
  return `${year}-${month}-${day} ${hour}:${minute}`
}

export function splitDateTimeDisplay(value: string, useSeconds: boolean) {
  const date = dayjs(value)
  const valid = date.isValid() ? date : dayjs()
  return {
    date: valid.format('YYYY-MM-DD'),
    time: valid.format(useSeconds ? 'HH:mm:ss' : 'HH:mm'),
  }
}

export function combineDateAndTime(date: string, time: string, useSeconds: boolean) {
  const parsedDate = dayjs(date)
  const validDate = parsedDate.isValid() ? parsedDate : dayjs()
  const [hour = '0', minute = '0', second = '0'] = time.split(':')
  let next = validDate.hour(toNumber(hour)).minute(toNumber(minute))
  if (useSeconds) {
    next = next.second(toNumber(second))
  } else {
    next = next.second(0)
  }
  return next.format(dateTimeFormat(useSeconds))
}

export function toDateOnlyModel(value: string | string[] | undefined): string | string[] | undefined {
  if (value == null) {
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => splitDateTimeDisplay(item, false).date)
  }
  return splitDateTimeDisplay(value, false).date
}

type BuildColumnsOptions = {
  type?: 'year' | 'month' | 'date'
  showTime?: boolean
  useSeconds?: boolean
  min?: string
  max?: string
  disabledDate?: (val: string) => boolean
  disabledTime?: DisabledTime
  current: string
}

function buildTimeColumns(useSeconds: boolean, disabledTime?: DisabledTime): PickerColumnOption[][] {
  const hours: PickerColumnOption[] = Array.from({ length: 24 }, (_, index) => {
    if (disabledTime?.hours && disabledTime.hours(index)) {
      return null
    }
    const text = pad(index)
    return { text, value: text }
  }).filter(Boolean) as PickerColumnOption[]

  const minutes: PickerColumnOption[] = Array.from({ length: 60 }, (_, index) => {
    if (disabledTime?.minutes && disabledTime.minutes(index)) {
      return null
    }
    const text = pad(index)
    return { text, value: text }
  }).filter(Boolean) as PickerColumnOption[]

  if (!useSeconds) {
    return [hours, minutes]
  }

  const seconds: PickerColumnOption[] = Array.from({ length: 60 }, (_, index) => {
    if (disabledTime?.seconds && disabledTime.seconds(index)) {
      return null
    }
    const text = pad(index)
    return { text, value: text }
  }).filter(Boolean) as PickerColumnOption[]

  return [hours, minutes, seconds]
}

export function buildTimeOnlyColumns(useSeconds: boolean, disabledTime?: DisabledTime) {
  return buildTimeColumns(useSeconds, disabledTime)
}

export type DateTimePresentation = 'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'

/** showTime 时：calendar → calendarClock；非 showTime：calendarClock/calendarPicker → calendar */
export function resolveDateTimePresentation(
  presentation: DateTimePresentation | string,
  showTime: boolean,
): DateTimePresentation {
  if (!showTime) {
    return presentation === 'picker' ? 'picker' : 'calendar'
  }
  if (presentation === 'picker') {
    return 'picker'
  }
  if (presentation === 'calendarPicker') {
    return 'calendarPicker'
  }
  return 'calendarClock'
}

export function isCalendarTimePresentation(presentation: DateTimePresentation) {
  return presentation === 'calendarClock' || presentation === 'calendarPicker'
}

export function parseTimeParts(time: string, useSeconds: boolean) {
  const [hour = '00', minute = '00', second = '00'] = time.split(':')
  const parts = [pad(toNumber(hour)), pad(toNumber(minute))]
  if (useSeconds) {
    parts.push(pad(toNumber(second)))
  }
  return parts
}

export function joinTimeParts(values: (string | number)[], useSeconds: boolean) {
  const hour = pad(toNumber(values[0] ?? 0))
  const minute = pad(toNumber(values[1] ?? 0))
  if (useSeconds) {
    return `${hour}:${minute}:${pad(toNumber(values[2] ?? 0))}`
  }
  return `${hour}:${minute}`
}

export function buildDateOrDateTimeColumns(options: BuildColumnsOptions): PickerColumnOption[][] {
  const { type = 'date', showTime = false, useSeconds = false, min, max, disabledDate, disabledTime, current } = options

  if (showTime) {
    const parts = parseDateTimeParts(current, useSeconds)
    const year = toNumber(parts[0])
    const month = toNumber(parts[1])
    const { minYear, maxYear } = resolveYearRange(min, max)

    const years: PickerColumnOption[] = []
    for (let y = minYear; y <= maxYear; y++) {
      years.push({ text: `${y}`, value: `${y}` })
    }

    const months: PickerColumnOption[] = Array.from({ length: 12 }, (_, index) => {
      const monthValue = pad(index + 1)
      return { text: monthValue, value: monthValue }
    })

    const daysInMonth = dayjs(`${year}-${pad(month)}-01`).daysInMonth()
    const days: PickerColumnOption[] = Array.from({ length: daysInMonth }, (_, index) => {
      const dayValue = pad(index + 1)
      const dateValue = `${year}-${pad(month)}-${dayValue}`
      if (disabledDate && disabledDate(dateValue)) {
        return null
      }
      if (min && dayjs(dateValue).isBefore(dayjs(min), 'day')) {
        return null
      }
      if (max && dayjs(dateValue).isAfter(dayjs(max), 'day')) {
        return null
      }
      return { text: dayValue, value: dayValue }
    }).filter(Boolean) as PickerColumnOption[]

    return [years, months, days, ...buildTimeColumns(useSeconds, disabledTime)]
  }

  const parts = parseDateParts(current, type)
  const year = toNumber(parts[0])
  const month = toNumber(parts[1] ?? 1)
  const { minYear, maxYear } = resolveYearRange(min, max)

  const years: PickerColumnOption[] = []
  for (let y = minYear; y <= maxYear; y++) {
    const text = `${y}`
    if (type === 'year' && disabledDate && disabledDate(text)) {
      continue
    }
    years.push({ text, value: text })
  }

  if (type === 'year') {
    return [years]
  }

  const months: PickerColumnOption[] = Array.from({ length: 12 }, (_, index) => {
    const monthValue = pad(index + 1)
    const dateValue = `${year}-${monthValue}`
    if (disabledDate && type === 'month' && disabledDate(dateValue)) {
      return null
    }
    if (min && dayjs(dateValue).isBefore(dayjs(min), 'month')) {
      return null
    }
    if (max && dayjs(dateValue).isAfter(dayjs(max), 'month')) {
      return null
    }
    return { text: monthValue, value: monthValue }
  }).filter(Boolean) as PickerColumnOption[]

  if (type === 'month') {
    return [years, months]
  }

  const daysInMonth = dayjs(`${year}-${pad(month)}-01`).daysInMonth()
  const days: PickerColumnOption[] = Array.from({ length: daysInMonth }, (_, index) => {
    const dayValue = pad(index + 1)
    const dateValue = `${year}-${pad(month)}-${dayValue}`
    if (disabledDate && disabledDate(dateValue)) {
      return null
    }
    if (min && dayjs(dateValue).isBefore(dayjs(min), 'day')) {
      return null
    }
    if (max && dayjs(dateValue).isAfter(dayjs(max), 'day')) {
      return null
    }
    return { text: dayValue, value: dayValue }
  }).filter(Boolean) as PickerColumnOption[]

  return [years, months, days]
}
