import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Alert from '..'
import Button from '../../button'
import Demo from '../example/demos/allow-to-close.vue'

test('close Demo counts completed transitions and reopens independent instances', async () => {
  vi.useFakeTimers()
  const wrapper = mount(Demo, {
    global: { components: { MpAlert: Alert, MpButton: Button }, stubs: { transition: false } },
  })
  try {
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    for (const [index, key] of ['Enter', ' ', null].entries()) {
      const close = wrapper.get('[role=button][aria-label=Close]')
      if (key) {
        await close.trigger('keydown', { key })
      } else {
        await close.trigger('click')
      }
      await vi.runAllTimersAsync()
      await flushPromises()
      expect(wrapper.get('[role=status]').text()).toBe(`Close: ${index + 1} · Closed: ${index + 1}`)
      expect(wrapper.find('[role=alert]').exists()).toBe(false)
      expect(wrapper.get('button').attributes('disabled')).toBeUndefined()
      if (index < 2) {
        await wrapper.get('button').trigger('click')
        await flushPromises()
        expect(wrapper.findAll('[role=alert]')).toHaveLength(1)
        expect(wrapper.get('button').attributes('disabled')).toBeDefined()
      }
    }
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
