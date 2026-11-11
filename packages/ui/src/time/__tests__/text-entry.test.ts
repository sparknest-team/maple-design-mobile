import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import Time from '../Time.vue'

describe('time text entry', () => {
  for (const [Component, initial, edited, expected] of [
    [Time, '09:00', '11:00', '11:00'],
    [TimeRange, ['09:00', '10:00'], '08:00', ['08:00', '10:00']],
  ] as const) {
    it('commits once and reconciles a rejected controlled update', async () => {
      const wrapper = mount(Component as typeof Time, {
        props: { modelValue: initial as any, format: 'HH:mm', inputEditable: true },
      })
      const input = wrapper.get('input')
      expect(input.element.readOnly).toBe(false)
      await input.setValue(edited)
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([expected])
      expect(input.element.value).toBe(Array.isArray(initial) ? initial[0] : initial)
      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      wrapper.unmount()
    })
    it('rejects invalid text and discards drafts when editing is disabled', async () => {
      const wrapper = mount(Component as typeof Time, {
        props: { modelValue: initial as any, format: 'HH:mm', inputEditable: true },
      })
      const input = wrapper.get('input')
      await input.setValue('not a time')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(input.element.value).toBe(Array.isArray(initial) ? initial[0] : initial)
      await input.setValue(edited)
      await wrapper.setProps({ inputEditable: false })
      await wrapper.setProps({ inputEditable: true })
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    })
    it('does not commit composing, disabled or readonly inputs', async () => {
      const wrapper = mount(Component as typeof Time, {
        props: { modelValue: initial as any, format: 'HH:mm', inputEditable: true },
      })
      const input = wrapper.get('input')
      await input.trigger('compositionstart')
      await input.setValue(edited)
      await input.trigger('keydown', { key: 'Enter', isComposing: true })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await input.trigger('compositionend')
      await wrapper.setProps({ readonly: true })
      await input.trigger('keydown', { key: 'Enter' })
      await wrapper.setProps({ readonly: false, disabled: true })
      await input.setValue(edited)
      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    })
  }
  it('accepts a parent update and applies the same bounds to typed values', async () => {
    const wrapper = mount(Time, {
      props: { modelValue: '09:00', format: 'HH:mm', min: '08:00', max: '18:00', inputEditable: true },
    })
    const input = wrapper.get('input')
    await input.setValue('07:00')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await input.setValue('11:00')
    await input.trigger('blur')
    await wrapper.setProps({ modelValue: '11:00' })
    expect(input.element.value).toBe('11:00')
    expect(wrapper.emitted('change')?.[0]).toEqual(['11:00', expect.any(Date)])
    wrapper.unmount()
  })
})
