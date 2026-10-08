import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Popup from '../../popup'
import TimePopup from '../presentation/TimePopup.vue'

function create(props = {}) {
  return mount(TimePopup, {
    props: { open: true, title: 'Choose time', cancelText: 'Cancel', confirmText: 'Confirm', ...props },
    slots: { default: '<div class="time-content">Panel</div>' },
    global: { stubs: { MpPopup: { props: ['open', 'placement'], template: '<div><slot /></div>' } } },
  })
}

describe('mobile time popup presentation', () => {
  it('forwards content and actions without owning a transaction', async () => {
    const wrapper = create({ canConfirm: true })
    expect(wrapper.find('.time-content').text()).toBe('Panel')
    await wrapper.find('.mp-time__confirm-button').trigger('click')
    expect(wrapper.emitted('confirm')).toEqual([[]])
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.find('.mp-time__cancel-button').trigger('click')
    expect(wrapper.emitted('cancel')).toEqual([[]])
    expect(wrapper.props('open')).toBe(true)
    wrapper.unmount()
  })

  it('uses the controlled open value even when popupProps supplies another value', async () => {
    const wrapper = create({ open: false, popupProps: { open: true, placement: 'bottom' } })
    const popup = wrapper.findComponent(Popup)
    expect(popup.props('open')).toBe(false)
    popup.vm.$emit('update:open', true)
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    expect(popup.props('open')).toBe(false)
    await wrapper.setProps({ open: true })
    expect(popup.props('open')).toBe(true)
    wrapper.unmount()
  })

  it('preserves range styling and confirmation visibility without affecting another instance', async () => {
    const range = create({ range: true })
    const single = create({ canConfirm: true })
    expect(range.find('.mp-time-range__confirm-button').attributes('disabled')).toBeDefined()
    expect(range.find('.mp-time-range__cancel-button').attributes('mp-time-range-cover')).toBe('')
    await range.setProps({ disableConfirm: true })
    expect(range.find('.mp-time-range__confirm-button').exists()).toBe(false)
    expect(single.find('.mp-time__confirm-button').exists()).toBe(true)
    expect(single.emitted('update:open')).toBeUndefined()
    range.unmount()
    single.unmount()
  })
})
