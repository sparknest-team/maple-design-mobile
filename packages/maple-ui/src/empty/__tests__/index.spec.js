import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Empty from '..'
import MpEmpty from '../Empty.vue'

test('empty plugin', () => {
  const app = createApp({}).use(Empty)
  expect(app.component(Empty.name)).toBeTruthy()
})

describe('empty', () => {
  test('default description from locale', () => {
    const wrapper = mount(MpEmpty)
    expect(wrapper.find('.mp-empty__description').text()).toBe('暂无数据')
    wrapper.unmount()
  })

  test('description prop', () => {
    const wrapper = mount(MpEmpty, { props: { description: 'No data' } })
    expect(wrapper.find('.mp-empty__description').text()).toBe('No data')
    wrapper.unmount()
  })

  test('default slot overrides description', () => {
    const wrapper = mount(MpEmpty, {
      slots: { default: () => 'Custom copy' },
    })
    expect(wrapper.find('.mp-empty__description').text()).toBe('Custom copy')
    wrapper.unmount()
  })

  test('imageUrl and alt', () => {
    const wrapper = mount(MpEmpty, {
      props: {
        imageUrl: 'https://cdn.example.com/empty.svg',
        alt: 'empty',
      },
    })
    expect(wrapper.find('img').attributes('src')).toBe('https://cdn.example.com/empty.svg')
    expect(wrapper.find('img').attributes('alt')).toBe('empty')
    wrapper.unmount()
  })

  test('image size class', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      const wrapper = mount(MpEmpty, { props: { imageSize: size } })
      expect(wrapper.find(`.mp-empty__image--${size}`).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('custom image size', () => {
    const wrapper = mount(MpEmpty, { props: { imageSize: 48 } })
    expect(wrapper.find('.mp-empty__image').attributes('style')).toContain('48px')
    wrapper.unmount()
  })

  test('showIcon false', () => {
    const wrapper = mount(MpEmpty, { props: { showIcon: false } })
    expect(wrapper.find('.mp-empty__image').exists()).toBe(false)
    wrapper.unmount()
  })

  test('showDescription false', () => {
    const wrapper = mount(MpEmpty, { props: { showDescription: false } })
    expect(wrapper.find('.mp-empty__description').exists()).toBe(false)
    wrapper.unmount()
  })

  test('image slot', () => {
    const wrapper = mount(MpEmpty, {
      slots: { image: () => 'icon' },
    })
    expect(wrapper.find('.mp-empty__image').text()).toBe('icon')
    expect(wrapper.find('svg').exists()).toBe(false)
    wrapper.unmount()
  })

  test('extra slot', () => {
    const wrapper = mount(MpEmpty, {
      slots: { extra: () => 'reload' },
    })
    expect(wrapper.find('.mp-empty__extra').text()).toBe('reload')
    wrapper.unmount()
  })

  test('click', async () => {
    const onClick = vi.fn()
    const wrapper = mount(MpEmpty, { props: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
