import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import InputTag from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Mention from '../../mention'

for (const [name, component] of [
  ['InputTag', InputTag],
  ['Mention', Mention],
] as const) {
  for (const editMode of ['direct', 'popup'] as const) {
    test(`actual ${name} focus/blur work in ${editMode}`, async () => {
      const owner = mount(component as any, { props: { editMode }, attachTo: document.body })
      try {
        const instance = owner.vm as any
        const focus = instance.focus
        expect(focus).toBeTypeOf('function')
        expect(instance.blur).toBeTypeOf('function')
        focus()
        await flushPromises()
        const input = editMode === 'direct' ? owner.get('input') : owner.getComponent(EditorPanel).get('input')
        expect(document.activeElement).toBe(input.element)
        instance.blur()
        expect(document.activeElement).not.toBe(input.element)
      } finally {
        owner.unmount()
      }
    })
  }
}
