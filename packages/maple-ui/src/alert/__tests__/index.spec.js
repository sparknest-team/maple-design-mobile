import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Alert from '..'
import VarAlert from '../Alert.vue'

test('alert plugin', () => {
  const app = createApp({}).use(Alert)
  expect(app.component(Alert.name)).toBeTruthy()
})

describe('alert props', () => {
  test('type modifier', () => {
    ;['info', 'success', 'warning', 'danger', 'default'].forEach((type) => {
      const wrapper = mount(VarAlert, { props: { type } })
      expect(wrapper.find('.mp-alert').classes()).toContain(`mp-alert--${type}`)
      wrapper.unmount()
    })
  })

  test('variant modifier', () => {
    ;['standard', 'tonal', 'outlined'].forEach((variant) => {
      const wrapper = mount(VarAlert, { props: { variant } })
      expect(wrapper.find('.mp-alert').classes()).toContain(`mp-alert--${variant}`)
      wrapper.unmount()
    })
  })

  test('default type hides built-in icon', () => {
    const wrapper = mount(VarAlert, { props: { type: 'default' } })
    expect(wrapper.find('.mp-alert__icon').exists()).toBe(false)
  })

  test('default type shows custom icon slot', () => {
    const wrapper = mount(VarAlert, {
      props: { type: 'default' },
      slots: { icon: '<i class="custom-icon" />' },
    })
    expect(wrapper.find('.mp-alert__icon .custom-icon').exists()).toBe(true)
  })

  test('showIcon=false hides icon', () => {
    const wrapper = mount(VarAlert, { props: { type: 'info', showIcon: false } })
    expect(wrapper.find('.mp-alert__icon').exists()).toBe(false)
  })

  test('closable click triggers onClose', async () => {
    const onClose = vi.fn()
    const wrapper = mount(VarAlert, { props: { closable: true, onClose } })
    await wrapper.find('.mp-alert__close-icon').trigger('click')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('banner / center modifiers', () => {
    const w1 = mount(VarAlert, { props: { banner: true } })
    expect(w1.find('.mp-alert').classes()).toContain('mp-alert--banner')
    const w2 = mount(VarAlert, { props: { center: true } })
    expect(w2.find('.mp-alert').classes()).toContain('mp-alert--center')
  })

  test('color overrides background-color', () => {
    const wrapper = mount(VarAlert, { props: { color: 'rgb(0, 128, 0)' } })
    const el = wrapper.find('.mp-alert').element
    expect(el.style.backgroundColor).toBe('rgb(0, 128, 0)')
  })

  test('title slot beats title prop', () => {
    const wrapper = mount(VarAlert, {
      props: { title: 'A' },
      slots: { title: 'B' },
    })
    expect(wrapper.find('.mp-alert__title').text()).toBe('B')
  })
})
