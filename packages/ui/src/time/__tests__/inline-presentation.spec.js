import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Trigger from '../../trigger'
import TimeFieldPanel from '../presentation/TimeFieldPanel.vue'
import Time from '../Time.vue'

const surface = {
  props: ['open', 'placement', 'trigger', 'popupContainer'],
  template: '<div><slot /><slot name="content" /></div>',
}
describe('inline time presentation', () => {
  it('anchors its panel, keeps one confirmation, and leaves drafts uncommitted on Escape', async () => {
    const wrapper = mount(Time, {
      props: { defaultValue: '09:30', format: 'HH:mm', popupContainer: false },
      global: { stubs: { MpTrigger: surface, MpPicker: true } },
    })
    expect(wrapper.findComponent(TimeFieldPanel).exists()).toBe(false)
    await wrapper.find('.mp-field-decorator').trigger('click')
    expect(wrapper.findComponent(Trigger).props()).toMatchObject({ open: true, placement: 'bottom-start', trigger: [] })
    expect(wrapper.findAll('.mp-time__confirm-button')).toHaveLength(1)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    wrapper.findComponent({ name: 'MpPicker' }).vm.$emit('change', ['10', '30'])
    await wrapper.find('.mp-time').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findComponent(TimeFieldPanel).exists()).toBe(false)
    wrapper.unmount()
  })

  it('forwards only content and confirmation from the reusable panel', async () => {
    const wrapper = mount(TimeFieldPanel, {
      props: { range: true, canConfirm: false, confirmText: 'Confirm' },
      slots: { default: '<div class="time-content">Panel</div>' },
    })
    expect(wrapper.find('.time-content').text()).toBe('Panel')
    expect(wrapper.find('.mp-time-range__confirm-button').attributes('disabled')).toBeDefined()
    await wrapper.setProps({ canConfirm: true })
    await wrapper.find('.mp-time-range__confirm-button').trigger('click')
    expect(wrapper.emitted('confirm')).toEqual([[]])
    await wrapper.setProps({ disableConfirm: true })
    expect(wrapper.find('.mp-time-range__confirm-button').exists()).toBe(false)
    wrapper.unmount()
  })
})
