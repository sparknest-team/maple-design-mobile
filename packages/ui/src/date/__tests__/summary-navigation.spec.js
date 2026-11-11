import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'

for (const [type, value, basePanel] of [
  ['date', '2026-10-19', '.mp-day-picker'],
  ['month', '2026-10', '.mp-month-picker'],
  ['year', '2026', '.mp-year-picker'],
]) {
  it(`${type} has no summary and keeps navigation in the calendar header`, async () => {
    const wrapper = mount(DatePicker, { props: { type, modelValue: value, disableConfirm: false } })
    try {
      expect(wrapper.find('.mp-date-picker__title').exists()).toBe(false)
      expect(wrapper.find('.mp-date-picker__summary-label').exists()).toBe(false)
      expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)
      const header = wrapper.get('.mp-date-picker-header__value')
      if (type === 'year') {
        expect(header.element.tagName).toBe('DIV')
        expect(wrapper.find('.mp-date-picker-header__toggle-icon').exists()).toBe(false)
      } else {
        expect(header.element.tagName).toBe('BUTTON')
        expect(header.attributes('type')).toBe('button')
        expect(header.find('.mp-date-picker-header__toggle-icon').exists()).toBe(true)
        await header.trigger('click')
        if (type === 'date') {
          expect(wrapper.find('.mp-month-picker').exists()).toBe(true)
          await wrapper.get('.mp-date-picker-header__value').trigger('click')
        }
        expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
      }
      expect(wrapper.find(basePanel).exists()).toBe(type === 'year')
      expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
      expect(wrapper.emitted('select')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}

it('returns from datetime year navigation to the calendar through the footer view toggle', async () => {
  const wrapper = mount(DatePicker, {
    props: { showTime: true, modelValue: '2026-10-19 09:30:00', disableConfirm: false },
  })
  try {
    await wrapper.get('.mp-date-picker-header__value').trigger('click')
    await wrapper.get('.mp-date-picker-header__value').trigger('click')
    expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
    await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
    expect(wrapper.find('.mp-date-picker__datetime-picker').exists()).toBe(true)
    expect(wrapper.find('.mp-date-picker__summary').exists()).toBe(false)
    expect(wrapper.find('.mp-date-picker__datetime-picker').exists()).toBe(true)
    await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
    expect(wrapper.get('.mp-day-picker').isVisible()).toBe(true)
    expect(wrapper.find('.mp-year-picker').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

for (const showTime of [false, true]) {
  it(`range summary returns to the selected endpoint without selecting a value (showTime=${showTime})`, async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        showTime,
        modelValue: showTime ? ['2026-10-19 09:30:00', '2026-10-25 18:00:00'] : ['2026-10-19', '2026-10-25'],
      },
    })
    try {
      await wrapper.get('.mp-date-picker-header__value').trigger('click')
      await wrapper.get('.mp-date-picker-header__value').trigger('click')
      expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
      await wrapper.get('.mp-date-range-picker__summary-date').trigger('click')
      expect(wrapper.find('.mp-day-picker').exists()).toBe(true)
      expect(wrapper.find('.mp-year-picker').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}
