import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Divider from '..'
import VarDivider from '../Divider'

test('divider plugin', () => {
  const app = createApp({}).use(Divider)
  expect(app.component(Divider.name)).toBeTruthy()
})

describe('test divider components props', () => {
  test('divider orientation', async () => {
    const wrapper = mount(VarDivider, {
      props: { orientation: 'vertical' },
    })
    expect(wrapper.find('.mp-divider--orientation-vertical').exists()).toBe(true)
    await wrapper.setProps({ orientation: 'horizontal' })
    expect(wrapper.find('.mp-divider--orientation-horizontal').exists()).toBe(true)
    wrapper.unmount()
  })

  test('divider type', async () => {
    ;['solid', 'dashed', 'dotted', 'double'].forEach((type) => {
      const wrapper = mount(VarDivider, { props: { type } })
      expect(wrapper.find(`.mp-divider--type-${type}`).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('divider textAlign', () => {
    const wrapper = mount(VarDivider, {
      props: { description: 'text', textAlign: 'start' },
    })
    expect(wrapper.find('.mp-divider--text-align-start').exists()).toBe(true)
    expect(wrapper.find('.mp-divider--with-text').exists()).toBe(true)
    wrapper.unmount()
  })

  test('divider inset custom', () => {
    const wrapper = mount(VarDivider, {
      props: { inset: 36 },
    })
    const style = wrapper.get('.mp-divider').element.style
    expect(style.marginInlineStart).toBe('36px')
    expect(style.marginInlineEnd).toBe('36px')
    wrapper.unmount()
  })

  test('divider spacing preset', () => {
    const wrapper = mount(VarDivider, {
      props: { spacing: 'lg' },
    })
    expect(wrapper.find('.mp-divider--spacing-lg').exists()).toBe(true)
    wrapper.unmount()
  })

  test('divider description', () => {
    const wrapper = mount(VarDivider, {
      props: { description: 'This is description' },
    })
    expect(wrapper.find('.mp-divider__text').element.textContent).toBe('This is description')
    wrapper.unmount()
  })

  test('divider thickness and color', () => {
    const wrapper = mount(VarDivider, {
      props: { thickness: 3, color: '#ff0000' },
    })
    const style = wrapper.find('.mp-divider').attributes('style') || ''
    expect(style).toContain('--mp-divider-border-width')
    expect(style).toContain('--mp-divider-color')
    wrapper.unmount()
  })

  test('divider hairline', async () => {
    const wrapper = mount(VarDivider, {
      props: { hairline: true },
    })
    expect(wrapper.find('.mp-divider--hairline').exists()).toBe(true)
    await wrapper.setProps({ hairline: false })
    expect(wrapper.find('.mp-divider--hairline').exists()).toBe(false)
    wrapper.unmount()
  })

  test('divider default slot', () => {
    const wrapper = mount(VarDivider, {
      slots: { default: () => 'slot content' },
    })
    expect(wrapper.find('.mp-divider--with-text').exists()).toBe(true)
    expect(wrapper.text()).toContain('slot content')
    wrapper.unmount()
  })
})
