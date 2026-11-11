import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Switch from '../../switch'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('Form disables inherited fields and explicit false remains interactive without FormItem', async () => {
  const owner = mount(Form, {
    props: { disabled: true },
    slots: { default: () => [h(Input), h(Input, { disabled: false }), h(Switch), h(Switch, { disabled: false })] },
  })
  try {
    await flushPromises()
    const inputs = owner.findAllComponents(Input)
    const switches = owner.findAllComponents(Switch)
    expect(inputs[0].get('input').attributes('disabled')).toBeDefined()
    expect(inputs[1].get('input').attributes('disabled')).toBeUndefined()
    expect(switches[0].get('[role=switch]').attributes('aria-disabled')).toBe('true')
    expect(switches[1].get('[role=switch]').attributes('aria-disabled')).toBeUndefined()
    await owner.setProps({ disabled: false })
    expect(inputs[0].get('input').attributes('disabled')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
test('FormItem can override the form and a field can override FormItem', async () => {
  const owner = mount(Form, {
    props: { disabled: true },
    slots: {
      default: () => h(FormItem, { disabled: false }, { default: () => [h(Input), h(Input, { disabled: true })] }),
    },
  })
  try {
    await flushPromises()
    const inputs = owner.findAllComponents(Input)
    expect(inputs[0].get('input').attributes('disabled')).toBeUndefined()
    expect(inputs[1].get('input').attributes('disabled')).toBeDefined()
  } finally {
    owner.unmount()
  }
})
