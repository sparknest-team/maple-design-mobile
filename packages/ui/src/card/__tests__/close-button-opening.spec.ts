import { defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Card from '../Card.vue'

vi.mock('@maple-design/shared-vue', async () => {
  const actual = await vi.importActual('@maple-design/shared-vue')
  return { ...actual, doubleRaf: () => new Promise(() => {}) }
})

test.each([false, true])('keeps a waiting close button hidden until focus (autofocus=%s)', async (autofocus) => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const opener = document.createElement('button')
  document.body.append(opener)
  opener.focus()
  const child = defineComponent({
    setup() {
      const button = ref<HTMLButtonElement>()
      onMounted(() => {
        if (autofocus) {
          button.value?.focus()
        }
      })
      return () => h('button', { ref: button }, 'Close action')
    },
  })
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false },
    slots: { 'close-button': () => h(child) },
  })
  try {
    await nextTick()
    await nextTick()
    vi.advanceTimersByTime(0)
    await nextTick()
    const area = wrapper.get('[class*="card__floating-buttons"]')
    const button = area.get('button')
    if (!autofocus) {
      expect(area.attributes('aria-hidden')).toBe('true')
      button.element.focus()
      await nextTick()
    }
    expect(document.activeElement).toBe(button.element)
    expect(area.attributes('aria-hidden')).toBeUndefined()
    expect((area.element as HTMLElement).style.opacity).toBe('1')
    expect((wrapper.get('[class$="card__floater"]').element as HTMLElement).style.overflow).toBe('visible')
    expect((area.element as HTMLElement).style.transition).toBe('none')
    await wrapper.setProps({ floating: false })
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    opener.remove()
    vi.useRealTimers()
  }
})

test('reveals the default close button when it receives focus during the frame wait', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const wrapper = mount(Card, { attachTo: document.body, props: { floating: true, ripple: false } })
  try {
    await nextTick()
    await nextTick()
    vi.advanceTimersByTime(0)
    await nextTick()
    const area = wrapper.get('[class*="card__floating-buttons"]')
    expect(area.attributes('aria-hidden')).toBe('true')
    area.get('button').element.focus()
    await nextTick()
    expect(area.attributes('aria-hidden')).toBeUndefined()
    expect((area.element as HTMLElement).style.opacity).toBe('1')
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})

test('keeps the default close action available when content focuses before the opening frame', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
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
    props: { floating: true, ripple: false },
    slots: { 'floating-content': () => h(child) },
  })
  try {
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    vi.advanceTimersByTime(0)
    await nextTick()
    const area = wrapper.get('[class*="card__floating-buttons"]')
    expect(area.attributes('aria-hidden')).toBeUndefined()
    expect((area.element as HTMLElement).style.opacity).toBe('1')
    await area.get('button').trigger('click')
    expect(wrapper.emitted('update:floating')).toEqual([[false]])
    await wrapper.setProps({ floating: false })
    await nextTick()
    expect(document.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    opener.remove()
    vi.useRealTimers()
  }
})
