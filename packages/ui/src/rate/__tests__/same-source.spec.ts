import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Rate from '../rate-core'

const CustomIcon = defineComponent({ render: () => h('i', { class: 'prop-icon' }, 'prop') })

describe('Rate same source', () => {
  test('component icon props render without global registration', () => {
    const wrapper = mount(Rate, { props: { modelValue: 1, icon: CustomIcon, emptyIcon: CustomIcon } })
    expect(wrapper.findAll('.prop-icon')).toHaveLength(5)
  })

  test('character slot overrides icon props', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 1, icon: CustomIcon },
      slots: { character: ({ value }) => h('b', { class: 'slot-icon' }, String(value)) },
    })
    expect(wrapper.findAll('.slot-icon')).toHaveLength(5)
    expect(wrapper.find('.prop-icon').exists()).toBe(false)
  })

  test('grading overrides character slot and icon props', () => {
    const wrapper = mount(Rate, {
      props: { modelValue: 2, grading: true, icon: CustomIcon },
      slots: { character: () => h('b', { class: 'slot-icon' }) },
    })
    expect(wrapper.find('.slot-icon').exists()).toBe(false)
    expect(wrapper.find('.prop-icon').exists()).toBe(false)
    expect(wrapper.findAll('svg')).toHaveLength(5)
  })
})
