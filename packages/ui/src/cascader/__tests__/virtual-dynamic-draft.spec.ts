import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { CascaderPanel } from '../index'

test.each([false, true])(
  'virtual Cascader keeps focused custom content when other options are added or removed (multiple=%s)',
  async (multiple) => {
    const options = [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
    ]
    const wrapper = mount(CascaderPanel, {
      attachTo: document.body,
      props: { options, multiple, virtualListProps: { height: 160, estimatedSize: 32, fixedSize: true, buffer: 2 } },
      slots: { option: ({ data }: any) => h('input', { 'data-draft': data.value }) },
    })
    try {
      await nextTick()
      const input = wrapper.get('input[data-draft="a"]').element as HTMLInputElement
      input.value = 'unsaved draft'
      input.focus()
      await wrapper.setProps({ options: [...options, { value: 'c', label: 'Gamma' }] })
      await nextTick()
      expect(wrapper.get('input[data-draft="a"]').element).toBe(input)
      expect(input.value).toBe('unsaved draft')
      expect(document.activeElement).toBe(input)
      await wrapper.setProps({ options })
      await nextTick()
      expect(wrapper.get('input[data-draft="a"]').element).toBe(input)
      expect(input.value).toBe('unsaved draft')
      expect(document.activeElement).toBe(input)
    } finally {
      wrapper.unmount()
    }
  },
)
