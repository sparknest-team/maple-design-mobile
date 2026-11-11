import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Panel from '../CascaderPanel.vue'

test('standalone panel respects consumed and composition keyboard events', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const [first, second] = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')
    const element = first!.element as HTMLElement
    element.focus()
    const consumed = (event: Event) => event.preventDefault()
    element.addEventListener('keydown', consumed, { once: true })
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await nextTick()
    expect(document.activeElement).toBe(element)
    element.addEventListener('keydown', consumed, { once: true })
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    for (const event of [
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, isComposing: true }),
      Object.defineProperty(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
        'keyCode',
        { value: 229 },
      ),
    ]) {
      element.dispatchEvent(event)
    }
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await nextTick()
    expect(document.activeElement).toBe(second!.element)
    second!.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  } finally {
    wrapper.unmount()
  }
})
