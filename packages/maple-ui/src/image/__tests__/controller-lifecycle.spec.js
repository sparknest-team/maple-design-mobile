import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { usePreviewController } from '../composables/usePreviewController'

const owners = []
const nodes = []
const hookDescriptor = Object.getOwnPropertyDescriptor(globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__')
const mediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia')
const flush = async () => {
  await nextTick()
  await nextTick()
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  nodes.splice(0).forEach((node) => node.remove())
  vi.restoreAllMocks()
  vi.useRealTimers()
  for (const [object, name, descriptor] of [
    [globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__', hookDescriptor],
    [window, 'matchMedia', mediaDescriptor],
  ]) {
    if (descriptor) {
      Object.defineProperty(object, name, descriptor)
    } else {
      Reflect.deleteProperty(object, name)
    }
  }
})
function fixture() {
  Object.defineProperty(globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__', { configurable: true, value: { emit() {} } })
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  vi.setSystemTime(0)
  const timer = vi.spyOn(globalThis, 'setTimeout')
  const open = ref(true)
  const src = ref('a')
  const isRtl = ref(false)
  const interaction = ref('touch')
  const active = ref(true)
  const longPress = vi.fn()
  const next = vi.fn()
  const element = document.createElement('div')
  const image = document.createElement('img')
  image.setAttribute('data-image-preview-image', '')
  element.appendChild(image)
  document.body.appendChild(element)
  nodes.push(element)
  const release = vi.fn()
  Object.assign(element, { setPointerCapture: vi.fn(), hasPointerCapture: () => true, releasePointerCapture: release })
  let api
  const Child = defineComponent({
    setup() {
      api = usePreviewController({
        isRtl,
        open,
        defaultOpen: false,
        src,
        interaction,
        defaultScale: ref(1),
        minScale: ref(0.5),
        maxScale: ref(5),
        scaleStep: ref(0.2),
        wheelZoom: ref(true),
        keyboard: ref(true),
        draggable: ref(true),
        keepDragOffset: ref(false),
        overlayClosable: ref(true),
        onOpenChange: (value) => {
          open.value = value
        },
        onLongPress: longPress,
        onNext: next,
      })
      return () => h('div')
    },
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
  )
  owners.push(owner)
  const event = (x = 0) => ({
    button: 0,
    pointerId: 1,
    pointerType: 'touch',
    clientX: x,
    clientY: 0,
    target: image,
    currentTarget: element,
  })
  const down = () => api.onPointerDown(event())
  const tap = (x = 0) => {
    api.onPointerDown(event(x))
    api.onPointerUp(event(x))
  }
  const callback = (delay) => timer.mock.calls.filter((call) => call[1] === delay).at(-1)[0]
  return { api, isRtl, open, src, interaction, active, owner, longPress, next, down, tap, event, callback, release }
}
describe('ImagePreview controller interaction lifecycle', () => {
  test('reentrant replacement owns the only long press timer', () => {
    const f = fixture()
    const element = f.event().currentTarget
    let entered = false
    element.setPointerCapture = () => {
      if (!entered) {
        entered = true
        f.down()
      }
    }
    const timer = vi.spyOn(globalThis, 'setTimeout')
    timer.mockClear()
    f.down()
    expect(timer.mock.calls.filter((call) => call[1] === 500)).toHaveLength(1)
  })
  test('unmount during pointer capture does not create long press work', () => {
    const f = fixture()
    const element = f.event().currentTarget
    element.setPointerCapture = () => f.owner.unmount()
    const timer = vi.spyOn(globalThis, 'setTimeout')
    timer.mockClear()
    f.down()
    expect(timer).not.toHaveBeenCalled()
  })

  test('current long press fires at500ms not499ms', () => {
    const f = fixture()
    f.down()
    vi.advanceTimersByTime(499)
    expect(f.longPress).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(f.longPress).toHaveBeenCalledTimes(1)
  })
  test('pointer up invalidates dequeued long press', () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.api.onPointerUp(f.event())
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('movement invalidates dequeued long press', () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.api.onPointerMove(f.event(20))
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('close invalidates pending long press', async () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.open.value = false
    await flush()
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('source replacement invalidates long press', async () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.src.value = 'b'
    await flush()
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('deactivation invalidates pending long press', async () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.active.value = false
    await flush()
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('unmount invalidates dequeued long press', () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.owner.unmount()
    old()
    expect(f.longPress).not.toHaveBeenCalled()
  })
  test('inactive keyboard listener does not navigate', async () => {
    const f = fixture()
    f.active.value = false
    await flush()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    expect(f.next).not.toHaveBeenCalled()
  })
  test('inactive retained pointer entry does not schedule', async () => {
    const f = fixture()
    f.active.value = false
    await flush()
    f.down()
    expect(vi.getTimerCount()).toBe(0)
    expect(f.api.moving.value).toBe(false)
  })
  test('old tap expiry cannot clear the newer timer handle', () => {
    const f = fixture()
    f.tap()
    const old = f.callback(320)
    vi.advanceTimersByTime(100)
    f.tap(100)
    old()
    f.owner.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
  test('consumed long press callback cannot replay', () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    old()
    old()
    expect(f.longPress).toHaveBeenCalledTimes(1)
  })
  test('deactivation releases pointer capture and moving state', async () => {
    const f = fixture()
    f.down()
    f.active.value = false
    await flush()
    expect(f.release).toHaveBeenCalledWith(1)
    expect(f.api.moving.value).toBe(false)
  })
  test('activation starts fresh interaction without reviving old timer', async () => {
    const f = fixture()
    f.down()
    const old = f.callback(500)
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    old()
    expect(f.longPress).not.toHaveBeenCalled()
    f.down()
    vi.advanceTimersByTime(500)
    expect(f.longPress).toHaveBeenCalledTimes(1)
  })
  test('normal double tap zooms within320ms and clears tap work', () => {
    const f = fixture()
    f.tap()
    vi.advanceTimersByTime(100)
    f.tap()
    expect(f.api.scale.value).toBe(1.2)
    expect(vi.getTimerCount()).toBe(0)
  })
  test('inactive coarse-pointer observation detaches and rejects old delivery', async () => {
    let matches = false
    let listener
    const remove = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({
        get matches() {
          return matches
        },
        addEventListener: (_type, callback) => {
          listener = callback
        },
        removeEventListener: remove,
      }),
    })
    const f = fixture()
    f.interaction.value = 'auto'
    f.active.value = false
    await flush()
    matches = true
    listener()
    expect(remove).toHaveBeenCalledWith('change', expect.any(Function))
    expect(f.api.isTouch.value).toBe(false)
  })
  test('activation rebinds preference and detached delivery cannot change it', async () => {
    const media = []
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => {
        const entry = { matches: media.length > 0 }
        media.push(entry)
        return {
          get matches() {
            return entry.matches
          },
          addEventListener: (_type, callback) => {
            entry.listener = callback
          },
          removeEventListener() {},
        }
      },
    })
    const f = fixture()
    f.interaction.value = 'auto'
    const old = media[0]
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    expect(media).toHaveLength(2)
    expect(f.api.isTouch.value).toBe(true)
    old.matches = false
    old.listener()
    expect(f.api.isTouch.value).toBe(true)
  })
  test('disposed preference callback cannot change detection', () => {
    let matches = false
    let listener
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({
        get matches() {
          return matches
        },
        addEventListener: (_type, callback) => {
          listener = callback
        },
        removeEventListener() {},
      }),
    })
    const f = fixture()
    f.interaction.value = 'auto'
    f.owner.unmount()
    matches = true
    listener()
    expect(f.api.isTouch.value).toBe(false)
  })
})

test('direction changes cancel a pending gesture and its delayed callbacks', () => {
  const f = fixture()
  f.down()
  f.isRtl.value = true
  f.api.onPointerUp(f.event(80))
  vi.advanceTimersByTime(600)
  expect(f.longPress).not.toHaveBeenCalled()
  expect(f.next).not.toHaveBeenCalled()
  expect(f.api.moving.value).toBe(false)
  expect(f.api.translateX.value).toBe(0)
})
