import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import Input from '../../input'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
test('Cascader field keeps its error description without assigning it to option checkboxes', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(Cascader, {
            multiple: true,
            editMode: 'direct',
            defaultOpen: true,
            popupContainer: false,
            options,
            'aria-describedby': 'external',
          }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid selection' } })
    await flushPromises()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    const field = wrapper.get('input[role="combobox"]')
    expect(field.attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
    const checks = wrapper.findAll('input[type="checkbox"]')
    expect(checks).toHaveLength(2)
    for (const checkbox of checks) {
      expect(checkbox.attributes('aria-describedby')).toBeUndefined()
      expect(checkbox.attributes('aria-invalid')).toBeUndefined()
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(field.attributes('aria-describedby')).toBe('external')
  } finally {
    wrapper.unmount()
  }
})

test('editor field keeps the error while option checkboxes do not inherit it', async () => {
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(Cascader, {
            multiple: true,
            editMode: 'popup',
            popupContainer: false,
            options,
            'aria-describedby': 'external',
          }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid selection' } })
    await nextTick()
    const id = wrapper
      .findAll('[role=alert]')
      .map((node) => node.element.closest('[id]')?.id)
      .find(Boolean)!
    const trigger = wrapper.get('[aria-haspopup="dialog"]')
    expect(trigger.attributes('aria-describedby')?.split(/\s+/)).toContain(id)
    await trigger.trigger('click')
    await flushPromises()
    const search = wrapper.getComponent(EditorPanel).get('input:not([type="checkbox"])')
    expect(search.attributes('aria-describedby')?.split(/\s+/) ?? []).not.toContain(id)
    expect(search.attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.getComponent(EditorPanel).get('[role=alert]').text()).toBe('Invalid selection')
    const checks = wrapper.getComponent(EditorPanel).findAll('input[type="checkbox"]')
    expect(checks).toHaveLength(2)
    for (const checkbox of checks) {
      expect(checkbox.attributes('aria-describedby')?.split(/\s+/) ?? []).not.toContain(id)
    }
    expect(trigger.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
  } finally {
    wrapper.unmount()
  }
})

test('an independently nested FormItem inside an option keeps its own error', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: [], child: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(
            Cascader,
            { multiple: true, editMode: 'direct', defaultOpen: true, popupContainer: false, options: [options[0]] },
            {
              option: () => h(FormItem, { field: 'child', label: 'Child' }, () => h(Input, { 'aria-label': 'Inner' })),
            },
          ),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Selection error' }, child: { message: 'Child error' } })
    await flushPromises()
    const alert = wrapper.findAll('[role=alert]').find((node) => node.text() === 'Child error')!
    const childId = alert.element.closest('[id]')!.id
    const input = wrapper.get('input[aria-label="Inner"]')
    expect(input.attributes('aria-describedby')?.split(/\s+/)).toContain(childId)
    expect(wrapper.get('input[role="combobox"]').attributes('aria-describedby')?.split(/\s+/)).not.toContain(childId)
  } finally {
    wrapper.unmount()
  }
})
