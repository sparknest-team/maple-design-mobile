import { describe, expect, it } from 'vitest'
import { formatClockLabel, getTimeFormatColumns, resolveTimeFormat } from '../time-format'

describe('time format contract', () => {
  it('resolves defaults without masking twelve-hour mode', () => {
    expect(resolveTimeFormat().format).toBe('HH:mm:ss')
    expect(resolveTimeFormat({ use12Hours: true }).format).toBe('hh:mm:ss a')
    expect(resolveTimeFormat({ format: 'HH:mm', use12Hours: true })).toMatchObject({
      format: 'HH:mm',
      use12Hours: true,
      useSeconds: false,
    })
    expect(resolveTimeFormat({ defaultFormat: 'HH:mm' }).format).toBe('HH:mm')
  })
  it('ignores bracketed letters and detects twelve-hour tokens', () => {
    expect(getTimeFormatColumns('[Hours and seconds AM] HH:mm')).toEqual({
      list: ['H', 'm'],
      use12Hours: false,
    })
    expect(resolveTimeFormat({ format: 'hh:mm A' })).toMatchObject({
      columns: ['h', 'm', 'A'],
      use12Hours: true,
      useSeconds: false,
    })
    expect(resolveTimeFormat({ format: 'h:mm' }).use12Hours).toBe(true)
    expect(resolveTimeFormat({ format: '[Hours]', use12Hours: true }).format).toBe('hh:mm:ss a')
    expect(resolveTimeFormat({ format: 'A' }).format).toBe('HH:mm:ss')
  })
  it('formats midnight, noon, padded and unpadded clock units', () => {
    expect(formatClockLabel(0, 'hh:mm:ss a')).toBe('12:00:00 am')
    expect(formatClockLabel(43200, 'hh:mm:ss A')).toBe('12:00:00 PM')
    expect(formatClockLabel(13 * 3600 + 5 * 60 + 9, 'H:m:s [=] h:m:s a')).toBe('13:5:9 = 1:5:9 pm')
    expect(formatClockLabel(86399, 'HH:mm:ss')).toBe('23:59:59')
    expect(formatClockLabel(0, '[AM seconds] HH:mm')).toBe('AM seconds 00:00')
  })
  it('rejects invalid clock seconds', () => {
    for (const value of [-1, 86400, 0.5, NaN, Infinity]) {
      expect(formatClockLabel(value, 'HH:mm:ss')).toBe('')
    }
  })
})
