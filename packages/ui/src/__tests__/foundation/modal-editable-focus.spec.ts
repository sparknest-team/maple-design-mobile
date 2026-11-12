import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import { useModalFocus } from '../../utils/modal-focus'

it.each(['', 'true', 'TRUE', 'plaintext-only'])(
  'wraps backward to an editable host with contenteditable=%s',
  async (editable) => {
    let trap: (event: KeyboardEvent) => void = () => {}
    const wrapper = mount(
      defineComponent({
        setup() {
          const root = ref<HTMLElement>()
          trap = useModalFocus(
            () => root.value,
            () => true,
            () => true,
          ).trap
          return () =>
            h('div', { ref: root, tabindex: -1 }, [
              h('button', { id: 'first' }, 'First'),
              h('div', { id: 'editor', contenteditable: editable }, 'Edit'),
            ])
        },
      }),
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const first = wrapper.get('#first').element as HTMLElement
      const editor = wrapper.get('#editor').element as HTMLElement
      const focus = vi.spyOn(editor, 'focus')
      first.focus()
      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true })
      trap(event)
      expect(event.defaultPrevented).toBe(true)
      expect(focus).toHaveBeenCalledOnce()
    } finally {
      wrapper.unmount()
    }
  },
)

it.each(['negative-tabindex', 'noneditable', 'nested-editable'])(
  'respects %s during reverse wrapping',
  async (kind) => {
    let trap: (event: KeyboardEvent) => void = () => {}
    const wrapper = mount(
      defineComponent({
        setup() {
          const root = ref<HTMLElement>()
          trap = useModalFocus(
            () => root.value,
            () => true,
            () => true,
          ).trap
          return () =>
            h('div', { ref: root, tabindex: -1 }, [
              h('button', { id: 'first' }, 'First'),
              kind === 'nested-editable'
                ? h('div', { id: 'outer', contenteditable: 'true' }, [
                    h('span', { id: 'editor', contenteditable: 'true' }, 'Edit'),
                  ])
                : h(
                    'div',
                    {
                      id: 'editor',
                      contenteditable: kind === 'noneditable' ? 'FALSE' : 'true',
                      ...(kind === 'negative-tabindex' ? { tabindex: -1 } : {}),
                    },
                    'Edit',
                  ),
            ])
        },
      }),
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const first = wrapper.get('#first').element as HTMLElement
      const editor = wrapper.get('#editor').element as HTMLElement
      const editorFocus = vi.spyOn(editor, 'focus')
      const outerFocus =
        kind === 'nested-editable' ? vi.spyOn(wrapper.get('#outer').element as HTMLElement, 'focus') : undefined
      first.focus()
      trap(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true }))
      expect(editorFocus).not.toHaveBeenCalled()
      if (outerFocus) {
        expect(outerFocus).toHaveBeenCalledOnce()
      }
    } finally {
      wrapper.unmount()
    }
  },
)

it.each(['bad', '', '   ', '+bogus'])(
  'treats invalid tabindex=%s on an editable host as native default',
  async (tabindex) => {
    let trap: (event: KeyboardEvent) => void = () => {}
    const wrapper = mount(
      defineComponent({
        setup() {
          const root = ref<HTMLElement>()
          trap = useModalFocus(
            () => root.value,
            () => true,
            () => true,
          ).trap
          return () =>
            h('div', { ref: root, tabindex: -1 }, [
              h('button', { id: 'first' }, 'First'),
              h('div', { id: 'editor', contenteditable: 'true', tabindex }, 'Edit'),
            ])
        },
      }),
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const first = wrapper.get('#first').element as HTMLElement
      const editor = wrapper.get('#editor').element as HTMLElement
      // Chromium reflects invalid tabindex as -1; jsdom reports 0.
      Object.defineProperty(editor, 'tabIndex', { configurable: true, value: -1 })
      const focus = vi.spyOn(editor, 'focus')
      first.focus()
      trap(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true }))
      expect(focus).toHaveBeenCalledOnce()
    } finally {
      wrapper.unmount()
    }
  },
)

it.each(['-1', '-1abc', '-1.5', '  -1  '])(
  'keeps negative tabindex=%s outside the sequential cycle',
  async (tabindex) => {
    let trap: (event: KeyboardEvent) => void = () => {}
    const wrapper = mount(
      defineComponent({
        setup() {
          const root = ref<HTMLElement>()
          trap = useModalFocus(
            () => root.value,
            () => true,
            () => true,
          ).trap
          return () =>
            h('div', { ref: root, tabindex: -1 }, [
              h('button', { id: 'first' }, 'First'),
              h('div', { id: 'editor', contenteditable: 'true', tabindex }, 'Edit'),
            ])
        },
      }),
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const first = wrapper.get('#first').element as HTMLElement
      const editor = wrapper.get('#editor').element as HTMLElement
      Object.defineProperty(editor, 'tabIndex', { configurable: true, value: -1 })
      const focus = vi.spyOn(editor, 'focus')
      first.focus()
      trap(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true }))
      expect(focus).not.toHaveBeenCalled()
    } finally {
      wrapper.unmount()
    }
  },
)
