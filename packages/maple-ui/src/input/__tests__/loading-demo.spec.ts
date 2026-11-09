import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '..'
import Form, { FormItem } from '../../form'
import Select from '../../select'
import SelectDemo from '../../select/example/demos/loading.vue'
import Space from '../../space'
import Switch from '../../switch'
import InputDemo from '../example/demos/loading.vue'

const components = {
  MpInput: Input,
  MpSelect: Select,
  MpSwitch: Switch,
  MpSpace: Space,
  MpForm: Form,
  MpFormItem: FormItem,
}
describe('dedicated field loading demos', () => {
  it.each([
    ['Input', InputDemo, Input],
    ['Select', SelectDemo, Select],
  ])('%s shows both modes and lets loading be turned off', async (_name, Demo, Field) => {
    const w = mount(Demo, { global: { components } })
    try {
      const fields = w.findAllComponents(Field)
      const multiple = Field === Select ? w.findAllComponents(Select)[2] : undefined
      const modes = Field === Select ? ['default', 'line', 'default'] : ['default', 'line']
      expect(fields).toHaveLength(modes.length)
      expect(fields.map((field) => field.props('loadingMode'))).toEqual(modes)
      expect(fields.every((field) => field.props('loading'))).toBe(true)
      expect(w.findAll('.mp-field-decorator__loading-line')).toHaveLength(1)
      if (Field === Input) {
        const input = fields[1].get('input')
        expect(input.attributes('disabled')).toBeUndefined()
        await input.setValue('still editable')
        expect(fields[0].get('input').element.value).toBe('still editable')
      }
      if (multiple) {
        expect(multiple.props('multiple')).toBe(true)
        expect(multiple.props('modelValue')).toEqual(['beijing'])
        const search = multiple.get('input')
        expect(search.element.disabled).toBe(false)
        expect(search.attributes('readonly')).toBeUndefined()
        await search.setValue('busy search')
        expect(multiple.props('modelValue')).toEqual(['beijing'])
        expect(multiple.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
      }
      await w.findComponent(Switch).trigger('click')
      expect(fields.every((field) => !field.props('loading'))).toBe(true)
      expect(w.findAll('.mp-field-decorator__loading-line')).toHaveLength(0)
      if (multiple) {
        await multiple.get('.mp-field-decorator__clear-btn').trigger('click')
        expect(multiple.props('modelValue')).toEqual([])
        expect(fields[0].props('modelValue')).toBe('beijing')
      }
    } finally {
      w.unmount()
    }
  })
})
