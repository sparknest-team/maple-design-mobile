import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import BackTop from '../index'
import { ease } from '../use-back-top'

let frames: Map<number, FrameRequestCallback>
let counter: number
const originalRaf = globalThis.requestAnimationFrame
const originalCancelRaf = globalThis.cancelAnimationFrame
const originalMatchMedia = globalThis.matchMedia
const ownerView = document.defaultView!
const ownerRaf = Object.getOwnPropertyDescriptor(ownerView, 'requestAnimationFrame')
const ownerCancelRaf = Object.getOwnPropertyDescriptor(ownerView, 'cancelAnimationFrame')
beforeEach(() => {
  frames = new Map()
  counter = 0
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++counter, callback)
    return counter
  })
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id))
  Object.defineProperty(ownerView, 'requestAnimationFrame', {
    configurable: true,
    value: globalThis.requestAnimationFrame,
  })
  Object.defineProperty(ownerView, 'cancelAnimationFrame', {
    configurable: true,
    value: globalThis.cancelAnimationFrame,
  })
  if (ownerView.performance !== performance) {
    vi.spyOn(ownerView.performance, 'now').mockImplementation(() => performance.now())
  }
})
afterEach(() => {
  vi.stubGlobal('requestAnimationFrame', originalRaf)
  vi.stubGlobal('cancelAnimationFrame', originalCancelRaf)
  vi.stubGlobal('matchMedia', originalMatchMedia)
  vi.restoreAllMocks()
  if (ownerRaf) {
    Object.defineProperty(ownerView, 'requestAnimationFrame', ownerRaf)
  } else {
    Reflect.deleteProperty(ownerView, 'requestAnimationFrame')
  }
  if (ownerCancelRaf) {
    Object.defineProperty(ownerView, 'cancelAnimationFrame', ownerCancelRaf)
  } else {
    Reflect.deleteProperty(ownerView, 'cancelAnimationFrame')
  }
})
async function frame(time = performance.now() + 1000) {
  const callbacks = [...frames.values()]
  frames.clear()
  callbacks.forEach((callback) => callback(time))
  await nextTick()
}
function container(top = 300) {
  const el = document.createElement('div')
  el.scrollTop = top
  el.scrollLeft = 37
  return el
}
describe('BackTop copied contract', () => {
  test('a preference change during animation finishes without another frame', async () => {
    let reduced = false
    vi.stubGlobal('matchMedia', () => ({ matches: reduced }))
    const target = container(400)
    vi.spyOn(performance, 'now').mockReturnValue(0)
    const wrapper = mount(BackTop, { props: { targetContainer: target, popupContainer: false, duration: 1000 } })
    try {
      await wrapper.get('button').trigger('click')
      await frame(100)
      reduced = true
      await frame(150)
      expect(target.scrollTop).toBe(0)
      expect(target.scrollLeft).toBe(37)
      expect(frames.size).toBe(0)
    } finally {
      wrapper.unmount()
    }
  })
  test('a callback already taken from the queue cannot mutate a replaced target', async () => {
    const first = container(400),
      second = container(500)
    vi.spyOn(performance, 'now').mockReturnValue(0)
    const wrapper = mount(BackTop, { props: { targetContainer: first, popupContainer: false, duration: 1000 } })
    try {
      await wrapper.get('button').trigger('click')
      const stale = [...frames.values()][0]
      await wrapper.setProps({ targetContainer: second })
      stale(200)
      expect(first.scrollTop).toBe(400)
      expect(second.scrollTop).toBe(500)
      expect(frames.size).toBe(0)
    } finally {
      wrapper.unmount()
    }
  })
  test('foreign targets use their own document motion preference', async () => {
    const iframe = document.createElement('iframe')
    document.body.append(iframe)
    const view = iframe.contentWindow!
    Object.defineProperty(view, 'matchMedia', { configurable: true, value: () => ({ matches: true }) })
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    const target = iframe.contentDocument!.createElement('div')
    target.scrollTop = 400
    const wrapper = mount(BackTop, { props: { targetContainer: target, popupContainer: false } })
    try {
      wrapper.vm.scrollToTop()
      expect(target.scrollTop).toBe(0)
      expect(frames.size).toBe(0)
    } finally {
      wrapper.unmount()
      iframe.remove()
    }
  })
  test('native accessible button, position, immediate scroll and one event', async () => {
    const target = container()
    const wrapper = mount(BackTop, {
      attrs: { id: 'back-top-contract', class: 'custom-button', style: { color: 'red' } },
      props: {
        targetContainer: target,
        popupContainer: false,
        duration: 0,
        right: 16,
        bottom: '2rem',
        ariaLabel: '回到顶部',
      },
    })
    await nextTick()
    const button = wrapper.get('button')
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('id')).toBe('back-top-contract')
    expect(button.classes()).toContain('custom-button')
    expect(button.element.style.color).toBe('red')
    expect(button.attributes('aria-label')).toBe('回到顶部')
    expect(button.element.style.right).toBe('16px')
    expect(button.element.style.bottom).toBe('2rem')
    expect(button.element.style.display).not.toBe('none')
    await button.trigger('click')
    expect(target.scrollTop).toBe(0)
    expect(target.scrollLeft).toBe(37)
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(button.element.style.display).toBe('none')
    wrapper.unmount()
  })
  test('threshold and target changes detach the old listener', async () => {
    const first = container(200)
    const second = container(20)
    const remove = vi.spyOn(first, 'removeEventListener')
    const wrapper = mount(BackTop, { props: { targetContainer: first, popupContainer: false } })
    await nextTick()
    expect(wrapper.get('button').element.style.display).not.toBe('none')
    await wrapper.setProps({ visibleHeight: '201' })
    expect(wrapper.get('button').element.style.display).toBe('none')
    await wrapper.setProps({ targetContainer: second, visibleHeight: 10 })
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
    first.scrollTop = 0
    first.dispatchEvent(new Event('scroll'))
    await frame()
    expect(wrapper.get('button').element.style.display).not.toBe('none')
    second.scrollTop = 0
    second.dispatchEvent(new Event('scroll'))
    await frame()
    expect(wrapper.get('button').element.style.display).toBe('none')
    wrapper.unmount()
  })
  test('reactive getter resolves a late container; invalid selectors stay hidden', async () => {
    const target = ref<HTMLElement>()
    const wrapper = mount(BackTop, { props: { targetContainer: () => target.value, popupContainer: false } })
    expect(wrapper.get('button').element.style.display).toBe('none')
    target.value = container()
    await nextTick()
    expect(wrapper.get('button').element.style.display).not.toBe('none')
    await wrapper.setProps({ targetContainer: '[' })
    expect(wrapper.get('button').element.style.display).toBe('none')
    wrapper.unmount()
  })
  test('default target is the document, not a scrollable ancestor', async () => {
    const el = document.scrollingElement ?? document.documentElement
    el.scrollTop = 300
    const wrapper = mount(BackTop, { props: { popupContainer: false, duration: 0 } })
    await nextTick()
    await wrapper.get('button').trigger('click')
    expect(el.scrollTop).toBe(0)
    wrapper.unmount()
  })
  test('animation progresses, preserves x and repeated clicks replace the RAF', async () => {
    const target = container(400)
    vi.spyOn(performance, 'now').mockReturnValue(0)
    const wrapper = mount(BackTop, {
      props: { targetContainer: target, popupContainer: false, duration: 200, easing: 'linear' },
    })
    await wrapper.get('button').trigger('click')
    await frame(100)
    expect(target.scrollTop).toBe(200)
    expect(target.scrollLeft).toBe(37)
    await wrapper.get('button').trigger('click')
    expect(frames.size).toBe(1)
    await frame(200)
    expect(target.scrollTop).toBe(0)
    expect(frames.size).toBe(0)
    wrapper.unmount()
  })
  test('switching targets and unmount cancel pending work', async () => {
    const first = container()
    const second = container()
    const wrapper = mount(BackTop, { props: { targetContainer: first, popupContainer: false } })
    await wrapper.get('button').trigger('click')
    expect(frames.size).toBe(1)
    await wrapper.setProps({ targetContainer: second })
    expect(frames.size).toBe(0)
    await frame()
    expect(first.scrollTop).toBe(300)
    second.dispatchEvent(new Event('scroll'))
    wrapper.unmount()
    expect(frames.size).toBe(0)
  })
  test('KeepAlive detaches while inactive and rebinds once', async () => {
    const target = container()
    const active = ref(true)
    const add = vi.spyOn(target, 'addEventListener')
    const remove = vi.spyOn(target, 'removeEventListener')
    const Host = defineComponent(
      () => () =>
        h(KeepAlive, null, {
          default: () => (active.value ? h(BackTop, { targetContainer: target, popupContainer: false }) : null),
        }),
    )
    const wrapper = mount(Host)
    await nextTick()
    active.value = false
    await nextTick()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
    const calls = add.mock.calls.length
    active.value = true
    await nextTick()
    expect(add.mock.calls.length).toBe(calls + 1)
    wrapper.unmount()
  })
  test('reduced motion bypasses animation and expose works', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    const target = container()
    const wrapper = mount(BackTop, { props: { targetContainer: target, popupContainer: false } })
    wrapper.vm.scrollToTop()
    expect(target.scrollTop).toBe(0)
    expect(frames.size).toBe(0)
    wrapper.unmount()
  })
  test('Teleport moves one button and removes it on unmount', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mount(BackTop, { props: { popupContainer: host, targetContainer: container() } })
    await nextTick()
    expect(host.querySelectorAll('button')).toHaveLength(1)
    wrapper.unmount()
    expect(host.querySelector('button')).toBeNull()
    host.remove()
  })
  test('easing presets and custom function', () => {
    expect(ease(0.5, 'linear')).toBe(0.5)
    expect(ease(0.5, 'quartOut')).toBe(0.9375)
    expect(ease(0.25, 'easeInOutCubic')).toBe(0.0625)
    expect(ease(0.75, 'easeInOutCubic')).toBe(0.9375)
    expect(ease(0.5, (x) => x * x)).toBe(0.25)
  })
})
