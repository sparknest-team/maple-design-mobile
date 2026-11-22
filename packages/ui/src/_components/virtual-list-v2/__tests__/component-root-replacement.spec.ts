import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import VirtualListItem from '../virtual-list-item'

test('measures a component that replaces its own root element', async () => {
  const expanded = ref(false)
  const Row = defineComponent({
    setup: () => () => (expanded.value ? h('section', { 'data-height': 80 }) : h('div', { 'data-height': 20 })),
  })
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const height = Number(this.dataset.height)
    return { top: 0, bottom: height, height } as DOMRect
  })
  const observe = vi.fn()
  const unobserve = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = observe
      unobserve = unobserve
      disconnect = vi.fn()
    },
  )
  const setItemSize = vi.fn()
  const owner = mount(VirtualListItem, {
    props: { index: 4, hasItemSize: () => false, setItemSize },
    slots: { default: () => h(Row) },
  })
  try {
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
    const previous = owner.get('div[data-height="20"]').element
    expanded.value = true
    await nextTick()
    expect(unobserve).toHaveBeenCalledWith(previous)
    expect(observe).toHaveBeenCalledWith(owner.get('section').element)
    expect(owner.get('section').attributes('data-virtual-list-index')).toBe('4')
    expect(setItemSize).toHaveBeenLastCalledWith(null, 80)
    expanded.value = false
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
  } finally {
    owner.unmount()
    rect.mockRestore()
    vi.unstubAllGlobals()
  }
})

test('remeasures sibling roots when a nested component replaces its element', async () => {
  const expanded = ref(false)
  const Inner = defineComponent({
    setup: () => () => h(expanded.value ? 'section' : 'article', { 'data-height': expanded.value ? 80 : 20 }),
  })
  const Wrapper = defineComponent({ setup: () => () => h(Inner) })
  let resize!: () => void
  const observe = vi.fn()
  const unobserve = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: () => void) {
        resize = callback
      }
      observe = observe
      unobserve = unobserve
      disconnect = vi.fn()
    },
  )
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const height = this.parentElement ? Number(this.dataset.height) : 0
    const top = this.tagName === 'HEADER' ? 0 : 10
    return { top, bottom: top + height, height, width: 0 } as DOMRect
  })
  const setItemSize = vi.fn()
  const owner = mount(VirtualListItem, {
    props: { index: 4, hasItemSize: () => false, setItemSize },
    slots: { default: () => [h('header', { 'data-height': 10 }), h(Wrapper)] },
  })
  try {
    expect(setItemSize).toHaveBeenLastCalledWith(null, 30)
    const previous = owner.get('article').element
    expanded.value = true
    await nextTick()
    resize()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 90)
    expect(unobserve).toHaveBeenCalledWith(previous)
    expect(observe).toHaveBeenCalledWith(owner.get('section').element)
  } finally {
    owner.unmount()
    rect.mockRestore()
    vi.unstubAllGlobals()
  }
})
