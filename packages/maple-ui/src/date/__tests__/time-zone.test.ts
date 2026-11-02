import { describe, expect, it } from 'vitest'
import { fromCalendarValue, toCalendarValue } from '../calendar-value'
import { isDateDisabled } from '../date-rules'
import { dateTimeDisabledRules } from '../date-time-rules'
import { dateEventPayload, formatDateValue, outputDateValue, parseDateText, parseDateValue } from '../date-value'

describe('explicit calendar time zone', () => {
  const options = { timeZone: 'America/New_York', showTime: true, valueFormat: 'timestamp' }
  it('projects instants without changing Date/timestamp values', () => {
    const instant = Date.parse('2026-11-01T03:30:00Z')
    expect(formatDateValue(instant, options)).toBe('2026-10-31 23:30:00')
    expect(toCalendarValue(instant, options)).toBe('2026-10-31 23:30:00')
    expect(fromCalendarValue('2026-10-31 23:30:00', options)).toBe(instant)
    expect(outputDateValue(new Date(instant), { ...options, valueFormat: 'Date' })).toEqual(new Date(instant))
    expect(dateEventPayload(instant, options).dates).toEqual(new Date(instant))
  })
  it('rejects DST gaps and chooses the earliest fold instant consistently', () => {
    expect(fromCalendarValue('2026-03-08 02:30:00', options)).toBeUndefined()
    expect(fromCalendarValue('2026-11-01 01:30:00', options)).toBe(Date.parse('2026-11-01T05:30:00Z'))
    expect(parseDateText('2026-03-08 02:30:00', options)).toBeUndefined()
  })
  it('applies wall time bounds and passes actual instants to rules', () => {
    const rules = { ...options, min: Date.parse('2026-03-08T07:30:00Z'), max: Date.parse('2026-03-08T09:00:00Z') }
    expect(isDateDisabled(Date.parse('2026-03-08T07:29:00Z'), rules)).toBe(true)
    expect(isDateDisabled(Date.parse('2026-03-08T07:30:00Z'), rules)).toBe(false)
    const time = dateTimeDisabledRules(new Date('2026-03-08T12:00:00Z'), rules)
    expect(time.disabledHours?.()).toContain(2)
    expect(time.disabledHours?.()).not.toContain(3)
    expect(time.disabledMinutes?.(3)).toContain(29)
    expect(time.disabledMinutes?.(3)).not.toContain(30)
  })
  it('keeps strings civil, validates zones and supports independent instances', () => {
    expect(parseDateValue('2026-11-01', { timeZone: 'Asia/Shanghai' })?.toISOString()).toBe('2026-10-31T16:00:00.000Z')
    expect(parseDateValue('2026-11-01', { timeZone: 'UTC' })?.toISOString()).toBe('2026-11-01T00:00:00.000Z')
    expect(parseDateValue('2026-11-01', { timeZone: 'Invalid/Zone' })).toBeUndefined()
    expect(isDateDisabled('2026-11-01', { timeZone: 'Invalid/Zone' })).toBe(true)
  })
})
