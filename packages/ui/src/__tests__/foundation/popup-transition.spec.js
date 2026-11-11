import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { usePopupTransition } from '../../utils/popup-transition'

const setup = (initial = false, unmount = true) => {
  const open = ref(initial),
    emit = vi.fn()
  let controls
  const wrapper = mount({
    setup() {
      controls = usePopupTransition(
        () => open.value,
        () => unmount,
        emit,
      )
      return () => h('div')
    },
  })
  return { open, emit, controls, wrapper }
}
describe('popup transition phase contract', () => {
  test('unmount waits for current leave completion', async () => {
    const { open, controls, wrapper } = setup(true)
    try {
      await nextTick()
      open.value = false
      await nextTick()
      expect(controls.leaving.value).toBe(true)
      expect(controls.shouldRender.value).toBe(true)
      controls.closed()
      expect(controls.shouldRender.value).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('completion events occur once per phase including initially open', async () => {
    const { open, controls, emit, wrapper } = setup(true)
    try {
      await nextTick()
      controls.opened()
      controls.opened()
      expect(emit.mock.calls.filter(([event]) => event === 'opened')).toHaveLength(1)
      open.value = false
      await nextTick()
      controls.closed()
      controls.closed()
      expect(emit.mock.calls.filter(([event]) => event === 'closed')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('rapid reopen rejects old closed completion and resets the phase', async () => {
    const { open, controls, emit, wrapper } = setup()
    try {
      open.value = true
      await nextTick()
      controls.opened()
      open.value = false
      await nextTick()
      open.value = true
      await nextTick()
      controls.closed()
      expect(controls.leaving.value).toBe(false)
      expect(controls.shouldRender.value).toBe(true)
      expect(emit.mock.calls.filter(([event]) => event === 'closed')).toHaveLength(0)
      controls.opened()
      controls.opened()
      expect(emit.mock.calls.filter(([event]) => event === 'opened')).toHaveLength(2)
    } finally {
      wrapper.unmount()
    }
  })
  test('retained mounting keeps its content after close', async () => {
    const { open, controls, wrapper } = setup(false, false)
    try {
      open.value = true
      await nextTick()
      controls.opened()
      open.value = false
      await nextTick()
      controls.closed()
      expect(controls.shouldRender.value).toBe(true)
      expect(controls.leaving.value).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('completion callbacks after disposal do not emit', async () => {
    const { controls, emit, wrapper } = setup(true)
    await nextTick()
    wrapper.unmount()
    const count = emit.mock.calls.length
    controls.opened()
    controls.closed()
    expect(emit.mock.calls).toHaveLength(count)
  })
})
