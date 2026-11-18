import { afterEach, expect, test, vi } from 'vitest'
import { watchDetachedRoots } from '../detached-root-monitor'

afterEach(() => {
  vi.useRealTimers()
})

test('shares a timer and stops it after the last detached instance is removed', () => {
  vi.useFakeTimers()
  const one = vi.fn()
  const two = vi.fn()
  const stopOne = watchDetachedRoots(one)
  const stopTwo = watchDetachedRoots(two)
  expect(vi.getTimerCount()).toBe(1)
  vi.advanceTimersByTime(250)
  expect(one).toHaveBeenCalledTimes(1)
  expect(two).toHaveBeenCalledTimes(1)
  stopOne()
  vi.advanceTimersByTime(250)
  expect(one).toHaveBeenCalledTimes(1)
  expect(two).toHaveBeenCalledTimes(2)
  stopTwo()
  expect(vi.getTimerCount()).toBe(0)
})
