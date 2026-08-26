import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Dialog from '..'
import VarButton from '../../button'
import MpIcon from '../../icon'
import { delay, triggerKeyboard } from '../../utils/test'
import VarDialog from '../Dialog'

test('dialog component plugin', () => {
  const app = createApp({}).use(Dialog.Component)
  expect(app.component(Dialog.Component.name)).toBeTruthy()
})

const Wrapper = {
  components: {
    [VarDialog.name]: VarDialog,
  },
  props: ['maskClosable', 'beforeClose', 'onClickOverlay'],
  data: () => ({
    open: false,
  }),
  template: `
    <mp-dialog v-model:open="open" v-bind="$props" :popup-container="null" />
  `,
}

describe('test dialog component props', () => {
  test('dialog component confirmButton', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
      },
    })

    expect(wrapper.find('.mp-dialog__confirm-button').exists()).toBe(true)

    await wrapper.setProps({
      confirmButton: false,
    })
    expect(wrapper.find('.mp-dialog__confirm-button').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component cancelButton', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
      },
    })

    expect(wrapper.find('.mp-dialog__cancel-button').exists()).toBe(true)

    await wrapper.setProps({
      cancelButton: false,
    })
    expect(wrapper.find('.mp-dialog__cancel-button').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component confirmButtonText', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
      },
    })

    expect(wrapper.find('.mp-dialog__confirm-button').text()).toBe('确认')

    await wrapper.setProps({
      confirmButtonText: 'confirm',
    })
    expect(wrapper.find('.mp-dialog__confirm-button').text()).toBe('confirm')

    wrapper.unmount()
  })

  test('dialog component cancelButtonText', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
      },
    })

    expect(wrapper.find('.mp-dialog__cancel-button').text()).toBe('取消')

    await wrapper.setProps({
      cancelButtonText: 'cancel',
    })
    expect(wrapper.find('.mp-dialog__cancel-button').text()).toBe('cancel')

    wrapper.unmount()
  })

  test('dialog component title', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
      },
    })

    expect(wrapper.find('.mp-dialog__title').text()).toBe('提示')

    await wrapper.setProps({
      title: 'Dialog Title',
    })
    expect(wrapper.find('.mp-dialog__title').text()).toBe('Dialog Title')

    wrapper.unmount()
  })

  test('dialog component message', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        message: 'Dialog',
      },
    })

    expect(wrapper.find('.mp-dialog__message').text()).toBe('Dialog')

    await wrapper.setProps({
      message: 'Dialog Message',
    })
    expect(wrapper.find('.mp-dialog__message').text()).toBe('Dialog Message')

    wrapper.unmount()
  })

  test('dialog component dialogClass', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        dialogClass: 'test-dialog-class',
      },
    })

    expect(wrapper.find('.test-dialog-class').exists()).toBe(true)

    wrapper.unmount()
  })

  test('dialog component dialogStyle', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        dialogStyle: {
          background: 'red',
        },
      },
    })

    expect(wrapper.find('.mp-dialog').attributes('style')).toContain('background: red')

    wrapper.unmount()
  })

  test('dialog component width', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        width: 100,
      },
    })

    expect(wrapper.find('.mp-dialog').attributes('style')).toContain('width: 100px')

    await wrapper.setProps({
      width: '200',
    })
    expect(wrapper.find('.mp-dialog').attributes('style')).toContain('width: 200px')

    wrapper.unmount()
  })

  test('dialog component messageAlign', () => {
    ;['left', 'center', 'right'].forEach((align) => {
      const wrapper = mount(Wrapper, {
        props: {
          open: true,
          messageAlign: align,
        },
      })

      expect(wrapper.find('.mp-dialog__message').attributes('style')).toContain(`text-align: ${align}`)

      wrapper.unmount()
    })
  })

  test('dialog component confirmButtonColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        confirmButtonColor: 'blue',
      },
    })

    expect(wrapper.find('.mp-dialog__confirm-button[mp-dialog-cover]').attributes('style')).toContain(
      'background: blue',
    )

    wrapper.unmount()
  })

  test('dialog component cancelButtonColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        cancelButtonColor: 'blue',
      },
    })

    expect(wrapper.find('.mp-dialog__cancel-button[mp-dialog-cover]').attributes('style')).toContain('background: blue')

    wrapper.unmount()
  })

  test('dialog component confirmButtonTextColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        confirmButtonTextColor: 'blue',
      },
    })

    expect(wrapper.find('.mp-dialog__confirm-button[mp-dialog-cover]').attributes('style')).toContain('color: blue')

    wrapper.unmount()
  })

  test('dialog component cancelButtonTextColor', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        cancelButtonTextColor: 'blue',
      },
    })

    expect(wrapper.find('.mp-dialog__cancel-button[mp-dialog-cover]').attributes('style')).toContain('color: blue')

    wrapper.unmount()
  })
})

