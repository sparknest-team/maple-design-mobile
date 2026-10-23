import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRange from '../../date-range/DateRange.vue'
import DateInput from '../Date.vue'

const Panel = defineComponent({ props: ['options'], template: '<div />' })
const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
describe('mobile date presentation ownership', () => {
  for (const range of [false, true]) {
    it(`keeps inline views as calendars regardless of wheel selection (range=${range})`, async () => {
      const nested = { presentation: 'calendar' as const, dayStartOfWeek: 1 as const }
      const global = { stubs: { Trigger: Surface, MpTrigger: Surface, teleport: true } }
      const wrapper = range
        ? mount(DateRange, {
            props: { defaultOpen: true, modelValue: ['2025-01-15', '2025-01-20'], dateRangePickerProps: nested },
            global,
          })
        : mount(DateInput, { props: { defaultOpen: true, modelValue: '2025-01-15', datePickerProps: nested }, global })
      wrappers.push(wrapper)
      expect(wrapper.find('.mp-picker').exists()).toBe(false)
      expect(wrapper.find('.mp-date-picker-header').exists()).toBe(true)
      await wrapper.setProps({ panelType: 'calendar' })
      expect(wrapper.find('.mp-date-picker-header').exists()).toBe(true)
      expect(wrapper.find('.mp-picker').exists()).toBe(false)
      await wrapper.setProps({ panelType: 'picker' })
      expect(wrapper.find('.mp-picker').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('select')).toBeUndefined()
    })
    it(`ignores a nested selector in favor of the resolved root (range=${range})`, async () => {
      // Deliberately simulate an untyped JS caller; legal Options will omit this key.
      const nested = { presentation: 'calendar' as const, dayStartOfWeek: 1 as const }
      const global = { stubs: { DatePanel: Panel, Trigger: Surface, MpTrigger: Surface, teleport: true } }
      const wrapper = range
        ? mount(DateRange, { props: { defaultOpen: true, dateRangePickerProps: nested }, global })
        : mount(DateInput, { props: { defaultOpen: true, datePickerProps: nested }, global })
      wrappers.push(wrapper)
      expect(wrapper.getComponent(Panel).props('options').presentation).toBe('calendar')
      expect(wrapper.getComponent(Panel).props('options').dayStartOfWeek).toBe(1)
      await wrapper.setProps({ panelType: 'calendarPicker', showTime: true })
      expect(wrapper.getComponent(Panel).props('options').presentation).toBe('calendarPicker')
    })
  }
})
