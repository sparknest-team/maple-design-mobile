import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Date from '..'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import Time from '../../time'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../../time/TimePicker.vue'
import DatePicker from '../DatePicker.vue'

const cases = [
  [Date, DatePicker, { modelValue: '2026-10-20' }, '.mp-date-picker__summary', 1],
  [Date, DatePicker, { modelValue: '2026-10-20 09:30:00', showTime: true }, '.mp-date-picker__summary', 1],
  [DateRange, DateRangePicker, { modelValue: ['2026-10-20', '2026-10-25'] }, '.mp-date-range-picker__summaries', 2],
  [
    DateRange,
    DateRangePicker,
    { modelValue: ['2026-10-20 09:30:00', '2026-10-25 18:00:00'], showTime: true },
    '.mp-date-range-picker__summaries',
    2,
  ],
  [Time, TimePicker, { modelValue: '09:30:00' }, '.mp-time-picker__summary', 1],
  [TimeRange, TimeRangePicker, { modelValue: ['09:30:00', '18:00:00'] }, '.mp-time-range-picker__values', 2],
]
for (const [type, value, range] of [
  ['month', '2026-10', ['2026-10', '2026-12']],
  ['year', '2026', ['2026', '2028']],
]) {
  cases.push(
    [Date, DatePicker, { type, modelValue: value }, '.mp-date-picker__summary', 1],
    [DateRange, DateRangePicker, { type, modelValue: range }, '.mp-date-range-picker__summaries', 2],
  )
}
for (const [format, value, range] of [
  ['HH:mm', '09:30', ['09:30', '18:00']],
  ['hh:mm:ss a', '09:30:00 am', ['09:30:00 am', '06:00:00 pm']],
  ['mm:ss', '30:00', ['30:00', '45:00']],
]) {
  cases.push(
    [Time, TimePicker, { format, modelValue: value }, '.mp-time-picker__summary', 1],
    [TimeRange, TimeRangePicker, { format, modelValue: range }, '.mp-time-range-picker__values', 2],
  )
}
for (const [Field, Panel, props, selector, count] of cases.slice(0, 4)) {
  cases.push([Field, Panel, { ...props, panelType: 'picker' }, selector, count])
  if (props.showTime) {
    cases.push([
      Field,
      Panel,
      { ...props, timeFields: ['hour', 'minute'], format: 'YYYY-MM-DD HH:mm', valueFormat: 'YYYY-MM-DD HH:mm' },
      selector,
      count,
    ])
  }
}
const stubs = {
  MpTrigger: { template: '<div><slot /><slot name="content" /></div>' },
  MpPopup: { props: ['open'], template: '<section v-if="open"><slot /></section>' },
}

for (const [Field, Panel, props, selector] of cases) {
  for (const editMode of ['direct', 'popup', 'standalone']) {
    it(`${Field.name} ${props.type ?? props.format ?? (props.showTime ? 'datetime' : 'default')} ${props.panelType ?? 'default'} seconds=${props.timeFields?.includes('second') ?? true} ${editMode} keeps only date-range summaries and matching column labels`, async () => {
      const { panelType, ...panelOptions } = props
      const wrapper = mount(editMode === 'standalone' ? Panel : Field, {
        props:
          editMode === 'standalone'
            ? { ...panelOptions, ...(panelType ? { editMode: panelType } : {}) }
            : { ...props, editMode, open: true },
        global: { stubs },
      })
      try {
        const summary = wrapper.find(selector)
        if (Field !== DateRange) {
          expect(summary.exists()).toBe(false)
        } else {
          expect(summary.element.parentElement.firstElementChild).toBe(summary.element)
          expect(summary.findAll('button')).toHaveLength(Field === DateRange ? 2 : 0)
          const initialPickers = wrapper.findAllComponents(Picker).length
          await summary.trigger('click')
          expect(wrapper.findAllComponents(Picker)).toHaveLength(initialPickers)
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          const labels = summary.findAll('[class$="__summary-label"]')
          expect(labels).toHaveLength(2)
          expect(labels.every((label) => label.attributes('hidden') !== undefined)).toBe(true)
        }
        expect(wrapper.find('[class$="__group-labels"], [class$="__time-labels"]').exists()).toBe(false)
        if (Field === Time && !props.format) {
          expect(wrapper.findAll('.mp-time-picker__column-label').map((label) => label.text())).toEqual([
            '时',
            '分',
            '秒',
          ])
        }
        if (Field === TimeRange) {
          expect(summary.exists()).toBe(false)
          expect(wrapper.findAllComponents(Picker)).toHaveLength(1)
          if (!props.format) {
            expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(6)
          }
        }
        expect(wrapper.findAll('.mp-temporal-view-switch__button')).toHaveLength(0)
        if (props.showTime) {
          await wrapper
            .get(Field === DateRange ? '.mp-date-range-picker__view-toggle' : '.mp-date-picker__view-toggle')
            .trigger('click')
        }
        for (const picker of wrapper.findAllComponents(Picker)) {
          const header = picker.element.previousElementSibling
          expect(header?.className).toContain('__column-labels')
          const labels = [...header.querySelectorAll('[class$="__column-label"]')].map((label) => label.textContent)
          expect(labels).toHaveLength(picker.props('columns').length)
          expect(labels.every((label) => ['年', '月', '日', '时', '分', '秒', 'AM/PM'].includes(label))).toBe(true)
          expect(header.textContent).not.toMatch(/开始|结束/)
        }
      } finally {
        wrapper.unmount()
      }
    })
  }
}

for (const editMode of ['direct', 'popup']) {
  it(`TimeRange ${editMode} edits both wheels without summaries before one confirmation`, async () => {
    const wrapper = mount(TimeRange, {
      props: { modelValue: ['09:30', '18:00'], format: 'HH:mm', editMode, open: true },
      global: { stubs },
    })
    try {
      wrapper.getComponent(Picker).vm.$emit('change', ['10', '15', '19', '45'])
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
      expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['10', '15', '19', '45'])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper
        .get(editMode === 'direct' ? '.mp-time-range__confirm-button' : '.mp-field-presentation__footer > .mp-button')
        .trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toEqual([[['10:15', '19:45']]])
    } finally {
      wrapper.unmount()
    }
  })
}
