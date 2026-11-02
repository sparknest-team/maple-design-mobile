import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import Time from '../Time.vue'
import { fieldState, mountField } from './field-test-utils'

describe('mobile time text presentation', () => {
  for (const Component of [Time, TimeRange]) {
    it('defaults to selection only and keeps icon-mode editable text keys local', async () => {
      const wrapper = mountField(Component)
      const input = wrapper.get('input')
      expect(input.element.readOnly).toBe(true)
      await wrapper.setProps({ inputEditable: true, openTriggerTarget: 'icon' })
      expect(input.element.readOnly).toBe(false)
      await input.trigger('click')
      await input.trigger('keydown', { key: 'Enter' })
      await input.trigger('keyup', { key: ' ' })
      expect(fieldState(wrapper).open.value).toBe(false)
      await input.trigger('keydown', { key: 'ArrowDown' })
      expect(fieldState(wrapper).open.value).toBe(true)
      expect(wrapper.get('button[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('true')
      wrapper.unmount()
    })
    it('flushes a focused draft before opening and blocks readonly buttons', async () => {
      const wrapper = mountField(Component, {
        attachTo: document.body,
        global: { stubs: { MpPopup: false } },
        props: { inputEditable: true, format: 'HH:mm', modelValue: Component === Time ? '09:00' : ['09:00', '10:00'] },
      })
      const input = wrapper.get('input')
      input.element.focus()
      await nextTick()
      await input.setValue(Component === Time ? '11:00' : '08:00')
      expect(document.activeElement).toBe(input.element)
      await input.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(fieldState(wrapper).open.value).toBe(true)
      fieldState(wrapper).cancel()
      await wrapper.setProps({ readonly: true })
      const button = wrapper.get('button[aria-haspopup="dialog"]')
      expect(button.element.disabled).toBe(true)
      await button.trigger('click')
      expect(fieldState(wrapper).open.value).toBe(false)
      wrapper.unmount()
    })
  }
})
