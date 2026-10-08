import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Trigger from '..'

const slots = {
  default: () => h('button', { 'data-reference': '' }, 'reference'),
  content: () => h('button', { 'data-panel': '' }, 'panel'),
}
const tick = async () => {
  await nextTick()
  await nextTick()
}
const mouse = (node, type) => node.dispatchEvent(new MouseEvent(type, { bubbles: type === 'click' }))
const escape = () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

describe('Trigger shared interaction contract', () => {
  test('opening a sibling closes the previous popup before the new layer becomes topmost', async () => {
    const wrapper = mount(
      {
        render: () =>
          h(
            'div',
            [0, 1, 2].map(() => h(Trigger, { trigger: 'click', popupContainer: false }, slots)),
          ),
      },
      { attachTo: document.body },
    )
    try {
      const triggers = wrapper.findAllComponents(Trigger)
      for (let index = 0; index < triggers.length; index++) {
        mouse(triggers[index].get('[data-reference]').element, 'click')
        await tick()
        expect(triggers[index].emitted('update:open')).toEqual([[true]])
        if (index) {
          expect(triggers[index - 1].emitted('update:open')).toEqual([[true], [false]])
        }
      }
    } finally {
      wrapper.unmount()
    }
  })
  test('default hover respects enter/leave delays and cancels stale opens', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Trigger, { props: { popupContainer: false }, slots })
    try {
      const button = wrapper.get('button').element
      mouse(button, 'mouseenter')
      vi.advanceTimersByTime(99)
      expect(wrapper.emitted('update:open')).toBeUndefined()
      mouse(button, 'mouseleave')
      vi.advanceTimersByTime(101)
      expect(wrapper.emitted('update:open')).toBeUndefined()
      mouse(button, 'mouseenter')
      vi.advanceTimersByTime(100)
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      mouse(button, 'mouseleave')
      vi.advanceTimersByTime(100)
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
    } finally {
      wrapper.unmount()
      vi.useRealTimers()
    }
  })
  test('focus-only closes on blur even while the mouse remains over the reference', async () => {
    const wrapper = mount(Trigger, {
      props: { trigger: 'focus', popupContainer: false },
      slots,
      attachTo: document.body,
    })
    try {
      const button = wrapper.get('[data-reference]').element
      mouse(button, 'mouseenter')
      button.focus()
      await tick()
      button.blur()
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
    } finally {
      wrapper.unmount()
    }
  })
  test('Escape restores reference focus without reopening a focus trigger', async () => {
    const wrapper = mount(Trigger, {
      props: { trigger: 'focus', popupContainer: false },
      slots,
      attachTo: document.body,
    })
    try {
      const button = wrapper.get('[data-reference]').element
      button.focus()
      await tick()
      wrapper.get('[data-panel]').element.focus()
      await tick()
      escape()
      await tick()
      expect(document.activeElement).toBe(button)
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
      expect(wrapper.emitted('close')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('hover and focus compose: leaving the pointer keeps a focused popup open', async () => {
    const wrapper = mount(Trigger, {
      props: { trigger: ['hover', 'focus'], mouseEnterDelay: 0, mouseLeaveDelay: 0, popupContainer: false },
      slots,
      attachTo: document.body,
    })
    try {
      const button = wrapper.get('[data-reference]').element
      mouse(button, 'mouseenter')
      button.focus()
      mouse(button, 'mouseleave')
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      button.blur()
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
    } finally {
      wrapper.unmount()
    }
  })
  test('manual ignores pointer events and exposes open/close methods', async () => {
    const wrapper = mount(Trigger, { props: { trigger: 'manual', popupContainer: false }, slots })
    try {
      await wrapper.get('button').trigger('click')
      await wrapper.get('button').trigger('mouseenter')
      expect(wrapper.emitted('update:open')).toBeUndefined()
      wrapper.vm.open()
      await tick()
      wrapper.vm.close()
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
    } finally {
      wrapper.unmount()
    }
  })
  test('context menu prevents the browser menu and repeated requests stay open', async () => {
    const wrapper = mount(Trigger, { props: { trigger: 'contextMenu', popupContainer: false }, slots })
    try {
      const first = new MouseEvent('contextmenu', { cancelable: true })
      wrapper.get('button').element.dispatchEvent(first)
      await tick()
      wrapper.get('button').element.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }))
      await tick()
      expect(first.defaultPrevented).toBe(true)
      expect(wrapper.emitted('update:open')).toEqual([[true]])
    } finally {
      wrapper.unmount()
    }
  })
  test('outside click and Escape switches preserve visibility', async () => {
    const wrapper = mount(Trigger, {
      props: { defaultOpen: true, clickOutsideToClose: false, escToClose: false, popupContainer: false },
      slots,
      attachTo: document.body,
    })
    try {
      mouse(document.body, 'click')
      escape()
      await tick()
      expect(wrapper.emitted('update:open')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  test('a rejected controlled Escape request does not move focus', async () => {
    const wrapper = mount(Trigger, { props: { open: true, popupContainer: false }, slots, attachTo: document.body })
    try {
      await tick()
      const panel = wrapper.get('[data-panel]').element
      panel.focus()
      escape()
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[false]])
      expect(wrapper.emitted('close')).toBeUndefined()
      expect(document.activeElement).toBe(panel)
    } finally {
      wrapper.unmount()
    }
  })
  test('teleported child clicks are internal; a parent panel click closes only the child', async () => {
    const wrapper = mount(Trigger, {
      props: { defaultOpen: true, popupContainer: false },
      slots: {
        default: slots.default,
        content: () =>
          h('div', [
            h('button', { 'data-parent-panel': '' }, 'parent'),
            h(
              Trigger,
              { defaultOpen: true, trigger: 'click' },
              {
                default: () => h('button', { 'data-child-reference': '' }, 'child reference'),
                content: () => h('button', { 'data-child-panel': '' }, 'child panel'),
              },
            ),
          ]),
      },
      attachTo: document.body,
    })
    try {
      await tick()
      const child = wrapper.findAllComponents(Trigger).find((component) => component.vm !== wrapper.vm)
      expect(child).toBeTruthy()
      mouse(document.querySelector('[data-child-panel]'), 'click')
      await tick()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      expect(child.emitted('update:open')).toBeUndefined()
      mouse(wrapper.get('[data-parent-panel]').element, 'click')
      await tick()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      expect(child.emitted('update:open')).toEqual([[false]])
      mouse(document.body, 'click')
      await tick()
      expect(wrapper.emitted('update:open')).toEqual([[false]])
    } finally {
      wrapper.unmount()
    }
  })
  test('parent closure cancels pending child opens', async () => {
    vi.useFakeTimers()
    const parentOpen = ref(true)
    const wrapper = mount(Trigger, {
      props: { popupContainer: false },
      slots: {
        default: slots.default,
        content: () => h(Trigger, { trigger: 'hover', mouseEnterDelay: 100, popupContainer: false }, slots),
      },
    })
    try {
      await wrapper.setProps({ open: parentOpen.value })
      await tick()
      const child = wrapper.findAllComponents(Trigger).find((component) => component.vm !== wrapper.vm)
      expect(child).toBeTruthy()
      mouse(child.get('[data-reference]').element, 'mouseenter')
      await wrapper.setProps({ open: false })
      vi.advanceTimersByTime(200)
      await tick()
      expect(child.emitted('update:open')).toBeUndefined()
    } finally {
      wrapper.unmount()
      vi.useRealTimers()
    }
  })
})
