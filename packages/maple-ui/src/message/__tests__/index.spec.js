import { createApp } from 'vue'
import { expect, test, vi } from 'vitest'
import { delay } from '../../utils/test'
import Message from '../index'
import VarMessage from '../Message'

test('message plugin', () => {
  const app = createApp({}).use(Message)
  expect(app.component(VarMessage.name)).toBeTruthy()
})

test('message functional', async () => {
  expect(document.body.querySelector('.mp-message')).toBeFalsy()

  const { close } = Message('test message')

  await delay(200)
  expect(document.body.querySelector('.mp-message')).toBeTruthy()

  close()
  await delay(200)
  expect(document.body.querySelector('.mp-message')).toBeFalsy()

  Message.clear()
})

test('message elevation', async () => {
  expect(document.body.querySelector('.mp-message')).toBeFalsy()

  const { close } = Message({
    content: 'test message',
    elevation: 5,
  })

  await delay(200)
  expect(document.body.querySelector('.mp-elevation--5')).toBeTruthy()

  close()
  await delay(200)
  expect(document.body.querySelector('.mp-elevation--5')).toBeFalsy()

  Message.clear()
})

test('message type', async () => {
  Message.success('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeTruthy()
  Message.clear()
  await delay(200)

  Message.warning('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-warning')).toBeTruthy()
  Message.clear()
  await delay(200)

  Message.error('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-error')).toBeTruthy()
  Message.clear()
  await delay(200)

  Message.info({
    content: 'test message',
    forbidClick: true,
  })
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-info')).toBeTruthy()
  Message.clear()
  await delay(200)

  Message.loading('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-loading')).toBeTruthy()
  Message.clear()
  await delay(200)

  Message.normal('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-normal')).toBeTruthy()
  Message.clear()
})

test('message event', async () => {
  const open = vi.fn()
  const opened = vi.fn()
  const close = vi.fn()
  const closed = vi.fn()

  const { close: closeMessage } = Message({
    content: 'test message',
    duration: 0,
    onOpen: open,
    onOpened: opened,
    onClose: close,
    onClosed: closed,
  })

  await delay(200)

  closeMessage()

  await delay(200)

  expect(open).toHaveBeenCalledTimes(1)
  expect(opened).toHaveBeenCalled()
  expect(close).toHaveBeenCalledTimes(1)
  expect(closed).toHaveBeenCalledTimes(1)
})

test('message multiple and clear', async () => {
  Message.success('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeTruthy()

  Message.warning('test message')
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeTruthy()
  expect(document.body.querySelector('.mp-message__wrapper-warning')).toBeTruthy()

  const { close } = Message.info('test message')
  await delay(200)
  close()
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-info')).toBeFalsy()
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeTruthy()

  Message.clear()
  await delay(200)
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeFalsy()
  expect(document.body.querySelector('.mp-message__wrapper-warning')).toBeFalsy()
})

test('message id update', async () => {
  Message.info({
    id: 'same-id',
    content: 'first',
    duration: 0,
  })
  await delay(200)
  expect(document.body.querySelector('.mp-message__content').textContent).toBe('first')
  expect(document.body.querySelectorAll('.mp-message').length).toBe(1)

  Message.success({
    id: 'same-id',
    content: 'second',
    duration: 0,
  })
  await delay(200)
  expect(document.body.querySelector('.mp-message__content').textContent).toBe('second')
  expect(document.body.querySelector('.mp-message__wrapper-success')).toBeTruthy()
  expect(document.body.querySelectorAll('.mp-message').length).toBe(1)

  Message.clear()
})

test('message closable', async () => {
  Message.info({
    content: 'closable',
    closable: true,
    duration: 0,
  })
  await delay(200)
  expect(document.body.querySelector('.mp-message__close')).toBeTruthy()

  document.body.querySelector('.mp-message__close').click()
  await delay(200)
  expect(document.body.querySelector('.mp-message')).toBeFalsy()
})

test('setDefaultOptions and resetDefaultOptions', async () => {
  Message.setDefaultOptions({ content: 'message content', duration: 300 })

  Message()
  await delay(16)
  expect(document.body.querySelector('.mp-message__content').textContent).toBe('message content')

  await delay(500)

  Message.resetDefaultOptions()
  Message({ duration: 0 })
  await delay(16)

  expect(document.body.querySelector('.mp-message__content').textContent).toBe('')
  Message.clear()
})
