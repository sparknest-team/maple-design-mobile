import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { changeWheel, fieldState, mountField, selectField } from './field-test-utils'
import { panelState } from './panel-test-utils'

describe('time default and controlled state', () => {
  it('retains an uncontrolled field selection and does not resurrect defaults after clear', async () => {
    const wrapper = mountField(Time, {
      props: { defaultValue: '09:00', defaultOpen: true, format: 'HH:mm', clearable: true },
    })
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('09:00')
    expect(fieldState(wrapper).open.value).toBe(true)
    changeWheel(wrapper, ['10', '30'])
    fieldState(wrapper).confirm()
    await nextTick()
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('10:30')
    expect(fieldState(wrapper).open.value).toBe(false)
    expect(wrapper.emitted('open-change')).toEqual([[false]])
    await wrapper.setProps({ defaultValue: '11:00' })
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('10:30')
    fieldState(wrapper).clear()
    await nextTick()
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('')
    expect(wrapper.emitted('clear')).toEqual([[]])
    wrapper.unmount()
  })
  it('does not close or replace controlled values until the parent accepts them', async () => {
    const wrapper = mountField(Time, { props: { modelValue: '09:00', open: true, format: 'HH:mm' } })
    changeWheel(wrapper, ['10', '30'])
    fieldState(wrapper).confirm()
    await nextTick()
    expect(fieldState(wrapper).open.value).toBe(true)
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('09:00')
    expect(wrapper.emitted('update:modelValue')).toEqual([['10:30']])
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    await wrapper.setProps({ modelValue: '10:30', open: false })
    expect(fieldState(wrapper).controlProps.value.texts[0]).toBe('10:30')
    expect(fieldState(wrapper).open.value).toBe(false)
    wrapper.unmount()
  })
  it('retains independent uncontrolled range endpoints', async () => {
    const panel = shallowMount(TimeRangePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, defaultValue: ['09:00', '18:00'], format: 'HH:mm' },
    })
    panelState(panel).handlePickerChange(['10', '00', '18', '00'])
    await nextTick()
    panelState(panel).handlePickerChange(['10', '00', '19', '00'])
    expect(panel.emitted('update:modelValue')).toEqual([[['10:00', '18:00']], [['10:00', '19:00']]])
    panel.unmount()
    const field = mountField(TimeRange, {
      props: { defaultValue: ['09:00', '18:00'], defaultOpen: true, format: 'HH:mm', clearable: true },
    })
    fieldState(field).draft.value = ['10:00', '19:00']
    fieldState(field).confirm()
    await nextTick()
    expect(fieldState(field).controlProps.value.texts).toEqual(['10:00', '19:00'])
    fieldState(field).clear()
    await nextTick()
    expect(fieldState(field).controlProps.value.texts).toEqual([])
    expect(field.emitted('clear')).toEqual([[]])
    field.unmount()
  })
  it('retains standalone panel changes and blocks disabled panels', async () => {
    const panel = shallowMount(TimePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, defaultValue: '09:00', format: 'HH:mm' },
    })
    panelState(panel).handlePickerChange(['10', '30'])
    await nextTick()
    expect(panelState(panel).pickerValue).toEqual(['10', '30'])
    await panel.setProps({ disabled: true })
    panelState(panel).handlePickerChange(['11', '00'])
    panelState(panel).update('11:00')
    expect(panel.emitted('update:modelValue')).toEqual([['10:30']])
    panel.unmount()
    const range = shallowMount(TimeRangePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        defaultValue: ['09:00', '18:00'],
        format: 'HH:mm',
        disabled: true,
      },
    })
    panelState(range).handlePickerChange(['10', '00', '18', '00'])
    expect(range.emitted('update:modelValue')).toBeUndefined()
    range.unmount()
  })
})
