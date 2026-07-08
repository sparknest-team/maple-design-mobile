import { createApp, Fragment, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Breadcrumb from '..'
import VarBreadcrumbItem from '../../breadcrumb-item/BreadcrumbItem.vue'
import { delay } from '../../utils/test'
import VarBreadcrumb from '../Breadcrumb.vue'

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
  expect(wrapper.html()).toMatchSnapshot()
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
  expect(wrapper.html()).toMatchSnapshot()
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
  expect(wrapper.html()).toMatchSnapshot()
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
  expect(onClick).toHaveBeenCalledTimes(1)
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
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
