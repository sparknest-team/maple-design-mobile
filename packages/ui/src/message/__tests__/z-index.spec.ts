import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Message from '..'
import Dialog from '../../dialog/Dialog.vue'
import OtherPopup from '../../popup/Popup.vue'
import MessageComponent from '../Message.vue'

const owners: ReturnType<typeof mount>[] = []
const containers: HTMLElement[] = []
afterEach(async () => {
  Message.clear()
  owners.splice(0).forEach((owner) => owner.unmount())
  await settle()
  containers.splice(0).forEach((container) => container.remove())
})
async function settle() {
  for (let i = 0; i < 4; i++) {
    await nextTick()
  }
}
function messageLayer(root: ParentNode = document) {
  return Number(
    root.querySelector<HTMLElement>('.mp-message-list')!.style.getPropertyValue('--mp-internal-message-z-index'),
  )
}

test('a message from confirm stays above its dialog and later popups', async () => {
  owners.push(
    mount(Dialog, {
      attachTo: document.body,
      props: { open: true, onConfirm: () => Message.success({ content: 'Saved', duration: 0 }) },
    }),
  )
  await settle()
  const confirm = document.querySelectorAll<HTMLButtonElement>('.mp-dialog__actions button')
  confirm[confirm.length - 1].click()
  await settle()
  const dialogRoot = document.querySelector<HTMLElement>('.mp-dialog__popup')!
  expect(messageLayer()).toBeGreaterThan(Number(dialogRoot.style.zIndex))
  const popup = mount(OtherPopup, { attachTo: document.body, props: { open: true, zIndex: 12000 } })
  owners.push(popup)
  await settle()
  expect(messageLayer()).toBeGreaterThan(12000)
  await popup.setProps({ zIndex: 24000 })
  await settle()
  expect(messageLayer()).toBeGreaterThan(24000)
  expect(document.querySelectorAll('.mp-message-list')).toHaveLength(1)
})

test('standalone messages follow explicit nested dialog layers', async () => {
  for (const zIndex of [8000, 16000]) {
    owners.push(mount(Dialog, { attachTo: document.body, props: { open: true, zIndex } }))
  }
  owners.push(mount(MessageComponent, { props: { open: true, duration: 0, content: 'Feedback' } }))
  await settle()
  const root = document.querySelector<HTMLElement>('.mp-message__standalone')!
  expect(Number(root.style.getPropertyValue('--mp-internal-message-z-index'))).toBeGreaterThan(16000)
})

test('message layers track only popups in the target document', async () => {
  owners.push(mount(Dialog, { attachTo: document.body, props: { open: true, zIndex: 50000 } }))
  const frame = document.createElement('iframe')
  document.body.appendChild(frame)
  containers.push(frame)
  Message({ content: 'Other document', duration: 0, popupContainer: frame.contentDocument!.body })
  await settle()
  expect(messageLayer(frame.contentDocument!)).toBeLessThan(50000)
})
