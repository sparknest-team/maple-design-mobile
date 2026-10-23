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
