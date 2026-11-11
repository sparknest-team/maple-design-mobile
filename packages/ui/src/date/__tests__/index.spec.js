import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Date from '..'
import DatePanel from '../../date/DatePanel.vue'
import { delay, trigger } from '../../utils/test'
import VarDate from '../Date'

test('date plugin', () => {
  const app = createApp({}).use(Date)
  expect(app.component(Date.name)).toBeTruthy()
})

test('date confirm writes modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarDate, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      onChange,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-date-field-popover')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeFalsy()
  expect(document.querySelector('.mp-date-picker__body')).toBeTruthy()

  wrapper.getComponent(DatePanel).vm.$emit('select', '2025-01-15')
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

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('date cancel does not write modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarDate, {
    props: {
      modelValue: '2024-01-01',
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

test('date clear', async () => {
  const onUpdateModelValue = vi.fn()
  const onClear = vi.fn()
  const wrapper = mount(VarDate, {
    props: {
      modelValue: '2024-01-01',
      clearable: true,
      'onUpdate:modelValue': onUpdateModelValue,
      onClear,
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator__clear-btn').trigger('click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith(undefined)
  expect(onClear).toHaveBeenCalledWith()

  wrapper.unmount()
  document.body.innerHTML = ''
})
