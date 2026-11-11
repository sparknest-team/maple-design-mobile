import { createSSRApp, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useTriggerResize } from '../resize'

test('a canceled dequeued measurement frame cannot consume replacement entries', async () => {
  const env = fixture(),
    target = ref(document.createElement('button')),
    update = vi.fn()
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [target.value],
        () => true,
        update,
      )
      return () => h('div')
    },
  })
  try {
    env.flush()
    update.mockClear()
    env.observers.at(-1).callback([{ target: target.value }])
    const oldFrame = [...env.frames.values()][0]
    target.value = document.createElement('button')
    await nextTick()
    const newEntry = { target: target.value }
    env.observers.at(-1).callback([newEntry])
    oldFrame()
    expect(update).not.toHaveBeenCalled()
    env.flush()
    expect(update.mock.calls).toEqual([[[newEntry]]])
  } finally {
    wrapper.unmount()
    env.restore()
  }
})

test('a disconnected observer cannot inject old entries into a new binding', async () => {
  const env = fixture(),
    target = ref(document.createElement('button')),
    update = vi.fn()
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [target.value],
        () => true,
        update,
      )
      return () => h('div')
    },
  })
  try {
    env.flush()
    update.mockClear()
    const oldObserver = env.observers.at(-1)
    const oldEntry = { target: target.value }
    target.value = document.createElement('button')
    await nextTick()
    const newEntry = { target: target.value }
    oldObserver.callback([oldEntry])
    env.observers.at(-1).callback([newEntry])
    env.flush()
    expect(update.mock.calls).toEqual([[[newEntry]]])
  } finally {
    wrapper.unmount()
    env.restore()
  }
})

test('deactivation invalidates dequeued frames across reactivation', async () => {
  const env = fixture(),
    active = ref(true),
    target = document.createElement('button'),
    update = vi.fn()
  const child = {
    setup() {
      useTriggerResize(
        () => [target],
        () => true,
        update,
      )
      return () => h('div')
    },
  }
  const wrapper = mount({ render: () => h(KeepAlive, null, () => (active.value ? h(child) : null)) })
  try {
    await nextTick()
    env.flush()
    update.mockClear()
    env.observers.at(-1).callback([{ target }])
    const oldFrame = [...env.frames.values()][0]
    active.value = false
    await nextTick()
    active.value = true
    await nextTick()
    oldFrame()
    expect(update).not.toHaveBeenCalled()
    env.flush()
    expect(update).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    env.restore()
  }
})

function fixture() {
  const observers = []
  const frames = new Map()
  let id = 0
  const view = document.defaultView
  const old = view.ResizeObserver
  view.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback
      this.targets = []
      this.disconnect = vi.fn()
      observers.push(this)
    }
    observe(element) {
      this.targets.push(element)
    }
  }
  const raf = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.set(++id, callback)
    return id
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
  return {
    observers,
    frames,
    flush() {
      const callbacks = [...frames.values()]
      frames.clear()
      callbacks.forEach((callback) => callback())
    },
    restore() {
      view.ResizeObserver = old
      raf.mockRestore()
      cancel.mockRestore()
    },
  }
}

test('closed triggers observe nothing; opening batches resize and closing cancels queued work', async () => {
  const env = fixture()
  const enabled = ref(false)
  const update = vi.fn()
  const element = document.createElement('div')
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [element, element],
        () => enabled.value,
        update,
      )
      return () => h('div')
    },
  })
  try {
    expect(env.observers).toHaveLength(0)
    enabled.value = true
    await nextTick()
    expect(env.observers[0].targets).toEqual([element])
    env.observers[0].callback([{ target: element }])
    env.observers[0].callback([{ target: element }])
    expect(env.frames.size).toBe(1)
    env.flush()
    expect(update).toHaveBeenCalledTimes(1)
    document.defaultView.dispatchEvent(new Event('resize'))
    enabled.value = false
    await nextTick()
    expect(env.observers[0].disconnect).toHaveBeenCalledOnce()
    env.flush()
    expect(update).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    env.restore()
  }
})

