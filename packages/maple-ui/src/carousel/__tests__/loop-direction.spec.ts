import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Carousel, { CarouselItem } from '..'
import type { CarouselExpose } from '../types'

afterEach(() => vi.restoreAllMocks())
for (const [direction, orientation] of [
  ['ltr', 'horizontal'],
  ['rtl', 'horizontal'],
  ['rtl', 'vertical'],
] as const) {
  it(`${direction} ${orientation}: consecutive loop moves retain their animation`, async () => {
    const host = document.createElement('div')
    host.dir = direction
    document.body.append(host)
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(200)
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(200)
    const view = host.ownerDocument.defaultView!
    let matrixReads = 0
    const realStyle = view.getComputedStyle.bind(view)
    vi.spyOn(view, 'getComputedStyle').mockImplementation((element, pseudo) => {
      const style = realStyle(element, pseudo)
      if (!element.classList.contains('mp-carousel__track')) {
        return style
      }
      // Browsers expose a physical matrix even when the authored transform is translateX/Y.
      const transform = (element as HTMLElement).style.transform
      const distance = Number(/translate[XY]\((-?[\d.]+)px\)/.exec(transform)?.[1] ?? 0)
      return new Proxy(style, {
        get(target, property) {
          if (property === 'transform') {
            matrixReads++
            return orientation === 'vertical'
              ? `matrix(1, 0, 0, 1, 0, ${distance})`
              : `matrix(1, 0, 0, 1, ${distance}, 0)`
          }
          if (property === 'transitionDuration') {
            return '0.2s'
          }
          const value = Reflect.get(target, property, target)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    })
    const wrapper = mount(Carousel, {
      attachTo: host,
      props: { defaultValue: 2, loop: true, orientation, height: 200 },
      slots: { default: () => ['one', 'two', 'three'].map((label) => h(CarouselItem, {}, () => label)) },
    })
    try {
      await nextTick()
      await nextTick()
      ;(wrapper.vm as unknown as CarouselExpose).to(3)
      await nextTick()
      const track = wrapper.get('.mp-carousel__track').element as HTMLElement
      expect(matrixReads).toBeGreaterThan(0)
      expect(track.style.transitionDuration).not.toBe('0ms')
      expect(track.style.transform).toBe(
        `translate${orientation === 'vertical' ? 'Y' : 'X'}(${direction === 'rtl' && orientation === 'horizontal' ? 400 : -400}px)`,
      )
      expect(wrapper.emitted('change')?.at(-1)).toEqual([3, 2, true])
    } finally {
      wrapper.unmount()
      host.remove()
    }
  })
}
