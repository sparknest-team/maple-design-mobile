import { createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import DropdownMenu from '../../dropdown-menu'
import { Breadcrumb, BreadcrumbItem } from '../index'

const routes = ['Home', 'A', 'B', 'C', 'End'].map((label, index) => ({ label, path: `/${index}` }))
const item = (label, props = {}, slots = {}) =>
  h(BreadcrumbItem, { key: label, ...props }, { default: () => label, ...slots })

describe('Breadcrumb same source', () => {
  test('empty routes fall back to fragment children and update after removal', async () => {
    const labels = ref(['A', 'B', 'C'])
    const wrapper = mount(Breadcrumb, {
      props: { routes: [] },
      slots: {
        default: () =>
          h(
            Fragment,
            labels.value.map((label) => item(label)),
          ),
      },
    })
    expect(wrapper.findAll('.mp-breadcrumb-item__separator')).toHaveLength(2)
    labels.value = ['C', 'A']
    await nextTick()
    expect(wrapper.findAll('.mp-breadcrumb-item').map((node) => node.text())).toEqual(['C', 'A'])
    expect(wrapper.findAll('.mp-breadcrumb-item__separator')).toHaveLength(1)
    expect(wrapper.find('[aria-current="page"]').text()).toBe('A')
    wrapper.unmount()
  })

  test('updates collapse and never opens a hidden item dropdown', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Breadcrumb, {
      props: { routes: routes.map((route) => ({ ...route, children: [routes[0]] })), maxCount: 2 },
      slots: { 'more-icon': (data) => h('b', { 'data-count': data.count }, 'more') },
    })
    const more = wrapper.find('[aria-label="ellipses of breadcrumb items"]')
    expect(more.find('.mp-breadcrumb-item__dropdown-icon').exists()).toBe(false)
    expect(more.attributes('href')).toBeUndefined()
    expect(more.find('b').attributes('data-count')).toBe('3')
    await wrapper.setProps({ maxCount: 0 })
    expect(wrapper.findAll('.mp-breadcrumb-item')).toHaveLength(5)
    wrapper.unmount()
    const single = mount(BreadcrumbItem, { props: { href: '#home', onClick } })
    await single.find('a').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    single.unmount()
  })

  test('separator precedence preserves zero and reacts to parent slot changes', async () => {
    const separator = ref('>')
    const wrapper = mount(Breadcrumb, {
      props: { separator: '/' },
      slots: {
        default: () => [item('A', { separator: 0 }), item('B', {}, { separator: () => '!' }), item('C'), item('D')],
        separator: () => separator.value,
      },
    })
    expect(wrapper.findAll('.mp-breadcrumb-item__separator').map((node) => node.text())).toEqual(['0', '!', '>'])
    separator.value = ':'
    await nextTick()
    expect(wrapper.findAll('.mp-breadcrumb-item__separator').map((node) => node.text())).toEqual(['0', '!', ':'])
    wrapper.unmount()
  })

  test('item-render owns links and receives independent path arrays', () => {
    const paths = []
    const wrapper = mount(Breadcrumb, {
      props: { routes },
      slots: {
        'item-render': (data) => {
          paths.push(data.paths)
          return h('a', { href: '#custom' }, data.route.label)
        },
      },
    })
    expect(wrapper.findAll('a')).toHaveLength(5)
    expect(wrapper.findAll('a a')).toHaveLength(0)
    expect(paths[0]).toEqual(['0'])
    expect(paths[4]).toEqual(['0', '1', '2', '3', '4'])
    wrapper.unmount()
  })

  test('dropdown emits the selected route and original event', () => {
    const wrapper = mount(BreadcrumbItem, { props: { droplist: routes } })
    const menu = wrapper.findComponent(DropdownMenu)
    const event = new MouseEvent('click')
    menu.vm.$emit('select', '/1', {}, event)
    expect(wrapper.emitted('select')).toEqual([[routes[1], event]])
    wrapper.unmount()
  })

  test('empty droplist has no dropdown and attrs reach the native link', () => {
    const wrapper = mount(BreadcrumbItem, {
      props: { href: '/home', droplist: [] },
      attrs: { target: '_blank', class: 'custom', title: 'Home' },
    })
    expect(wrapper.find('.mp-breadcrumb-item--with-dropdown').exists()).toBe(false)
    expect(wrapper.find('a.custom').attributes('target')).toBe('_blank')
    wrapper.unmount()
  })

  test('SSR includes separators, current page and collapsed slot items', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(Breadcrumb, { maxCount: 2 }, { default: () => routes.map((route) => item(route.label)) }),
      }),
    )
    expect(html.match(/class="mp-breadcrumb-item"/g) ?? []).length(3)
    expect(html.match(/class="mp-breadcrumb-item__separator"/g) ?? []).length(2)
    expect(html).toContain('aria-current="page"')
    expect(html).not.toContain('[object Object]')
  })

  test('instances keep separator and collapse state independent', () => {
    const wrapper = mount({
      render: () =>
        h('div', [h(Breadcrumb, { routes, maxCount: 2, separator: '>' }), h(Breadcrumb, { routes, separator: ':' })]),
    })
    const groups = wrapper.findAllComponents(Breadcrumb)
    expect(groups[0].findAll('.mp-breadcrumb-item')).toHaveLength(3)
    expect(groups[1].findAll('.mp-breadcrumb-item')).toHaveLength(5)
    expect(groups[1].find('.mp-breadcrumb-item__separator').text()).toBe(':')
    wrapper.unmount()
  })
})
