import { describe, expect, it } from 'vitest'
import { scopeDateOptions } from '../date-locale'
import { formatDateValue, outputDateValue, parseDateText } from '../date-value'

describe('strict date display text', () => {
  it('parses localized cross-year weeks using the instance week start', () => {
    const monday = scopeDateOptions({ type: 'week' as const }, 'zh-CN', 1)
    const sunday = scopeDateOptions({ type: 'week' as const }, 'zh-CN', 0)
    expect(parseDateText('2020-53周', monday)?.format('YYYY-MM-DD')).toBe('2020-12-28')
    expect(parseDateText('2021-1周', sunday)?.format('YYYY-MM-DD')).toBe('2021-01-03')
    expect(parseDateText('2021-1周', monday)?.format('YYYY-MM-DD')).toBe('2021-01-04')
  })
  it('validates English ordinal suffixes and nonexistent week numbers', () => {
    const options = scopeDateOptions({ type: 'week' as const }, 'en-US', 0)
    expect(parseDateText('2025-1st', options)?.format('YYYY-MM-DD')).toBe('2024-12-29')
    expect(parseDateText('2025-2nd', options)?.format('YYYY-MM-DD')).toBe('2025-01-05')
    for (const text of ['2025-0th', '2025-54th', '2025-1th', '2025-01st', '2025-53rd', ' 2025-1st']) {
      expect(parseDateText(text, options)).toBeUndefined()
    }
  })
  it('round-trips every week start across year boundaries and UI languages', () => {
    for (const language of ['zh-CN', 'en-US']) {
      for (const weekStart of [0, 1, 2, 6]) {
        const options = scopeDateOptions({ type: 'week' as const }, language, weekStart)
        for (const value of ['2020-12-28', '2021-01-03', '2021-01-04', '2025-12-31']) {
          const text = formatDateValue(value, options)
          const parsed = parseDateText(text, options)
          expect(parsed).toBeDefined()
          expect(formatDateValue(outputDateValue(parsed!.toDate(), options), options)).toBe(text)
          expect(parsed!.day()).toBe(weekStart)
        }
      }
    }
  })
  it('keeps native strict quarter parsing and its month model protocol', () => {
    const options = scopeDateOptions({ type: 'quarter' as const }, 'zh-CN', 1)
    const parsed = parseDateText('2025-Q2', options)
    expect(parsed?.format('YYYY-MM-DD')).toBe('2025-04-01')
    expect(outputDateValue(parsed!.toDate(), options)).toBe('2025-04')
    for (const text of ['2025-Q0', '2025-Q5', '2025-Q02', '2025-q2']) {
      expect(parseDateText(text, options)).toBeUndefined()
    }
  })
  it('still accepts custom ordinary date tokens and rejects invalid dates', () => {
    const options = scopeDateOptions({ type: 'week' as const, format: 'DD/MM/YYYY' }, 'en-US', 1)
    expect(parseDateText('15/01/2025', options)?.format('YYYY-MM-DD')).toBe('2025-01-15')
    expect(parseDateText('31/02/2025', options)).toBeUndefined()
  })
})
