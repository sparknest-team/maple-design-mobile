import { describe, expect, it } from 'vitest'
import { getDefaultFormat, getDefaultValueFormat } from '../date-format'

describe('date format rules', () => {
  it.each([
    ['date', 'YYYY-MM-DD', 'YYYY-MM-DD'],
    ['month', 'YYYY-MM', 'YYYY-MM'],
    ['year', 'YYYY', 'YYYY'],
    ['week', 'gggg-wo', 'YYYY-MM-DD'],
    ['quarter', 'YYYY-[Q]Q', 'YYYY-MM'],
  ] as const)('separates labels and models for %s', (mode, display, value) => {
    expect(getDefaultFormat(mode)).toBe(display)
    expect(getDefaultValueFormat(mode)).toBe(value)
    if (mode !== 'date') {
      expect(getDefaultFormat(mode, true, false)).toBe(display)
      expect(getDefaultValueFormat(mode, true, false)).toBe(value)
    }
  })
  it('defaults to date-only and makes precision explicit', () => {
    expect(getDefaultFormat()).toBe('YYYY-MM-DD')
    expect(getDefaultValueFormat()).toBe('YYYY-MM-DD')
    expect(getDefaultFormat('date', true)).toBe('YYYY-MM-DD HH:mm:ss')
    expect(getDefaultValueFormat('date', true, false)).toBe('YYYY-MM-DD HH:mm')
    expect(getDefaultFormat('date', false, true)).toBe('YYYY-MM-DD')
  })
})
