import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../TimePicker.vue'

describe('public time bounds', () => {
  it.each([false, true])('checks inclusive bounds and dynamic changes, range=%s', async (range) => {
    const value = range ? ['10:30:38', '10:31:02'] : '10:30:38'
    const props = { format: 'HH:mm:ss', min: '10:30:38', max: '10:31:02' }
    const slots = {
      actions: ({ confirm, canConfirm }: { confirm: () => void; canConfirm: boolean }) =>
        h('button', { 'data-confirm': '', disabled: !canConfirm, onClick: confirm }, '确认'),
    }
    const wrapper = range
      ? mount(TimeRangePicker, { props: { ...props, modelValue: ['10:30:38', '10:31:02'] }, slots })
      : mount(TimePicker, { props: { ...props, modelValue: '10:30:38' }, slots })
    await wrapper.get('[data-confirm]').trigger('click')
    expect(wrapper.emitted('confirm')?.[0][0]).toEqual(value)
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ min: '10:30:39' })
    expect(wrapper.get('[data-confirm]').attributes('disabled')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ min: '10:30:38', max: '10:30:37' })
    expect(wrapper.get('[data-confirm]').attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })
  it('keeps bounds in 24-hour format with a 12-hour display', async () => {
    const wrapper = mount(TimePicker, {
      props: { modelValue: '01:30 PM', format: 'hh:mm A', min: '13:00', max: '14:00' },
      slots: {
        actions: ({ confirm, canConfirm }) =>
          h('button', { 'data-confirm': '', disabled: !canConfirm, onClick: confirm }, '确认'),
      },
    })
    await wrapper.get('[data-confirm]').trigger('click')
    expect(wrapper.emitted('confirm')?.[0][0]).toBe('01:30 PM')
    await wrapper.setProps({ modelValue: '01:30 AM' })
    expect(wrapper.get('[data-confirm]').attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })
})
