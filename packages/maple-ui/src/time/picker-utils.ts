import { toNumber } from '@maplejs/maple-shared'
import { clockHour } from '../utils/picker-data'
import type { AmPm } from './picker-props'
import { isTimeAllowed, type TimeConstraints } from './time-rules'

type DisableProps = TimeConstraints & {
  useSeconds?: boolean
  time: number
  format: string
  ampm: AmPm | undefined
  hour: string
  minute: number
  max: string | undefined
  min: string | undefined
  disableHour: Array<string>
}

export const convertHour = (format: string, ampm: AmPm | undefined, hour: string) => {
  const hourNum = clockHour(toNumber(hour), format === '24hr' ? undefined : ampm)
  return { hourStr: String(hourNum).padStart(2, '0'), hourNum }
}

export const getNumberTime = (time: string) => {
  const [hour, minute, second] = time.split(':')

  return {
    hour: toNumber(hour),
    minute: toNumber(minute),
    second: toNumber(second),
  }
}

/** Display hours are converted before applying the common 24-hour rules. */
function isDisabledPart(values: Omit<DisableProps, 'minute'> & { minute?: number }, unit: 'minute' | 'second') {
  const { hourNum } = convertHour(values.format, values.ampm, values.hour)
  const minute = unit === 'minute' ? values.time : (values.minute ?? 0)
  const second = unit === 'second' ? values.time : 0
  if (values.disableHour.some((hour) => Number(hour) === hourNum)) {
    return true
  }
  const seconds = unit === 'second' ? [second] : Array.from({ length: values.useSeconds ? 60 : 1 }, (_, value) => value)
  return !seconds.some((candidate) =>
    isTimeAllowed(`${hourNum}:${minute}:${candidate}`, {
      ...values,
      useSeconds: unit === 'second' || values.useSeconds,
    }),
  )
}

export const getIsDisableMinute = (values: Omit<DisableProps, 'minute'>): boolean => isDisabledPart(values, 'minute')

export const getIsDisableSecond = (values: DisableProps): boolean => isDisabledPart(values, 'second')
