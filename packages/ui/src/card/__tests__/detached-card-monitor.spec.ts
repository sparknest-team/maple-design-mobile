import { afterEach, expect, test, vi } from 'vitest'
import { watchDetachedCard } from '../detached-card-monitor'

afterEach(() => vi.useRealTimers())

test('shares one timer until the final detached card unsubscribes', () => {
  vi.useFakeTimers()
  const first = vi.fn(),
    second = vi.fn()
  const stopFirst = watchDetachedCard(first),
    stopSecond = watchDetachedCard(second)
  expect(vi.getTimerCount()).toBe(1)
  vi.advanceTimersByTime(250)
  expect(first).toHaveBeenCalledTimes(1)
  expect(second).toHaveBeenCalledTimes(1)
  stopFirst()
  expect(vi.getTimerCount()).toBe(1)
  vi.advanceTimersByTime(250)
  expect(first).toHaveBeenCalledTimes(1)
  expect(second).toHaveBeenCalledTimes(2)
  stopSecond()
  expect(vi.getTimerCount()).toBe(0)
})
