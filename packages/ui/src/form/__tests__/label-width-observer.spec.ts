import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FormItemLabel from '../FormItemLabel.vue'

const originalResizeObserver = globalThis.ResizeObserver
afterEach(() => {
  vi.restoreAllMocks()
  vi.stubGlobal('ResizeObserver', originalResizeObserver)
})

describe('label width observation', () => {
  it('observes the tooltip border box, coalesces updates and cancels pending work', async () => {
    const observations: { target: Element; options?: ResizeObserverOptions }[] = []
    let callback: ResizeObserverCallback | undefined
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(onResize: ResizeObserverCallback) {
          callback = onResize
        }
        observe(target: Element, options?: ResizeObserverOptions) {
          observations.push({ target, options })
        }
        disconnect() {}
      },
    )
    const request = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(42)
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    const setLabelWidth = vi.fn()
    const wrapper = mount(FormItemLabel, {
      attachTo: document.body,
      props: { measureWidth: true, tooltip: 'Help', registry: { setLabelWidth, removeLabelWidth: vi.fn() } },
      slots: { default: 'Name' },
    })
    await nextTick()
    const button = wrapper.get('button').element
    expect(observations.some(({ target, options }) => target === button && options?.box === 'border-box')).toBe(true)
    callback!([], {} as ResizeObserver)
    callback!([], {} as ResizeObserver)
    expect(request).toHaveBeenCalledTimes(1)
    wrapper.unmount()
    expect(cancel).toHaveBeenCalledWith(42)
    callback!([], {} as ResizeObserver)
    expect(request).toHaveBeenCalledTimes(1)
  })
})
