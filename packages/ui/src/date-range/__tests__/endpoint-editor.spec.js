import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import DateRangePicker from '../DateRangePicker.vue'
import DateRange from '../index'

const initial = ['2026-10-20 09:45:17', '2026-10-25 18:00:23']
const summary = (wrapper, index) => wrapper.findAll('.mp-date-range-picker__summary')[index]
const toggle = (wrapper) => wrapper.get('.mp-date-range-picker__view-toggle')
const picker = (wrapper, selector) => wrapper.get(selector).getComponent(Picker)
const chooseDay = (wrapper, day) =>
  wrapper
    .get('.mp-day-picker__body')
    .findAll('button')
    .find((button) => button.text() === String(day))
    .trigger('click')

it('uses the calendar by default and switches the endpoint without selecting a value', async () => {
  expect(DateRange.props.panelType.default).toBe('calendar')
  const wrapper = mount(DateRangePicker, { props: { modelValue: ['2026-10-20', '2026-10-25'] } })
  try {
    expect(wrapper.find('.mp-date-range-picker__quick-time').exists()).toBe(false)
    expect(wrapper.find('.mp-date-range-picker__view-toggle').exists()).toBe(false)
    await summary(wrapper, 1).trigger('click')
    expect(summary(wrapper, 1).attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('.mp-date-range-picker__current').text()).toContain('结束日期')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await chooseDay(wrapper, 26)
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-20', '2026-10-26'])
  } finally {
    wrapper.unmount()
  }
})

it('shows 48 half-hour quick options without rounding the model on opening', async () => {
  const wrapper = mount(DateRangePicker, { props: { modelValue: initial, showTime: true } })
  try {
    const quick = picker(wrapper, '.mp-date-range-picker__quick-time')
    expect(quick.props('columns')[0]).toHaveLength(48)
    expect(
      quick
        .props('columns')[0]
        .slice(0, 3)
        .map((option) => option.value),
    ).toEqual(['00:00', '00:30', '01:00'])
    expect(quick.props('columns')[0].at(-1).value).toBe('23:30')
    expect(wrapper.get('.mp-date-range-picker__current-time-value').text()).toBe('09:45:17')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await summary(wrapper, 1).trigger('click')
    picker(wrapper, '.mp-date-range-picker__quick-time').vm.$emit('change', ['10:30'])
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([initial[0], '2026-10-25 10:30:00'])
  } finally {
    wrapper.unmount()
  }
})

for (const useSeconds of [false, true]) {
  it(`toggles the detailed time picker for the selected endpoint (seconds=${useSeconds})`, async () => {
    const value = useSeconds ? initial : initial.map((part) => part.slice(0, 16))
    const wrapper = mount(DateRangePicker, {
      props: {
        modelValue: value,
        showTime: true,
        timeFields: useSeconds ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
        format: useSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm',
        valueFormat: useSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm',
      },
    })
    try {
      await toggle(wrapper).trigger('click')
      expect(toggle(wrapper).attributes('aria-label')).toBe('选择日期')
      expect(wrapper.find('.mp-date-range-picker__quick-time').exists()).toBe(false)
      const detail = picker(wrapper, '.mp-date-range-picker__datetime-picker')
      expect(detail.props('columns')).toHaveLength(useSeconds ? 3 : 2)
      await summary(wrapper, 1).trigger('click')
      expect(wrapper.get('.mp-date-range-picker__current-label').text()).toBe('结束时间')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      picker(wrapper, '.mp-date-range-picker__datetime-picker').vm.$emit(
        'change',
        useSeconds ? ['19', '15', '12'] : ['19', '15'],
      )
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([
        value[0],
        `2026-10-25 19:15${useSeconds ? ':12' : ''}`,
      ])
      await toggle(wrapper).trigger('click')
      expect(toggle(wrapper).attributes('aria-label')).toBe('选择时间')
      expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
}

it('applies endpoint time rules to quick options and keeps a locked endpoint unchanged', async () => {
  const wrapper = mount(DateRangePicker, {
    props: {
      modelValue: initial,
      showTime: true,

      disabled: [true, false],
      disabledTime: (_date, side) => ({
        disabledHours: () => (side === 'end' ? [10] : [11]),
        disabledMinutes: () => [30],
      }),
    },
  })
  try {
    await summary(wrapper, 0).trigger('click')
    expect(summary(wrapper, 1).attributes('aria-pressed')).toBe('true')
    const quick = picker(wrapper, '.mp-date-range-picker__quick-time')
    const values = quick.props('columns')[0].map((option) => option.value)
    expect(values).not.toContain('10:00')
    expect(values).not.toContain('12:30')
    quick.vm.$emit('change', ['12:00'])
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([initial[0], '2026-10-25 12:00:00'])
  } finally {
    wrapper.unmount()
  }
})

it('keeps an incomplete date range as a draft until the other endpoint is chosen', async () => {
  const wrapper = mount(DateRangePicker, { props: { modelValue: [], pickerValue: ['2026-10-01', '2026-11-01'] } })
  try {
    await chooseDay(wrapper, 20)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(summary(wrapper, 0).text()).toContain('2026-10-20')
    expect(summary(wrapper, 1).text()).toContain('选择结束')
    await summary(wrapper, 1).trigger('click')
    await chooseDay(wrapper, 25)
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-20', '2026-10-25'])
  } finally {
    wrapper.unmount()
  }
})

for (const [type, value, parts, expected] of [
  ['year', ['2026', '2028'], ['2029'], ['2026', '2029']],
  ['month', ['2026-10', '2026-12'], ['2027', '01'], ['2026-10', '2027-01']],
  ['date', ['2026-10-20', '2026-10-25'], ['2026', '10', '26'], ['2026-10-20', '2026-10-26']],
]) {
  it(`keeps the selected ${type} endpoint connected to the column picker`, async () => {
    const wrapper = mount(DateRangePicker, { props: { type, modelValue: value, presentation: 'picker' } })
    try {
      await summary(wrapper, 1).trigger('click')
      const wheel = picker(wrapper, '.mp-date-range-picker__date-main')
      expect(wheel.props('columns')).toHaveLength(parts.length)
      wheel.vm.$emit('change', parts)
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(expected)
    } finally {
      wrapper.unmount()
    }
  })
}

it('returns to the calendar when time support is disabled while editing time', async () => {
  const wrapper = mount(DateRangePicker, { props: { modelValue: initial, showTime: true } })
  try {
    await toggle(wrapper).trigger('click')
    await wrapper.setProps({ showTime: false, modelValue: initial.map((value) => value.slice(0, 10)) })
    expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
    expect(wrapper.find('.mp-date-range-picker__view-toggle').exists()).toBe(false)
    expect(wrapper.find('.mp-date-range-picker__quick-time').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
