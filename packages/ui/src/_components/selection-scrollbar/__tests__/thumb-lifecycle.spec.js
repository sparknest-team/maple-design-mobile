import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import SelectionBar from '../Scrollbar.vue'
import Selection from '../Thumb.vue'

const owners = [],
  views = [],
  extras = []
function observe(view) {
  if (views.some((item) => item.view === view)) {
    return
  }
  const remove = view.removeEventListener.bind(view)
  for (const key of ['addEventListener', 'removeEventListener']) {
    const descriptor = Object.getOwnPropertyDescriptor(view, key)
    const method = view[key].bind(view)
    Object.defineProperty(view, key, { configurable: true, writable: true, value: (...args) => method(...args) })
    extras.push(() => {
      if (descriptor) {
        Object.defineProperty(view, key, descriptor)
      } else {
        Reflect.deleteProperty(view, key)
      }
    })
  }
  const add = vi.spyOn(view, 'addEventListener'),
    off = vi.spyOn(view, 'removeEventListener')
  views.push({ view, add, off, remove })
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  for (const item of views) {
    for (const [name, callback] of item.add.mock.calls) {
      if (['mousemove', 'mouseup', 'contextmenu', 'blur'].includes(name)) {
        item.remove(name, callback, false)
      }
    }
  }
  vi.restoreAllMocks()
  views.length = 0
  extras
    .splice(0)
    .reverse()
    .forEach((fn) => fn())
})
const flush = async () => {
  await nextTick()
  await nextTick()
}
async function fixture(Component, foreign = false) {
  let attachTo = document.body
  if (foreign) {
    const frame = document.createElement('iframe')
    document.body.appendChild(frame)
    extras.push(() => frame.remove())
    attachTo = frame.contentDocument.body
  }
  observe(window)
  observe(attachTo.ownerDocument.defaultView)
  const active = ref(true),
    orientation = ref('horizontal'),
    data = ref({ ratio: 2, thumbSize: 20, max: 100 })
  const Child = defineComponent({
    setup: () => () => h(Component, { orientation: orientation.value, data: data.value }),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    { attachTo },
  )
  owners.push(owner)
  await flush()
  const child = owner.findComponent(Component),
    vm = child.vm
  const thumb = vm.thumbRef,
    track = vm.trackRef,
    view = thumb.ownerDocument.defaultView
  const rect = { left: 10, top: 10, right: 110, bottom: 110, width: 100, height: 100, x: 10, y: 10, toJSON() {} }
  vi.spyOn(thumb, 'getBoundingClientRect').mockReturnValue(rect)
  vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(rect)
  const event = (x = 15, button = 0) =>
    new view.MouseEvent('mousedown', { clientX: x, clientY: x, button, cancelable: true })
  const start = (x = 15) => vm.handleThumbMouseDown(event(x))
  const bindings = (name) =>
    views.flatMap((item) =>
      item.add.mock.calls.filter((call) => call[0] === name).map((call) => ({ item, callback: call[1] })),
    )
  const last = (name) => bindings(name).at(-1).callback
  const removed = (name, callback) =>
    views.some((item) => item.off.mock.calls.some((call) => call[0] === name && call[1] === callback))
  const offset = () => Number.parseFloat(vm.thumbStyle[orientation.value === 'horizontal' ? 'left' : 'top'])
  const dragging = () => vm.thumbCls.some((value) => typeof value === 'object' && Object.values(value).some(Boolean))
  return {
    owner,
    child,
    vm,
    thumb,
    track,
    view,
    active,
    orientation,
    data,
    event,
    start,
    bindings,
    last,
    removed,
    offset,
    dragging,
  }
}
describe('selection-thumb', () => {
  const Component = Selection
  const Bar = SelectionBar
  test('current drag moves and ordinary mouseup stops delivery', async () => {
    const f = await fixture(Component)
    f.start()
    const move = f.last('mousemove'),
      end = f.last('mouseup')
    move(f.event(45))
    expect(f.child.emitted('scroll').at(-1)).toEqual([30])
    end()
    expect(f.dragging()).toBe(false)
    expect(f.removed('mousemove', move)).toBe(true)
  })
  test('ordinary mouseup removes contextmenu listener too', async () => {
    const f = await fixture(Component)
    f.start()
    const context = f.last('contextmenu')
    f.last('mouseup')()
    expect(f.removed('contextmenu', context)).toBe(true)
  })
  test('unmount removes all drag listeners', async () => {
    const f = await fixture(Component)
    f.start()
    const old = f.bindings('mousemove').at(-1).callback,
      context = f.last('contextmenu')
    f.owner.unmount()
    expect(f.removed('mousemove', old)).toBe(true)
    expect(f.removed('contextmenu', context)).toBe(true)
  })
  test('deactivation releases dragging and listeners', async () => {
    const f = await fixture(Component)
    f.start()
    const move = f.last('mousemove')
    f.active.value = false
    await flush()
    expect(f.dragging()).toBe(false)
    expect(f.removed('mousemove', move)).toBe(true)
  })
  test('inactive retained starts and track clicks do not intercept', async () => {
    const f = await fixture(Component)
    f.active.value = false
    await flush()
    const start = f.event(),
      track = f.event(80)
    f.vm.handleThumbMouseDown(start)
    f.vm.handleTrackClick(track)
    expect(start.defaultPrevented).toBe(false)
    expect(track.defaultPrevented).toBe(false)
    expect(f.offset()).toBe(0)
  })
  test('inactive retained setOffset cannot mutate state', async () => {
    const f = await fixture(Component)
    f.active.value = false
    await flush()
    f.vm.setOffset(70)
    expect(f.offset()).toBe(0)
  })
  test('old move after mouseup is inert', async () => {
    const f = await fixture(Component)
    f.start()
    const move = f.last('mousemove')
    f.last('mouseup')()
    move(f.event(75))
    expect(f.offset()).toBe(0)
  })
  test('old move cannot drive a newer drag', async () => {
    const f = await fixture(Component)
    f.start()
    const move = f.last('mousemove')
    f.last('mouseup')()
    f.start(25)
    move(f.event(75))
    expect(f.offset()).toBe(0)
  })
  test('old end cannot release a newer drag', async () => {
    const f = await fixture(Component)
    f.start()
    const end = f.last('mouseup')
    end()
    f.start(25)
    end()
    expect(f.dragging()).toBe(true)
  })
  test('deactivated move cannot revive after activation', async () => {
    const f = await fixture(Component)
    f.start()
    const move = f.last('mousemove')
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    move(f.event(75))
    expect(f.offset()).toBe(0)
  })
  test('contextmenu cancellation removes its own binding', async () => {
    const f = await fixture(Component)
    f.start()
    const context = f.last('contextmenu')
    context()
    expect(f.dragging()).toBe(false)
    expect(f.removed('contextmenu', context)).toBe(true)
  })
  test('window blur cancels drag', async () => {
    const f = await fixture(Component)
    f.start()
    f.view.dispatchEvent(new f.view.Event('blur'))
    expect(f.dragging()).toBe(false)
  })
  test('orientation change cancels old gesture', async () => {
    const f = await fixture(Component)
    f.start()
    f.orientation.value = 'vertical'
    await flush()
    expect(f.dragging()).toBe(false)
  })
  test('geometry reentrant unmount cannot bind drag', async () => {
    const f = await fixture(Component)
    f.thumb.getBoundingClientRect.mockImplementation(() => {
      f.owner.unmount()
      return { left: 10, top: 10 }
    })
    f.start()
    expect(f.bindings('mousemove')).toHaveLength(0)
  })
  test('foreign thumb binds and cancels in owner window', async () => {
    const f = await fixture(Component, true)
    f.start()
    const binding = f.bindings('mousemove').at(-1)
    expect(binding.item.view === f.view).toBe(true)
    f.owner.unmount()
    expect(binding.item.off.mock.calls.some((call) => call[0] === 'mousemove' && call[1] === binding.callback)).toBe(
      true,
    )
  })
  test('secondary button does not initiate drag', async () => {
    const f = await fixture(Component),
      event = f.event(15, 2)
    f.vm.handleThumbMouseDown(event)
    expect(event.defaultPrevented).toBe(false)
    expect(f.dragging()).toBe(false)
  })
  test('current setOffset clamps without scroll notification', async () => {
    const f = await fixture(Component)
    f.vm.setOffset(1000)
    expect(f.offset()).toBe(100)
    f.vm.setOffset(-10)
    expect(f.offset()).toBe(0)
    expect(f.child.emitted('scroll')).toBeUndefined()
  })
  test('current track click advances one thumb size', async () => {
    const f = await fixture(Component)
    f.vm.handleTrackClick(f.event(80))
    expect(f.offset()).toBe(20)
    expect(f.child.emitted('scroll')).toEqual([[20]])
  })
  test('geometry change cancels drag but equivalent data preserves it', async () => {
    const f = await fixture(Component)
    f.start()
    f.data.value = { ...f.data.value }
    await flush()
    expect(f.dragging()).toBe(true)
    f.data.value = { ...f.data.value, max: 80 }
    await flush()
    expect(f.dragging()).toBe(false)
  })
  test('track geometry reentrant disposal cannot notify', async () => {
    const f = await fixture(Component)
    f.thumb.getBoundingClientRect.mockImplementation(() => {
      f.owner.unmount()
      return { left: 10, top: 10 }
    })
    f.vm.handleTrackClick(f.event(80))
    expect(f.child.emitted('scroll')).toBeUndefined()
  })
  test('actual parent and Thumb cancel and accept fresh activation gestures', async () => {
    observe(window)
    observe(document.defaultView)
    const active = ref(true)
    const Child = defineComponent({ setup: () => () => h(Bar) })
    const owner = mount(
      defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
      {
        attachTo: document.body,
        global: {
          stubs: {
            ResizeObserver: defineComponent({
              setup:
                (_, { slots }) =>
                () =>
                  h('div', slots.default?.()),
            }),
          },
        },
      },
    )
    owners.push(owner)
    await flush()
    const bar = owner.findComponent(Bar)
    const element = bar.vm.containerRef
    const dimensions = {
      clientWidth: 100,
      clientHeight: 80,
      offsetWidth: 100,
      offsetHeight: 80,
      scrollWidth: 500,
      scrollHeight: 400,
      scrollTop: 0,
      scrollLeft: 0,
    }
    for (const key of Object.keys(dimensions)) {
      Object.defineProperty(element, key, { configurable: true, value: dimensions[key] })
    }
    const scroll = vi.fn()
    Object.defineProperty(element, 'scrollTo', { configurable: true, value: scroll })
    bar.vm.handleResize()
    await flush()
    const thumb = bar.findAllComponents(Component).find((item) => item.props('orientation') === 'horizontal').vm
    const rect = { left: 10, top: 10, right: 110, bottom: 110, width: 100, height: 100, x: 10, y: 10, toJSON() {} }
    vi.spyOn(thumb.thumbRef, 'getBoundingClientRect').mockReturnValue(rect)
    vi.spyOn(thumb.trackRef, 'getBoundingClientRect').mockReturnValue(rect)
    const view = thumb.thumbRef.ownerDocument.defaultView
    const event = (x) => new view.MouseEvent('mousemove', { clientX: x, clientY: x, button: 0, cancelable: true })
    thumb.handleThumbMouseDown(event(15))
    const oldMove = views
      .flatMap((item) => item.add.mock.calls.filter((call) => call[0] === 'mousemove').map((call) => call[1]))
      .at(-1)
    view.dispatchEvent(event(45))
    expect(scroll).toHaveBeenCalled()
    active.value = false
    await flush()
    expect(thumb.thumbCls.some((value) => typeof value === 'object' && Object.values(value).some(Boolean))).toBe(false)
    scroll.mockClear()
    view.dispatchEvent(event(75))
    expect(scroll).not.toHaveBeenCalled()
    active.value = true
    await flush()
    oldMove(event(95))
    expect(scroll).not.toHaveBeenCalled()
    thumb.handleThumbMouseDown(event(15))
    view.dispatchEvent(event(45))
    expect(scroll).toHaveBeenCalled()
  })
})
