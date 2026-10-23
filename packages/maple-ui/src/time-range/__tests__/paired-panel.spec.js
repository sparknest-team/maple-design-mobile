import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import TimeRangePicker from '../TimeRangePicker.vue'

for (const [format, initial, values, expected, labels] of [
  ['HH:mm', ['09:00', '18:00'], ['10', '30', '19', '45'], ['10:30', '19:45'], ['时', '分']],
  [
    'HH:mm:ss',
    ['09:00:00', '18:00:00'],
    ['10', '30', '15', '19', '45', '20'],
    ['10:30:15', '19:45:20'],
    ['时', '分', '秒'],
  ],
  [
    'hh:mm a',
    ['09:00 am', '06:00 pm'],
    ['10', '30', 'am', '07', '45', 'pm'],
    ['10:30 am', '07:45 pm'],
    ['时', '分', 'AM/PM'],
  ],
  ['mm:ss', ['30:00', '45:00'], ['31', '15', '46', '20'], ['31:15', '46:20'], ['分', '秒']],
]) {
  it(`edits both ${format} endpoints in one wheel and confirms once`, async () => {
    const wrapper = mount(TimeRangePicker, { props: { format, modelValue: initial } })
    expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    const picker = wrapper.getComponent(Picker)
    expect(picker.props('columns')).toHaveLength(values.length)
    const header = wrapper.get('.mp-time-range-picker__column-labels')
    expect(header.findAll('.mp-time-range-picker__column-label').map((label) => label.text())).toEqual([
      ...labels,
      ...labels,
    ])
    expect(header.attributes('data-temporal-split')).toBe(String(labels.length))
    expect(header.element.nextElementSibling).toBe(picker.element)
    expect(header.text()).not.toMatch(/开始|结束/)
    picker.vm.$emit('change', values)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('select').at(-1)[0]).toEqual(expected)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(picker.props('modelValue')).toEqual(values)
    await wrapper.get('.mp-time-range-picker__confirm').trigger('click')
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(expected)
    wrapper.unmount()
  })
}

it('keeps overnight order, step sampling and the next-day indicator', async () => {
  const wrapper = mount(TimeRangePicker, {
    props: { modelValue: ['22:00', '06:00'], format: 'HH:mm', showNextDay: true, step: { minute: 15 } },
  })
  const picker = wrapper.getComponent(Picker)
  expect(picker.props('columns')[1].map((option) => option.value)).toEqual(['00', '15', '30', '45'])
  picker.vm.$emit('change', ['23', '15', '07', '30'])
  await wrapper.vm.$nextTick()
  expect(wrapper.get('.mp-time-range-picker__next-day').text()).toBe('次日')
  await wrapper.get('.mp-time-range-picker__confirm').trigger('click')
  expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['23:15', '07:30'])
  wrapper.unmount()
})
