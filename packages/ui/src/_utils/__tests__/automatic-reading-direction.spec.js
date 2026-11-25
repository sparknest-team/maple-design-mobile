import { defineComponent, h, ref } from 'vue'
import { useDirection } from '@maple-design/use-vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'

afterEach(() => vi.restoreAllMocks())
const Probe = defineComponent({
  setup() {
    const el = ref()
    const { dir } = useDirection(() => el.value)
    return () => h('span', { ref: el, 'data-dir': dir.value })
  },
})

test.each(['document', 'closed'])('shares auto scope updates and releases observers in %s', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = mode === 'document' ? host : host.attachShadow({ mode })
  const scope = document.createElement('div')
  scope.dir = 'auto'
  root.append(scope)
  const label = document.createElement('span')
  const text = document.createTextNode('ltr')
  label.append(text)
  scope.append(label)
  const points = [document.createElement('div'), document.createElement('div')]
  scope.append(...points)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node, ...args) =>
    node === scope ? { direction: label.textContent } : original(node, ...args),
  )
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const wrappers = points.map((attachTo) => mount(Probe, { attachTo }))
  try {
    await flushPromises()
    expect(wrappers.map((w) => w.attributes('data-dir'))).toEqual(['ltr', 'ltr'])
    const watchers = observe.mock.contexts.filter((_, i) => observe.mock.calls[i][0] === scope)
    expect(new Set(watchers).size).toBe(1)
    text.data = 'rtl'
    await flushPromises()
    expect(wrappers.map((w) => w.attributes('data-dir'))).toEqual(['rtl', 'rtl'])
    label.textContent = 'ltr'
    await flushPromises()
    expect(wrappers.map((w) => w.attributes('data-dir'))).toEqual(['ltr', 'ltr'])
    disconnect.mockClear()
    wrappers[0].unmount()
    expect(disconnect.mock.contexts).not.toContain(watchers[0])
    wrappers[1].unmount()
    expect(disconnect.mock.contexts).toContain(watchers[0])
  } finally {
    wrappers.forEach((w) => {
      if (w.exists()) {
        w.unmount()
      }
    })
    host.remove()
  }
})

test('reacts to input events when the auto scope is the input itself', async () => {
  const original = window.getComputedStyle.bind(window)
  const Input = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('input', { ref: el, dir: 'auto', 'data-dir': dir.value })
    },
  })
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node, ...args) =>
    node.tagName === 'INPUT' ? { direction: node.value === 'rtl' ? 'rtl' : 'ltr' } : original(node, ...args),
  )
  const wrapper = mount(Input, { attachTo: document.body })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
    wrapper.element.value = 'rtl'
    await wrapper.trigger('input')
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
  } finally {
    wrapper.unmount()
  }
})

test('rebinds when the closest valid direction changes', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const scope = document.createElement('div')
  scope.dir = 'auto'
  host.append(scope)
  const text = document.createTextNode('ltr')
  scope.append(text)
  const point = document.createElement('div')
  scope.append(point)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node, ...args) =>
    node === scope ? { direction: text.data } : original(node, ...args),
  )
  const wrapper = mount(Probe, { attachTo: point })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
    scope.dir = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
    text.data = 'ltr'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
    scope.dir = 'auto'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
    text.data = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('uses the implicit HTML bdi direction and follows text replacements', async () => {
  const bdi = document.createElement('bdi')
  bdi.dir = 'invalid'
  const label = document.createTextNode('עברית')
  const mountPoint = document.createElement('span')
  bdi.append(label, mountPoint)
  document.body.append(bdi)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) =>
    node === bdi ? { direction: label.data === 'English' ? 'ltr' : 'rtl' } : original(node),
  )
  const wrapper = mount(Probe, { attachTo: mountPoint })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
    label.data = 'English'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
  } finally {
    wrapper.unmount()
    bdi.remove()
  }
})

