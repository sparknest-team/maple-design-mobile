import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '../../date-range'
import FormItem from '../FormItem.vue'

it('does not split an explicit label ID into unrelated ARIA references', async () => {
  const wrapper = mount(FormItem, {
    props: { label: 'Period', labelAttrs: { id: 'period label' } },
    slots: { default: () => h(DateRange, { editMode: 'direct' }) },
  })
  try {
    expect(wrapper.get('label').attributes('id')).toBe('period label')
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
    await wrapper.setProps({ labelAttrs: { id: 'period-label' } })
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe('period-label')
    await wrapper.setProps({ labelAttrs: { id: 'period\tlabel' } })
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
