import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'

afterEach(() => vi.useRealTimers())
describe('date current renderer', () => {
  it('toggles current highlight independently from the current action', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 15, 9, 30, 12))
    const wrapper = mount(DatePicker, {
      props: { modelValue: '2025-01-01', pickerValue: '2025-01-01', showNowButton: false, presentation: 'calendar' },
    })
    await nextTick()
    const today = () => wrapper.findAll('.mp-day-picker__button--usable.mp-button--variant-outline')
    expect(today()).toHaveLength(1)
    await wrapper.setProps({ showCurrent: false })
    expect(today()).toHaveLength(0)
    expect(wrapper.find('.mp-date-panel-actions').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ showNowButton: true })
    await wrapper.find('.mp-date-panel-actions button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2025-01-15'])
    wrapper.unmount()
  })
  it.each([true, false])('applies exchangeTime=%s to real reversed calendar selections', async (exchangeTime) => {
    const wrapper = mount(DateRangePicker, {
      props: {
        modelValue: ['2025-01-05 09:00', '2025-01-10 18:00'],
        showTime: true,
        useSeconds: false,
        exchangeTime,
        presentation: 'calendarClock',
      },
    })
    await nextTick()
    const cell = (day: string) => wrapper.findAll('.mp-day-picker__button--usable').find((item) => item.text() === day)!
    await cell('20').trigger('click')
    await cell('10').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      exchangeTime ? ['2025-01-10 18:00', '2025-01-20 09:00'] : ['2025-01-10 09:00', '2025-01-20 18:00'],
    ])
    wrapper.unmount()
  })
})
