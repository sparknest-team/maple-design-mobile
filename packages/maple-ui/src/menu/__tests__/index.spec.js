import { createApp, Fragment, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Menu from '..'
import MenuOption from '../../menu-option'
import VarMenuOption from '../../menu-option/MenuOption'
import { delay, mockStubs, trigger, triggerKeyboard } from '../../utils/test'
import VarMenu from '../Menu'

test('menu plugin', () => {
  const app = createApp({}).use(Menu)
  expect(app.component(Menu.name)).toBeTruthy()
})

test('menu cedar-compatible api', async () => {
  const root = document.createElement('div')
  const onOpenChange = vi.fn()
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      placement: 'bottom-end',
      popupContainer: root,
      onOpenChange,
    },
    slots: {
      default: () => h('button', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option' }),
    },
  })

  expect(root.querySelector('.mp-menu-option')).toBeTruthy()
  wrapper.vm.close()
  await delay(0)
  expect(onOpenChange).toHaveBeenCalledWith(false)
  wrapper.unmount()
})

test('menu-option plugin', () => {
  const app = createApp({}).use(MenuOption)
  expect(app.component(MenuOption.name)).toBeTruthy()
})

test('menu size', () => {
  ;['normal', 'mini', 'small', 'large'].forEach((size) => {
    const root = document.createElement('div')
    const wrapper = mount(VarMenu, {
      props: {
        open: true,
        size,
        popupContainer: root,
      },
      slots: {
        default: () => h('div', 'trigger'),
        content: () => h(VarMenuOption, { label: 'Option' }),
      },
    })

    expect(root.innerHTML).toMatchSnapshot()
    expect(root.querySelector(`.mp-menu-option--${size}`)).toBeTruthy()
    wrapper.unmount()
  })
})

test('menu popupMaxHeight', () => {
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupMaxHeight: true,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option' }),
    },
  })
  expect(root.innerHTML).toMatchSnapshot()
  expect(root.querySelector('.mp-menu--max-height')).toBeTruthy()
  wrapper.unmount()
})

test('menu modelValue', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(Fragment, [h(VarMenuOption, { label: 'Option 1' }), h(VarMenuOption, { label: 'Option 2' })]),
    },
  })

  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(wrapper.vm.modelValue).toBe('Option 1')
  wrapper.unmount()
})

test('menu multiple', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: [],
      multiple: true,
      open: true,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(Fragment, [h(VarMenuOption, { label: 'Option 1' }), h(VarMenuOption, { label: 'Option 2' })]),
    },
  })

  await delay(0)
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(wrapper.vm.modelValue).toStrictEqual(['Option 1'])
  wrapper.unmount()
})

test('menu hideOnSelect', async () => {
  const onUpdateShow = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      'onUpdate:open': onUpdateShow,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1' }),
    },
  })

  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(onUpdateShow).toBeCalledTimes(1)
  expect(onUpdateShow).toHaveBeenLastCalledWith(false)

  onUpdateShow.mockClear()

  await wrapper.setProps({ hideOnSelect: false })
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(onUpdateShow).toBeCalledTimes(0)

  wrapper.unmount()
})

test('menu-option disabled', async () => {
  const onUpdateModelValue = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', disabled: true }),
    },
  })

  expect(root.innerHTML).toMatchSnapshot()
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(onUpdateModelValue).toBeCalledTimes(0)
  wrapper.unmount()
})

test('menu value mapping', async () => {
  const onUpdateModelValue = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', value: 1 }),
    },
  })

  expect(root.innerHTML).toMatchSnapshot()
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(onUpdateModelValue).toBeCalledTimes(1)
  expect(onUpdateModelValue).toHaveBeenCalledWith(1)
  wrapper.unmount()
})

test('menu-option default slot', () => {
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1' }, { default: () => h('div', 'option slot') }),
    },
  })

  expect(root.innerHTML).toMatchSnapshot()
  wrapper.unmount()
})

