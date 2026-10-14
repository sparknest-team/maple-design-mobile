import { defineComponent, h, KeepAlive, nextTick, ref, shallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import BackTop from '../index'

const frames = []
const owners = []
const nodes = []
const restores = []
let reduced = false
const flush = async () => {
  await nextTick()
  await nextTick()
}
function patch(object, name, value) {
  const previous = Object.getOwnPropertyDescriptor(object, name)
  Object.defineProperty(object, name, { configurable: true, writable: true, value })
  restores.push(() => {
    if (previous) {
      Object.defineProperty(object, name, previous)
    } else {
      Reflect.deleteProperty(object, name)
    }
  })
}
beforeEach(() => {
  const request = (callback) => {
    frames.push(callback)
    return frames.length
  }
  const cancel = vi.fn()
  const media = () => ({ matches: reduced })
  for (const view of new Set([globalThis, document.defaultView])) {
    patch(view, 'requestAnimationFrame', request)
    patch(view, 'cancelAnimationFrame', cancel)
    patch(view, 'matchMedia', media)
  }
  vi.spyOn(performance, 'now').mockReturnValue(0)
  if (document.defaultView.performance !== performance) {
    vi.spyOn(document.defaultView.performance, 'now').mockReturnValue(0)
  }
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  nodes.splice(0).forEach((node) => node.remove())
  vi.restoreAllMocks()
  restores
    .splice(0)
    .reverse()
    .forEach((restore) => restore())
  frames.length = 0
  reduced = false
})
function target(top = 400, doc = document) {
  const element = doc.createElement('div')
  element.scrollTop = top
  element.scrollLeft = 37
  doc.body.appendChild(element)
  nodes.push(element)
  return element
}
function fixture(options = {}) {
  const element = shallowRef(target())
  const active = ref(true)
  const Child = defineComponent({
    setup: () => () =>
      h(BackTop, {
        targetContainer: element.value,
        popupContainer: false,
        duration: 1000,
        easing: 'linear',
        ...options,
      }),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    { attachTo: document.body },
  )
  owners.push(owner)
  const child = owner.findComponent(BackTop)
  const command = child.vm
  return { element, active, owner, child, command }
}
describe('BackTop scheduler lifecycle', () => {
  test('current measurement coalesces scroll and updates visibility', async () => {
    const f = fixture()
    f.element.value.scrollTop = 0
    f.element.value.dispatchEvent(new Event('scroll'))
    f.element.value.dispatchEvent(new Event('scroll'))
    expect(frames).toHaveLength(1)
    frames[0](0)
    await flush()
    expect(f.child.get('button').element.style.display).toBe('none')
  })
  test('old measurement cannot inspect the newly bound target', async () => {
    const f = fixture()
    f.element.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.element.value = target(0)
    await flush()
    f.element.value.scrollTop = 400
    old(0)
    await flush()
    expect(f.child.get('button').element.style.display).toBe('none')
  })
  test('old measurement cannot clear a newer pending frame', async () => {
    const f = fixture()
    f.element.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    f.element.value = target()
    await flush()
    f.element.value.dispatchEvent(new Event('scroll'))
    old(0)
    f.element.value.dispatchEvent(new Event('scroll'))
    expect(frames).toHaveLength(2)
  })
  test('consumed measurement cannot replay a later visibility update', async () => {
    const f = fixture()
    f.element.value.dispatchEvent(new Event('scroll'))
    const old = frames[0]
    old(0)
    await flush()
    f.element.value.scrollTop = 0
    old(1)
    await flush()
    expect(f.child.get('button').element.style.display).not.toBe('none')
  })
  test('retained inactive scroll listener cannot schedule work', async () => {
    const f = fixture()
    const add = vi.spyOn(f.element.value, 'addEventListener')
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const old = add.mock.calls.find((call) => call[0] === 'scroll')[1]
    f.active.value = false
    await flush()
    old(new Event('scroll'))
    expect(frames).toHaveLength(0)
  })
  test('detached listener cannot revive after reactivation', async () => {
    const f = fixture()
    const add = vi.spyOn(f.element.value, 'addEventListener')
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const old = add.mock.calls.find((call) => call[0] === 'scroll')[1]
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    old(new Event('scroll'))
    expect(frames).toHaveLength(0)
  })
  test('consumed animation frame cannot fork or rewind the animation', () => {
    const f = fixture()
    f.command.scrollToTop()
    const old = frames[0]
    old(100)
    const current = f.element.value.scrollTop
    old(50)
    expect(f.element.value.scrollTop).toBe(current)
    expect(frames).toHaveLength(2)
  })
  test('completed animation cannot revive on duplicate delivery', () => {
    const f = fixture()
    f.command.scrollToTop()
    const old = frames[0]
    old(1000)
    f.element.value.scrollTop = 500
    old(1000)
    expect(f.element.value.scrollTop).toBe(500)
  })
  test('unmount inside custom easing stops the same delivered frame', () => {
    const f = fixture({
      easing: (progress) => {
        owners[0].unmount()
        return progress
      },
    })
    f.command.scrollToTop()
    frames[0](100)
    expect(f.element.value.scrollTop).toBe(400)
    expect(frames).toHaveLength(1)
  })
  test('canceled animation cannot mutate a replacement target', async () => {
    const f = fixture()
    const first = f.element.value
    f.command.scrollToTop()
    const old = frames[0]
    f.element.value = target(500)
    await flush()
    old(100)
    expect(first.scrollTop).toBe(400)
    expect(f.element.value.scrollTop).toBe(500)
  })
  test('inactive and disposed commands and dequeued animation stay inert', async () => {
    const f = fixture()
    f.command.scrollToTop()
    const old = frames[0]
    f.active.value = false
    await flush()
    old(100)
    f.command.scrollToTop()
    f.owner.unmount()
    f.command.scrollToTop()
    expect(frames).toHaveLength(1)
    expect(f.element.value.scrollTop).toBe(400)
  })
  test('foreign target owns RAF and timestamp origin', async () => {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    nodes.push(iframe)
    const view = iframe.contentWindow
    const foreign = []
    patch(view, 'requestAnimationFrame', (callback) => {
      foreign.push(callback)
      return foreign.length
    })
    patch(view, 'cancelAnimationFrame', vi.fn())
    patch(view, 'matchMedia', () => ({ matches: false }))
    vi.spyOn(view.performance, 'now').mockReturnValue(10000)
    const f = fixture()
    f.element.value = target(400, iframe.contentDocument)
    await flush()
    f.command.scrollToTop()
    expect(foreign).toHaveLength(1)
    expect(frames).toHaveLength(0)
    foreign[0](10100)
    expect(f.element.value.scrollTop).toBe(360)
    expect(f.element.value.scrollLeft).toBe(37)
  })
  test('foreign owner cancels animation and measurement on unmount', async () => {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    nodes.push(iframe)
    const view = iframe.contentWindow
    const cancel = vi.fn()
    let id = 18
    patch(view, 'requestAnimationFrame', () => ++id)
    patch(view, 'cancelAnimationFrame', cancel)
    patch(view, 'matchMedia', () => ({ matches: false }))
    const f = fixture()
    f.element.value = target(400, iframe.contentDocument)
    await flush()
    f.command.scrollToTop()
    f.element.value.dispatchEvent(new Event('scroll'))
    f.owner.unmount()
    expect(cancel).toHaveBeenCalledWith(19)
    expect(cancel).toHaveBeenCalledWith(20)
  })
  test('reduced motion writes immediately with no RAF and keeps x', () => {
    reduced = true
    const f = fixture()
    f.command.scrollToTop()
    expect(f.element.value.scrollTop).toBe(0)
    expect(f.element.value.scrollLeft).toBe(37)
    expect(frames).toHaveLength(0)
  })
})
