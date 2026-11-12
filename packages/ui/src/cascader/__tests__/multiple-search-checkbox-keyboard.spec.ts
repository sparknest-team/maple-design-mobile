import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test('a focused multiple-search checkbox keeps ownership of vertical arrows', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: 'Alpha',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Alpha two' },
      ],
    },
  })
  try {
    await flushPromises()
    const checkbox = wrapper.get('[title="Alpha"] input[type="checkbox"]')
    ;(checkbox.element as HTMLElement).focus()
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    checkbox.element.dispatchEvent(event)
    await flushPromises()
    expect(event.defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(checkbox.element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
