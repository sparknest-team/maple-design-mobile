import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Textarea from '..'
import VarTextarea from '../Textarea.vue'

test('textarea plugin', () => {
  const app = createApp({}).use(Textarea)
  expect(app.component(Textarea.name)).toBeTruthy()
})

test('textarea render', () => {
  const wrapper = mount(VarTextarea, { props: { modelValue: 'text', placeholder: '请输入' } })
  expect(wrapper.find('textarea').element.value).toBe('text')
  expect(wrapper.html()).toMatchSnapshot()
})

describe('textarea events', () => {
  test('updates model value and emits input', async () => {
    const onUpdateModelValue = vi.fn()
    const onInput = vi.fn()
    const wrapper = mount(VarTextarea, {
      props: { 'onUpdate:modelValue': onUpdateModelValue, onInput },
    })

    await wrapper.find('textarea').setValue('hello')
    expect(onUpdateModelValue).lastCalledWith('hello')
    expect(onInput).toHaveBeenCalledTimes(1)
  })

  test('clears value', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(VarTextarea, {
      props: { modelValue: 'hello', clearable: true, 'onUpdate:modelValue': onUpdateModelValue },
    })

    await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
    expect(onUpdateModelValue).lastCalledWith('')
  })
})

test('textarea maxlength', () => {
  const wrapper = mount(VarTextarea, { props: { modelValue: 'text', maxlength: 100 } })
  expect(wrapper.find('.mp-textarea__length').text()).toBe('4/100')
})

test('textarea exposes focus and blur', () => {
  const wrapper = mount(VarTextarea)
  expect(wrapper.vm.focus).toBeTypeOf('function')
  expect(wrapper.vm.blur).toBeTypeOf('function')
})
