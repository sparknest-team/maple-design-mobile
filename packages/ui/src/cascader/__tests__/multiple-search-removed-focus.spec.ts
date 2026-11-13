import { defineComponent, h, onBeforeUnmount, onUpdated, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'
import Editor from '../CascaderEditor.vue'
import { cascaderProps } from '../props'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Alpha two' },
]
const props = {
  multiple: true,
  filterable: true,
  editMode: 'direct' as const,
  defaultOpen: true,
  popupContainer: false as const,
  inputValue: 'Alpha',
  options,
}

test.each([false, true])('moves focus when a reactive option is disabled in place, nested=%s', async (nested) => {
  const leaves = reactive([
    { value: 'a', label: 'Alpha', disabled: false },
    { value: 'b', label: 'Alpha two', disabled: false },
  ])
  const liveOptions = nested ? reactive([{ value: 'group', label: 'Group', children: leaves }]) : leaves
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, options: liveOptions } })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    leaves[0].disabled = true
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
  }
})

test('the editor moves focus when its focused result becomes disabled', async () => {
  const EditorHost = defineComponent({
    props: cascaderProps,
    setup: (editorProps) => () => h(Editor, { options: editorProps, modelValue: editorProps.modelValue }),
  })
  const wrapper = mount(EditorHost, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ ...options[0], disabled: true }, options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
  }
})

test('does not reclaim focus moved by a result while it becomes disabled', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const MovingSlot = defineComponent({
    props: { disabled: Boolean },
    setup(slotProps) {
      onUpdated(() => {
        if (slotProps.disabled) {
          outside.focus()
        }
      })
      return () => h('span', String(slotProps.disabled))
    },
  })
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: ({ data }: any) => h(MovingSlot, { disabled: data.disabled }) },
  })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ ...options[0], disabled: true }, options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test.each(['open', 'closed'] as const)('recovers a disabled focused result in a %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const mountPoint = document.createElement('div')
  shadow.append(mountPoint)
  const wrapper = mount(Cascader, { attachTo: mountPoint, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ ...options[0], disabled: true }, options[1]] })
    await flushPromises()
    expect(shadow.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('does not focus a hidden replacement when closing while disabling the focused result', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, open: true } })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ open: false, options: [{ ...options[0], disabled: true }, options[1]] })
    await flushPromises()
    const replacement = wrapper.find('[title="Alpha two"] input[type=checkbox]')
    expect(replacement.exists() && document.activeElement === replacement.element).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('returns focus to the search input when the last enabled result becomes disabled', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, options: [options[0]] } })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ ...options[0], disabled: true }] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('input[role=combobox]').element)
  } finally {
    wrapper.unmount()
  }
})

test('moves focus when the focused result becomes disabled', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ ...options[0], disabled: true }, options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
  }
})

test('removing a focused result restores focus to an enabled remaining checkbox', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const first = wrapper.get('[title="Alpha"] input[type=checkbox]')
    ;(first.element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
    await wrapper.get('[title="Alpha two"] input[type=checkbox]').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
  } finally {
    wrapper.unmount()
  }
})

test('removing a focused result does not take focus back from an external control', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const MovingSlot = defineComponent({
    setup() {
      onBeforeUnmount(() => outside.focus())
      return () => h('span', 'Custom')
    },
  })
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h(MovingSlot) },
  })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('focus recovery skips disabled remaining results', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [{ value: 'x', label: 'Alpha disabled', disabled: true }, options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
  }
})

test.each(['open', 'closed'] as const)('focus recovery stays in its %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const mountPoint = document.createElement('div')
  shadow.append(mountPoint)
  const wrapper = mount(Cascader, { attachTo: mountPoint, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [options[1]] })
    await flushPromises()
    expect(shadow.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('closing while removing the focused result does not focus a hidden replacement', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, open: true } })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ open: false, options: [options[1]] })
    await flushPromises()
    const replacement = wrapper.find('[title="Alpha two"] input[type=checkbox]')
    expect(replacement.exists() && document.activeElement === replacement.element).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('multiple editor restores focus when a result is removed', async () => {
  const EditorHost = defineComponent({
    props: cascaderProps,
    setup: (editorProps) => () => h(Editor, { options: editorProps, modelValue: editorProps.modelValue }),
  })
  const wrapper = mount(EditorHost, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [options[1]] })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[title="Alpha two"] input[type=checkbox]').element)
  } finally {
    wrapper.unmount()
  }
})

test.each([[[]], [[{ value: 'x', label: 'Alpha disabled', disabled: true }]]])(
  'returns focus to the direct search input when no enabled results remain: %o',
  async (nextOptions) => {
    const wrapper = mount(Cascader, { attachTo: document.body, props })
    try {
      await flushPromises()
      const input = wrapper.get('input[role=combobox]')
      ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
      await wrapper.setProps({ options: nextOptions })
      await flushPromises()
      expect(document.activeElement).toBe(input.element)
    } finally {
      wrapper.unmount()
    }
  },
)

test('returns focus to the editor search input when all results disappear', async () => {
  const EditorHost = defineComponent({
    props: cascaderProps,
    setup: (editorProps) => () => h(Editor, { options: editorProps, modelValue: editorProps.modelValue }),
  })
  const wrapper = mount(EditorHost, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input:not([type=checkbox])')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [] })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test.each(['open', 'closed'] as const)('empty results return focus inside the %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const mountPoint = document.createElement('div')
  shadow.append(mountPoint)
  const wrapper = mount(Cascader, { attachTo: mountPoint, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [] })
    await flushPromises()
    expect(shadow.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('empty results do not reclaim focus moved during unmount', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const MovingSlot = defineComponent({
    setup() {
      onBeforeUnmount(() => outside.focus())
      return () => h('span', 'Custom')
    },
  })
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h(MovingSlot) },
  })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ options: [] })
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('loading replacing the results returns focus to the search input', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ loading: true })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('clearing the search while a checkbox is focused returns focus to the direct input', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ inputValue: '' })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('clearing the search in the editor returns focus to its search input', async () => {
  const EditorHost = defineComponent({
    props: cascaderProps,
    setup: (editorProps) => () => h(Editor, { options: editorProps, modelValue: editorProps.modelValue }),
  })
  const wrapper = mount(EditorHost, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input:not([type=checkbox])')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ inputValue: '' })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('closing and clearing the search together does not refocus the input', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, open: true } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ inputValue: '', open: false })
    await flushPromises()
    expect(document.activeElement).not.toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test.each(['open', 'closed'] as const)('clearing the search restores focus in the %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const mountPoint = document.createElement('div')
  shadow.append(mountPoint)
  const wrapper = mount(Cascader, { attachTo: mountPoint, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ inputValue: '' })
    await flushPromises()
    expect(shadow.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('clearing search does not reclaim focus moved by a child unmount', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const MovingSlot = defineComponent({
    setup() {
      onBeforeUnmount(() => outside.focus())
      return () => h('span', 'Custom')
    },
  })
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h(MovingSlot) },
  })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    await wrapper.setProps({ inputValue: '' })
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('unmounting the component does not reclaim subsequently moved focus', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[title="Alpha"] input[type=checkbox]').element as HTMLInputElement).focus()
    wrapper.unmount()
    outside.focus()
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    outside.remove()
  }
})
