import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { dateLocaleName, scopeDateOptions, scopedDate } from '../date-locale'
import { formatDateValue, outputDateValue, parseDateText, parseDateValue } from '../date-value'

describe('date locale scope isolation', () => {
  it('keeps host defaults and base locale objects unchanged', () => {
    const before = dayjs.locale()
    const base = dayjs.Ls['zh-cn']
    const weekStart = base.weekStart
    const sunday = scopeDateOptions({ type: 'week' as const }, 'zh-CN', 0)
    const monday = scopeDateOptions({ type: 'week' as const }, 'zh-CN', 1)
    expect(dateLocaleName(sunday)).not.toBe(dateLocaleName(monday))
    expect(formatDateValue('2021-01-03', sunday)).toBe('2021-1周')
    expect(formatDateValue('2021-01-03', monday)).toBe('2020-53周')
    expect(formatDateValue('2021-01-03', sunday)).toBe('2021-1周')
    expect(dayjs.locale()).toBe(before)
    expect(dayjs.Ls['zh-cn']).toBe(base)
    expect(base.weekStart).toBe(weekStart)
  })
  it('maps en-US without replacing host English settings', () => {
    const base = dayjs.Ls.en
    const options = scopeDateOptions({ type: 'date' as const, format: 'MMMM D, YYYY' }, 'en-US', 1)
    expect(formatDateValue('2025-01-15', options)).toBe('January 15, 2025')
    expect(dayjs.Ls.en).toBe(base)
    expect(scopedDate(new Date(2025, 0, 15), options).locale()).toBe(dateLocaleName(options))
  })
  it('parses localized months using the same scope as display', () => {
    const options = scopeDateOptions({ format: 'YYYY MMMM DD' }, 'zh-CN', 1)
    expect(parseDateText('2025 一月 15', options)?.format('YYYY-MM-DD')).toBe('2025-01-15')
    expect(parseDateText('2025 February 15', options)).toBeUndefined()
  })
  it('keeps model month names stable across UI languages', () => {
    const zh = scopeDateOptions({ valueFormat: 'YYYY MMMM DD', format: 'MMMM' }, 'zh-CN', 1)
    const en = scopeDateOptions({ valueFormat: 'YYYY MMMM DD', format: 'MMMM' }, 'en-US', 1)
    const value = '2025 January 15'
    expect(parseDateValue(value, zh)?.toDate()).toEqual(parseDateValue(value, en)?.toDate())
    expect(formatDateValue(value, zh)).toBe('一月')
    expect(formatDateValue(value, en)).toBe('January')
    expect(outputDateValue(new Date(2025, 0, 15), zh)).toBe(value)
    expect(outputDateValue(new Date(2025, 0, 15), en)).toBe(value)
  })
  it('safely falls back for unloaded language codes without changing the host', () => {
    const before = dayjs.locale()
    const options = scopeDateOptions({}, 'unknown-XX', 0)
    expect(scopedDate(new Date(2025, 0, 15), options).format('MMMM')).toBe('January')
    expect(dayjs.locale()).toBe(before)
  })
})
