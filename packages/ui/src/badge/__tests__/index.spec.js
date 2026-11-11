import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from '..'
import VarBadge from '../Badge.vue'

test('badge plugin', () => {
  const app = createApp({}).use(Badge)
  expect(app.component(Badge.name)).toBeTruthy()
})

describe('test badge component props', () => {
  test('badge status', () => {
    ;['default', 'primary', 'info', 'success', 'warning', 'danger'].forEach((status) => {
      const wrapper = mount(VarBadge, {
        props: { status, content: 1 },
      })
      expect(wrapper.find('.mp-badge--status-' + status).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('badge variant', () => {
    ;['default', 'outline'].forEach((variant) => {
      const wrapper = mount(VarBadge, {
        props: { variant, content: 1 },
      })
      expect(wrapper.find('.mp-badge--variant-' + variant).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('badge size', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      const wrapper = mount(VarBadge, {
        props: { size, content: 1 },
      })
      expect(wrapper.find('.mp-badge--size-' + size).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('badge auto-dots when content is omitted', () => {
    const wrapper = mount(VarBadge, {
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge--dot').exists()).toBe(true)
    expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(true)
    wrapper.unmount()
  })

  test('badge dot', async () => {
    const wrapper = mount(VarBadge, {
      props: { content: 1, dot: true },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge--dot').exists()).toBe(true)
    expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(true)
    await wrapper.setProps({ dot: false })
    expect(wrapper.find('.mp-badge--dot').exists()).toBe(false)
    expect(wrapper.find('.mp-badge__content').text()).toBe('1')
    wrapper.unmount()
  })

  test('badge content', () => {
    const wrapper = mount(VarBadge, {
      props: { content: 10 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').text()).toBe('10')
    wrapper.unmount()
  })

  test('badge max', async () => {
    const wrapper = mount(VarBadge, {
      props: { max: 1, content: 2 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').text()).toBe('1+')
    await wrapper.setProps({ content: 1 })
    expect(wrapper.find('.mp-badge__content').text()).toBe('1')
    wrapper.unmount()
  })

  test('badge show', async () => {
    const wrapper = mount(VarBadge, {
      props: { show: false, content: 1 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').exists()).toBe(false)
    await wrapper.setProps({ show: true })
    expect(wrapper.find('.mp-badge__content').exists()).toBe(true)
    wrapper.unmount()
  })

  test('badge showZero', async () => {
    const wrapper = mount(VarBadge, {
      props: { content: 0 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').exists()).toBe(false)
    await wrapper.setProps({ showZero: true })
    expect(wrapper.find('.mp-badge__content').exists()).toBe(true)
    wrapper.unmount()
  })

  test('badge position', () => {
    ;['top-right', 'top-left', 'bottom-right', 'bottom-left'].forEach((position) => {
      const wrapper = mount(VarBadge, {
        props: { position, content: 1 },
        slots: { default: () => 'x' },
      })
      expect(wrapper.find('.mp-badge--position-' + position).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('badge mode=inline', () => {
    const wrapper = mount(VarBadge, {
      props: { mode: 'inline', description: 'hi', content: 1 },
    })
    expect(wrapper.find('.mp-badge--mode-inline').exists()).toBe(true)
    expect(wrapper.find('.mp-badge--inline-position-end').exists()).toBe(true)
    wrapper.unmount()
  })

  test('badge inline auto when no default and description', () => {
    const wrapper = mount(VarBadge, {
      props: { content: 1 },
    })
    expect(wrapper.find('.mp-badge--mode-inline').exists()).toBe(true)
    wrapper.unmount()
  })

  test('badge color', () => {
    const wrapper = mount(VarBadge, {
      props: { color: 'red', content: 1 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').attributes('style')).toContain('background-color: red')
    wrapper.unmount()
  })

  test('badge textColor', () => {
    const wrapper = mount(VarBadge, {
      props: { textColor: 'green', content: 1 },
      slots: { default: () => 'x' },
    })
    expect(wrapper.find('.mp-badge__content').attributes('style')).toContain('color: green')
    wrapper.unmount()
  })

  test('badge offsetX/offsetY', () => {
    const wrapper = mount(VarBadge, {
      props: { offsetX: 5, offsetY: 6, content: 1 },
      slots: { default: () => 'x' },
    })
    const style = wrapper.find('.mp-badge__content-wrapper').attributes('style') || ''
    expect(style).toContain('5px')
    expect(style).toContain('6px')
    wrapper.unmount()
  })

  test('badge description', () => {
    const wrapper = mount(VarBadge, {
      props: { description: 'desc', content: 1 },
    })
    expect(wrapper.find('.mp-badge__description-wrapper').text()).toBe('desc')
    wrapper.unmount()
  })
})

describe('test badge component slots', () => {
  test('badge default slot', () => {
    const wrapper = mount(VarBadge, {
      slots: { default: () => 'default slots' },
    })
    expect(wrapper.find('.mp-badge__description-wrapper').text()).toBe('default slots')
    wrapper.unmount()
  })

  test('badge content slot', () => {
    const wrapper = mount(VarBadge, {
      slots: {
        default: () => 'x',
        content: () => 'C',
      },
    })
    expect(wrapper.find('.mp-badge__custom-dot').text()).toBe('C')
    wrapper.unmount()
  })
})
