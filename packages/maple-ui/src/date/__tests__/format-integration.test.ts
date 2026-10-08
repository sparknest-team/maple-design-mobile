import { describe, expect, it } from 'vitest'
import { dateTimeFormat, joinDateTimeParts } from '../datetime'

describe('date format integration', () => {
  it('retains explicit minute and second precision', () => {
    expect(dateTimeFormat(false)).toBe('YYYY-MM-DD HH:mm')
    expect(dateTimeFormat(true)).toBe('YYYY-MM-DD HH:mm:ss')
  })
  it('keeps wheel output aligned with each precision', () => {
    const parts = ['2026', '09', '30', '13', '05', '09']
    expect(joinDateTimeParts(parts, false)).toBe('2026-09-30 13:05')
    expect(joinDateTimeParts(parts, true)).toBe('2026-09-30 13:05:09')
  })
})
