import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Locale from '../../locale'
import Demo from '../example/demos/autoplay.vue'

useDemoControls()

beforeEach(() => {
  Locale.add('en-US', Locale.enUS)
  Locale.use('en-US')
})
afterEach(() => Locale.use('zh-CN'))

test('actual autoplay demo updates its model, stops on toggle and clears timers on unmount', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const wrapper = mount(Demo, { global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } } })
  try {
    await flushPromises()
    const carousel = wrapper.findComponent(Carousel)
    expect(carousel.props('modelValue')).toBe(1)
    expect(wrapper.get('p[role=status]').text()).toContain('Current slide：1')
    vi.advanceTimersByTime(2100)
    await flushPromises()
    expect(carousel.props('modelValue')).toBe(2)
    expect(wrapper.get('p[role=status]').text()).toContain('Current slide：2')
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
})
