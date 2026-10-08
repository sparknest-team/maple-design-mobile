import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import DateRange from '../..'
import { delay } from '../../../utils/test'
import VarDateRangePicker from '../../DateRangePicker.vue'

test('date-range-picker plugin', () => {
  const app = createApp({}).use(DateRange)
  expect(app.component(VarDateRangePicker.name)).toBeTruthy()
})

test('date-range-picker calendar presentation', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2024-01-01', '2024-01-15'],
      presentation: 'calendar',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-picker').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker__values').exists()).toBeFalsy()

  wrapper.unmount()
})

test('date-range-picker picker presentation', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2024-01-01', '2024-12-31'],
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-range-picker__values').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-picker').length).toBe(0)

  const endValue = wrapper.findAll('.mp-date-range-picker__value')[1]
  await endValue.trigger('click')
  expect(endValue.classes()).toContain('mp-date-range-picker__value--active')

  wrapper.unmount()
})

test('date-range-picker picker year type', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2020', '2024'],
      presentation: 'picker',
      type: 'year',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.text()).toContain('2020')
  expect(wrapper.text()).toContain('2024')

  wrapper.unmount()
})

test('date-range-picker show-time calendarClock', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2025-01-15 10:29', '2025-01-16 11:29'],
      showTime: true,
      useSeconds: false,
      presentation: 'calendarClock',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-range-picker--with-time').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker--calendar-time').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker__view-tabs').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-picker').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeFalsy()
  expect(wrapper.findAll('.mp-date-range-picker__view-tab').length).toBe(2)
  expect(wrapper.findAll('.mp-date-range-picker__view-tab')[0].text()).toContain('10:29')
  expect(wrapper.findAll('.mp-date-range-picker__view-tab')[1].text()).toContain('11:29')

  await wrapper.findAll('.mp-date-range-picker__view-tab')[0].trigger('click')
  expect(wrapper.find('.mp-time-picker').exists()).toBeTruthy()

  wrapper.unmount()
})

test('date-range-picker show-time calendarPicker', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2025-01-15 10:29', '2025-01-16 11:29'],
      showTime: true,
      useSeconds: false,
      presentation: 'calendarPicker',
    },
  })

  await delay(0)

  await wrapper.findAll('.mp-date-range-picker__view-tab')[1].trigger('click')
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-range-picker__column-label').length).toBe(2)
  expect(wrapper.find('.mp-time-picker').exists()).toBeFalsy()

  wrapper.unmount()
})

test('date-range-picker show-time picker', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2025-01-15 10:29', '2025-01-16 11:29'],
      showTime: true,
      useSeconds: false,
      presentation: 'picker',
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-range-picker--with-time').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker__value-date').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker__value-time').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-range-picker__column-label').length).toBe(5)
  expect(wrapper.find('.mp-date-range-picker__view-tabs').exists()).toBeFalsy()
  expect(wrapper.text()).toContain('2025-01-15')
  expect(wrapper.text()).toContain('10:29')

  wrapper.unmount()
})
