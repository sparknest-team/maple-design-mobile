import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

test.each([
  [false, 'open'],
  [true, 'open'],
  [false, 'closed'],
  [true, 'closed'],
] as const)(
  'updates search ownership when a popup container moves between roots: multiple=%s, root=%s',
  async (multiple, mode) => {
    const host = document.createElement('div')
    document.body.append(host)
    const root = host.attachShadow({ mode })
    const mountPoint = document.createElement('div')
    const popup = document.createElement('div')
    root.append(mountPoint, popup)
    const wrapper = mount(Cascader, {
      attachTo: mountPoint,
      props: {
        options: [{ value: 'a', label: 'Alpha' }],
        multiple,
        filterable: true,
        inputValue: 'Alpha',
        defaultOpen: true,
        editMode: 'direct',
        popupContainer: popup,
      },
    })
    try {
      await flushPromises()
      const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
      const list = popup.querySelector<HTMLElement>(multiple ? '[role="dialog"]' : '[role="listbox"]')!
      expect(input.getAttribute('aria-controls')).toBe(list.id)
      if (!multiple) {
        input.focus()
        input.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true, cancelable: true }),
        )
        await flushPromises()
        expect(root.getElementById(input.getAttribute('aria-activedescendant')!)).toBeTruthy()
      }
      document.body.append(popup)
      await flushPromises()
      expect(input.hasAttribute('aria-controls')).toBe(false)
      expect(input.hasAttribute('aria-activedescendant')).toBe(false)
      root.append(popup)
      await flushPromises()
      expect(input.getAttribute('aria-controls')).toBe(list.id)
      if (!multiple) {
        expect(root.getElementById(input.getAttribute('aria-activedescendant')!)).toBeTruthy()
      }
    } finally {
      wrapper.unmount()
      host.remove()
      popup.remove()
    }
  },
)

test('restores ownership when a detached popup is later inserted into a previously unrelated nested container', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  const target = document.createElement('div')
  const deepParent = document.createElement('section')
  root.append(mountPoint, target, deepParent)
  const wrapper = mount(Cascader, {
    attachTo: mountPoint,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: target,
    },
  })
  try {
    await flushPromises()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const panel = target.querySelector<HTMLElement>('[role="listbox"]')!
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
    target.remove()
    await flushPromises()
    expect(input.hasAttribute('aria-controls')).toBe(false)
    const rootReads = vi.spyOn(input, 'getRootNode')
    deepParent.append(document.createElement('i'))
    await flushPromises()
    expect(rootReads).not.toHaveBeenCalled()
    rootReads.mockRestore()
    deepParent.append(target)
    await flushPromises()
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
  } finally {
    wrapper.unmount()
    host.remove()
    target.remove()
  }
})

test('updates ownership when the popup container moves to another document and back', async () => {
  const host = document.createElement('div')
  const frame = document.createElement('iframe')
  document.body.append(host, frame)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  const target = document.createElement('div')
  root.append(mountPoint, target)
  const wrapper = mount(Cascader, {
    attachTo: mountPoint,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: target,
    },
  })
  try {
    await flushPromises()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const panel = target.querySelector<HTMLElement>('[role="listbox"]')!
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
    frame.contentDocument!.body.append(target)
    await flushPromises()
    expect(input.hasAttribute('aria-controls')).toBe(false)
    root.append(target)
    await flushPromises()
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
  } finally {
    wrapper.unmount()
    host.remove()
    frame.remove()
    target.remove()
  }
})
