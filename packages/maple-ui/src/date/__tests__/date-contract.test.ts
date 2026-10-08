import { effectScope, nextTick, reactive, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { fromCalendarValue, toCalendarValue } from '../calendar-value'
import { isDateDisabled, isDateSelectionValid, type DateRules } from '../date-rules'
import { dateTimeDisabledRules } from '../date-time-rules'
import { dateEventPayload, formatDateValue, outputDateValue, parseDateValue, type DateSelection } from '../date-value'
import { datePresentationOptions } from '../presentation-options'
import { useDateSelection } from '../use-date-selection'

describe('date family value and rules', () => {
  it.each(['2025-02-29', '2024-13-01', '2024-01-32', 'not a date', '2024-1-1'])('rejects invalid model %s', (value) => {
    expect(parseDateValue(value)).toBeUndefined()
    expect(isDateDisabled(value)).toBe(true)
  })
  it('separates model format, display format and renderer format', () => {
    const options = { valueFormat: 'YYYY/MM/DD', format: 'DD-MM-YYYY' }
    expect(formatDateValue('2024/02/29', options)).toBe('29-02-2024')
    expect(toCalendarValue('2024/02/29', options)).toBe('2024-02-29')
    expect(fromCalendarValue('2024-02-29', options)).toBe('2024/02/29')
  })
  it('roundtrips Date and timestamp values without mutating dates', () => {
    const date = new Date(2025, 0, 15, 9, 30, 12)
    const options = { showTime: true, valueFormat: 'Date' }
    const copy = outputDateValue(date, options)
    expect(copy).toEqual(date)
    expect(copy).not.toBe(date)
    expect(fromCalendarValue(toCalendarValue(date, options), options)).toEqual(date)
    expect(outputDateValue(date, { valueFormat: 'timestamp' })).toBe(date.getTime())
  })
  it('supports explicit minute precision and second defaults', () => {
    expect(parseDateValue('2025-01-15 09:30', { showTime: true })).toBeUndefined()
    expect(parseDateValue('2025-01-15 09:30', { showTime: true, useSeconds: false })).toBeDefined()
    expect(parseDateValue('2025-01-15 09:30:01', { showTime: true })).toBeDefined()
  })
  it('keeps week and quarter labels separate from model strings', () => {
    expect(formatDateValue('2025-04', { type: 'quarter' })).toBe('2025-Q2')
    expect(formatDateValue('2025-04-01', { type: 'week' })).not.toBe('2025-04-01')
  })
  it('checks inclusive boundaries and invalid boundary configuration', () => {
    const rules = { min: '2025-01-01', max: '2025-01-31' }
    expect(isDateDisabled('2025-01-01', rules)).toBe(false)
    expect(isDateDisabled('2025-01-31', rules)).toBe(false)
    expect(isDateDisabled('2025-02-01', rules)).toBe(true)
    expect(isDateDisabled('2025-01-15', { min: 'broken' })).toBe(true)
    expect(isDateDisabled('2025-01-15', { min: '2025-02-01', max: '2025-01-01' })).toBe(true)
  })
  it('checks full date-time boundaries rather than calendar date alone', () => {
    const rules = { showTime: true, min: '2025-01-15 10:00:00', max: '2025-01-15 11:00:00' }
    expect(isDateDisabled('2025-01-15 09:59:59', rules)).toBe(true)
    expect(isDateDisabled('2025-01-15 10:00:00', rules)).toBe(false)
    expect(isDateDisabled('2025-01-15 11:00:01', rules)).toBe(true)
  })
  it('passes Date, endpoint and selected hour/minute to disabled callbacks', () => {
    const disabledDate = vi.fn((_date: Date, _side: string) => false)
    const disabledTime = vi.fn((_date: Date, side: 'start' | 'end') => ({
      disabledMinutes: (hour: number) => (side === 'end' && hour === 10 ? [30] : []),
      disabledSeconds: (hour: number, minute: number) => (hour === 9 && minute === 15 ? [1] : []),
    }))
    const rules = { showTime: true, disabledDate, disabledTime }
    expect(isDateDisabled('2025-01-15 10:30:00', rules, 'end')).toBe(true)
    expect(isDateDisabled('2025-01-15 10:30:00', rules, 'start')).toBe(false)
    expect(isDateDisabled('2025-01-15 09:15:01', rules)).toBe(true)
    expect(disabledDate.mock.calls[0][0]).toBeInstanceOf(Date)
    expect(disabledTime.mock.calls[0][1]).toBe('end')
  })
  it('keeps partially available hours and minutes selectable at date-time bounds', () => {
    const rules = dateTimeDisabledRules(new Date(2025, 0, 15), {
      showTime: true,
      min: '2025-01-15 09:30:20',
      max: '2025-01-15 10:15:10',
    })
    expect(rules.disabledHours?.()).toContain(8)
    expect(rules.disabledHours?.()).not.toContain(9)
    expect(rules.disabledHours?.()).not.toContain(10)
    expect(rules.disabledMinutes?.(9)).toContain(29)
    expect(rules.disabledMinutes?.(9)).not.toContain(30)
    expect(rules.disabledSeconds?.(9, 30)).toContain(19)
    expect(rules.disabledSeconds?.(9, 30)).not.toContain(20)
  })
  it('caches time lists without losing reactive disabled callback updates', () => {
    const disabled = ref(false)
    const callback = vi.fn(() => ({ disabledHours: () => (disabled.value ? [9] : []) }))
    const rules = dateTimeDisabledRules(new Date(2025, 0, 15), { disabledTime: callback })
    expect(rules.disabledHours?.()).not.toContain(9)
    const calls = callback.mock.calls.length
    rules.disabledHours?.()
    expect(callback.mock.calls.length).toBe(calls)
    disabled.value = true
    expect(rules.disabledHours?.()).toContain(9)
  })
  it('requires complete ordered ranges, but supports empty multiple values', () => {
    expect(isDateSelectionValid(['2025-01-01'], {}, true)).toBe(false)
    expect(isDateSelectionValid(['2025-01-02', '2025-01-01'], {}, true)).toBe(false)
    expect(isDateSelectionValid(['2025-01-01', '2025-01-01'], {}, true)).toBe(true)
    expect(isDateSelectionValid([], {}, false, true)).toBe(true)
    expect(isDateSelectionValid([], {}, true)).toBe(false)
  })
  it('returns dates and formatted strings with matching shapes', () => {
    const payload = dateEventPayload(['2025-01-01', '2025-01-02'], { format: 'DD/MM/YYYY' })
    expect(payload.texts).toEqual(['01/01/2025', '02/01/2025'])
    expect(Array.isArray(payload.dates) && payload.dates[0]).toBeInstanceOf(Date)
  })
  it('blocks nested ownership keys and listeners in both name styles', () => {
    expect(
      datePresentationOptions({
        modelValue: 'bad',
        'value-format': 'bad',
        disabledDate: () => true,
        onChange: vi.fn(),
        elevation: 2,
      }),
    ).toEqual({ elevation: 2 })
  })
})
describe('date selection transaction', () => {
  function setup(range = false) {
    const value = ref<DateSelection>(range ? ['2025-01-01', '2025-01-03'] : '2025-01-01')
    const rules = reactive<DateRules>({})
    const blocked = ref(false)
    const parts = ref<boolean[]>([])
    const onCommit = vi.fn(),
      onSelect = vi.fn(),
      onConfirm = vi.fn()
    const scope = effectScope()
    const state = scope.run(() =>
      useDateSelection({
        value: () => value.value,
        rules: () => rules,
        blocked: () => blocked.value,
        range: () => range,
        disabledParts: () => parts.value,
        onCommit,
        onSelect,
        onConfirm,
      }),
    )!
    return { value, rules, blocked, parts, scope, state, onCommit, onSelect, onConfirm }
  }
  it('selection is draft-only until confirmation; repeated confirmation is inert', () => {
    const x = setup()
    expect(x.state.select('2025-01-02')).toBe(true)
    expect(x.onSelect).toHaveBeenCalledWith('2025-01-02')
    expect(x.onCommit).not.toHaveBeenCalled()
    expect(x.state.commit()).toBe(true)
    expect(x.state.commit()).toBe(false)
    expect(x.onCommit).toHaveBeenCalledTimes(1)
    x.scope.stop()
  })
  it('rechecks asynchronously changed constraints at commit', () => {
    const x = setup()
    x.state.select('2025-01-02')
    x.rules.disabledDate = (date) => date.getDate() === 2
    expect(x.state.canConfirm.value).toBe(false)
    expect(x.state.commit()).toBe(false)
    expect(x.onCommit).not.toHaveBeenCalled()
    x.scope.stop()
  })
  it('external model replacement resets draft without emitting', async () => {
    const x = setup()
    x.state.select('2025-01-02')
    x.value.value = '2025-01-04'
    await nextTick()
    expect(x.state.draft.value).toBe('2025-01-04')
    expect(x.onCommit).not.toHaveBeenCalled()
    x.scope.stop()
  })
  it('rejects changing locked endpoints and clearing partially locked ranges', () => {
    const x = setup(true)
    x.parts.value = [true, false]
    expect(x.state.select(['2025-01-02', '2025-01-04'])).toBe(false)
    expect(x.state.select(['2025-01-01', '2025-01-04'], true)).toBe(true)
    expect(x.state.clear()).toBe(false)
    x.scope.stop()
  })
  it('blocked selection/clear cannot emit, reset still discards draft', () => {
    const x = setup()
    x.state.select('2025-01-02')
    x.blocked.value = true
    expect(x.state.select('2025-01-03', true)).toBe(false)
    expect(x.state.clear()).toBe(false)
    x.state.reset()
    expect(x.state.draft.value).toBe('2025-01-01')
    expect(x.onCommit).not.toHaveBeenCalled()
    x.scope.stop()
  })
})
