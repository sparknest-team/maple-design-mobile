import { describe, expect, test } from 'vitest'
import { positiveLength, resolveProgressSize } from '../size'

describe('Progress size contract', () => {
  test.each(['xs', 'sm', 'md', 'lg', 'xl'])('resolves preset %s for both modes', (size) => {
    const circle = resolveProgressSize(size, 'circle')
    const line = resolveProgressSize(size, 'line')
    expect(circle.diameter).toMatch(/^\d+px$/)
    expect(circle.stroke).toBe(line.stroke)
    expect(parseFloat(circle.diameter)).toBeGreaterThan(parseFloat(circle.stroke))
  })
  test.each([24, '24', '2rem', '50%', 'calc(100% - 2px)'])('accepts custom length %s', (size) => {
    const expected = typeof size === 'number' || size === '24' ? '24px' : size
    expect(resolveProgressSize(size, 'circle').diameter).toBe(expected)
    expect(resolveProgressSize(size, 'line').stroke).toBe(expected)
    expect(resolveProgressSize(size, 'line').diameter).toBe('64px')
  })
  test.each([0, -1, NaN, Infinity, '', 'garbage', '-4px', '0px'])('rejects invalid/nonpositive length %s', (size) => {
    expect(positiveLength(size, '64px')).toBe('64px')
  })
})
