import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMessageTimer } from '../use-message-timer'

const wrappers: ReturnType<typeof mount>[] = []
beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.restoreAllMocks()
  vi.useRealTimers()
})
function harness(duration = 1000, keepAlive = false) {
  const open = ref(true),
    shown = ref(true),
    delay = ref(duration),
    close = vi.fn()
  let timer!: ReturnType<typeof useMessageTimer>
  const Child = defineComponent({
    setup() {
      timer = useMessageTimer({
        open: () => open.value,
        duration: () => delay.value,
        pauseOnHover: () => true,
        resetOnUpdate: () => true,
        close,
      })
      return () => h('div')
    },
  })
  const wrapper = mount(
    keepAlive
      ? defineComponent({
          setup: () => () => h(KeepAlive, {}, () => (shown.value ? h(Child) : null)),
        })
      : Child,
  )
  wrappers.push(wrapper)
  return { wrapper, timer, open, shown, delay, close }
}
describe('Message inactive and exhausted deadlines', () => {
  it('cancels on deactivation and restarts the configured duration on activation', async () => {
    const { shown, close } = harness(1000, true)
    await nextTick()
    vi.advanceTimersByTime(0)
    vi.advanceTimersByTime(400)
    shown.value = false
    await nextTick()
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
    shown.value = true
    await nextTick()
    vi.advanceTimersByTime(999)
    expect(close).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('does not restart from update or open watchers while inactive', async () => {
    const { shown, timer, open, delay, close } = harness(1000, true)
    shown.value = false
    await nextTick()
    delay.value = 2000
    timer.restart()
    open.value = false
    await nextTick()
    open.value = true
    await nextTick()
    expect(vi.getTimerCount()).toBe(0)
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
    shown.value = true
    await nextTick()
    vi.advanceTimersByTime(1999)
    expect(close).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('does not let a retained exposed restart schedule work after unmount', () => {
    const { wrapper, timer, close } = harness()
    wrapper.unmount()
    timer.restart()
    expect(vi.getTimerCount()).toBe(0)
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
  })
  it('resumes an exhausted positive deadline by closing, not becoming persistent', () => {
    const { timer, close } = harness()
    vi.setSystemTime(Date.now() + 1000)
    timer.pause()
    expect(vi.getTimerCount()).toBe(0)
    expect(close).not.toHaveBeenCalled()
    timer.resume()
    expect(close).toHaveBeenCalledTimes(1)
    timer.resume()
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('reset to explicit zero while paused remains persistent', () => {
    const { timer, delay, close } = harness()
    timer.pause()
    delay.value = 0
    timer.restart()
    timer.resume()
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })
  for (const duration of [NaN, Infinity, -Infinity]) {
    it(`does not schedule a non-finite duration ${duration}`, () => {
      const { close } = harness(duration)
      expect(vi.getTimerCount()).toBe(0)
      vi.advanceTimersByTime(10000)
      expect(close).not.toHaveBeenCalled()
    })
  }
})
