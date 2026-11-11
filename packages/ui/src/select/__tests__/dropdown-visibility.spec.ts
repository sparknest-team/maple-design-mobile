import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SelectDropdown from '../SelectDropdown.vue'

describe('dropdown visibility', () => {
  it.each([false, true])('shows and hides the same option container with scrollbar=%s', async (scrollbar) => {
    const wrapper = mount(SelectDropdown, { props: { scrollbar, empty: true }, slots: { default: '<li>Option</li>' } })
    const item = wrapper.get('li').element as HTMLElement
    const list = item.closest('ul')!
    const initialVisibility = () => {
      let node: HTMLElement | null = list
      while (node && node !== wrapper.element.parentElement) {
        if (node.style.display === 'none') {
          return false
        }
        node = node.parentElement
      }
      return true
    }
    expect(initialVisibility()).toBe(false)
    await wrapper.setProps({ empty: false })
    expect(initialVisibility()).toBe(true)
    await wrapper.setProps({ loading: true })
    expect(initialVisibility()).toBe(false)
    await wrapper.setProps({ loading: false })
    expect(initialVisibility()).toBe(true)
    wrapper.unmount()
  })

  it('keeps the list visible when switching scrollbar implementations', async () => {
    const wrapper = mount(SelectDropdown, {
      props: { empty: false, scrollbar: true },
      slots: { default: '<li>Option</li>' },
    })
    for (const scrollbar of [false, true]) {
      await wrapper.setProps({ scrollbar })
      const item = wrapper.get('li').element as HTMLElement
      let node: HTMLElement | null = item
      while (node && node !== wrapper.element.parentElement) {
        expect(node.style.display).not.toBe('none')
        node = node.parentElement
      }
    }
    wrapper.unmount()
  })

  it('retains custom outer styles while visibility changes', async () => {
    const wrapper = mount(SelectDropdown, {
      props: { empty: true, scrollbar: { type: 'embed', outerClass: '', outerStyle: { width: '123px' } } },
    })
    const root = wrapper.get('[class*="scrollbar-type-"]').element as HTMLElement
    expect(root.style.width).toBe('123px')
    expect(root.style.display).toBe('none')
    await wrapper.setProps({ empty: false })
    expect(root.style.width).toBe('123px')
    expect(root.style.display).not.toBe('none')
    wrapper.unmount()
  })
})
