import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Result from '..'
import VarResult from '../Result'

test('result plugin', () => {
  const app = createApp({}).use(Result)
  expect(app.component(Result.name)).toBeTruthy()
})

test('result snapshot', () => {
  const wrapper = mount(Result)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

describe('test result component props', () => {
  test('result status', () => {
    ;['info', 'success', 'warning', 'danger', 'question', 'empty', '403', '404', '500'].forEach((status) => {
      const wrapper = mount(VarResult, {
        props: { status },
      })

      expect(wrapper.find('.mp-result__image').classes()).toContain('mp-result__' + status)
      expect(wrapper.find('.mp-result__image').element.children.length).toBeGreaterThan(0)
      if (['403', '404', '500'].includes(status)) {
        expect(wrapper.find('svg').exists()).toBe(true)
      }
      wrapper.unmount()
    })
  })

  test('result imageSize', () => {
    const wrapper = mount(VarResult, {
      props: {
        status: 'empty',
        imageSize: '100px',
      },
    })

    expect(wrapper.find('.mp-result__empty').attributes('style')).toContain('width: calc(90px)')
    expect(wrapper.find('.mp-result__empty').attributes('style')).toContain('height: calc(90px)')

    wrapper.unmount()
  })

  test('result title', () => {
    const wrapper = mount(VarResult, {
      props: { title: 'This is title' },
    })

    expect(wrapper.find('.mp-result__title').element.textContent).toBe('This is title')
    wrapper.unmount()
  })

  test('result subtitle', () => {
    const wrapper = mount(VarResult, {
      props: { subtitle: 'This is description' },
    })

    expect(wrapper.find('.mp-result__subtitle').element.textContent).toBe('This is description')
    wrapper.unmount()
  })
})
