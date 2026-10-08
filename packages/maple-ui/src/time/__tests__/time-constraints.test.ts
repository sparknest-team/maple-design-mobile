import { describe, expect, it, vi } from 'vitest'
import { getTimeChoices, isClockOutsideBounds, isTimeAllowed } from '../time-rules'

describe('canonical time constraints', () => {
  it('includes exact bounds and cascades into valid seconds', () => {
    const rules = { min: '10:30:38', max: '10:31:02', useSeconds: true }
    expect(getTimeChoices('00:00:00', rules)).toEqual({
      columns: [[10], [30, 31], Array.from({ length: 22 }, (_, i) => i + 38)],
      value: '10:30:38',
    })
    expect(getTimeChoices('10:31:59', rules).value).toBe('10:31:02')
    expect(isTimeAllowed('10:30:38', rules)).toBe(true)
    expect(isTimeAllowed('10:31:03', rules)).toBe(false)
  })
  it('passes selected hours and minutes to canonical callbacks', () => {
    const minutes = vi.fn((hour) => (hour === 13 ? [20] : []))
    const seconds = vi.fn((hour, minute) => (hour === 13 && minute === 21 ? [30] : []))
    const rules = {
      min: '13:00',
      max: '13:59:59',
      useSeconds: true,
      disabledMinutes: minutes,
      disabledSeconds: seconds,
    }
    expect(getTimeChoices('13:20:30', rules).value).toBe('13:19:30')
    expect(isTimeAllowed('13:21:30', rules)).toBe(false)
    expect(minutes).toHaveBeenCalledWith(13)
    expect(seconds).toHaveBeenCalledWith(13, 21)
  })
  it('excludes parent candidates without any selectable descendants', () => {
    const rules = { disabledMinutes: (hour?: number) => (hour === 0 ? Array.from({ length: 60 }, (_, i) => i) : []) }
    const result = getTimeChoices('00:00', rules)
    expect(result.columns[0]).not.toContain(0)
    expect(result.value).toBe('01:00')
  })
  it('does not submit an unavailable second when seconds are hidden', () => {
    const rules = { min: '10:20:01', max: '10:21:00' }
    expect(getTimeChoices('10:20', rules).value).toBe('10:21')
    expect(isTimeAllowed('10:20', rules)).toBe(false)
    expect(isTimeAllowed('10:20:30', rules)).toBe(false)
    expect(getTimeChoices('10:20', { ...rules, disabledSeconds: () => [0] }).value).toBeUndefined()
  })
  it('handles no candidates and reversed same-day bounds', () => {
    expect(isClockOutsideBounds({ hour: 10, minute: 30, second: 0 }, '10:40', '10:20', 'hour')).toBe(true)
    expect(getTimeChoices('10:00', { min: '11:00', max: '10:00' }).value).toBeUndefined()
    const rules = { disabledHours: () => Array.from({ length: 24 }, (_, i) => i) }
    expect(getTimeChoices(undefined, rules)).toEqual({ columns: [[], []], value: undefined })
    expect(isTimeAllowed('12:00', rules)).toBe(false)
  })
  it('does not mutate the input or consider invalid input selectable', () => {
    expect(isTimeAllowed(undefined, {})).toBe(false)
    expect(isTimeAllowed('24:00', {})).toBe(false)
    const value = '25:90'
    expect(getTimeChoices(value, {}).value).toBe('00:00')
    expect(value).toBe('25:90')
  })
})
