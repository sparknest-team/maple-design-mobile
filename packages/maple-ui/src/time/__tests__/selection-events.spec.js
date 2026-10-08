import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'
import { changeWheel, fieldState, mountField, selectField } from './field-test-utils'
import { panelState } from './panel-test-utils'

describe('time field selection contract', () => {
  it.each([
    ['single', Time],
    ['range', TimeRange],
  ])('notifies draft selection without committing on cancel: %s', async (_name, Component) => {
    const range = Component === TimeRange
    const value = range ? ['09:00', '18:00'] : '09:00'
    const picked = range ? ['10:30', '18:00'] : '10:30'
    const wrapper = mountField(Component, {
      props: { defaultValue: value, defaultOpen: true, format: 'HH:mm' },
      global: { stubs: { MpTimeFieldPopup: false, MpPopup: { template: '<div><slot /></div>' } } },
    })
    expect(wrapper.find('[class$="__confirm-button"]').exists()).toBe(true)
    selectField(wrapper, picked)
    const [selected, dates] = wrapper.emitted('select')[0]
    expect(selected).toEqual(picked)
    const date = range ? dates[0] : dates
    expect(date.getHours()).toBe(10)
    expect(date.getMinutes()).toBe(30)
    expect(wrapper.emitted('change')).toBeUndefined()
    fieldState(wrapper).cancel()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it.each([
    ['single', Time],
    ['range', TimeRange],
  ])('commits valid selection immediately only when enabled: %s', async (_name, Component) => {
    const range = Component === TimeRange
    const picked = range ? ['10:30', '18:00'] : '10:30'
    const order = []
    const wrapper = mountField(Component, {
      props: {
        defaultOpen: true,
        format: 'HH:mm',
        disableConfirm: true,
        onSelect: () => order.push('select'),
        'onUpdate:modelValue': () => order.push('model'),
        onChange: () => order.push('change'),
      },
      global: { stubs: { MpTimeFieldPopup: false, MpPopup: { template: '<div><slot /></div>' } } },
    })
    expect(wrapper.find('[class$="__confirm-button"]').exists()).toBe(false)
    selectField(wrapper, picked)
    await nextTick()
    expect(order).toEqual(['select', 'model', 'change'])
    expect(wrapper.emitted('update:modelValue')).toEqual([[picked]])
    expect(fieldState(wrapper).open.value).toBe(false)
    expect(wrapper.emitted('change')[0][1]).toEqual(range ? [expect.any(Date), expect.any(Date)] : expect.any(Date))
    wrapper.unmount()
  })

  it('does not immediately commit a forbidden candidate', () => {
    const wrapper = mountField(Time, {
      props: { defaultOpen: true, format: 'HH:mm', disableConfirm: true, disabledHours: () => [10] },
    })
    selectField(wrapper, '10:30')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(fieldState(wrapper).open.value).toBe(true)
    wrapper.unmount()
  })

  it('clears ranges to undefined without a selection event', () => {
    const wrapper = mountField(TimeRange, {
      props: { defaultValue: ['09:00', '18:00'], format: 'HH:mm', clearable: true },
    })
    fieldState(wrapper).clear()
    expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]])
    expect(wrapper.emitted('change')).toEqual([[undefined, undefined]])
    expect(wrapper.emitted('clear')).toEqual([[]])
    expect(wrapper.emitted('select')).toBeUndefined()
    wrapper.unmount()
  })

  it('routes clock and range panel selections through the field transaction', async () => {
    for (const [Field, Panel, value] of [
      [Time, TimePicker, '13:30'],
      [TimeRange, TimeRangePicker, ['13:30', '18:00']],
    ]) {
      const wrapper = mountField(Field, {
        props: { defaultOpen: true, format: 'HH:mm', presentation: 'clock', disableConfirm: true },
        global: { stubs: { MpTimeFieldPopup: false, MpPopup: { template: '<div><slot /></div>' } } },
      })
      wrapper.findComponent(Panel).vm.$emit('select', value)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toEqual([[value]])
      expect(wrapper.emitted('select')).toHaveLength(1)
      expect(fieldState(wrapper).open.value).toBe(false)
      wrapper.unmount()
    }
  })

  it.each([
    ['single', TimePicker],
    ['range', TimeRangePicker],
  ])('exposes matching select/change date parameters on panels: %s', (_name, Component) => {
    const wrapper = shallowMount(Component, { props: { format: 'HH:mm', disableConfirm: true, showNextDay: true } })
    panelState(wrapper).handlePickerChange(['13', '30'])
    expect(wrapper.emitted('select')[0]).toEqual(wrapper.emitted('change')[0])
    const dates = wrapper.emitted('change')[0][1]
    expect((Array.isArray(dates) ? dates[0] : dates).getHours()).toBe(13)
    wrapper.unmount()
  })
})
