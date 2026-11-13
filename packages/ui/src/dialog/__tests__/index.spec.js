import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Dialog from '..'
import { trigger } from '../../utils/test'
import {
  finishServiceTransitions,
  installServiceTransitionTimers,
  restoreServiceTransitionTimers,
} from './service-test-utils'

beforeEach(installServiceTransitionTimers)
afterEach(async () => {
  try {
    Dialog.close()
    await finishServiceTransitions()
  } finally {
    Dialog.resetDefaultOptions()
    restoreServiceTransitionTimers()
  }
})

test('uses explicit static methods instead of callable Dialog', () => {
  expect(Dialog).not.toBeTypeOf('function')
  for (const method of ['open', 'confirm', 'alert', 'info', 'success', 'warning', 'error']) {
    expect(Dialog[method]).toBeTypeOf('function')
  }
})

test('opens from a string and returns close/update handles', async () => {
  const result = Dialog.open('test message')
  expect(result.close).toBeTypeOf('function')
  expect(result.update).toBeTypeOf('function')
  await nextTick()
  expect(document.querySelector('.mp-dialog__message')?.textContent).toContain('test message')
  result.update({ message: 'updated' })
  await nextTick()
  expect(document.querySelector('.mp-dialog__message')?.textContent).toContain('updated')
  result.close()
  await expect(result).resolves.toBe('close')
})

test('resolves confirm and cancel actions', async () => {
  const confirmResult = Dialog.confirm('confirm')
  await nextTick()
  await trigger(document.querySelector('.mp-dialog__confirm-button'), 'click')
  await expect(confirmResult).resolves.toBe('confirm')
  await finishServiceTransitions()

  const cancelResult = Dialog.open('cancel')
  await nextTick()
  await trigger(document.querySelector('.mp-dialog__cancel-button'), 'click')
  await expect(cancelResult).resolves.toBe('cancel')
})

test('supports overriding functional presentation', async () => {
  const result = Dialog.open({ message: 'general content', simple: false, closable: true })
  await nextTick()
  expect(document.querySelector('.mp-dialog--simple')).toBeFalsy()
  await trigger(document.querySelector('.mp-dialog__close-button'), 'click')
  await expect(result).resolves.toBe('close')
})

test('keeps functional defaults when beforeClose is configured', async () => {
  const result = Dialog.open({
    message: '正在提交',
    beforeClose(action, done, refs) {
      if (action !== 'confirm') {
        return done()
      }
      refs.confirmButtonLoading.value = true
      Promise.resolve().then(done)
    },
  })
  await nextTick()
  expect(document.querySelector('.mp-dialog--simple')).toBeTruthy()
  expect(document.querySelector('.mp-dialog__close-button')).toBeFalsy()
  await trigger(document.querySelector('.mp-dialog__confirm-button'), 'click')
  await expect(result).resolves.toBe('confirm')
})

test.each(['open', 'confirm', 'alert', 'info', 'success', 'warning', 'error'])(
  '%s uses simple layout and hides the close button by default',
  async (method) => {
    const result = Dialog[method]('message')
    await nextTick()
    expect(document.querySelector('.mp-dialog--simple')).toBeTruthy()
    expect(document.querySelector('.mp-dialog__close-button')).toBeFalsy()
    result.close()
    await expect(result).resolves.toBe('close')
  },
)

test('semantic methods apply their type', async () => {
  for (const type of ['info', 'success', 'warning', 'error']) {
    const result = Dialog[type]('message')
    await nextTick()
    expect(document.querySelector(`.mp-dialog--type-${type}`)).toBeTruthy()
    result.close()
    await finishServiceTransitions()
  }
})

test('setDefaultOptions and resetDefaultOptions work', async () => {
  const onConfirm = vi.fn()
  Dialog.setDefaultOptions({ onConfirm, title: 'Default title' })
  let result = Dialog.open('message')
  await nextTick()
  expect(document.querySelector('.mp-dialog__title')?.textContent).toContain('Default title')
  await trigger(document.querySelector('.mp-dialog__confirm-button'), 'click')
  await result
  expect(onConfirm).toHaveBeenCalledTimes(1)
  await finishServiceTransitions()

  Dialog.resetDefaultOptions()
  result = Dialog.open('message')
  await nextTick()
  expect(document.querySelector('.mp-dialog__title-content')).toBeFalsy()
  result.close()
})

test('beforeClose delays promise resolution', async () => {
  let done
  const result = Dialog.confirm({ message: 'confirm', beforeClose: (_action, next) => (done = next) })
  await nextTick()
  await trigger(document.querySelector('.mp-dialog__confirm-button'), 'click')
  let resolved = false
  result.then(() => (resolved = true))
  await flushPromises()
  expect(resolved).toBe(false)
  done()
  await expect(result).resolves.toBe('confirm')
})
