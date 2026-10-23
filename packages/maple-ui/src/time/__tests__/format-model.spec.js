import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { changeWheel, fieldState, mountField, selectField } from './field-test-utils'
import { panelState } from './panel-test-utils'

describe('time format and model integration', () => {
  it('omits hidden units in both renderers', () => {
    const panel = shallowMount(TimePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, format: 'mm:ss', modelValue: '05:09' },
    })
    expect(panelState(panel).pickerValue).toEqual(['05', '09'])
    panelState(panel).handlePickerChange(['10', '15'])
    expect(panel.emitted('update:modelValue')).toEqual([['10:15']])
    panel.unmount()
  })
  it('uses second precision and 24 hours by default', () => {
    const wrapper = shallowMount(TimePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, modelValue: '13:05:09' },
    })
    expect(panelState(wrapper).pickerValue).toEqual(['13', '05', '09'])
    expect(panelState(wrapper).pickerColumns).toHaveLength(3)
    wrapper.unmount()
  })
  it('accepts Date and timestamp values in fields and pure panels', () => {
    const date = new Date(2026, 8, 23, 13, 5, 9)
    for (const modelValue of [date, date.getTime()]) {
      const field = mountField(Time, { props: { modelValue, format: 'hh:mm A' } })
      const panel = shallowMount(TimePicker, {
        props: { disableConfirm: true, hideDisabledOptions: true, modelValue, format: 'hh:mm A' },
      })
      expect(fieldState(field).controlProps.value.texts[0]).toBe('01:05 PM')
      expect(panelState(panel).pickerValue).toEqual(['01', '05', 'pm'])
      field.unmount()
      panel.unmount()
      const range = mountField(TimeRange, { props: { modelValue: [modelValue, modelValue], format: 'HH:mm' } })
      const rangePanel = shallowMount(TimeRangePicker, {
        props: {
          disableConfirm: true,
          hideDisabledOptions: true,
          modelValue: [modelValue, modelValue],
          format: 'HH:mm',
        },
      })
      expect(fieldState(range).controlProps.value.texts).toEqual(['13:05', '13:05'])
      expect(panelState(rangePanel).pickerValue).toEqual(['13', '05', '13', '05'])
      range.unmount()
      rangePanel.unmount()
    }
  })
  it('commits a formatted AM/PM field value and rejects malformed external values', async () => {
    const wrapper = mountField(Time, { props: { open: true, use12Hours: true, modelValue: '12:30:00 am' } })
    changeWheel(wrapper, ['12', '30', '00', 'pm'])
    await nextTick()
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toEqual([['12:30:00 pm']])
    await wrapper.setProps({ modelValue: '25:00:00' })
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('')
    expect(fieldState(wrapper).canConfirm.value).toBe(false)
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    wrapper.unmount()
  })
  it('reacts to format and use12Hours without writing a model', async () => {
    const wrapper = shallowMount(TimePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, modelValue: new Date(2026, 8, 23, 13, 5, 9) },
    })
    await wrapper.setProps({ use12Hours: true })
    expect(panelState(wrapper).pickerValue).toEqual(['01', '05', '09', 'pm'])
    await wrapper.setProps({ format: '[Time] HH:mm', use12Hours: false })
    expect(panelState(wrapper).pickerValue).toEqual(['13', '05'])
    expect(panelState(wrapper).pickerColumns).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    panelState(wrapper).handlePickerChange(['14', '10'])
    expect(wrapper.emitted('update:modelValue')).toEqual([['Time 14:10']])
    wrapper.unmount()
  })
  it('converts formatted output and validates overnight permission at the renderer boundary', async () => {
    const clock = shallowMount(TimePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        modelValue: '12:30 PM',
        format: 'hh:mm A',
      },
    })
    panelState(clock).handlePickerChange(['12', '30', 'am'])
    expect(clock.emitted('update:modelValue')).toEqual([['12:30 AM']])
    clock.unmount()
    for (const showNextDay of [false, true]) {
      const modelValue = ['11:30 PM', '12:30 AM']
      const range = mountField(TimeRange, { props: { open: true, modelValue, format: 'hh:mm A', showNextDay } })
      expect(fieldState(range).canConfirm.value).toBe(showNextDay)
      expect(fieldState(range).confirm()).toBe(showNextDay)
      expect(range.emitted('update:modelValue')).toEqual(showNextDay ? [[modelValue]] : undefined)
      range.unmount()
    }
    const panel = shallowMount(TimeRangePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        modelValue: ['11:30 PM', '12:30 AM'],
        format: 'hh:mm A',
        showNextDay: true,
      },
    })
    expect(panelState(panel).showNextDayLabel).toBe(true)
    await nextTick()
    panelState(panel).handlePickerChange(['11', '30', 'pm', '01', '00', 'am'])
    expect(panel.emitted('update:modelValue')).toEqual([[['11:30 PM', '01:00 AM']]])
    panel.unmount()
  })
})
