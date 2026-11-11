import { defineComponent, h, KeepAlive, nextTick, ref, shallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import InfiniteScroll from '../InfiniteScroll.vue'

const frames = []
const timers = []
const resizes = []
const mutations = []
const owners = []
const nodes = []
const rafDescriptor = Object.getOwnPropertyDescriptor(window, 'requestAnimationFrame')
const flush = async () => {
  await nextTick()
  await nextTick()
}

beforeEach(() => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback)
    return frames.length
  })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const bottom = this.dataset.scroller ? 100 : 90
    return { x: 0, y: 0, top: 0, bottom, left: 0, right: 100, width: 100, height: bottom, toJSON: () => ({}) }
  })
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback) {
        resizes.push(() => callback([], this))
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  vi.stubGlobal(
    'MutationObserver',
    class {
      constructor(callback) {
        mutations.push(() => callback([], this))
      }
      observe() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    },
  )
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  nodes.splice(0).forEach((node) => node.remove())
  frames.length = timers.length = resizes.length = mutations.length = 0
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  if (rafDescriptor) {
    Object.defineProperty(window, 'requestAnimationFrame', rafDescriptor)
  }
})
function targetNode() {
  const node = document.createElement('div')
  node.dataset.scroller = 'true'
  Object.defineProperty(node, 'clientHeight', { value: 100 })
  document.body.appendChild(node)
  nodes.push(node)
  return node
}
function fixture(initialTarget = targetNode()) {
  const target = shallowRef(initialTarget)
  const active = ref(true)
  const status = ref('idle')
  const load = vi.fn()
  const Child = defineComponent({
    setup: () => () =>
      h(InfiniteScroll, { target: target.value, status: status.value, immediate: false, onLoad: load }),
  })
  const wrapper = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    { attachTo: document.body },
  )
  owners.push(wrapper)
  const command = wrapper.findComponent(InfiniteScroll).vm
  return { target, active, status, load, command }
}
describe('InfiniteScroll measurement scheduler ownership', () => {
  test('unmount during target geometry prevents loading and stale access', () => {
    const f = fixture()
    vi.spyOn(f.target.value, 'getBoundingClientRect').mockImplementation(() => {
      owners[0].unmount()
      return { top: 0, bottom: 100, left: 0, right: 100, width: 100, height: 100 }
    })
    expect(() => f.command.check()).not.toThrow()
    expect(f.load).not.toHaveBeenCalled()
  })

  test('retained old scroll listener cannot schedule against a replacement target', async () => {
    const first = targetNode()
    const add = vi.spyOn(first, 'addEventListener')
    const f = fixture(first)
    const old = add.mock.calls.find(([type]) => type === 'scroll')[1]
    f.target.value = targetNode()
    await flush()
    frames[0](0)
    expect(frames).toHaveLength(1)
    old.call(first, new Event('scroll'))
    expect(frames).toHaveLength(1)
  })

  test('coalesces active scroll events and current delivery loads once', () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    f.target.value.dispatchEvent(new Event('scroll'))
    expect(frames).toHaveLength(1)
    frames[0](0)
    frames[0](1)
    expect(f.load).toHaveBeenCalledTimes(1)
  })
  test('unmount cancels pending frame and retained check stays inert', () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    owners[0].unmount()
    old(0)
    f.command.check()
    expect(f.load).not.toHaveBeenCalled()
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1)
  })
  test('inactive retained command and pending delivery stay inert', async () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.active.value = false
    await flush()
    old(0)
    f.command.check()
    expect(f.load).not.toHaveBeenCalled()
  })
  test('canceled RAF cannot check a newly rebound target', async () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.target.value = targetNode()
    await flush()
    old(0)
    expect(f.load).not.toHaveBeenCalled()
    frames[1](1)
    expect(f.load).toHaveBeenCalledTimes(1)
  })
  test('old RAF cannot clear the newer pending scheduler handle', async () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.target.value = targetNode()
    await flush()
    old(0)
    f.target.value.dispatchEvent(new Event('scroll'))
    expect(frames).toHaveLength(2)
  })
  test('consumed callback cannot replay after a new status cycle', async () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    old(0)
    f.status.value = 'loading'
    await flush()
    f.status.value = 'idle'
    await flush()
    old(1)
    expect(f.load).toHaveBeenCalledTimes(1)
    frames[1](2)
    expect(f.load).toHaveBeenCalledTimes(2)
  })
  test('canceled RAF does not revive after KeepAlive reactivation', async () => {
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    old(0)
    expect(f.load).not.toHaveBeenCalled()
    frames[1](1)
    expect(f.load).toHaveBeenCalledTimes(1)
  })
  test('disconnected ResizeObserver cannot schedule after rebinding', async () => {
    const f = fixture()
    const old = resizes[0]
    old()
    f.target.value = targetNode()
    await flush()
    frames[0](0)
    const count = frames.length
    old()
    expect(frames).toHaveLength(count)
  })
  test('disconnected MutationObserver cannot schedule after rebinding', async () => {
    const f = fixture()
    const old = mutations[0]
    f.target.value = targetNode()
    await flush()
    frames[0](0)
    const count = frames.length
    old()
    expect(frames).toHaveLength(count)
  })
  test('canceled fallback timeout cannot check a rebound target', async () => {
    Object.defineProperty(window, 'requestAnimationFrame', { configurable: true, value: undefined })
    vi.spyOn(window, 'setTimeout').mockImplementation((callback) => {
      timers.push(() => {
        if (typeof callback === 'function') {
          callback()
        }
      })
      return timers.length
    })
    vi.spyOn(window, 'clearTimeout').mockImplementation(() => {})
    const f = fixture()
    f.target.value.dispatchEvent(new Event('scroll'))
    const old = timers[0]
    f.target.value = targetNode()
    await flush()
    old()
    expect(f.load).not.toHaveBeenCalled()
    expect(window.clearTimeout).toHaveBeenCalledWith(1)
    timers[1]()
    expect(f.load).toHaveBeenCalledTimes(1)
  })
})
