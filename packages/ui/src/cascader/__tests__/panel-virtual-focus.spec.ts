import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Panel from '../CascaderPanel.vue'

test('standalone panel waits for the next virtual option before focusing it', async () => {
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options },
    attrs: { virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 } },
  })
  try {
    await flushPromises()
    const last = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])').at(-1)!
    const current = Number(last.attributes('title')!.replace('Item ', ''))
    expect(current).toBeLessThan(options.length - 1)
    ;(last.element as HTMLElement).focus()
    await last.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    const target = wrapper
      .findAll(':is([role="menuitem"],[role="menuitemradio"])')
      .find((item) => item.attributes('title') === `Item ${current + 1}`)
    expect(target).toBeDefined()
    expect(document.activeElement).toBe(target!.element)
  } finally {
    wrapper.unmount()
  }
})

test('standalone virtual navigation does not reclaim focus moved outside', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options },
    attrs: { virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 } },
  })
  try {
    await flushPromises()
    const last = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])').at(-1)!
    ;(last.element as HTMLElement).focus()
    last.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    outside.focus()
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('deactivating a standalone panel cancels pending virtual focus', async () => {
  const view = document.defaultView!
  const original = Object.getOwnPropertyDescriptor(view, 'MutationObserver')
  const disconnect = vi.fn()
  let callback: MutationCallback | undefined
  class SilentObserver {
    constructor(next: MutationCallback) {
      callback = next
    }
    observe() {}
    disconnect = disconnect
    takeRecords() {
      return []
    }
  }
  Object.defineProperty(view, 'MutationObserver', { configurable: true, writable: true, value: SilentObserver })
  const visible = ref(true)
  const outside = document.createElement('button')
  document.body.append(outside)
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, {
          default: () =>
            visible.value
              ? h(Panel, { options, virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 } })
              : null,
        }),
    }),
    { attachTo: document.body },
  )
  try {
    await flushPromises()
    const last = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])').at(-1)!
    ;(last.element as HTMLElement).focus()
    last.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(callback).toBeTypeOf('function')
    visible.value = false
    await nextTick()
    expect(disconnect).toHaveBeenCalled()
    outside.focus()
    callback?.([], {} as MutationObserver)
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
    if (original) {
      Object.defineProperty(view, 'MutationObserver', original)
    } else {
      Reflect.deleteProperty(view, 'MutationObserver')
    }
  }
})
