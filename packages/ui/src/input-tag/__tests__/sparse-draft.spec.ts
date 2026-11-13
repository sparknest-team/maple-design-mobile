import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import InputTag from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

it.each([false, true])(
  'preserves sparse nested tag data through the public deferred editor (accept=%s)',
  async (accept) => {
    const values = ['kept']
    values.length = 3
    const tag = { value: 'old', label: 'Old', metadata: { values } }
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
      expect(value[0].metadata.values).toHaveLength(3)
      expect(1 in value[0].metadata.values).toBe(false)
      expect(2 in value[0].metadata.values).toBe(false)
      expect(value[1]).toBe('new')
      if (accept) {
        const emitted = owner.emitted('update:modelValue')?.[0][0] as any[]
        expect(emitted[0].metadata.values).toHaveLength(3)
        expect(2 in emitted[0].metadata.values).toBe(false)
      } else {
        expect(owner.emitted('update:modelValue')).toBeUndefined()
      }
    } finally {
      owner.unmount()
    }
  },
)
