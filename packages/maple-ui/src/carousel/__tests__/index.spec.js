import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Carousel from '..'
import CarouselItem from '../../carousel-item'

describe('carousel', () => {
  it('renders items and exposes an accessible region', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: () => [h(CarouselItem, () => 'one'), h(CarouselItem, () => 'two')],
      },
    })

    expect(wrapper.findAll('.mp-carousel-item')).toHaveLength(2)
  })
})
