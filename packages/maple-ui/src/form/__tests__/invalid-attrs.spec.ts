import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../../cascader'
import Checkbox from '../../checkbox'
import Input from '../../input'
import InputNumber from '../../input-number'
import Radio from '../../radio'
import Select from '../../select'
import Textarea from '../../textarea'
import VerificationCode from '../../verification-code'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['input', Input, 'input', {}],
  ['input number', InputNumber, 'input[role=spinbutton]', {}],
  ['textarea', Textarea, 'textarea', {}],
  ['checkbox', Checkbox, 'input[type=checkbox]', {}],
  ['radio', Radio, 'input[type=radio]', { value: 'a' }],
  ['select', Select, '[role=combobox]', {}],
  ['cascader', Cascader, '[role=combobox]', {}],
  ['verification code', VerificationCode, '[role=group]', {}],
] as const

for (const invalid of [false, 'grammar'] as const) {
  test.each(cases)(
    '%s retains caller aria-invalid through error changes',
    async (_name, component, selector, props) => {
      const wrapper = mount(Form, {
        props: { editMode: 'direct', model: { value: null } },
        slots: {
          default: () =>
            h(FormItem, { field: 'value', label: 'Value' }, () =>
              h(component as any, { ...props, editMode: 'direct', 'aria-invalid': invalid }),
            ),
        },
      })
      try {
        expect(wrapper.get(selector).attributes('aria-invalid')).toBe(String(invalid))
        ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
        await nextTick()
        expect(wrapper.get(selector).attributes('aria-invalid')).toBe('true')
        ;(wrapper.vm as any).clearValidate()
        await nextTick()
        expect(wrapper.get(selector).attributes('aria-invalid')).toBe(String(invalid))
      } finally {
        wrapper.unmount()
      }
    },
  )
}
