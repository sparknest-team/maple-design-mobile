import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let LoadingBar
const bar = () => document.querySelector('.mp-loading-bar')
beforeEach(async () => {
  vi.useFakeTimers()
  vi.resetModules()
  LoadingBar = (await import('..')).default
})
afterEach(async () => {
  LoadingBar.finish()
  await vi.advanceTimersByTimeAsync(20000)
  LoadingBar.resetDefaultOptions()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('LoadingBar service lifecycle', () => {
  it('unmounts after completion and remounts on start', async () => {
    LoadingBar.start()
    const first = bar()
    await vi.advanceTimersByTimeAsync(200)
    expect(first.style.opacity).toBe('1')
    LoadingBar.finish()
    await vi.advanceTimersByTimeAsync(550)
    expect(bar()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
    LoadingBar.start()
    expect(bar()).not.toBe(first)
  })

  it('deduplicates finish scheduling and cancels old completion on restart', async () => {
    LoadingBar.setDefaultOptions({ finishDelay: 500 })
    LoadingBar.start()
    LoadingBar.finish()
    LoadingBar.finish()
    expect(vi.getTimerCount()).toBe(3)
    await vi.advanceTimersByTimeAsync(100)
    LoadingBar.start()
    await vi.advanceTimersByTimeAsync(900)
    expect(bar().style.opacity).toBe('1')
    expect(bar().style.width).not.toBe('100%')
  })

  it('waits for resolved width and opacity durations including delays', async () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionProperty: 'width, opacity',
      transitionDuration: '600ms, .8s',
      transitionDelay: '100ms, 200ms',
    })
    LoadingBar.start()
    await vi.advanceTimersByTimeAsync(200)
    LoadingBar.finish()
    await vi.advanceTimersByTimeAsync(699)
    expect(bar().style.opacity).toBe('1')
    await vi.advanceTimersByTimeAsync(1)
    expect(bar().style.opacity).toBe('0')
    await vi.advanceTimersByTimeAsync(999)
    expect(bar()).not.toBeNull()
    await vi.advanceTimersByTimeAsync(1)
    expect(bar()).toBeNull()
  })

  it('retains cleanup floors for none/zero transitions', async () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionProperty: 'none',
      transitionDuration: '0s',
      transitionDelay: '0s',
    })
    LoadingBar.start()
    LoadingBar.finish()
    await vi.advanceTimersByTimeAsync(549)
    expect(bar()).not.toBeNull()
    await vi.advanceTimersByTimeAsync(1)
    expect(bar()).toBeNull()
  })

  it('replaces option ownership rather than leaking previous settings', async () => {
    LoadingBar.setDefaultOptions({ color: 'red', height: 8 })
    LoadingBar.setDefaultOptions({ color: 'blue' })
    LoadingBar.start()
    await nextTick()
    expect(bar().style.backgroundColor).toBe('blue')
    expect(bar().style.height).toBe('')
    LoadingBar.resetDefaultOptions()
    await nextTick()
    expect(bar().style.backgroundColor).toBe('')
  })

  it('cancels error completion when a fresh load starts', async () => {
    LoadingBar.error()
    expect(bar().classList.contains('mp-loading-bar--error')).toBe(true)
    await vi.advanceTimersByTimeAsync(100)
    LoadingBar.start()
    await vi.advanceTimersByTimeAsync(900)
    expect(bar().classList.contains('mp-loading-bar--error')).toBe(false)
    expect(bar().style.opacity).toBe('1')
  })

  it('finish without a mounted load schedules nothing', () => {
    LoadingBar.finish()
    expect(vi.getTimerCount()).toBe(0)
    expect(bar()).toBeNull()
  })

  it('repeated finish during closing does not extend the lifecycle', async () => {
    LoadingBar.start()
    LoadingBar.finish()
    await vi.advanceTimersByTimeAsync(200)
    LoadingBar.finish()
    await vi.advanceTimersByTimeAsync(350)
    expect(bar()).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })
})
