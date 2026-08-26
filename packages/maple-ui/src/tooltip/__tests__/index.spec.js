import { createApp } from 'vue'
import { doubleRaf } from '@maplejs/maple-shared'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import VarTooltip from '..'
import { delay, mockStubs, trigger } from '../../utils/test'

const mountTooltip = (options = {}) =>
  mount(VarTooltip, {
    ...options,
    slots: { default: '<button class="reference">reference</button>', ...options.slots },
  })

test('tooltip plugin', () => {
  const app = createApp({}).use(VarTooltip)
  expect(app.component(VarTooltip.name)).toBeTruthy()
})

test('tooltip placement', () => {
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
  ].forEach((placement) => {
    const { mockRestore } = mockStubs()
    const root = document.createElement('div')

    const wrapper = mountTooltip({
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

test('tooltip click trigger', async () => {
  const { mockRestore } = mockStubs()

  const wrapper = mountTooltip({
    attachTo: document.body,
    props: {
      trigger: 'click',
    },
  })

  await wrapper.get('.reference').trigger('click')
  await delay(300)
  expect(document.body.innerHTML).toMatchSnapshot()

  await trigger(document, 'click')
  await delay(300)
  expect(document.body.innerHTML).toMatchSnapshot()

  document.body.innerHTML = ''

  mockRestore()
  wrapper.unmount()
})

test('tooltip hover trigger and events', async () => {
  const { mockRestore } = mockStubs()

  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
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

test('tooltip type', () => {
  ;['default', 'primary', 'info', 'success', 'warning', 'danger'].forEach((type) => {
    const { mockRestore } = mockStubs()
    const root = document.createElement('div')

    const wrapper = mountTooltip({
      props: {
        type,
        popupContainer: root,
      },
    })

    expect(root.innerHTML).toMatchSnapshot()

    wrapper.unmount()
    mockRestore()
  })
})

test('tooltip content', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
      content: 'test tooltip',
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})

test('tooltip color', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
      color: '#000',
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})

test('tooltip text-color', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
      textColor: '#fff',
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})

test('tooltip offset', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
      offsetX: 100,
      offsetY: 100,
      popupContainer: root,
    },
  })

  await doubleRaf()

  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})

test('tooltip hover the tooltip list', async () => {
  const { mockRestore } = mockStubs()

  const root = document.createElement('div')

  const wrapper = mountTooltip({
    props: {
      open: true,
      trigger: 'hover',
      popupContainer: root,
    },
  })

  await doubleRaf()
  await trigger(root.querySelector('.mp-tooltip__tooltip'), 'mouseenter')
  await trigger(root.querySelector('.mp-tooltip__tooltip'), 'mouseleave')
  await delay(300)
  expect(root.innerHTML).toMatchSnapshot()

  wrapper.unmount()
  mockRestore()
})
