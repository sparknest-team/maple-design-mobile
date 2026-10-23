import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRange from '..'
import DateRangePicker from '../DateRangePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const stubs = { MpTrigger: Surface, Dialog: Surface, teleport: true }

for (const presentation of ['standalone', 'inline', 'popup'] as const) {
  for (const useSeconds of [false, true]) {
    it(`${presentation} datetime range navigates years, months and arrows without selecting (seconds=${useSeconds})`, async () => {
      const suffix = useSeconds ? ':00' : ''
      const wrapper = mount(presentation === 'standalone' ? DateRangePicker : DateRange, {
        props: {
          modelValue: [`2026-10-19 09:30${suffix}`, `2026-10-25 18:00${suffix}`],
          showTime: true,
          useSeconds,
          disableConfirm: false,
          ...(presentation === 'standalone' ? {} : { presentation, open: true }),
        },
        global: { stubs },
      })
      const header = () => wrapper.get('.mp-date-picker-header__value')
      try {
        await header().trigger('click')
        expect(wrapper.find('.mp-month-picker').exists()).toBe(true)
        await header().trigger('click')
        expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
        await wrapper
          .findAll('.mp-year-picker button')
          .find((button) => button.text() === '2027')!
          .trigger('click')
        expect(header().text()).toContain('2027')
        await wrapper.findAll('.mp-month-picker li button')[2].trigger('click')
        expect(header().text()).toBe('2027 三月')
        await wrapper.get('[aria-label="下一月"]').trigger('click')
        expect(header().text()).toBe('2027 四月')
        await wrapper.get('[aria-label="上一月"]').trigger('click')
        expect(header().text()).toBe('2027 三月')
        await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
        expect(header().text()).toBe('2026 十月')
        await wrapper.get('[aria-label="上一月"]').trigger('click')
        expect(header().text()).toBe('2026 九月')
        expect(wrapper.emitted('select')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  }
}

describe('controlled datetime range viewport', () => {
  it.each([false, true])(
    'uses datetime viewport payloads and restores rejected navigation (seconds=%s)',
    async (useSeconds) => {
      const suffix = useSeconds ? ':00' : ''
      const viewport = [`2026-10-01 00:00${suffix}`, `2026-11-01 00:00${suffix}`]
      const candidate = [`2026-11-01 00:00${suffix}`, `2026-12-01 00:00${suffix}`]
      const wrapper = mount(DateRangePicker, {
        props: {
          showTime: true,
          useSeconds,
          pickerValue: viewport,
          modelValue: [`2026-10-19 09:30${suffix}`, `2026-10-25 18:00${suffix}`],
        },
      })
      try {
        await wrapper.get('[aria-label="下一月"]').trigger('click')
        await nextTick()
        expect(wrapper.emitted('update:pickerValue')?.[0]).toEqual([candidate])
        expect(wrapper.get('.mp-date-picker-header__value').text()).toBe('2026 十月')
        await wrapper.setProps({ pickerValue: candidate })
        expect(wrapper.get('.mp-date-picker-header__value').text()).toBe('2026 十一月')
        expect(wrapper.emitted('select')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    },
  )
})
