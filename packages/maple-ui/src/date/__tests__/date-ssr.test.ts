// @vitest-environment node
import { createSSRApp, h, type Component } from 'vue'
import { describe, expect, it } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import DateRange from '../../date-range/DateRange.vue'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DateInput from '../Date.vue'
import DatePicker from '../DatePicker.vue'

const cases: [string, Component, Record<string, unknown>][] = [
  ['Date', DateInput, { modelValue: '2025-01-15' }],
  ['DateRange', DateRange, { modelValue: ['2025-01-15', '2025-01-16'] }],
  ['DatePicker', DatePicker, { modelValue: '2025-01-15' }],
  ['DateRangePicker', DateRangePicker, { modelValue: ['2025-01-15', '2025-01-16'] }],
]
describe('date family SSR', () => {
  it.each(cases)('renders %s without browser globals', async (_name, component, props) => {
    expect(typeof window).toBe('undefined')
    const html = await renderToString(createSSRApp({ render: () => h(component, props) }))
    expect(html).toContain('2025')
  })
})
