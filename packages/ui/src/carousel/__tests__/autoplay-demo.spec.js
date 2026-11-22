import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import DemoZh from '../example/demos/autoplay.vue'
import DemoEn from '../example/demos/en-US/autoplay.vue'

useDemoControls()

// Demos are language-fixed: the English copy lives under example/demos/en-US,
// so the status text must be asserted per language instead of switching Locale.
test.each([
  ['zh-CN', DemoZh, '当前页'],
  ['en-US', DemoEn, 'Current slide'],
])(
  'autoplay demo (%s) updates its model, stops on toggle and clears timers on unmount',
  async (_language, Demo, statusLabel) => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const wrapper = mount(Demo, { global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } } })
    try {
      await flushPromises()
      const carousel = wrapper.findComponent(Carousel)
      expect(carousel.props('modelValue')).toBe(1)
      expect(wrapper.get('p[role=status]').text()).toContain(`${statusLabel}：1`)
      vi.advanceTimersByTime(2100)
      await flushPromises()
      expect(carousel.props('modelValue')).toBe(2)
      expect(wrapper.get('p[role=status]').text()).toContain(`${statusLabel}：2`)
      await carousel.trigger('focusin')
      await carousel.trigger('focusout', { relatedTarget: document.body })
      const stopped = wrapper.get('p[role=status]').text()
      expect(carousel.props('autoPlay')).toBe(false)
      vi.advanceTimersByTime(5000)
      await flushPromises()
      expect(carousel.props('modelValue')).toBe(2)
      expect(wrapper.get('p[role=status]').text()).toBe(stopped)
      await wrapper.find('input[type=checkbox]').setValue(true)
      vi.advanceTimersByTime(2100)
      await flushPromises()
      expect(carousel.props('modelValue')).toBe(3)
      wrapper.unmount()
      expect(vi.getTimerCount()).toBe(0)
    } finally {
      wrapper.unmount()
      vi.useRealTimers()
    }
  },
)
