import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button, { ButtonGroup } from '..'

describe('Button compact loading', () => {
  it.each([
    ['xs', 12],
    ['sm', 14],
    ['md', 16],
    ['lg', 18],
    ['xl', 20],
  ])('uses a compact %s indicator with and without an icon', (size, pixels) => {
    for (const icon of [undefined, () => h('svg')]) {
      const wrapper = mount(Button, {
        props: { size, loading: true },
        slots: { default: () => 'Save', ...(icon ? { icon } : {}) },
      })
      expect(wrapper.findComponent({ name: 'MpLoading' }).props('size')).toBe(pixels)
      wrapper.unmount()
    }
  })
  it('follows group size and explicit loading size changes', async () => {
    const wrapper = mount(ButtonGroup, {
      props: { size: 'lg' },
      slots: { default: () => h(Button, { loading: true }, () => 'Save') },
    })
    expect(wrapper.findComponent({ name: 'MpLoading' }).props('size')).toBe(18)
    await wrapper.setProps({ size: 'xs' })
    expect(wrapper.findComponent({ name: 'MpLoading' }).props('size')).toBe(12)
    wrapper.unmount()
    const button = mount(Button, { props: { loading: true, loadingSize: 22 } })
    expect(button.findComponent({ name: 'MpLoading' }).props('size')).toBe(22)
    await button.setProps({ loadingSize: 'sm' })
    expect(button.findComponent({ name: 'MpLoading' }).props('size')).toBe(14)
    button.unmount()
  })
  it('renders only the progress line in line mode for every animation type', () => {
    for (const loadingType of ['circle', 'wave', 'cube', 'rect', 'disappear']) {
      const wrapper = mount(Button, {
        props: { loading: true, loadingMode: 'line', loadingType, loadingSize: 28 },
        slots: { default: () => 'Save' },
      })
      expect(wrapper.findComponent({ name: 'MpLoading' }).exists()).toBe(false)
      expect(wrapper.find('.mp-button__loading-line').exists()).toBe(true)
      expect(wrapper.text()).toBe('Save')
      wrapper.unmount()
    }
  })
})
