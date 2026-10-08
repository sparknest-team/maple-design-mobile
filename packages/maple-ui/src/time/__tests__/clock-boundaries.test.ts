import { describe, expect, it } from 'vitest'
import { getIsDisableMinute, getIsDisableSecond } from '../picker-utils'

const base = {
  useSeconds: true,
  time: 30,
  format: '24hr',
  ampm: undefined,
  hour: '10',
  minute: 20,
  min: undefined,
  max: undefined,
  disableHour: [],
  disabledHours: undefined,
}

describe('clock bounds integration', () => {
  it('disables seconds before the minimum, not after it', () => {
    expect(getIsDisableSecond({ ...base, min: '10:20:40' })).toBe(true)
    expect(getIsDisableSecond({ ...base, min: '10:20:20' })).toBe(false)
  })
  it('does not apply another hour’s second boundary', () => {
    expect(getIsDisableSecond({ ...base, min: '09:20:40' })).toBe(false)
    expect(getIsDisableSecond({ ...base, max: '11:20:10' })).toBe(false)
  })
  it('keeps minutes with some available seconds', () => {
    expect(getIsDisableMinute({ ...base, time: 20, min: '10:20:40' })).toBe(false)
    expect(getIsDisableMinute({ ...base, time: 19, min: '10:20:40' })).toBe(true)
  })
  it('honors parent callbacks and midnight display conversion', () => {
    expect(getIsDisableSecond({ ...base, disabledMinutes: () => [20] })).toBe(true)
    expect(getIsDisableSecond({ ...base, format: 'ampm', ampm: 'am', hour: '12', disableHour: ['00'] })).toBe(true)
  })
})
