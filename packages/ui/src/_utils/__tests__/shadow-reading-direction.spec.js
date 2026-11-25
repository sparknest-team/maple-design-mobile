import { defineComponent, h, onMounted, ref } from 'vue'
import { resolveDirection, useDirection } from '@maple-design/use-vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Slider from '../../slider'

test.each(['open', 'closed'])(
  'inherits host direction and reacts to direction changes inside a %s shadow root',
  async (mode) => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const root = host.attachShadow({ mode })
    const scope = document.createElement('div')
    const mountPoint = document.createElement('div')
    root.append(scope)
    scope.append(mountPoint)
    const Probe = defineComponent({
      setup() {
        const el = ref()
        const { dir } = useDirection(() => el.value)
        return () => h('span', { ref: el, 'data-direction': dir.value })
      },
    })
    const wrapper = mount(Probe, { attachTo: mountPoint })
    try {
      await flushPromises()
      expect(resolveDirection(wrapper.element)).toBe('rtl')
      expect(wrapper.attributes('data-direction')).toBe('rtl')
      scope.dir = 'ltr'
      await flushPromises()
      expect(wrapper.attributes('data-direction')).toBe('ltr')
      scope.dir = 'rtl'
      await flushPromises()
      expect(wrapper.attributes('data-direction')).toBe('rtl')
      scope.removeAttribute('dir')
      host.dir = 'ltr'
      await flushPromises()
      expect(wrapper.attributes('data-direction')).toBe('ltr')
    } finally {
      wrapper.unmount()
      host.remove()
    }
  },
)

test('tracks nested shadow scopes and uses the closest explicit direction', async () => {
  const outerHost = document.createElement('div')
  outerHost.dir = 'rtl'
  document.body.append(outerHost)
  const outerRoot = outerHost.attachShadow({ mode: 'closed' })
  const outerScope = document.createElement('div')
  outerRoot.append(outerScope)
  const innerHost = document.createElement('div')
  outerScope.append(innerHost)
  const innerRoot = innerHost.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  innerRoot.append(mountPoint)
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const wrapper = mount(Probe, { attachTo: mountPoint })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
    outerScope.dir = 'ltr'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('ltr')
    innerHost.dir = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
    innerHost.removeAttribute('dir')
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('ltr')
  } finally {
    wrapper.unmount()
    outerHost.remove()
  }
})

test('shares and releases the shadow-root observer between consumers', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mounts = [document.createElement('div'), document.createElement('div')]
  root.append(...mounts)
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const wrappers = mounts.map((attachTo) => mount(Probe, { attachTo }))
  try {
    await flushPromises()
    const observers = observe.mock.contexts.filter((_, index) => observe.mock.calls[index][0] === root)
    expect(new Set(observers).size).toBe(1)
    const observer = observers[0]
    disconnect.mockClear()
    wrappers[0].unmount()
    expect(disconnect.mock.contexts).not.toContain(observer)
    wrappers[1].unmount()
    expect(disconnect.mock.contexts).toContain(observer)
  } finally {
    wrappers.forEach((wrapper) => {
      if (wrapper.exists()) {
        wrapper.unmount()
      }
    })
    observe.mockRestore()
    disconnect.mockRestore()
    host.remove()
  }
})

test('updates a slider inside a shadow scope when its direction changes', async () => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  root.append(mountPoint)
  const wrapper = mount(Slider, { attachTo: mountPoint, props: { editMode: 'direct', defaultValue: 20 } })
  try {
    await flushPromises()
    const thumb = wrapper.get('[role="slider"]')
    expect(thumb.element.style.left).toBe('80%')
    mountPoint.dir = 'ltr'
    await flushPromises()
    expect(thumb.element.style.left).toBe('20%')
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(thumb.attributes('aria-valuenow')).toBe('21')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('tracks open slot direction, reassignment and later slot-name changes', async () => {
  const host = document.createElement('div')
  host.dir = 'ltr'
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const a = document.createElement('slot')
  const b = document.createElement('slot')
  a.name = 'a'
  a.dir = 'rtl'
  b.name = 'b'
  b.dir = 'ltr'
  root.append(a, b)
  const mountPoint = document.createElement('div')
  mountPoint.slot = 'a'
  host.append(mountPoint)
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const wrapper = mount(Probe, { attachTo: mountPoint })
  try {
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
    mountPoint.slot = 'b'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('ltr')
    b.dir = 'rtl'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
    mountPoint.slot = 'none'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('ltr')
    a.name = 'none'
    await flushPromises()
    expect(wrapper.attributes('data-direction')).toBe('rtl')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('resolves the reference direction before consumer mounted hooks read it', () => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  document.body.append(host)
  let first
  const Probe = defineComponent({
    setup() {
      const target = ref()
      const { dir } = useDirection(() => target.value)
      onMounted(() => {
        first = dir.value
      })
      return () => h('button', { ref: target })
    },
  })
  const wrapper = mount(Probe, { attachTo: host })
  try {
    expect(first).toBe('rtl')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
