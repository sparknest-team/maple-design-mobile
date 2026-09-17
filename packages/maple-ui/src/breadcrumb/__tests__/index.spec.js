import { createApp, Fragment, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Breadcrumb from '..'
import { delay } from '../../utils/test'
import VarBreadcrumb from '../Breadcrumb.vue'
import VarBreadcrumbItem from '../BreadcrumbItem.vue'

function renderBasicUsage(props) {
  return h(
    Fragment,
    ['HOME', 'LINK 1', 'LINK 2'].map((text) =>
      h(VarBreadcrumbItem, props, {
        default: () => text,
      }),
    ),
  )
}

test('breadcrumb plugin', () => {
  const app = createApp({}).use(Breadcrumb)
  expect(app.component(Breadcrumb.name)).toBeTruthy()
})

test('breadcrumb basic usage', async () => {
  const wrapper = mount(VarBreadcrumb, {
    slots: {
      default: () => renderBasicUsage(),
    },
  })

  await delay(0)
  expect(wrapper.findAll('.mp-breadcrumb-item')).toHaveLength(3)
  expect(wrapper.findAll('.mp-breadcrumb-item__separator')).toHaveLength(2)
  wrapper.unmount()
})

test('breadcrumb parent separator', async () => {
  const wrapper = mount(VarBreadcrumb, {
    props: {
      separator: '+',
    },
    slots: {
      default: () => renderBasicUsage(),
    },
  })

  await delay(0)
  expect(wrapper.findAll('.mp-breadcrumb-item__separator').map((item) => item.text())).toEqual(['+', '+'])
  wrapper.unmount()
})

test('breadcrumb parent and child separator', async () => {
  const wrapper = mount(VarBreadcrumb, {
    props: {
      separator: '+',
    },
    slots: {
      default: () => renderBasicUsage({ separator: '-' }),
    },
  })

  await delay(0)
  expect(wrapper.findAll('.mp-breadcrumb-item__separator').map((item) => item.text())).toEqual(['-', '-'])
  wrapper.unmount()
})

test('breadcrumb parent separator slot', async () => {
  const wrapper = mount(VarBreadcrumb, {
    slots: {
      default: () => renderBasicUsage(),
      separator: () => h('span', { class: 'custom-sep' }, '>'),
    },
  })

  await delay(0)
  expect(wrapper.findAll('.custom-sep').length).toBe(2)
  wrapper.unmount()
})

test('breadcrumb events', async () => {
  const onClick = vi.fn()

  const wrapper = mount(VarBreadcrumb, {
    props: {
      separator: '+',
    },
    slots: {
      default: () => renderBasicUsage({ onClick }),
    },
  })

  await delay(0)
  await wrapper.findAll('.mp-breadcrumb-item__content')[0].trigger('click')
  await wrapper.findAll('.mp-breadcrumb-item__content')[2].trigger('click')
  expect(onClick).toHaveBeenCalledTimes(2)
  wrapper.unmount()
})

test('breadcrumb slots', async () => {
  const wrapper = mount(VarBreadcrumb, {
    slots: {
      default: () =>
        h(
          Fragment,
          ['HOME', 'LINK 1', 'LINK 2'].map((text) =>
            h(VarBreadcrumbItem, null, {
              default: () => text,
              separator: () => h('span', '*'),
            }),
          ),
        ),
    },
  })

  await delay(0)
  expect(wrapper.findAll('span')).toHaveLength(2)
  wrapper.unmount()
})

test('breadcrumb routes', async () => {
  const wrapper = mount(VarBreadcrumb, {
    props: {
      routes: [
        { path: '/', label: 'Home' },
        { path: '/a', label: 'A' },
        { path: '/b', label: 'B' },
      ],
    },
  })

  await delay(0)
  const items = wrapper.findAll('.mp-breadcrumb-item')
  expect(items.length).toBe(3)
  expect(wrapper.find('a').attributes('href')).toBe('/')
  expect(wrapper.findAll('a').length).toBe(2)
  wrapper.unmount()
})

test('breadcrumb max-count', async () => {
  let moreSlotData
  const wrapper = mount(VarBreadcrumb, {
    props: {
      maxCount: 3,
    },
    slots: {
      default: () =>
        h(
          Fragment,
          ['A', 'B', 'C', 'D', 'E', 'F'].map((text) =>
            h(VarBreadcrumbItem, null, {
              default: () => text,
            }),
          ),
        ),
      'more-icon': (data) => {
        moreSlotData = data
        return h('span', { class: 'custom-more' })
      },
    },
  })

  await delay(0)
  expect(wrapper.findAll('.mp-breadcrumb-item').length).toBe(4)
  expect(wrapper.find('[aria-label="ellipses of breadcrumb items"]').exists()).toBe(true)
  expect(wrapper.find('.custom-more').exists()).toBe(true)
  expect(moreSlotData).toMatchObject({ count: 3, start: 1, end: 3, omittedItems: [] })
  wrapper.unmount()
})

test('breadcrumb item href', async () => {
  const wrapper = mount(VarBreadcrumb, {
    slots: {
      default: () =>
        h(Fragment, [
          h(VarBreadcrumbItem, { href: '#/home' }, { default: () => 'Home' }),
          h(VarBreadcrumbItem, { href: '#/list' }, { default: () => 'List' }),
          h(VarBreadcrumbItem, null, { default: () => 'Detail' }),
        ]),
    },
  })

  await delay(0)
  const links = wrapper.findAll('a.mp-breadcrumb-item__content')
  expect(links.length).toBe(2)
  expect(links[0].attributes('href')).toBe('#/home')
  expect(wrapper.findAll('.mp-breadcrumb-item__content')[2].element.tagName).toBe('DIV')
  wrapper.unmount()
})

test('breadcrumb route children render a dropdown trigger', async () => {
  const wrapper = mount(VarBreadcrumb, {
    props: {
      routes: [
        { path: '/', label: 'Home' },
        {
          path: '/channel',
          label: 'Channel',
          children: [{ path: '/goods', label: 'Goods' }],
        },
        { path: '/news', label: 'News' },
      ],
    },
  })

  await delay(0)
  expect(wrapper.find('.mp-breadcrumb-item--with-dropdown').exists()).toBe(true)
  expect(wrapper.find('.mp-breadcrumb-item__dropdown-icon').exists()).toBe(true)
  wrapper.unmount()
})
