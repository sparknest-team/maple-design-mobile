import { createApp } from 'vue'
import { afterEach, expect, test, vi } from 'vitest'
import Message from '..'
import { delay } from '../../utils/test'
import VarMessage from '../Message.vue'

afterEach(async () => {
  Message.clear()
  Message.resetDefaultOptions()
  await delay(250)
})

test('message plugin registers the component and global method', () => {
  const app = createApp({}).use(Message)
  expect(app.component(VarMessage.name)).toBeTruthy()
  expect(app.config.globalProperties.$message).toBe(Message)
})

test('message is callable and has no normal compatibility method', async () => {
  Message('plain message')
  await delay(50)
  expect(document.body.querySelector('.mp-message__wrapper-default')?.textContent).toContain('plain message')
  expect(Message.normal).toBeUndefined()
})

test.each([
  ['info', 'info'],
  ['success', 'success'],
  ['warning', 'warning'],
  ['error', 'danger'],
  ['loading', 'loading'],
])('message.%s maps to %s status', async (method, status) => {
  Message[method]({ content: method, duration: 0 })
  await delay(50)
  expect(document.body.querySelector(`.mp-message__wrapper-${status}`)).toBeTruthy()
})

test('same id updates one instance', async () => {
  Message.info({ id: 1, content: 'first', duration: 0 })
  await delay(50)
  Message.success({ id: 1, content: 'second', duration: 0 })
  await delay(50)
  expect(document.body.querySelectorAll('.mp-message').length).toBe(1)
  expect(document.body.querySelector('.mp-message__content')?.textContent).toBe('second')
})

test('queues are isolated by container and position', async () => {
  const target = document.createElement('section')
  document.body.appendChild(target)
  Message({ content: 'center', position: 'center', popupContainer: target, duration: 0 })
  Message({ content: 'bottom', position: 'bottom', popupContainer: target, duration: 0 })
  await delay(50)
  expect(target.querySelector('.mp-message-list-center')).toBeTruthy()
  expect(target.querySelector('.mp-message-list-bottom')).toBeTruthy()
  target.remove()
})

test('close is idempotent and lifecycle callbacks run once', async () => {
  const onOpen = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()
  const handle = Message({ content: 'lifecycle', duration: 0, onOpen, onClose, onClosed })
  await delay(50)
  handle.close()
  handle.close()
  await delay(250)
  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onClosed).toHaveBeenCalledTimes(1)
})

test('default options can be set and reset', async () => {
  Message.setDefaultOptions({ position: 'bottom', duration: 0 })
  Message('bottom')
  await delay(50)
  expect(document.body.querySelector('.mp-message-list-bottom')).toBeTruthy()
  Message.resetDefaultOptions()
})
