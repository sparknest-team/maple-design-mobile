import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Time from '..'
import Picker from '../../picker/Picker.vue'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import { getTimePickerChange, getTimePickerState } from '../picker-columns'
import TimePicker from '../TimePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = { stubs: { MpTrigger: Surface, teleport: true } }
it('projects ordered time fields and preserves unedited units', () => {
  const rules = { format: 'HH:mm:ss', timeFields: ['minute', 'hour'] as const }
  expect(getTimePickerState('09:30:17', rules).value).toEqual(['30', '09'])
  expect(getTimePickerChange(['45', '10'], rules, '09:30:17')).toBe('10:45:17')
  expect(getTimePickerState('09:30:17', { ...rules, timeFields: ['second'] }).value).toEqual(['17'])
})
it('keeps AM/PM when hour is selected and preserves the hidden period otherwise', () => {
  expect(getTimePickerState('09:30:17 PM', { format: 'hh:mm:ss A', timeFields: ['minute', 'hour'] }).value).toEqual([
    '30',
    '09',
    'pm',
  ])
  expect(getTimePickerChange(['45'], { format: 'hh:mm:ss A', timeFields: ['minute'] }, '09:30:17 PM')).toBe(
    '09:45:17 PM',
  )
})
for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const range of [false, true]) {
    it(`${mode} range=${range} shares time-fields across endpoints without clearing hidden seconds`, async () => {
      const component: Component =
        mode === 'standalone' ? (range ? TimeRangePicker : TimePicker) : range ? TimeRange : Time
      const owner = mount(component, {
        props: {
          modelValue: range ? ['09:30:17', '18:00:23'] : '09:30:17',
          timeFields: ['minute', 'hour'],
          format: 'HH:mm:ss',
          disableConfirm: false,
          ...(mode === 'standalone' ? {} : { editMode: mode, open: true }),
        },
        global,
      })
      try {
        await flushPromises()
        const wheel = owner.getComponent(Picker)
        expect(wheel.props('modelValue')).toEqual(range ? ['30', '09', '00', '18'] : ['30', '09'])
        expect(wheel.props('columns')).toHaveLength(range ? 4 : 2)
        wheel.vm.$emit('change', range ? ['45', '10', '00', '18'] : ['45', '10'])
        await flushPromises()
        const expected = range ? ['10:45:17', '18:00:23'] : '10:45:17'
        expect(owner.emitted('select')?.at(-1)?.[0]).toEqual(expected)
        expect(owner.emitted('update:modelValue')).toBeUndefined()
        await owner
          .findAll('button')
          .find((button) => button.text() === '确认')!
          .trigger('click')
        await flushPromises()
        expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(expected)
      } finally {
        owner.unmount()
      }
    })
  }
}

it('does not silently normalize a hidden hour to satisfy a new boundary', () => {
  expect(getTimePickerChange(['45'], { timeFields: ['minute'], min: '10:00:00' }, '09:30:17')).toBeUndefined()
})
