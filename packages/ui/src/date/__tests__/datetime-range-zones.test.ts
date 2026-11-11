import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import { fromCalendarValue } from '../calendar-value'
import { dateTimeDisabledRules } from '../date-time-rules'
import DatePicker from '../DatePicker.vue'
import { normalizeDateRange } from '../normalize-date-range'
import CalendarViewport from '../presentation/CalendarViewport.vue'

it('keeps the remaining half of a DST hour selectable and respects exact bounds', () => {
  const options = { timeZone: 'Australia/Lord_Howe', showTime: true }
  const rules = dateTimeDisabledRules(new Date('2026-10-03T16:00:00Z'), options)
  expect(rules.disabledHours?.()).not.toContain(2)
  expect(rules.disabledMinutes?.(2)).toContain(29)
  expect(rules.disabledMinutes?.(2)).not.toContain(30)
  const after = dateTimeDisabledRules(new Date('2026-10-03T16:00:00Z'), {
    ...options,
    min: new Date('2026-10-03T16:00:00Z'),
  })
  expect(after.disabledHours?.()).toContain(2)
})
it('sorts a fold range by instants and recomputes offsets when exchanging only dates', () => {
  const options = { timeZone: 'America/New_York', showTime: true, valueFormat: 'timestamp' }
  const first = Date.parse('2026-11-01T05:45:00Z')
  const second = Date.parse('2026-11-01T06:15:00Z')
  expect(normalizeDateRange([second, first], options)).toEqual([first, second])
  const initial = [Date.parse('2026-03-09T05:30:00Z'), Date.parse('2026-03-07T08:30:00Z')]
  expect(normalizeDateRange(initial, { ...options, exchangeTime: false })).toEqual([
    Date.parse('2026-03-07T06:30:00Z'),
    Date.parse('2026-03-09T07:30:00Z'),
  ])
  expect(fromCalendarValue('2026-03-08 02:30:00', options)).toBeUndefined()
})
it.each(['line', 'scroll'] as const)(
  'datetime %s retains time controls and stages a zoned date before confirmation',
  async (interactiveMode) => {
    const initial = Date.parse('2026-03-08T06:30:00Z')
    const owner = mount(DatePicker, {
      props: {
        modelValue: initial,
        valueFormat: 'timestamp',
        timeZone: 'America/New_York',
        showTime: true,
        interactiveMode,
        presentation: 'calendar',
        disableConfirm: false,
      },
    })
    await flushPromises()
    expect(owner.findComponent(CalendarViewport).exists()).toBe(true)
    expect(owner.find('.mp-date-picker__quick-time').exists()).toBe(true)
    owner.findComponent(CalendarViewport).vm.$emit('select', '2026-03-09')
    await flushPromises()
    expect(owner.emitted('select')?.at(-1)?.[0]).toBe(Date.parse('2026-03-09T05:30:00Z'))
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    await owner
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe(Date.parse('2026-03-09T05:30:00Z'))
    owner.unmount()
  },
  15000,
)
it.each(['line', 'scroll'] as const)(
  'datetime range %s preserves a locked start across months and zone changes',
  async (interactiveMode) => {
    const initial = [Date.parse('2026-10-31T14:30:00Z'), Date.parse('2026-11-02T15:00:00Z')]
    const owner = mount(DateRangePicker, {
      props: {
        modelValue: initial,
        valueFormat: 'timestamp',
        timeZone: 'America/New_York',
        showTime: true,
        interactiveMode,
        disabled: [true, false],
        disableConfirm: false,
        presentation: 'calendar',
      },
    })
    await flushPromises()
    expect(owner.findComponent(CalendarViewport).props('rangeEndpoint')).toBe(1)
    expect(owner.find('.mp-date-range-picker__quick-time').exists()).toBe(true)
    owner.findComponent(CalendarViewport).vm.$emit('select', '2026-11-03')
    await flushPromises()
    expect(owner.emitted('select')?.at(-1)?.[0]).toEqual([initial[0], Date.parse('2026-11-03T15:00:00Z')])
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    await owner.setProps({ timeZone: 'Asia/Shanghai' })
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    await owner.findAll('.mp-date-range-picker__summary')[0].trigger('click')
    expect(owner.findAll('.mp-date-range-picker__summary')[0].attributes('disabled')).toBeDefined()
    expect(owner.findComponent(CalendarViewport).props('rangeEndpoint')).toBe(1)
    expect((owner.emitted('select')?.at(-1)?.[0] as number[])[0]).toBe(initial[0])
    await owner
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([initial[0], Date.parse('2026-11-03T15:00:00Z')])
    owner.unmount()
  },
  15000,
)

it('preserves a locked second-fold timestamp and hidden milliseconds when another endpoint changes', async () => {
  const initial = [Date.parse('2026-11-01T06:30:00.123Z'), Date.parse('2026-11-01T07:30:00Z')]
  const options = { timeZone: 'America/New_York', showTime: true, valueFormat: 'timestamp' }
  expect(fromCalendarValue(['2026-11-01 01:30:00', '2026-11-02 02:30:00'], options, initial)).toEqual([
    initial[0],
    Date.parse('2026-11-02T07:30:00Z'),
  ])
  const owner = mount(DateRangePicker, {
    props: {
      ...options,
      modelValue: initial,
      disabled: [true, false],
      interactiveMode: 'line',
      presentation: 'calendar',
      disableConfirm: false,
    },
  })
  await flushPromises()
  owner.findComponent(CalendarViewport).vm.$emit('select', '2026-11-02')
  await flushPromises()
  expect(owner.emitted('select')?.at(-1)?.[0]).toEqual([initial[0], Date.parse('2026-11-02T07:30:00Z')])
  await owner
    .findAll('button')
    .find((button) => button.text() === '确认')!
    .trigger('click')
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([initial[0], Date.parse('2026-11-02T07:30:00Z')])
  owner.unmount()
}, 15000)

it.each(['line', 'scroll'] as const)(
  'date-only %s range edits preserve the hidden time of a locked endpoint',
  async (interactiveMode) => {
    const initial = [Date.parse('2026-10-31T14:30:00Z'), Date.parse('2026-11-02T15:00:00Z')]
    const owner = mount(DateRangePicker, {
      props: {
        modelValue: initial,
        valueFormat: 'timestamp',
        timeZone: 'America/New_York',
        interactiveMode,
        disabled: [true, false],
        disableConfirm: false,
        presentation: 'calendar',
      },
    })
    await flushPromises()
    expect(owner.findComponent(CalendarViewport).props('rangeEndpoint')).toBe(1)
    owner.findComponent(CalendarViewport).vm.$emit('select', '2026-11-03')
    await flushPromises()
    expect(owner.emitted('select')?.at(-1)?.[0]).toEqual([initial[0], Date.parse('2026-11-03T05:00:00Z')])
    owner.unmount()
  },
  15000,
)
