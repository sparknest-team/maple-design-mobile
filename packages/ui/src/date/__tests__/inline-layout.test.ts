import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRange from '../../date-range/DateRange.vue'
import Picker from '../../picker/Picker.vue'
import DateInput from '../Date.vue'
import DatePicker from '../DatePicker.vue'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('inline date time controls', () => {
  it('switches a single date between calendar and time and confirms its draft', async () => {
    const wrapper = mount(DateInput, {
      attachTo: document.body,
      props: { defaultOpen: true, modelValue: '2026-10-20 09:30:00', showTime: true, disableConfirm: false },
      global: { stubs: { Trigger: Surface, MpTrigger: Surface, teleport: true } },
    })
    wrappers.push(wrapper)
    expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
    expect(wrapper.find('.mp-date-picker__view-tabs').exists()).toBe(false)
    expect(wrapper.findComponent(Picker).exists()).toBe(true)
    await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
    expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(false)
    const picker = wrapper.getComponent(Picker)
    expect(picker.props('columns')).toHaveLength(3)
    picker.vm.$emit('change', ['10', '30', '00'])
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('.mp-date-panel-actions .mp-button:last-child').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('2026-10-20 10:30:00')
  })

  it('switches a range between the calendar and the selected time endpoint without committing', async () => {
    const wrapper = mount(DateRange, {
      attachTo: document.body,
      props: { defaultOpen: true, modelValue: ['2026-10-20 09:30:00', '2026-10-25 18:00:00'], showTime: true },
      global: { stubs: { Trigger: Surface, MpTrigger: Surface, teleport: true } },
    })
    wrappers.push(wrapper)
    expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
    expect(wrapper.findComponent(Picker).exists()).toBe(true)
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    expect(wrapper.find('.mp-date-picker__body').exists()).toBe(false)
    expect(wrapper.getComponent(Picker).props('modelValue')).toEqual(['09', '30', '00'])
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    expect(wrapper.get('.mp-date-picker__body').isVisible()).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('keeps the standalone picker presentation independent of the inline layout', () => {
    const wrapper = mount(DatePicker, {
      props: { presentation: 'picker', showTime: true, modelValue: '2026-10-20 09:30:00' },
    })
    wrappers.push(wrapper)
    expect(wrapper.find('.mp-date-picker--side-by-side-time').exists()).toBe(false)
    expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(3)
  })
})
