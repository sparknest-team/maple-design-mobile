import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

const options = [
  { value: 'a', label: '相同', children: [{ value: 'one', label: '相同' }] },
  { value: 'b', label: '相同', children: [{ value: 'two', label: '相同' }] },
]
describe('Cascader selection identity', () => {
  test('removes only the selected scalar leaf, not every equal label', async () => {
    const wrapper = mount(Cascader, {
      props: { options, pathMode: false, multiple: true, showTags: true, modelValue: ['one', 'two'] },
    })
    await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['one']]])
    wrapper.unmount()
  })
  test('removes path values by stable path identity', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        pathMode: true,
        multiple: true,
        showTags: true,
        modelValue: [
          ['a', 'one'],
          ['b', 'two'],
        ],
      },
    })
    await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[[['a', 'one']]]])
    wrapper.unmount()
  })
  test('readonly values cannot be cleared or removed', () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        pathMode: false,
        multiple: true,
        showTags: true,
        modelValue: ['one'],
        clearable: true,
        readonly: true,
      },
    })
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    wrapper.unmount()
  })
})
