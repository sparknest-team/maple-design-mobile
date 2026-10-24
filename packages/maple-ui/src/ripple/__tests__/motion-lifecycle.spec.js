import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Ripple from '../index'

const Wrapper = {
  directives: { Ripple },
  data: () => ({ disabled: false }),
  template: '<button v-ripple="{ disabled }">Ripple</button>',
}
let wrappers = []
const create = (options = {}) => {
  const wrapper = mount(Wrapper, { attachTo: document.body, ...options })
  wrappers.push(wrapper)
  return wrapper
}
const key = (el, type, value = 'Enter') => el.dispatchEvent(new KeyboardEvent(type, { key: value }))
const wave = (el) => el.querySelector('.mp-ripple')
beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
})
afterEach(() => {
  wrappers.forEach((wrapper) => wrapper.unmount())
  wrappers = []
  vi.restoreAllMocks()
  vi.useRealTimers()
})
describe('Ripple timing and ownership', () => {
  test('an immediate key release still cleans the delayed wave', () => {
    const wrapper = create()
    key(wrapper.element, 'keydown')
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(60)
    expect(wave(wrapper.element)).not.toBeNull()
    vi.advanceTimersByTime(470)
    expect(wave(wrapper.element)).toBeNull()
    expect(wrapper.element._ripple.timers.size).toBe(0)
  })
  test('zero transitions keep cleanup floors without waiting on transition events', () => {
    const original = document.defaultView.getComputedStyle.bind(document.defaultView)
    vi.spyOn(document.defaultView, 'getComputedStyle').mockImplementation((el) =>
      el.classList.contains('mp-ripple')
        ? { transitionProperty: 'none', transitionDuration: '0s', transitionDelay: '0s' }
        : original(el),
    )
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(470)
    expect(wave(wrapper.element)).toBeNull()
  })
  test('transition lists repeat values and the last matching property wins', () => {
    const original = document.defaultView.getComputedStyle.bind(document.defaultView)
    vi.spyOn(document.defaultView, 'getComputedStyle').mockImplementation((el) =>
      el.classList.contains('mp-ripple')
        ? {
            transitionProperty: 'all, transform, opacity',
            transitionDuration: '600ms, 400ms',
            transitionDelay: '-100ms',
          }
        : original(el),
    )
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(289)
    expect(wave(wrapper.element).style.opacity).toBe('0.25')
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element).style.opacity).toBe('0')
    vi.advanceTimersByTime(499)
    expect(wave(wrapper.element)).not.toBeNull()
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element)).toBeNull()
  })
  test.each([60, 300])('disabling clears visible/fading work at %ims', async (elapsed) => {
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(elapsed - 60)
    const state = wrapper.element._ripple
    await wrapper.setData({ disabled: true })
    expect(wave(wrapper.element)).toBeNull()
    expect(state.timers.size).toBe(0)
    vi.advanceTimersByTime(2000)
    expect(wave(wrapper.element)).toBeNull()
  })
  test('unmounting a visible wave removes nodes, timers and document listeners', () => {
    const add = vi.spyOn(document, 'addEventListener')
    const wrapper = create()
    const element = wrapper.element
    key(element, 'keydown')
    vi.advanceTimersByTime(60)
    const state = element._ripple
    const remove = vi.spyOn(state.document, 'removeEventListener')
    wrapper.unmount()
    wrappers.pop()
    expect(state.timers.size).toBe(0)
    expect(wave(element)).toBeNull()
    for (const event of ['touchend', 'touchcancel', 'dragend']) {
      const registered = add.mock.calls.find(([name]) => name === event)
      expect(registered).toBeDefined()
      expect(remove).toHaveBeenCalledWith(event, registered[1])
    }
  })
  test('default retains its 250ms display and removal floors', () => {
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(219)
    expect(wave(wrapper.element).style.opacity).toBe('0.25')
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element).style.opacity).toBe('0')
    vi.advanceTimersByTime(249)
    expect(wave(wrapper.element)).not.toBeNull()
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element)).toBeNull()
  })
  test('long computed transform and opacity are not truncated', () => {
    const original = document.defaultView.getComputedStyle.bind(document.defaultView)
    vi.spyOn(document.defaultView, 'getComputedStyle').mockImplementation((el) =>
      el.classList.contains('mp-ripple')
        ? { transitionProperty: 'transform, opacity', transitionDuration: '0.6s, 0.8s', transitionDelay: '0.1s, 0.05s' }
        : original(el),
    )
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(689)
    expect(wave(wrapper.element).style.opacity).toBe('0.25')
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element).style.opacity).toBe('0')
    vi.advanceTimersByTime(849)
    expect(wave(wrapper.element)).not.toBeNull()
    vi.advanceTimersByTime(1)
    expect(wave(wrapper.element)).toBeNull()
  })
  test('repeated release does not schedule duplicate cleanup', () => {
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup')
    const count = wrapper.element._ripple.timers.size
    document.dispatchEvent(new Event('touchend'))
    document.dispatchEvent(new Event('dragend'))
    expect(wrapper.element._ripple.timers.size).toBe(count)
  })
  test('parent disabling does not remove a nested instance wave', async () => {
    const parent = create()
    const child = create({ attachTo: parent.element })
    key(child.element, 'keydown')
    vi.advanceTimersByTime(60)
    const childWave = wave(child.element)
    await parent.setData({ disabled: true })
    expect(wave(child.element)).toBe(childWave)
  })
  test('a foreign document releases only its own wave', () => {
    const iframe = document.createElement('iframe')
    document.body.append(iframe)
    try {
      const wrapper = create({ attachTo: iframe.contentDocument.body })
      key(wrapper.element, 'keydown')
      vi.advanceTimersByTime(60)
      document.dispatchEvent(new Event('touchend'))
      expect(wrapper.element._ripple.timers.size).toBe(0)
      iframe.contentDocument.dispatchEvent(new iframe.contentWindow.Event('touchend'))
      expect(wrapper.element._ripple.timers.size).toBe(1)
      vi.advanceTimersByTime(600)
      expect(wave(wrapper.element)).toBeNull()
    } finally {
      wrappers.pop().unmount()
      iframe.remove()
    }
  })
  test('unrelated keyup does not release a held Enter', () => {
    const wrapper = create()
    key(wrapper.element, 'keydown')
    vi.advanceTimersByTime(60)
    key(wrapper.element, 'keyup', 'a')
    vi.advanceTimersByTime(600)
    expect(wave(wrapper.element).style.opacity).toBe('0.25')
    key(wrapper.element, 'keyup')
    vi.advanceTimersByTime(300)
    expect(wave(wrapper.element)).toBeNull()
  })
})
