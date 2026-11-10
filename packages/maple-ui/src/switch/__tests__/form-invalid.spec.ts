import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import Switch from '../Switch.vue'

test('form errors override and then restore caller aria-invalid', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: false } },
    slots: {
      default: () => h(FormItem, { field: 'value', label: 'Value' }, () => h(Switch, { 'aria-invalid': false })),
    },
  })
  try {
    const target = wrapper.get('[role=switch]')
    expect(target.attributes('aria-invalid')).toBe('false')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
    await nextTick()
    expect(target.attributes('aria-invalid')).toBe('true')
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(target.attributes('aria-invalid')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})
