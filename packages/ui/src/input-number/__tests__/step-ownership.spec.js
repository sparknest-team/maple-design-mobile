import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { useStepRepeat } from '../use-step-repeat'

function harness(keepAlive = false, capture = true) {
  vi.useFakeTimers()
  const originalTimeout = globalThis.setTimeout
  const callbacks = []
  const timeout = capture
    ? vi.spyOn(globalThis, 'setTimeout').mockImplementation((callback, delay) => {
        if (delay !== 800 && delay !== 150) {
          return originalTimeout(callback, delay)
        }
        callbacks.push(callback)
        return callbacks.length
      })
    : undefined
  const show = ref(true)
  let repeat
  const Child = {
    setup() {
      repeat = useStepRepeat()
      return () => h('div')
    },
  }
  const wrapper = mount(keepAlive ? { setup: () => () => h(KeepAlive, () => (show.value ? h(Child) : null)) } : Child)
  return {
    callbacks,
    show,
    wrapper,
    get repeat() {
      return repeat
    },
    cleanup() {
      wrapper.unmount()
      timeout?.mockRestore()
      vi.clearAllTimers()
      vi.useRealTimers()
    },
  }
}

describe('InputNumber repeat callback ownership', () => {
  test('stop invalidates a dequeued callback before step', () => {
    const p = harness()
    const step = vi.fn(() => true)
    try {
      p.repeat.start(step, window)
      p.repeat.stop()
      p.callbacks[0]()
      expect(step.mock.calls.length).toBe(0)
    } finally {
      p.cleanup()
    }
  })
  test('old false callback cannot stop a replacement', () => {
    const p = harness()
    const oldStep = vi.fn(() => false)
    const newStep = vi.fn(() => true)
    try {
      p.repeat.start(oldStep, window)
      p.repeat.start(newStep, window)
      p.callbacks[0]()
      expect(oldStep.mock.calls.length).toBe(0)
      p.callbacks[1]()
      expect(newStep).toHaveBeenCalledTimes(1)
      p.callbacks[2]()
      expect(newStep).toHaveBeenCalledTimes(2)
    } finally {
      p.cleanup()
    }
  })
  test('scope disposal invalidates old work and retained start', () => {
    const p = harness()
    const step = vi.fn(() => true)
    try {
      p.repeat.start(step, window)
      p.wrapper.unmount()
      p.callbacks[0]()
      p.repeat.start(step, window)
      expect(step.mock.calls.length).toBe(0)
      expect(p.callbacks).toHaveLength(1)
    } finally {
      p.cleanup()
    }
  })
  test('a consumed callback cannot step twice or replace the next timer', () => {
    const p = harness()
    const step = vi.fn(() => true)
    try {
      p.repeat.start(step, window)
      p.callbacks[0]()
      p.callbacks[0]()
      expect(step).toHaveBeenCalledTimes(1)
      expect(p.callbacks).toHaveLength(2)
      p.callbacks[1]()
      expect(step).toHaveBeenCalledTimes(2)
    } finally {
      p.cleanup()
    }
  })
  test('a step that starts another owner then returns false preserves that owner', () => {
    const p = harness()
    const next = vi.fn(() => true)
    try {
      p.repeat.start(() => {
        p.repeat.start(next, window)
        return false
      }, window)
      p.callbacks[0]()
      p.callbacks[1]()
      expect(next).toHaveBeenCalledTimes(1)
      p.callbacks[2]()
      expect(next).toHaveBeenCalledTimes(2)
    } finally {
      p.cleanup()
    }
  })
  test('deactivation rejects stale callbacks and retained starts; activation permits a new hold', async () => {
    const p = harness(true)
    const step = vi.fn(() => true)
    try {
      p.repeat.start(step, window)
      p.show.value = false
      await nextTick()
      p.callbacks[0]()
      p.repeat.start(step, window)
      expect(step.mock.calls.length).toBe(0)
      expect(p.callbacks).toHaveLength(1)
      p.show.value = true
      await nextTick()
      p.repeat.start(step, window)
      p.callbacks[1]()
      expect(step).toHaveBeenCalledTimes(1)
    } finally {
      p.cleanup()
    }
  })
  test('owner-window release invalidates a dequeued callback', () => {
    const p = harness()
    const step = vi.fn(() => true)
    try {
      p.repeat.start(step, window)
      window.dispatchEvent(new Event('pointercancel'))
      p.callbacks[0]()
      expect(step.mock.calls.length).toBe(0)
    } finally {
      p.cleanup()
    }
  })
  test('normal hold retains 800ms initial and 150ms repetition and stops at its boundary', () => {
    const p = harness(false, false)
    const step = vi.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
    try {
      p.repeat.start(step, window)
      vi.advanceTimersByTime(799)
      expect(step.mock.calls.length).toBe(0)
      vi.advanceTimersByTime(1)
      expect(step).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(149)
      expect(step).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(1)
      expect(step).toHaveBeenCalledTimes(2)
      vi.advanceTimersByTime(1000)
      expect(step).toHaveBeenCalledTimes(2)
    } finally {
      p.cleanup()
    }
  })
})
