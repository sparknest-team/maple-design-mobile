import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Icon from '../Icon.vue'

const cleanups = []
afterEach(() => {
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup())
  vi.restoreAllMocks()
  vi.useRealTimers()
})
async function harness(cached = false, iframe = false) {
  vi.useFakeTimers()
  const callbacks = []
  const original = globalThis.setTimeout
  vi.spyOn(globalThis, 'setTimeout').mockImplementation((...args) => {
    if (args[1] === 120) {
      callbacks.push(args[0])
    }
    return original(...args)
  })
  const frame = iframe ? document.createElement('iframe') : undefined
  if (frame) {
    document.body.append(frame)
  }
  const hostListeners = new Set(),
    ownerListeners = iframe ? new Set() : hostListeners
  const hostMedia = {
    matches: false,
    addEventListener: (_type, fn) => hostListeners.add(fn),
    removeEventListener: (_type, fn) => hostListeners.delete(fn),
  }
  const ownerMedia = iframe
    ? {
        matches: true,
        addEventListener: (_type, fn) => ownerListeners.add(fn),
        removeEventListener: (_type, fn) => ownerListeners.delete(fn),
      }
    : hostMedia
  const views = [...new Set([window, document.defaultView, ...(frame ? [frame.contentWindow] : [])])]
  const descriptors = views.map((view) => [view, Object.getOwnPropertyDescriptor(view, 'matchMedia')])
  const hostQuery = vi.fn(() => hostMedia),
    ownerQuery = iframe ? vi.fn(() => ownerMedia) : hostQuery
  views.forEach((view) =>
    Object.defineProperty(view, 'matchMedia', {
      configurable: true,
      value: view === frame?.contentWindow ? ownerQuery : hostQuery,
    }),
  )
  const visible = ref(true),
    name = ref('one'),
    transition = ref(120)
  const Child = defineComponent({ setup: () => () => h(Icon, { name: name.value, transition: transition.value }) })
  const wrapper = mount(
    defineComponent({
      setup: () => () => (cached ? h(KeepAlive, null, () => (visible.value ? h(Child) : null)) : h(Child)),
    }),
    {
      attachTo: frame?.contentDocument?.body ?? document.body,
      global: {
        components: Object.fromEntries(
          ['one', 'two', 'three'].map((key) => [
            'Icon' + key[0].toUpperCase() + key.slice(1),
            { render: () => h('svg', { 'data-icon': key }) },
          ]),
        ),
      },
    },
  )
  let disposed = false
  cleanups.push(() => {
    if (!disposed) {
      wrapper.unmount()
    }
    wrapper.element.remove()
    descriptors.forEach(([view, descriptor]) => {
      if (descriptor) {
        Object.defineProperty(view, 'matchMedia', descriptor)
      } else {
        Reflect.deleteProperty(view, 'matchMedia')
      }
    })
    frame?.remove()
  })
  await nextTick()
  const icon = wrapper.findComponent(Icon)
  return {
    wrapper,
    icon,
    callbacks,
    hostMedia,
    ownerMedia,
    hostListeners,
    ownerListeners,
    hostQuery,
    ownerQuery,
    rendered: () => icon.find('svg').attributes('data-icon'),
    animating: () => icon.classes().some((cls) => cls.endsWith('--shrinking')),
    async setName(value) {
      name.value = value
      await nextTick()
    },
    async setDuration(value) {
      transition.value = value
      await nextTick()
    },
    async hide() {
      visible.value = false
      await nextTick()
    },
    async show() {
      visible.value = true
      await nextTick()
      await nextTick()
    },
    unmount() {
      wrapper.unmount()
      disposed = true
    },
  }
}
describe('Icon visual-delay lifecycle ownership', () => {
  test('cancelled name timer cannot roll back a newer request', async () => {
    const p = await harness()
    await p.setName('two')
    const old = p.callbacks.at(-1)
    await p.setName('three')
    old()
    await nextTick()
    expect(p.rendered()).toBe('one')
    expect(p.animating()).toBe(true)
    vi.advanceTimersByTime(120)
    await nextTick()
    expect(p.rendered()).toBe('three')
  })
  test('consumed timer cannot clear a new animation', async () => {
    const p = await harness()
    await p.setName('two')
    const old = p.callbacks.at(-1)
    old()
    await nextTick()
    await p.setName('three')
    old()
    await nextTick()
    expect(p.rendered()).toBe('two')
    expect(p.animating()).toBe(true)
  })
  test('deactivation cancels pending work and activation commits latest inactive name', async () => {
    const p = await harness(true)
    await p.setName('two')
    const old = p.callbacks.at(-1)
    await p.hide()
    const count = p.callbacks.length
    await p.setName('three')
    expect(p.callbacks).toHaveLength(count)
    old()
    await nextTick()
    await p.show()
    expect(p.rendered()).toBe('three')
    expect(p.animating()).toBe(false)
  })
  test('inactive media listener detaches and dequeued old listener cannot affect reactivation', async () => {
    const p = await harness(true)
    const old = [...p.hostListeners][0]
    await p.hide()
    expect(p.hostListeners.size).toBe(0)
    await p.show()
    expect(p.hostListeners.size).toBe(1)
    p.hostMedia.matches = true
    old()
    await nextTick()
    p.hostMedia.matches = false
    await p.setName('two')
    expect(p.rendered()).toBe('one')
    expect(p.animating()).toBe(true)
  })
  test('transition update to zero cancels old delay and commits pending name', async () => {
    const p = await harness()
    await p.setName('two')
    const old = p.callbacks.at(-1)
    await p.setDuration(0)
    expect(p.rendered()).toBe('two')
    expect(p.animating()).toBe(false)
    await p.setName('three')
    old()
    await nextTick()
    expect(p.rendered()).toBe('three')
  })
  test('iframe icon reads and subscribes to its actual owner preference', async () => {
    const p = await harness(false, true)
    expect(p.ownerQuery).toHaveBeenCalled()
    expect(p.hostQuery).not.toHaveBeenCalled()
    await p.setName('two')
    expect(p.rendered()).toBe('two')
    expect(p.callbacks).toHaveLength(0)
  })
  test('normal positive duration delays until the caller deadline', async () => {
    const p = await harness()
    await p.setName('two')
    vi.advanceTimersByTime(119)
    await nextTick()
    expect(p.rendered()).toBe('one')
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(p.rendered()).toBe('two')
    expect(p.animating()).toBe(false)
  })
  test('live reduced preference commits latest name and removes delayed work', async () => {
    const p = await harness()
    await p.setName('two')
    p.hostMedia.matches = true
    ;[...p.hostListeners].forEach((listener) => listener())
    await nextTick()
    expect(p.rendered()).toBe('two')
    expect(p.animating()).toBe(false)
  })
  test('unmount releases the current timer and preference subscription', async () => {
    const p = await harness()
    await p.setName('two')
    const clear = vi.spyOn(globalThis, 'clearTimeout')
    p.unmount()
    expect(clear).toHaveBeenCalled()
    expect(p.hostListeners.size).toBe(0)
  })
})