test('tracks an eventless value assignment and releases the polling timer', async () => {
  vi.useFakeTimers()
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) =>
    node.tagName === 'TEXTAREA' ? { direction: node.value === 'עברית' ? 'rtl' : 'ltr' } : original(node),
  )
  const Input = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('textarea', { ref: el, dir: 'auto', 'data-dir': dir.value })
    },
  })
  const initialTimers = vi.getTimerCount()
  const wrapper = mount(Input, { attachTo: document.body })
  try {
    await wrapper.vm.$nextTick()
    wrapper.element.value = 'עברית'
    await vi.advanceTimersByTimeAsync(250)
    expect(wrapper.attributes('data-dir')).toBe('rtl')
  } finally {
    wrapper.unmount()
    try {
      expect(vi.getTimerCount()).toBe(initialTimers)
    } finally {
      vi.useRealTimers()
    }
  }
})

test('keeps shared auto observation after adoption and one consumer unmounts', async () => {
  const scope = document.createElement('div')
  scope.dir = 'auto'
  document.body.append(scope)
  const label = document.createElement('span')
  label.textContent = 'ltr'
  scope.append(label)
  const first = document.createElement('div')
  const second = document.createElement('div')
  scope.append(first, second)
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const other = frame.contentWindow
  const mainStyle = window.getComputedStyle.bind(window)
  const otherStyle = other.getComputedStyle.bind(other)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node, ...args) =>
    node === scope
      ? { direction: node.ownerDocument === document ? label.textContent : 'ltr' }
      : mainStyle(node, ...args),
  )
  vi.spyOn(other, 'getComputedStyle').mockImplementation((node, ...args) =>
    node === scope ? { direction: label.textContent } : otherStyle(node, ...args),
  )
  const a = mount(Probe, { attachTo: first })
  const b = mount(Probe, { attachTo: second })
  try {
    await flushPromises()
    other.document.body.append(scope)
    await flushPromises()
    a.unmount()
    label.firstChild.data = 'rtl'
    await flushPromises()
    expect(b.attributes('data-dir')).toBe('rtl')
    document.body.append(scope)
    await flushPromises()
    label.firstChild.data = 'ltr'
    await flushPromises()
    expect(b.attributes('data-dir')).toBe('ltr')
  } finally {
    if (a.exists()) {
      a.unmount()
    }
    b.unmount()
    scope.remove()
    frame.remove()
  }
})

test('refreshes native auto direction when its ancestor changes without a text edit', async () => {
  const parent = document.createElement('div')
  parent.dir = 'ltr'
  const scope = document.createElement('bdi')
  parent.append(scope)
  document.body.append(parent)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) =>
    node === scope ? { direction: parent.dir } : original(node),
  )
  const wrapper = mount(Probe, { attachTo: scope })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
    parent.dir = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
  } finally {
    wrapper.unmount()
    parent.remove()
  }
})

test('observes assigned text outside an automatic slot', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const slot = document.createElement('slot')
  slot.dir = 'auto'
  root.append(slot)
  const text = document.createTextNode('English')
  const point = document.createElement('span')
  host.append(text, point)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) =>
    node === slot ? { direction: text.data === 'English' ? 'ltr' : 'rtl' } : original(node),
  )
  const wrapper = mount(Probe, { attachTo: point })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('ltr')
    text.data = 'עברית'
    await flushPromises()
    expect(wrapper.attributes('data-dir')).toBe('rtl')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('moves a shared auto scope and observes projected text on its new host', async () => {
  const hosts = [document.createElement('div'), document.createElement('div')]
  document.body.append(...hosts)
  const roots = hosts.map((host) => host.attachShadow({ mode: 'open' }))
  hosts.forEach((host) => host.append(document.createTextNode('English')))
  const scope = document.createElement('slot')
  scope.dir = 'auto'
  const points = [document.createElement('span'), document.createElement('span')]
  hosts[0].append(...points)
  roots[0].append(scope)
  const original = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((node) =>
    node === scope ? { direction: scope.getRootNode().host.textContent === 'English' ? 'ltr' : 'rtl' } : original(node),
  )
  const wrappers = points.map((attachTo) => mount(Probe, { attachTo }))
  try {
    await flushPromises()
    roots[1].append(scope)
    hosts[1].append(...points)
    await flushPromises()
    hosts[1].firstChild.data = 'עברית'
    await flushPromises()
    expect(wrappers.map((wrapper) => wrapper.attributes('data-dir'))).toEqual(['rtl', 'rtl'])
  } finally {
    wrappers.forEach((wrapper) => wrapper.unmount())
    hosts.forEach((host) => host.remove())
  }
})
