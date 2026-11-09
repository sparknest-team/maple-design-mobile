import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DateRange from '..'

const initial = ['2026-11-03', '2026-11-05']
describe('DateRange native reference contract', () => {
  test('string and empty placeholders apply to both endpoints, arrays retain their positions', async () => {
    const warnings = []
    const w = mount(DateRange, {
      global: { config: { warnHandler: (message) => warnings.push(message) } },
      props: {
        editMode: 'popup',
        modelValue: initial,
        valueFormat: 'YYYY-MM-DD',
        hint: false,
        placeholder: 'Explicit range placeholder',
      },
    })
    try {
      const inputs = () => w.findAll('input')
      expect(inputs().map((input) => input.attributes('placeholder'))).toEqual([
        'Explicit range placeholder',
        'Explicit range placeholder',
      ])
      await w.setProps({ placeholder: '' })
      expect(inputs().map((input) => input.attributes('placeholder'))).toEqual(['', ''])
      const placeholders = Object.freeze(['From', 'Until'])
      await w.setProps({ placeholder: placeholders })
      expect(inputs().map((input) => input.attributes('placeholder'))).toEqual(['From', 'Until'])
      expect(placeholders).toEqual(['From', 'Until'])
      expect(warnings).toEqual([])
      expect(w.emitted('update:modelValue')).toBeUndefined()
    } finally {
      w.unmount()
    }
  })
  test('readonly native fields remain focusable without allowing activation or editing', async () => {
    const w = mount(DateRange, {
      attachTo: document.body,
      props: {
        editMode: 'popup',
        modelValue: initial,
        valueFormat: 'YYYY-MM-DD',
        readonly: true,
        clearable: true,
        hint: false,
      },
    })
    try {
      const inputs = w.findAll('input')
      expect(inputs).toHaveLength(2)
      for (const input of inputs) {
        expect(input.element.disabled).toBe(false)
        expect(input.element.readOnly).toBe(true)
        input.element.focus()
        expect(document.activeElement).toBe(input.element)
        await input.trigger('click')
        await input.trigger('keydown', { key: 'Enter' })
      }
      expect(w.emitted('update:open')).toBeUndefined()
      expect(w.emitted('update:modelValue')).toBeUndefined()
      expect(w.find('[class*="field-decorator__clear-btn"]').exists()).toBe(false)
      await w.setProps({ disabled: [true, false] })
      expect(inputs[0].element.disabled).toBe(true)
      expect(inputs[1].element.disabled).toBe(false)
      inputs[1].element.focus()
      expect(document.activeElement).toBe(inputs[1].element)
      await w.setProps({ disabled: true })
      expect(inputs.every((input) => input.element.disabled)).toBe(true)
    } finally {
      w.unmount()
    }
  })
})
