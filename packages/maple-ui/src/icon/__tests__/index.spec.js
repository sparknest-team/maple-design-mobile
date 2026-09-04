import { defineComponent, h } from 'vue'
import { IconArrowLeft, IconCaretUp, IconCheckCircle, IconCheckCircleFill } from '@maplejs/icons-vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Icon from '../Icon.vue'

describe('Icon SVG resolver', () => {
  test('renders only an explicitly registered named icon', () => {
    const CheckboxMarkedCircle = defineComponent({
      template: '<svg class="registered-icon" />',
    })
    const wrapper = mount(Icon, {
      props: { name: 'checkbox-marked-circle-fill' },
      global: {
        components: { IconCheckboxMarkedCircleFill: CheckboxMarkedCircle },
      },
    })

    expect(wrapper.find('svg.registered-icon').exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(false)
  })

  test('does not render an icon that was not registered', () => {
    const wrapper = mount(Icon, {
      props: { name: 'checkbox-marked-circle-fill' },
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })

  test('resolves icons installed by the Maple icon package', () => {
    const wrapper = mount(Icon, {
      props: { name: 'check-circle' },
      global: { plugins: [IconCheckCircle] },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  test('passes its size to a slotted SVG through em units', () => {
    const wrapper = mount(Icon, {
      props: { size: '28' },
      slots: { default: () => h(IconCheckCircle) },
    })

    expect(wrapper.attributes('style')).toContain('font-size: 28px')
    expect(wrapper.find('svg').attributes('style')).toContain('width: 1em')
    expect(wrapper.find('svg').attributes('style')).toContain('height: 1em')
  })

  test('supports the shared standalone icon props', () => {
    const wrapper = mount(IconArrowLeft, {
      props: {
        size: '24',
        color: 'rgb(255, 0, 0)',
        rotate: 90,
        title: 'back',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    })

    expect(wrapper.attributes('style')).toContain('font-size: 24px')
    expect(wrapper.attributes('style')).toContain('color: rgb(255, 0, 0)')
    expect(wrapper.attributes('style')).toContain('transform: rotate(90deg)')
    expect(wrapper.attributes('stroke-width')).toBe('2')
    expect(wrapper.attributes('stroke-linecap')).toBe('round')
    expect(wrapper.attributes('stroke-linejoin')).toBe('round')
    expect(wrapper.attributes('aria-hidden')).toBe('false')
    expect(wrapper.find('title').text()).toBe('back')
  })

  test.each([IconCaretUp, IconCheckCircleFill])('preserves filled paths in mixed SVG icons', (component) => {
    const wrapper = mount(component)
    const path = wrapper.find('path')

    expect(path.attributes('fill')).toBe('currentColor')
    expect(path.attributes('stroke')).toBe('none')
  })

  test('supports the shared wrapper props', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'check-circle',
        size: 28,
        color: 'blue',
        rotate: 45,
        spin: true,
        transition: 120,
      },
      global: { components: { IconCheckCircle } },
    })

    expect(wrapper.classes()).toContain('mp-icon--spin')
    expect(wrapper.attributes('style')).toContain('font-size: 28px')
    expect(wrapper.attributes('style')).toContain('color: blue')
    expect(wrapper.attributes('style')).toContain('rotate: 45deg')
    expect(wrapper.attributes('style')).toContain('transition-duration: 120ms')
  })
})
