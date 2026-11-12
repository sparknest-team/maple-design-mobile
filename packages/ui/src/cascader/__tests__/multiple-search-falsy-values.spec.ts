import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test.each([
  { value: '', label: 'Empty value' },
  { value: 0, label: 'Zero value' },
])('multiple search retains checkbox identity for $label', async (option) => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      inputValue: option.label,
      options: [option],
    },
  })
  try {
    await flushPromises()
    const checkbox = wrapper.get('input[type="checkbox"]')
    const label = wrapper
      .findAll('[id]')
      .find((node) => node.attributes('id') === checkbox.attributes('aria-labelledby'))
    expect(label?.text()).toContain(option.label)
    ;(checkbox.element as HTMLElement).focus()
    expect(document.activeElement).toBe(checkbox.element)
    await checkbox.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([option.value])
  } finally {
    wrapper.unmount()
  }
})
