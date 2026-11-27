import { createApp } from 'vue'
import { enableAutoUnmount, mount as mountComponent } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Picker from '..'
import { trigger } from '../../utils/test'
import VarPicker from '../Picker'
import { setRenderedTranslations } from './rendered-translation'

enableAutoUnmount(afterEach)
beforeEach(() => vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance'] }))
afterEach(() => {
  document.body.innerHTML = ''
  vi.useRealTimers()
})

function mount(component, options) {
  return mountComponent(component, { attachTo: document.body, ...options })
}

test('empty columns produce an empty value without throwing', () => {
  const wrapper = mount(VarPicker, { props: { columns: [[]] } })
  expect(() => wrapper.vm.confirm()).not.toThrow()
  expect(wrapper.emitted('confirm')).toBeUndefined()
})

test('picker component plugin', () => {
  const app = createApp({}).use(Picker.Component)
  expect(app.component(Picker.Component.name)).toBeTruthy()
})

const columns = [[{ text: 'A' }, { text: 'B' }, { text: 'C' }]]

const triggerDrag = async (element, x, y) => {
  setRenderedTranslations(element)
  await trigger(element, 'touchstart', 0, 0)
  await trigger(element, 'touchmove', x / 4, y / 4)
  await trigger(element, 'touchmove', x / 3, y / 3)
  await trigger(element, 'touchmove', x / 2, y / 2)
  await trigger(element, 'touchmove', x, y)
  // Release one millisecond past the 300 ms momentum sampling window.
  await vi.advanceTimersByTimeAsync(301)
  await trigger(element, 'touchend', x, y)
}

test('scroll up & onConfirm', async () => {
  const onConfirm = vi.fn()

  const wrapper = mount(VarPicker, {
    props: {
      columns,
      onConfirm,
    },
  })
  expect(wrapper.html()).toMatchSnapshot()
  const { element } = wrapper.find('.mp-picker__column')

  await triggerDrag(element, 0, -600)
  expect(wrapper.html()).toMatchSnapshot()

  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__confirm-button').trigger('click')
  expect(onConfirm).lastCalledWith(['C'], [2], [{ text: 'C' }])
})

test('click option & onConfirm', async () => {
  const onConfirm = vi.fn()

  const wrapper = mount(VarPicker, {
    props: {
      columns,
      onConfirm,
    },
  })

  const options = wrapper.findAll('.mp-picker__option')
  await options[1].trigger('click')
  await vi.advanceTimersByTimeAsync(300)

  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__confirm-button').trigger('click')
  expect(onConfirm).toHaveBeenLastCalledWith(['B'], [1], [{ text: 'B' }])
})

test('scroll down & onCancel', async () => {
  const onCancel = vi.fn()

  const wrapper = mount(VarPicker, {
    props: {
      columns,
      onCancel,
    },
  })
  expect(wrapper.html()).toMatchSnapshot()
  const { element } = wrapper.find('.mp-picker__column')

  await triggerDrag(element, 0, 600)
  expect(wrapper.html()).toMatchSnapshot()

  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__cancel-button').trigger('click')
  expect(onCancel).lastCalledWith(['A'], [0], [{ text: 'A' }])
})

test('cascade mode', async () => {
  const onConfirm = vi.fn()

  const wrapper = mount(VarPicker, {
    props: {
      cascade: true,
      columns: [
        {
          text: '成都市',
          children: [
            {
              text: '温江区',
            },
            {
              text: '金牛区',
            },
          ],
        },
        {
          text: '无锡市',
          children: [
            {
              text: '新吴区',
            },
            {
              text: '惠山区',
            },
          ],
        },
      ],
      onConfirm,
    },
  })

  let columns = wrapper.findAll('.mp-picker__column')
  expect(wrapper.html()).toMatchSnapshot()
  expect(columns.length).toBe(2)

  const confirmButton = wrapper.find('.mp-picker__confirm-button')

  await triggerDrag(columns[0].element, 0, -44)
  setRenderedTranslations(wrapper.element)
  await confirmButton.trigger('click')
  expect(onConfirm).lastCalledWith(
    ['无锡市', '新吴区'],
    [1, 0],
    [
      {
        text: '无锡市',
        children: [
          {
            text: '新吴区',
          },
          {
            text: '惠山区',
          },
        ],
      },
      { text: '新吴区' },
    ],
  )

  // find elements again for rebuild children
  columns = wrapper.findAll('.mp-picker__column')
  await triggerDrag(columns[1].element, 0, -44)
  setRenderedTranslations(wrapper.element)
  await confirmButton.trigger('click')
  expect(onConfirm).lastCalledWith(
    ['无锡市', '惠山区'],
    [1, 1],
    [
      {
        text: '无锡市',
        children: [
          {
            text: '新吴区',
          },
          {
            text: '惠山区',
          },
        ],
      },
      { text: '惠山区' },
    ],
  )
})

test('custom key', async () => {
  const onConfirm = vi.fn()
  const wrapper = mount(VarPicker, {
    props: {
      columns: [
        {
          id: 1,
          label: '无锡市',
          next: [
            {
              id: 10,
              label: '新吴区',
            },
            {
              id: 11,
              label: '惠山区',
            },
          ],
        },
      ],
      fieldNames: { label: 'label', value: 'id', children: 'next' },
      cascade: true,
      onConfirm,
    },
  })
  const columns = wrapper.findAll('.mp-picker__column')
  expect(wrapper.html()).toMatchSnapshot()
  await triggerDrag(columns[0].element, 0, -44)
  expect(wrapper.html()).toMatchSnapshot()

  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__confirm-button').trigger('click')
  expect(onConfirm).lastCalledWith(
    [1, 10],
    [0, 0],
    [
      {
        id: 1,
        label: '无锡市',
        next: [
          {
            id: 10,
            label: '新吴区',
          },
          {
            id: 11,
            label: '惠山区',
          },
        ],
      },
      {
        id: 10,
        label: '新吴区',
      },
    ],
  )
})

test('multiple column picker columnsCount', async () => {
  const onConfirm = vi.fn()
  const wrapper = mount(VarPicker, {
    props: {
      columns: [
        [
          { text: 'A', value: '1-1' },
          { text: 'B', value: '1-2' },
          { text: 'C', value: '1-3' },
        ],
        [
          { text: 'A', value: '2-1' },
          { text: 'B', value: '2-2' },
          { text: 'C', value: '2-3' },
        ],
        [
          { text: 'A', value: '3-1' },
          { text: 'B', value: '3-2' },
          { text: 'C', value: '3-3' },
        ],
      ],
      columnsCount: 2,
      onConfirm,
    },
  })
  const columns = wrapper.findAll('.mp-picker__column')
  expect(wrapper.html()).toMatchSnapshot()
  expect(columns.length).toBe(2)

  await triggerDrag(columns[1].element, 0, -44)
  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__confirm-button').trigger('click')
  expect(onConfirm).lastCalledWith(
    ['1-1', '2-2'],
    [0, 1],
    [
      {
        text: 'A',
        value: '1-1',
      },
      {
        text: 'B',
        value: '2-2',
      },
    ],
  )
})

test('cascade column picker columnsCount', async () => {
  const onConfirm = vi.fn()
  const wrapper = mount(VarPicker, {
    props: {
      columns: [
        {
          text: '四川省',
          children: [
            {
              text: '成都市',
              children: [
                {
                  text: '温江区',
                },
              ],
            },
            {
              text: '攀枝花市',
              children: [
                {
                  text: '东区',
                },
              ],
            },
          ],
        },
        {
          text: '江苏省',
          children: [
            {
              text: '无锡市',
              children: [
                {
                  text: '新吴区',
                },
              ],
            },
          ],
        },
      ],
      cascade: true,
      columnsCount: 2,
      onConfirm,
    },
  })
  const columns = wrapper.findAll('.mp-picker__column')
  expect(wrapper.html()).toMatchSnapshot()
  expect(columns.length).toBe(2)

  await triggerDrag(columns[1].element, 0, -44)
  setRenderedTranslations(wrapper.element)
  await wrapper.find('.mp-picker__confirm-button').trigger('click')
  expect(onConfirm).lastCalledWith(
    ['四川省', '攀枝花市'],
    [0, 1],
    [
      {
        text: '四川省',
        children: [
          {
            text: '成都市',
            children: [
              {
                text: '温江区',
              },
            ],
          },
          {
            text: '攀枝花市',
            children: [
              {
                text: '东区',
              },
            ],
          },
        ],
      },
      {
        text: '攀枝花市',
        children: [
          {
            text: '东区',
          },
        ],
      },
    ],
  )
})

test('column option className', () => {
  const wrapper = mount(VarPicker, {
    props: {
      columns: [
        [
          {
            text: 'A',
            className: 'a',
            textClassName: 'b',
          },
          {
            text: 'B',
          },
        ],
      ],
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
})