test('replacing the actual reference disconnects the previous observer and cancels its pending frame', async () => {
  const env = fixture()
  const target = ref(document.createElement('button'))
  const update = vi.fn()
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [target.value],
        () => true,
        update,
      )
      return () => h('div')
    },
  })
  try {
    const previous = env.observers[0]
    previous.callback([{ target: target.value }])
    target.value = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    await nextTick()
    expect(previous.disconnect).toHaveBeenCalledOnce()
    expect(env.observers[1].targets).toEqual([target.value])
    env.flush()
    expect(update.mock.calls).toEqual([[[]]])
  } finally {
    wrapper.unmount()
    env.restore()
  }
})

test('KeepAlive suspends observation and resumes with current targets', async () => {
  const env = fixture()
  const active = ref(true)
  const update = vi.fn()
  const child = defineComponent({
    setup() {
      const el = ref()
      useTriggerResize(
        () => [el.value],
        () => true,
        update,
      )
      return () => h('button', { ref: el })
    },
  })
  const wrapper = mount({ render: () => h(KeepAlive, null, () => (active.value ? h(child) : null)) })
  try {
    await nextTick()
    env.flush()
    const count = update.mock.calls.length
    active.value = false
    await nextTick()
    expect(env.frames.size).toBe(0)
    expect(env.observers.at(-1).disconnect).toHaveBeenCalled()
    document.defaultView.dispatchEvent(new Event('resize'))
    env.flush()
    expect(update).toHaveBeenCalledTimes(count)
    active.value = true
    await nextTick()
    env.flush()
    expect(update.mock.calls.length).toBeGreaterThan(count)
  } finally {
    wrapper.unmount()
    expect(env.frames.size).toBe(0)
    env.restore()
  }
})

test('SSR never constructs an observer or schedules DOM work', async () => {
  const env = fixture()
  try {
    await renderToString(
      createSSRApp({
        setup() {
          useTriggerResize(
            () => [],
            () => true,
            vi.fn(),
          )
          return () => h('span', 'server')
        },
      }),
    )
    expect(env.observers).toHaveLength(0)
    expect(env.frames.size).toBe(0)
  } finally {
    env.restore()
  }
})

test('visualViewport resize and scroll coalesce and detach when closed', async () => {
  const env = fixture(),
    viewport = new EventTarget(),
    enabled = ref(true),
    update = vi.fn()
  const descriptor = Object.getOwnPropertyDescriptor(document.defaultView, 'visualViewport')
  Object.defineProperty(document.defaultView, 'visualViewport', { configurable: true, value: viewport })
  const element = document.createElement('div')
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [element],
        () => enabled.value,
        update,
      )
      return () => h('div')
    },
  })
  try {
    env.flush()
    update.mockClear()
    viewport.dispatchEvent(new Event('resize'))
    viewport.dispatchEvent(new Event('scroll'))
    expect(env.frames.size).toBe(1)
    env.flush()
    expect(update).toHaveBeenCalledTimes(1)
    enabled.value = false
    await nextTick()
    viewport.dispatchEvent(new Event('resize'))
    expect(env.frames.size).toBe(0)
  } finally {
    wrapper.unmount()
    env.restore()
    if (descriptor) {
      Object.defineProperty(document.defaultView, 'visualViewport', descriptor)
    } else {
      delete document.defaultView.visualViewport
    }
  }
})

test('without native ResizeObserver window resize still batches and cleans up', () => {
  const env = fixture()
  window.ResizeObserver = undefined
  const update = vi.fn()
  const target = document.createElement('button')
  const wrapper = mount({
    setup() {
      useTriggerResize(
        () => [target],
        () => true,
        update,
      )
      return () => h('div')
    },
  })
  try {
    env.flush()
    update.mockClear()
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    expect(env.frames.size).toBe(1)
    env.flush()
    expect(update).toHaveBeenCalledOnce()
    window.dispatchEvent(new Event('resize'))
    wrapper.unmount()
    expect(env.frames.size).toBe(0)
    window.dispatchEvent(new Event('resize'))
    expect(env.frames.size).toBe(0)
  } finally {
    wrapper.unmount()
    env.restore()
  }
})
