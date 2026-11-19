import { mount, flushPromises } from '@vue/test-utils'
import { h, ref } from 'vue'
import { expect, it } from 'vitest'
import Input from '../../input'
import FormItem from '../FormItem.vue'

it('links the actual Input and switches to a named group for two fields', async () => {
  const second = ref(false)
  const wrapper = mount(FormItem, { attachTo: document.body, props: { label: 'Contact' }, slots: {
    default: () => [h(Input, { editMode: 'direct', clearable: true, modelValue: 'saved' }), second.value ? h('input', { 'aria-label': 'Phone' }) : null],
  } })
  try {
    await flushPromises()
    const label = wrapper.get('label').element
    const input = wrapper.get('input').element
    expect(label.control).toBe(input)
    second.value = true
    await flushPromises()
    expect(label.control).toBeNull()
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(label.id)
    second.value = false
    await flushPromises()
    expect(label.control).toBe(input)
    await wrapper.setProps({ labelAttrs: { for: 'other' } })
    expect(label.htmlFor).toBe('other')
  } finally { wrapper.unmount() }
})

it('releases only its own generated id when an input is replaced or explicitly named', async () => {
  const field = ref(true)
  const wrapper = mount(FormItem, { attachTo: document.body, props: { label: 'Contact' }, slots: {
    default: () => field.value ? h('input') : h('select'),
  } })
  try {
    await flushPromises()
    const label = wrapper.get('label').element
    const input = wrapper.get('input').element
    expect(label.control).toBe(input)
    field.value = false
    await flushPromises()
    expect(input.hasAttribute('id')).toBe(false)
    const select = wrapper.get('select').element
    expect(label.control).toBe(select)
    select.id = 'explicit-contact'
    await flushPromises()
    expect(label.control).toBe(select)
    await wrapper.setProps({ labelAttrs: { for: 'different' } })
    expect(select.id).toBe('explicit-contact')
  } finally { wrapper.unmount() }
})

it('updates the group when a mounted field is shown and isolates nested forms', async () => {
  const visible = ref(false)
  const wrapper = mount(FormItem, { attachTo: document.body, props: { label: 'Contact' }, slots: {
    default: () => [
      h('input', { id: 'email' }),
      h('div', { style: { display: visible.value ? '' : 'none' } }, [h('textarea')]),
    ],
  } })
  try {
    await flushPromises()
    const label = wrapper.get('label').element
    expect(label.htmlFor).toBe('email')
    visible.value = true
    await flushPromises()
    expect(label.control).toBeNull()
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(label.id)
    visible.value = false
    await flushPromises()
    expect(label.htmlFor).toBe('email')
    const nested = document.createElement('form')
    nested.innerHTML = '<input id="nested">'
    wrapper.get('#email').element.replaceWith(nested)
    await flushPromises()
    expect(label.control).toBeNull()
  } finally { wrapper.unmount() }
})

it('finds an editor inside a landmark and respects a widget owning the same subtree', async () => {
  const role = ref('region')
  const wrapper = mount(FormItem, { attachTo: document.body, props: { label: 'Contact' }, slots: {
    default: () => h('div', { role: role.value }, [h('input')]),
  } })
  try {
    await flushPromises()
    const label = wrapper.get('label').element
    const input = wrapper.get('input').element
    expect(label.control).toBe(input)
    role.value = 'unknown-role RADIOGROUP'
    await flushPromises()
    expect(label.control).toBeNull()
    role.value = 'region button'
    await flushPromises()
    expect(label.control).toBe(input)
  } finally { wrapper.unmount() }
})
