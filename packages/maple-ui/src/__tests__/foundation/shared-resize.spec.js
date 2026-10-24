import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useTriggerResize } from '../../trigger/resize'

test('native-free resize coalesces viewport/window events, honors immediate=false and cancels stale callbacks', () => {
  const view = document.defaultView
  const observer = Object.getOwnPropertyDescriptor(view, 'ResizeObserver')
  const viewport = Object.getOwnPropertyDescriptor(view, 'visualViewport')
  const visualViewport = new view.EventTarget()
  const frames = new Map()
  let sequence = 0
  Object.defineProperty(view, 'ResizeObserver', { configurable: true, value: undefined })
  Object.defineProperty(view, 'visualViewport', { configurable: true, value: visualViewport })
  const raf = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.set(++sequence, callback)
    return sequence
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
  const target = document.createElement('div')
  const update = vi.fn()
  let wrapper
  try {
    wrapper = mount({
      setup() {
        useTriggerResize(
          () => [target],
          () => true,
          update,
          false,
        )
        return () => h('div')
      },
    })
    expect(frames.size).toBe(0)
    expect(update).not.toHaveBeenCalled()
    view.dispatchEvent(new view.Event('resize'))
    visualViewport.dispatchEvent(new view.Event('resize'))
    visualViewport.dispatchEvent(new view.Event('scroll'))
    expect(frames.size).toBe(1)
    const first = [...frames.values()][0]
    frames.clear()
    first()
    expect(update).toHaveBeenCalledTimes(1)
    visualViewport.dispatchEvent(new view.Event('scroll'))
    const stale = [...frames.values()][0]
    wrapper.unmount()
    expect(frames.size).toBe(0)
    stale()
    view.dispatchEvent(new view.Event('resize'))
    visualViewport.dispatchEvent(new view.Event('resize'))
    expect(frames.size).toBe(0)
    expect(update).toHaveBeenCalledTimes(1)
  } finally {
    wrapper?.unmount()
    raf.mockRestore()
    cancel.mockRestore()
    if (observer) {
      Object.defineProperty(view, 'ResizeObserver', observer)
    } else {
      delete view.ResizeObserver
    }
    if (viewport) {
      Object.defineProperty(view, 'visualViewport', viewport)
    } else {
      delete view.visualViewport
    }
  }
})
