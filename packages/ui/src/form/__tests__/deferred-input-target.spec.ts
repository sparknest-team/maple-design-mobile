import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Input from '../../input'
import FormItem from '../FormItem.vue'

it.each([false, 'body'] as const)(
  'keeps a single label across the deferred Input editor (%s)',
  async (popupContainer) => {
    const open = ref(false)
    const second = ref(false)
    const id = ref('account')
    const wrapper = mount(FormItem, {
      attachTo: document.body,
      props: { label: 'Account' },
      slots: {
        default: () => [
          h(Input, { editMode: 'popup', open: open.value, popupContainer, id: id.value }),
          second.value ? h('input', { 'aria-label': 'Other' }) : null,
        ],
      },
    })
    try {
      await flushPromises()
      const label = wrapper.get('label').element
      const closed = wrapper.get('button#account').element
      expect(label.control).toBe(closed)
      open.value = true
      await flushPromises()
      expect(label.control?.tagName).toBe('INPUT')
      expect(label.control?.id).toBe('account')
      id.value = 'changed-account'
      await flushPromises()
      expect(label.control?.id).toBe(id.value)
      second.value = true
      await flushPromises()
      expect(label.control).toBeNull()
      expect(wrapper.get('[role=group]').attributes('aria-labelledby')).toBe(label.id)
      second.value = false
      open.value = false
      await flushPromises()
      expect(label.control).toBe(closed)
      expect(label.htmlFor).toBe(id.value)
    } finally {
      wrapper.unmount()
    }
  },
)
