import { createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import VirtualListItem from '../virtual-list-item'
import VirtualList from '../VirtualList.vue'

describe('virtual list fragment items', () => {
  it('measures all roots after keyed siblings are reordered', async () => {
    const reversed = ref(false)
    const setItemSize = vi.fn()
    const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = Number(this.dataset.top)
      const bottom = Number(this.dataset.bottom)
      return { top, bottom, height: bottom - top } as DOMRect
    })
    const wrapper = mount(VirtualListItem, {
      props: { index: 1, hasItemSize: () => false, setItemSize },
      slots: {
        default: () =>
          h(
            Fragment,
            (reversed.value ? ['b', 'a'] : ['a', 'b']).map((key, index) =>
              h('div', { key, 'data-top': index * 30, 'data-bottom': (index + 1) * 30 }, key),
            ),
          ),
      },
    })
    try {
      expect(setItemSize).toHaveBeenLastCalledWith(null, 60)
      reversed.value = true
      await nextTick()
      expect(wrapper.text()).toBe('ba')
      expect(setItemSize).toHaveBeenLastCalledWith(null, 60)
    } finally {
      wrapper.unmount()
      rect.mockRestore()
    }
  })
  it('measures roots nested in arrays as part of the same item', () => {
    const setItemSize = vi.fn()
    const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = Number(this.dataset.top)
      const bottom = Number(this.dataset.bottom)
      return { top, bottom, height: bottom - top } as DOMRect
    })
    const wrapper = mount(VirtualListItem, {
      props: { index: 1, hasItemSize: () => false, setItemSize },
      slots: {
        default: () =>
          h(Fragment, [
            h('div', { 'data-top': 0, 'data-bottom': 20 }, 'parent'),
            [h('div', { 'data-top': 20, 'data-bottom': 70 }, 'child')],
          ]),
      },
    })
    try {
      expect(wrapper.text()).toBe('parentchild')
      expect(setItemSize).toHaveBeenLastCalledWith(null, 70)
      expect(wrapper.findAll('[data-virtual-list-index="1"]')).toHaveLength(2)
    } finally {
      wrapper.unmount()
      rect.mockRestore()
    }
  })
  it('preserves all roots and measures the complete group after it changes', async () => {
    const expanded = ref(false)
    const setItemSize = vi.fn()
    const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = Number(this.dataset.top)
      const bottom = Number(this.dataset.bottom)
      return { top, bottom, height: bottom - top } as DOMRect
    })
    const wrapper = mount(VirtualListItem, {
      props: { index: 3, hasItemSize: () => false, setItemSize },
      slots: {
        default: () =>
          h(Fragment, [
            h('div', { 'data-top': 10, 'data-bottom': 30 }, 'row'),
            expanded.value ? h('div', { 'data-top': 30, 'data-bottom': 70 }, 'detail') : null,
          ]),
      },
    })
    try {
      expect(wrapper.text()).toBe('row')
      expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
      expanded.value = true
      await nextTick()
      expect(wrapper.text()).toBe('rowdetail')
      expect(setItemSize).toHaveBeenLastCalledWith(null, 60)
      expanded.value = false
      await nextTick()
      expect(wrapper.text()).toBe('row')
      expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
    } finally {
      wrapper.unmount()
      rect.mockRestore()
    }
  })

  it('aligns the bottom of a multi-root item using its last root', async () => {
    const wrapper = mount(VirtualList, {
      props: { data: [{ key: 'a' }, { key: 'b' }], height: 50, estimatedSize: 40 },
      slots: {
        item: ({ index }: { index: number }) =>
          h(Fragment, [h('div', { 'data-part': `${index}-first` }), h('div', { 'data-part': `${index}-last` })]),
      },
    })
    try {
      const container = wrapper.element as HTMLElement
      Object.defineProperty(container, 'clientHeight', { value: 50 })
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({ top: 0, bottom: 50, height: 50 } as DOMRect)
      const first = wrapper.get('[data-part="0-first"]').element
      const last = wrapper.get('[data-part="0-last"]').element
      vi.spyOn(first, 'getBoundingClientRect').mockImplementation(
        () => ({ top: 20 - container.scrollTop, bottom: 50 - container.scrollTop, height: 30 }) as DOMRect,
      )
      vi.spyOn(last, 'getBoundingClientRect').mockImplementation(
        () => ({ top: 50 - container.scrollTop, bottom: 90 - container.scrollTop, height: 40 }) as DOMRect,
      )
      wrapper.vm.scrollTo({ index: 0, align: 'bottom' })
      await nextTick()
      expect(container.scrollTop).toBe(40)
    } finally {
      wrapper.unmount()
      vi.restoreAllMocks()
    }
  })

  it('retains the state of every root when keyed items are reordered', async () => {
    const data = [{ key: 'a' }, { key: 'b' }]
    const wrapper = mount(VirtualList, {
      props: { data, height: 100, estimatedSize: 30 },
      slots: {
        item: ({ item }: { item: { key: string } }) =>
          h(Fragment, [h('span', { key: 'label' }, item.key), h('input', { key: 'input', 'data-item': item.key })]),
      },
    })
    try {
      const input = wrapper.get('[data-item="a"]').element as HTMLInputElement
      input.value = 'draft'
      await wrapper.setProps({ data: [data[1], data[0]] })
      expect(wrapper.get('[data-item="a"]').element).toBe(input)
      expect(input.value).toBe('draft')
    } finally {
      wrapper.unmount()
    }
  })

  it('hydrates all server-rendered roots without replacing them', async () => {
    const makeApp = () =>
      createSSRApp({
        render: () =>
          h(
            VirtualListItem,
            {
              index: 1,
              hasItemSize: () => false,
              setItemSize: () => {},
            },
            { default: () => h(Fragment, [h('span', 'row'), [h('span', 'detail')]]) },
          ),
      })
    const host = document.createElement('div')
    host.innerHTML = await renderToString(makeApp())
    const before = Array.from(host.querySelectorAll('span'))
    expect(before.map((node) => node.textContent)).toEqual(['row', 'detail'])
    const app = makeApp()
    app.mount(host)
    try {
      await nextTick()
      expect(Array.from(host.querySelectorAll('span'))).toEqual(before)
    } finally {
      app.unmount()
    }
  })
})
