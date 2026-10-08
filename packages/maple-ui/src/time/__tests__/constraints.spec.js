import { nextTick, ref } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { dateTimeConstraints } from '../../date/time-constraints'
import { props as rangePickerProps } from '../../time-range/picker-props'
import { props as rangeProps } from '../../time-range/props'
import TimeRange from '../../time-range/TimeRange.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Clock from '../Clock.vue'
import { props as pickerProps } from '../picker-props'
import { props as fieldProps } from '../props'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { changeWheel, fieldState, mountField, selectField } from './field-test-utils'
import { panelState } from './panel-test-utils'

describe('mobile time constraints integration', () => {
  it('commits a wheel AM/PM change as a 24-hour model', async () => {
    const wrapper = mountField(Time, {
      props: { open: true, modelValue: '00:30', format: 'HH:mm', use12Hours: true },
    })
    changeWheel(wrapper, ['12', '30', 'pm'])
    await nextTick()
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toEqual([['12:30']])
    wrapper.unmount()
  })
  it('shows noon as PM and switches a clock between noon and midnight', async () => {
    const wrapper = shallowMount(TimePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        modelValue: '12:30',
        format: 'HH:mm',
        use12Hours: true,
        presentation: 'clock',
      },
    })
    expect(panelState(wrapper).ampm).toBe('pm')
    panelState(wrapper).checkAmpm('am')
    expect(wrapper.emitted('update:modelValue')).toEqual([['00:30']])
    await wrapper.setProps({ modelValue: '00:30' })
    expect(panelState(wrapper).ampm).toBe('am')
    panelState(wrapper).checkAmpm('pm')
    expect(wrapper.emitted('update:modelValue')[1]).toEqual(['12:30'])
    wrapper.unmount()
  })
  it('keeps midnight distinct from noon and reacts to callback dependencies', async () => {
    const locked = ref(true)
    const wrapper = shallowMount(Clock, {
      props: {
        isInner: false,
        type: 'hour',
        format: 'ampm',
        ampm: 'am',
        time: { hour: '12', minute: '00', second: '00' },
        disabledHours: () => (locked.value ? [0] : []),
      },
    })
    expect(wrapper.vm.isDisable('12')).toBe(true)
    await wrapper.setProps({ ampm: 'pm' })
    expect(wrapper.vm.isDisable('12')).toBe(false)
    await wrapper.setProps({ ampm: 'am' })
    locked.value = false
    await nextTick()
    expect(wrapper.vm.isDisable('12')).toBe(false)
    wrapper.unmount()
  })

  it('removes old time props rather than retaining aliases', () => {
    for (const props of [fieldProps, pickerProps, rangeProps, rangePickerProps]) {
      expect(props).not.toHaveProperty('disabledTime')
      expect(props).not.toHaveProperty('useSeconds')
      expect(props).toHaveProperty('use12Hours')
      expect(props).toHaveProperty('disabledHours')
      expect(props).toHaveProperty('disabledMinutes')
      expect(props).toHaveProperty('disabledSeconds')
    }
  })
  it('updates wheel columns when bounds and callbacks change without writing a model', async () => {
    const wrapper = shallowMount(TimePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        format: 'HH:mm',
        modelValue: '10:20',
        min: '10:00',
        max: '11:00',
      },
    })
    expect(panelState(wrapper).pickerColumns[0].map((item) => item.value)).toEqual(['10', '11'])
    await wrapper.setProps({ disabledHours: () => [10] })
    expect(panelState(wrapper).pickerValue).toEqual(['11', '00'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  it('constrains wheel interaction and blocks empty selections', async () => {
    const wrapper = mount(TimePicker, {
      props: { disableConfirm: true, hideDisabledOptions: true, format: 'HH:mm:ss', min: '10:20:30', max: '10:20:40' },
    })
    wrapper.findComponent({ name: 'MpPicker' }).vm.$emit('change', ['10', '20', '00'])
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([['10:20:30']])
    await wrapper.setProps({ disabledSeconds: () => Array.from({ length: 60 }, (_, i) => i) })
    wrapper.findComponent({ name: 'MpPicker' }).vm.$emit('change', ['10', '20', '35'])
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    wrapper.unmount()
  })
  it('validates a field again after an external value or rule replacement', async () => {
    const wrapper = mountField(Time, {
      props: { format: 'HH:mm', open: true, modelValue: '10:30', min: '10:00', max: '11:00' },
    })
    await wrapper.setProps({ modelValue: '09:00' })
    expect(fieldState(wrapper).canConfirm.value).toBe(false)
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ modelValue: '10:30', disabledHours: () => [10] })
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  it('requires both range endpoints to satisfy current rules', async () => {
    const wrapper = mountField(TimeRange, {
      props: { format: 'HH:mm', open: true, modelValue: ['10:00', '11:00'], min: '10:00', max: '12:00' },
    })
    await wrapper.setProps({ modelValue: ['10:00', '13:00'] })
    expect(fieldState(wrapper).canConfirm.value).toBe(false)
    fieldState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  it('keeps range sides independent and recalculates active columns', async () => {
    const wrapper = shallowMount(TimeRangePicker, {
      props: {
        disableConfirm: true,
        hideDisabledOptions: true,
        modelValue: ['10:20', '11:30'],
        format: 'HH:mm',
        min: '10:00',
        max: '12:00',
        disabledMinutes: (hour) => (hour === 11 ? [30] : []),
      },
    })
    panelState(wrapper).activeTab = 'end'
    await nextTick()
    expect(panelState(wrapper).pickerValue).toEqual(['11', '29'])
    panelState(wrapper).handlePickerChange(['11', '30'])
    expect(wrapper.emitted('update:modelValue')).toEqual([[['10:20', '11:29']]])
    wrapper.unmount()
  })
  it('converts the separate Date predicate API for internal TimePicker use', () => {
    const rules = dateTimeConstraints({ hours: (hour) => hour === 13, minutes: (minute) => minute === 30 })
    expect(rules.disabledHours()).toEqual([13])
    expect(rules.disabledMinutes(13)).toEqual([30])
    expect(rules.disabledSeconds(13, 30)).toEqual([])
  })
})
