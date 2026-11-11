import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SelectionField from '../SelectionField.vue'

const items = [
  { key: 'device-1', value: 1, label: '同名设备' },
  { key: 'device-2', value: 2, label: '同名设备' },
]

describe('SelectionField', () => {
  test('truncates nowrap tag text separately from its removal action and keeps overflow values reachable', async () => {
    const label = 'A very long selected option label for overflow comparison'
    const wrapper = mount(SelectionField, {
      props: {
        multiple: true,
        tagNowrap: true,
        clearable: true,
        searchable: true,
        items: [{ key: 'long', value: 'long', label, tagProps: { nowrap: false } }, ...items],
      },
    })
    try {
      const tags = wrapper.findAll('.mp-selection-field__tag')
      expect(tags).toHaveLength(3)
      expect(tags[0].get('.mp-tag__text').text()).toBe(label)
      expect(tags[0].get('.mp-tag__text').find('.mp-tag__close-btn').exists()).toBe(false)
      await tags[0].get('.mp-tag__close-btn').trigger('click')
      expect(wrapper.emitted('remove')).toEqual([['long']])
      expect(wrapper.get('input').attributes('readonly')).toBeUndefined()
      await wrapper.setProps({ maxTagCount: 1 })
      expect(wrapper.get('.mp-selection-field__summary').text()).toBe('+2')
      await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
      expect(wrapper.emitted('clear')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })

  test('honors per-option tag size while keeping the default and selection identity', async () => {
    const wrapper = mount(SelectionField, {
      props: { multiple: true, items: [{ ...items[0], tagProps: { size: 'lg' } }, items[1]] },
    })
    expect(wrapper.findAll('.mp-tag')[0].classes()).toContain('mp-tag--size-lg')
    expect(wrapper.findAll('.mp-tag')[1].classes()).toContain('mp-tag--size-sm')
    await wrapper.setProps({ items: [{ ...items[0], tagProps: { size: 'xl' } }, items[1]] })
    expect(wrapper.findAll('.mp-tag')[0].classes()).toContain('mp-tag--size-xl')
    await wrapper.findAll('.mp-tag__close-btn')[0].trigger('click')
    expect(wrapper.emitted('remove')).toEqual([['device-1']])
    wrapper.unmount()
  })

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

  test('exposes a focusable combobox and a decorative floating hint', async () => {
    const wrapper = mount(SelectionField, {
      attachTo: document.body,
      props: { hint: true, placeholder: '设备', open: true },
    })
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    expect(wrapper.get('input').attributes('role')).toBe('combobox')
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('[aria-hidden="true"].mp-field-decorator__placeholder').exists()).toBe(true)
    expect(wrapper.get('input').attributes('placeholder')).toBeTruthy()
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
