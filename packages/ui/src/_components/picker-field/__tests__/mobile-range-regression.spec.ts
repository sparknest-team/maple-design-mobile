import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DateRange from '../../../date-range'
import DateRangePicker from '../../../date-range/DateRangePicker.vue'
import TimeRange from '../../../time-range'
import TimeRangePicker from '../../../time-range/TimeRangePicker.vue'

// Keep the real popup and editor footer: feedback and commit ownership cross
// those boundaries and must not be hidden by a surface stub.
const wrappers: ReturnType<typeof mount>[] = []
const cases = [
  { name: 'date', timeOnly: false, showTime: false, format: 'YYYY-MM-DD', current: '2026-10-23' },
  {
    name: 'datetime',
    timeOnly: false,
    showTime: true,
    format: 'YYYY-MM-DD HH:mm:ss',
    current: '2026-10-23 12:45:12',
  },
  { name: 'time', timeOnly: true, showTime: false, format: 'HH:mm:ss', current: '12:45:12' },
  { name: 'ampm', timeOnly: true, showTime: false, format: 'hh:mm A', current: '12:45 PM' },
] as const
type RangeCase = (typeof cases)[number]
type Entry = 'standalone' | 'popup'
type Scenario = 'reversed' | 'start-now' | 'end-now'
const scenarios: Scenario[] = ['reversed', 'start-now', 'end-now']

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 23, 12, 45, 12))
})
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})

function initialValue(config: RangeCase, scenario: Scenario) {
  if (config.timeOnly) {
    const values = {
      reversed: ['22:00:00', '06:00:00'],
      'start-now': ['00:00:00', '00:00:00'],
      'end-now': ['23:59:59', '23:59:59'],
    }[scenario]
    return config.name === 'ampm'
      ? {
          reversed: ['10:00 PM', '06:00 AM'],
          'start-now': ['12:00 AM', '12:00 AM'],
          'end-now': ['11:59 PM', '11:59 PM'],
        }[scenario]
      : values
  }
  const dates = {
    reversed: ['2026-10-25', '2026-10-21'],
    'start-now': ['2026-10-22', '2026-10-22'],
    'end-now': ['2026-10-24', '2026-10-24'],
  }[scenario]
  return dates.map((date) => date + (config.showTime ? ' 09:30:00' : ''))
}

async function setup(config: RangeCase, entry: Entry, scenario: Scenario, showNextDay = false) {
  const initial = initialValue(config, scenario)
  const component = config.timeOnly
    ? entry === 'standalone'
      ? TimeRangePicker
      : TimeRange
    : entry === 'standalone'
      ? DateRangePicker
      : DateRange
  const wrapper = mount(component, {
    attachTo: document.body,
    props: {
      modelValue: initial,
      disableConfirm: false,
      ...(config.timeOnly ? { format: config.format, showNextDay } : { showTime: config.showTime }),
      ...(entry === 'popup' ? { editMode: 'popup', popupContainer: false } : {}),
    },
  })
  wrappers.push(wrapper)
  const open = async () => {
    await wrapper.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    expect(wrapper.get('[role="dialog"]').isVisible()).toBe(true)
  }
  if (entry === 'popup') {
    await open()
  }
  const action = (label: string) => wrapper.findAll('button').find((button) => button.text() === label)!
  const activate = async (endpoint: number) => {
    if (config.timeOnly) {
      const wheels = wrapper.findAll('[role="listbox"]')
      await wheels[endpoint === 0 ? 0 : wheels.length / 2].get('[aria-selected="true"]').trigger('pointerdown')
    } else {
      await wrapper.findAll('.mp-date-range-picker__summary')[endpoint].trigger('click')
    }
  }
  const selectNow = async (endpoint: number) => {
    await activate(endpoint)
    expect(action('此刻').attributes('disabled')).toBeUndefined()
    await action('此刻').trigger('click')
    await flushPromises()
  }
  const expectPending = () => {
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.props('modelValue')).toEqual(initial)
    if (entry === 'popup') {
      expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('true')
    }
  }
  const confirm = async (expected: string[]) => {
    expectPending()
    expect(action('确认').attributes('disabled')).toBeUndefined()
    await action('确认').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[expected]])
    expect(wrapper.emitted('change')).toHaveLength(1)
    if (entry === 'popup') {
      expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('false')
      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    }
  }
  return { wrapper, initial, action, selectNow, expectPending, confirm, open }
}

