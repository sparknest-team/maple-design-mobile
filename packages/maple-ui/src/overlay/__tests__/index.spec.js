import { createApp } from 'vue'
import { DOMWrapper, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Overlay, { overlayProps } from '..'
import { triggerKeyboard } from '../../utils/test'
import VarOverlay from '../Overlay'

test('overlay plugin', () => {
  const app = createApp({}).use(Overlay)
  expect(app.component(Overlay.name)).toBeTruthy()
})

test('overlay canonical props', () => {
  expect(overlayProps).toHaveProperty('overlayClosable')
  expect(overlayProps).not.toHaveProperty('maskClosable')
})

test('overlay supports uncontrolled open and ignores content clicks', async () => {
  const wrapper = mount(VarOverlay, {
    props: { defaultOpen: true, popupContainer: false },
    slots: { default: 'content' },
  })

  await wrapper.get('.mp-overlay__content').trigger('click')
  expect(wrapper.emitted('update:open')).toBeUndefined()
})

test('overlay can preserve mounted content after closing', async () => {
  const wrapper = mount(VarOverlay, {
    props: { defaultOpen: true, popupContainer: false, unmountOnClose: false },
    slots: { default: '<span data-overlay-content>content</span>' },
  })

  expect(wrapper.emitted('open')).toHaveLength(1)
  await wrapper.get('.mp-overlay__backdrop').trigger('click')
  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('close')).toHaveLength(1)
  expect(wrapper.find('[data-overlay-content]').exists()).toBe(true)
  expect(wrapper.get('.mp-overlay').isVisible()).toBe(false)
})

const Wrapper = {
  components: {
    [VarOverlay.name]: VarOverlay,
  },
  props: ['onClick', 'overlayClosable'],
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
  const overlay = new DOMWrapper(document.body.querySelector('.mp-overlay'))
  expect(overlay.isVisible()).toBeTruthy()
  expect(overlay.html()).toMatchSnapshot()

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

  await new DOMWrapper(document.body.querySelector('.mp-overlay__backdrop')).trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.open).toBe(false)

  await wrapper.setData({ open: true })
  await wrapper.setProps({ overlayClosable: false })
  await new DOMWrapper(document.body.querySelector('.mp-overlay__backdrop')).trigger('click')
  expect(onClick).toHaveBeenCalledTimes(2)
  expect(wrapper.vm.open).toBe(true)

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
  expect(onKeyEscape.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent)
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
