import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Popup from '../../popup'
import TimeRange from '../../time-range/TimeRange.vue'
import Time from '../Time.vue'

describe('time popup focus', () => {
  for (const Component of [Time, TimeRange]) {
    it('commits a draft before opening without losing the popup return-focus target', async () => {
      const options = {
        attachTo: document.body,
        global: { stubs: { transition: false } },
        props: { inputEditable: true, format: 'HH:mm', popupContainer: false as const },
      }
      const wrapper =
        Component === TimeRange
          ? mount(TimeRange, { ...options, props: { ...options.props, defaultValue: ['09:00', '10:00'] } })
          : mount(Time, { ...options, props: { ...options.props, defaultValue: '09:00' } })
      const input = wrapper.get('input')
      input.element.focus()
      await nextTick()
      await input.setValue('11:00')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      const popup = wrapper.findComponent(Popup)
      expect(popup.props('open')).toBe(true)
      await nextTick()
      expect(document.activeElement?.getAttribute('role')).toBe('dialog')
      popup.vm.$emit('update:open', false)
      await nextTick()
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(document.activeElement).toBe(input.element)
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      wrapper.unmount()
    })
  }
})
