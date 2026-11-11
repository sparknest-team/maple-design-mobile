import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Time from '..'
import TimeRange from '../../time-range'
import { getTimeEventDates } from '../time-events'

describe('Time clear event values and auxiliary dates', () => {
  const date = new Date(2026, 10, 4, 10, 30)
  for (const value of [null, 0, date]) {
    test('single retains configured clear ' + String(value), async () => {
      const w = mount(Time, {
        props: { editMode: 'direct', defaultValue: '09:30', format: 'HH:mm', clearable: true, emptyValue: value },
      })
      try {
        await w.get('[class*="field-decorator__clear-btn"]').trigger('click')
        expect(w.emitted('update:modelValue')).toEqual([[value]])
        expect(w.emitted('change')[0]).toEqual([value, getTimeEventDates(value, { format: 'HH:mm' })])
        if (value === null) {
          expect(w.emitted('change')[0][1]).toBeUndefined()
        } else if (value === 0 || value instanceof Date) {
          expect(w.emitted('change')[0][1].getTime()).toBe(value === 0 ? 0 : value.getTime())
        } else {
          expect(w.emitted('change')[0][1].map((part) => part?.getTime())).toEqual(
            value.map((part) => (part instanceof Date ? part.getTime() : part)),
          )
        }
        expect(w.emitted('select')).toBeUndefined()
      } finally {
        w.unmount()
      }
    })
  }
  for (const value of [null, [], [0, date]]) {
    test('range retains configured clear ' + String(value), async () => {
      const w = mount(TimeRange, {
        props: {
          editMode: 'direct',
          defaultValue: ['09:30', '18:00'],
          format: 'HH:mm',
          clearable: true,
          emptyValue: value,
        },
      })
      try {
        await w.get('[class*="field-decorator__clear-btn"]').trigger('click')
        expect(w.emitted('update:modelValue')).toEqual([[value]])
        expect(w.emitted('change')[0]).toEqual([value, getTimeEventDates(value, { format: 'HH:mm' })])
        if (value === null) {
          expect(w.emitted('change')[0][1]).toBeUndefined()
        } else if (value === 0 || value instanceof Date) {
          expect(w.emitted('change')[0][1].getTime()).toBe(value === 0 ? 0 : value.getTime())
        } else {
          expect(w.emitted('change')[0][1].map((part) => part?.getTime())).toEqual(
            value.map((part) => (part instanceof Date ? part.getTime() : part)),
          )
        }
        expect(w.emitted('select')).toBeUndefined()
      } finally {
        w.unmount()
      }
    })
  }
  test('null auxiliary dates remain absent rather than Invalid Date', () => {
    expect(getTimeEventDates(null)).toBeUndefined()
    expect(getTimeEventDates([null, undefined])).toEqual([undefined, undefined])
  })
})
