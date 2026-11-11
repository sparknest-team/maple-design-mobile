import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '..'
import InputNumber from '../../input-number'
import Textarea from '../../textarea'
import VerificationCode from '../../verification-code'

test('editable native fields keep browser autofill off even when native attrs request it', () => {
  for (const Component of [Input, InputNumber, Textarea]) {
    const wrapper = mount(Component as typeof Input, {
      props: { editMode: 'direct', inputAttrs: { autocomplete: 'email' }, textareaAttrs: { autocomplete: 'on' } },
      attrs: { autocomplete: 'on' },
    })
    expect(wrapper.get('input,textarea').attributes('autocomplete')).toBe('off')
    wrapper.unmount()
  }
  const code = mount(VerificationCode)
  expect(code.findAll('input').length).toBeGreaterThan(1)
  for (const input of code.findAll('input')) {
    expect(input.attributes('autocomplete')).toBe('off')
  }
  code.unmount()
})
