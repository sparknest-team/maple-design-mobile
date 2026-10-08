import { describe, expect, it } from 'vitest'
import {
  formatTimeValue,
  fromClockValue,
  getFormattedTimeChoices,
  isFormattedTimeAllowed,
  parseTimeValue,
  toClockValue,
} from '../time-value'

describe('formatted time values', () => {
  it('parses midnight and noon with a strict format and returns formatted values', () => {
    const rules = { use12Hours: true }
    expect(toClockValue('12:00:00 am', rules)).toBe('00:00:00')
    expect(toClockValue('12:00:00 pm', rules)).toBe('12:00:00')
    expect(fromClockValue('13:05:09', rules)).toBe('01:05:09 pm')
    expect(toClockValue('01:05:09 PM', { format: 'hh:mm:ss A' })).toBe('13:05:09')
  })
  it('accepts Date and millisecond timestamps, including zero', () => {
    const date = new Date(2026, 8, 23, 13, 5, 9)
    expect(formatTimeValue(date, { format: 'HH:mm' })).toBe('13:05')
    expect(formatTimeValue(date.getTime(), { use12Hours: true })).toBe('01:05:09 pm')
    expect(parseTimeValue(0)?.valueOf()).toBe(0)
  })
  it('does not normalize or fall back when a string is invalid', () => {
    for (const value of ['25:00:00', '09:60:00', '9:00:00', '2026-09-23', '', undefined]) {
      expect(parseTimeValue(value)).toBeUndefined()
    }
    expect(parseTimeValue(new Date(NaN))).toBeUndefined()
    expect(parseTimeValue(NaN)).toBeUndefined()
  })
  it('uses literal formats and derives second precision', () => {
    const rules = { format: '[Time] HH:mm' }
    expect(toClockValue('Time 13:05', rules)).toBe('13:05:00')
    expect(fromClockValue('13:05:09', rules)).toBe('Time 13:05')
    expect(getFormattedTimeChoices('Time 13:05', rules).columns).toHaveLength(2)
  })
  it('keeps limits and callbacks in 24-hour clock coordinates', () => {
    const rules = {
      format: 'hh:mm A',
      min: '13:00',
      max: '14:00',
      disabledMinutes: (hour?: number) => (hour === 13 ? [30] : []),
    }
    expect(getFormattedTimeChoices('01:30 PM', rules).value).toBe('01:29 PM')
    expect(isFormattedTimeAllowed('01:30 PM', rules)).toBe(false)
    expect(isFormattedTimeAllowed('01:30 AM', rules)).toBe(false)
    expect(isFormattedTimeAllowed('01:29 PM', rules)).toBe(true)
  })
})
