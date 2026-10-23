import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import SwipeCell from '..'
import Cell from '../../cell'
import BasicDemo from '../example/demos/basic.vue'
import VarSwipeCell from '../SwipeCell'

test('swipe-cell plugin', () => {
  const app = createApp({}).use(SwipeCell)
  expect(app.component(SwipeCell.name)).toBeTruthy()
})

describe('swipe-cell', () => {
  test('renders left and right slots', () => {
    const wrapper = mount(VarSwipeCell, {
      slots: {
        default: () => 'content',
        left: () => 'left-action',
        right: () => 'right-action',
      },
    })

    expect(wrapper.find('.mp-swipe-cell__left').text()).toBe('left-action')
    expect(wrapper.find('.mp-swipe-cell__right').text()).toBe('right-action')
    expect(wrapper.find('.mp-swipe-cell__content').text()).toBe('content')
    wrapper.unmount()
  })

  test('open and close methods', async () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(VarSwipeCell, {
      props: {
        rightWidth: 80,
        onOpen,
        onClose,
      },
      slots: {
        default: () => 'content',
        right: () => 'delete',
      },
    })

    await wrapper.vm.open('right')
    expect(wrapper.emitted('open')?.[0]?.[0]).toEqual({ name: '', position: 'right' })

    await wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
    wrapper.unmount()
  })

  test('disabled prevents open', async () => {
    const wrapper = mount(VarSwipeCell, {
      props: {
        disabled: true,
        rightWidth: 80,
      },
      slots: {
        default: () => 'content',
        right: () => 'delete',
      },
    })

    await wrapper.vm.open('right')
    expect(wrapper.emitted('open')).toBeFalsy()
    wrapper.unmount()
  })
})

test('basic demo displays the name returned by open and close events', async () => {
  const wrapper = mount(BasicDemo, {
    global: { components: { MpSwipeCell: SwipeCell, MpCell: Cell }, stubs: { MpButton: true } },
  })
  const cell = wrapper.findComponent(SwipeCell)
  const measure = vi
    .spyOn(cell.find('.mp-swipe-cell__right').element, 'getBoundingClientRect')
    .mockReturnValue({ width: 80 })
  await wrapper.vm.$nextTick()
  cell.vm.$.exposed.open('right')
  await wrapper.vm.$nextTick()
  expect(wrapper.find('[role="status"]').text()).toBe('open: name=order-1001, position=right')
  await cell.vm.$.exposed.close()
  await wrapper.vm.$nextTick()
  expect(wrapper.find('[role="status"]').text()).toBe('close: name=order-1001, position=outside')
  measure.mockRestore()
  wrapper.unmount()
})
