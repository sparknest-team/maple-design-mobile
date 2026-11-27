import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Ellipsis from '..'
import Tooltip from '../../tooltip'
import VarEllipsis from '../Ellipsis.vue'

test('ellipsis plugin', () => {
  const app = createApp({}).use(Ellipsis)
  expect(app.component(Ellipsis.name)).toBeTruthy()
})

test('ellipsis single line', () => {
  const wrapper = mount(VarEllipsis, {
    slots: {
      default: () => 'hello',
    },
  })

  expect(wrapper.find('.mp-ellipsis--line').exists()).toBeTruthy()
  expect(wrapper.find('.mp-ellipsis--line').text()).toBe('hello')
  wrapper.unmount()
})

test('ellipsis lineClamp', async () => {
  const wrapper = mount(VarEllipsis, {
    props: {
      lineClamp: 3,
    },
    slots: {
      default: () => 'hello',
    },
  })

  expect(wrapper.find('.mp-ellipsis--clamp').exists()).toBeTruthy()
  expect(wrapper.find('.mp-ellipsis--line').exists()).toBeFalsy()
  expect(wrapper.get('.mp-ellipsis').element.style.getPropertyValue('-webkit-line-clamp')).toBe('3')

  await wrapper.setProps({
    lineClamp: 2,
  })
  expect(wrapper.find('.mp-ellipsis--clamp').exists()).toBeTruthy()
  expect(wrapper.find('.mp-ellipsis--line').exists()).toBeFalsy()
  expect(wrapper.get('.mp-ellipsis').element.style.getPropertyValue('-webkit-line-clamp')).toBe('2')

  wrapper.unmount()
})

test('ellipsis expandTrigger', async () => {
  const wrapper = mount(VarEllipsis, {
    props: {
      expandTrigger: 'click',
    },
    slots: {
      default: () => 'hello',
    },
  })

  expect(wrapper.find('.mp-ellipsis--cursor').exists()).toBeTruthy()
  await wrapper.find('.mp-ellipsis').trigger('click')
  expect(wrapper.find('.mp-ellipsis--expand').exists()).toBeTruthy()

  await wrapper.setProps({
    expandTrigger: undefined,
  })
  expect(wrapper.find('.mp-ellipsis--cursor').exists()).toBeFalsy()
  await wrapper.find('.mp-ellipsis').trigger('click')
  expect(wrapper.find('.mp-ellipsis--expand').exists()).toBeTruthy()

  wrapper.unmount()
})

test('ellipsis tooltip equals false', () => {
  const wrapper = mount(VarEllipsis, {
    props: {
      tooltip: false,
    },
  })

  expect(wrapper.getComponent(Tooltip).props('disabled')).toBe(true)
  wrapper.unmount()
})

test('ellipsis tooltip equals true', () => {
  const wrapper = mount(VarEllipsis, {
    props: {
      tooltip: true,
    },
  })

  expect(wrapper.getComponent(Tooltip).props('disabled')).toBe(false)
  wrapper.unmount()
})

test('ellipsis tooltip equals object', async () => {
  const container = document.createElement('div')
  const wrapper = mount(VarEllipsis, {
    props: {
      tooltip: { status: 'primary' },
    },
  })

  expect(wrapper.getComponent(Tooltip).props('status')).toBe('primary')

  await wrapper.setProps({
    tooltip: {
      status: 'info',
    },
  })
  expect(wrapper.getComponent(Tooltip).props('status')).toBe('info')

  await wrapper.setProps({
    tooltip: {
      open: true,
      popupContainer: container,
      content: 'Tooltip',
    },
  })
  const content = container.querySelector('[role="tooltip"]')
  expect(content.textContent).toBe('Tooltip')
  expect(wrapper.get('.mp-ellipsis').attributes('aria-describedby')).toBe(content.id)
  // Per-instance accessibility IDs are not a stable serialization contract.
  expect(container.innerHTML.replace(/id="[^"]+"/g, 'id="tooltip-content"')).toMatchSnapshot()

  wrapper.unmount()
})

test('ellipsis expand', async () => {
  const onUpdateExpand = vi.fn()

  const wrapper = mount(VarEllipsis, {
    props: {
      defaultExpand: true,
      expandTrigger: 'click',
      'onUpdate:expand': onUpdateExpand,
    },
    slots: {
      default: () => 'hello',
    },
  })

  expect(wrapper.find('.mp-ellipsis--expand').exists()).toBeTruthy()

  await wrapper.find('.mp-ellipsis').trigger('click')
  expect(onUpdateExpand).toBeCalledTimes(1)
  expect(wrapper.find('.mp-ellipsis--expand').exists()).toBeFalsy()

  await wrapper.find('.mp-ellipsis').trigger('click')
  expect(onUpdateExpand).toBeCalledTimes(2)
  expect(wrapper.find('.mp-ellipsis--expand').exists()).toBeTruthy()

  wrapper.unmount()
})
