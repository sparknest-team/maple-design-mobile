import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Editor from '../CascaderEditor.vue'
import Panel from '../CascaderPanel.vue'
import Cascader from '../index'
import { cascaderProps } from '../props'

const options = [
  {
    value: 'parent',
    label: 'Parent',
    children: [
      { value: 'enabled', label: 'Enabled' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'blocked', label: 'Blocked branch', disabled: true, children: [{ value: 'nested', label: 'Nested' }] },
    ],
  },
]

for (const component of [Panel, Cascader]) {
  for (const pathMode of [false, true]) {
    for (const interaction of ['checkbox', 'keyboard']) {
      test(`parent deselection preserves disabled descendants (${component.name}, path=${pathMode}, ${interaction})`, async () => {
        const enabled = pathMode ? ['parent', 'enabled'] : 'enabled'
        const disabled = pathMode ? ['parent', 'disabled'] : 'disabled'
        const nested = pathMode ? ['parent', 'blocked', 'nested'] : 'nested'
        const wrapper = mount(component, {
          attachTo: document.body,
          props: {
            options,
            editMode: 'direct',
            multiple: true,
            pathMode,
            modelValue: [enabled, disabled, nested],
            defaultOpen: true,
            popupContainer: false,
          },
        })
        try {
          const parent = wrapper.get('[title="Parent"]')
          const checkbox = parent.get('input[type="checkbox"]')
          expect((checkbox.element as HTMLInputElement).checked).toBe(true)
          if (interaction === 'checkbox') {
            ;(checkbox.element as HTMLInputElement).click()
          } else {
            ;(parent.element as HTMLElement).focus()
            await parent.trigger('keydown', { key: ' ' })
          }
          await nextTick()
          expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[disabled, nested]])
        } finally {
          wrapper.unmount()
        }
      })
    }
  }
}

const EditorHost = defineComponent({
  props: cascaderProps,
  setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
})
for (const pathMode of [false, true]) {
  test(`editor draft keeps disabled descendants when a parent is cleared (path=${pathMode})`, async () => {
    const enabled = pathMode ? ['parent', 'enabled'] : 'enabled'
    const disabled = pathMode ? ['parent', 'disabled'] : 'disabled'
    const nested = pathMode ? ['parent', 'blocked', 'nested'] : 'nested'
    const wrapper = mount(EditorHost, {
      attachTo: document.body,
      props: { options, multiple: true, pathMode, modelValue: [enabled, disabled, nested] },
    })
    try {
      const editor = wrapper.getComponent(Editor)
      const checkbox = editor.get('[title="Parent"] input[type="checkbox"]')
      expect((checkbox.element as HTMLInputElement).checked).toBe(true)
      ;(checkbox.element as HTMLInputElement).click()
      await nextTick()
      expect(editor.emitted('update:modelValue')?.at(-1)).toEqual([[disabled, nested]])
    } finally {
      wrapper.unmount()
    }
  })
}
