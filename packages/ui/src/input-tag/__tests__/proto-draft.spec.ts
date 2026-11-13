import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import InputTag from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

it.each([false, true])(
  'preserves a tag object data property through the public deferred editor (accept=%s)',
  async (accept) => {
    const tag = JSON.parse('{"value":"old","label":"Old","__proto__":{"note":"kept"}}')
    const beforeCommit = vi.fn((_payload: unknown) => accept)
    const owner = mount(InputTag, {
      props: { modelValue: [tag], editMode: 'popup', defaultOpen: true, popupContainer: false, beforeCommit },
      attachTo: document.body,
    })
    try {
      await flushPromises()
      const panel = owner.getComponent(EditorPanel)
      const input = panel.get('input')
      await input.setValue('new')
      await input.trigger('keydown', { key: 'Enter' })
      await flushPromises()
      await panel.get('footer button').trigger('click')
      await flushPromises()
      expect(beforeCommit).toHaveBeenCalledTimes(1)
      const value = (beforeCommit.mock.calls[0][0] as any).value
      expect(value).toHaveLength(2)
      expect(Object.getPrototypeOf(value[0])).toBe(Object.prototype)
      expect(Object.prototype.hasOwnProperty.call(value[0], '__proto__')).toBe(true)
      expect(value[0].__proto__).toEqual({ note: 'kept' })
      expect(value[1]).toBe('new')
      if (accept) {
        const emitted = owner.emitted('update:modelValue')?.[0][0] as any[]
        expect(Object.prototype.hasOwnProperty.call(emitted[0], '__proto__')).toBe(true)
      } else {
        expect(owner.emitted('update:modelValue')).toBeUndefined()
      }
    } finally {
      owner.unmount()
    }
  },
)
