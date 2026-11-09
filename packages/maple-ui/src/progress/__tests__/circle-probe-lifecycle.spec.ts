import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Progress from '..'

test('circle probe and observers follow KeepAlive ownership and unmount', async () => {
  const instances: Array<{
    callback: ResizeObserverCallback
    observe: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
  }> = []
  const original = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver')
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = vi.fn()
      disconnect = vi.fn()
      constructor(public callback: ResizeObserverCallback) {
        instances.push(this)
      }
    },
  )
  const active = ref(true)
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, () => (active.value ? h(Progress, { mode: 'circle', strokeWidth: '1em' }) : null)),
    }),
    { attachTo: document.body },
  )
  try {
    await nextTick()
    const circle = owner.get('[class$="__circle"]').element
    expect(circle.querySelector('span[aria-hidden="true"]')).not.toBeNull()
    const first = instances[instances.length - 1]
    expect(first.observe).toHaveBeenCalledTimes(2)
    active.value = false
    await nextTick()
    expect(first.disconnect).toHaveBeenCalled()
    expect(circle.querySelector('span[aria-hidden="true"]')).toBeNull()
    active.value = true
    await nextTick()
    expect(instances.length).toBeGreaterThan(1)
    expect(circle.querySelector('span[aria-hidden="true"]')).not.toBeNull()
    owner.unmount()
    expect(instances[instances.length - 1].disconnect).toHaveBeenCalled()
    expect(circle.querySelector('span[aria-hidden="true"]')).toBeNull()
  } finally {
    owner.unmount()
    if (original) {
      Object.defineProperty(globalThis, 'ResizeObserver', original)
    } else {
      Reflect.deleteProperty(globalThis, 'ResizeObserver')
    }
  }
})
