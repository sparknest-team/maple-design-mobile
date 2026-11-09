import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import NumberKeyboard from '../NumberKeyboard.vue'

test('the keyboard dialog merges the form error with the caller description', async () => {
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(NumberKeyboard, { open: true, 'aria-describedby': 'external' }),
        ),
    },
  })
  try {
    await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull())
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.getAttribute('aria-describedby')).toBe('external')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(dialog.getAttribute('aria-describedby')).toBe(`external ${id}`)
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(dialog.getAttribute('aria-describedby')).toBe('external')
  } finally {
    wrapper.unmount()
  }
})
