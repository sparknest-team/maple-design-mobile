import { defineComponent, h, KeepAlive, nextTick, onActivated, ref, Teleport } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Card from '../Card.vue'

test.each([
  ['open', true],
  ['open', false],
  ['closed', true],
  ['closed', false],
] as const)('tracks a moved Card in %s roots before deactivation, refocus=%s', async (mode, refocus) => {
  const hostA = document.createElement('div'),
    hostB = document.createElement('div')
  document.body.append(hostA, hostB)
  const rootA = hostA.attachShadow({ mode }),
    rootB = hostB.attachShadow({ mode })
  const first = document.createElement('button'),
    later = document.createElement('button'),
    targetA = document.createElement('div'),
    targetB = document.createElement('div')
  rootA.append(first, targetA)
  rootB.append(later, targetB)
  const target = ref(targetA),
    shown = ref(true),
    floating = ref(false),
    autoFocus = ref(false)
  const Child = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onActivated(() => {
        if (autoFocus.value) {
          input.value?.focus()
        }
      })
      return () => h('input', { ref: input })
    },
  })
  const wrapper = mount(
    {
      setup: () => () =>
        h(Teleport, { to: target.value }, [
          h(KeepAlive, null, () =>
            shown.value
              ? h(Card, { floating: floating.value, ripple: false }, { 'floating-content': () => h(Child) })
              : null,
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    first.focus()
    floating.value = true
    await nextTick()
    targetA.querySelector('input')!.focus()
    target.value = targetB
    await nextTick()
    const movedInput = targetB.querySelector('input')!
    expect(movedInput).toBeTruthy()
    if (refocus) {
      movedInput.focus()
      expect(rootB.activeElement).toBe(movedInput)
    }
    shown.value = false
    await nextTick()
    later.focus()
    expect(rootB.activeElement).toBe(later)
    autoFocus.value = true
    shown.value = true
    await nextTick()
    await nextTick()
    expect(rootB.activeElement).toBe(targetB.querySelector('input'))
    floating.value = false
    await nextTick()
    expect(rootB.activeElement).toBe(later)
  } finally {
    wrapper.unmount()
    hostA.remove()
    hostB.remove()
  }
})

test.each(['open', 'closed'] as const)('moves and deactivates in one update in %s roots', async (mode) => {
  const hostA = document.createElement('div'),
    hostB = document.createElement('div')
  document.body.append(hostA, hostB)
  const rootA = hostA.attachShadow({ mode }),
    rootB = hostB.attachShadow({ mode })
  const first = document.createElement('button'),
    later = document.createElement('button'),
    targetA = document.createElement('div'),
    targetB = document.createElement('div')
  rootA.append(first, targetA)
  rootB.append(later, targetB)
  const target = ref(targetA),
    shown = ref(true),
    floating = ref(false),
    autoFocus = ref(false)
  const Child = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onActivated(() => {
        if (autoFocus.value) {
          input.value?.focus()
        }
      })
      return () => h('input', { ref: input })
    },
  })
  const wrapper = mount(
    {
      setup: () => () =>
        h(Teleport, { to: target.value }, [
          h(KeepAlive, null, () =>
            shown.value
              ? h(Card, { floating: floating.value, ripple: false }, { 'floating-content': () => h(Child) })
              : null,
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    first.focus()
    floating.value = true
    await nextTick()
    targetA.querySelector('input')!.focus()
    target.value = targetB
    shown.value = false
    await nextTick()
    later.focus()
    expect(rootB.activeElement).toBe(later)
    autoFocus.value = true
    shown.value = true
    await nextTick()
    await nextTick()
    expect(rootB.activeElement).toBe(targetB.querySelector('input'))
    floating.value = false
    await nextTick()
    expect(rootB.activeElement).toBe(later)
  } finally {
    wrapper.unmount()
    hostA.remove()
    hostB.remove()
  }
})

test('preserves the caller focusin listener while tracking the current root', async () => {
  const events: Event[] = []
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false },
    attrs: { onFocusin: (event: Event) => events.push(event) },
    slots: { 'floating-content': () => h('input') },
  })
  try {
    ;(wrapper.get('input').element as HTMLInputElement).focus()
    expect(events).toHaveLength(1)
    expect(events[0].target).toBe(wrapper.get('input').element)
  } finally {
    wrapper.unmount()
  }
})

test('disconnects root tracking when the Card closes and unmounts', async () => {
  const view = document.defaultView!
  const NativeObserver = view.MutationObserver
  const connected = new Set<MutationObserver>()
  class TrackingObserver extends NativeObserver {
    observe(target: Node, options?: MutationObserverInit) {
      if (options?.childList && !options.subtree) {
        connected.add(this)
      }
      super.observe(target, options)
    }
    disconnect() {
      connected.delete(this)
      super.disconnect()
    }
  }
  view.MutationObserver = TrackingObserver
  const wrapper = mount(Card, { attachTo: document.body, props: { floating: false, ripple: false } })
  try {
    await wrapper.setProps({ floating: true })
    expect(connected.size).toBeGreaterThan(0)
    await wrapper.setProps({ floating: false })
    expect(connected.size).toBe(0)
    await wrapper.setProps({ floating: true })
    expect(connected.size).toBeGreaterThan(0)
  } finally {
    wrapper.unmount()
    view.MutationObserver = NativeObserver
  }
  expect(connected.size).toBe(0)
})
