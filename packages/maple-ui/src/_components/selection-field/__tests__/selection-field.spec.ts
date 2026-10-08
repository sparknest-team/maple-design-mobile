import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SelectionField from '../SelectionField.vue'

const items = [
  { key: 'device-1', value: 1, label: '同名设备' },
  { key: 'device-2', value: 2, label: '同名设备' },
]

describe('SelectionField', () => {
  test('removes by identity instead of label and keeps tags controlled', async () => {
    const wrapper = mount(SelectionField, { props: { items, multiple: true } })
    await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
    expect(wrapper.emitted('remove')).toEqual([['device-2']])
    expect(wrapper.findAll('.mp-tag')).toHaveLength(2)
    wrapper.unmount()
  })

  test('does not remove disabled or readonly values', async () => {
    const wrapper = mount(SelectionField, {
      props: { items: [{ ...items[0], closable: false }, items[1]], multiple: true, readonly: true, clearable: true },
    })
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    await wrapper.get('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.emitted('remove')).toBeUndefined()
    await wrapper.setProps({ readonly: false })
    await wrapper.get('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.emitted('remove')).toEqual([['device-2']])
    wrapper.unmount()
  })

  test('commits IME input once and does not forward composing Enter', async () => {
    const wrapper = mount(SelectionField, { props: { searchable: true } })
    const input = wrapper.get('input')
    await input.trigger('compositionstart')
    input.element.value = '中文'
    await input.trigger('input')
    await input.trigger('keydown', { key: 'Enter', isComposing: true })
    expect(wrapper.emitted('update:inputValue')).toBeUndefined()
    expect(wrapper.emitted('keydown')).toBeUndefined()
    await input.trigger('compositionend')
    expect(wrapper.emitted('update:inputValue')).toEqual([['中文']])
    await wrapper.setProps({ inputValue: '中文' })
    await input.trigger('input')
    expect(wrapper.emitted('update:inputValue')).toHaveLength(1)
    wrapper.unmount()
  })

  test('uses the default clear button unless a slot is provided', async () => {
    const wrapper = mount(SelectionField, { props: { items, clearable: true } })
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })

  test('exposes an actual focusable combobox and associates the floating label', async () => {
    const wrapper = mount(SelectionField, {
      attachTo: document.body,
      props: { hint: true, placeholder: '设备', open: true },
    })
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    expect(wrapper.get('input').attributes('role')).toBe('combobox')
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('label').attributes('for')).toBe(wrapper.get('input').attributes('id'))
    expect(wrapper.emitted('focus')).toHaveLength(1)
    wrapper.vm.blur()
    expect(wrapper.emitted('blur')).toHaveLength(1)
    wrapper.unmount()
  })

  test('limits visible tags without losing selection and preserves custom labels', () => {
    const wrapper = mount(SelectionField, {
      props: { items, multiple: true, maxTagCount: 1 },
      slots: { label: '<b>自定义</b>' },
    })
    expect(wrapper.findAll('.mp-tag')).toHaveLength(2)
    expect(wrapper.text()).toContain('+1')
    expect(wrapper.get('b').text()).toBe('自定义')
    wrapper.unmount()
  })
})
