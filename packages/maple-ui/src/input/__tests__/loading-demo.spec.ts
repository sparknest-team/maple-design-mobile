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
      expect(fields).toHaveLength(2)
      expect(fields.map((field) => field.props('loadingMode'))).toEqual(['default', 'line'])
      expect(fields.every((field) => field.props('loading'))).toBe(true)
      expect(w.findAll('.mp-field-decorator__loading-line')).toHaveLength(1)
      if (Field === Input) {
        const input = fields[1].get('input')
        expect(input.attributes('disabled')).toBeUndefined()
        await input.setValue('still editable')
        expect(fields[0].get('input').element.value).toBe('still editable')
      }
      await w.findComponent(Switch).trigger('click')
      expect(fields.every((field) => !field.props('loading'))).toBe(true)
      expect(w.findAll('.mp-field-decorator__loading-line')).toHaveLength(0)
    } finally {
      w.unmount()
    }
  })
})
