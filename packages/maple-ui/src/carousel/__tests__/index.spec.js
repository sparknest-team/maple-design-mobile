import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Carousel from '..'
import CarouselItem from '../CarouselItem.vue'

describe('carousel', () => {
  it('renders items and exposes an accessible region', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: () => [h(CarouselItem, () => 'one'), h(CarouselItem, () => 'two')],
      },
    })

    expect(wrapper.findAll('.mp-carousel-item')).toHaveLength(2)
  })

  it('renders maple chevron icons when show-arrow is always', () => {
    const wrapper = mount(Carousel, {
      props: { showArrow: 'always' },
      slots: {
        default: () => [h(CarouselItem, () => 'one'), h(CarouselItem, () => 'two')],
      },
    })

    expect(wrapper.findAll('.mp-carousel__navigation-button')).toHaveLength(2)
    expect(wrapper.find('.mp-carousel__navigation-prev-button svg').exists()).toBe(true)
    expect(wrapper.find('.mp-carousel__navigation-next-button svg').exists()).toBe(true)
    expect(wrapper.findAll('.mp-button')).toHaveLength(0)
  })
})
