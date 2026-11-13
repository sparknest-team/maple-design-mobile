import { createApp, createSSRApp, h, nextTick, transformVNodeArgs } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount as mountComponent } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Dialog, { _DialogComponent as DialogComponent, dialogProps } from '..'
import { triggerKeyboard } from '../../utils/test'

const owners = []
function mount(...args) {
  const wrapper = mountComponent(...args)
  owners.push(wrapper)
  return wrapper
}
afterEach(() => {
  owners.splice(0).forEach((wrapper) => wrapper.unmount())
  transformVNodeArgs()
})

function mountDialog(props = {}, slots = {}) {
  return mount(DialogComponent, { props: { open: true, popupContainer: false, ...props }, slots })
}

test('dialog plugins', () => {
  const app = createApp({}).use(Dialog)
  expect(app.component(DialogComponent.name)).toBeTruthy()
  expect(app.config.globalProperties.$dialog.open).toBeTypeOf('function')
})

describe('dialog props', () => {
  test('shared defaults', () => {
    expect(dialogProps).toHaveProperty('overlay')
    expect(dialogProps).toHaveProperty('overlayClosable')
    expect(dialogProps).not.toHaveProperty('mask')
    expect(dialogProps).not.toHaveProperty('maskClosable')
    expect(dialogProps.defaultOpen.default).toBe(false)
    expect(dialogProps.titleAlign.default).toBe('center')
    expect(dialogProps.messageAlign.default).toBe('left')
    expect(dialogProps.alignCenter.default).toBe(true)
    expect(dialogProps.closable.default).toBe(true)
  })

  test('supports uncontrolled open', () => {
    const wrapper = mount(DialogComponent, { props: { defaultOpen: true, popupContainer: false } })
    expect(wrapper.find('.mp-dialog').exists()).toBe(true)
  })

  test('renders content, type and layout modifiers', () => {
    const wrapper = mountDialog({
      title: 'Title',
      message: 'Message',
      type: 'warning',
      simple: true,
      fullscreen: true,
      messageAlign: 'center',
    })
    expect(wrapper.find('.mp-dialog__title').text()).toContain('Title')
    expect(wrapper.find('.mp-dialog__message').text()).toBe('Message')
    expect(wrapper.find('.mp-dialog__message').attributes('style')).toContain('text-align: center')
    expect(wrapper.find('.mp-dialog').classes()).toEqual(
      expect.arrayContaining(['mp-dialog--type-warning', 'mp-dialog--simple', 'mp-dialog--fullscreen']),
    )
  })

  test('configures buttons through ButtonProps', () => {
    const wrapper = mountDialog({
      confirmButtonProps: { variant: 'text', status: 'danger' },
      cancelButtonProps: { variant: 'tonal', disabled: true },
    })
    expect(wrapper.find('.mp-dialog__confirm-button').classes()).toContain('mp-button--status-danger')
    expect(wrapper.find('.mp-dialog__confirm-button').classes()).toContain('mp-button--variant-text')
    expect(wrapper.find('.mp-dialog__cancel-button').classes()).toContain('mp-button--variant-tonal')
    expect(wrapper.find('.mp-dialog__cancel-button').attributes('disabled')).toBeDefined()
  })

  test('uses the Button color system for default actions', () => {
    const wrapper = mountDialog()
    expect(wrapper.find('.mp-dialog__confirm-button').classes()).toContain('mp-button--status-primary')
    expect(wrapper.find('.mp-dialog__cancel-button').classes()).toContain('mp-button--status-default')
    expect(wrapper.find('.mp-dialog__confirm-button').classes()).toContain('mp-button--variant-default')
    expect(
      wrapper
        .find('.mp-dialog__confirm-button')
        .classes()
        .some((name) => /elevation--\d/.test(name)),
    ).toBe(false)
    expect(wrapper.find('.mp-dialog__cancel-button').classes()).toContain('mp-button--variant-outline')
  })

  test('keeps custom footer content in the actions container outside the scrolling body', () => {
    const wrapper = mountDialog({}, { footer: () => h('button', { 'data-custom-footer': '' }, 'Continue') })
    try {
      expect(wrapper.get('.mp-dialog__actions [data-custom-footer]').text()).toBe('Continue')
      expect(wrapper.find('.mp-dialog__message [data-custom-footer]').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  test('renders close button with accessible name', () => {
    const wrapper = mountDialog({ closeButtonAriaLabel: '关闭对话框' })
    expect(wrapper.get('button[aria-label="关闭对话框"]')).toBeTruthy()
    expect(wrapper.get('[role="dialog"]').attributes('aria-modal')).toBe('true')
  })

  test('keeps closable independent from simple mode', () => {
    const wrapper = mountDialog({ simple: true, closable: true })
    expect(wrapper.find('.mp-dialog__close-button').exists()).toBe(true)
  })
})

describe('dialog actions', () => {
  test('emits confirm and cancel with the original event', async () => {
    const confirmWrapper = mountDialog()
    await confirmWrapper.get('.mp-dialog__confirm-button').trigger('click')
    expect(confirmWrapper.emitted('confirm')?.[0]?.[0]).toBeInstanceOf(Event)

    const cancelWrapper = mountDialog()
    await cancelWrapper.get('.mp-dialog__cancel-button').trigger('click')
    expect(cancelWrapper.emitted('cancel')?.[0]?.[0]).toBeInstanceOf(Event)
  })

  test('uses click-overlay and close action', async () => {
    const beforeClose = vi.fn((_action, done) => done())
    const wrapper = mountDialog({ overlayClosable: true, beforeClose })
    await wrapper.get('.mp-popup__overlay').trigger('pointerdown')
    await wrapper.get('.mp-popup__overlay').trigger('click')
    expect(wrapper.emitted('click-overlay')).toHaveLength(1)
    expect(beforeClose).toHaveBeenCalledWith({ action: 'close' }, expect.any(Function), expect.any(Object))
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  test('waits for asynchronous beforeClose', async () => {
    let allowClose
    const pending = new Promise((resolve) => {
      allowClose = resolve
    })
    const wrapper = mountDialog({ beforeClose: () => pending })
    await wrapper.get('.mp-dialog__confirm-button').trigger('click')
    expect(wrapper.emitted('confirm')).toBeUndefined()
    allowClose()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  test('deduplicates pending callback attempts and ignores externally retired completions', async () => {
    const completions = []
    const wrapper = mountDialog({
      beforeClose: (_action, done) => {
        completions.push(done)
      },
    })
    await nextTick()
    const confirm = wrapper.get('.mp-dialog__confirm-button')
    await confirm.trigger('click')
    await confirm.trigger('click')
    expect(completions).toHaveLength(1)
    await wrapper.setProps({ open: false })
    await wrapper.setProps({ open: true })
    completions[0]()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })

  test('route close follows closeOnRouteChange', async () => {
    const wrapper = mountDialog({ closeOnRouteChange: true })
    window.dispatchEvent(new PopStateEvent('popstate'))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  test('ESC emits key-escape and closes without cancel', async () => {
    const wrapper = mountDialog()
    await triggerKeyboard(document, 'keydown', { key: 'Escape' })
    expect(wrapper.emitted('key-escape')).toHaveLength(1)
    expect(wrapper.emitted('cancel')).toBeUndefined()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })
})

describe('dialog slots and instance', () => {
  test('footer exposes confirm, cancel and close only', () => {
    let slotProps
    mountDialog(
      {},
      {
        footer: (props) => {
          slotProps = props
          return h('div', 'footer')
        },
      },
    )
    expect(slotProps).toEqual(
      expect.objectContaining({
        cancel: expect.any(Function),
        close: expect.any(Function),
        confirm: expect.any(Function),
      }),
    )
    expect(slotProps.slotClass).toBeUndefined()
  })

  test('exposes close, confirm and cancel', () => {
    const wrapper = mountDialog()
    expect(wrapper.vm.close).toBeTypeOf('function')
    expect(wrapper.vm.confirm).toBeTypeOf('function')
    expect(wrapper.vm.cancel).toBeTypeOf('function')
  })

  test('traps keyboard focus and renders safely during SSR', async () => {
    const wrapper = mount(DialogComponent, {
      attachTo: document.body,
      props: { open: true, popupContainer: false },
    })
    await nextTick()
    await flushPromises()
    const buttons = wrapper.findAll('button')
    buttons.at(-1).element.focus()
    await wrapper.get('[role="dialog"]').trigger('keydown', { key: 'Tab' })
    expect(document.activeElement).toBe(buttons[0].element)
    wrapper.unmount()

    const html = await renderToString(
      createSSRApp({ render: () => h(DialogComponent, { open: true, popupContainer: false }) }),
    )
    expect(html).toContain('mp-dialog')
  })
})
