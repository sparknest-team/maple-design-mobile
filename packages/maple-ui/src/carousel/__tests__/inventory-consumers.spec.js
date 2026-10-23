import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Carousel from '../Carousel.vue'
import Item from '../CarouselItem.vue'

test.each(['slide', 'fade', 'card'])('%s has the actual track/item timing targets', async (effect) => {
  const wrapper = mount(Carousel, {
    props: { effect, autoPlay: false },
    slots: { default: () => [h(Item, () => 'one'), h(Item, () => 'two')] },
  })
  try {
    await nextTick()
    expect(wrapper.get('.mp-carousel__track').findAll('.mp-carousel-item')).toHaveLength(2)
    if (effect !== 'slide') {
      expect(wrapper.classes()).toContain('mp-carousel--' + effect)
    }
  } finally {
    wrapper.unmount()
  }
})

test.each(['picker', 'calendar', 'calendarPicker'])(
  'date-range %s retains real descendant surface consumers',
  async (presentation) => {
    const wrapper = mount(DateRangePicker, {
      props: {
        modelValue: ['2025-01-15 10:00', '2025-01-16 11:00'],
        presentation,
        showTime: presentation === 'calendarPicker',
      },
    })
    try {
      await nextTick()
      const shell = wrapper.get('.mp-date-range-picker')
      if (presentation === 'picker') {
        expect(shell.find('.mp-picker').exists()).toBe(true)
        expect(shell.find('.mp-picker__mask').exists()).toBe(true)
      } else {
        expect(shell.find('.mp-date-picker__body').exists()).toBe(true)
        if (presentation === 'calendarPicker') {
          expect(shell.find('.mp-date-range-picker__quick-time-wheel .mp-picker__mask').exists()).toBe(true)
          await shell.get('.mp-date-range-picker__view-toggle').trigger('click')
          await nextTick()
          expect(shell.find('.mp-date-range-picker__time-wheel .mp-picker__mask').exists()).toBe(true)
          expect(shell.find('.mp-time-picker').exists()).toBe(false)
        }
      }
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  },
)

test('time-range paired wheels retain real descendant surface consumers', async () => {
  const wrapper = mount(TimeRangePicker, { props: { modelValue: ['09:00', '18:00'], format: 'HH:mm' } })
  try {
    await nextTick()
    const shell = wrapper.get('.mp-time-range-picker')
    expect(shell.find('.mp-picker__mask').exists()).toBe(true)
    expect(shell.findAll('[role="listbox"]')).toHaveLength(4)
    expect(shell.find('.mp-time-picker').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
