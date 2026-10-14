import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Textarea from '../index'
import { useTextareaAutoSize } from '../use-textarea-auto-size'

const original = globalThis.ResizeObserver
afterEach(() => {
  globalThis.ResizeObserver = original
})
describe('Textarea auto-size lifecycle', () => {
  it('disconnects on deactivation and unmount, and reconnects once on activation', async () => {
    const observe = vi.fn()
    const disconnect = vi.fn()
    globalThis.ResizeObserver = class {
      observe = observe
      disconnect = disconnect
      unobserve() {}
    }
    const show = ref(true)
    const Field = defineComponent({
      setup() {
        const input = ref()
        const mirror = ref()
        useTextareaAutoSize(input, mirror, ref('text'), () => ({ minRows: 2, maxRows: 4 }))
        return () => h('div', [h('textarea', { ref: input }), h('div', { ref: mirror })])
      },
    })
    const wrapper = mount({ setup: () => () => h(KeepAlive, null, () => (show.value ? h(Field) : null)) })
    await nextTick()
    expect(observe).toHaveBeenCalledTimes(1)
    show.value = false
    await nextTick()
    expect(disconnect).toHaveBeenCalledTimes(1)
    show.value = true
    await nextTick()
    expect(observe).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    expect(disconnect).toHaveBeenCalledTimes(2)
  })
  it('forwards native attrs and keeps hints associated through form groups', async () => {
    const wrapper = mount(Textarea, {
      props: { hint: true, placeholder: 'Notes', textareaAttrs: { id: 'notes', 'aria-label': 'Notes text' }, rows: 3 },
      attrs: { name: 'notes', cols: 40, wrap: 'soft', class: 'outer', 'aria-describedby': 'help' },
    })
    expect(wrapper.classes()).toContain('outer')
    expect(wrapper.get('textarea').attributes()).toMatchObject({
      id: 'notes',
      name: 'notes',
      cols: '40',
      wrap: 'soft',
      'aria-label': 'Notes text',
      'aria-describedby': 'help',
    })
    expect(wrapper.get('label').attributes('for')).toBe('notes')
    expect(wrapper.attributes('name')).toBeUndefined()
    wrapper.unmount()
  })
  it('exposes select and focus refuses disabled controls', async () => {
    const wrapper = mount(Textarea, { attachTo: document.body, props: { defaultValue: 'hello', disabled: true } })
    wrapper.vm.focus()
    expect(document.activeElement).not.toBe(wrapper.get('textarea').element)
    await wrapper.setProps({ disabled: false })
    wrapper.vm.focus()
    wrapper.vm.select()
    const textarea = wrapper.get('textarea').element
    expect(document.activeElement).toBe(textarea)
    expect(textarea.selectionStart).toBe(0)
    expect(textarea.selectionEnd).toBe(5)
    wrapper.unmount()
  })
})
