import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DayPickerPanel from '../../date/picker-panels/DayPickerPanel.vue'
import CalendarContent from '../../date/presentation/CalendarContent.vue'
import { dateRangeCalendarOptions } from '../calendar-options'
import DateRangePicker from '../DateRangePicker.vue'

describe('range calendar appearance boundary', () => {
  it('keeps only supported appearance keys for untyped callers', () => {
    const onUpdate = () => undefined
    expect(
      dateRangeCalendarOptions({
        hint: '设备',
        color: 'red',
        titleColor: 'blue',
        buttonElevation: 2,
        touchable: false,
        abbreviation: false,
        showCurrent: false,
        pickerValue: '2020-01-01',
        presentation: 'picker',
        elevation: 24,
        modelValue: '2020-01-01',
        'onUpdate:modelValue': onUpdate,
      }),
    ).toEqual({ hint: '设备', color: 'red', titleColor: 'blue', buttonElevation: 2, touchable: false })
    expect(dateRangeCalendarOptions()).toEqual({})
  })
  it('updates appearance without transferring range ownership to the child', async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        presentation: 'calendar',
        type: 'month',
        abbreviation: false,
        dayStartOfWeek: 1,
        datePickerProps: { hint: '设备', touchable: false, presentation: 'picker', abbreviation: true } as any,
      },
    })
    const calendar = () => wrapper.findComponent(CalendarContent)
    expect(calendar().props()).toMatchObject({
      hint: '设备',
      touchable: false,
      presentation: 'calendar',
      abbreviation: false,
      dayStartOfWeek: 1,
      range: true,
      elevation: false,
    })
    await wrapper.setProps({ datePickerProps: { hint: '人员', color: 'red' } })
    expect(calendar().props()).toMatchObject({ hint: '人员', color: 'red', abbreviation: false })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  it('keeps the first range click across an equal controlled model rerender', async () => {
    const initial = ['2026-09-22', '2026-09-24']
    const wrapper = mount(CalendarContent, {
      props: { modelValue: initial, pickerValue: '2026-09-01', presentation: 'calendar', type: 'date', range: true },
    })
    wrapper.getComponent(DayPickerPanel).vm.$emit('choose-day', 10)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('2026-09-10 ~ 2026-09-10')
    await wrapper.setProps({ modelValue: [...initial] })
    expect(wrapper.text()).toContain('2026-09-10 ~ 2026-09-10')
    wrapper.getComponent(DayPickerPanel).vm.$emit('choose-day', 12)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['2026-09-10', '2026-09-12']])
    wrapper.unmount()
  })
})
