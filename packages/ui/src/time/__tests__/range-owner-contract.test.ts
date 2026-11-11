import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Content from '../../time-range/presentation/TimePanelContent.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'

describe('range panel owner contract', () => {
  it('owns one draft and forwards attributes and slots through the local view', async () => {
    const wrapper = mount(TimeRangePicker, {
      props: { defaultValue: ['09:00', '18:00'], format: 'HH:mm' },
      attrs: { 'data-range-panel': 'direct' },
      slots: {
        extra: () => h('span', { 'data-extra': '' }, '范围说明'),
        actions: ({ confirm, canConfirm, value }) =>
          h('button', { 'data-commit': '', disabled: !canConfirm, onClick: confirm }, JSON.stringify(value)),
      },
    })
    const content = wrapper.findComponent(Content)
    const state = content.props('state')
    expect(wrapper.attributes('data-range-panel')).toBe('direct')
    expect(wrapper.get('[data-extra]').text()).toBe('范围说明')
    expect(state.select(['10:00', '19:00'])).toBe(true)
    await nextTick()
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.get('[data-commit]').text()).toBe('["10:00","19:00"]')
    await wrapper.get('[data-commit]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['10:00', '19:00']]])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    await wrapper.get('[data-commit]').trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('confirm')).toHaveLength(2)
    expect(wrapper.emitted('open-change')).toBeUndefined()
    await wrapper.setProps({ readonly: true })
    expect(state.select(['11:00', '20:00'])).toBe(false)
    expect(state.confirm()).toBe(false)
    wrapper.unmount()
  })
  it('isolates range instances and replaces external models without notifying', async () => {
    const initial = ['09:00', '18:00']
    const first = mount(TimeRangePicker, { props: { modelValue: initial, format: 'HH:mm' } })
    const second = mount(TimeRangePicker, { props: { modelValue: initial, format: 'HH:mm' } })
    const a = first.findComponent(Content).props('state')
    const b = second.findComponent(Content).props('state')
    a.select(['11:00', '20:00'])
    expect(a.draft.value).toEqual(['11:00', '20:00'])
    expect(b.draft.value).toEqual(initial)
    expect(initial).toEqual(['09:00', '18:00'])
    await first.setProps({ modelValue: ['12:00', '21:00'] })
    expect(a.draft.value).toEqual(['12:00', '21:00'])
    expect(first.emitted('select')).toHaveLength(1)
    expect(first.emitted('change')).toBeUndefined()
    expect(second.emitted('select')).toBeUndefined()
    first.unmount()
    second.unmount()
  })
})
