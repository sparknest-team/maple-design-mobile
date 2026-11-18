import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test.each(['open', 'closed'] as const)('single search references follow a %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode })
  const target = document.createElement('div')
  root.append(target)
  const wrapper = mount(Cascader, {
    attachTo: target,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
  })
  try {
    await flushPromises()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const list = root.querySelector<HTMLElement>('[role="listbox"]')!
    expect(input.getAttribute('aria-controls')).toBe(list.id)
    input.focus()
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true, cancelable: true }),
    )
    await flushPromises()
    expect(root.getElementById(input.getAttribute('aria-activedescendant')!)).toBeTruthy()
    await wrapper.setProps({ popupContainer: 'body' })
    await flushPromises()
    expect(document.body.querySelector('[role="listbox"]')).toBe(list)
    expect(input.hasAttribute('aria-controls')).toBe(false)
    expect(input.hasAttribute('aria-activedescendant')).toBe(false)
    await wrapper.setProps({ popupContainer: false })
    await flushPromises()
    expect(input.getAttribute('aria-controls')).toBe(list.id)
    expect(root.getElementById(input.getAttribute('aria-activedescendant')!)).toBeTruthy()
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
