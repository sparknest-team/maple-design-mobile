import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '../../date-range'
import FormItem from '../FormItem.vue'

it('preserves a non-ASCII whitespace label ID for a range group', async () => {
  const wrapper = mount(FormItem, {
    props: { label: 'Period', labelAttrs: { id: '\u00a0' } },
    slots: { default: () => h(DateRange, { editMode: 'direct' }) },
  })
  try {
    expect(wrapper.get('label').attributes('id')).toBe('\u00a0')
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe('\u00a0')
    await wrapper.setProps({ labelAttrs: { id: '  ' } })
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
