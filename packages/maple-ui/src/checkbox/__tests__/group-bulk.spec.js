import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Radio, { RadioGroup } from '../../radio'
import Checkbox, { CheckboxGroup } from '../index'

describe('Maple bulk selection and radio entry focus', () => {
  it('checkAll/inverseAll preserve locked and unloaded values and enforce max', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { defaultValue: ['remote', 'locked', 'a'], max: 4 },
      slots: {
        default: () => [
          h(Checkbox, { value: 'locked', disabled: true }),
          h(Checkbox, { value: 'a' }),
          h(Checkbox, { value: 'b' }),
          h(Checkbox, { value: 'c', readonly: true }),
          h(Checkbox, { value: 'd' }),
        ],
      },
    })
    await nextTick()
    expect(wrapper.vm.inverseAll()).toEqual(['remote', 'locked', 'b', 'd'])
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.vm.checkAll()).toEqual(['remote', 'locked', 'b', 'd'])
    expect(wrapper.emitted('change')).toHaveLength(1)
    await wrapper.setProps({ readonly: true })
    expect(wrapper.vm.inverseAll()).toEqual(['remote', 'locked', 'b', 'd'])
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })

  it('bulk proposals remain controlled and disabled methods are inert', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { modelValue: [], max: 1 },
      slots: { default: () => ['a', 'b'].map((value) => h(Checkbox, { value })) },
    })
    await nextTick()
    expect(wrapper.vm.checkAll()).toEqual(['a'])
    await nextTick()
    expect(wrapper.find('.mp-checkbox__action').classes()).toContain('mp-checkbox--unchecked')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.vm.checkAll()).toEqual([])
    wrapper.findComponent(Checkbox).vm.toggle()
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })

  it('radio focus entry recovers after clearing, disabling and removing a selected option', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'b',
        options: [
          { value: 'a', label: 'A', disabled: true },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ],
      },
    })
    await nextTick()
    await nextTick()
    const tabs = () => wrapper.findAll('.mp-radio__action').map((item) => item.attributes('tabindex'))
    expect(tabs()).toEqual([undefined, '0', '-1'])
    await wrapper.setProps({ modelValue: '' })
    expect(tabs()).toEqual([undefined, '0', '-1'])
    await wrapper.setProps({
      options: [
        { value: 'a', label: 'A', disabled: true },
        { value: 'c', label: 'C' },
      ],
    })
    await nextTick()
    await nextTick()
    expect(tabs()).toEqual([undefined, '0'])
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('group readonly prevents keyboard selection and exposed child toggles', async () => {
    const wrapper = mount(RadioGroup, {
      props: { readonly: true, defaultValue: 'a' },
      slots: { default: () => ['a', 'b'].map((value) => h(Radio, { value })) },
    })
    await nextTick()
    wrapper.findAllComponents(Radio)[1].vm.select()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
})
