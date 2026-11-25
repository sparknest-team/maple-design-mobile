import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Drag from '..'
import { delay, trigger, triggerDrag } from '../../utils/test'

test('drag plugin', () => {
  const app = createApp({}).use(Drag)
  expect(app.component(Drag.name)).toBeTruthy()
})

test('preserves inline CSS through dragging and restores the original inset on reset', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: { popupContainer: container },
    attrs: { style: 'left: 12px; color: red; --handle-size: 8px' },
  })
  try {
    await delay()
    const handle = container.querySelector('.mp-drag')
    expect(handle.style.left).toBe('12px')
    await triggerDrag(handle, 10, 10)
    expect(handle.style.transform).toContain('translate(')
    expect(handle.style.color).toBe('red')
    wrapper.vm.reset()
    await delay()
    expect(handle.style.left).toBe('12px')
    expect(handle.style.getPropertyValue('--handle-size')).toBe('8px')
  } finally {
    wrapper.unmount()
  }
})

test('drag direction', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: {
      popupContainer: container,
    },
  })

  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  await wrapper.setProps({ axis: 'x' })
  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  await wrapper.setProps({ axis: 'y' })
  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('drag attraction', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: {
      popupContainer: container,
      attraction: 'x',
    },
  })
  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  await wrapper.setProps({ attraction: 'y' })
  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  await wrapper.setProps({ attraction: 'xy' })
  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('drag disabled', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: {
      disabled: true,
      popupContainer: container,
    },
  })

  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('drag stays inside its positioned parent when teleport is disabled', async () => {
  const wrapper = mount({
    components: { [Drag.name]: Drag },
    template: '<div style="position: relative"><mp-drag :popup-container="false" /></div>',
  })

  expect(wrapper.find('.mp-drag').classes()).toContain('mp-drag--local')
  expect(wrapper.find('.mp-drag').element.parentElement).toBe(wrapper.element)

  wrapper.unmount()
})

test('drag boundary', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: {
      popupContainer: container,
      boundary: {
        top: 10,
        left: 10,
      },
    },
  })

  const el = container.childNodes[1]
  await trigger(el, 'touchstart', 0, 0)
  await trigger(el, 'touchmove', 1, 1)
  await trigger(el, 'touchend', 1, 1)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('drag reset', async () => {
  const container = document.createElement('div')
  const wrapper = mount(Drag, {
    props: {
      popupContainer: container,
    },
  })

  await triggerDrag(container.childNodes[1], 10, 10)
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.vm.reset()
  await delay()
  expect(container.innerHTML).toMatchSnapshot()

  wrapper.unmount()
})

test('drag click method', async () => {
  const container = document.createElement('div')
  const onClick = vi.fn()

  const wrapper = mount(Drag, {
    props: {
      popupContainer: container,
      onClick,
    },
  })

  await trigger(container.childNodes[1], 'click')
  expect(onClick).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})
