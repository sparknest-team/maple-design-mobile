import { createApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import VerificationCode from '..'
import { delay } from '../../utils/test'
import VarVerificationCode from '../VerificationCode.vue'

test('verification-code plugin', () => {
  const app = createApp({}).use(VerificationCode)
  expect(app.component(VerificationCode.name)).toBeTruthy()
})

describe('verification-code', () => {
  test('input digits and emit finish', async () => {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
    const onChange = vi.fn()
    const onFinish = vi.fn()
    const onInput = vi.fn()

    const wrapper = mount(VarVerificationCode, {
      props: {
        editMode: 'direct',
        modelValue: '',
        length: 4,
        onChange,
        onFinish,
        onInput,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const inputs = wrapper.findAll('.mp-input__inner')

    await inputs[0].setValue('1')
    await inputs[1].setValue('2')
    await inputs[2].setValue('3')
    await inputs[3].setValue('4')

    expect(onUpdateModelValue).toHaveBeenLastCalledWith('1234')
    expect(onChange).toHaveBeenLastCalledWith('1234')
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenLastCalledWith('1234')
    expect(onInput).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('paste transform and separator slot', async () => {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
    const onPaste = vi.fn()

    const wrapper = mount(VarVerificationCode, {
      props: {
        editMode: 'direct',
        modelValue: '',
        length: 6,
        type: 'alphanumeric',
        pasteTransform: (value) => value.replace(/[-\s]/g, '').toUpperCase(),
        onPaste,
        'onUpdate:modelValue': onUpdateModelValue,
      },
      slots: {
        separator: ({ index }) => (index === 2 ? '-' : null),
      },
    })

    await wrapper.trigger('paste', {
      clipboardData: {
        getData: () => 'ab-12 c3',
      },
    })

    expect(onPaste).toHaveBeenCalledTimes(1)
    expect(onPaste.mock.calls[0][0]).toBe('AB12C3')
    expect(onUpdateModelValue).toHaveBeenLastCalledWith('AB12C3')
    expect(wrapper.find('.mp-verification-code__separator').text()).toBe('-')

    wrapper.unmount()
  })

  test('formatter rejects non-digit chars', async () => {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarVerificationCode, {
      props: {
        editMode: 'direct',
        modelValue: '',
        length: 4,
        type: 'text',
        formatter: (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false),
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const inputs = wrapper.findAll('.mp-input__inner')
    await inputs[0].setValue('a')
    expect(onUpdateModelValue).not.toHaveBeenCalled()

    await inputs[0].setValue('1')
    expect(onUpdateModelValue).toHaveBeenLastCalledWith('1')

    wrapper.unmount()
  })

  test('masked mode shows mask symbol', async () => {
    const wrapper = mount(VarVerificationCode, {
      props: { editMode: 'direct', modelValue: '12', length: 4, masked: true, maskSymbol: '*' },
    })

    const inputs = wrapper.findAll('.mp-input__inner')
    expect(inputs[0].element.value).toBe('*')
    expect(inputs[1].element.value).toBe('*')
    expect(inputs[2].element.value).toBe('')

    wrapper.unmount()
  })

  test('separator prop renders', async () => {
    const wrapper = mount(VarVerificationCode, {
      props: {
        editMode: 'direct',
        modelValue: '12',
        length: 4,
        separator: (index) => (index === 1 ? h('span', { class: 'custom-sep' }, '-') : null),
      },
    })

    expect(wrapper.find('.custom-sep').text()).toBe('-')
    wrapper.unmount()
  })

  test('error and size classes', async () => {
    const wrapper = mount(VarVerificationCode, {
      props: { editMode: 'direct', modelValue: '', length: 4, error: true, size: 'lg' },
    })

    expect(wrapper.classes()).toContain('mp-verification-code--size-lg')

    wrapper.unmount()
  })

  test('disabled prevents input update', async () => {
    const wrapper = mount(VarVerificationCode, {
      props: { editMode: 'direct', modelValue: '', length: 4, disabled: true },
    })

    const inputs = wrapper.findAll('.mp-input__inner')
    expect(inputs[0].attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  test('focus method focuses first empty cell', async () => {
    const wrapper = mount(VarVerificationCode, {
      props: { editMode: 'direct', modelValue: '12', length: 4 },
      attachTo: document.body,
    })

    await wrapper.vm.focus()
    await delay(20)
    await nextTick()

    const inputs = wrapper.findAll('.mp-input__inner')
    expect(document.activeElement).toBe(inputs[2].element)

    wrapper.unmount()
  })
})
