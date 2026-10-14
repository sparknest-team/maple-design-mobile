import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRange from '../../date-range/DateRange.vue'
import DateInput from '../Date.vue'

const Surface = defineComponent({ template: '<div><slot /></div>' })
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
describe('mobile field real calendar viewport', () => {
  for (const range of [false, true]) {
    it(`routes real calendar navigation through the field (range=${range})`, async () => {
      const initial = range ? ['2025-01-01', '2025-02-01'] : '2025-01-01'
      const nested = { pickerValue: initial }
      const global = { stubs: { DatePopup: Surface } }
      const wrapper = range
        ? mount(DateRange, {
            props: {
              defaultOpen: true,
              presentation: 'calendar',
              modelValue: ['2025-01-15', '2025-01-20'],
              dateRangePickerProps: nested,
            },
            global,
          })
        : mount(DateInput, {
            props: { defaultOpen: true, presentation: 'calendar', modelValue: '2025-01-15', datePickerProps: nested },
            global,
          })
      wrappers.push(wrapper)
      await nextTick()
      const title = () => wrapper.get('.mp-date-picker-header__value').text()
      const original = title()
      await wrapper.get('.mp-date-picker-header button').trigger('click')
      await nextTick()
      const request = wrapper.emitted('update:pickerValue')?.[0][0]
      expect(request).toBeDefined()
      expect(wrapper.emitted('picker-value-change')).toHaveLength(1)
      expect(title()).toBe(original)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      if (range) {
        expect(Array.isArray(request)).toBe(true)
        await wrapper.setProps({ dateRangePickerProps: { pickerValue: request as string[] } })
      } else {
        expect(request).toBe('2024-12-01')
        await wrapper.setProps({ datePickerProps: { pickerValue: request as string } })
      }
      expect(title()).not.toBe(original)
    })
  }
})