describe('test dialog component events', () => {
  test('dialog component click overlay', async () => {
    const onClickOverlay = vi.fn()

    const wrapper = mount(Wrapper, {
      props: {
        onClickOverlay,
        maskClosable: false,
      },
    })
    await wrapper.setData({ open: true })

    await wrapper.find('.mp-popup__overlay').trigger('click')
    expect(onClickOverlay).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.open).toBe(true)

    await wrapper.setProps({ maskClosable: true })
    await wrapper.find('.mp-popup__overlay').trigger('click')
    expect(onClickOverlay).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.open).toBe(false)

    wrapper.unmount()
  })

  test('dialog component beforeClose', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        open: true,
      }),
      methods: {
        async beforeClose(_action, change) {
          await delay(500)
          change()
        },
      },
      template: `<mp-dialog v-model:open="open" :popup-container="null" :before-close="beforeClose" />`,
    })

    await wrapper.find('.mp-popup__overlay').trigger('click')
    expect(wrapper.vm.open).toBe(true)

    await delay(600)
    expect(wrapper.vm.open).toBe(false)

    await wrapper.setData({ open: true })

    await wrapper.find('.mp-dialog__cancel-button').trigger('click')
    expect(wrapper.vm.open).toBe(true)

    await delay(600)
    expect(wrapper.vm.open).toBe(false)

    await wrapper.setData({ open: true })

    await wrapper.find('.mp-dialog__confirm-button').trigger('click')
    expect(wrapper.vm.open).toBe(true)

    await delay(600)
    expect(wrapper.vm.open).toBe(false)

    wrapper.unmount()
  })

  test('dialog keyboard escape', async () => {
    const onKeyEscape = vi.fn()
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        open: true,
      }),
      methods: {
        onKeyEscape,
      },
      template: `<mp-dialog v-model:open="open" :popup-container="null" @key-escape="onKeyEscape" />`,
    })

    await triggerKeyboard(window, 'keydown', { key: 'Escape' })
    expect(onKeyEscape).toBeCalledTimes(1)
    expect(wrapper.vm.open).toBe(false)

    wrapper.unmount()
  })

  test('dialog keyboard escape and escToClose', async () => {
    const onKeyEscape = vi.fn()
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        open: true,
      }),
      methods: {
        onKeyEscape,
      },
      template: `<mp-dialog v-model:open="open" :esc-to-close="false" :popup-container="null" @key-escape="onKeyEscape" />`,
    })

    await triggerKeyboard(window, 'keydown', { key: 'Escape' })
    expect(onKeyEscape).toBeCalledTimes(1)
    expect(wrapper.vm.open).toBe(true)

    wrapper.unmount()
  })
})

describe('test dialog component slots', () => {
  test('dialog title slot', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
        [MpIcon.name]: MpIcon,
      },
      data: () => ({
        open: true,
      }),
      template: `
        <mp-dialog v-model:open="open" :popup-container="null">
          <template #title>
            <mp-icon name="information" />
          </template>
        </mp-dialog>
      `,
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('.mp-icon').exists()

    wrapper.unmount()
  })

  test('dialog default slot', () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
      },
      data: () => ({
        open: true,
      }),
      template: `
        <mp-dialog v-model:open="open" :popup-container="null">
          dialog default slot
        </mp-dialog>
      `,
    })

    expect(wrapper.find('.mp-dialog__message').text()).toBe('dialog default slot')

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('dialog footer slot', async () => {
    const wrapper = mount({
      components: {
        [VarDialog.name]: VarDialog,
        [VarButton.name]: VarButton,
      },
      data: () => ({
        open: true,
      }),
      template: `<mp-dialog v-model:open="open" :popup-container="null">
        <template #footer="{slotClass, cancel, confirm}">
          <div :class="slotClass">
            <mp-button class="cancel" @click="cancel">cancel</mp-button>
            <mp-button class="confirm" @click="confirm">confirm</mp-button>
          </div>
        </template>
      </mp-dialog>`,
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('.cancel').trigger('click')
    await delay(300)
    expect(wrapper.vm.open).toBe(false)

    await wrapper.setData({ open: true })

    await wrapper.find('.confirm').trigger('click')
    await delay(300)
    expect(wrapper.vm.open).toBe(false)

    wrapper.unmount()
  })

  test('dialog component type icon', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        type: 'warning',
        title: 'warning title',
      },
    })

    expect(wrapper.find('.mp-dialog__title-icon').exists()).toBe(true)
    expect(wrapper.find('.mp-icon-warning').exists()).toBe(true)
    expect(wrapper.find('.mp-dialog--type-warning').exists()).toBe(true)

    wrapper.unmount()
  })

  test('dialog component footer', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        footer: false,
      },
    })

    expect(wrapper.find('.mp-dialog__actions').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component hideTitle', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        hideTitle: true,
      },
    })

    expect(wrapper.find('.mp-dialog__title').exists()).toBe(false)

    wrapper.unmount()
  })

  test('dialog component bodyClass and bodyStyle', () => {
    const wrapper = mount(Wrapper, {
      props: {
        open: true,
        bodyClass: 'custom-body',
        bodyStyle: { padding: '8px' },
      },
    })

    const message = wrapper.find('.mp-dialog__message')
    expect(message.classes()).toContain('custom-body')
    expect(message.attributes('style')).toContain('padding: 8px')

    wrapper.unmount()
  })

  test('dialog component unmountOnClose', async () => {
    const wrapper = mount(VarDialog, {
      props: {
        open: true,
        unmountOnClose: true,
        popupContainer: null,
      },
      global: {
        stubs: {
          transition: false,
        },
      },
    })

    expect(wrapper.find('.mp-dialog').exists()).toBe(true)

    await wrapper.setProps({ open: false })
    await delay(300)

    expect(wrapper.find('.mp-dialog').exists()).toBe(false)

    wrapper.unmount()
  })
})
