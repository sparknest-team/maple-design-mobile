import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import FloatingPanel from '..'
import { triggerDrag } from '../../utils/test'
import VarFloatingPanel from '../FloatingPanel.vue'

test('floating-panel plugin', () => {
  const app = createApp({}).use(FloatingPanel)
  expect(app.component(FloatingPanel.name)).toBeTruthy()
})

describe('test floating-panel components props', () => {
  test('floating-panel anchor', async () => {
    const onUpdateAnchor = vi.fn()
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        modelValue: 100,
        anchors: [100, 200],
        popupContainer: root,
        'onUpdate:modelValue': onUpdateAnchor,
      },
    })

    const panel = root.querySelector('.mp-floating-panel')

    await triggerDrag(panel, 0, 50)
    expect(onUpdateAnchor).toHaveBeenCalledTimes(0)
    expect(panel.outerHTML).toMatchSnapshot()

    await triggerDrag(panel, 0, -200)
    expect(onUpdateAnchor).toHaveBeenCalledTimes(1)
    expect(onUpdateAnchor).toHaveBeenCalledWith(200)
    expect(panel.outerHTML).toMatchSnapshot()

    await triggerDrag(panel, 0, 100)
    expect(onUpdateAnchor).toHaveBeenCalledTimes(2)
    expect(onUpdateAnchor).toHaveBeenCalledWith(100)
    expect(panel.outerHTML).toMatchSnapshot()

    await triggerDrag(panel, 0, -80)
    expect(onUpdateAnchor).toHaveBeenCalledTimes(3)
    expect(onUpdateAnchor).toHaveBeenCalledWith(200)
    expect(panel.outerHTML).toMatchSnapshot()

    wrapper.unmount()
  })

  test('floating-panel anchors changed', async () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        modelValue: 100,
        anchors: [100, 200],
        popupContainer: root,
      },
    })

    const panel = root.querySelector('.mp-floating-panel')

    expect(panel.outerHTML).toMatchSnapshot()

    await wrapper.setProps({
      anchors: [50, 200],
    })

    expect(panel.outerHTML).toMatchSnapshot()
    wrapper.unmount()
  })

  test('floating-panel contentDraggable', async () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        modelValue: 100,
        anchors: [100, 200],
        contentDraggable: true,
        popupContainer: root,
      },
    })

    const panel = root.querySelector('.mp-floating-panel')
    const content = root.querySelector('.mp-floating-panel__content')

    await triggerDrag(content, 0, 50)
    expect(panel.outerHTML).toMatchSnapshot()

    await triggerDrag(content, 0, -100)
    expect(panel.outerHTML).toMatchSnapshot()

    await wrapper.setProps({ contentDraggable: false })
    await triggerDrag(content, 0, 100)
    expect(panel.outerHTML).toMatchSnapshot()

    wrapper.unmount()
  })

  test('floating-panel safeArea', async () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        safeArea: true,
        popupContainer: root,
      },
    })

    expect(root.querySelector('.mp-floating-panel--safe-area')).toBeTruthy()
    await wrapper.setProps({
      safeArea: false,
    })
    expect(root.querySelector('.mp-floating-panel--safe-area')).toBeFalsy()
    wrapper.unmount()
  })

  test('floating-panel elevation', async () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        elevation: true,
        popupContainer: root,
      },
    })

    expect(root.querySelector('.mp-floating-panel').classList.contains('mp-elevation--3')).toBe(true)

    await wrapper.setProps({
      elevation: false,
    })

    expect(root.querySelector('.mp-floating-panel').classList.contains('mp-elevation--3')).toBe(false)

    wrapper.unmount()
  })

  test('floating-panel duration', () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        popupContainer: root,
        duration: 0.4,
      },
    })

    expect(root.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })
})

describe('test floating-panel component slots', () => {
  test('floating-panel component default slot', () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        popupContainer: root,
      },
      slots: { default: () => 'Hello Maple!' },
    })

    expect(root.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })

  test('floating-panel component header slot', () => {
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        popupContainer: root,
      },
      slots: { header: () => 'Hello Maple!' },
    })

    expect(root.innerHTML).toMatchSnapshot()

    wrapper.unmount()
  })
})

describe('test floating-panel component events', () => {
  test('floating-panel component onHeightChange', async () => {
    const onHeightChange = vi.fn()
    const root = document.createElement('div')
    const wrapper = mount(VarFloatingPanel, {
      props: {
        modelValue: 100,
        anchors: [100, 200],
        popupContainer: root,
        onHeightChange,
      },
    })

    const panel = root.querySelector('.mp-floating-panel')

    await triggerDrag(panel, 0, 50)
    expect(onHeightChange).toHaveBeenCalledTimes(0)

    await triggerDrag(panel, 0, -200)
    expect(onHeightChange).toHaveBeenCalledTimes(1)
    expect(onHeightChange).toHaveBeenCalledWith(200)

    await triggerDrag(panel, 0, 100)
    expect(onHeightChange).toHaveBeenCalledTimes(2)
    expect(onHeightChange).toHaveBeenCalledWith(100)

    await triggerDrag(panel, 0, -80)
    expect(onHeightChange).toHaveBeenCalledTimes(3)
    expect(onHeightChange).toHaveBeenCalledWith(200)

    wrapper.unmount()
  })
})

test('defaultValue initializes once and height takes precedence without initialization updates', async () => {
  const root = document.createElement('div')
  const update = vi.fn()
  const wrapper = mount(VarFloatingPanel, {
    props: { defaultValue: 200, anchors: [100, 200, 300], popupContainer: root, 'onUpdate:modelValue': update },
  })
  try {
    const panel = root.querySelector('.mp-floating-panel')
    expect(panel.style.transform).toContain('200px')
    expect(update).not.toHaveBeenCalled()
    await wrapper.setProps({ defaultValue: 300 })
    expect(panel.style.transform).toContain('200px')
    await triggerDrag(panel, 0, 100)
    expect(update).toHaveBeenLastCalledWith(100)
    expect(wrapper.emitted('height-change')).toEqual([[100]])
    await wrapper.setProps({ modelValue: 300 })
    expect(panel.style.transform).toContain('300px')
    expect(update).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
  }
})
