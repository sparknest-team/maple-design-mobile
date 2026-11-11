import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { _DialogComponent as Dialog } from '..'
import Popup from '../../popup'

test('teleported Dialog exposes its own backdrop scope without changing Popup', async () => {
  const target = document.createElement('div')
  document.body.append(target)
  const dialog = mount(Dialog, {
    global: { stubs: { transition: false } },
    props: {
      open: true,
      popupContainer: target,
      overlayStyle: { '--mp-dialog-overlay-background': 'rgba(0, 0, 0, 0.3)' },
    },
  })
  const popup = mount(Popup, {
    global: { stubs: { transition: false } },
    props: { open: true, popupContainer: target },
  })
  try {
    await nextTick()
    const backdrop = target.querySelector('.mp-dialog__popup > .mp-popup__overlay')
    expect(backdrop).not.toBeNull()
    expect(backdrop.style.getPropertyValue('--mp-dialog-overlay-background')).toBe('rgba(0, 0, 0, 0.3)')
    expect(target.querySelector('.mp-dialog').style.opacity).toBe('')
    const standalone = target.querySelector('.mp-popup:not(.mp-dialog__popup) > .mp-popup__overlay')
    expect(standalone).not.toBeNull()
    expect(standalone.style.getPropertyValue('--mp-dialog-overlay-background')).toBe('')
    await dialog.setProps({ overlayStyle: { backgroundColor: 'red' } })
    expect(backdrop.style.backgroundColor).toBe('red')
  } finally {
    popup.unmount()
    dialog.unmount()
    target.remove()
  }
})

test('Popup unstyled removes the default surface and foreground class', async () => {
  const popup = mount(Popup, { props: { open: true, popupContainer: false } })
  try {
    expect(popup.get('.mp-popup__content').classes()).toContain('mp-popup--content-background-color')
    await popup.setProps({ unstyled: true })
    expect(popup.get('.mp-popup__content').classes()).not.toContain('mp-popup--content-background-color')
  } finally {
    popup.unmount()
  }
})
