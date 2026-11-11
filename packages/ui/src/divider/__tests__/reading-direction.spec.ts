import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Divider from '..'

describe('divider reading direction', () => {
  it('preserves logical asymmetric inset and spacing when switching axes and direction', async () => {
    const wrapper = mount(Divider, {
      props: { inset: [12, 24], spacing: [6, 10], description: 'Title', textAlign: 'start' },
      attrs: { dir: 'ltr' },
    })
    const text = wrapper.get('.mp-divider__text').element
    wrapper.element.setAttribute('dir', 'rtl')
    await nextTick()
    expect(wrapper.element.style.marginInlineStart).toBe('12px')
    expect(wrapper.element.style.marginInlineEnd).toBe('24px')
    expect(wrapper.element.style.marginBlockStart).toBe('6px')
    expect(wrapper.get('.mp-divider__text').element).toBe(text)
    await wrapper.setProps({ orientation: 'vertical' })
    expect(wrapper.element.style.marginInlineStart).toBe('6px')
    expect(wrapper.element.style.marginInlineEnd).toBe('10px')
    expect(wrapper.element.style.marginBlockStart).toBe('12px')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    wrapper.unmount()
  })
})
