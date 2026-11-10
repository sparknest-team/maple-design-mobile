import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Editor from '../CascaderEditor.vue'
import Panel from '../CascaderPanel.vue'
import { cascaderProps } from '../props'

const Host = defineComponent({ props: cascaderProps, setup: (props) => () => h(Editor, { options: props }) })
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Disabled', disabled: true },
]
for (const mode of ['panel', 'editor'] as const) {
  test(`${mode}: Space selects the focused option and blocks disabled and composition events`, async () => {
    const wrapper = mount(mode === 'panel' ? Panel : Host, { attachTo: document.body, props: { options } })
    try {
      await flushPromises()
      const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
      const [first, second, disabled] = owner.findAll('[role="menuitem"]')
      ;(first!.element as HTMLElement).focus()
      ;(disabled!.element as HTMLElement).focus()
      const disabledEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      disabled!.element.dispatchEvent(disabledEvent)
      expect(disabledEvent.defaultPrevented).toBe(true)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      ;(second!.element as HTMLElement).focus()
      const composing = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true, isComposing: true })
      second!.element.dispatchEvent(composing)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      const legacyIme = new KeyboardEvent('keydown', { key: ' ', keyCode: 229, bubbles: true, cancelable: true })
      second!.element.dispatchEvent(legacyIme)
      const consumed = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      consumed.preventDefault()
      second!.element.dispatchEvent(consumed)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      second!.element.dispatchEvent(event)
      await flushPromises()
      expect(event.defaultPrevented).toBe(true)
      expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
    } finally {
      wrapper.unmount()
    }
  })
}

for (const mode of ['panel', 'editor'] as const) {
  test(`${mode}: Space toggles a multiple option without taking over its nested checkbox`, async () => {
    const wrapper = mount(mode === 'panel' ? Panel : Host, {
      attachTo: document.body,
      props: { options, multiple: true, modelValue: [] },
    })
    try {
      await flushPromises()
      const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
      const option = owner.findAll('[role="menuitem"]')[1]!
      const checkbox = option.get('input[type="checkbox"]')
      ;(checkbox.element as HTMLElement).focus()
      const nested = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      checkbox.element.dispatchEvent(nested)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      ;(option.element as HTMLElement).focus()
      const space = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      option.element.dispatchEvent(space)
      await flushPromises()
      expect(space.defaultPrevented).toBe(true)
      expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
    } finally {
      wrapper.unmount()
    }
  })
}

test('editor search input retains Space for text entry', async () => {
  const wrapper = mount(Host, { attachTo: document.body, props: { options, filterable: true } })
  try {
    await flushPromises()
    const input = wrapper.getComponent(Editor).get('input:not([type="checkbox"])')
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
    input.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.getComponent(Editor).emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
