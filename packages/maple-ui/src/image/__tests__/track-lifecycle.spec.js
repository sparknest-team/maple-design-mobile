import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Group from '../ImagePreviewGroup.vue'

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
vi.mock('../ImagePreview.vue', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    default: defineComponent({
      props: ['open'],
      setup(_props, { slots, expose }) {
        expose({ reset() {} })
        return () =>
          h(
            'section',
            slots.image?.({ scale: 1, rotate: 0, translateX: 0, translateY: 0, moving: false, previewedImgProps: {} }),
          )
      },
    }),
  }
})
const frames = []
const owners = []
const restores = []
const flush = async () => {
  await nextTick()
  await nextTick()
}
const deliverTicks = () => ticks.splice(0).forEach((callback) => callback())
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
  frames.length = ticks.length = 0
})
async function fixture(config = {}) {
  patch(globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__', { emit() {} })
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  vi.setSystemTime(0)
  const timer = vi.spyOn(globalThis, 'setTimeout')
  const request = (callback) => {
    frames.push(callback)
    return frames.length
  }
  for (const view of new Set([globalThis, document.defaultView])) {
    patch(view, 'requestAnimationFrame', request)
    patch(view, 'cancelAnimationFrame', vi.fn())
  }
  const active = ref(true),
    images = ref(['/a', '/b']),
    loop = ref(true)
  const Child = defineComponent({
    setup: () => () =>
      h(Group, { images: images.value, loop: loop.value, defaultOpen: true, onChange: config.onChange }),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    { attachTo: config.attachTo ?? document.body },
  )
  owners.push(owner)
  await flush()
  const child = owner.findComponent(Group),
    vm = child.vm
  const track = () => child.get('[data-image-preview-track]').element
  const view = track().ownerDocument.defaultView
  const originalStyle = view.getComputedStyle.bind(view)
  vi.spyOn(view, 'getComputedStyle').mockImplementation((element) =>
    element.hasAttribute('data-image-preview-track')
      ? {
          transitionProperty: config.property ?? 'transform',
          transitionDuration: config.duration ?? '0.24s',
          transitionDelay: config.delay ?? '0s',
        }
      : originalStyle(element),
  )
  vi.spyOn(view.performance, 'now').mockImplementation(() => Date.now())
  const settle = () => {
    deliverTicks()
    frames.at(-1)(0)
    frames.at(-1)(1)
  }
  const wrap = async () => {
    vm.next()
    vm.next()
    await flush()
    deliverTicks()
    await flush()
  }
  const index = () => -Number(vm.trackStyle(0, 1).transform.split('calc(')[1].split('%')[0]) / 100 || 0
  const event = (target = track()) => ({
    target,
    currentTarget: track(),
    propertyName: 'transform',
    timeStamp: Date.now(),
  })
  const timerCallback = () => timer.mock.calls.filter((call) => Number(call[1]) >= 0).at(-1)[0]
  return { owner, child, vm, active, images, loop, track, settle, wrap, index, event, timerCallback }
}
describe('PreviewGroup track scheduler ownership', () => {
  test('current instant mode releases on the second frame', async () => {
    const f = await fixture()
    deliverTicks()
    expect(f.vm.trackInstant).toBe(true)
    frames[0](0)
    expect(f.vm.trackInstant).toBe(true)
    frames[1](1)
    expect(f.vm.trackInstant).toBe(false)
  })
  test('unmount before nextTick cannot request a frame', async () => {
    const f = await fixture()
    f.owner.unmount()
    deliverTicks()
    expect(frames).toHaveLength(0)
  })
  test('deactivation before nextTick cannot request a frame', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    deliverTicks()
    expect(frames).toHaveLength(0)
  })
  test('superseded nextTick can request only the current first frame', async () => {
    const f = await fixture()
    f.images.value = ['/a', '/b', '/c']
    await flush()
    deliverTicks()
    expect(frames).toHaveLength(1)
  })
  test('dequeued first frame cannot schedule paint after disposal', async () => {
    const f = await fixture()
    deliverTicks()
    const old = frames[0]
    f.owner.unmount()
    old(0)
    expect(frames).toHaveLength(1)
  })
  test('old second frame cannot release a newer instant phase', async () => {
    const f = await fixture()
    deliverTicks()
    frames[0](0)
    const old = frames[1]
    f.images.value = ['/a', '/b', '/c']
    await flush()
    deliverTicks()
    old(1)
    expect(f.vm.trackInstant).toBe(true)
  })
  test('consumed first frame cannot fork second-frame work', async () => {
    const f = await fixture()
    deliverTicks()
    frames[0](0)
    frames[0](1)
    expect(frames).toHaveLength(2)
  })
  test('consumed second frame cannot revive after another phase', async () => {
    const f = await fixture()
    f.settle()
    const old = frames[1]
    f.images.value = ['/a', '/b', '/c']
    await flush()
    deliverTicks()
    old(2)
    expect(f.vm.trackInstant).toBe(true)
  })
  test('inactive retained navigation does not emit change', async () => {
    const f = await fixture()
    f.settle()
    f.active.value = false
    await flush()
    f.vm.next()
    expect(f.child.emitted('change')).toBeUndefined()
  })
  test('disposed retained open does not emit change', async () => {
    const f = await fixture()
    f.owner.unmount()
    f.vm.open(2)
    expect(f.child.emitted('change')).toBeUndefined()
  })
  test('deactivation cancels pending recenter timeout', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.active.value = false
    await flush()
    expect(vi.getTimerCount()).toBe(0)
  })
  test('close cancels pending recenter timeout', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.vm.close()
    await flush()
    expect(vi.getTimerCount()).toBe(0)
  })
  test('old timeout cannot recenter a new activation navigation', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    const old = f.timerCallback()
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    f.settle()
    await f.wrap()
    const before = f.index()
    old()
    expect(f.index()).toBe(before)
  })
  test('long transform duration and delay cannot be capped at400ms', async () => {
    const f = await fixture({ duration: '0.8s', delay: '0.1s' })
    f.settle()
    await f.wrap()
    vi.advanceTimersByTime(400)
    expect(f.index()).toBe(4)
    vi.advanceTimersByTime(500)
    expect(f.index()).toBe(2)
  })
  test('known zero transition settles without400ms delay', async () => {
    const f = await fixture({ duration: '0s', property: 'none' })
    f.settle()
    await f.wrap()
    vi.advanceTimersByTime(0)
    expect(f.index()).toBe(2)
  })
  test('own transform completion cancels the fallback', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.vm.handleTrackTransitionEnd(f.event())
    expect(f.index()).toBe(2)
    expect(vi.getTimerCount()).toBe(0)
  })
  test('bubbled transition from another node is ignored', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.vm.handleTrackTransitionEnd(f.event(document.createElement('div')))
    expect(f.index()).toBe(4)
  })
  test('loop change resets canonical coordinates', async () => {
    const f = await fixture()
    f.settle()
    f.loop.value = false
    await flush()
    expect(f.index()).toBe(0)
  })
  test('same-length image replacement invalidates edge coordinates', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.images.value = ['/x', '/y']
    await flush()
    expect(f.index()).toBe(2)
    expect(vi.getTimerCount()).toBe(0)
  })
  test('reentrant change disposal cannot schedule a recenter task', async () => {
    const f = await fixture({
      onChange: (index) => {
        if (index === 1) {
          f.owner.unmount()
        }
      },
    })
    f.settle()
    await f.wrap()
    expect(vi.getTimerCount()).toBe(0)
  })
  test('foreign track uses and cancels its owner RAF', async () => {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    restores.push(() => iframe.remove())
    const foreign = [],
      cancel = vi.fn(),
      view = iframe.contentWindow
    patch(view, 'requestAnimationFrame', (callback) => {
      foreign.push(callback)
      return foreign.length
    })
    patch(view, 'cancelAnimationFrame', cancel)
    const f = await fixture({ attachTo: iframe.contentDocument.body })
    deliverTicks()
    expect(foreign).toHaveLength(1)
    expect(frames).toHaveLength(0)
    f.owner.unmount()
    expect(cancel).toHaveBeenCalledWith(1)
  })
  test('in-place image edits invalidate pending edge work', async () => {
    const f = await fixture()
    f.settle()
    await f.wrap()
    f.images.value[0] = '/changed'
    await flush()
    expect(f.index()).toBe(2)
    expect(vi.getTimerCount()).toBe(0)
  })
  test('transform property lists and negative delay determine the deadline', async () => {
    const f = await fixture({ property: 'opacity, all, transform', duration: '3s, 1s, 0.8s', delay: '-0.1s' })
    f.settle()
    await f.wrap()
    vi.advanceTimersByTime(699)
    expect(f.index()).toBe(4)
    vi.advanceTimersByTime(1)
    expect(f.index()).toBe(2)
  })
  test('unavailable computed style keeps the400ms safety fallback', async () => {
    const f = await fixture({ property: '', duration: '', delay: '' })
    f.settle()
    await f.wrap()
    vi.advanceTimersByTime(399)
    expect(f.index()).toBe(4)
    vi.advanceTimersByTime(1)
    expect(f.index()).toBe(2)
  })
  test('transition event created before newer navigation is ignored', async () => {
    const f = await fixture()
    f.settle()
    vi.setSystemTime(100)
    const old = f.event()
    vi.setSystemTime(200)
    await f.wrap()
    f.vm.handleTrackTransitionEnd(old)
    expect(f.index()).toBe(4)
  })
  test('reentrant newer navigation owns the current instant phase', async () => {
    const f = await fixture({
      onChange: (index) => {
        if (index === 1) {
          f.vm.to(2)
        }
      },
    })
    f.settle()
    f.vm.next()
    f.vm.next()
    await flush()
    expect(ticks).toHaveLength(1)
    deliverTicks()
    expect(f.index()).toBe(1)
    expect(vi.getTimerCount()).toBe(1)
    vi.advanceTimersByTime(240)
    expect(f.index()).toBe(3)
  })
  test('recenter render callback cannot fork duplicate timers', async () => {
    const f = await fixture()
    f.settle()
    f.vm.next()
    f.vm.next()
    await flush()
    const callbacks = ticks.splice(0)
    callbacks.forEach((callback) => {
      callback()
      callback()
    })
    expect(vi.getTimerCount()).toBe(1)
  })
})
