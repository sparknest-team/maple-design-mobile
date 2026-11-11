import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PickerField from '../../_components/picker-field/PickerField.vue'
import TimeRange from '../../time-range/TimeRange.vue'
import { resolveTimeFieldPlaceholders } from '../field-placeholders'
import Time from '../Time.vue'

describe('time field public contract', () => {
  it('normalizes endpoint labels without mutating arrays', () => {
    const value = ['Start']
    expect(resolveTimeFieldPlaceholders(value, 'Default', true)).toEqual(['Start', ''])
    expect(value).toEqual(['Start'])
    expect(resolveTimeFieldPlaceholders('', 'Default', true)).toEqual(['', ''])
    expect(resolveTimeFieldPlaceholders(undefined, ['Start', 'End'], true)).toEqual(['Start', 'End'])
  })
  it('reactively applies string and array placeholders to both endpoints', async () => {
    const wrapper = mount(TimeRange, { props: { placeholder: ['Start', 'End'], hint: false } })
    const field = () => wrapper.findComponent(PickerField)
    expect(field().props('placeholders')).toEqual(['Start', 'End'])
    await wrapper.setProps({ placeholder: 'Time' })
    expect(field().props('placeholders')).toEqual(['Time', 'Time'])
    await wrapper.setProps({ placeholder: ['', 'End'] })
    expect(field().props('placeholders')).toEqual(['', 'End'])
    wrapper.unmount()
  })
  for (const Component of [Time, TimeRange]) {
    it('forwards explicit native labels to the input rather than the popup', () => {
      const wrapper = mount(Component, { attrs: { 'aria-label': 'Custom time label', name: 'schedule-time' } })
      expect(wrapper.get('input').attributes('aria-label')).toBe('Custom time label')
      expect(wrapper.get('input').attributes('name')).toBe('schedule-time')
      wrapper.unmount()
    })
    it('notifies one field click, including readonly but excluding disabled', async () => {
      const wrapper = mount(Component, {
        props: { open: false },
        slots: { prefix: '<span data-click-target>Time</span>' },
      })
      await wrapper.get('[data-click-target]').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(Event)
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      await wrapper.setProps({ readonly: true })
      await wrapper.get('[data-click-target]').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      await wrapper.setProps({ disabled: true })
      await wrapper.get('[data-click-target]').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
      wrapper.unmount()
    })
    it('requests closure through open-change without the legacy close notification', async () => {
      const wrapper = mount(Component, { props: { open: true } })
      wrapper.vm.blur()
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('open-change')).toEqual([[false]])
      expect(wrapper.emitted('update:open')).toEqual([[false]])
      expect(wrapper.emitted('close')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
      await wrapper.setProps({ open: false })
      expect(wrapper.emitted('close')).toBeUndefined()
      wrapper.unmount()
    })
    it('renders suffix-icon and exposes popup state', async () => {
      const wrapper = mount(Component, {
        props: { open: false },
        slots: { 'suffix-icon': '<span data-time-icon>{{ params.popupOpen }}</span>' },
      })
      expect(wrapper.get('[data-time-icon]').text()).toBe('false')
      await wrapper.setProps({ open: true })
      expect(wrapper.get('[data-time-icon]').text()).toBe('true')
      wrapper.unmount()
    })
  }
  it('focuses the requested range endpoint without committing a value', () => {
    const wrapper = mount(TimeRange, { attachTo: document.body, props: { hint: false } })
    wrapper.vm.focus(1)
    expect(document.activeElement).toBe(wrapper.findAll('input')[1].element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
})
