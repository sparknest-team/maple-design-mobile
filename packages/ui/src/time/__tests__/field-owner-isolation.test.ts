import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PickerField from '../../_components/picker-field/PickerField.vue'
import TimeRange from '../../time-range/TimeRange.vue'
import Time from '../Time.vue'

describe('time field owner isolation', () => {
  it('clears only its own uncontrolled model without resurrecting defaults', async () => {
    const first = mount(Time, { props: { defaultValue: '09:00', format: 'HH:mm', clearable: true } })
    const second = mount(Time, { props: { defaultValue: '18:00', format: 'HH:mm', clearable: true } })
    first.findComponent(PickerField).vm.$emit('clear', new Event('click'))
    await first.vm.$nextTick()
    expect(first.get('input').element.value).toBe('')
    expect(second.get('input').element.value).toBe('18:00')
    expect(first.emitted('change')).toHaveLength(1)
    expect(second.emitted('change')).toBeUndefined()
    await first.setProps({ defaultValue: '10:00' })
    expect(first.get('input').element.value).toBe('')
    first.unmount()
    second.unmount()
  })

  it('replaces range display externally without emitting a commit', async () => {
    const wrapper = mount(TimeRange, {
      props: { modelValue: ['09:00', '18:00'], format: 'HH:mm', hint: false },
    })
    await wrapper.setProps({ modelValue: ['10:00', '19:00'] })
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['10:00', '19:00'])
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('uses actual 24-hour values for the next-day hint in twelve-hour display', async () => {
    const wrapper = mount(TimeRange, {
      props: { modelValue: ['11:00 PM', '01:00 AM'], format: 'hh:mm A', showNextDay: true },
    })
    expect(wrapper.findComponent(PickerField).props('endHint')).toBeTruthy()
    await wrapper.setProps({ modelValue: ['11:00 AM', '01:00 PM'] })
    expect(wrapper.findComponent(PickerField).props('endHint')).toBeUndefined()
    await wrapper.setProps({ modelValue: ['11:00 PM', '11:00 PM'] })
    expect(wrapper.findComponent(PickerField).props('endHint')).toBeUndefined()
    wrapper.unmount()
  })
})
