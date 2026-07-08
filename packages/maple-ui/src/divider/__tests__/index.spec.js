import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Divider from '..'
import VarDivider from '../Divider'

test('divider plugin', () => {
  const app = createApp({}).use(Divider)
  expect(app.component(Divider.name)).toBeTruthy()
})

describe('test divider components props', () => {
  test('divider inset', async () => {
    const wrapper = mount(VarDivider, {
      props: {
        inset: true,
      },
    })

    expect(wrapper.find('.mp-divider--inset').exists()).toBe(true)
    await wrapper.setProps({ inset: false })
    expect(wrapper.find('.mp-divider--inset').exists()).toBe(false)
    await wrapper.setProps({ inset: 36 })
    expect(wrapper.find('.mp-divider').attributes('style')).toContain('left: 36px;')
    wrapper.unmount()
  })

  test('divider vertical', async () => {
    const wrapper = mount(VarDivider, {
      props: {
        vertical: true,
        inset: 30,
      },
    })

    expect(wrapper.find('.mp-divider--vertical').exists()).toBe(true)
    await wrapper.setProps({ vertical: false })
    expect(wrapper.find('.mp-divider--vertical').exists()).toBe(false)
    wrapper.unmount()
  })

  test('divider dashed', async () => {
    const wrapper = mount(VarDivider, {
      props: {
        dashed: true,
      },
    })

    expect(wrapper.find('.mp-divider--dashed').exists()).toBe(true)
    await wrapper.setProps({ dashed: false })
    expect(wrapper.find('.mp-divider--dashed').exists()).toBe(false)
    wrapper.unmount()
  })

  test('divider description', () => {
    const wrapper = mount(VarDivider, {
      props: {
        description: 'This is description',
        vertical: false,
      },
    })

    expect(wrapper.find('.mp-divider__text').element.textContent).toBe('This is description')
    wrapper.unmount()
  })

  test('divider margin', () => {
    const wrapper = mount(VarDivider, {
      props: {
        margin: '20px',
      },
    })

    expect(wrapper.find('.mp-divider').attributes('style')).toContain('margin: 20px;')
    wrapper.unmount()
  })

  test('divider hairline', async () => {
    const wrapper = mount(VarDivider, {
      props: {
        hairline: true,
      },
    })

    expect(wrapper.find('.mp-divider--hairline').exists()).toBe(true)
    await wrapper.setProps({ hairline: false })
    expect(wrapper.find('.mp-divider--hairline').exists()).toBe(false)
    wrapper.unmount()
  })
})
