import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Ripple from '../index'

const Host = defineComponent({
  directives: { Ripple },
  props: { disabled: Boolean },
  template: '<button v-ripple="{ disabled }">Go</button>',
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('ripple ownership and coordinates', () => {
  test('restores only owned styles after overlapping waves and on disable', async () => {
    vi.useFakeTimers()
    vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
    const wrapper = mount(Host, { attachTo: document.body })
    const el = wrapper.element as HTMLElement
    el.style.cssText = 'position: static; z-index: auto; overflow-x: visible; overflow-y: scroll'
    await wrapper.trigger('mousedown', { button: 0 })
    vi.advanceTimersByTime(50)
    await wrapper.trigger('mousedown', { button: 0 })
    vi.advanceTimersByTime(50)
    expect(el.querySelectorAll('div')).toHaveLength(2)
    el.style.position = 'absolute'
    el.style.overflowX = 'clip'
    document.dispatchEvent(new MouseEvent('mouseup'))
    vi.advanceTimersByTime(1000)
    expect(el.querySelectorAll('div')).toHaveLength(0)
    expect(el.style.position).toBe('absolute')
    expect(el.style.overflowX).toBe('clip')
    expect(el.style.overflowY).toBe('scroll')
    expect(el.style.zIndex).toBe('auto')
    await wrapper.trigger('mousedown', { button: 0 })
    vi.advanceTimersByTime(50)
    await wrapper.setProps({ disabled: true })
    expect(el.querySelectorAll('div')).toHaveLength(0)
    expect(el.style.overflowX).toBe('clip')
    expect(el.style.overflowY).toBe('scroll')
    wrapper.unmount()
  })

  test('converts visual mouse and touch coordinates into the padding box', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Host, { attachTo: document.body })
    const el = wrapper.element as HTMLElement
    for (const [key, value] of Object.entries({
      clientWidth: 100,
      clientHeight: 60,
      offsetWidth: 104,
      offsetHeight: 64,
      clientLeft: 2,
      clientTop: 2,
    })) {
      Object.defineProperty(el, key, { configurable: true, value })
    }
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20, width: 52, height: 128 } as DOMRect)
    await wrapper.trigger('mousedown', { button: 0, clientX: 36, clientY: 84 })
    vi.advanceTimersByTime(30)
    const wave = el.querySelector('div')!
    const radius = Math.hypot(100, 60) / 2
    const checkCoordinates = (transform: string) => {
      const match = transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)!
      expect(Number(match[1]) + radius).toBeCloseTo(50)
      expect(Number(match[2]) + radius).toBeCloseTo(30)
    }
    checkCoordinates(wave.style.transform)
    await wrapper.setProps({ disabled: true })
    await wrapper.setProps({ disabled: false })
    const touch = new Event('touchstart', { bubbles: true })
    Object.defineProperty(touch, 'touches', { value: [{ clientX: 36, clientY: 84 }] })
    el.dispatchEvent(touch)
    vi.advanceTimersByTime(30)
    checkCoordinates(el.querySelector('div')!.style.transform)
    wrapper.unmount()
  })
})
