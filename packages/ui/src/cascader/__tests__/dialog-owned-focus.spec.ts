import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '..'

test('ArrowDown skips a custom checkbox in a disabled result and focuses the next selectable result', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: 'Alpha',
      searchOptionOnlyLabel: true,
      options: [
        { value: 'a', label: 'Alpha disabled', disabled: true },
        { value: 'b', label: 'Alpha enabled' },
      ],
    },
    slots: { option: () => h('input', { type: 'checkbox', class: 'custom-checkbox' }) },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    const expected = wrapper.get('[title="Alpha enabled"] [class$="-option-checkbox"] input[type="checkbox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(expected.element)
  } finally {
    wrapper.unmount()
  }
})

test('ArrowDown stays on the input when only a custom checkbox is enabled', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: 'Alpha',
      searchOptionOnlyLabel: true,
      options: [{ value: 'a', label: 'Alpha disabled', disabled: true }],
    },
    slots: { option: () => h('input', { type: 'checkbox', class: 'custom-checkbox' }) },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})
