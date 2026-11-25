import { computed, createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { provideDirection, useDirection } from '@maple-design/use-vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Carousel, { CarouselItem } from '../../carousel'
import NativeDialog from '../../dialog/Dialog.vue'
import ScopeProvider from '../../locale-provider'
import Rate from '../../rate'
import Slider from '../../slider'
import Trigger from '../../trigger'
import { getPlacementOffset, getTransformOrigin } from '../../trigger/geometry'
import { nativeScrollLeft, physicalScrollLeft } from '../direction'

const wrappers = []
const hosts = []
function host(dir = 'rtl') {
  const el = document.createElement('div')
  el.dir = dir
  document.body.append(el)
  hosts.push(el)
  return el
}
function setup(component, options = {}) {
  const wrapper = mount(component, { attachTo: host(), ...options })
  wrappers.push(wrapper)
  return wrapper
}
async function settled() {
  await nextTick()
  await Promise.resolve()
  await nextTick()
  await nextTick()
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  hosts.splice(0).forEach((el) => el.remove())
  vi.restoreAllMocks()
})

test('native nested scopes update dynamically and stop affecting an unmounted consumer', async () => {
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(() => el.value)
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const disconnect = vi.spyOn(window.MutationObserver.prototype, 'disconnect')
  const wrapper = setup(Probe)
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('rtl')
  wrapper.element.parentElement.dir = 'ltr'
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('ltr')
  await wrapper.setProps({ dir: 'rtl' })
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('rtl')
  wrapper.unmount()
  wrappers.pop()
  expect(disconnect).toHaveBeenCalled()
  disconnect.mockRestore()
})

test('observes native ancestors only while direction is inherited', async () => {
  const explicit = ref('ltr')
  const Probe = defineComponent({
    setup() {
      const el = ref()
      const { dir } = useDirection(
        () => el.value,
        () => explicit.value,
      )
      return () => h('span', { ref: el, 'data-direction': dir.value })
    },
  })
  const observe = vi.spyOn(window.MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(window.MutationObserver.prototype, 'disconnect')
  const wrapper = setup(Probe)
  const rootObservers = () =>
    observe.mock.contexts.filter((_, i) => observe.mock.calls[i][0] === document.documentElement)
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('ltr')
  expect(rootObservers()).toHaveLength(0)
  explicit.value = undefined
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('rtl')
  expect(rootObservers()).toHaveLength(1)
  const [observer] = rootObservers()
  explicit.value = 'rtl'
  await settled()
  expect(disconnect.mock.contexts).toContain(observer)
  wrapper.element.parentElement.dir = 'ltr'
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('rtl')
  explicit.value = undefined
  await settled()
  expect(wrapper.attributes('data-direction')).toBe('ltr')
})

test('reads the latest target immediately when an explicit direction is removed', async () => {
  const target = ref(host('ltr'))
  const explicit = ref('ltr')
  let read
  setup(
    defineComponent({
      setup() {
        const { dir } = useDirection(
          () => target.value,
          () => explicit.value,
        )
        read = () => dir.value
        return () => h('span')
      },
    }),
  )
  await settled()
  target.value = host('rtl')
  await settled()
  explicit.value = undefined
  expect(read()).toBe('rtl')
})

test('injected direction is available during SSR without consulting the browser', async () => {
  const Probe = defineComponent({
    setup() {
      const { dir } = useDirection()
      return () => h('span', dir.value)
    },
  })
  const Scope = defineComponent({
    setup() {
      provideDirection(computed(() => 'rtl'))
      return () => h(Probe)
    },
  })
  expect(await renderToString(createSSRApp(Scope))).toBe('<span>rtl</span>')
})

test('slider mirrors horizontal value positions and keys while vertical keys remain stable', async () => {
  const wrapper = setup(Slider, { props: { editMode: 'direct', defaultValue: 20 } })
  await settled()
  const thumb = wrapper.get('[role="slider"]')
  expect(thumb.element.style.left).toBe('80%')
  await thumb.trigger('keydown', { key: 'ArrowLeft' })
  expect(thumb.attributes('aria-valuenow')).toBe('21')
  await wrapper.setProps({ orientation: 'vertical' })
  await thumb.trigger('keydown', { key: 'ArrowRight' })
  expect(thumb.attributes('aria-valuenow')).toBe('22')
  wrapper.element.parentElement.dir = 'ltr'
  await settled()
  await wrapper.setProps({ orientation: 'horizontal' })
  expect(thumb.element.style.left).toBe('22%')
})

test('rate uses the right half for a half-value in RTL and mirrors horizontal keys', async () => {
  const wrapper = setup(Rate, { props: { editMode: 'direct', allowHalf: true } })
  await settled()
  const symbol = wrapper.get('[class$="__content"]')
  symbol.element.getBoundingClientRect = () => ({ left: 0, right: 100, width: 100 })
  await symbol.trigger('click', { clientX: 80 })
  expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('0.5')
  await wrapper.get('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' })
  expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('1')
})

