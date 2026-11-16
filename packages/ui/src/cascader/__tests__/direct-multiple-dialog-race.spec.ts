import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test('does not reclaim focus moved after Escape before the deferred check', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
    },
  })
  try {
    await flushPromises()
    const checkbox = wrapper.get('[title="Alpha"] input[type="checkbox"]')
    ;(checkbox.element as HTMLElement).focus()
    checkbox.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    outside.focus()
    await flushPromises()
    expect(document.activeElement).toBe(outside)
    expect(wrapper.get('input[role="combobox"]').attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})
