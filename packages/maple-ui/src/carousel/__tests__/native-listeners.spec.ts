import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Carousel, { CarouselItem } from '../index'

test('Carousel retains native listeners alongside keyboard, hover and focus behavior', async () => {
  const keydown = vi.fn(),
    once = vi.fn(),
    enter = vi.fn(),
    leave = vi.fn(),
    focusin = vi.fn(),
    focusout = vi.fn()
  const owner = mount(Carousel, {
    props: { keyboard: true },
    attrs: {
      onKeydown: keydown,
      onKeydownOnce: once,
      onMouseenter: enter,
      onMouseleave: leave,
      onFocusin: focusin,
      onFocusout: focusout,
    },
    slots: { default: () => [1, 2, 3].map((key) => h(CarouselItem, { key }, () => String(key))) },
  })
  try {
    await owner.trigger('keydown', { key: 'ArrowRight' })
    await owner.trigger('keydown', { key: 'ArrowRight' })
    expect(keydown).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
    expect(owner.emitted('update:modelValue')).toEqual([[2], [3]])
    await owner.trigger('mouseenter')
    await owner.trigger('mouseleave')
    await owner.trigger('focusin')
    await owner.trigger('focusout')
    for (const listener of [enter, leave, focusin, focusout]) {
      expect(listener).toHaveBeenCalledTimes(1)
    }
  } finally {
    owner.unmount()
  }
})
