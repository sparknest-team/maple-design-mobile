import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Trigger from '..'

test('Escape consumed by popup content or composition does not close the trigger', async () => {
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { defaultOpen: true, popupContainer: false },
    slots: {
      default: () => h('button', 'reference'),
      content: () =>
        h(
          'button',
          {
            'data-content': '',
            onKeydown: (event: KeyboardEvent) => {
              if (event.key === 'Escape' && !event.isComposing) {
                event.preventDefault()
              }
            },
          },
          'content',
        ),
    },
  })
  try {
    await nextTick()
    const content = wrapper.get('[data-content]').element
    content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    content.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', isComposing: true, bubbles: true, cancelable: true }),
    )
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 229, bubbles: true, cancelable: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  } finally {
    wrapper.unmount()
  }
})
