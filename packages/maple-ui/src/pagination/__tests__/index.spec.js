import { createApp, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Pagination from '..'
import { delay } from '../../utils/test'
import VarPagination from '../Pagination'

test('pagination plugin', () => {
  const app = createApp({}).use(Pagination)
  expect(app.component(Pagination.name)).toBeTruthy()
})

describe('simple mode', () => {
  test('mount', () => {
    const wrapper = mount(VarPagination, {
      props: {
        total: '123',
        showTotal: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('disabled prop', () => {
    const wrapper = mount(VarPagination, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

describe('basic mode', () => {
  test('mount', () => {
    const wrapper = mount(VarPagination, {
      props: {
        total: '123',
        simple: false,
        showJumper: true,
        showTotal: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('disabled prop', () => {
    const wrapper = mount(VarPagination, {
      props: {
        disabled: true,
        simple: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('click ellipsis', async () => {
    const change = vi.fn()
    const current = ref(10)
    const wrapper = mount({
      components: {
        [VarPagination.name]: VarPagination,
      },
      setup() {
        return {
          current,
          change,
        }
      },
      template: `
        <mp-pagination
          v-model:current="current"
          :page-size="20"
          total="325"
          :buffer-size="2"
          :simple="false"
          @change="change"
        />
      `,
    })

    await delay(0)

    const ellipsisItems = wrapper.findAll('.mp-pagination__item-ellipsis')
    expect(wrapper.find('.mp-pagination__item--active').text()).toBe('10')

    await ellipsisItems[1].trigger('click')
    expect(wrapper.find('.mp-pagination__item--active').text()).toBe('15')

    await ellipsisItems[0].trigger('click')
    expect(wrapper.find('.mp-pagination__item--active').text()).toBe('10')

    expect(change).toBeCalledTimes(2)
    wrapper.unmount()
  })
})

test('page size related props', async () => {
  const template = `<mp-pagination total="115" :page-size="20" :show-page-size="showPageSize" :page-size-options="pageSizeOptions" :simple="false"/>`

  const wrapper = mount({
    components: {
      [VarPagination.name]: VarPagination,
    },
    data() {
      return {
        showPageSize: true,
        pageSizeOptions: [10, 20, 30, 40],
      }
    },
    template,
  })

  await delay(0)

  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ showPageSize: false })

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('change current and pageSize', async () => {
  const wrapper = mount(VarPagination, {
    props: {
      current: 4,
      pageSize: 10,
      total: 300,
      showPageSize: true,
    },
  })

  const input = wrapper.find('.mp-input__input')
  const sizeEl = wrapper.find('.mp-pagination__size--open')

  expect(input.element.value).toBe('4')
  expect(sizeEl.text().includes('10')).toBe(true)

  await wrapper.setProps({
    current: 5,
    pageSize: 20,
  })

  expect(input.element.value).toBe('5')
  expect(sizeEl.text().includes('20')).toBe(true)

  wrapper.unmount()
})

test('change event', async () => {
  const change = vi.fn()
  const current = ref(2)
  const wrapper = mount({
    components: {
      [VarPagination.name]: VarPagination,
    },
    setup() {
      return {
        current,
        change,
      }
    },
    template: `<mp-pagination v-model:current="current" :page-size="20" total="325" @change="change" />`,
  })

  await delay(0)

  const items = wrapper.findAll('.mp-pagination__item')
  const input = wrapper.find('.mp-input__input')

  await input.trigger('blur')
  expect(input.element.value).toBe('2')

  await items[0].trigger('click')
  expect(input.element.value).toBe('1')

  await items[1].trigger('click')
  expect(input.element.value).toBe('2')
  expect(change).toBeCalledTimes(2)

  wrapper.unmount()
})
