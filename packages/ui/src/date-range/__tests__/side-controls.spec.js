import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../DateRangePicker.vue'

for (const presentation of ['picker', 'calendarPicker', 'calendar']) {
  it(`${presentation} summaries select endpoints while the footer toggles the view`, async () => {
    const wrapper = mount(DateRangePicker, {
      props: { presentation, showTime: true, modelValue: ['2026-09-10 09:00:00', '2026-09-18 18:00:00'] },
    })
    try {
      const summary = wrapper.get('.mp-date-range-picker__summaries')
      expect(summary.findAll('button')).toHaveLength(2)
      await summary.findAll('.mp-date-range-picker__summary')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      const button = wrapper.get('.mp-date-range-picker__view-toggle')
      await button.trigger('click')
      expect(button.attributes('aria-pressed')).toBe('true')
      await summary.findAll('button')[0].trigger('click')
      expect(button.attributes('aria-pressed')).toBe('true')
      expect(wrapper.get('.mp-date-range-picker__current-label').text()).toBe('开始时间')
      await button.trigger('click')
      expect(button.attributes('aria-pressed')).toBe('false')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}
