import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Dialog retains action text when the global locale loads later', async () => {
  const Dialog = (await import('../../dialog/index')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(Dialog, { props: { open: true, popupContainer: false, lockScroll: false } })
  const labels = () => [
    wrapper.get('.mp-dialog__cancel-button').text(),
    wrapper.get('.mp-dialog__confirm-button').text(),
  ]
  try {
    expect(labels()).toEqual(['取消', '确认'])
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual(['Cancel', 'Confirm'])
    locale.add('dialog-partial-lazy', {})
    locale.use('dialog-partial-lazy')
    await nextTick()
    expect(labels()).toEqual(['', ''])
    locale.merge('dialog-partial-lazy', { dialogCancelButtonText: '', dialogConfirmButtonText: 'Custom' })
    await nextTick()
    expect(labels()).toEqual(['', 'Custom'])
    await wrapper.setProps({ confirmButtonText: 'Explicit' })
    expect(labels()).toEqual(['', 'Explicit'])
    locale.use('zh-CN')
    await wrapper.setProps({ confirmButtonText: undefined })
    expect(labels()).toEqual(['取消', '确认'])
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { dialogCancelButtonText: '', dialogConfirmButtonText: 'Scoped' } } },
          () => h(Dialog, { open: true, popupContainer: false, lockScroll: false }),
        ),
    })
    try {
      expect(scoped.get('.mp-dialog__cancel-button').text()).toBe('')
      expect(scoped.get('.mp-dialog__confirm-button').text()).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
