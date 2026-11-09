import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'
import { useFormErrorDescription } from '../index'

test('custom controls can merge and clear a form error through the public hook', async () => {
  const CustomControl = defineComponent({
    setup() {
      const { describe } = useFormErrorDescription()
      return () => h('button', { 'aria-describedby': describe('help') }, 'Custom')
    },
  })
  const wrapper = mount(Form, {
    props: { model: { value: '' } },
    slots: { default: () => h(FormItem, { field: 'value' }, () => h(CustomControl)) },
  })
  try {
    expect(wrapper.get('button').attributes('aria-describedby')).toBe('help')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(`help ${id}`)
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(wrapper.get('button').attributes('aria-describedby')).toBe('help')
  } finally {
    wrapper.unmount()
  }
})

test('outside FormItem the hook preserves caller descriptions without creating an error reference', () => {
  const CustomControl = defineComponent({
    setup() {
      const { describe } = useFormErrorDescription()
      return () => h('button', { 'aria-describedby': describe('help details') }, 'Custom')
    },
  })
  const wrapper = mount(CustomControl)
  expect(wrapper.get('button').attributes('aria-describedby')).toBe('help details')
  wrapper.unmount()
})
