import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import TimeRangePicker from '..'
import { delay, trigger } from '../../utils/test'
import VarTimeRangePicker from '../TimeRangePicker'

test('time-range-picker plugin', () => {
  const app = createApp({}).use(TimeRangePicker)
  expect(app.component(TimeRangePicker.name)).toBeTruthy()
})

test('time-range-picker clock presentation', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      modelValue: ['09:00', '18:00'],
      'onUpdate:modelValue': onUpdateModelValue,
      onChange,
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-time-range-picker__values').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-time-picker').length).toBe(2)

  const endValue = wrapper.findAll('.mp-time-range-picker__value')[1]
  await endValue.trigger('click')
  expect(endValue.classes()).toContain('mp-time-range-picker__value--active')

  wrapper.unmount()
})

test('time-range-picker picker presentation', async () => {
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      modelValue: ['09:00', '18:00'],
      presentation: 'picker',
      format: '24hr',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-time-range-picker__values').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-time-picker').length).toBe(0)

  wrapper.unmount()
})

test('time-range-picker readonly', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarTimeRangePicker, {
    props: {
      modelValue: ['09:00', '18:00'],
      readonly: true,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await delay(0)

  const el = wrapper.find('.mp-time-picker__clock-container')
  await trigger(el, 'touchstart', 40, 30)
  await trigger(el, 'touchmove', 20, 25)
  await trigger(el, 'touchend', 30, 25)
  await delay(200)

  expect(onUpdateModelValue).not.toHaveBeenCalled()
  wrapper.unmount()
})
