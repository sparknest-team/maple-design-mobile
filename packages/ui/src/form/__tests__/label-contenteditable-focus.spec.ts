import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Slider from '../../slider'
import FormItem from '../FormItem.vue'

test.each([
  ['FALSE', true],
  ['inherit', true],
  ['true', false],
  ['plaintext-only', false],
] as const)('label contenteditable=%s respects actual editing behavior', async (editable, shouldFocus) => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { labelAttrs: { for: 'editable-test-slider' } },
    slots: {
      label: () => h('span', { contenteditable: editable }, [h('span', { class: 'label-text' }, 'Value')]),
      default: () => h(Slider, { id: 'editable-test-slider', editMode: 'direct' }),
    },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('.label-text').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus.mock.calls.length).toBe(shouldFocus ? 1 : 0)
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['true', false],
  ['false', true],
] as const)('label contenteditable inherits parent %s', async (parent, shouldFocus) => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { labelAttrs: { for: 'editable-test-slider' } },
    slots: {
      label: () =>
        h('span', { contenteditable: parent }, [
          h('span', { class: 'label-text', contenteditable: 'inherit' }, 'Value'),
        ]),
      default: () => h(Slider, { id: 'editable-test-slider', editMode: 'direct' }),
    },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('.label-text').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus.mock.calls.length).toBe(shouldFocus ? 1 : 0)
  } finally {
    wrapper.unmount()
  }
})
