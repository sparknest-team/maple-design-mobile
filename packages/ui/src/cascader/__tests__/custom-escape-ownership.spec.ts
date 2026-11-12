import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test('Escape on a custom option control retains its own focus', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      searchOptionOnlyLabel: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
    },
    slots: {
      option: () =>
        h(
          'button',
          { type: 'button', 'data-custom': '', onKeydown: (event: KeyboardEvent) => event.preventDefault() },
          'Custom',
        ),
    },
  })
  try {
    await flushPromises()
    const button = wrapper.get('[data-custom]')
    const input = wrapper.get('input[role="combobox"]')
    ;(button.element as HTMLElement).focus()
    button.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(document.activeElement).toBe(button.element)
    expect(input.attributes('aria-expanded')).toBe('true')
  } finally {
    wrapper.unmount()
  }
})
