import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import { add, enUS, use as setLocale } from '../../locale'
import { dateMonthLabel } from '../date-labels'
import DatePicker from '../DatePicker.vue'

add('en-US', enUS)

afterEach(() => setLocale('zh-CN'))
describe('date month labels', () => {
  it('selects short by default and full only when disabled', () => {
    expect(dateMonthLabel(undefined, 'Jan', 'January')).toBe('Jan')
    expect(dateMonthLabel(true, 'Jan', 'January')).toBe('Jan')
    expect(dateMonthLabel(false, 'Jan', 'January')).toBe('January')
  })
  it.each([DatePicker, DateRangePicker])(
    'reactively changes month labels without selecting a date',
    async (component) => {
      setLocale('en-US')
      const wrapper = mount(component, {
        props: {
          type: 'month',
          pickerValue: '2025-01',
          disableConfirm: false,
          presentation: 'calendar',
          datePickerProps: { abbreviation: true },
        },
      })
      expect(wrapper.text()).toContain('JAN')
      expect(wrapper.text()).not.toContain('January')
      await wrapper.setProps({ abbreviation: false })
      expect(wrapper.text()).toContain('January')
      expect(wrapper.find('.mp-date-panel-actions').text()).toContain('Confirm')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.setProps({ abbreviation: true })
      expect(wrapper.text()).not.toContain('January')
      setLocale('zh-CN')
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).not.toContain('JAN')
      expect(wrapper.find('.mp-date-panel-actions').text()).toContain('确认')
      wrapper.unmount()
    },
  )
})
