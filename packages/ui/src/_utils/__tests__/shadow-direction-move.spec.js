import { defineComponent, h, KeepAlive, ref } from 'vue'
import { useDirection } from '@maple-design/use-vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'

function fixture() {
  const hosts = [document.createElement('div'), document.createElement('div')]
  hosts[0].dir = 'rtl'
  hosts[1].dir = 'ltr'
  document.body.append(...hosts)
  const roots = hosts.map((host) => host.attachShadow({ mode: 'closed' }))
  const point = document.createElement('div')
  roots[0].append(point)
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const wrapper = mount(Probe, { attachTo: point })
  return {
    hosts,
    roots,
    point,
    wrapper,
    cleanup: () => {
      wrapper.unmount()
      hosts.forEach((host) => host.remove())
    },
  }
}

test('moves across closed roots and tracks the new host', async () => {
  const x = fixture()
  try {
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('rtl')
    x.roots[1].append(x.point)
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('ltr')
    x.hosts[1].dir = 'rtl'
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('rtl')
  } finally {
    x.cleanup()
  }
})

test('recovers after delayed detachment and reattachment to an unknown root', async () => {
  const x = fixture()
  try {
    await flushPromises()
    x.point.remove()
    await flushPromises()
    x.roots[1].append(x.point)
    await vi.waitFor(() => expect(x.wrapper.attributes('data-direction')).toBe('ltr'), { timeout: 2000 })
  } finally {
    x.cleanup()
  }
})

test('ignores unrelated subtree mutations', async () => {
  const x = fixture()
  try {
    await flushPromises()
    const spy = vi.spyOn(x.wrapper.element, 'getRootNode')
    const unrelated = document.createElement('section')
    document.body.append(unrelated)
    unrelated.append(document.createElement('span'))
    await flushPromises()
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
    unrelated.remove()
  } finally {
    x.cleanup()
  }
})

test('moving one instance does not refresh an unrelated instance', async () => {
  const a = fixture()
  const b = fixture()
  try {
    await flushPromises()
    const spy = vi.spyOn(b.wrapper.element, 'getRootNode')
    a.roots[1].append(a.point)
    await flushPromises()
    expect(a.wrapper.attributes('data-direction')).toBe('ltr')
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  } finally {
    a.cleanup()
    b.cleanup()
  }
})

test('shares and releases the detached timer', async () => {
  const a = fixture()
  const b = fixture()
  const start = vi.spyOn(globalThis, 'setInterval')
  const stop = vi.spyOn(globalThis, 'clearInterval')
  let disposedA = false
  let disposedB = false
  try {
    await flushPromises()
    a.point.remove()
    b.point.remove()
    await flushPromises()
    const matches = start.mock.calls
      .map((args, i) => (args[1] === 250 ? start.mock.results[i].value : undefined))
      .filter(Boolean)
    expect(matches).toHaveLength(1)
    a.wrapper.unmount()
    disposedA = true
    expect(stop).not.toHaveBeenCalledWith(matches[0])
    b.wrapper.unmount()
    disposedB = true
    expect(stop).toHaveBeenCalledWith(matches[0])
  } finally {
    if (!disposedA) {
      a.wrapper.unmount()
    }
    if (!disposedB) {
      b.wrapper.unmount()
    }
    a.hosts.forEach((host) => host.remove())
    b.hosts.forEach((host) => host.remove())
    start.mockRestore()
    stop.mockRestore()
  }
})

test('stops detached detection on KeepAlive deactivation', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const point = document.createElement('div')
  root.append(point)
  const visible = ref(true)
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const wrapper = mount(
    { render: () => h(KeepAlive, null, () => (visible.value ? h(Probe) : null)) },
    { attachTo: point },
  )
  const start = vi.spyOn(globalThis, 'setInterval')
  const stop = vi.spyOn(globalThis, 'clearInterval')
  try {
    await flushPromises()
    point.remove()
    await flushPromises()
    const index = start.mock.calls.findIndex((args) => args[1] === 250)
    expect(index).toBeGreaterThanOrEqual(0)
    const timer = start.mock.results[index].value
    visible.value = false
    await flushPromises()
    expect(stop).toHaveBeenCalledWith(timer)
  } finally {
    wrapper.unmount()
    host.remove()
    start.mockRestore()
    stop.mockRestore()
  }
})

test('follows a node adopted into another same-origin document', async () => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  const frame = document.createElement('iframe')
  document.body.append(host, frame)
  const root = host.attachShadow({ mode: 'closed' })
  const point = document.createElement('div')
  root.append(point)
  const target = frame.contentDocument.body
  target.dir = 'ltr'
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const wrapper = mount(Probe, { attachTo: point })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
    target.append(point)
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('ltr')
    target.dir = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
  } finally {
    wrapper.unmount()
    host.remove()
    frame.remove()
  }
})

test('observes direction changes inside the destination shadow root after a move', async () => {
  const x = fixture()
  const local = document.createElement('div')
  x.roots[1].append(local)
  try {
    await flushPromises()
    local.append(x.point)
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('ltr')
    local.dir = 'rtl'
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('rtl')
    local.dir = 'ltr'
    await flushPromises()
    expect(x.wrapper.attributes('data-direction')).toBe('ltr')
  } finally {
    x.cleanup()
  }
})
