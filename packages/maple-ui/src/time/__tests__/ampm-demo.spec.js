import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import RangeDemo from '../../time-range/example/demos/ampm.vue'
import TimeRange from '../../time-range/index'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Demo from '../example/demos/ampm-formats.vue'
import Time from '../index'
import TimePicker from '../TimePicker.vue'

const space = { template: '<div><slot /></div>' }
it('AM/PM demo preserves the field values and commits noon as midnight with the period wheel', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTime: Time, MpTimePicker: TimePicker, MpSpace: space } } })
  try {
    expect(wrapper.findAllComponents(Time).map((field) => field.props('modelValue'))).toEqual(['09:30 AM', '05:45 PM'])
    const panel = wrapper.getComponent(TimePicker)
    panel.getComponent(Picker).vm.$emit('change', ['12', '00', '00', 'am'])
    await wrapper.vm.$nextTick()
    expect(wrapper.get('output').text()).toContain('12:00:00 PM')
    await panel.get('.mp-time-picker__confirm').trigger('click')
    expect(wrapper.get('output').text()).toBe('09:30 AM / 05:45 PM / 12:00:00 AM')
  } finally {
    wrapper.unmount()
  }
})
it('AM/PM range demo commits a cross-midnight wheel range without reversing endpoints', async () => {
  const wrapper = mount(RangeDemo, {
    global: { components: { MpTimeRange: TimeRange, MpTimeRangePicker: TimeRangePicker, MpSpace: space } },
  })
  try {
    expect(wrapper.findAllComponents(TimeRange)).toHaveLength(2)
    const panel = wrapper.getComponent(TimeRangePicker)
    panel.getComponent(Picker).vm.$emit('change', ['11', '30', 'pm', '01', '00', 'am'])
    await wrapper.vm.$nextTick()
    await panel.get('.mp-time-range-picker__confirm').trigger('click')
    expect(panel.props('modelValue')).toEqual(['11:30 pm', '01:00 am'])
    expect(panel.get('.mp-time-range-picker__next-day').text()).toBe('次日')
  } finally {
    wrapper.unmount()
  }
})
