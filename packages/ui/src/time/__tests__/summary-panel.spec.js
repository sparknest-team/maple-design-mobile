import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { changeWheel, fieldState, mountField } from './field-test-utils'

it('keeps a single time draft in the wheel without a top summary', async () => {
  const wrapper = mount(TimePicker, { props: { modelValue: '09:00', format: 'HH:mm' } })
  expect(wrapper.find('.mp-time-picker__summary').exists()).toBe(false)
  expect(wrapper.findAll('.mp-time-picker__column-label').map((label) => label.text())).toEqual(['时', '分'])
  wrapper.getComponent(Picker).vm.$emit('change', ['10', '30'])
  await wrapper.vm.$nextTick()
  expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30'])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ modelValue: '11:15' })
  expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['11', '15'])
  expect(wrapper.emitted('select')).toHaveLength(1)
  wrapper.unmount()
})

it('omits the inline time summary without committing before confirmation', async () => {
  const wrapper = mountField(Time, { props: { open: true, modelValue: '09:00', format: 'HH:mm' } })
  expect(wrapper.find('.mp-time-picker__summary').exists()).toBe(false)
  expect(wrapper.findAll('.mp-time-picker__column-label').map((label) => label.text())).toEqual(['时', '分'])
  expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['09', '00'])
  changeWheel(wrapper, ['10', '30'])
  await wrapper.vm.$nextTick()
  expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '30'])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  fieldState(wrapper).confirm()
  expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe('10:30')
  wrapper.unmount()
})

for (const [format, modelValue, labels] of [
  ['HH:mm', '09:30', ['时', '分']],
  ['HH:mm:ss', '09:30:00', ['时', '分', '秒']],
  ['hh:mm a', '09:30 am', ['时', '分', 'AM/PM']],
  ['mm:ss', '30:00', ['分', '秒']],
]) {
  it(`labels only the visible ${format} columns above the wheel`, () => {
    const wrapper = mount(TimePicker, { props: { format, modelValue } })
    try {
      const header = wrapper.get('.mp-time-picker__column-labels')
      expect(header.findAll('.mp-time-picker__column-label').map((label) => label.text())).toEqual(labels)
      expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(labels.length)
      expect(header.element.nextElementSibling).toBe(wrapper.getComponent(Picker).element)
    } finally {
      wrapper.unmount()
    }
  })
}
