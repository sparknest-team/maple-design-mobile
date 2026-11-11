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

    expect(wrapper.find('.mp-result__empty').attributes('style')).toContain('--mp-result-image-size: 100px')

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

  test('result animation and custom icon slot', () => {
    const staticResult = mount(VarResult, { props: { animation: false } })
    expect(staticResult.get('.mp-result__image').classes()).not.toContain('mp-result--animated')

    const custom = mount(VarResult, {
      props: { imageSize: '6rem' },
      slots: { icon: ({ size }) => `custom ${size}` },
    })
    expect(custom.get('.mp-result__image-container').text()).toBe('custom 6rem')
    expect(custom.find('.mp-result__image').exists()).toBe(false)
  })

  test('result extra and default slots', () => {
    const wrapper = mount(VarResult, { slots: { extra: 'Retry', default: 'Details' } })
    expect(wrapper.get('.mp-result__extra').text()).toBe('Retry')
    expect(wrapper.get('.mp-result__content').text()).toBe('Details')
  })
})
