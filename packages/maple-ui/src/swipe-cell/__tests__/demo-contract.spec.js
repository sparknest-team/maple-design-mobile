import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import SwipeCell from '..'
import Button from '../../button'
import Cell from '../../cell'
import BeforeCloseDemo from '../example/demos/before-close.vue'

const { dialog } = vi.hoisted(() => ({ dialog: vi.fn() }))
vi.mock('@maple-design/ui', () => ({ Dialog: { confirm: dialog } }))
const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  dialog.mockReset()
})

test.each(['confirm', 'cancel', 'close'])(
  'actual confirmation demo only allows confirm, not %s implicitly',
  async (action) => {
    dialog.mockResolvedValue(action)
    const wrapper = mount(BeforeCloseDemo, {
      global: { components: { MpSwipeCell: SwipeCell, MpButton: Button, MpCell: Cell } },
    })
    wrappers.push(wrapper)
    const beforeClose = wrapper.findComponent(SwipeCell).props('beforeClose')
    expect(await beforeClose({ position: 'right' })).toBe(action === 'confirm')
    expect(dialog).toHaveBeenCalledWith({ title: '确认删除？' })
  },
)

test('clicking the cell or outside does not ask for deletion confirmation', async () => {
  const wrapper = mount(BeforeCloseDemo, {
    global: { components: { MpSwipeCell: SwipeCell, MpButton: Button, MpCell: Cell } },
  })
  wrappers.push(wrapper)
  const beforeClose = wrapper.findComponent(SwipeCell).props('beforeClose')
  expect(await beforeClose({ position: 'cell' })).toBe(true)
  expect(await beforeClose({ position: 'outside' })).toBe(true)
  expect(dialog).not.toHaveBeenCalled()
})

test('dialog interaction does not close the swipe cell or open another pending confirmation', async () => {
  let resolveAction
  dialog.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveAction = resolve
      }),
  )
  const wrapper = mount(BeforeCloseDemo, {
    global: { components: { MpSwipeCell: SwipeCell, MpButton: Button, MpCell: Cell } },
  })
  wrappers.push(wrapper)
  const beforeClose = wrapper.findComponent(SwipeCell).props('beforeClose')
  const pending = beforeClose({ position: 'right' })
  expect(await beforeClose({ position: 'outside' })).toBe(false)
  expect(await beforeClose({ position: 'right' })).toBe(false)
  expect(dialog).toHaveBeenCalledTimes(1)
  resolveAction('cancel')
  expect(await pending).toBe(false)
  expect(await beforeClose({ position: 'outside' })).toBe(true)
})
