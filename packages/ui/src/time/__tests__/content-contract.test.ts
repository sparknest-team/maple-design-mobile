import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Content from '../presentation/TimePanelContent.vue'
import TimePicker from '../TimePicker.vue'

describe('time content contract', () => {
  it('forwards slots and reactive owner refs without a second draft', async () => {
    const wrapper = mount(TimePicker, {
      props: { defaultValue: '09:00', format: 'HH:mm' },
      slots: {
        extra: () => h('span', { 'data-extra': '' }, '说明'),
        actions: ({ confirm, canConfirm, value }) =>
          h('button', { 'data-confirm': '', disabled: !canConfirm, onClick: confirm }, String(value)),
      },
    })
    const state = wrapper.findComponent(Content).props('state')
    expect(wrapper.get('[data-extra]').text()).toBe('说明')
    expect(wrapper.get('[data-confirm]').text()).toBe('09:00')
    await wrapper.setProps({ modelValue: '10:30' })
    expect(state.draft.value).toBe('10:30')
    expect(wrapper.get('[data-confirm]').text()).toBe('10:30')
    await wrapper.get('[data-confirm]').trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ readonly: true })
    expect(wrapper.get('[data-confirm]').attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })
  it('keeps presentation and draft state independent between instances', async () => {
    const first = mount(TimePicker, { props: { defaultValue: '09:00', format: 'HH:mm' } })
    const second = mount(TimePicker, { props: { defaultValue: '09:00', format: 'HH:mm' } })
    const a = first.findComponent(Content).props('state')
    const b = second.findComponent(Content).props('state')
    expect(a).not.toBe(b)
    expect(a.draft).not.toBe(b.draft)
    await first.setProps({ modelValue: '11:00' })
    expect(a.draft.value).toBe('11:00')
    expect(b.draft.value).toBe('09:00')
    expect(second.emitted('change')).toBeUndefined()
    first.unmount()
    second.unmount()
  })
})
