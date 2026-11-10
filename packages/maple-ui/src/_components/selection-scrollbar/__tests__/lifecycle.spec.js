import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Selection from '../Scrollbar.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
})
const flush = async () => {
  await nextTick()
  await nextTick()
}
async function fixture(Component) {
  const active = ref(true),
    disabled = ref(false)
  const Child = defineComponent({
    setup: () => () => h(Component, { disableHorizontal: disabled.value, disableVertical: disabled.value }),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    {
      global: {
        stubs: {
          ResizeObserver: defineComponent({
            setup:
              (_, { slots }) =>
              () =>
                h('div', slots.default?.()),
          }),
          Thumb: defineComponent({
            props: ['orientation'],
            setup(props, { expose }) {
              expose({ setOffset: (value) => offsets[props.orientation](value) })
              return () => h('i')
            },
          }),
        },
      },
    },
  )
  const offsets = { horizontal: vi.fn(), vertical: vi.fn() }
  owners.push(owner)
  await flush()
  const child = owner.findComponent(Component),
    vm = child.vm
  const container = vm.containerRef
  const geometry = {
    clientWidth: 100,
    clientHeight: 80,
    offsetWidth: 100,
    offsetHeight: 80,
    scrollWidth: 500,
    scrollHeight: 400,
    scrollTop: 10,
    scrollLeft: 10,
  }
  for (const key of Object.keys(geometry)) {
    Object.defineProperty(container, key, { configurable: true, get: () => geometry[key] })
  }
  const scroll = vi.fn()
  Object.defineProperty(container, 'scrollTo', { configurable: true, value: scroll })
  vm.handleResize()
  await flush()
  vm.handleResize()
  offsets.horizontal.mockClear()
  offsets.vertical.mockClear()
  return { owner, child, vm, active, disabled, container, geometry, scroll, offsets }
}
describe('selection', () => {
  const Component = Selection
  test('current native commands preserve overloads', async () => {
    const f = await fixture(Component)
    f.vm.scrollTo({ top: 20, left: 10 })
    f.vm.scrollTo(10, 20)
    expect(f.scroll.mock.calls).toEqual([[{ top: 20, left: 10 }], [10, 20]])
  })
  test('numeric zero origin is a valid native command', async () => {
    const f = await fixture(Component)
    f.vm.scrollTo(0, 0)
    expect(f.scroll).toHaveBeenCalledWith(0, 0)
  })
  test('inactive retained public commands cannot scroll', async () => {
    const f = await fixture(Component)
    f.active.value = false
    await flush()
    f.vm.scrollTo({ top: 20 })
    f.vm.scrollTop(30)
    f.vm.scrollLeft(40)
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('inactive retained thumb commands cannot scroll', async () => {
    const f = await fixture(Component),
      horizontal = f.vm.handleHorizontalScroll
    f.active.value = false
    await flush()
    horizontal(10)
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('inactive measurement cannot update saved geometry', async () => {
    const f = await fixture(Component),
      measure = f.vm.handleResize,
      old = f.vm.horizontalData
    f.active.value = false
    await flush()
    f.geometry.scrollWidth = 900
    measure()
    expect(f.vm.horizontalData).toBe(old)
  })
  test('previous binding measurement is inert after activation', async () => {
    const f = await fixture(Component),
      measure = f.vm.handleResize
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const current = f.vm.horizontalData
    f.geometry.scrollWidth = 900
    measure()
    expect(f.vm.horizontalData).toBe(current)
  })
  test('previous binding scroll event cannot notify after activation', async () => {
    const f = await fixture(Component),
      listener = f.vm.handleScroll
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    listener(new Event('scroll'))
    expect(f.child.emitted('scroll')).toBeUndefined()
  })
  test('disabled axis rejects a retained thumb command', async () => {
    const f = await fixture(Component),
      horizontal = f.vm.handleHorizontalScroll
    f.disabled.value = true
    await flush()
    horizontal(10)
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('zero viewport does not produce non-finite thumb metrics', async () => {
    const f = await fixture(Component)
    f.geometry.clientWidth = 0
    f.geometry.offsetWidth = 0
    f.vm.handleResize()
    expect(Object.values(f.vm.horizontalData).every(Number.isFinite)).toBe(true)
    expect(f.vm.hasHorizontalScrollbar).toBe(false)
  })
  test('measurement resets a thumb when scrolling returns to zero', async () => {
    const f = await fixture(Component)
    f.geometry.scrollLeft = 0
    f.geometry.scrollTop = 0
    f.vm.handleResize()
    expect(f.offsets.horizontal).toHaveBeenCalledWith(0)
    expect(f.offsets.vertical).toHaveBeenCalledWith(0)
  })
  test('geometry reentrant disposal cannot commit new measurement', async () => {
    const f = await fixture(Component),
      old = f.vm.horizontalData
    Object.defineProperty(f.container, 'clientWidth', {
      configurable: true,
      get: () => {
        f.owner.unmount()
        return 100
      },
    })
    f.geometry.scrollWidth = 900
    f.vm.handleResize()
    expect(f.vm.horizontalData).toBe(old)
  })
  test('new reentrant measurement owns geometry', async () => {
    const f = await fixture(Component)
    let nested = false
    Object.defineProperty(f.container, 'clientWidth', {
      configurable: true,
      get: () => {
        if (nested) {
          return 200
        }
        nested = true
        f.vm.handleResize()
        return 100
      },
    })
    f.vm.handleResize()
    const actual = f.vm.horizontalData.ratio
    f.vm.handleResize()
    expect(actual).toBe(f.vm.horizontalData.ratio)
  })
  test('disposal clears refs and makes retained native commands inert', async () => {
    const f = await fixture(Component)
    f.owner.unmount()
    f.vm.scrollTo({ top: 20 })
    f.vm.scrollTop(30)
    f.vm.scrollLeft(40)
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('previous binding thumb is inert but fresh activation command works', async () => {
    const f = await fixture(Component),
      old = f.vm.handleHorizontalScroll
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    old(10)
    expect(f.scroll).not.toHaveBeenCalled()
    f.vm.scrollTop(0)
    expect(f.scroll).toHaveBeenCalledWith({ top: 0 })
  })
  test('native options are forwarded without synthetic animation', async () => {
    const f = await fixture(Component),
      options = { top: 20, behavior: 'smooth' }
    f.vm.scrollTo(options)
    expect(f.scroll.mock.calls).toEqual([[options]])
  })
  test('horizontal conversion cannot scroll an element disposed during geometry access', async () => {
    const f = await fixture(Component)
    Object.defineProperty(f.container, 'scrollWidth', {
      configurable: true,
      get: () => {
        f.owner.unmount()
        return 500
      },
    })
    f.vm.handleHorizontalScroll(10)
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('RTL thumb measurement and native scrolling use opposite coordinate systems', async () => {
    const f = await fixture(Component)
    f.container.setAttribute('dir', 'rtl')
    f.geometry.scrollLeft = -100
    f.vm.handleResize()
    const ratio = f.vm.horizontalData.ratio
    expect(f.offsets.horizontal).toHaveBeenCalledWith(Math.round(300 / ratio))
    f.vm.handleHorizontalScroll(10)
    expect(f.scroll).toHaveBeenCalledWith({ left: 10 * ratio - 400 })
  })
  test('horizontal measurement uses its own axis ratio', async () => {
    const f = await fixture(Component)
    f.geometry.scrollLeft = 100
    f.vm.handleResize()
    const expected = Math.round(100 / f.vm.horizontalData.ratio)
    expect(f.offsets.horizontal).toHaveBeenCalledWith(expected)
  })
})
