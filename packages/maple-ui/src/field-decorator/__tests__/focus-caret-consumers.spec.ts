import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Input from '../../input'
import InputNumber from '../../input-number'
import Textarea from '../../textarea'

describe('FieldDecorator focus/caret consumer DOM (not native painting)', () => {
  for (const [name, component, control] of [
    ['input', Input, 'input.mp-input__inner'],
    ['textarea', Textarea, 'textarea.mp-textarea__inner'],
    ['input-number', InputNumber, 'input.mp-input-number__input'],
  ] as const) {
    test.each(['outline', 'filled', 'standard'] as const)(
      name + ' %s keeps real focus and state targets',
      async (variant) => {
        const wrapper = mount(component, { props: { editMode: 'direct', variant, clearable: true, error: true } })
        try {
          const field = wrapper.get('.mp-field-decorator')
          const native = wrapper.get(control)
          expect(field.classes()).toContain('mp-field-decorator--variant-' + variant)
          expect(field.classes()).toContain('mp-field-decorator--error')
          expect(field.get('.mp-field-decorator__middle').element.contains(native.element)).toBe(true)
          expect(field.find('.mp-field-decorator__border-state').exists()).toBe(true)
          await native.trigger('focus')
          expect(field.classes()).toContain('mp-field-decorator--focus')
          await native.trigger('blur')
          expect(field.classes()).not.toContain('mp-field-decorator--focus')
          await wrapper.setProps({ readonly: true })
          expect(native.attributes('readonly')).toBeDefined()
          expect(native.attributes('disabled')).toBeUndefined()
          await native.trigger('focus')
          expect(field.classes()).toContain('mp-field-decorator--focus')
          await wrapper.setProps({ disabled: true })
          expect(native.attributes('disabled')).toBeDefined()
          expect(field.classes()).toContain('mp-field-decorator--disabled')
          expect(field.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
        } finally {
          wrapper.unmount()
        }
      },
    )
  }
})
