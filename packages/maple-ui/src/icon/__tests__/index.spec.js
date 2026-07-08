import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Icon from '..'
import { delay } from '../../utils/test'
import MpIcon from '../Icon'

test('icon plugin', () => {
  const app = createApp({}).use(Icon)
  expect(app.component(Icon.name)).toBeTruthy()
})

test('icon onClick', () => {
  const onClick = vi.fn()
  const wrapper = mount(MpIcon, {
    props: {
      onClick,
    },
  })

  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

describe('test icon component props', () => {
  test('icon name', () => {
    const wrapper = mount(MpIcon, {
      props: {
        name: 'checkbox-marked-circle',
      },
    })

    expect(wrapper.find('.mp-icon').classes()).toContain('mp-icon-checkbox-marked-circle')
    wrapper.unmount()
  })

  test('icon size', async () => {
    const wrapper = mount(MpIcon, {
      props: {
        size: '20px',
      },
    })

    expect(wrapper.find('.mp-icon').attributes('style')).toContain('font-size: 20px;')
    await wrapper.setProps({ size: 30 })
    expect(wrapper.find('.mp-icon').attributes('style')).toContain('font-size: 30px;')
    wrapper.unmount()
  })

  test('icon color', () => {
    const wrapper = mount(MpIcon, {
      props: {
        color: 'red',
      },
    })

    expect(wrapper.find('.mp-icon').attributes('style')).toContain('color: red;')
    wrapper.unmount()
  })

  test('icon namespace', () => {
    const wrapper = mount(MpIcon, {
      props: {
        namespace: 'my-icons',
      },
    })

    expect(wrapper.find('.mp-icon').classes()).toContain('my-icons-undefined')
    wrapper.unmount()
  })

  test('icon transition', async () => {
    const wrapper = mount(MpIcon, {
      props: {
        transition: 0,
        name: 'check',
      },
    })

    expect(wrapper.find('.mp-icon-check').exists()).toBeTruthy()
    expect(wrapper.element.style['transition-duration']).toEqual('0ms')

    await wrapper.setProps({
      transition: 300,
      name: 'error',
    })

    await delay(150)
    expect(wrapper.find('i').classes()).toContain('mp-icon--shrinking')
    await delay(400)

    expect(wrapper.find('.mp-icon-error').exists()).toBeTruthy()
    expect(wrapper.element.style['transition-duration']).toEqual('300ms')

    await wrapper.setProps({
      animationClass: 'fade',
      transition: 300,
      name: 'check',
    })

    await delay(150)
    expect(wrapper.find('i').classes()).toContain('fade')
    await delay(400)

    expect(wrapper.find('.mp-icon-check').exists()).toBeTruthy()
    expect(wrapper.element.style['transition-duration']).toEqual('300ms')

    wrapper.unmount()
  })
})
