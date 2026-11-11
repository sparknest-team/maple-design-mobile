import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Icon from '../Icon.vue'

test('default name transition does not override a consumer transform transition', async () => {
  const wrapper = mount(Icon)
  try {
    expect(wrapper.element.style.transitionDuration).toBe('')
    await wrapper.setProps({ transition: 120 })
    expect(wrapper.element.style.transitionDuration).toBe('120ms')
    await wrapper.setProps({ transition: 0 })
    expect(wrapper.element.style.transitionDuration).toBe('')
  } finally {
    wrapper.unmount()
  }
})
