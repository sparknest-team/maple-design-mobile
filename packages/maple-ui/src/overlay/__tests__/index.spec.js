import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Overlay from '..'
import { triggerKeyboard } from '../../utils/test'
import VarOverlay from '../Overlay'

test('overlay plugin', () => {
  const app = createApp({}).use(Overlay)
  expect(app.component(Overlay.name)).toBeTruthy()
})

const Wrapper = {
  components: {
    [VarOverlay.name]: VarOverlay,
  },
  props: ['onClick'],
  data: () => ({
    open: false,
  }),
  template: `
    <mp-overlay v-model:open="open" v-bind="$props">
      default slot content
    </mp-overlay>
  `,
}

test('overlay show', async () => {
  const wrapper = mount(Wrapper)
  expect(document.body.querySelector('.mp-overlay')).toBeFalsy()

  await wrapper.setData({ open: true })
  expect(wrapper.find('.mp-overlay').isVisible()).toBeTruthy()
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ open: false })
  expect(document.body.querySelector('.mp-overlay')).toBeFalsy()

  wrapper.unmount()
})

test('overlay click on clickOverlay', async () => {
  const onClick = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      onClick,
    },
  })

  await wrapper.setData({ open: true })

  await wrapper.find('.mp-overlay__overlay').trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)

  await wrapper.setData({ open: true })
  await wrapper.setProps({ maskClosable: false })
  await wrapper.find('.mp-overlay__overlay').trigger('click')
  expect(onClick).toHaveBeenCalledTimes(2)

  wrapper.unmount()
})

test('overlay keyboard escape', async () => {
  const onKeyEscape = vi.fn()
  const onUpdateShow = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      onKeyEscape,
      'onUpdate:open': onUpdateShow,
    },
  })

  await triggerKeyboard(window, 'keydown', { key: 'Escape' })
  expect(onKeyEscape).toBeCalledTimes(1)
  expect(onUpdateShow).toBeCalledWith(false)

  wrapper.unmount()
})

test('overlay keyboard escape and escToClose', async () => {
  const onKeyEscape = vi.fn()
  const onUpdateShow = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      escToClose: false,
      onKeyEscape,
      'onUpdate:open': onUpdateShow,
    },
  })

  await triggerKeyboard(window, 'keydown', { key: 'Escape' })
  expect(onKeyEscape).toBeCalledTimes(1)
  expect(onUpdateShow).toBeCalledTimes(0)

  wrapper.unmount()
})
