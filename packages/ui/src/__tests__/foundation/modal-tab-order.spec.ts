import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { useModalFocus } from '../../utils/modal-focus'

it('wraps according to positive tabindex and document order ties', async () => {
  const root = ref<HTMLElement>()
  const wrapper = mount(
    defineComponent({
      setup() {
        useModalFocus(
          () => root.value,
          () => true,
          () => true,
        )
        return () =>
          h('div', { ref: root, tabindex: -1 }, [
            h('button', { id: 'zero' }, 'Zero'),
            h('button', { id: 'two', tabindex: 2 }, 'Two'),
            h('button', { id: 'one', tabindex: 1 }, 'One'),
            h('button', { id: 'one-next', tabindex: 1 }, 'One next'),
          ])
      },
    }),
    { attachTo: document.body },
  )
  try {
    await nextTick()
    const node = (id: string) => wrapper.get(`#${id}`).element as HTMLElement
    const press = (shiftKey = false) =>
      document.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }),
      )
    root.value!.focus()
    press()
    expect(document.activeElement).toBe(node('one'))
    node('one').focus()
    press(true)
    expect(document.activeElement).toBe(node('zero'))
    node('zero').focus()
    press()
    expect(document.activeElement).toBe(node('one'))
  } finally {
    wrapper.unmount()
  }
})
