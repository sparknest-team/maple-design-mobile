import { defineComponent, h, KeepAlive, nextTick, onActivated, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Card from '../Card.vue'

test.each([true, false])(
  'initially expanded iframe Card restores focus only from its hidden content: %s',
  async (inside) => {
    const frame = document.createElement('iframe')
    document.body.append(frame)
    const doc = frame.contentDocument!
    const opener = doc.createElement('button')
    const outside = doc.createElement('button')
    const root = doc.createElement('div')
    doc.body.append(opener, outside, root)
    opener.focus()
    const wrapper = mount(Card, {
      attachTo: root,
      props: { floating: true, ripple: false, floatingDuration: 0 },
      slots: { 'floating-content': () => h('input', { 'aria-label': 'Draft' }) },
    })
    try {
      await nextTick()
      wrapper.get('input').element.focus()
      if (!inside) {
        outside.focus()
      }
      await wrapper.setProps({ floating: false })
      expect(doc.activeElement).toBe(inside ? opener : outside)
    } finally {
      wrapper.unmount()
      frame.remove()
    }
  },
)

test('initially expanded iframe Card captures focus before its child mounts and focuses itself', async () => {
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const doc = frame.contentDocument!
  const opener = doc.createElement('button')
  const root = doc.createElement('div')
  doc.body.append(opener, root)
  opener.focus()
  const AutoFocus = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onMounted(() => input.value?.focus())
      return () => h('input', { ref: input })
    },
  })
  const wrapper = mount(Card, {
    attachTo: root,
    props: { floating: true, ripple: false, floatingDuration: 0 },
    slots: { 'floating-content': () => h(AutoFocus) },
  })
  try {
    await nextTick()
    expect(doc.activeElement).toBe(wrapper.get('input').element)
    await wrapper.setProps({ floating: false })
    expect(doc.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    frame.remove()
  }
})

test('reactivated expanded Card records the new opener', async () => {
  const first = document.createElement('button')
  const second = document.createElement('button')
  document.body.append(first, second)
  const visible = ref(true)
  const floating = ref(true)
  first.focus()
  const wrapper = mount(
    {
      render: () =>
        h(KeepAlive, () =>
          visible.value
            ? h(
                Card,
                { floating: floating.value, ripple: false, floatingDuration: 0 },
                { 'floating-content': () => h('input') },
              )
            : null,
        ),
    },
    { attachTo: document.body },
  )
  try {
    await nextTick()
    visible.value = false
    await nextTick()
    second.focus()
    visible.value = true
    await nextTick()
    wrapper.get('input').element.focus()
    floating.value = false
    await nextTick()
    expect(document.activeElement).toBe(second)
  } finally {
    wrapper.unmount()
    first.remove()
    second.remove()
  }
})

test('reactivation retains the opener when a cached child focuses on activation', async () => {
  const first = document.createElement('button')
  const second = document.createElement('button')
  document.body.append(first, second)
  const visible = ref(true)
  const floating = ref(true)
  const AutoFocus = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onActivated(() => input.value?.focus())
      return () => h('input', { ref: input })
    },
  })
  first.focus()
  const wrapper = mount(
    {
      render: () =>
        h(KeepAlive, () =>
          visible.value
            ? h(
                Card,
                { floating: floating.value, ripple: false, floatingDuration: 0 },
                { 'floating-content': () => h(AutoFocus) },
              )
            : null,
        ),
    },
    { attachTo: document.body },
  )
  try {
    await nextTick()
    visible.value = false
    await nextTick()
    second.focus()
    visible.value = true
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    floating.value = false
    await nextTick()
    expect(document.activeElement).toBe(second)
  } finally {
    wrapper.unmount()
    first.remove()
    second.remove()
  }
})

test('unmounting a cached Card releases its inactive focus listener', async () => {
  const added = vi.spyOn(document, 'addEventListener')
  const removed = vi.spyOn(document, 'removeEventListener')
  const visible = ref(true)
  const wrapper = mount(
    { render: () => h(KeepAlive, () => (visible.value ? h(Card, { floating: true, ripple: false }) : null)) },
    { attachTo: document.body },
  )
  let unmounted = false
  try {
    await nextTick()
    visible.value = false
    await nextTick()
    const listeners = added.mock.calls
      .filter(([type, , options]) => type === 'focusin' && options === true)
      .map(([, listener]) => listener)
    expect(listeners).toHaveLength(1)
    wrapper.unmount()
    unmounted = true
    await nextTick()
    expect(
      removed.mock.calls.some(
        ([type, listener, options]) => type === 'focusin' && listener === listeners[0] && options === true,
      ),
    ).toBe(true)
    expect(added.mock.calls.filter(([type, , options]) => type === 'focusin' && options === true)).toHaveLength(1)
  } finally {
    if (!unmounted) {
      wrapper.unmount()
    }
    added.mockRestore()
    removed.mockRestore()
  }
})

test('a cached closed Card does not track document focus, and starts only when expanded', async () => {
  const added = vi.spyOn(document, 'addEventListener')
  const removed = vi.spyOn(document, 'removeEventListener')
  const visible = ref(true)
  const floating = ref(false)
  const wrapper = mount(
    { render: () => h(KeepAlive, () => (visible.value ? h(Card, { floating: floating.value, ripple: false }) : null)) },
    { attachTo: document.body },
  )
  try {
    await nextTick()
    visible.value = false
    await nextTick()
    const tracked = () => added.mock.calls.filter(([type, , options]) => type === 'focusin' && options === true)
    expect(tracked()).toHaveLength(0)
    floating.value = true
    await nextTick()
    // KeepAlive does not patch the cached child until it is shown again.
    expect(tracked()).toHaveLength(0)
    visible.value = true
    await nextTick()
    const listeners = tracked().map(([, listener]) => listener)
    expect(listeners).toHaveLength(1)
    expect(
      removed.mock.calls.some(
        ([type, actual, options]) => type === 'focusin' && actual === listeners[0] && options === true,
      ),
    ).toBe(true)
  } finally {
    wrapper.unmount()
    added.mockRestore()
    removed.mockRestore()
  }
})
