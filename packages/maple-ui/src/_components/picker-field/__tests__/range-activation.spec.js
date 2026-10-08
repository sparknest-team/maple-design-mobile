import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DateRange from '../../../date-range/DateRange.vue'
import { _PickerComponent as Picker } from '../../../picker'
import TimeRange from '../../../time-range/TimeRange.vue'

describe('Maple range field activation', () => {
  test.each([
    ['date-range', DateRange, ['2026-09-22', '2026-09-24'], ['2026', '09', '25'], '2026-09-25'],
    ['time-range', TimeRange, ['09:00', '10:00'], ['11', '30'], '11:30'],
  ])('%s end input edits the end draft, not the start', async (name, Component, value, picked, expected) => {
    const wrapper = mount(Component, {
      props: { modelValue: value, open: true, ...(name === 'time-range' ? { format: 'HH:mm' } : {}) },
      global: { stubs: { MpPopup: { template: '<div><slot /></div>' } } },
    })
    await wrapper.findAll('input')[1].trigger('click')
    expect(wrapper.get('.mp-' + name + '-picker__value--active').text()).toBe(value[1])
    wrapper.findComponent(Picker).vm.$emit('change', picked)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.get('.mp-' + name + '__confirm-button').trigger('click')
    expect(wrapper.emitted('change')).toEqual([
      [
        [value[0], expected],
        [expect.any(Date), expect.any(Date)],
        ...(name === 'date-range' ? [[value[0], expected]] : []),
      ],
    ])
    wrapper.unmount()
  })
})
