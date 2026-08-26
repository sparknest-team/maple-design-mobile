import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import SwipeCell from '..'
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
