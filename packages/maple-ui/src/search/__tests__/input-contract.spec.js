import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Search from '../index'

describe('Search input dependency contract', () => {
  test('commits trim through model updates before Enter search', async () => {
    const wrapper = mount(Search, { props: { defaultValue: ' query ', modelModifiers: { trim: true } } })
    await wrapper.get('input.mp-input__inner').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['query']])
    expect(wrapper.emitted('change')[0][0]).toBe('query')
    expect(wrapper.emitted('search')[0][0].modelValue).toBe('query')
    wrapper.unmount()
  })
  test('Enter search waits for accepted controlled trim', async () => {
    const wrapper = mount(Search, {
      props: {
        modelValue: ' query ',
        modelModifiers: { trim: true },
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })
    await wrapper.get('input.mp-input__inner').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')[0][0].modelValue).toBe('query')
    wrapper.unmount()
  })
  test('Enter search uses actual model when controlled trim is rejected', async () => {
    const wrapper = mount(Search, { props: { modelValue: ' query ', modelModifiers: { trim: true } } })
    await wrapper.get('input.mp-input__inner').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['query']])
    expect(wrapper.emitted('search')[0][0].modelValue).toBe(' query ')
    wrapper.unmount()
  })

  test('emits input before update, then commits once on blur', async () => {
    const order = []
    const wrapper = mount(Search, {
      props: {
        defaultValue: 'draft',
        onInput: () => order.push('input'),
        'onUpdate:modelValue': () => order.push('update'),
        onChange: () => order.push('change'),
      },
    })
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await input.setValue('query')
    expect(order).toEqual(['input', 'update'])
    await input.trigger('blur')
    await input.trigger('blur')
    expect(order).toEqual(['input', 'update', 'change'])
    wrapper.unmount()
  })

  test('clear updates the field model once and never submits', async () => {
    const order = []
    const model = { name: 'draft', id: undefined }
    const wrapper = mount(Search, {
      props: {
        defaultValue: 'draft',
        clearable: true,
        model,
        defaultField: 'name',
        fields: [
          { value: 'name', label: 'Name' },
          { value: 'id', label: 'ID' },
        ],
        onClear: () => order.push('clear'),
        onInput: () => order.push('input'),
        'onUpdate:modelValue': () => order.push('update'),
        onChange: () => order.push('change'),
      },
    })
    await wrapper.get('input.mp-input__inner').trigger('focus')
    await wrapper.get('.mp-input .mp-field-decorator__clear-btn').trigger('click')
    expect(order).toEqual(['clear', 'input', 'update', 'change'])
    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
    expect(wrapper.emitted('update:model')).toHaveLength(1)
    expect(model).toEqual({ name: 'draft', id: undefined })
    expect(wrapper.emitted('update:model')[0][0]).toEqual({ name: '', id: undefined })
    expect(wrapper.emitted('search')).toBeUndefined()
    await wrapper.get('input.mp-input__inner').trigger('blur')
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
})
