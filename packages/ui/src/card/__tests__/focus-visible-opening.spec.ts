import { defineComponent, h, KeepAlive, nextTick, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Card from '../Card.vue'

test('shows initially expanded content when its child focuses on mount and returns focus on close', async () => {
  vi.useFakeTimers()
  const opener = document.createElement('button')
  document.body.append(opener)
  opener.focus()
  const child = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onMounted(() => input.value?.focus())
      return () => h('input', { ref: input })
    },
  })
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: true },
    slots: { 'floating-content': () => h(child) },
  })
  try {
    await nextTick()
    const area = wrapper.get('[class$="card__floating-content"]')
    expect(document.activeElement).toBe(wrapper.get('input').element)
    expect((area.element as HTMLElement).style.height).toBe('auto')
    expect((area.element as HTMLElement).style.opacity).toBe('1')
    expect((area.element as HTMLElement).style.transition).toBe('none')
    expect(area.attributes('aria-hidden')).toBeUndefined()
    await wrapper.setProps({ floating: false })
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(opener)
    expect(area.attributes('aria-hidden')).toBe('true')
    expect((area.element as HTMLElement).style.height).toBe('0px')
    await wrapper.setProps({ floating: true })
    wrapper.get('input').element.focus()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    expect((area.element as HTMLElement).style.height).toBe('auto')
    expect(area.attributes('aria-hidden')).toBeUndefined()
  } finally {
    wrapper.unmount()
    opener.remove()
    vi.useRealTimers()
  }
})

test('focus in ordinary card content does not reveal floating content while opening', async () => {
  vi.useFakeTimers()
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: true },
    slots: { default: () => h('button', 'regular'), 'floating-content': () => h('input') },
  })
  try {
    await nextTick()
    wrapper.get('button').element.focus()
    await nextTick()
    const area = wrapper.get('[class$="card__floating-content"]')
    expect((area.element as HTMLElement).style.height).toBe('0px')
    expect((area.element as HTMLElement).style.opacity).toBe('0')
    expect(area.attributes('aria-hidden')).toBe('true')
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})

test('resets revealed content if closed while its KeepAlive card is inactive', async () => {
  vi.useFakeTimers()
  const shown = ref(true),
    floating = ref(true)
  const child = defineComponent({
    setup() {
      const input = ref<HTMLInputElement>()
      onMounted(() => input.value?.focus())
      return () => h('input', { ref: input })
    },
  })
  const wrapper = mount(
    {
      setup: () => () =>
        h(KeepAlive, null, () =>
          shown.value
            ? h(Card, { floating: floating.value, ripple: true }, { 'floating-content': () => h(child) })
            : null,
        ),
    },
    { attachTo: document.body },
  )
  try {
    await nextTick()
    expect((wrapper.get('[class$="card__floating-content"]').element as HTMLElement).style.height).toBe('auto')
    shown.value = false
    await nextTick()
    floating.value = false
    await nextTick()
    shown.value = true
    await nextTick()
    await nextTick()
    await nextTick()
    expect((wrapper.get('[class$="card__floating-content"]').element as HTMLElement).style.height).toBe('0px')
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})

test('ends the fade when content receives focus after opening starts', async () => {
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false, floatingDuration: 250 },
    slots: { 'floating-content': () => h('input') },
  })
  try {
    const area = wrapper.get('[class$="card__floating-content"]')
    for (let attempt = 0; attempt < 100 && (area.element as HTMLElement).style.opacity !== '1'; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 20))
    }
    expect((area.element as HTMLElement).style.opacity).toBe('1')
    expect(area.attributes('aria-hidden')).toBeUndefined()
    wrapper.get('input').element.focus()
    await nextTick()
    expect((area.element as HTMLElement).style.transition).toBe('none')
  } finally {
    wrapper.unmount()
  }
})
