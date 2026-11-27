import { createApp } from 'vue'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Picker from '..'
import { trigger } from '../../utils/test'
import VarPicker from '../Picker'
import { setRenderedTranslations } from './rendered-translation'

beforeEach(() => vi.useFakeTimers())
afterEach(async () => {
  Picker.close()
  await vi.runAllTimersAsync()
  document.body.innerHTML = ''
  vi.useRealTimers()
})

test('picker plugin', () => {
  const app = createApp({}).use(Picker)
  expect(app.component(VarPicker.name)).toBeTruthy()
})

const columns = [[{ text: 'A' }, { text: 'B' }, { text: 'C' }]]

test('picker functional show & close', async () => {
  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()

  Picker({
    columns,
    onOpen,
    onOpened,
    onClose,
    onClosed,
  })

  await vi.advanceTimersByTimeAsync(16)
  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.mp-popup').style.display).toBe('')

  await vi.runAllTimersAsync()
  expect(onOpened).toHaveBeenCalledTimes(1)

  Picker.close()
  await vi.advanceTimersByTimeAsync(16)
  expect(onClose).toHaveBeenCalledTimes(1)

  await vi.runAllTimersAsync()
  expect(document.querySelector('.mp-popup')).toBeFalsy()
  expect(onClosed).toHaveBeenCalledTimes(1)
})

test('picker functional confirm', async () => {
  const onConfirm = vi.fn()

  Picker({
    columns,
    onConfirm,
  })
  await vi.runAllTimersAsync()
  setRenderedTranslations(document.body)
  await trigger(document.querySelector('.mp-picker__confirm-button'), 'click')
  expect(onConfirm).toHaveBeenCalledTimes(1)
  expect(onConfirm).toBeCalledWith(['A'], [0], [{ text: 'A' }])

  await vi.runAllTimersAsync()
})

test('picker functional cancel', async () => {
  const onCancel = vi.fn()

  Picker({
    columns,
    onCancel,
  })
  await vi.runAllTimersAsync()

  setRenderedTranslations(document.body)
  await trigger(document.querySelector('.mp-picker__cancel-button'), 'click')
  expect(onCancel).toHaveBeenCalledTimes(1)
  expect(onCancel).toBeCalledWith(['A'], [0], [{ text: 'A' }])

  await vi.runAllTimersAsync()
})

test('safe area', async () => {
  Picker({
    columns,
    safeArea: true,
  })
  await vi.runAllTimersAsync()

  expect(document.body.innerHTML).toMatchSnapshot()

  setRenderedTranslations(document.body)
  await trigger(document.querySelector('.mp-picker__cancel-button'), 'click')
  await vi.runAllTimersAsync()
})