test('menu methods', async () => {
  const { mockRestore } = mockStubs()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1' }),
    },
  })
  await delay(0)
  wrapper.vm.open()
  await delay(0)
  expect(root.innerHTML).toMatchSnapshot()
  wrapper.vm.close()
  wrapper.vm.resize()
  await delay(100)
  expect(root.innerHTML).toMatchSnapshot()
  wrapper.unmount()
  mockRestore()
})

test('menu keyboard ArrowDown and Enter', async () => {
  const { mockRestore } = mockStubs()
  const onUpdateModelValue = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', value: 1 }),
    },
  })

  await triggerKeyboard(window, 'keydown', { key: 'ArrowDown' })
  await trigger(root.querySelector('.mp-menu-option'), 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(onUpdateModelValue).toBeCalledTimes(1)
  expect(onUpdateModelValue).toHaveBeenCalledWith(1)

  mockRestore()
  wrapper.unmount()
})

test('menu keyboard ArrowUp and Enter', async () => {
  const { mockRestore } = mockStubs()
  const onUpdateModelValue = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', value: 1 }),
    },
  })

  await triggerKeyboard(window, 'keydown', { key: 'ArrowUp' })
  await trigger(root.querySelector('.mp-menu-option'), 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(onUpdateModelValue).toBeCalledTimes(1)
  expect(onUpdateModelValue).toHaveBeenCalledWith(1)

  mockRestore()
  wrapper.unmount()
})

test('menu keyboard Escape', async () => {
  const { mockRestore } = mockStubs()
  const onUpdateShow = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      'onUpdate:open': onUpdateShow,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', value: 1 }),
    },
  })

  await triggerKeyboard(window, 'keydown', { key: 'Escape' })
  expect(onUpdateShow).toBeCalledTimes(1)
  expect(onUpdateShow).toHaveBeenCalledWith(false)

  mockRestore()
  wrapper.unmount()
})

test('menu options api', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      options: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: () => h('div', { class: 'container' }, 'Option 2'),
          value: 2,
        },
      ],
    },
    slots: {
      default: () => h('div', 'trigger'),
    },
  })

  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(root.querySelector('.container').textContent).toBe('Option 2')
  expect(wrapper.vm.modelValue).toBe(1)
  wrapper.unmount()
})

test('menu multiple options api', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      options: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
        {
          label: 'Option 3',
          value: 3,
        },
      ],
      multiple: true,
    },
    slots: {
      default: () => h('div', 'trigger'),
    },
  })

  await delay(0)
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(wrapper.vm.modelValue).toStrictEqual([1])
  wrapper.unmount()
})

test('menu field-names label', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      options: [
        {
          name: 'Option 1',
        },
        {
          name: 'Option 2',
        },
        {
          name: 'Option 3',
        },
      ],
      fieldNames: { label: 'name' },
    },
    slots: {
      default: () => h('div', 'trigger'),
    },
  })

  await delay(0)
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(wrapper.vm.modelValue).toStrictEqual('Option 1')
  wrapper.unmount()
})

test('menu field-names value', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      options: [
        {
          label: 'Option 1',
          id: 1,
        },
        {
          label: 'Option 2',
          id: 2,
        },
        {
          label: 'Option 3',
          id: 3,
        },
      ],
      fieldNames: { value: 'id' },
    },
    slots: {
      default: () => h('div', 'trigger'),
    },
  })

  await delay(0)
  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(wrapper.vm.modelValue).toStrictEqual(1)
  wrapper.unmount()
})

