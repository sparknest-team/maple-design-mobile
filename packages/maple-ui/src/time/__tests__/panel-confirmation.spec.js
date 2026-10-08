import { nextTick } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Clock from '../Clock.vue'
import { getTimePickerState } from '../picker-columns'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { mountField } from './field-test-utils'
import { panelState } from './panel-test-utils'

describe('standalone time panel confirmation', () => {
  it.each([
    ['single', TimePicker, '09:00'],
    ['range', TimeRangePicker, ['09:00', '18:00']],
  ])('%s keeps draft selection separate from committed values', async (_name, Component, initial) => {
    const wrapper = mount(Component, {
      props: { defaultValue: initial, format: 'HH:mm' },
    })
    expect(wrapper.find('[class$="__confirm"]').exists()).toBe(true)
    panelState(wrapper).handlePickerChange(['10', '30'])
    await nextTick()
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(panelState(wrapper).pickerValue).toEqual(['10', '30'])
    panelState(wrapper).confirm()
    await nextTick()
    const expected = Array.isArray(initial) ? ['10:30', '18:00'] : '10:30'
    expect(wrapper.emitted('update:modelValue')).toEqual([[expected]])
    panelState(wrapper).confirm()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('select')).toHaveLength(1)
    wrapper.unmount()
  })

  it('validates current rules again and honors external replacements', async () => {
    const wrapper = shallowMount(TimePicker, { props: { modelValue: '09:00', format: 'HH:mm' } })
    panelState(wrapper).handlePickerChange(['10', '30'])
    await wrapper.setProps({ disabledHours: () => [10] })
    expect(panelState(wrapper).canConfirm).toBe(false)
    panelState(wrapper).confirm()
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ modelValue: '11:00' })
    expect(panelState(wrapper).pickerValue).toEqual(['11', '00'])
    expect(wrapper.emitted('select')).toHaveLength(1)
    await wrapper.setProps({ readonly: true })
    panelState(wrapper).confirm()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('does not emit selection when an external clock value changes', async () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '09:00:00', presentation: 'clock' } })
    await wrapper.setProps({ modelValue: '13:30:15' })
    await nextTick()
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it.each([false, true])('sorts only the committed range, showNextDay=%s', async (showNextDay) => {
    const wrapper = shallowMount(TimeRangePicker, {
      props: { defaultValue: ['18:00', '09:00'], format: 'HH:mm', showNextDay },
    })
    panelState(wrapper).handlePickerChange(['19', '00'])
    expect(wrapper.emitted('select')[0][0]).toEqual(['19:00', '09:00'])
    panelState(wrapper).confirm()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(showNextDay ? ['19:00', '09:00'] : ['09:00', '19:00'])
    wrapper.unmount()
  })

  it('exposes a usable custom confirmation action', () => {
    let scope
    const wrapper = mount(TimePicker, {
      props: { format: 'HH:mm' },
      slots: {
        actions: (value) => {
          scope = value
          return 'custom'
        },
      },
    })
    panelState(wrapper).handlePickerChange(['10', '30'])
    return nextTick().then(() => {
      expect(scope.canConfirm).toBe(true)
      scope.confirm()
      expect(wrapper.emitted('update:modelValue')).toEqual([['10:30']])
      wrapper.unmount()
    })
  })

  it('nested field panels do not render another confirmation owner', () => {
    for (const [Field, Panel] of [
      [Time, TimePicker],
      [TimeRange, TimeRangePicker],
    ]) {
      const wrapper = mountField(Field, {
        props: { defaultOpen: true, presentation: 'clock' },
        global: { stubs: { MpTimeFieldPopup: false, MpPopup: { template: '<div><slot /></div>' } } },
      })
      expect(wrapper.findComponent(Panel).props('disableConfirm')).toBe(true)
      wrapper.unmount()
    }
  })
})

describe('disabled time visibility', () => {
  it('retains disabled wheel entries by default and filters only when requested', () => {
    const rules = { format: 'HH:mm', min: '10:00', max: '11:00' }
    const shown = getTimePickerState('10:30', rules)
    expect(shown.columns[0]).toHaveLength(24)
    expect(shown.columns[0][9].disabled).toBe(true)
    expect(shown.columns[0][10].disabled).toBe(false)
    const hidden = getTimePickerState('10:30', { ...rules, hideDisabledOptions: true })
    expect(hidden.columns[0].map((item) => item.value)).toEqual(['10', '11'])
    expect(hidden.value).toEqual(shown.value)
  })
  it('cannot confirm when every candidate is forbidden', () => {
    const wrapper = shallowMount(TimePicker, {
      props: { defaultValue: '09:00', format: 'HH:mm', disabledHours: () => Array.from({ length: 24 }, (_, i) => i) },
    })
    expect(panelState(wrapper).pickerColumns[0].every((item) => item.disabled)).toBe(true)
    expect(panelState(wrapper).canConfirm).toBe(false)
    panelState(wrapper).confirm()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
  it('hides a clock scale without changing the coordinates of other scales', async () => {
    const wrapper = mount(Clock, {
      props: { isInner: false, time: { hour: '03', minute: '00', second: '00' }, disabledHours: () => [3] },
    })
    const before = wrapper
      .findAll('.mp-time-picker__clock-item')
      .find((item) => item.text() === '4')
      .attributes('style')
    await wrapper.setProps({ hideDisabledOptions: true })
    const items = wrapper.findAll('.mp-time-picker__clock-item')
    expect(items.find((item) => item.text() === '3').attributes('style')).toContain('display: none')
    expect(items.find((item) => item.text() === '4').attributes('style')).toBe(before)
    wrapper.unmount()
  })
})
