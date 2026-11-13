import { createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import VirtualListItem, { measurementVersionKey } from '../virtual-list-item'
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

it('ignores a hidden root when measuring a multi-root item', async () => {
  const hidden = ref(false)
  const setItemSize = vi.fn()
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    if (this.dataset.part === 'hidden' && hidden.value) {
      return { top: 0, bottom: 0, height: 0, width: 0 } as DOMRect
    }
    return this.dataset.part === 'first'
      ? ({ top: 120, bottom: 140, height: 20, width: 100 } as DOMRect)
      : ({ top: 140, bottom: 170, height: 30, width: 100 } as DOMRect)
  })
  const clientRects = vi.spyOn(HTMLElement.prototype, 'getClientRects').mockImplementation(function (
    this: HTMLElement,
  ) {
    return (this.dataset.part === 'hidden' && hidden.value ? [] : [{}]) as unknown as DOMRectList
  })
  const wrapper = mount(VirtualListItem, {
    props: { index: 0, hasItemSize: () => false, setItemSize },
    slots: {
      default: () =>
        h(Fragment, [
          h('div', { 'data-part': 'first' }, 'first'),
          h('div', { 'data-part': 'hidden', style: { display: hidden.value ? 'none' : '' } }, 'second'),
        ]),
    },
  })
  try {
    expect(setItemSize).toHaveBeenLastCalledWith(null, 50)
    hidden.value = true
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
    hidden.value = false
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 50)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
    clientRects.mockRestore()
  }
})

it('keeps zero-sized roots that still have a layout box in the measured span', () => {
  const setItemSize = vi.fn()
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.dataset.part === 'zero'
      ? ({ top: 100, bottom: 100, height: 0, width: 0 } as DOMRect)
      : ({ top: 120, bottom: 140, height: 20, width: 100 } as DOMRect)
  })
  const clientRects = vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{}] as unknown as DOMRectList)
  const wrapper = mount(VirtualListItem, {
    props: { index: 0, hasItemSize: () => false, setItemSize },
    slots: { default: () => h(Fragment, [h('div', { 'data-part': 'zero' }), h('div', { 'data-part': 'first' })]) },
  })
  try {
    expect(setItemSize).toHaveBeenLastCalledWith(null, 40)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
    clientRects.mockRestore()
  }
})

it.each([true, false])(
  'records an entirely hidden item only when its container is measurable (%s)',
  async (measurable) => {
    const hidden = ref(false)
    const setItemSize = vi.fn()
    const rect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() =>
        hidden.value
          ? ({ top: 0, bottom: 0, height: 0, width: 0 } as DOMRect)
          : ({ top: 100, bottom: 120, height: 20, width: 100 } as DOMRect),
      )
    const clientRects = vi
      .spyOn(HTMLElement.prototype, 'getClientRects')
      .mockImplementation(() => (hidden.value ? [] : [{}]) as unknown as DOMRectList)
    const wrapper = mount(VirtualListItem, {
      props: { index: 0, hasItemSize: () => false, setItemSize, canMeasureZero: () => measurable } as any,
      slots: { default: () => h('div', { style: { display: hidden.value ? 'none' : '' } }, 'item') },
    })
    try {
      expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
      const calls = setItemSize.mock.calls.length
      hidden.value = true
      await nextTick()
      if (measurable) {
        expect(setItemSize).toHaveBeenLastCalledWith(null, 0, true)
      } else {
        expect(setItemSize).toHaveBeenCalledTimes(calls)
      }
    } finally {
      wrapper.unmount()
      rect.mockRestore()
      clientRects.mockRestore()
    }
  },
)

it('remeasures a hidden item when its container becomes measurable again', async () => {
  const hidden = ref(false)
  let measurable = false
  const measurementVersion = ref(0)
  const setItemSize = vi.fn()
  const rect = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() =>
      hidden.value
        ? ({ top: 0, bottom: 0, height: 0, width: 0 } as DOMRect)
        : ({ top: 100, bottom: 120, height: 20, width: 100 } as DOMRect),
    )
  const clientRects = vi
    .spyOn(HTMLElement.prototype, 'getClientRects')
    .mockImplementation(() => (hidden.value ? [] : [{}]) as unknown as DOMRectList)
  const wrapper = mount(VirtualListItem, {
    props: { index: 0, hasItemSize: () => false, setItemSize, canMeasureZero: () => measurable },
    slots: { default: () => h('div', { style: { display: hidden.value ? 'none' : '' } }, 'item') },
    global: { provide: { [measurementVersionKey as symbol]: measurementVersion } },
  })
  try {
    hidden.value = true
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
    measurable = true
    measurementVersion.value++
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 0, true)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
    clientRects.mockRestore()
  }
})

it('preserves input state when a visible container triggers remeasurement', async () => {
  const measurementVersion = ref(0)
  const wrapper = mount(VirtualListItem, {
    props: { index: 0, hasItemSize: () => false, setItemSize: () => {} },
    slots: { default: () => h('input', { value: 'initial' }) },
    global: { provide: { [measurementVersionKey as symbol]: measurementVersion } },
  })
  try {
    const input = wrapper.get('input').element as HTMLInputElement
    input.value = 'unsaved draft'
    measurementVersion.value++
    await nextTick()
    expect(wrapper.get('input').element).toBe(input)
    expect(input.value).toBe('unsaved draft')
  } finally {
    wrapper.unmount()
  }
})

it.each(['slot', 'component'])('measures and indexes a single DOM root from %s', async (location) => {
  const setItemSize = vi.fn()
  const child = { render: () => [h('div', 'first'), h('div', 'second')] }
  const rect = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => ({ top: 100, bottom: 150, width: 100, height: 50 }) as DOMRect)
  const wrapper = mount(VirtualListItem, {
    props: { index: 7, hasItemSize: () => false, setItemSize },
    slots: {
      default: () => (location === 'slot' ? h('section', [h(child)]) : h({ render: () => h('section', [h(child)]) })),
    },
  })
  try {
    expect(wrapper.get('section').attributes('data-virtual-list-index')).toBe('7')
    expect(wrapper.get('section').text()).toBe('firstsecond')
    expect(setItemSize).toHaveBeenLastCalledWith(null, 50)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})
