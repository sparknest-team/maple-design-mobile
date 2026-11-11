import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import List from '..'
import _List from '../List.vue'
import ListItem from '../ListItem.vue'

test('installs List and ListItem together', () => {
  const app = createApp({}).use(List)
  expect(app.component(List.name)).toBeTruthy()
  expect(app.component(ListItem.name)).toBeTruthy()
})

test('default slot takes priority over data and item slot', () => {
  const item = vi.fn(({ item }) => item)
  const wrapper = mount(_List, {
    props: { data: ['data item'] },
    slots: {
      default: 'default item',
      item,
    },
  })

  expect(wrapper.text()).toContain('default item')
  expect(wrapper.text()).not.toContain('data item')
  expect(item).not.toHaveBeenCalled()
})

test('renders data, header and footer in order', () => {
  const wrapper = mount(_List, {
    props: { data: ['a', 'b'] },
    slots: {
      header: 'header',
      item: ({ item, index }) => `${index}:${item}`,
      footer: 'footer',
    },
  })

  expect(wrapper.text()).toBe('header0:a1:bfooter')
})

test('shows empty only when an empty list is not loading', async () => {
  const wrapper = mount(_List, {
    props: { data: [], loading: true },
    slots: { empty: 'empty' },
  })

  expect(wrapper.find('.mp-list__loading').exists()).toBe(true)
  expect(wrapper.text()).not.toContain('empty')

  await wrapper.setProps({ loading: false })
  expect(wrapper.find('.mp-list__loading').attributes('aria-busy')).toBeUndefined()
  expect(wrapper.text()).toContain('empty')
})

test('applies size, border and split classes', () => {
  const wrapper = mount(_List, {
    props: { size: 'lg', bordered: true, split: true },
  })

  expect(wrapper.classes()).toEqual(expect.arrayContaining(['mp-list--lg', 'mp-list--bordered', 'mp-list--split']))
})

test('uses aligned defaults and list semantics', () => {
  const wrapper = mount(_List)

  expect(wrapper.props()).toMatchObject({
    size: 'md',
    bordered: true,
    split: true,
    loading: false,
  })
  expect(wrapper.classes()).toEqual(expect.arrayContaining(['mp-list--md', 'mp-list--bordered', 'mp-list--split']))
  expect(wrapper.find('.mp-list__content').attributes('role')).toBe('list')
})

describe('ListItem slots', () => {
  test('renders prefix, default and suffix in semantic order', () => {
    const wrapper = mount(ListItem, {
      slots: {
        prefix: 'prefix',
        default: 'content',
        suffix: 'suffix',
      },
    })

    expect(wrapper.text()).toBe('prefixcontentsuffix')
    expect(wrapper.attributes('role')).toBe('listitem')
  })

  test('omits unused prefix and suffix regions', () => {
    const wrapper = mount(ListItem, { slots: { default: 'content' } })
    expect(wrapper.find('.mp-list-item__prefix').exists()).toBe(false)
    expect(wrapper.find('.mp-list-item__suffix').exists()).toBe(false)
  })
})
