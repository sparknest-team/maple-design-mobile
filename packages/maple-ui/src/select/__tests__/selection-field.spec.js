import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Select from '../select'

describe('Select field integration', () => {
  for (const presentation of ['menu', 'picker', 'list']) {
    test(`${presentation}: removes the selected identity, not the first matching label`, async () => {
      const wrapper = mount(Select, {
        props: {
          presentation,
          multiple: true,
          showTags: true,
          modelValue: [1, 2],
          options: [
            { value: 1, label: '设备' },
            { value: 2, label: '设备' },
          ],
        },
      })
      await nextTick()
      await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toEqual([[[1]]])
      expect(wrapper.emitted('change')).toEqual([[[1]]])
      wrapper.unmount()
    })
  }

  test('renders formatted labels in a popup field', () => {
    const wrapper = mount(Select, {
      props: {
        presentation: 'list',
        modelValue: 1,
        options: [{ value: 1, label: '设备' }],
        formatLabel: (option) => `设备 ${option.value} true`,
      },
    })
    expect(wrapper.text()).toContain('设备 1 true')
    wrapper.unmount()
  })

  test('focuses the real input once and preserves custom clear slots', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: { modelValue: 1, clearable: true, options: [{ value: 1, label: '设备' }] },
    })
    await wrapper.get('input').trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
})
