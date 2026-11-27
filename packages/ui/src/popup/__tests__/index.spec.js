import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Popup, { popupProps } from '..'
import { triggerKeyboard } from '../../utils/test'
import VarPopup from '../Popup'

test('preserves initially closed slot state when unmountOnClose is false', async () => {
  const wrapper = mount(VarPopup, {
    props: { open: false, unmountOnClose: false, popupContainer: false },
    slots: { default: '<input value="registered before opening" />' },
  })
  const input = wrapper.find('input').element
  await wrapper.setProps({ open: true })
  expect(wrapper.find('input').element).toBe(input)
  await wrapper.setProps({ open: false })
  expect(wrapper.find('input').element).toBe(input)
  wrapper.unmount()
})

test('popup plugin', () => {
  const app = createApp({}).use(Popup)
  expect(app.component(Popup.name)).toBeTruthy()
})

test('popup canonical overlay props', () => {
  expect(popupProps).toHaveProperty('overlay')
  expect(popupProps).toHaveProperty('overlayClosable')
  expect(popupProps).not.toHaveProperty('mask')
  expect(popupProps).not.toHaveProperty('maskClosable')
  expect(popupProps).toHaveProperty('defaultOpen')
  expect(popupProps).toHaveProperty('unmountOnClose')
  expect(popupProps).toHaveProperty('closeOnRouteChange')
  expect(popupProps).toHaveProperty('placement')
  expect(popupProps).toHaveProperty('unstyled')
  expect(popupProps).toHaveProperty('safeAreaInsetBottom')
  expect(popupProps).toHaveProperty('safeAreaInsetTop')
  expect(popupProps).not.toHaveProperty('position')
  expect(popupProps).not.toHaveProperty('defaultStyle')
  expect(popupProps).not.toHaveProperty('safeArea')
  expect(popupProps).not.toHaveProperty('safeAreaTop')
})

const Wrapper = {
  components: {
    [VarPopup.name]: VarPopup,
  },
  props: ['overlayClosable', 'onOpen', 'onClose', 'onClickOverlay', 'unstyled', 'closeOnRouteChange'],
  data: () => ({
    open: false,
  }),
  template: `
    <mp-popup v-model:open="open" v-bind="$props" :popup-container="false">
      default slot content
    </mp-popup>
  `,
}

test('popup show', async () => {
  const wrapper = mount(Wrapper, { attachTo: document.body })
  expect(wrapper.find('.mp-popup').isVisible()).toBeFalsy()
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ open: true })
  expect(wrapper.find('.mp-popup').isVisible()).toBeTruthy()
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.setData({ open: false })
  expect(wrapper.find('.mp-popup').isVisible()).toBeFalsy()
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('popup onOpen & onClose', async () => {
  const onOpen = vi.fn()
  const onClose = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      onOpen,
      onClose,
    },
  })
  await wrapper.setData({ open: true })
  expect(onOpen).toHaveBeenCalledTimes(1)

  await wrapper.setData({ open: false })
  expect(onClose).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('popup zIndex', async () => {
  const wrapper = mount(Wrapper, {
    props: {
      zIndex: 40,
    },
  })

  await wrapper.setData({ open: true })
  expect(wrapper.find('.mp-popup').attributes('style')).toContain('z-index: 40')
  expect(wrapper.find('.mp-popup__overlay').attributes('style')).toContain('z-index: 39')
  expect(wrapper.find('.mp-popup__content').attributes('style')).toContain('z-index: 40')

  wrapper.unmount()
})

test('popup close on clickOverlay', async () => {
  const onClose = vi.fn()
  const onClickOverlay = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      onClose,
      onClickOverlay,
    },
  })

  await wrapper.setData({ open: true })

  await wrapper.find('.mp-popup__overlay').trigger('pointerdown')
  await wrapper.find('.mp-popup__overlay').trigger('click')
  expect(onClickOverlay).toHaveBeenCalledTimes(1)
  expect(onClose).toHaveBeenCalledTimes(1)

  await wrapper.setData({ open: true })
  await wrapper.setProps({ overlayClosable: false })
  await wrapper.find('.mp-popup__overlay').trigger('pointerdown')
  await wrapper.find('.mp-popup__overlay').trigger('click')
  expect(onClickOverlay).toHaveBeenCalledTimes(2)
  expect(onClose).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('popup unstyled', async () => {
  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      unstyled: false,
    },
  })

  expect(wrapper.find('.mp-popup--content-background-color').exists()).toBe(true)
  expect(wrapper.find('.mp-elevation--3').exists()).toBe(true)

  await wrapper.setProps({
    unstyled: true,
  })
  expect(wrapper.find('.mp-popup--content-background-color').exists()).toBe(false)
  expect(wrapper.find('.mp-elevation--3').exists()).toBe(false)

  wrapper.unmount()
})

test('popup safeAreaInsetBottom prop', async () => {
  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      safeAreaInsetBottom: true,
    },
  })

  expect(wrapper.find('.mp-popup--safe-area-inset-bottom').exists()).toBe(true)

  await wrapper.setProps({
    safeAreaInsetBottom: false,
  })
  expect(wrapper.find('.mp-popup--safe-area-inset-bottom').exists()).toBe(false)

  wrapper.unmount()
})

test('popup safeAreaInsetTop prop', async () => {
  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      safeAreaInsetTop: true,
    },
  })

  expect(wrapper.find('.mp-popup--safe-area-inset-top').exists()).toBe(true)

  await wrapper.setProps({
    safeAreaInsetTop: false,
  })
  expect(wrapper.find('.mp-popup--safe-area-inset-top').exists()).toBe(false)

  wrapper.unmount()
})

test('popup overlayClass prop', () => {
  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      overlayClass: 'test-class',
    },
  })

  expect(wrapper.find('.test-class').exists()).toBe(true)

  wrapper.unmount()
})

test('popup overlayStyle prop', () => {
  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      overlayStyle: {
        background: 'red',
      },
    },
  })

  expect(wrapper.find('.mp-popup__overlay').attributes('style')).toContain('background: red;')

  wrapper.unmount()
})

test('popup placement prop', () => {
  ;['top', 'bottom', 'right', 'left', 'center'].forEach((placement) => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        placement,
      },
    })

    expect(wrapper.find(`.mp-popup--${placement}`).exists()).toBe(true)

    wrapper.unmount()
  })
})

test('popup keyboard escape', async () => {
  const onKeyEscape = vi.fn()
  const onUpdateShow = vi.fn()

  const wrapper = mount(Wrapper, {
    props: {
      open: true,
      onKeyEscape,
      'onUpdate:open': onUpdateShow,
    },
  })

  await triggerKeyboard(document, 'keydown', { key: 'Escape' })
  expect(onKeyEscape).toBeCalledTimes(1)
  expect(onUpdateShow).toBeCalledWith(false)

  wrapper.unmount()
})

test('popup keyboard escape and escToClose', async () => {
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

  await triggerKeyboard(document, 'keydown', { key: 'Escape' })
  expect(onKeyEscape).toBeCalledTimes(1)
  expect(onUpdateShow).toBeCalledTimes(0)

  wrapper.unmount()
})

test('popup closes on route change only when enabled', async () => {
  const onUpdateShow = vi.fn()
  const wrapper = mount(Wrapper, {
    props: {
      closeOnRouteChange: true,
      'onUpdate:open': onUpdateShow,
    },
  })
  await wrapper.setData({ open: true })

  window.dispatchEvent(new PopStateEvent('popstate'))
  expect(onUpdateShow).toHaveBeenCalledWith(false)

  wrapper.unmount()
})
