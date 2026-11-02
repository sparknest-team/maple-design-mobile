import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Alert from '..'
import Button from '../../button'
import Demo from '../example/demos/dismiss-comparison.vue'

test('close Demo counts completed transitions and reopens independent instances', async () => {
  vi.useFakeTimers()
  const wrapper = mount(Demo, {
    global: { components: { MpAlert: Alert, MpButton: Button }, stubs: { transition: false } },
  })
  try {
    const scene = () => wrapper.get('[data-comparison-scene="allow-to-close"]')
    expect(scene().get('.mp-button').attributes('disabled')).toBeDefined()
    for (const [index, key] of ['Enter', ' ', null].entries()) {
      const close = scene().get('[role=button][aria-label=Close]')
      if (key) {
        await close.trigger('keydown', { key })
      } else {
        await close.trigger('click')
      }
      await vi.runAllTimersAsync()
      await flushPromises()
      expect(scene().get('[role=status]').text()).toBe(`Close: ${index + 1} · Closed: ${index + 1}`)
      expect(scene().find('[role=alert]').exists()).toBe(false)
      expect(scene().get('.mp-button').attributes('disabled')).toBeUndefined()
      if (index < 2) {
        await scene().get('.mp-button').trigger('click')
        await flushPromises()
        expect(scene().findAll('[role=alert]')).toHaveLength(1)
        expect(scene().get('.mp-button').attributes('disabled')).toBeDefined()
      }
    }
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
