import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

test('stops observing a closed search popup and restores ownership when reopened', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const mountPoint = document.createElement('div')
  const popup = document.createElement('div')
  root.append(mountPoint, popup)
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const wrapper = mount(Cascader, {
    attachTo: mountPoint,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      open: true,
      editMode: 'direct',
      popupContainer: popup,
    },
  })
  try {
    await flushPromises()
    const observers = observe.mock.contexts.filter(
      (observer, index) =>
        observe.mock.calls[index][0] === popup &&
        observe.mock.contexts.some((other, i) => other === observer && observe.mock.calls[i][0] === mountPoint),
    )
    const owned = observers.at(-1)!
    expect(owned).toBeTruthy()
    observe.mockClear()
    disconnect.mockClear()
    await wrapper.setProps({ open: false })
    await flushPromises()
    expect(disconnect.mock.contexts).toContain(owned)
    expect(observe.mock.contexts).not.toContain(owned)
    document.body.append(popup)
    await wrapper.setProps({ open: true })
    await flushPromises()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    expect(input.hasAttribute('aria-controls')).toBe(false)
    root.append(popup)
    await flushPromises()
    expect(input.getAttribute('aria-controls')).toBe(popup.querySelector('[role="listbox"]')?.id)
  } finally {
    wrapper.unmount()
    observe.mockRestore()
    disconnect.mockRestore()
    host.remove()
    popup.remove()
  }
})
