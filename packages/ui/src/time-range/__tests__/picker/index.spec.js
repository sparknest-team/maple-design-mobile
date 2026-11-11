import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import TimeRange from '../..'
import Picker from '../../../picker/Picker.vue'
import { delay } from '../../../utils/test'
import VarTimeRangePicker from '../../TimeRangePicker.vue'

test('time-range-picker plugin', () => {
  const app = createApp({}).use(TimeRange)
  expect(app.component(VarTimeRangePicker.name)).toBeTruthy()
})

test('time-range-picker paired wheels without summaries', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      format: 'HH:mm',
      modelValue: ['09:00', '18:00'],
      presentation: 'picker',
      'onUpdate:modelValue': onUpdateModelValue,
      onChange,
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
  expect(wrapper.findAll('.mp-time-picker').length).toBe(0)
  expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(4)

  expect(onUpdateModelValue).not.toHaveBeenCalled()

  wrapper.unmount()
})

test('time-range-picker picker presentation', async () => {
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      modelValue: ['09:00', '18:00'],
      format: 'HH:mm',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-time-picker').length).toBe(0)

  wrapper.unmount()
})

test('time-range-picker readonly', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      format: 'HH:mm',
      modelValue: ['09:00', '18:00'],
      presentation: 'picker',
      readonly: true,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await delay(0)

  wrapper.getComponent(Picker).vm.$emit('change', ['10', '30', '19', '45'])
  await delay(200)

  expect(onUpdateModelValue).not.toHaveBeenCalled()
  wrapper.unmount()
})
