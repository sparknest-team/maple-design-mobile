import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Time from '../..'
import Picker from '../../../picker/Picker.vue'
import TimePicker from '../../TimePicker.vue'

test('time picker plugin and wheel-only public contract', () => {
  const app = createApp({}).use(Time)
  expect(app.component(TimePicker.name)).toBeTruthy()
  expect(TimePicker.props).not.toHaveProperty('presentation')
  expect(Time.props).not.toHaveProperty('panelType')
})
for (const [format, value, parts, expected] of [
  ['HH:mm', '09:30', ['10', '45'], '10:45'],
  ['HH:mm:ss', '09:30:00', ['10', '45', '12'], '10:45:12'],
  ['hh:mm A', '09:30 AM', ['12', '00', 'pm'], '12:00 PM'],
  ['hh:mm a', '12:00 pm', ['12', '00', 'am'], '12:00 am'],
]) {
  test(`time wheel selects and confirms ${format}`, async () => {
    const wrapper = mount(TimePicker, { props: { format, modelValue: value } })
    try {
      wrapper.getComponent(Picker).vm.$emit('change', parts)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('select').at(-1)[0]).toBe(expected)
      expect(wrapper.find('.mp-time-picker__summary').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.get('.mp-time-picker__confirm').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toEqual([[expected]])
    } finally {
      wrapper.unmount()
    }
  })
}
