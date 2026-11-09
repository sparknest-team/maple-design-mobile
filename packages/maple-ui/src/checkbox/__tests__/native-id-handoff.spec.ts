import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Checkbox from '..'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import Input from '../../input'
import InputNumber from '../../input-number'
import Radio from '../../radio'
import Textarea from '../../textarea'

const mode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
for (const [name, component] of [
  ['Checkbox', Checkbox],
  ['Radio', Radio],
  ['Input', Input],
  ['Textarea', Textarea],
  ['InputNumber', InputNumber],
] as const) {
  test(`${name} transfers a native field ID between reference and current editor without duplication`, async () => {
    const id = `choice-handoff-${name}`
    const owner = mount(component as any, {
      props: { editMode: mode, popupContainer: false },
      attrs: { id },
      attachTo: document.body,
    })
    try {
      expect(document.querySelectorAll('#' + id)).toHaveLength(1)
      ;(owner.vm as any).focus()
      await flushPromises()
      if (!owner.getComponent(FieldPresentation).props('open')) {
        await owner.get('button[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
      }
      expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
      expect(document.querySelectorAll('#' + id)).toHaveLength(1)
      expect(owner.get('input,textarea').attributes('id')).toBe(id)
      owner.getComponent(FieldPresentation).vm.$emit('cancel')
      await flushPromises()
      expect(document.querySelectorAll('#' + id)).toHaveLength(1)
    } finally {
      owner.unmount()
    }
  })
}
