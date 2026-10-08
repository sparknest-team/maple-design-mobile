import { describe, expect, it } from 'vitest'
import { getTimeEventDates } from '../time-events'

describe('time event dates', () => {
  it('uses local time for formatted values and keeps partial ranges', () => {
    const dates = getTimeEventDates(['01:30 PM', undefined], { format: 'hh:mm A' }) as Array<Date | undefined>
    expect(dates[0]?.getHours()).toBe(13)
    expect(dates[0]?.getMinutes()).toBe(30)
    expect(dates[1]).toBeUndefined()
  })
  it('does not manufacture invalid dates for clear or invalid input', () => {
    expect(getTimeEventDates(undefined)).toBeUndefined()
    expect(getTimeEventDates('25:00', { format: 'HH:mm' })).toBeUndefined()
  })
  it('returns a fresh date instead of sharing the input instance', () => {
    const date = new Date(2026, 8, 23, 13, 30)
    expect(getTimeEventDates(date)).toEqual(date)
    expect(getTimeEventDates(date)).not.toBe(date)
  })
})
