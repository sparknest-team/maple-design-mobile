import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '..'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'

test('deferred select keeps external name and description with form errors', async () => {
  const labelledby = ref('name-a')
  const description = ref('help-a')
  const wrapper = mount(Form, {
    props: { model: { value: null } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Form label' }, () =>
          h(Select, {
            editMode: 'popup',
            popupContainer: false,
            'aria-labelledby': labelledby.value,
            'aria-describedby': description.value,
          }),
        ),
    },
  })
  try {
    const button = () => wrapper.get('button.mp-field-presentation__reference')
    expect(button().attributes('aria-labelledby')).toBe('name-a')
    expect(button().attributes('aria-describedby')).toBe('help-a')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid' } })
    await nextTick()
    const id = wrapper.get('.mp-form-details__error-message').attributes('id')
    expect(button().attributes('aria-describedby')?.split(/\s+/)).toEqual(['help-a', id])
    labelledby.value = 'name-b'
    description.value = 'help-b'
    await nextTick()
    expect(button().attributes('aria-labelledby')).toBe('name-b')
    expect(button().attributes('aria-describedby')?.split(/\s+/)).toEqual(['help-b', id])
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(button().attributes('aria-describedby')).toBe('help-b')
    await button().trigger('click')
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 30))
    await flushPromises()
    expect(wrapper.get('[role=dialog]').attributes('aria-labelledby')).toBe('name-b')
  } finally {
    wrapper.unmount()
  }
})
