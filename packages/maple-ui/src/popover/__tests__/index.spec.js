import { createApp } from 'vue'
import { doubleRaf } from '@maplejs/maple-shared'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Popover from '..'
import { delay, mockStubs, trigger, triggerKeyboard } from '../../utils/test'
import VarPopover from '../Popover'

const mountPopover = (options = {}) =>
  mount(VarPopover, {
    ...options,
    slots: { default: '<button class="reference">reference</button>', ...options.slots },
  })

test('popover plugin', () => {
  const app = createApp({}).use(Popover)
  expect(app.component(Popover.name)).toBeTruthy()
})

test('popover content slot', () => {
  const root = document.createElement('div')
  const wrapper = mountPopover({
    props: {
      open: true,
      popupContainer: root,
    },
    slots: {
      content: 'Popover content',
    },
  })

  expect(root.querySelector('.mp-popover__content')?.textContent).toBe('Popover content')
  wrapper.unmount()
})

test('popover placement', () => {
  ;[
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
    'cover-top',
    'cover-top-start',
    'cover-top-end',
    'cover-bottom',
    'cover-bottom-start',
    'cover-bottom-end',
    'cover-left',
    'cover-right',
  ].forEach((placement) => {
    const { mockRestore } = mockStubs()

    const root = document.createElement('div')

    const wrapper = mountPopover({
      props: {
        placement,
        popupContainer: root,
      },
    })

    expect(root.innerHTML).toMatchSnapshot()

    wrapper.unmount()
    mockRestore()
  })
})

test('popover click trigger', async () => {
  const { mockRestore } = mockStubs()

  const wrapper = mountPopover({
    attachTo: document.body,
  })

  await wrapper.get('.reference').trigger('click')
  await delay(300)
  expect(document.body.innerHTML).toMatchSnapshot()

  await trigger(document, 'click')
  await delay(300)
  expect(document.body.innerHTML).toMatchSnapshot()

  document.body.innerHTML = ''

  mockRestore()
})

test('popover manual trigger', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountPopover({
    props: {
      trigger: 'manual',
      popupContainer: root,
    },
  })

  await doubleRaf()
  await wrapper.get('.reference').trigger('click')
  await trigger(root.querySelector('.mp-popover__content'), 'mouseenter')
  await delay(300)
  expect(root.innerHTML).toMatchSnapshot()

  mockRestore()
})

test('popover hover trigger and events', async () => {
  const { mockRestore } = mockStubs()

  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()

  const root = document.createElement('div')

  const wrapper = mountPopover({
    props: {
      trigger: 'hover',
      popupContainer: root,
      onOpen,
      onOpened,
      onClose,
      onClosed,
    },
  })

  await wrapper.get('.reference').trigger('mouseenter')
  expect(onOpen).toHaveBeenCalledTimes(1)

  await delay(300)

  expect(onOpened).toHaveBeenCalledTimes(1)
  expect(root.innerHTML).toMatchSnapshot()

  await wrapper.get('.reference').trigger('mouseleave')

  await doubleRaf()
  await delay(0)
  expect(onClose).toHaveBeenCalledTimes(1)
  await delay(300)

  expect(onClosed).toHaveBeenCalledTimes(1)
  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})

test('popover close on escape', async () => {
  const { mockRestore } = mockStubs()

  const onClose = vi.fn()

  const root = document.createElement('div')

  const wrapper = mountPopover({
    props: {
      popupContainer: root,
      open: true,
      onClose,
    },
  })

  await wrapper.get('.reference').trigger('mouseenter')
  await triggerKeyboard(window, 'keydown', { key: 'Escape' })

  await doubleRaf()
  await delay(0)
  expect(onClose).toHaveBeenCalledTimes(1)

  wrapper.unmount()
  mockRestore()
})

test('popover default style', async () => {
  const root = document.createElement('div')

  mountPopover({
    props: {
      defaultStyle: false,
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()
})

test('popover offset', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  mountPopover({
    props: {
      offsetX: 100,
      offsetY: 100,
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()

  mockRestore()
})

test('popover hover the popover content', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  mountPopover({
    props: {
      open: true,
      trigger: 'hover',
      popupContainer: root,
    },
  })

  await doubleRaf()
  await trigger(root.querySelector('.mp-popover__content'), 'mouseenter')
  await trigger(root.querySelector('.mp-popover__content'), 'mouseleave')
  await delay(300)
  expect(root.innerHTML).toMatchSnapshot()

  mockRestore()
})

test('popover same width', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  mount(VarPopover, {
    props: {
      open: true,
      sameWidth: true,
      trigger: 'hover',
      popupContainer: root,
    },
  })

  await doubleRaf()
  expect(root.innerHTML).toMatchSnapshot()

  mockRestore()
})

test('popover elevation', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountPopover({
    props: {
      open: true,
      elevation: false,
      popupContainer: root,
    },
  })

  await doubleRaf()
  expect(root.innerHTML).toMatchSnapshot()
  await wrapper.setProps({
    elevation: 10,
  })
  expect(root.innerHTML).toMatchSnapshot()

  mockRestore()
  wrapper.unmount()
})

test('popover contextMenu trigger', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')
  const wrapper = mountPopover({
    attachTo: document.body,
    props: {
      trigger: 'contextMenu',
      alignPoint: true,
      popupContainer: root,
    },
    slots: {
      content: 'Popover content',
    },
  })

  await wrapper.get('.reference').trigger('contextmenu')
  await delay(300)
  expect(root.querySelector('.mp-popover__content')?.textContent).toBe('Popover content')

  wrapper.unmount()
  mockRestore()
})
