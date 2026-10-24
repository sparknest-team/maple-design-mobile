import { createApp, Fragment, h } from 'vue'
import { DOMWrapper, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Fab from '..'
import { delay, mockStubs, trigger, triggerDrag } from '../../utils/test'

mockStubs()

test('fab plugin', () => {
  const app = createApp({}).use(Fab)
  expect(app.component(Fab.name)).toBeTruthy()
})

test('fab drag', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      drag: false,
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  await wrapper.setProps({ drag: true })
  await triggerDrag(container.childNodes[0], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab type', () => {
  ;['default', 'primary', 'warning', 'info', 'danger', 'success'].forEach((type) => {
    const container = document.createElement('div')
    const wrapper = mount(Fab, {
      props: {
        popupContainer: container,
        type,
      },
    })

    expect(container.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })
})

test('fab position', () => {
  ;['left-top', 'right-top', 'left-bottom', 'right-bottom'].forEach((position) => {
    const container = document.createElement('div')
    const wrapper = mount(Fab, {
      props: {
        popupContainer: container,
        position,
      },
    })

    expect(container.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })
})

test('fab direction', () => {
  ;['top', 'right', 'bottom', 'left'].forEach((direction) => {
    const container = document.createElement('div')
    const wrapper = mount(Fab, {
      props: {
        popupContainer: container,
        direction,
      },
    })

    expect(container.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })
})

test('fab fixed equals false', () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      fixed: false,
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab zIndex and inset', () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      zIndex: 999,
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab color', () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      color: 'yellow',
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab trigger equals click', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  const actions = container.querySelector('.mp-fab__actions')
  const button = container.querySelector('.mp-button')

  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('none')

  await trigger(button, 'click')
  await delay(300)

  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('')

  await trigger(button, 'click')
  await delay(300)

  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('none')

  wrapper.unmount()
})

test('fab trigger equals hover', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      trigger: 'hover',
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  const actions = container.querySelector('.mp-fab__actions')
  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('none')

  await trigger(actions, 'mouseenter')
  await delay(300)

  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('')

  await trigger(actions, 'mouseleave')
  await delay(300)

  expect(container.innerHTML).toMatchSnapshot()
  expect(actions.style.display).toBe('none')

  wrapper.unmount()
})

test('fab custom icon', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      closedIcon: 'check',
      openIcon: 'fire',
      closedIconSize: 30,
      openIconSize: 30,
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })
  await delay(0)
  const button = container.querySelector('.mp-button')

  expect(container.innerHTML).toMatchSnapshot()

  await trigger(button, 'click')
  await delay(300)

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab disabled with trigger equals click', async () => {
  const onOpen = vi.fn()
  const container = document.createElement('div')

  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      disabled: true,
      onOpen,
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  const actions = container.querySelector('.mp-fab__actions')
  const button = container.querySelector('.mp-button')

  expect(actions.style.display).toBe('none')
  await trigger(button, 'click')
  expect(actions.style.display).toBe('none')
  expect(onOpen).toBeCalledTimes(0)

  wrapper.unmount()
})

test('fab disabled with trigger equals hover', async () => {
  const onOpen = vi.fn()
  const container = document.createElement('div')

  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      trigger: 'hover',
      disabled: true,
      onOpen,
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  const actions = container.querySelector('.mp-fab__actions')

  expect(actions.style.display).toBe('none')

  await trigger(actions, 'mouseenter')

  expect(actions.style.display).toBe('none')
  expect(onOpen).toBeCalledTimes(0)

  wrapper.unmount()
})

test('fab events and fragment default slots and click outside close', async () => {
  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()
  const onUpdateOpen = vi.fn()
  const container = document.createElement('div')

  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      onOpen,
      onOpened,
      onClose,
      onClosed,
      'onUpdate:open': onUpdateOpen,
    },
    slots: {
      default: () => h(Fragment, {}, [h('div', 'action'), h('div', 'action'), h('div', 'action')]),
    },
  })

  const button = container.querySelector('.mp-button')
  expect(container.innerHTML).toMatchSnapshot()
  // Test Utils timestamps synthetic clicks after Vue's listener attachment tick.
  await new DOMWrapper(button).trigger('click')

  expect(onOpen).toBeCalledTimes(1)
  expect(onUpdateOpen).toBeCalledWith(true)
  await delay(300)
  expect(onOpened).toBeCalledTimes(1)

  await trigger(document, 'click')
  expect(onClose).toBeCalledTimes(1)
  expect(onUpdateOpen).toBeCalledWith(false)
  await delay(300)
  expect(onClosed).toBeCalledTimes(1)

  wrapper.unmount()
})

test('fab trigger and disabled change', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      open: true,
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  const actions = container.querySelector('.mp-fab__actions')

  expect(actions.style.display).toBe('')
  await wrapper.setProps({ trigger: 'hover' })
  await delay(300)
  expect(wrapper.emitted('update:open').at(-1)).toEqual([false])
  expect(actions.style.display).toBe('')
  await wrapper.setProps({ open: false })
  await wrapper.setProps({ open: true })
  expect(actions.style.display).toBe('')
  await wrapper.setProps({ disabled: true })
  await delay(300)
  expect(wrapper.emitted('update:open').at(-1)).toEqual([false])
  await wrapper.setProps({ open: false })
  await delay(300)
  expect(actions.style.display).toBe('none')

  wrapper.unmount()
})

test('fab trigger slot', () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
    },
    slots: {
      trigger: () => h('div', 'trigger'),
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('fab teleport', () => {
  const wrapper = mount(Fab, {
    props: {
      popupContainer: 'body',
    },
    slots: {
      default: () => h('div', 'action'),
    },
  })

  expect(document.body.innerHTML).toMatchSnapshot()
  wrapper.unmount()
})

test('fab safeArea', () => {
  const container = document.createElement('div')
  const wrapper = mount(Fab, {
    props: {
      popupContainer: container,
      safeArea: true,
    },
  })

  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})
