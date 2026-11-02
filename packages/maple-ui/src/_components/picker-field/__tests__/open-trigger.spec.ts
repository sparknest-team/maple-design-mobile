import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SelectionField from '../../selection-field/SelectionField.vue'
import PickerField from '../PickerField.vue'

for (const Component of [PickerField, SelectionField]) {
  describe(Component.name + ' opening target', () => {
    it('keeps clicks, text selection and editing local in icon mode, but bubbles the suffix button', async () => {
      let opens = 0
      const host = mount(
        defineComponent({
          render: () =>
            h('div', { onClick: () => opens++ }, [
              h(Component as any, {
                openTriggerTarget: 'icon',
                texts: ['2026-10-27'],
                items: [{ key: 'a', value: 'a', label: 'Alpha' }],
                editable: true,
                searchable: true,
                placeholder: 'Choose',
              }),
            ]),
        }),
      )
      try {
        const input = host.get('input')
        await input.trigger('click')
        await input.setValue('edited')
        expect(opens).toBe(0)
        expect(input.element.value).toBe('edited')
        input.element.setSelectionRange(0, 3)
        await input.trigger('click')
        expect(opens).toBe(0)
        await host.get('[data-field-open-trigger]').trigger('click')
        expect(opens).toBe(1)
        expect(host.get('[data-field-open-trigger]').attributes('aria-label')).toBeTruthy()
      } finally {
        host.unmount()
      }
    })
    it('opens from the field by default, while selected input text does not open', async () => {
      let opens = 0
      const host = mount(
        defineComponent({
          render: () =>
            h('div', { onClick: () => opens++ }, [
              h(Component as any, {
                texts: ['2026-10-27'],
                inputValue: 'Alpha',
                editable: true,
                searchable: true,
              }),
            ]),
        }),
      )
      try {
        const input = host.get('input')
        await input.trigger('click')
        expect(opens).toBe(1)
        input.element.setSelectionRange(0, 3)
        await input.trigger('click')
        expect(opens).toBe(1)
      } finally {
        host.unmount()
      }
    })
  })
}
