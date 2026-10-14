import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMessageTimer } from '../use-message-timer'

const wrappers: ReturnType<typeof mount>[] = []
beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
function harness(duration = 1000) {
  const open = ref(true)
  const delay = ref(duration)
  const reset = ref(true)
  const close = vi.fn()
  let timer: ReturnType<typeof useMessageTimer> | undefined
  const wrapper = mount(
    defineComponent({
      setup() {
        timer = useMessageTimer({
          open: () => open.value,
          duration: () => delay.value,
          pauseOnHover: () => true,
          resetOnUpdate: () => reset.value,
          close,
        })
        return () => h('div')
      },
    }),
  )
  wrappers.push(wrapper)
  return { wrapper, open, delay, reset, close, timer: timer! }
}
describe('Message independent timer lifecycle', () => {
  it('pauses and resumes only the remaining duration', () => {
    const { timer, close } = harness()
    vi.advanceTimersByTime(400)
    timer.pause()
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
    timer.resume()
    vi.advanceTimersByTime(599)
    expect(close).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('updates a paused duration without starting a hidden timer', () => {
    const { timer, delay, close } = harness()
    vi.advanceTimersByTime(400)
    timer.pause()
    delay.value = 2000
    timer.restart()
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
    timer.resume()
    vi.advanceTimersByTime(1999)
    expect(close).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('preserves elapsed time when resetOnUpdate is disabled', () => {
    const { timer, delay, reset, close } = harness()
    vi.advanceTimersByTime(400)
    delay.value = 2000
    reset.value = false
    timer.restart()
    vi.advanceTimersByTime(600)
    expect(close).toHaveBeenCalledTimes(1)
  })
  it('clears pending work on close and unmount, and treats zero as persistent', async () => {
    const { wrapper, timer, delay, open, close } = harness(0)
    expect(vi.getTimerCount()).toBe(0)
    delay.value = 1000
    timer.restart()
    expect(vi.getTimerCount()).toBe(1)
    open.value = false
    await nextTick()
    expect(vi.getTimerCount()).toBe(0)
    open.value = true
    await nextTick()
    expect(vi.getTimerCount()).toBe(1)
    wrapper.unmount()
    wrappers.pop()
    expect(vi.getTimerCount()).toBe(0)
    vi.advanceTimersByTime(10000)
    expect(close).not.toHaveBeenCalled()
  })
})
