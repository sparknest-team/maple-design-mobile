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
  expect(wrapper.find('.mp-date-range-picker__summaries').exists()).toBeTruthy()

  wrapper.unmount()
})

test('date-range-picker picker presentation', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarDateRangePicker, {
    props: {
      modelValue: ['2024-01-01', '2024-12-31'],
      presentation: 'picker',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await delay(0)

  expect(wrapper.find('.mp-date-range-picker__summaries').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-picker').length).toBe(0)

  const endValue = wrapper.findAll('.mp-date-range-picker__summary-date')[1]
  await endValue.trigger('click')
  expect(wrapper.get('.mp-date-range-picker__summaries').find('button').exists()).toBe(true)
  expect(onUpdateModelValue).not.toHaveBeenCalled()

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

  await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
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
  expect(wrapper.find('.mp-date-range-picker__summary-date').exists()).toBeTruthy()
  expect(wrapper.find('.mp-date-range-picker__summary-time').exists()).toBeTruthy()
  expect(wrapper.find('.mp-picker').exists()).toBeTruthy()
  expect(wrapper.findAll('.mp-date-range-picker__column-label').length).toBe(3)
  await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
  expect(wrapper.findAll('.mp-date-range-picker__column-label').length).toBe(2)
  expect(wrapper.find('.mp-date-range-picker__summary-times').exists()).toBeFalsy()
  expect(wrapper.text()).toContain('2025-01-15')
  expect(wrapper.text()).toContain('10:29')

  wrapper.unmount()
})

test('range calendar forwards numeric week start and updates it reactively', async () => {
  const wrapper = mount(VarDateRangePicker, {
    props: { modelValue: ['2024-01-01', '2024-01-15'], presentation: 'calendar', dayStartOfWeek: 1 },
  })
  await delay(0)
  expect(wrapper.find('.mp-day-picker__head li').text()).toBe('一')
  await wrapper.setProps({ dayStartOfWeek: 6 })
  await delay(0)
  expect(wrapper.find('.mp-day-picker__head li').text()).toBe('六')
  wrapper.unmount()
})
