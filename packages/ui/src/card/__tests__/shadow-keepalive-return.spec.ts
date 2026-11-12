import { defineComponent, h, KeepAlive, nextTick, onActivated, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Card from '../Card.vue'

test.each(['open', 'closed'] as const)(
  'restores focus after KeepAlive activation inside a %s shadow root',
  async (mode) => {
    const host = document.createElement('div')
    document.body.append(host)
    const shadow = host.attachShadow({ mode }),
      opener = document.createElement('button'),
      later = document.createElement('button'),
      mountPoint = document.createElement('div')
    shadow.append(opener, later, mountPoint)
    const shown = ref(true),
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
          h(KeepAlive, null, () =>
            shown.value
              ? h(Card, { floating: floating.value, ripple: false }, { 'floating-content': () => h(Child) })
              : null,
          ),
      },
      { attachTo: mountPoint },
    )
    try {
      opener.focus()
      floating.value = true
      await nextTick()
      ;(wrapper.get('input').element as HTMLInputElement).focus()
      shown.value = false
      await nextTick()
      later.focus()
      expect(shadow.activeElement).toBe(later)
      autoFocus.value = true
      shown.value = true
      await nextTick()
      await nextTick()
      expect(shadow.activeElement).toBe(wrapper.get('input').element)
      floating.value = false
      await nextTick()
      expect(shadow.activeElement).toBe(later)
    } finally {
      wrapper.unmount()
      host.remove()
    }
  },
)

test.each(['open', 'closed'] as const)(
  'restores an external opener after KeepAlive activation from a %s shadow root',
  async (mode) => {
    const host = document.createElement('div'),
      outside = document.createElement('button')
    document.body.append(host, outside)
    const shadow = host.attachShadow({ mode }),
      opener = document.createElement('button'),
      mountPoint = document.createElement('div')
    shadow.append(opener, mountPoint)
    const shown = ref(true),
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
          h(KeepAlive, null, () =>
            shown.value
              ? h(Card, { floating: floating.value, ripple: false }, { 'floating-content': () => h(Child) })
              : null,
          ),
      },
      { attachTo: mountPoint },
    )
    try {
      opener.focus()
      floating.value = true
      await nextTick()
      ;(wrapper.get('input').element as HTMLInputElement).focus()
      shown.value = false
      await nextTick()
      outside.focus()
      expect(document.activeElement).toBe(outside)
      autoFocus.value = true
      shown.value = true
      await nextTick()
      await nextTick()
      expect(shadow.activeElement).toBe(wrapper.get('input').element)
      floating.value = false
      await nextTick()
      expect(document.activeElement).toBe(outside)
    } finally {
      wrapper.unmount()
      host.remove()
      outside.remove()
    }
  },
)
