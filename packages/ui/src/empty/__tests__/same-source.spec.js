import { createSSRApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Empty from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('empty')

describe('Empty same source', () => {
  test('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Empty, { description: 'No data' }) }))
    expect(html).toContain(n())
    expect(html).toContain(n('image'))
    expect(html).toContain(n('image--md'))
    expect(html).toContain(n('description'))
    expect(html).toContain('No data')
  })

  test('default locale description', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.' + n('description')).text()).toBe('暂无数据')
    wrapper.unmount()
  })

  test('description prop and default slot', () => {
    const prop = mount(Empty, { props: { description: 'No data' } })
    expect(prop.find('.' + n('description')).text()).toBe('No data')
    const slotted = mount(Empty, { slots: { default: () => 'Custom copy' } })
    expect(slotted.find('.' + n('description')).text()).toBe('Custom copy')
    prop.unmount()
    slotted.unmount()
  })

  test('imageUrl and alt', () => {
    const wrapper = mount(Empty, {
      props: { imageUrl: 'https://cdn.example.com/empty.svg', alt: 'empty' },
    })
    expect(wrapper.find('img').attributes('src')).toBe('https://cdn.example.com/empty.svg')
    expect(wrapper.find('img').attributes('alt')).toBe('empty')
    wrapper.unmount()
  })

  test('named and custom image sizes', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      const wrapper = mount(Empty, { props: { imageSize: size } })
      expect(wrapper.find('.' + n(`image--${size}`)).exists()).toBe(true)
      wrapper.unmount()
    })
    const custom = mount(Empty, { props: { imageSize: 48 } })
    expect(custom.find('.' + n('image')).attributes('style')).toContain('48px')
    custom.unmount()
  })

  test('showIcon and showDescription', () => {
    const hideIcon = mount(Empty, { props: { showIcon: false } })
    expect(hideIcon.find('.' + n('image')).exists()).toBe(false)
    const hideDescription = mount(Empty, { props: { showDescription: false } })
    expect(hideDescription.find('.' + n('description')).exists()).toBe(false)
    hideIcon.unmount()
    hideDescription.unmount()
  })

  test('image and extra slots', () => {
    const image = mount(Empty, { slots: { image: () => 'icon' } })
    expect(image.find('.' + n('image')).text()).toBe('icon')
    expect(image.find('svg').exists()).toBe(false)
    const extra = mount(Empty, { slots: { extra: () => 'reload' } })
    expect(extra.find('.' + n('extra')).text()).toBe('reload')
    image.unmount()
    extra.unmount()
  })

  test('click', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Empty, { props: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
