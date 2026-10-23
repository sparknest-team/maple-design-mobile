import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Picker from '../../picker/Picker.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../TimePicker.vue'

test('single presentation preserves an uncommitted draft through readonly and immediate mode', async () => {
  const wrapper = mount(TimePicker, { props: { defaultValue: '09:30', format: 'HH:mm' } })
  try {
    wrapper.getComponent(Picker).vm.$emit('change', ['10', '30'])
    await nextTick()
    await wrapper.setProps({})
    expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ readonly: true })
    expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30'])
    expect(wrapper.getComponent(Picker).props('disabled')).toBe(true)
    await wrapper.setProps({
      hideDisabledOptions: true,
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7],
      disableConfirm: true,
    })
    expect(wrapper.emitted('confirm')).toBeUndefined()
    await wrapper.setProps({ readonly: false })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.getComponent(Picker).vm.$emit('change', ['11', '30'])
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([['11:30']])
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('paired range wheels preserve both drafts and readonly until one outer confirmation', async () => {
  const wrapper = mount(TimeRangePicker, { props: { defaultValue: ['09:30', '18:00'], format: 'HH:mm' } })
  try {
    wrapper.getComponent(Picker).vm.$emit('change', ['10', '30', '18', '00'])
    await nextTick()
    expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
    expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30', '18', '00'])
    wrapper.getComponent(Picker).vm.$emit('change', ['10', '30', '19', '00'])
    await nextTick()
    expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30', '19', '00'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ readonly: true })
    expect(wrapper.getComponent(Picker).props('disabled')).toBe(true)
    expect(wrapper.get('.mp-time-range-picker__confirm').attributes('disabled')).toBeDefined()
    await wrapper.setProps({ readonly: false })
    await wrapper.get('.mp-time-range-picker__confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['10:30', '19:00']]])
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('select')).toHaveLength(2)
  } finally {
    wrapper.unmount()
  }
})
