import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Switch from '..'
import { delay, triggerKeyboard } from '../../utils/test'
import VarSwitch from '../Switch'

test('switch plugin', () => {
  const app = createApp({}).use(Switch)
  expect(app.component(Switch.name)).toBeTruthy()
})

describe('test switch component props', () => {
  test('switch value', () => {
    const wrapper = mount(VarSwitch, {
      props: {
        modelValue: true,
      },
    })

    expect(wrapper.find('.mp-switch__track').classes()).toContain('mp-switch__track--active')

    wrapper.unmount()
  })

  test('switch checkedValue and uncheckedValue', async () => {
    const wrapper = mount(VarSwitch, {
      props: {
        modelValue: 1,
        checkedValue: 1,
        uncheckedValue: 2,
      },
    })

    expect(wrapper.find('.mp-switch__track').classes()).toContain('mp-switch__track--active')

    await wrapper.setProps({
      modelValue: 2,
    })

    expect(wrapper.find('.mp-switch__track').classes().length).toBe(1)
    wrapper.unmount()
  })

  test('switch disabled', () => {
    const wrapper = mount(VarSwitch, {
      props: {
        modelValue: true,
        disabled: true,
        readonly: false,
      },
    })

    expect(wrapper.find('.mp-switch--disable')).toBeTruthy()
    wrapper.unmount()
  })

  test('switch buttonElevation', async () => {
    const wrapper = mount(VarSwitch)

    expect(wrapper.find('.mp-elevation--2').exists()).toBeTruthy()

    await wrapper.setProps({
      buttonElevation: 4,
    })

    expect(wrapper.find('.mp-elevation--4').exists()).toBeTruthy()
    wrapper.unmount()
  })

  test('switch loading', () => {
    const wrapper = mount(VarSwitch, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.find('.mp-loading')).toBeTruthy()
    wrapper.unmount()
  })

  test('switch checkedColor, loadingColor, uncheckedColor', async () => {
    const wrapper = mount(VarSwitch, {
      props: {
        loading: true,
        modelValue: true,
        checkedColor: 'red',
        loadingColor: 'yellow',
        uncheckedColor: 'blue',
      },
    })

    expect(wrapper.find('.mp-switch__handle').attributes('style')).toContain('background-color: red; color: yellow;')

    await wrapper.setProps({
      modelValue: false,
    })
    await delay(200)

    expect(wrapper.find('.mp-switch__handle').attributes('style')).toContain('background-color: blue;')
    wrapper.unmount()
  })

  test('switch size', () => {
    const wrapper = mount(VarSwitch, {
      props: {
        size: '25px',
      },
    })

    expect(wrapper.find('.mp-switch__handle').attributes('style')).toContain('width: 25px; height: 25px;')
    wrapper.unmount()
  })

  test('variant mode', async () => {
    const wrapper = mount({
      components: {
        [VarSwitch.name]: VarSwitch,
      },
      data() {
        return {
          value: true,
          variant: false,
        }
      },
      template: `<mp-switch :variant="variant" v-model="value" />`,
    })

    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ variant: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

describe('test switch events', () => {
  test('switch v-model and events', async () => {
    const clickFn = vi.fn()
    const changeFn = vi.fn()

    const wrapper = mount({
      components: {
        [VarSwitch.name]: VarSwitch,
      },
      data() {
        return {
          value: true,
        }
      },
      methods: {
        clickFn,
        changeFn,
      },
      template: `<mp-switch v-model="value" @click="clickFn" @change="changeFn" />`,
    })

    await wrapper.find('.mp-switch__block').trigger('click')

    expect(clickFn).toHaveBeenCalledTimes(1)
    expect(changeFn).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.value).toBe(false)

    wrapper.unmount()
  })

  test('switch event not trigger', async () => {
    const clickFn = vi.fn()
    const changeFn = vi.fn()
    const template = `
    <mp-switch v-model="value" @click="clickFn" @change="changeFn" :disabled="disabled" :readonly="readonly" />
  `

    const wrapper = mount({
      components: {
        [VarSwitch.name]: VarSwitch,
      },
      data() {
        return {
          value: true,
          disabled: true,
          readonly: false,
        }
      },
      methods: {
        clickFn,
        changeFn,
      },
      template,
    })

    expect(wrapper.find('.mp-switch--disable')).toBeTruthy()

    await wrapper.find('.mp-switch__block').trigger('click')

    expect(clickFn).toHaveBeenCalledTimes(0)
    expect(changeFn).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.value).toBe(true)

    await wrapper.setData({
      disabled: false,
      readonly: true,
    })

    await wrapper.find('.mp-switch__block').trigger('click')
    expect(clickFn).toHaveBeenCalledTimes(1)
    expect(changeFn).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.value).toBe(true)

    wrapper.unmount()
  })

  test('counter lazy change', async () => {
    const wrapper = mount({
      components: {
        [VarSwitch.name]: VarSwitch,
      },
      data() {
        return {
          value: true,
        }
      },
      methods: {
        async onBeforeChange(value, change) {
          await delay(500)
          change(value)
        },
      },
      template: `<mp-switch lazy-change v-model="value" :before-change="onBeforeChange" />`,
    })

    await wrapper.find('.mp-switch__block').trigger('click')
    expect(wrapper.vm.value).toBe(true)

    await delay(600)
    expect(wrapper.vm.value).toBe(false)

    wrapper.unmount()
  })

  test('switch keyboard enter for switch', async () => {
    const click = vi.fn()
    const origin = HTMLElement.prototype.click
    HTMLElement.prototype.click = click

    const wrapper = mount(VarSwitch, {
      props: {
        modelValue: true,
      },
    })

    await wrapper.find('.mp-switch__ripple').trigger('focus')
    await triggerKeyboard(window, 'keydown', { key: 'Enter' })
    expect(click).toHaveBeenCalledTimes(1)

    HTMLElement.prototype.click = origin
    wrapper.unmount()
  })

  test('switch keyboard space for switch', async () => {
    const click = vi.fn()
    const origin = HTMLElement.prototype.click
    HTMLElement.prototype.click = click

    const wrapper = mount(VarSwitch, {
      props: {
        modelValue: true,
      },
    })

    await wrapper.find('.mp-switch__ripple').trigger('focus')
    await triggerKeyboard(window, 'keydown', { key: ' ' })
    await triggerKeyboard(window, 'keyup', { key: ' ' })
    expect(click).toHaveBeenCalledTimes(1)

    HTMLElement.prototype.click = origin
    wrapper.unmount()
  })
})
