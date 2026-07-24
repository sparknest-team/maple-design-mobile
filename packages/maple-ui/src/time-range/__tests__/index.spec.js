import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import TimeRange from '..'
import { delay, trigger } from '../../utils/test'
import VarTimeRange from '../TimeRange'

test('time-range plugin', () => {
  const app = createApp({}).use(TimeRange)
  expect(app.component(TimeRange.name)).toBeTruthy()
})

test('time-range confirm writes modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarTimeRange, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      onChange,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-time-range__panel')).toBeTruthy()
  expect(document.querySelector('.mp-time-range-picker__values')).toBeTruthy()
  expect(document.querySelectorAll('.mp-time-picker').length).toBe(2)

  await trigger(document.querySelector('.mp-time-range__confirm-button'), 'click')
  await delay(300)

  expect(onUpdateModelValue).toHaveBeenCalledWith(['00:00', '00:00'])
  expect(onChange).toHaveBeenCalledWith(['00:00', '00:00'])

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time-range picker presentation', async () => {
  const wrapper = mount(VarTimeRange, {
    props: {
      modelValue: ['09:00', '18:00'],
      presentation: 'picker',
      format: '24hr',
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-time-range-picker__values')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeTruthy()
  expect(document.querySelectorAll('.mp-time-picker').length).toBe(0)

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time-range cancel does not write modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarTimeRange, {
    props: {
      modelValue: ['09:00', '18:00'],
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)
  await trigger(document.querySelector('.mp-time-range__cancel-button'), 'click')
  await delay(300)

  expect(onUpdateModelValue).not.toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time-range clear', async () => {
  const onUpdateModelValue = vi.fn()
  const onClear = vi.fn()
  const wrapper = mount(VarTimeRange, {
    props: {
      modelValue: ['09:00', '18:00'],
      clearable: true,
      'onUpdate:modelValue': onUpdateModelValue,
      onClear,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith([])
  expect(onClear).toHaveBeenCalledWith([])

  wrapper.unmount()
  document.body.innerHTML = ''
})
