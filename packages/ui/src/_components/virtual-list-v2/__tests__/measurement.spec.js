import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { useSize } from '../hooks/use-size'
import VirtualList from '../VirtualList.vue'

afterEach(() => vi.restoreAllMocks())

test('rendered bounds drive bottom alignment and visible auto does not change the window', async () => {
  const owner = mount(VirtualList, {
    props: { data: Array.from({ length: 100 }, (_, key) => ({ key })), estimatedSize: 48, buffer: 2, height: 100 },
    slots: { item: ({ item }) => h('div', String(item.key)) },
  })
  const element = owner.element
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 100 },
  })
  owner.vm.scrollTo({ index: 10 })
  await nextTick()
  const row = owner.find('[data-virtual-list-index="10"]').element
  let origin = 490
  vi.spyOn(row, 'getBoundingClientRect').mockImplementation(() => ({
    top: origin - element.scrollTop,
    bottom: origin + 27 - element.scrollTop,
    height: 27,
    x: 0,
    y: 0,
    left: 0,
    right: 100,
    width: 100,
    toJSON: () => ({}),
  }))
  owner.vm.scrollTo({ index: 10, align: 'bottom' })
  await nextTick()
  expect(element.scrollTop).toBe(417)
  owner.vm.onScroll({ target: element })
  origin = 493
  await nextTick()
  expect(element.scrollTop).toBe(420)
  const start = owner.vm.start
  owner.vm.scrollTo({ index: 10, align: 'auto' })
  await nextTick()
  expect(element.scrollTop).toBe(420)
  expect(owner.vm.start).toBe(start)
  owner.unmount()
})

test('late measurements invalidate cached padding and agree with scroll offsets', async () => {
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref(Array.from({ length: 100 }, (_, key) => key)),
          contentRef: ref(),
          fixedSize: ref(false),
          estimatedSize: ref(48),
          buffer: ref(2),
        })
        return () =>
          h('div', {
            style: { paddingTop: `${size.frontPadding.value}px`, paddingBottom: `${size.behindPadding.value}px` },
          })
      },
    }),
  )
  size.setStart(40)
  await nextTick()
  expect(size.frontPadding.value).toBe(40 * 48)
  expect(size.behindPadding.value).toBe(54 * 48)
  size.setItemSize(39, 46)
  size.setItemSize(46, 50)
  await nextTick()
  expect(size.frontPadding.value).toBe(size.getScrollOffset(40))
  expect(owner.element.style.paddingTop).toBe('1918px')
  expect(owner.element.style.paddingBottom).toBe('2594px')
  size.setItemSize(39, 49)
  await nextTick()
  expect(owner.element.style.paddingTop).toBe('1921px')
  owner.unmount()
})

test('updates measurement mode and bounds invalid estimates and scroll offsets', async () => {
  const fixed = ref(true)
  const estimate = ref(20)
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref([0, 1, 2]),
          contentRef: ref(),
          fixedSize: fixed,
          estimatedSize: estimate,
          buffer: ref(1),
        })
        return () => h('div')
      },
    }),
  )
  size.setItemSize(0, 50)
  expect(size.getScrollOffset(1)).toBe(20)
  fixed.value = false
  await nextTick()
  expect(size.getScrollOffset(1)).toBe(50)
  fixed.value = true
  estimate.value = 0
  await nextTick()
  expect(size.getScrollOffset(1)).toBe(30)
  expect(Number.isFinite(size.getStartByScroll(Number.MAX_VALUE))).toBe(true)
  size.setItemSize(1, 0)
  fixed.value = false
  await nextTick()
  expect(size.getScrollOffset(2)).toBe(80)
  owner.unmount()
})

test('covers the viewport with zero buffer and grows with viewport size', async () => {
  const viewport = ref(240)
  const offset = ref(0)
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref(Array.from({ length: 100 }, (_, i) => i)),
          contentRef: ref(),
          fixedSize: ref(true),
          estimatedSize: ref(20),
          buffer: ref(0),
          viewportHeight: viewport,
          scrollOffset: offset,
        })
        return () => h('div')
      },
    }),
  )
  expect(size.end.value - size.start.value).toBe(12)
  size.setStart(size.getStartByScroll(101))
  expect(size.start.value).toBe(5)
  expect(size.end.value).toBe(18)
  viewport.value = 400
  await nextTick()
  expect(size.end.value).toBe(26)
  owner.unmount()
})

test('accepts explicitly verified zero measurements without stalling offset lookup', async () => {
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref([0, 1]),
          contentRef: ref(),
          fixedSize: ref(false),
          estimatedSize: ref(20),
          buffer: ref(0),
        })
        return () => h('div')
      },
    }),
  )
  try {
    size.setItemSize(0, 0, true)
    await nextTick()
    expect(size.getScrollOffset(1)).toBe(0)
    expect(size.getStartByScroll(0)).toBe(0)
  } finally {
    owner.unmount()
  }
})

test('keeps zero-height items at an exact scroll boundary in the render window', async () => {
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref([0, 1, 2, 3]),
          contentRef: ref(),
          fixedSize: ref(false),
          estimatedSize: ref(20),
          buffer: ref(0),
        })
        return () => h('div')
      },
    }),
  )
  try {
    size.setItemSize(1, 0, true)
    size.setItemSize(2, 0, true)
    await nextTick()
    expect(size.getStartByScroll(20)).toBe(1)
    expect(size.getStartByScroll(21)).toBe(3)
  } finally {
    owner.unmount()
  }
})
