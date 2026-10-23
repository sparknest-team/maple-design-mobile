import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import DateRange from '..'
import DatePanel from '../../date/DatePanel.vue'
import { delay, trigger } from '../../utils/test'
import VarDateRange from '../DateRange'

test('date-range plugin', () => {
  const app = createApp({}).use(DateRange)
  expect(app.component(DateRange.name)).toBeTruthy()
})

test('date-range confirm writes modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarDateRange, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      onChange,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-date-field-popover')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeFalsy()
  expect(document.querySelector('.mp-date-picker')).toBeTruthy()

  wrapper.getComponent(DatePanel).vm.$emit('select', ['2025-01-15', '2025-01-16'])
  await delay(0)
  await trigger(
    [...document.querySelectorAll('.mp-date-field-popover button')].find(
      (button) => button.textContent.trim() === '确认',
    ),
    'click',
  )
  await delay(300)

  expect(onUpdateModelValue).toHaveBeenCalled()
  expect(onChange).toHaveBeenCalled()
  expect(onUpdateModelValue.mock.calls[0][0]).toHaveLength(2)

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('date-range calendar presentation', async () => {
  const wrapper = mount(VarDateRange, {
    props: {
      modelValue: ['2024-01-01', '2024-12-31'],
      panelType: 'calendar',
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-date-picker')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeFalsy()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('date-range cancel does not write modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarDateRange, {
    props: {
      modelValue: ['2024-01-01', '2024-01-15'],
      'onUpdate:modelValue': onUpdateModelValue,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)
  await wrapper.find('input').trigger('keydown', { key: 'Escape' })
  await delay(300)

  expect(onUpdateModelValue).not.toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('date-range clear', async () => {
  const onUpdateModelValue = vi.fn()
  const onClear = vi.fn()
  const wrapper = mount(VarDateRange, {
    props: {
      modelValue: ['2024-01-01', '2024-01-15'],
      clearable: true,
      'onUpdate:modelValue': onUpdateModelValue,
      onClear,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator__clear-btn').trigger('click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith([])
  expect(onClear).toHaveBeenCalledWith()

  wrapper.unmount()
  document.body.innerHTML = ''
})
