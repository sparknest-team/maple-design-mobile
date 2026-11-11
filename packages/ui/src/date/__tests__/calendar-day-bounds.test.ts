import { expect, it } from 'vitest'
import { isCalendarDateDisabled, isDateDisabled } from '../date-rules'
import { parseDateValue } from '../date-value'

for (const timeZone of ['America/New_York', 'Asia/Shanghai', 'UTC', 'Australia/Lord_Howe']) {
  for (const valueFormat of ['timestamp', 'Date', 'YYYY-MM-DD HH:mm:ss']) {
    it(`${timeZone}/${valueFormat}: datetime string bounds leave valid calendar days selectable`, () => {
      const options = { timeZone, valueFormat, showTime: true, min: '2026-03-08 10:00:00', max: '2026-03-10 12:00:00' }
      const date = (text: string) => parseDateValue(text, { timeZone, valueFormat: 'YYYY-MM-DD HH:mm:ss' })!.toDate()
      expect(isCalendarDateDisabled(date('2026-03-08 00:00:00'), options)).toBe(false)
      expect(isCalendarDateDisabled(date('2026-03-09 00:00:00'), options)).toBe(false)
      expect(isCalendarDateDisabled(date('2026-03-10 00:00:00'), options)).toBe(false)
      expect(isCalendarDateDisabled(date('2026-03-07 00:00:00'), options)).toBe(true)
      expect(isCalendarDateDisabled(date('2026-03-11 00:00:00'), options)).toBe(true)
      // Day cells can be enabled while the exact time still remains outside the bound.
      expect(isDateDisabled(date('2026-03-08 09:00:00'), options)).toBe(true)
      expect(isDateDisabled(date('2026-03-08 10:00:00'), options)).toBe(false)
    })
  }
}
it('rejects invalid original datetime bounds instead of accepting them as date-only strings', () => {
  const options = { showTime: true, valueFormat: 'timestamp', timeZone: 'America/New_York' }
  const value = new Date('2026-03-09T15:00:00Z')
  expect(isCalendarDateDisabled(value, { ...options, min: '2026-03-08' })).toBe(true)
  expect(isCalendarDateDisabled(value, { ...options, max: 'invalid' })).toBe(true)
  expect(isCalendarDateDisabled(value, { ...options, min: '2026-03-08 02:30:00' })).toBe(true)
})
it('retains endpoint-specific disabled-date callbacks', () => {
  const value = new Date('2026-03-09T15:00:00Z')
  const options = { disabledDate: (_date: Date, side: 'start' | 'end') => side === 'end' }
  expect(isCalendarDateDisabled(value, options, 'start')).toBe(false)
  expect(isCalendarDateDisabled(value, options, 'end')).toBe(true)
})
