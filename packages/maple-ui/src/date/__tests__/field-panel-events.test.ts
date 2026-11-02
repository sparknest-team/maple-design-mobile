import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRange from '../../date-range/DateRange.vue'
import DateInput from '../Date.vue'
import DateField from '../DateField.vue'
import DateShortcuts from '../DateShortcuts.vue'

const Content = defineComponent({ props: ['pickerValue', 'value'], emits: ['navigate'], template: '<div />' })
// Only floating surfaces and the platform renderer are stubbed; owners, tools,
// field presentation and public wrappers form the real event chain.
const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

function setup(range: boolean) {
  const initial = range ? ['2025-01-01', '2025-02-01'] : '2025-01-01'
  const candidate = range ? ['2025-03-01', '2025-04-01'] : '2025-03-01'
  const selected = range ? ['2025-01-15', '2025-01-20'] : '2025-01-15'
  const value = range ? ['2025-02-15', '2025-02-20'] : '2025-02-15'
  const nested = { pickerValue: initial, shortcuts: [{ label: 'next', value }], showNowButton: false }
  const common = { defaultOpen: true, format: 'DD/MM/YYYY' }
  const global = {
    stubs: { DatePanelContent: Content, TemporalTrigger: Surface, Trigger: Surface, MpTrigger: Surface },
  }
  const wrapper = range
    ? mount(DateRange, { props: { ...common, modelValue: selected as string[], dateRangePickerProps: nested }, global })
    : mount(DateInput, { props: { ...common, modelValue: selected as string, datePickerProps: nested }, global })
  wrappers.push(wrapper)
  return { wrapper, initial, candidate, selected, value, nested }
}

describe('date field panel event chain', () => {
  for (const range of [false, true]) {
    it(`forwards controlled viewport requests without selecting (range=${range})`, async () => {
      const { wrapper, initial, candidate, selected, nested } = setup(range)
      const content = wrapper.getComponent(Content)
      content.vm.$emit('navigate', candidate)
      await nextTick()
      expect(wrapper.emitted('update:pickerValue')).toEqual([[candidate]])
      expect(wrapper.emitted('picker-value-change')).toEqual([
        [
          candidate,
          range ? [new Date(2025, 2, 1), new Date(2025, 3, 1)] : new Date(2025, 2, 1),
          range ? ['01/03/2025', '01/04/2025'] : '01/03/2025',
        ],
      ])
      expect(content.props('pickerValue')).toEqual(initial)
      expect(content.props('value')).toEqual(selected)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('select')).toBeUndefined()
      if (range) {
        await wrapper.setProps({ dateRangePickerProps: { ...nested, pickerValue: candidate } })
      } else {
        await wrapper.setProps({ datePickerProps: { ...nested, pickerValue: candidate } })
      }
      expect(content.props('pickerValue')).toEqual(candidate)
      expect(wrapper.emitted('picker-value-change')).toHaveLength(1)
    })
    it(`forwards the chosen shortcut once while keeping the field draft uncommitted (range=${range})`, async () => {
      const { wrapper, value, selected } = setup(range)
      const shortcuts = wrapper.getComponent(DateShortcuts)
      const shortcut = shortcuts.props('shortcuts')[0]
      await shortcuts.get('button').trigger('click')
      expect(wrapper.emitted('select-shortcut')).toHaveLength(1)
      expect(wrapper.emitted('select-shortcut')?.[0][0]).toBe(shortcut)
      const endpointSelection = range && wrapper.getComponent(DateField).props('endpointSelection')
      expect(wrapper.emitted('select')?.[0][0]).toEqual(
        endpointSelection ? [(value as string[])[0], (selected as string[])[1]] : value,
      )
      expect(wrapper.emitted('select')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  }
})
