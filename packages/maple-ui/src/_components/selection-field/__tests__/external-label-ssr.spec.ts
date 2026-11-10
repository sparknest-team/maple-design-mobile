// @vitest-environment node
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import DateField from '../../../date'
import Select from '../../../select'
import PickerField from '../../picker-field/PickerField.vue'
import SelectionField from '../SelectionField.vue'

describe('server-rendered field names', () => {
  it('renders public selection and date fields with external labels on the server', async () => {
    const app = createSSRApp({
      render: () =>
        h('main', [
          h('label', { for: 'public-choice' }, 'Choice'),
          h(Select, { id: 'public-choice', placeholder: 'Choose', editMode: 'direct' }),
          h('label', { for: 'public-date' }, 'Date'),
          h(DateField, { id: 'public-date', placeholder: 'Choose date', editMode: 'direct' }),
        ]),
    })
    const html = await renderToString(app)
    const inputs = [...html.matchAll(/<input\b[^>]*role="combobox"[^>]*>/g)].map((match) => match[0])
    expect(inputs).toHaveLength(2)
    expect(inputs[0]).toContain('id="public-choice"')
    expect(inputs[0]).toContain('placeholder="Choose"')
    expect(inputs[1]).toContain('id="public-date"')
    expect(inputs[1]).toContain('placeholder="Choose date"')
    expect(inputs.every((input) => !input.includes('aria-label='))).toBe(true)
  })

  it('keeps external labels and fallback placeholders without generated aria-labels', async () => {
    const app = createSSRApp({
      render: () =>
        h('main', [
          h('label', { for: 'choice' }, 'Choice'),
          h(SelectionField, { id: 'choice', placeholder: 'Choose' }),
          h('label', { for: 'dates' }, 'Travel dates'),
          h(PickerField, { id: 'dates', range: true, placeholders: ['Start', 'End'] }),
        ]),
    })
    const html = await renderToString(app)
    const inputs = [...html.matchAll(/<input\b[^>]*>/g)].map((match) => match[0])
    expect(inputs).toHaveLength(3)
    expect(inputs[0]).toContain('id="choice"')
    expect(inputs[0]).toContain('placeholder="Choose"')
    expect(inputs[1]).toContain('id="dates"')
    expect(inputs[1]).toContain('placeholder="Start"')
    expect(inputs[2]).toContain('placeholder="End"')
    expect(inputs.every((input) => !input.includes('aria-label='))).toBe(true)
    expect(html).toContain('<label for="choice">Choice</label>')
    expect(html).toContain('<label for="dates">Travel dates</label>')
  })
})
