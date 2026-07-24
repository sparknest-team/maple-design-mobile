import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Date from '..'
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

  expect(document.querySelector('.mp-date__panel')).toBeTruthy()
  expect(document.querySelector('.mp-date-picker')).toBeTruthy()

  await trigger(document.querySelector('.mp-date__confirm-button'), 'click')
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
  await trigger(document.querySelector('.mp-date__cancel-button'), 'click')
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

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  await delay(16)

  expect(onUpdateModelValue).toHaveBeenCalledWith(undefined)
  expect(onClear).toHaveBeenCalledWith(undefined)

  wrapper.unmount()
  document.body.innerHTML = ''
})
