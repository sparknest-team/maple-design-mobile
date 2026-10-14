import { h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { useTriggerState } from '../state'

function harness(keepAlive = false) {
  const callbacks = []
  const timeout = vi.spyOn(globalThis, 'setTimeout').mockImplementation((callback, delay) => {
    if (delay === 1000) {
      callbacks.push(callback)
    }
    return callbacks.length
  })
  const show = ref(true)
  const emit = vi.fn()
  let state
  const Child = {
    setup() {
      state = useTriggerState(reactive({ defaultOpen: false }), emit)
      return () => h('div')
    },
  }
  const wrapper = mount(keepAlive ? { setup: () => () => h(KeepAlive, () => (show.value ? h(Child) : null)) } : Child)
  return {
    callbacks,
    show,
    emit,
    wrapper,
    get state() {
      return state
    },
    cleanup() {
      wrapper.unmount()
      timeout.mockRestore()
    },
  }
}

describe('Trigger delayed commit ownership', () => {
  test('cancel invalidates a dequeued commit', () => {
    const probe = harness()
    try {
      probe.state.request(true, 1000)
      probe.state.cancel()
      probe.callbacks[0]()
      expect(probe.emit).not.toHaveBeenCalled()
      expect(probe.state.visible.value).toBe(false)
    } finally {
      probe.cleanup()
    }
  })
  test('replacement invalidates old work but preserves the new commit', () => {
    const probe = harness()
    try {
      probe.state.request(true, 1000)
      probe.state.request(true, 1000)
      probe.callbacks[0]()
      expect(probe.emit).not.toHaveBeenCalled()
      probe.callbacks[1]()
      expect(probe.emit.mock.calls).toEqual([
        ['update:open', true],
        ['open-change', true],
      ])
    } finally {
      probe.cleanup()
    }
  })
  test('unmount invalidates a dequeued commit', () => {
    const probe = harness()
    try {
      probe.state.request(true, 1000)
      probe.wrapper.unmount()
      probe.callbacks[0]()
      expect(probe.emit).not.toHaveBeenCalled()
    } finally {
      probe.cleanup()
    }
  })
  test('retained request cannot schedule or commit after unmount', () => {
    const probe = harness()
    try {
      probe.wrapper.unmount()
      probe.state.request(true, 1000)
      probe.state.request(true)
      expect(probe.callbacks).toHaveLength(0)
      expect(probe.emit).not.toHaveBeenCalled()
    } finally {
      probe.cleanup()
    }
  })
  test('inactive owner rejects retained requests, reactivation accepts new work', async () => {
    const probe = harness(true)
    try {
      probe.state.request(true, 1000)
      probe.show.value = false
      await nextTick()
      probe.callbacks[0]()
      probe.state.request(true, 1000)
      probe.state.request(true)
      expect(probe.callbacks).toHaveLength(1)
      expect(probe.emit).not.toHaveBeenCalled()
      probe.show.value = true
      await nextTick()
      probe.state.request(true, 1000)
      probe.callbacks[1]()
      expect(probe.emit.mock.calls).toEqual([
        ['update:open', true],
        ['open-change', true],
      ])
    } finally {
      probe.cleanup()
    }
  })
  test('a consumed callback cannot reopen after a later close', () => {
    const probe = harness()
    try {
      probe.state.request(true, 1000)
      probe.callbacks[0]()
      probe.state.request(false)
      probe.callbacks[0]()
      expect(probe.emit.mock.calls).toEqual([
        ['update:open', true],
        ['open-change', true],
        ['update:open', false],
        ['open-change', false],
      ])
    } finally {
      probe.cleanup()
    }
  })
})
