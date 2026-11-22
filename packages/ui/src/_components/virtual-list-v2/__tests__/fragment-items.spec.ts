import { createSSRApp, Fragment, h, nextTick, ref, Suspense } from 'vue'
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

it('measures the local roots of a fragment component when it inserts a sibling', async () => {
  const expanded = ref(false)
  const Row = {
    inheritAttrs: false,
    setup: () => () => [
      h('div', { 'data-top': 10, 'data-height': 20 }),
      ...(expanded.value ? [h('div', { 'data-top': 30, 'data-height': 60 })] : []),
    ],
  }
  const setItemSize = vi.fn()
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = Number(this.dataset.top)
    const height = Number(this.dataset.height)
    return { top, bottom: top + height, width: 40, height } as DOMRect
  })
  const wrapper = mount(VirtualListItem, {
    props: { index: 7, hasItemSize: () => false, setItemSize },
    slots: { default: () => h(Row) },
  })
  try {
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
    expanded.value = true
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 80)
    expanded.value = false
    await nextTick()
    expect(setItemSize).toHaveBeenLastCalledWith(null, 20)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it('hydrates adjacent fragment components and measures each row within its own anchors', async () => {
  const setItemSize = vi.fn()
  const makeRow = (top: number, height: number) => ({
    inheritAttrs: false,
    render: () => [h('input', { 'data-top': top }), h('div', { 'data-top': top + height - 10 })],
  })
  const rows = [makeRow(20, 40), makeRow(600, 90)]
  const makeApp = () =>
    createSSRApp({
      render: () =>
        h(
          'main',
          rows.map((row, index) =>
            h(VirtualListItem, { key: index, index, hasItemSize: () => false, setItemSize }, { default: () => h(row) }),
          ),
        ),
    })
  const host = document.createElement('div')
  host.innerHTML = await renderToString(makeApp())
  const inputs = Array.from(host.querySelectorAll('input'))
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = Number(this.dataset.top)
    return { top, height: 10, bottom: top + 10, width: 40 } as DOMRect
  })
  const app = makeApp()
  try {
    app.mount(host)
    await nextTick()
    expect(setItemSize).toHaveBeenCalledWith(0, 40)
    expect(setItemSize).toHaveBeenCalledWith(1, 90)
    const hydrated = host.querySelectorAll('input')
    expect(hydrated[0]).toBe(inputs[0])
    expect(hydrated[1]).toBe(inputs[1])
  } finally {
    app.unmount()
    rect.mockRestore()
  }
})