test('menu cascade', async () => {
  const root = document.createElement('div')

  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })

  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      options: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
          children: [
            {
              label: 'Option 2-1',
              value: 21,
            },
            {
              label: 'Option 2-2',
              value: 22,
            },
          ],
        },
        {
          label: 'Option 3',
          value: 3,
          disabled: true,
        },
      ],
    },
    slots: {
      default: () => h('button', { class: 'trigger' }, 'trigger'),
    },
  })

  await delay(0)
  expect(root.innerHTML).toMatchSnapshot()

  const button = wrapper.find('.trigger')
  await button.trigger('click')

  const options = root.querySelectorAll('.mp-menu-option')
  const option2 = options[1]
  await trigger(option2, 'mouseenter')
  const option21 = options[2]
  await trigger(option21, 'click')
  expect(wrapper.vm.modelValue).toStrictEqual(21)
})

test('menu cascade multiple mode', async () => {
  const root = document.createElement('div')

  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })

  const wrapper = mount(VarMenu, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      multiple: true,
      options: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
          children: [
            {
              label: 'Option 2-1',
              value: 21,
            },
            {
              label: 'Option 2-2',
              value: 22,
              children: [
                {
                  label: 'Option 2-2-1',
                  value: 221,
                },
                {
                  label: 'Option 2-2-2',
                  value: 222,
                },
              ],
            },
          ],
        },
        {
          label: 'Option 3',
          value: 3,
          disabled: true,
        },
      ],
    },
    slots: {
      default: () => h('button', { class: 'trigger' }, 'trigger'),
    },
  })

  await delay(0)
  expect(root.innerHTML).toMatchSnapshot()

  const button = wrapper.find('.trigger')
  await button.trigger('click')

  const options = root.querySelectorAll('.mp-menu-option')
  const option2 = options[1]
  await trigger(option2, 'mouseenter')
  const option21 = options[2]
  const option22 = options[3]
  const option221 = options[4]
  const option222 = options[5]
  await trigger(option21, 'click')
  await trigger(option22, 'mouseenter')
  await trigger(option221, 'click')
  expect(wrapper.vm.modelValue).toStrictEqual([21, 221])
  await trigger(option222, 'click')
  expect(wrapper.vm.modelValue).toStrictEqual([2, 21, 22, 221, 222])
  await trigger(option222, 'click')
  expect(wrapper.vm.modelValue).toStrictEqual([21, 221])
  await trigger(option222, 'focus')
  await triggerKeyboard(window, 'keyup', { key: ' ' })
  expect(wrapper.vm.modelValue).toStrictEqual([2, 21, 22, 221, 222])

  const checkbox = option222.querySelector('.mp-checkbox')
  await trigger(checkbox, 'click')
  await delay(0)
  expect(wrapper.vm.modelValue).toStrictEqual([21, 221])
  await trigger(option2, 'click')
  expect(wrapper.vm.modelValue).toStrictEqual([])
})

test('menu cascade menu open and close', async () => {
  const root = document.createElement('div')

  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })

  const wrapper = mount(VarMenu, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      multiple: true,
      options: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
          children: [
            {
              label: 'Option 2-1',
              value: 21,
            },
            {
              label: 'Option 2-2',
              value: 22,
              children: [
                {
                  label: 'Option 2-2-1',
                  value: 221,
                },
                {
                  label: 'Option 2-2-2',
                  value: 222,
                },
              ],
            },
          ],
        },
        {
          label: 'Option 3',
          value: 3,
          disabled: true,
        },
      ],
    },
    slots: {
      default: () => h('button', { class: 'trigger' }, 'trigger'),
    },
  })

  await delay(0)
  expect(root.innerHTML).toMatchSnapshot()

  const button = wrapper.find('.trigger')
  await button.trigger('click')

  const options = root.querySelectorAll('.mp-menu-option')
  const menus = root.querySelectorAll('.mp-trigger__popup')
  const option1 = options[0]
  const option2 = options[1]
  const option21 = options[2]
  const option2Menu = menus[1]
  await trigger(option2, 'focus')
  expect(option2Menu.style.display).toBe('none')
  await triggerKeyboard(window, 'keydown', { key: 'ArrowRight' })
  expect(option2Menu.style.display).not.toBe('none')
  await trigger(option21, 'focus')
  await triggerKeyboard(window, 'keydown', { key: 'ArrowLeft' })
  expect(option2Menu.style.display).toBe('none')

  await trigger(option2, 'mouseenter')
  expect(option2Menu.style.display).not.toBe('none')
  await trigger(option21, 'mouseenter')
  await trigger(option21, 'mouseleave')
  expect(option2Menu.style.display).not.toBe('none')
  await trigger(option1, 'mouseenter')
  expect(option2Menu.style.display).toBe('none')
})

