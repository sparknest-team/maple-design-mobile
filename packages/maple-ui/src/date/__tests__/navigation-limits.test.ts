import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import DateRange, { DateRangePicker } from '../../date-range'
import DateInput, { DatePicker } from '../index'

const Surface = defineComponent({ template: '<div><slot /></div>' })
const wrappers: ReturnType<typeof mount>[] = []
const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
beforeAll(() => Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() }))
afterAll(() => {
  if (scrollDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', scrollDescriptor)
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
  }
})
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
describe('calendar dynamic navigation limits', () => {
  for (const type of ['date', 'month', 'year'] as const) {
    for (const field of [false, true]) {
      for (const range of [false, true]) {
        it(`restores only the released side (type=${type}, field=${field}, range=${range})`, async () => {
          const global = { stubs: { DatePopup: Surface } }
          const common = {
            type,
            presentation: 'calendar' as const,
            valueFormat: 'YYYY-MM-DD',
            min: '2025-02-01',
            max: '2025-02-28',
          }
          const wrapper = field
            ? range
              ? mount(DateRange, { props: { ...common, modelValue: ['2025-02-12', '2025-02-15'] }, global })
              : mount(DateInput, { props: { ...common, modelValue: '2025-02-12' }, global })
            : range
              ? mount(DateRangePicker, { props: { ...common, modelValue: ['2025-02-12', '2025-02-15'] }, global })
              : mount(DatePicker, { props: { ...common, modelValue: '2025-02-12' }, global })
          wrappers.push(wrapper)
          await nextTick()
          const buttons = () => wrapper.findAll('.mp-date-picker-header__arrow')
          const states = () => buttons().map((button) => button.attributes('disabled') !== undefined)
          expect(states()).toEqual([true, true])
          await wrapper.setProps({ max: undefined })
          expect(states()).toEqual([true, false])
          await wrapper.setProps({ min: undefined })
          expect(states()).toEqual([false, false])
          await wrapper.setProps({ min: common.min, max: common.max })
          expect(states()).toEqual([true, true])
          await wrapper.setProps({ min: undefined })
          expect(states()).toEqual([false, true])
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.emitted('select')).toBeUndefined()
          expect(wrapper.emitted('change')).toBeUndefined()
          expect(wrapper.emitted('update:pickerValue')).toBeUndefined()
        })
      }
    }
  }
})
