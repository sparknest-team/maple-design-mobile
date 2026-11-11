import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { mockScrollIntoView } from '../../utils/test'
import DatePicker from '../DatePicker.vue'

mockScrollIntoView()
describe('calendar controlled viewport adapter', () => {
  it('requests navigation, restores rejected viewport, and accepts a later prop update', async () => {
    const wrapper = mount(DatePicker, {
      props: { presentation: 'calendar', modelValue: '2025-01-15', pickerValue: '2025-01-01' },
    })
    await nextTick()
    const title = () => wrapper.find('.mp-date-picker-header__value').text()
    const original = title()
    await wrapper.find('.mp-date-picker-header button').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:pickerValue')?.[0]).toEqual(['2024-12-01'])
    expect(title()).toBe(original)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ pickerValue: '2024-12-01' })
    await nextTick()
    expect(title()).not.toBe(original)
    await wrapper.setProps({ shortcuts: [{ label: 'next', value: '2025-02-01' }] })
    const accepted = title()
    await wrapper.find('.mp-date-shortcuts button').trigger('mouseenter')
    expect(title()).not.toBe(accepted)
    expect(wrapper.emitted('update:pickerValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.find('.mp-date-shortcuts button').trigger('mouseleave')
    expect(title()).toBe(accepted)
    wrapper.unmount()
  })
})