describe('mobile range validation through real standalone and popup surfaces', () => {
  for (const config of cases) {
    for (const entry of ['standalone', 'popup'] as const) {
      for (const scenario of scenarios) {
        it(`${config.name} ${entry} ${scenario}: blocks reversed drafts and submits only after repair`, async () => {
          const test = await setup(config, entry, scenario)
          const { wrapper, initial, action, selectNow, expectPending, confirm } = test
          if (scenario === 'reversed') {
            expect(wrapper.get('[role="alert"]').text()).toContain('不能早于')
            expect(action('确认').attributes('disabled')).toBeDefined()
          } else {
            expect(wrapper.find('[role="alert"]').exists()).toBe(false)
            expect(action('确认').attributes('disabled')).toBeUndefined()
          }
          const endpoint = scenario === 'end-now' ? 1 : 0
          await selectNow(endpoint)
          const expected = [...initial]
          expected[endpoint] = config.current
          expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
          expectPending()
          const alert = wrapper.get('[role="alert"]')
          expect(alert.text()).toContain(
            config.name === 'date' ? '结束日期不能早于开始日期' : '结束时间不能早于开始时间',
          )
          if (entry === 'popup') {
            expect(alert.classes()).toContain('mp-field-presentation__error')
            expect(alert.element.closest('.mp-field-presentation__body')).toBeNull()
            expect(wrapper.get('.mp-field-presentation__footer').element.contains(action('确认').element)).toBe(true)
          }
          expect(action('确认').attributes('disabled')).toBeDefined()
          await action('确认').trigger('click')
          expectPending()
          await selectNow(0)
          await selectNow(1)
          expect(wrapper.find('[role="alert"]').exists()).toBe(false)
          expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(false)
          await confirm([config.current, config.current])
        })

        if (config.timeOnly) {
          it(`${config.name} ${entry} ${scenario}: accepts next-day drafts without exchanging endpoints`, async () => {
            const { wrapper, initial, selectNow, expectPending, confirm } = await setup(config, entry, scenario, true)
            expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(scenario === 'reversed')
            const endpoint = scenario === 'end-now' ? 1 : 0
            await selectNow(endpoint)
            const expected = [...initial]
            expected[endpoint] = config.current
            expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
            expectPending()
            expect(wrapper.find('[role="alert"]').exists()).toBe(false)
            expect(wrapper.get('.mp-time-range-picker__next-day').text()).toBe('次日')
            await confirm(expected)
          })
        }
      }

      if (entry === 'popup') {
        it(`${config.name} popup: discards an invalid Now draft on cancel and reopens the committed value`, async () => {
          const { wrapper, action, selectNow, expectPending, open } = await setup(config, entry, 'start-now')
          const selectedValues = () =>
            config.timeOnly
              ? wrapper.findAll('[aria-selected="true"]').map((option) => option.text())
              : wrapper.findAll('.mp-date-range-picker__summary').map((summary) => summary.text())
          const committedDisplay = selectedValues()
          await selectNow(0)
          expect(wrapper.find('[role="alert"]').exists()).toBe(true)
          expectPending()
          await wrapper.get('.mp-field-presentation__close').trigger('click')
          await flushPromises()
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.emitted('change')).toBeUndefined()
          await open()
          expect(wrapper.find('[role="alert"]').exists()).toBe(false)
          expect(selectedValues()).toEqual(committedDisplay)
          expect(action('确认').attributes('disabled')).toBeUndefined()
          await action('确认').trigger('click')
          await flushPromises()
          // Confirming an unchanged value closes the editor without a redundant update.
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.emitted('change')).toBeUndefined()
          expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('false')
        })
      }
    }
  }
})
