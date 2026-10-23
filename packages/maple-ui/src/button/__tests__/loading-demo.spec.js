import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Button from '..'
import Select from '../../select'
import Space from '../../space'
import LoadingDemo from '../example/demos/loading.vue'

test('loading demo arrow clicks open each select once and stay open until dismissed', async () => {
  const wrapper = mount(LoadingDemo, {
    attachTo: document.body,
    global: { components: { MpSelect: Select, MpSpace: Space, MpButton: Button } },
  })
  try {
    await nextTick()
    for (const select of wrapper.findAllComponents(Select)) {
      const arrow = select.get('.mp-selection-field__icon svg path')
      await arrow.trigger('mousedown', { button: 0 })
      await arrow.trigger('mouseup', { button: 0 })
      await arrow.trigger('click')
      await flushPromises()
      expect(select.get('input').attributes('aria-expanded')).toBe('true')
      expect(select.emitted('update:open')).toEqual([[true]])
      document.body.click()
      await flushPromises()
      expect(select.get('input').attributes('aria-expanded')).toBe('false')
    }
  } finally {
    wrapper.unmount()
  }
})