it('updates a nested fragment row when its roots change, disappear and return', async () => {
  const state = ref('short')
  const Inner = {
    render: () =>
      state.value === 'empty'
        ? []
        : [
            h('div', { 'data-height': 20 }),
            ...(state.value === 'tall' ? [h('div', { 'data-height': 60, 'data-top': 20 })] : []),
          ],
  }
  const Row = { inheritAttrs: false, render: () => h(Inner) }
  const size = vi.fn()
  const siblingSize = vi.fn()
  const sibling = { inheritAttrs: false, render: () => [h('div', { 'data-height': 20 })] }
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = Number(this.dataset.top || 0)
    const height = Number(this.dataset.height)
    return { top, bottom: top + height, height, width: 20 } as DOMRect
  })
  const wrapper = mount({
    render: () =>
      h(
        'main',
        [Row, sibling].map((row, index) =>
          h(
            VirtualListItem,
            {
              key: index,
              index,
              hasItemSize: () => true,
              canMeasureZero: () => true,
              setItemSize: index ? siblingSize : size,
            },
            { default: () => h(row) },
          ),
        ),
      ),
  })
  try {
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(0, 20)
    siblingSize.mockClear()
    for (const [phase, height] of [
      ['tall', 80],
      ['empty', 0],
      ['short', 20],
    ] as const) {
      state.value = phase
      await nextTick()
      await nextTick()
      if (height === 0) {
        expect(size).toHaveBeenLastCalledWith(0, 0, true)
      } else {
        expect(size).toHaveBeenLastCalledWith(0, height)
      }
    }
    expect(siblingSize).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it('records zero for an emptied row only when visible and without text content', async () => {
  const state = ref('element')
  const measurementVersion = ref(0)
  let visible = false
  const size = vi.fn()
  const Row = {
    inheritAttrs: false,
    render: () => (state.value === 'element' ? [h('div')] : state.value === 'text' ? ['row'] : []),
  }
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    bottom: 20,
    height: 20,
    width: 10,
  } as DOMRect)
  const wrapper = mount(VirtualListItem, {
    props: { index: 1, hasItemSize: () => true, setItemSize: size, canMeasureZero: () => visible },
    slots: { default: () => h(Row) },
    global: { provide: { [measurementVersionKey as symbol]: measurementVersion } },
  })
  try {
    expect(size).toHaveBeenLastCalledWith(null, 20)
    state.value = 'empty'
    await nextTick()
    expect(size).not.toHaveBeenCalledWith(null, 0, true)
    visible = true
    state.value = 'text'
    await nextTick()
    expect(size).not.toHaveBeenCalledWith(null, 0, true)
    state.value = 'empty'
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(null, 0, true)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it('shares the child-list observer until the last fragment row unmounts', async () => {
  const count = ref(12)
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const Row = { inheritAttrs: false, render: () => [h('div'), h('div')] }
  const wrapper = mount({
    render: () =>
      h(
        'main',
        Array.from({ length: count.value }, (_, index) =>
          h(
            VirtualListItem,
            {
              key: index,
              index,
              hasItemSize: () => true,
              setItemSize: () => {},
            },
            { default: () => h(Row) },
          ),
        ),
      ),
  })
  try {
    const observations = observe.mock.calls.filter(([parent]) => parent === wrapper.element)
    expect(observations).toEqual([
      [wrapper.element, { childList: true, subtree: true, attributeFilter: ['class', 'style'] }],
    ])
    const observerIndex = observe.mock.calls.findIndex(([parent]) => parent === wrapper.element)
    const shared = observe.mock.contexts[observerIndex]
    count.value = 1
    await nextTick()
    expect(disconnect.mock.contexts).not.toContain(shared)
    count.value = 0
    await nextTick()
    expect(disconnect.mock.contexts.filter((instance) => instance === shared)).toHaveLength(1)
  } finally {
    wrapper.unmount()
    disconnect.mockRestore()
    observe.mockRestore()
  }
})

it('clears a cached row height when the component remounts empty', async () => {
  const mounted = ref(true)
  const empty = ref(false)
  const cache = new Map<number, number>()
  const Row = { inheritAttrs: false, render: () => (empty.value ? [] : [h('div')]) }
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    bottom: 20,
    height: 20,
    width: 10,
  } as DOMRect)
  const wrapper = mount({
    render: () =>
      mounted.value
        ? h(
            VirtualListItem,
            {
              key: 2,
              index: 2,
              hasItemSize: (key: number) => cache.has(key),
              canMeasureZero: () => true,
              setItemSize: (key: number, height: number) => cache.set(key, height),
            },
            { default: () => h(Row) },
          )
        : null,
  })
  try {
    expect(cache.get(2)).toBe(20)
    mounted.value = false
    await nextTick()
    empty.value = true
    mounted.value = true
    await nextTick()
    expect(cache.get(2)).toBe(0)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it.each(['slot', 'component'])('remeasures the %s row whose root spacing changed', async (location) => {
  const sizes = [vi.fn(), vi.fn()]
  const parts = () => [h('div'), h('section', [h('span')])]
  const Inner = { render: parts }
  const Outer = { inheritAttrs: false, render: () => h(Inner) }
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = this.tagName === 'SECTION' ? 20 + (this.classList.contains('wide') ? 15 : 0) : 0
    return { top, bottom: top + 20, height: 20, width: 40 } as DOMRect
  })
  const wrapper = mount({
    render: () =>
      h(
        'main',
        sizes.map((size, index) =>
          h(
            VirtualListItem,
            {
              key: index,
              index,
              hasItemSize: () => false,
              setItemSize: size,
            },
            { default: () => (location === 'slot' ? parts() : h(Outer)) },
          ),
        ),
      ),
  })
  try {
    await nextTick()
    expect(sizes[0]).toHaveBeenLastCalledWith(0, 40)
    sizes.forEach((size) => size.mockClear())
    wrapper.get('section').element.classList.add('wide')
    await nextTick()
    expect(sizes[0]).toHaveBeenLastCalledWith(0, 55)
    expect(sizes[1]).not.toHaveBeenCalled()
    sizes[0].mockClear()
    wrapper.get('span').element.classList.add('wide')
    await nextTick()
    expect(sizes[0]).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it('tracks ancestor theme classes and rebinds when the entire list moves', async () => {
  const source = document.createElement('aside')
  const target = document.createElement('aside')
  document.body.append(source, target)
  const size = vi.fn()
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = this.tagName === 'SECTION' ? (this.closest('.wide') ? 35 : 20) : 0
    return { top, bottom: top + 20, height: 20, width: 40 } as DOMRect
  })
  const wrapper = mount(
    {
      render: () =>
        h('main', [
          h(
            VirtualListItem,
            {
              key: 0,
              index: 0,
              hasItemSize: () => true,
              setItemSize: size,
            },
            { default: () => [h('header'), h('section')] },
          ),
        ]),
    },
    { attachTo: source },
  )
  try {
    expect(size).toHaveBeenLastCalledWith(0, 40)
    source.classList.add('wide')
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(0, 55)
    target.appendChild(wrapper.element)
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(0, 40)
    size.mockClear()
    source.classList.remove('wide')
    await nextTick()
    expect(size).not.toHaveBeenCalled()
    target.classList.add('wide')
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(0, 55)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
    source.remove()
    target.remove()
  }
})

it('measures the resolved async roots when the single fallback has no resize notification', async () => {
  let resolve!: () => void
  const ready = new Promise<void>((done) => {
    resolve = done
  })
  const empty = ref(false)
  const AsyncRow = {
    async setup() {
      await ready
      return () => (empty.value ? [] : [h('header'), h('section')])
    },
  }
  const Row = {
    inheritAttrs: false,
    render: () =>
      h(Suspense, null, {
        default: () => h(AsyncRow),
        fallback: () => h('i'),
      }),
  }
  const size = vi.fn()
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = this.tagName === 'SECTION' ? 10 : 0
    const height = this.tagName === 'I' ? 0 : 10
    return { top, bottom: top + height, height, width: 10 } as DOMRect
  })
  const wrapper = mount(VirtualListItem, {
    props: { index: 0, hasItemSize: () => true, canMeasureZero: () => true, setItemSize: size },
    slots: { default: () => h(Row) },
  })
  try {
    expect(wrapper.find('i').exists()).toBe(true)
    resolve()
    await new Promise((done) => setTimeout(done, 0))
    expect(wrapper.find('section').exists()).toBe(true)
    expect(size).toHaveBeenLastCalledWith(null, 20)
    empty.value = true
    await nextTick()
    await nextTick()
    expect(size).toHaveBeenLastCalledWith(null, 0, true)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
  }
})

it('uses only resize observation for an ordinary measurable single-root component', () => {
  const observe = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = observe
      unobserve = vi.fn()
      disconnect = vi.fn()
    },
  )
  const structural = vi.spyOn(MutationObserver.prototype, 'observe')
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    bottom: 20,
    height: 20,
    width: 10,
  } as DOMRect)
  const Row = { render: () => h('header') }
  const wrapper = mount({
    render: () =>
      h('main', [
        h(
          VirtualListItem,
          {
            index: 0,
            hasItemSize: () => false,
            setItemSize: () => {},
          },
          { default: () => h(Row) },
        ),
      ]),
  })
  try {
    expect(observe).toHaveBeenCalledWith(wrapper.get('header').element)
    expect(structural.mock.calls.some(([parent]) => parent === wrapper.element)).toBe(false)
  } finally {
    wrapper.unmount()
    rect.mockRestore()
    structural.mockRestore()
    vi.unstubAllGlobals()
  }
})
