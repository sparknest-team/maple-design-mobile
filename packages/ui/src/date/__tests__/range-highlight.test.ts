import { expect, test, vi } from 'vitest'
import { isRangeHighlighted } from '../range-highlight'

for (const unit of ['day', 'month', 'year'] as const) {
  test(`${unit} partial, empty and reversed ranges never use today as a missing endpoint`, () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-19T12:00:00'))
    try {
      const a = unit === 'day' ? '2026-10-26' : unit === 'month' ? '2026-11' : '2027'
      const b = unit === 'day' ? '2026-10-28' : unit === 'month' ? '2026-12' : '2028'
      expect(isRangeHighlighted(a, [a], unit)).toBe(true)
      expect(isRangeHighlighted('2026-10-19', [a], unit)).toBe(false)
      expect(isRangeHighlighted(a, ['', a], unit)).toBe(true)
      expect(isRangeHighlighted(a, [], unit)).toBe(false)
      expect(isRangeHighlighted(a, ['invalid'], unit)).toBe(false)
      expect(isRangeHighlighted(a, [b, a], unit)).toBe(true)
      expect(isRangeHighlighted(b, [b, a], unit)).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })
}
