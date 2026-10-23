import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Time from '..'
import { delay, trigger } from '../../utils/test'
import VarTime from '../Time'

test('time plugin', () => {
  const app = createApp({}).use(Time)
  expect(app.component(Time.name)).toBeTruthy()
})

test('time confirm writes modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(VarTime, {
    props: { format: 'HH:mm', modelValue: undefined, 'onUpdate:modelValue': onUpdateModelValue, onChange },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-time__panel')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeTruthy()
  expect(document.querySelector('.mp-time-picker__confirm')).toBeFalsy()
  expect(document.querySelectorAll('.mp-time__confirm-button')).toHaveLength(1)

  await trigger(document.querySelector('.mp-time__confirm-button'), 'click')
  await delay(300)

  expect(onUpdateModelValue).toHaveBeenCalledWith('00:00')
  expect(onChange).toHaveBeenCalledWith('00:00', expect.any(Date))

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time cancel does not write modelValue', async () => {
  const onUpdateModelValue = vi.fn()
  const wrapper = mount(VarTime, {
    props: { format: 'HH:mm', modelValue: '12:30', 'onUpdate:modelValue': onUpdateModelValue },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)
  await wrapper.find('.mp-time').trigger('keydown', { key: 'Escape' })
  await delay(300)

  expect(onUpdateModelValue).not.toHaveBeenCalled()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time opens the wheel presentation', async () => {
  const wrapper = mount(VarTime, {
    props: {
      modelValue: '12:30',
      format: 'HH:mm',
    },
    attachTo: document.body,
  })

  await wrapper.find('.mp-field-decorator').trigger('click')
  await delay(300)

  expect(document.querySelector('.mp-time-picker__wheel')).toBeTruthy()
  expect(document.querySelector('.mp-picker')).toBeTruthy()

  wrapper.unmount()
  document.body.innerHTML = ''
})

test('time clear', async () => {
  const onUpdateModelValue = vi.fn()
  const onClear = vi.fn()
  const wrapper = mount(VarTime, {
    props: {
      format: 'HH:mm',
      modelValue: '12:30',
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
