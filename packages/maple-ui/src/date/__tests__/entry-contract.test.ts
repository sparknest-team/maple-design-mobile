import { createApp, defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRange, { DateRangePicker, dateRangePickerProps } from '../../date-range'
import DateInput, { DatePicker, datePickerProps, dateProps } from '../index'
import { datePanelProps } from '../panel-props'

const Content = defineComponent({
  props: ['value', 'options', 'canConfirm'],
  emits: ['select', 'confirm'],
  template: '<div><slot name="actions" :confirm="() => $emit(\'confirm\')" :disabled="!canConfirm" /></div>',
})

describe('date public entry contract', () => {
  it('keeps field and portal props out of pure panel declarations', () => {
    for (const panel of [datePickerProps, dateRangePickerProps]) {
      for (const key of [
        'open',
        'defaultOpen',
        'popupContainer',
        'placement',
        'triggerProps',
        'placeholder',
        'variant',
        'clearable',
        'disabledInput',
        'showConfirmBtn',
        'firstDayOfWeek',
        'showNowBtn',
        'locale',
      ]) {
        expect(Object.keys(panel)).not.toContain(key)
      }
      for (const key of Object.keys(datePanelProps)) {
        expect(Object.keys(panel)).toContain(key)
      }
    }
    expect(Object.keys(datePickerProps)).toContain('showNowButton')
    expect(Object.keys(dateRangePickerProps)).toContain('exchangeTime')
    expect(Object.keys(dateRangePickerProps)).not.toContain('showNowButton')
    for (const key of ['open', 'popupContainer', 'placeholder', 'variant', 'clearable']) {
      expect(Object.keys(dateProps)).toContain(key)
    }
  })

  it('installs fields and panels independently without sharing component instances', () => {
    for (const component of [DateInput, DateRange, DatePicker, DateRangePicker]) {
      const app = createApp({ render: () => h('div') })
      app.use(component)
      expect(app.component(component.name!)).toBe(component)
    }
    expect(DateInput.Picker).toBe(DatePicker)
    expect(DateRange.Picker).toBe(DateRangePicker)
    expect(DatePicker).not.toBe(DateRangePicker)
  })

  it('allows only numeric integer week starts from zero to six', () => {
    expect(datePanelProps.dayStartOfWeek.default).toBe(0)
    for (const value of [0, 1, 6]) {
      expect(datePanelProps.dayStartOfWeek.validator(value)).toBe(true)
    }
    for (const value of [-1, 7, 0.5, NaN, '1']) {
      expect(datePanelProps.dayStartOfWeek.validator(value as number)).toBe(false)
    }
  })

  it('passes panel presentation options reactively without exposing popup state', async () => {
    const wrapper = mount(DatePicker, {
      props: { defaultValue: '2025-01-01', dayStartOfWeek: 1 },
      global: { stubs: { DatePanelContent: Content } },
    })
    const content = wrapper.getComponent(Content)
    expect(content.props('value')).toBe('2025-01-01')
    expect(content.props('options').dayStartOfWeek).toBe(1)
    await wrapper.setProps({ dayStartOfWeek: 6 })
    expect(content.props('options').dayStartOfWeek).toBe(6)
    expect(wrapper.emitted('open-change')).toBeUndefined()
    wrapper.unmount()
  })

  it('forwards single selection payloads once and supports preview/confirm actions', async () => {
    const wrapper = mount(DatePicker, {
      props: { defaultValue: '2025-01-01', format: 'DD/MM/YYYY', disableConfirm: false },
      global: { stubs: { DatePanelContent: Content } },
      slots: {
        actions: ({ confirm, disabled }: { confirm: () => void; disabled: boolean }) =>
          h('button', { disabled, onClick: confirm }, 'Commit'),
      },
    })
    const content = wrapper.getComponent(Content)
    content.vm.$emit('select', '2025-01-02')
    await nextTick()
    expect(wrapper.emitted('select')?.[0]).toEqual(['2025-01-02', new Date(2025, 0, 2), '02/01/2025'])
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.findAll('button')).toHaveLength(1)
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['2025-01-02']])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    wrapper.unmount()
  })

  it('rejects invalid ranges and preserves locked endpoint ownership', async () => {
    const wrapper = mount(DateRangePicker, {
      props: { modelValue: ['2025-01-01', '2025-01-03'], disabled: [true, false] },
      global: { stubs: { DatePanelContent: Content } },
    })
    const content = wrapper.getComponent(Content)
    content.vm.$emit('select', ['2025-01-02', '2025-01-04'])
    content.vm.$emit('select', ['2025-01-01'])
    await nextTick()
    expect(wrapper.emitted('change')).toBeUndefined()
    content.vm.$emit('select', ['2025-01-01', '2025-01-04'])
    await nextTick()
    expect(wrapper.emitted('change')?.[0][0]).toEqual(['2025-01-01', '2025-01-04'])
    expect(wrapper.emitted('change')?.[0][1]).toEqual([new Date(2025, 0, 1), new Date(2025, 0, 4)])
    wrapper.unmount()
  })
})