test('menu cascade fieldNames', async () => {
  const onUpdateModelValue = vi.fn((value) => {
    wrapper.setProps({ modelValue: value })
  })
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      modelValue: undefined,
      'onUpdate:modelValue': onUpdateModelValue,
      popupContainer: root,
      fieldNames: { label: 'name', value: 'id', children: 'items', disabled: 'off' },
      options: [
        {
          name: 'Option 1',
          id: 1,
        },
        {
          name: 'Option 2',
          id: 2,
          items: [
            {
              name: 'Option 2-1',
              id: 21,
            },
            {
              name: 'Option 2-2',
              id: 22,
              off: true,
            },
          ],
        },
      ],
    },
    slots: {
      default: () => h('button', { class: 'trigger' }, 'trigger'),
    },
  })

  await delay(0)
  const button = wrapper.find('.trigger')
  await button.trigger('click')
  const options = root.querySelectorAll('.mp-menu-option')
  await trigger(options[1], 'mouseenter')
  await trigger(options[2], 'click')
  expect(wrapper.vm.modelValue).toBe(21)
  await trigger(options[3], 'click')
  expect(wrapper.vm.modelValue).toBe(21)
  wrapper.unmount()
})

test('menu controlled open false closes menu', async () => {
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
    },
    slots: {
      default: () => h('button', { class: 'trigger' }, 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1' }),
    },
  })

  await delay(0)
  expect(wrapper.vm.computedOpen).toBe(true)
  await wrapper.setProps({ open: false })
  await delay(0)
  expect(wrapper.vm.computedOpen).toBe(false)
  wrapper.unmount()
})

test('menu select emits value option event', async () => {
  const onSelect = vi.fn()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
      onSelect,
    },
    slots: {
      default: () => h('div', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option 1', value: 1 }),
    },
  })

  await trigger(root.querySelector('.mp-menu-option'), 'click')
  expect(onSelect).toBeCalledTimes(1)
  expect(onSelect.mock.calls[0][0]).toBe(1)
  expect(onSelect.mock.calls[0][1]).toMatchObject({ label: 'Option 1', value: 1 })
  expect(onSelect.mock.calls[0][2]).toBeInstanceOf(Event)
  wrapper.unmount()
})

test('menu default placement is bottom', async () => {
  const { mockRestore } = mockStubs()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    props: {
      open: true,
      popupContainer: root,
    },
    slots: {
      default: () => h('button', 'trigger'),
      content: () => h(VarMenuOption, { label: 'Option' }),
    },
  })

  await delay(300)
  expect(root.querySelector('[data-popper-placement]')?.getAttribute('data-popper-placement')).toBe('bottom')
  wrapper.unmount()
  mockRestore()
})

test('menu contextMenu trigger', async () => {
  const { mockRestore } = mockStubs()
  const root = document.createElement('div')
  const wrapper = mount(VarMenu, {
    attachTo: document.body,
    props: {
      trigger: 'contextMenu',
      alignPoint: true,
      popupContainer: root,
    },
    slots: {
      default: () => h('div', { class: 'area' }, 'area'),
      content: () => h(VarMenuOption, { label: 'Option' }),
    },
  })

  await wrapper.trigger('contextmenu')
  await delay(300)
  expect(root.querySelector('.mp-menu-option')).toBeTruthy()
  wrapper.unmount()
  mockRestore()
})
