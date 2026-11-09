import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Carousel from '../Carousel.vue'
import Item from '../CarouselItem.vue'

const ticks = []
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    nextTick: (callback) => {
      if (callback) {
        ticks.push(callback)
        return Promise.resolve()
      }
      return actual.nextTick()
    },
  }
})
const owners = [],
  restores = [],
  frames = [],
  observations = []
function patch(object, key, value) {
  const old = Object.getOwnPropertyDescriptor(object, key)
  Object.defineProperty(object, key, { configurable: true, writable: true, value })
  restores.push(() => {
    if (old) {
      Object.defineProperty(object, key, old)
    } else {
      Reflect.deleteProperty(object, key)
    }
  })
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  vi.useRealTimers()
  restores
    .splice(0)
    .reverse()
    .forEach((restore) => restore())
  ticks.length = frames.length = observations.length = 0
})
const flush = async () => {
  await nextTick()
  await nextTick()
}
const deliver = () => ticks.splice(0).forEach((callback) => callback())
async function fixture(moveSpeed = 7) {
  patch(globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__', { emit() {} })
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  const schedule = vi.spyOn(globalThis, 'setTimeout')
  for (const view of new Set([globalThis, document.defaultView])) {
    patch(view, 'requestAnimationFrame', (callback) => {
      frames.push(callback)
      return frames.length
    })
    patch(view, 'cancelAnimationFrame', vi.fn())
  }
  patch(
    globalThis,
    'ResizeObserver',
    class {
      constructor(callback) {
        observations.push(callback)
      }
      observe() {}
      disconnect() {}
    },
  )
  patch(
    globalThis,
    'MutationObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )
  const active = ref(true),
    autoPlay = ref(false)
  const Child = defineComponent({
    setup: () => () =>
      h(
        Carousel,
        { autoPlay: autoPlay.value, moveSpeed, keyboard: true, mousewheel: true },
        { default: () => [0, 1, 2].map((key) => h(Item, { key }, () => String(key))) },
      ),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    { attachTo: document.body },
  )
  owners.push(owner)
  await flush()
  deliver()
  const child = owner.findComponent(Carousel),
    state = child.vm.$.setupState
  const viewport = child.find('[class$="__viewport"]').element
  Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 300 })
  child.vm.resize()
  await flush()
  deliver()
  const callbacks = (delay) => schedule.mock.calls.filter((call) => call[1] === delay).map((call) => call[0])
  const start = async () => {
    autoPlay.value = { interval: 100 }
    await flush()
    deliver()
  }
  const navigate = async () => {
    child.vm.next()
    await flush()
    deliver()
  }
  return { owner, child, state, active, autoPlay, start, navigate, callbacks }
}
describe('Carousel scheduler ownership', () => {
  test('current autoplay waits the configured interval', async () => {
    const f = await fixture()
    await f.start()
    vi.advanceTimersByTime(99)
    expect(f.state.current).toBe(0)
    vi.advanceTimersByTime(1)
    expect(f.state.current).toBe(1)
  })
  test('hover cancellation rejects old autoplay delivery', async () => {
    const f = await fixture()
    await f.start()
    const old = f.callbacks(100).at(-1)
    await f.child.trigger('mouseenter')
    old()
    expect(f.state.current).toBe(0)
  })
  test('deactivation rejects old autoplay delivery', async () => {
    const f = await fixture()
    await f.start()
    const old = f.callbacks(100).at(-1)
    f.active.value = false
    await flush()
    old()
    expect(f.state.current).toBe(0)
  })
  test('disposal rejects old autoplay delivery', async () => {
    const f = await fixture()
    await f.start()
    const old = f.callbacks(100).at(-1)
    f.owner.unmount()
    old()
    expect(f.state.current).toBe(0)
  })
  test('autoplay delivery consumes once', async () => {
    const f = await fixture()
    await f.start()
    const callback = f.callbacks(100).at(-1)
    callback()
    callback()
    expect(f.state.current).toBe(1)
  })
  test('inactive retained navigation is inert', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.child.vm.next()
    expect(f.state.current).toBe(0)
    expect(f.child.emitted('change')).toBeUndefined()
  })
  test('detached observer cannot reschedule after activation', async () => {
    const f = await fixture()
    await f.start()
    const old = observations[0]
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    deliver()
    const before = f.callbacks(100).length
    old()
    expect(f.callbacks(100)).toHaveLength(before)
  })
  test('non-finite moveSpeed uses the actual computed transition duration', async () => {
    const f = await fixture(NaN)
    const view = document.defaultView
    const original = view.getComputedStyle.bind(view)
    vi.spyOn(view, 'getComputedStyle').mockImplementation((element) => {
      const style = original(element)
      if (element.className?.includes?.('__track')) {
        Object.defineProperty(style, 'transitionDuration', { configurable: true, value: '0.24s' })
      }
      return style
    })
    await f.navigate()
    expect(f.callbacks(240)).toHaveLength(1)
    expect(f.callbacks(0)).toHaveLength(0)
  })
  test('stale settle cannot override a newer transition', async () => {
    const f = await fixture()
    await f.navigate()
    const old = f.callbacks(7).at(-1)
    await f.navigate()
    old()
    expect(f.state.noMotion).toBe(false)
    expect(frames).toHaveLength(0)
  })
  test('settle after deactivation cannot queue frames', async () => {
    const f = await fixture()
    await f.navigate()
    const old = f.callbacks(7).at(-1)
    f.active.value = false
    await flush()
    old()
    expect(frames).toHaveLength(0)
  })
  test('settle callback consumes once', async () => {
    const f = await fixture()
    await f.navigate()
    const callback = f.callbacks(7).at(-1)
    callback()
    callback()
    expect(frames).toHaveLength(1)
  })
  test('old first frame cannot schedule after disposal', async () => {
    const f = await fixture()
    await f.navigate()
    f.callbacks(7).at(-1)()
    const first = frames[0]
    f.owner.unmount()
    first(0)
    expect(frames).toHaveLength(1)
  })
  test('first frame consumes once', async () => {
    const f = await fixture()
    await f.navigate()
    f.callbacks(7).at(-1)()
    const first = frames[0]
    first(0)
    first(0)
    expect(frames).toHaveLength(2)
  })
  test('old second frame cannot release newer instant phase', async () => {
    const f = await fixture()
    await f.navigate()
    f.callbacks(7).at(-1)()
    frames[0](0)
    const old = frames[1]
    await f.navigate()
    f.callbacks(7).at(-1)()
    expect(f.state.noMotion).toBe(true)
    old(1)
    expect(f.state.noMotion).toBe(true)
  })
  test('current double frame restores transition', async () => {
    const f = await fixture()
    await f.navigate()
    f.callbacks(7).at(-1)()
    expect(f.state.noMotion).toBe(true)
    frames[0](0)
    frames[1](1)
    expect(f.state.noMotion).toBe(false)
  })
  test('render settlement callback consumes once', async () => {
    const f = await fixture()
    f.child.vm.next()
    await flush()
    const callback = ticks.splice(0).at(-1)
    callback()
    callback()
    expect(f.callbacks(7)).toHaveLength(1)
  })
  test('deactivation before render settlement schedules no timer', async () => {
    const f = await fixture()
    f.child.vm.next()
    await flush()
    f.active.value = false
    await flush()
    deliver()
    expect(f.callbacks(7)).toHaveLength(0)
  })
  test('consumed second frame cannot release a later phase', async () => {
    const f = await fixture()
    await f.navigate()
    f.callbacks(7).at(-1)()
    frames[0](0)
    const old = frames[1]
    old(1)
    await f.navigate()
    f.callbacks(7).at(-1)()
    old(2)
    expect(f.state.noMotion).toBe(true)
  })
  test('inactive retained keyboard and wheel do not intercept input', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    const key = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true })
    const wheel = new WheelEvent('wheel', { deltaY: 100, cancelable: true })
    f.state.keydown(key)
    f.state.wheel(wheel)
    expect(key.defaultPrevented).toBe(false)
    expect(wheel.defaultPrevented).toBe(false)
    expect(f.state.current).toBe(0)
  })
})
