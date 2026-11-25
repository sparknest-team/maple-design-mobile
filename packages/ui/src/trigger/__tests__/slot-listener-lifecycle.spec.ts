import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Trigger from '../trigger'

it('releases popup positioning on close and both slot subscriptions on deactivation and unmount', async () => {
  const host = document.createElement('div'),
    mountPoint = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' }),
    slot = document.createElement('slot')
  shadow.append(slot)
  host.append(mountPoint)
  document.body.append(host)
  const add = vi.spyOn(shadow, 'addEventListener'),
    remove = vi.spyOn(shadow, 'removeEventListener')
  const active = ref(true),
    opened = ref(true)
  const wrapper = mount(
    {
      setup: () => () =>
        h(KeepAlive, null, () =>
          active.value
            ? h(
                Trigger,
                { open: opened.value, updateAtScroll: true },
                { default: () => h('button'), content: () => h('div') },
              )
            : null,
        ),
    },
    { attachTo: mountPoint },
  )
  const live = () => {
    const listeners = new Set<EventListenerOrEventListenerObject>()
    const changes = [add, remove].flatMap((spy) =>
      spy.mock.calls.map(([type, listener], index) => ({
        type,
        listener,
        add: spy === add,
        order: spy.mock.invocationCallOrder[index],
      })),
    )
    for (const change of changes.sort((a, b) => a.order - b.order)) {
      if (change.type !== 'slotchange') {
        continue
      }
      if (change.add) {
        listeners.add(change.listener)
      } else {
        listeners.delete(change.listener)
      }
    }
    return listeners
  }
  const flush = async () => {
    await nextTick()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
  }
  try {
    await flush()
    const openedListeners = live()
    expect(openedListeners.size).toBe(2)
    opened.value = false
    await flush()
    // The reference still tracks reading direction while its popup is closed.
    const closedListeners = live()
    expect(closedListeners.size).toBe(1)
    for (const listener of closedListeners) {
      expect(openedListeners.has(listener)).toBe(true)
    }
    opened.value = true
    await flush()
    expect(live()).toEqual(openedListeners)
    active.value = false
    await flush()
    expect(live().size).toBe(0)
    active.value = true
    await flush()
    expect(live().size).toBe(2)
  } finally {
    wrapper.unmount()
    host.remove()
  }
  expect(live().size).toBe(0)
})
