import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import InputNumber from '../../input-number'
import Textarea from '../../textarea'
import InputGroup from '../InputGroup.vue'

const mode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
for (const [name, component] of [
  ['Textarea', Textarea],
  ['InputNumber', InputNumber],
] as const) {
  for (const state of ['disabled', 'readonly'] as const) {
    test(`${name} deferred editor respects InputGroup ${state}`, async () => {
      const owner = mount(InputGroup, {
        props: { [state]: true },
        slots: { default: () => h(component as any, { editMode: mode }) },
        attachTo: document.body,
      })
      try {
        const field = owner.getComponent(component as any)
        ;(field.vm as any).focus()
        await flushPromises()
        expect(field.getComponent(FieldPresentation).props('open')).toBe(false)
      } finally {
        owner.unmount()
      }
    })
  }
  test(`${name} explicit false overrides the group while deferred`, async () => {
    const owner = mount(InputGroup, {
      props: { disabled: true, readonly: true },
      slots: { default: () => h(component as any, { editMode: mode, disabled: false, readonly: false }) },
      attachTo: document.body,
    })
    try {
      const field = owner.getComponent(component as any)
      ;(field.vm as any).focus()
      await flushPromises()
      expect(field.getComponent(FieldPresentation).props('open')).toBe(true)
    } finally {
      owner.unmount()
    }
  })
  test(`${name} group state change closes its deferred editor`, async () => {
    const owner = mount(InputGroup, {
      slots: { default: () => h(component as any, { editMode: mode }) },
      attachTo: document.body,
    })
    try {
      const field = owner.getComponent(component as any)
      ;(field.vm as any).focus()
      await flushPromises()
      expect(field.getComponent(FieldPresentation).props('open')).toBe(true)
      await owner.setProps({ readonly: true })
      await flushPromises()
      expect(field.getComponent(FieldPresentation).props('open')).toBe(false)
      expect(field.emitted('change')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
