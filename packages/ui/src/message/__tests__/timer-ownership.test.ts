import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMessageTimer } from '../use-message-timer'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.restoreAllMocks()
})

function harness() {
  const tasks: Array<() => void> = []
  vi.spyOn(globalThis, 'setTimeout').mockImplementation((task: any, delay?: number) => {
    if (delay === 1000) {
      tasks.push(task)
    }
    return tasks.length as any
  })
  vi.spyOn(globalThis, 'clearTimeout').mockImplementation(() => {})
  const open = ref(true)
  const close = vi.fn()
  let timer!: ReturnType<typeof useMessageTimer>
  const wrapper = mount(
    defineComponent({
      setup() {
        timer = useMessageTimer({
          open: () => open.value,
          duration: () => 1000,
          pauseOnHover: () => true,
          resetOnUpdate: () => true,
          close,
        })
        return () => h('div')
      },
    }),
  )
  wrappers.push(wrapper)
  return { tasks, open, close, timer, wrapper }
}

describe('Message dequeued timer ownership', () => {
  it('invalidates an old task after restart without consuming the new task', () => {
    const { tasks, timer, close, wrapper } = harness()
    timer.restart()
    tasks[0]()
    expect(close).not.toHaveBeenCalled()
    tasks[1]()
    expect(close).toHaveBeenCalledTimes(1)
    tasks[1]()
    expect(close).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  for (const action of ['pause', 'clear', 'unmount'] as const) {
    it(`ignores an already dequeued callback after ${action}`, () => {
      const { tasks, timer, close, wrapper } = harness()
      if (action === 'unmount') {
        wrapper.unmount()
      } else {
        timer[action]()
      }
      tasks[0]()
      expect(close).not.toHaveBeenCalled()
      if (action !== 'unmount') {
        wrapper.unmount()
      }
    })
  }
  it('checks the current open state before a queued watcher has flushed', () => {
    const { tasks, open, close, wrapper } = harness()
    open.value = false
    tasks[0]()
    expect(close).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
