import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test('ArrowDown in a custom option combobox stays with that input', async () => {
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
      options: [{ value: 'a', label: 'Alpha' }],
    },
    slots: { option: () => h('input', { class: 'nested-combobox', role: 'combobox' }) },
  })
  try {
    await flushPromises()
    const input = wrapper.get('[role="dialog"] .nested-combobox').element as HTMLInputElement
    input.focus()
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    input.dispatchEvent(event)
    await flushPromises()
    expect(event.defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(input)
  } finally {
    wrapper.unmount()
  }
})
