import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import DatePicker from '../DatePicker.vue'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('standalone date calendar layout', () => {
  for (const component of [DatePicker, DateRangePicker]) {
    const range = component === DateRangePicker
    it(`defaults to a calendar with switchable time (range=${range})`, async () => {
      const wrapper = mount(component, {
        attachTo: document.body,
        props: {
          showTime: true,
          disableConfirm: false,
          modelValue: range ? ['2026-10-20 09:30:00', '2026-10-25 18:00:00'] : '2026-10-20 09:30:00',
        },
      })
      wrappers.push(wrapper)
      const summary = wrapper.find(range ? '.mp-date-range-picker__summaries' : '.mp-date-picker__summary')
      if (range) {
        expect(summary.element.parentElement?.firstElementChild).toBe(summary.element)
      } else {
        expect(summary.exists()).toBe(false)
      }
      expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
      expect(wrapper.findComponent(Picker).exists()).toBe(true)
      await wrapper.get(range ? '.mp-date-range-picker__view-toggle' : '.mp-date-picker__view-toggle').trigger('click')
      expect(
        range ? wrapper.find('.mp-date-picker__body').exists() : wrapper.get('.mp-date-picker__body').isVisible(),
      ).toBe(false)
      const wheel = wrapper.getComponent(Picker)
      expect(wheel.props('columns')).toHaveLength(3)
      wheel.vm.$emit('change', ['10', '30', '00'])
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.get('.mp-date-panel-actions .mp-button:last-child').trigger('click')
      const value = wrapper.emitted('update:modelValue')?.[0][0]
      expect(range ? (value as string[])[0] : value).toBe('2026-10-20 10:30:00')
    })
    it(`preserves an explicit wheel presentation (range=${range})`, () => {
      const wrapper = mount(component, { props: { presentation: 'picker', showTime: true } })
      wrappers.push(wrapper)
      expect(wrapper.find('.mp-date-picker__body').exists()).toBe(false)
      expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(3)
    })
  }
})
