import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Icon from '../Icon.vue'

describe('Icon SVG resolver', () => {
  test('renders only an explicitly registered named icon', () => {
    const CheckboxMarkedCircle = defineComponent({
      template: '<svg class="registered-icon" />',
    })
    const wrapper = mount(Icon, {
      props: { name: 'checkbox-marked-circle' },
      global: {
        components: { IconCheckboxMarkedCircle: CheckboxMarkedCircle },
      },
    })

    expect(wrapper.find('svg.registered-icon').exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(false)
  })

  test('does not render an icon that was not registered', () => {
    const wrapper = mount(Icon, {
      props: { name: 'checkbox-marked-circle' },
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
