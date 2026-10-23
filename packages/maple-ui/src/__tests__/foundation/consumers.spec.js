import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Cascader from '../../cascader'
import Menu from '../../menu'
import Popover from '../../popover'
import Select from '../../select'
import Tooltip from '../../tooltip'
import Trigger from '../../trigger'

describe('Trigger wrapper migration', () => {
  test.each([
    ['Menu', Menu],
    ['Select', Select],
    ['Cascader', Cascader],
    ['Popover', Popover],
  ])('%s retains click activation', async (_name, Component) => {
    const wrapper = mount(Component, {
      props: { popupContainer: false },
      slots: { default: () => h('button', 'reference') },
    })
    try {
      const trigger = wrapper.findComponent(Trigger)
      expect(trigger.props('trigger')).toBe('click')
      await nextTick()
      const reference = trigger.vm.$.exposed?.getReference()
      expect(reference).toBeInstanceOf(Element)
      reference.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()
      expect(trigger.emitted('update:open')).toEqual([[true]])
    } finally {
      wrapper.unmount()
    }
  })
  test('Tooltip supports zero-delay SVG hover', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'omitted items', popupContainer: false, mouseEnterDelay: 0 },
      slots: { default: () => h('svg') },
    })
    try {
      await nextTick()
      await wrapper.get('svg').trigger('mouseenter')
      expect(wrapper.emitted('open')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('Popover forwards the new dismissal switches', async () => {
    const wrapper = mount(Popover, {
      props: { defaultOpen: true, clickOutsideToClose: false, escToClose: false, popupContainer: false },
      slots: { default: () => h('button', 'reference'), content: 'panel' },
      attachTo: document.body,
    })
    try {
      document.body.click()
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      expect(wrapper.emitted('close')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
})