test('carousel next follows ArrowLeft in RTL and respects a local LTR override', async () => {
  const wrapper = setup(Carousel, {
    props: { keyboard: true },
    slots: {
      default: () => [h(CarouselItem, { key: 'a' }, () => 'a'), h(CarouselItem, { key: 'b' }, () => 'b')],
    },
  })
  await settled()
  await wrapper.trigger('keydown', { key: 'ArrowLeft' })
  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([2])
  await wrapper.setProps({ dir: 'ltr' })
  await settled()
  await wrapper.trigger('keydown', { key: 'ArrowLeft' })
  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([1])
})

test('logical popup alignments reverse while physical sides and vertical alignment stay physical', () => {
  const reference = { scrollLeft: 100, scrollTop: 50, width: 100, height: 20 }
  const popup = { width: 40, height: 30 }
  expect(getPlacementOffset('bottom-start', reference, popup, 0, [0, 0], 'rtl').left).toBe(160)
  expect(getPlacementOffset('bottom-end', reference, popup, 0, [0, 0], 'rtl').left).toBe(100)
  expect(getPlacementOffset('left-start', reference, popup, 0, [0, 0], 'rtl')).toEqual({ left: 60, top: 50 })
  expect(getTransformOrigin('bottom-start', 'rtl')).toBe(getTransformOrigin('bottom-end', 'ltr'))
})

test('teleported popup receives its reference scope and updates when that scope changes', async () => {
  const wrapper = setup(Trigger, {
    props: { open: true, autoFitPosition: false, placement: 'bottom-start' },
    slots: {
      default: () => h('button', 'open'),
      content: () => 'popup',
    },
  })
  await settled()
  const popup = document.querySelector('[trigger-placement]')
  expect(popup.getAttribute('dir')).toBe('rtl')
  wrapper.element.parentElement.dir = 'ltr'
  await settled()
  expect(popup.getAttribute('dir')).toBe('ltr')
})

test('native negative RTL scrolling maps to physical thumb positions and clamps overscroll', () => {
  const el = host()
  Object.defineProperties(el, { scrollWidth: { value: 1000 }, clientWidth: { value: 200 } })
  el.scrollLeft = 0
  expect(physicalScrollLeft(el)).toBe(800)
  el.scrollLeft = -300
  expect(physicalScrollLeft(el)).toBe(500)
  expect(nativeScrollLeft(el, 100)).toBe(-700)
  el.scrollLeft = -900
  expect(physicalScrollLeft(el)).toBe(0)
  el.dir = 'ltr'
  el.scrollLeft = 200
  expect(physicalScrollLeft(el)).toBe(200)
  expect(nativeScrollLeft(el, 100)).toBe(100)
})

test('modal portals retain a native local scope instead of inheriting the body direction', async () => {
  const wrapper = setup(NativeDialog, { props: { open: true } })
  await settled()
  const surface = document.querySelector('[data-modal-focus-root]')
  expect(surface.closest('[dir]').getAttribute('dir')).toBe('rtl')
  hosts.at(-1).dir = 'ltr'
  await settled()
  expect(surface.closest('[dir]').getAttribute('dir')).toBe('ltr')
  wrapper.unmount()
  wrappers.pop()
})

test('an unspecified nested provider preserves a closer native direction override', async () => {
  const wrapper = setup({
    render: () =>
      h(ScopeProvider, { dir: 'rtl' }, () =>
        h('div', { dir: 'ltr' }, [h(ScopeProvider, {}, () => h(Slider, { editMode: 'direct', defaultValue: 20 }))]),
      ),
  })
  await settled()
  expect(wrapper.get('[role="slider"]').element.style.left).toBe('20%')
})
