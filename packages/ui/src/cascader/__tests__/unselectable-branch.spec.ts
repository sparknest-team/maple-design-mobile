import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'
import Editor from '../CascaderEditor.vue'
import Panel from '../CascaderPanel.vue'
import { cascaderProps } from '../props'

const Host = defineComponent({ props: cascaderProps, setup: (props) => () => h(Editor, { options: props }) })
const options = [{ value: 'root', label: 'Root', children: [{ value: 'child', label: 'Child', disabled: true }] }]

test.each([
  ['panel', Panel],
  ['editor', Host],
] as const)('%s does not select a branch whose descendants are all disabled', async (kind, component) => {
  const wrapper = mount(component as any, { attachTo: document.body, props: { options, multiple: true } })
  try {
    await flushPromises()
    const owner = kind === 'editor' ? wrapper.getComponent(Editor) : wrapper
    const branch = owner.get('[role="menuitem"][title="Root"]')
    expect((branch.get('input[type="checkbox"]').element as HTMLInputElement).disabled).toBe(true)
    ;(branch.element as HTMLElement).focus()
    await branch.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.text()).toContain('Child')
  } finally {
    wrapper.unmount()
  }
})

test('field keyboard navigation opens an unselectable branch without emitting a selection', async () => {
  const wrapper = mount(Cascader, {
    props: { options, multiple: true, editMode: 'direct', defaultOpen: true, popupContainer: false },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.text()).toContain('Child')
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['panel', Panel],
  ['editor', Host],
] as const)('%s still selects the branch in strict mode', async (kind, component) => {
  const wrapper = mount(component as any, {
    attachTo: document.body,
    props: { options, multiple: true, checkStrictly: true },
  })
  try {
    await flushPromises()
    const owner = kind === 'editor' ? wrapper.getComponent(Editor) : wrapper
    const branch = owner.get('[role="menuitem"][title="Root"]')
    expect((branch.get('input[type="checkbox"]').element as HTMLInputElement).disabled).toBe(false)
    ;(branch.element as HTMLElement).focus()
    await branch.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('update:modelValue')).toEqual([[['root']]])
  } finally {
    wrapper.unmount()
  }
})
