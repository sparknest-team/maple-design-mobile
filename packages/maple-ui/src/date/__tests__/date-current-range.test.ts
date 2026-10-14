import { defineComponent, nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { currentDateValue } from '../date-current'
import DatePanel from '../DatePanel.vue'
import DatePanelActions from '../DatePanelActions.vue'
import { normalizeDateRange } from '../normalize-date-range'

const Content = defineComponent({ props: ['value'], emits: ['confirm'], template: '<div />' })
afterEach(() => vi.useRealTimers())

describe('date current action and interaction range policy', () => {
  it('normalizes current Date/timestamp values to panel precision', () => {
    const now = new Date(2025, 4, 15, 9, 30, 12, 123)
    expect(currentDateValue({ valueFormat: 'Date' }, now)).toEqual(new Date(2025, 4, 15))
    expect(currentDateValue({ valueFormat: 'timestamp', type: 'month' }, now)).toBe(new Date(2025, 4, 1).getTime())
    expect(currentDateValue({ valueFormat: 'Date', type: 'year' }, now)).toEqual(new Date(2025, 0, 1))
    expect(currentDateValue({ valueFormat: 'Date', type: 'quarter' }, now)).toEqual(new Date(2025, 3, 1))
    expect(currentDateValue({ valueFormat: 'Date', type: 'week', dayStartOfWeek: 1 }, now)).toEqual(
      new Date(2025, 4, 12),
    )
    expect(currentDateValue({ showTime: true, useSeconds: false, valueFormat: 'Date' }, now)).toEqual(
      new Date(2025, 4, 15, 9, 30),
    )
  })
  it('orders whole endpoints without mutating arrays or Date objects', () => {
    const value = [new Date(2025, 0, 20, 9), new Date(2025, 0, 10, 18)]
    const result = normalizeDateRange(value, { valueFormat: 'Date', showTime: true })
    expect(result).toEqual([value[1], value[0]])
    expect(result).not.toBe(value)
    expect((result as Date[])[0]).not.toBe(value[1])
    expect(value[0].getDate()).toBe(20)
  })
  it('preserves endpoint clock positions when exchangeTime is false', () => {
    expect(
      normalizeDateRange(['2025-01-20 09:30:10', '2025-01-10 18:45:20'], { showTime: true, exchangeTime: false }),
    ).toEqual(['2025-01-10 09:30:10', '2025-01-20 18:45:20'])
  })
  it('handles custom formats, timestamps and month precision', () => {
    expect(
      normalizeDateRange(['20/01/2025 09:30', '10/01/2025 18:45'], {
        valueFormat: 'DD/MM/YYYY HH:mm',
        showTime: true,
        exchangeTime: false,
      }),
    ).toEqual(['10/01/2025 09:30', '20/01/2025 18:45'])
    const first = new Date(2025, 0, 20, 9).getTime()
    const second = new Date(2025, 0, 10, 18).getTime()
    expect(normalizeDateRange([first, second], { valueFormat: 'timestamp', showTime: true })).toEqual([second, first])
    expect(normalizeDateRange(['2025-05', '2025-01'], { type: 'month' })).toEqual(['2025-01', '2025-05'])
  })
  it('does not repair invalid or incomplete candidates', () => {
    expect(normalizeDateRange(['broken', '2025-01-01'])).toEqual(['broken', '2025-01-01'])
    expect(normalizeDateRange(['2025-01-01'])).toEqual(['2025-01-01'])
    expect(normalizeDateRange(undefined)).toBeUndefined()
  })
  function mountPanel(options = {}, range = false) {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 15, 9, 30, 12))
    return shallowMount(DatePanel, { props: { options, range }, global: { stubs: { DatePanelContent: Content } } })
  }
  it('selects the current value lazily using model format and standard events', () => {
    const wrapper = mountPanel({ valueFormat: 'timestamp', showTime: true })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.getComponent(DatePanelActions).vm.$emit('select-now')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([new Date(2025, 0, 15, 9, 30, 12).getTime()])
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
  it('defers current-date commit until confirmation', async () => {
    const wrapper = mountPanel({ modelValue: '2025-01-01', disableConfirm: false })
    wrapper.getComponent(DatePanelActions).vm.$emit('select-now')
    await nextTick()
    expect(wrapper.getComponent(Content).props('value')).toBe('2025-01-15')
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.getComponent(DatePanelActions).vm.$emit('confirm')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2025-01-15'])
    wrapper.unmount()
  })
  it.each([
    { readonly: true },
    { disabled: true },
    { max: '2025-01-14' },
    { disabledDate: () => true },
    { showTime: true, disabledTime: () => ({ disabledHours: () => [9] }) },
  ])('rejects blocked current candidates %j', (options) => {
    const wrapper = mountPanel(options)
    expect(wrapper.getComponent(DatePanelActions).props('nowDisabled')).toBe(true)
    wrapper.getComponent(DatePanelActions).vm.$emit('select-now')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
  it.each([{ showNowButton: false }, { multiple: true }])(
    'hides and guards unsupported current action %j',
    (options) => {
      const wrapper = mountPanel(options)
      expect(wrapper.getComponent(DatePanelActions).props('showNow')).toBe(false)
      wrapper.getComponent(DatePanelActions).vm.$emit('select-now')
      expect(wrapper.emitted('change')).toBeUndefined()
      wrapper.unmount()
    },
  )
  it('does not provide single-current selection for a range', () => {
    const wrapper = mountPanel({}, true)
    expect(wrapper.getComponent(DatePanelActions).props('showNow')).toBe(false)
    wrapper.getComponent(DatePanelActions).vm.$emit('select-now')
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
})
