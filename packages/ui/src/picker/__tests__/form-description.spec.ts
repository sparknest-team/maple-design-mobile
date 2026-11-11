import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import Picker from '../Picker.vue'

test('each picker column preserves its description and tracks its form error', async () => {
  const wrapper = mount(Form, {
    props: { model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(Picker, {
            columns: [[{ text: 'A', value: 'a' }], [{ text: 'B', value: 'b' }]],
            'aria-describedby': 'external',
            'aria-invalid': false,
          }),
        ),
    },
  })
  try {
    const columns = () => wrapper.findAll('[role="listbox"]')
    expect(columns()).toHaveLength(2)
    expect(columns().map((column) => column.attributes('aria-describedby'))).toEqual(['external', 'external'])
    expect(columns().map((column) => column.attributes('aria-invalid'))).toEqual(['false', 'false'])
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid selection' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    for (const column of columns()) {
      expect(column.attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', id])
      expect(column.attributes('aria-invalid')).toBe('true')
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    for (const column of columns()) {
      expect(column.attributes('aria-describedby')).toBe('external')
      expect(column.attributes('aria-invalid')).toBe('false')
    }
  } finally {
    wrapper.unmount()
  }
})

test('a teleported picker updates the focused column when descriptions and errors change', async () => {
  const description = ref('first-help')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(Picker, {
            dynamic: true,
            open: true,
            columns: [[{ text: 'A', value: 'a' }]],
            'aria-describedby': description.value,
          }),
        ),
    },
  })
  try {
    await vi.waitFor(() => expect(document.querySelector('[role="listbox"]')).not.toBeNull())
    const column = document.querySelector('[role="listbox"]') as HTMLElement
    column.focus()
    expect(document.activeElement).toBe(column)
    expect(column.getAttribute('aria-describedby')).toBe('first-help')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid selection' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(column.getAttribute('aria-describedby')).toBe(`first-help ${id}`)
    description.value = 'second-help'
    await nextTick()
    expect(column.getAttribute('aria-describedby')).toBe(`second-help ${id}`)
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(column.getAttribute('aria-describedby')).toBe('second-help')
    expect(document.activeElement).toBe(column)
  } finally {
    wrapper.unmount()
  }
})
