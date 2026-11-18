import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

test('disconnects the popup root observer when a cached Cascader is deactivated and unmounted', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const mountPoint = document.createElement('div')
  const popup = document.createElement('div')
  root.append(mountPoint, popup)
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const visible = ref(true)
  const wrapper = mount(
    {
      render: () =>
        h(KeepAlive, null, () =>
          visible.value
            ? h(Cascader, {
                options: [{ value: 'a', label: 'Alpha' }],
                filterable: true,
                inputValue: 'Alpha',
                open: true,
                editMode: 'direct',
                popupContainer: popup,
              })
            : null,
        ),
    },
    { attachTo: mountPoint },
  )
  try {
    await flushPromises()
    const observers = observe.mock.contexts.filter(
      (observer, index) =>
        observe.mock.calls[index][0] === popup &&
        observe.mock.contexts.some((other, i) => other === observer && observe.mock.calls[i][0] === mountPoint),
    )
    expect(observers.length).toBeGreaterThan(0)
    const owned = observers.at(-1)!
    disconnect.mockClear()
    observe.mockClear()
    visible.value = false
    await flushPromises()
    expect(disconnect.mock.contexts).toContain(owned)
    expect(observe.mock.contexts).not.toContain(owned)
    visible.value = true
    await flushPromises()
    const resumed = observe.mock.contexts
      .filter(
        (observer, index) =>
          observe.mock.calls[index][0] === popup &&
          observe.mock.contexts.some((other, i) => other === observer && observe.mock.calls[i][0] === mountPoint),
      )
      .at(-1)
    expect(resumed).toBeTruthy()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const panel = popup.querySelector<HTMLElement>('[role="listbox"]')!
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
    disconnect.mockClear()
    wrapper.unmount()
    expect(disconnect.mock.contexts).toContain(resumed)
  } finally {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
    observe.mockRestore()
    disconnect.mockRestore()
    host.remove()
  }
})
