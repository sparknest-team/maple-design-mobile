import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Carousel, { CarouselItem } from '..'
import Demo from '../example/demos/autoplay.vue'

vi.mock('@maplejs/maple-cli/client', () => ({ watchLang: (callback) => callback('en-US') }))

test('actual autoplay demo updates its model, stops on toggle and clears timers on unmount', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const wrapper = mount(Demo, { global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } } })
  try {
    await flushPromises()
    const carousel = wrapper.findComponent(Carousel)
    expect(carousel.props('current')).toBe(0)
    vi.advanceTimersByTime(2100)
    await flushPromises()
    expect(carousel.props('current')).toBe(1)
    await wrapper.find('input[type=checkbox]').setValue(false)
    const stopped = wrapper.get('p[role=status]').text()
    expect(carousel.props('autoPlay')).toBe(false)
    vi.advanceTimersByTime(5000)
    await flushPromises()
    expect(carousel.props('current')).toBe(1)
    expect(wrapper.get('p[role=status]').text()).toBe(stopped)
    await wrapper.find('input[type=checkbox]').setValue(true)
    vi.advanceTimersByTime(2100)
    await flushPromises()
    expect(carousel.props('current')).toBe(2)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
