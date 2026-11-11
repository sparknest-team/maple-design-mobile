import { describe, expect, it } from 'vitest'
import { clockHour, isOvernight, parseClock, unitSequence } from '../../utils/picker-data'
import { isClockDisabled, isClockOutsideBounds } from '../time-rules'

describe('independent clock rules', () => {
  it.each(['24:00', '12:60', '10:20:60', '', 'abc', '12:30 trailing'])('rejects invalid clock %s', (value) => {
    expect(parseClock(value)).toBeNull()
  })
  it('parses midnight, partial padding and seconds', () => {
    expect(parseClock('0:0')).toBe(0)
    expect(parseClock('23:59:59')).toBe(86399)
  })
  it('normalizes noon and midnight without changing 24-hour values', () => {
    expect(clockHour(12, 'am')).toBe(0)
    expect(clockHour(12, 'pm')).toBe(12)
    expect(clockHour(1, 'pm')).toBe(13)
    expect(clockHour(23)).toBe(23)
  })
  it('handles invalid steps and non-divisor steps', () => {
    for (const step of [0, -1, NaN, Infinity]) {
      expect(unitSequence(3, step)).toEqual([0, 1, 2])
    }
    expect(unitSequence(12, 5)).toEqual([0, 5, 10])
    expect(unitSequence(3, 1.9)).toEqual([0, 1, 2])
  })
  it('compares clocks, not dates, for overnight ranges', () => {
    expect(isOvernight(parseClock('23:30'), parseClock('01:00'))).toBe(true)
    expect(isOvernight(parseClock('00:00'), parseClock('00:00'))).toBe(false)
    expect(isOvernight(null, 0)).toBe(false)
  })
  it('passes actual hours and minutes to disabled callbacks', () => {
    expect(
      isClockDisabled(
        { hour: 13, minute: 20, second: 30 },
        {
          seconds: (hour, minute) => (hour === 13 && minute === 20 ? [30] : []),
        },
      ),
    ).toBe(true)
    expect(isClockDisabled({ hour: 25, minute: 0, second: 0 })).toBe(true)
    expect(isClockDisabled({ hour: 0, minute: 0, second: 0 })).toBe(false)
  })
  it('keeps inclusive bounds and does not leak seconds across hours', () => {
    const value = { hour: 10, minute: 20, second: 30 }
    expect(isClockOutsideBounds(value, '10:20:30', '10:20:30')).toBe(false)
    expect(isClockOutsideBounds(value, '10:20:31')).toBe(true)
    expect(isClockOutsideBounds(value, undefined, '10:20:29')).toBe(true)
    expect(isClockOutsideBounds(value, '09:20:50', '11:20:10')).toBe(false)
  })
  it('keeps partially available hours and minutes selectable', () => {
    const value = { hour: 10, minute: 20, second: 0 }
    expect(isClockOutsideBounds(value, '10:20:30', undefined, 'minute')).toBe(false)
    expect(isClockOutsideBounds(value, undefined, '10:20:00', 'minute')).toBe(false)
    expect(isClockOutsideBounds(value, '10:59:59', undefined, 'hour')).toBe(false)
    expect(isClockOutsideBounds(value, '11:00', undefined, 'hour')).toBe(true)
    expect(isClockOutsideBounds(value, 'invalid', 'invalid')).toBe(false)
  })
})
