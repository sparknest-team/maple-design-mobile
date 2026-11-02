import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DateField from '..'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import { dateWheelFieldIndexes, mergeDateWheelFields } from '../date-wheel-fields'
import DatePicker from '../DatePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = { stubs: { MpTrigger: Surface, teleport: true } }
afterEach(() => vi.useRealTimers())
it('derives visible date columns only from date-fields', () => {
  expect(dateWheelFieldIndexes(['month', 'day'])).toEqual([1, 2])
  expect(dateWheelFieldIndexes(['day', 'month'])).toEqual([2, 1])
  expect(dateWheelFieldIndexes(['year', 'month', 'day'])).toEqual([0, 1, 2])
  expect(dateWheelFieldIndexes(undefined, 'month')).toEqual([0, 1])
  expect(mergeDateWheelFields(['2024', '02', '28'], [1, 2], ['02', '29'])).toEqual(['2024', '02', '29'])
})
for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const range of [false, true]) {
    for (const showTime of [false, true]) {
      it(`${mode} range=${range} time=${showTime} edits month/day while retaining hidden years`, async () => {
        const initial = showTime ? '2024-02-28 09:45:17' : '2024-02-28'
        const expected = showTime ? '2024-02-29 09:45:17' : '2024-02-29'
        const end = showTime ? '2024-03-01 09:45:17' : '2024-03-01'
        const component = mode === 'standalone' ? (range ? DateRangePicker : DatePicker) : range ? DateRange : DateField
        const owner = mount(component, {
          props: {
            modelValue: range ? [initial, end] : initial,
            format: showTime ? 'MM-DD HH:mm:ss' : 'MM-DD',
            dateFields: ['month', 'day'],
            showTime,
            disableConfirm: false,
            ...(mode === 'standalone'
              ? { presentation: 'picker' }
              : { editMode: mode, panelType: 'picker', open: true }),
          },
          global,
        })
        try {
          await flushPromises()
          const wheel = owner.findComponent(Picker)
          expect(wheel.props('columns')).toHaveLength(2)
          expect(wheel.props('modelValue')).toEqual(['02', '28'])
          wheel.vm.$emit('change', ['02', '29'])
          await flushPromises()
          const select = owner.emitted('select')?.at(-1)?.[0]
          expect(select).toEqual(range ? [expected, end] : expected)
          expect(owner.emitted('update:modelValue')).toBeUndefined()
          await owner
            .findAll('button')
            .find((button) => button.text() === '确认')!
            .trigger('click')
          await flushPromises()
          expect(owner.emitted('update:modelValue')).toEqual([[range ? [expected, end] : expected]])
        } finally {
          owner.unmount()
        }
      })
    }
  }
}

it('can submit only month/day while keeping the year out of the wheels', async () => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 26))
  const owner = mount(DateRangePicker, {
    props: {
      modelValue: ['10-20', '10-25'],
      format: 'MM-DD',
      valueFormat: 'MM-DD',
      dateFields: ['month', 'day'],
      presentation: 'picker',
      disableConfirm: false,
    },
  })
  try {
    await flushPromises()
    const wheel = owner.findComponent(Picker)
    expect(wheel.props('columns')).toHaveLength(2)
    wheel.vm.$emit('change', ['10', '21'])
    await flushPromises()
    expect(owner.emitted('select')?.at(-1)?.[0]).toEqual(['10-21', '10-25'])
    await owner
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(owner.emitted('update:modelValue')).toEqual([[['10-21', '10-25']]])
  } finally {
    owner.unmount()
  }
})

for (const range of [false, true]) {
  for (const seconds of [false, true]) {
    it(`explicit time-fields controls seconds independently of format (range=${range}, seconds=${seconds})`, async () => {
      const point = '2024-02-28 09:45:17'
      const owner = mount(range ? DateRangePicker : DatePicker, {
        props: {
          modelValue: range ? [point, point] : point,
          presentation: 'picker',
          showTime: true,
          format: seconds ? 'MM-DD HH:mm' : 'MM-DD HH:mm:ss',
          dateFields: ['month', 'day'],
          timeFields: seconds ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          disableConfirm: false,
        },
      })
      try {
        await flushPromises()
        expect(owner.findComponent(Picker).props('columns')).toHaveLength(2)
        await owner.get('.mp-temporal-current__toggle').trigger('click')
        expect(owner.findComponent(Picker).props('columns')).toHaveLength(seconds ? 3 : 2)
        expect(owner.emitted('update:modelValue')).toBeUndefined()
      } finally {
        owner.unmount()
      }
    })
  }
}

for (const range of [false, true]) {
  it(`format changes input text without changing panel columns (range=${range})`, async () => {
    const owner = mount(range ? DateRangePicker : DatePicker, {
      props: {
        modelValue: range ? ['2026-10-20', '2026-10-25'] : '2026-10-20',
        presentation: 'picker',
        format: 'MM-DD',
      },
    })
    try {
      await flushPromises()
      expect(owner.findComponent(Picker).props('columns')).toHaveLength(3)
      await owner.setProps({ dateFields: ['month', 'day'] })
      expect(owner.findComponent(Picker).props('columns')).toHaveLength(2)
      await owner.setProps({ format: 'DD/MM/YYYY' })
      expect(owner.findComponent(Picker).props('columns')).toHaveLength(2)
      expect(owner.emitted('select')).toBeUndefined()
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}

for (const mode of ['picker', 'calendar'] as const) {
  for (const range of [false, true]) {
    it(`${mode} range=${range} configures embedded time fields without changing the date grid or hidden seconds`, async () => {
      const point = '2026-10-20 09:45:17'
      const end = '2026-10-21 18:00:23'
      const owner = mount(range ? DateRangePicker : DatePicker, {
        props: {
          modelValue: range ? [point, end] : point,
          presentation: mode,
          showTime: true,
          format: 'MM-DD HH:mm',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          dateFields: ['month', 'day'],
          timeFields: ['minute', 'hour'],
          disableConfirm: false,
        },
      })
      try {
        await flushPromises()
        expect(owner.find('.mp-day-picker__body').exists()).toBe(mode === 'calendar')
        const timeWheel = owner
          .findAllComponents({ name: Picker.name! })
          .find((wheel) => wheel.props('title') === '选择时间')!
        expect(timeWheel.props('columns')).toHaveLength(2)
        expect(timeWheel.props('modelValue')).toEqual(['45', '09'])
        timeWheel.vm.$emit('change', ['50', '10'])
        await flushPromises()
        const next = '2026-10-20 10:50:17'
        expect(owner.emitted('select')?.at(-1)?.[0]).toEqual(range ? [next, end] : next)
        expect(owner.emitted('update:modelValue')).toBeUndefined()
      } finally {
        owner.unmount()
      }
    })
  }
}
