import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Steps, { Step, stepsProps } from '..'

test('zero waits and values after the final step finish every step', async () => {
  const wrapper = mount(Steps, {
    props: { modelValue: 0 },
    slots: { default: () => [h(Step, { title: 'A' }), h(Step, { title: 'B' })] },
  })
  try {
    expect(wrapper.findAll('[aria-current=step]')).toHaveLength(0)
    expect(wrapper.findAll('[class*=item-wait]')).toHaveLength(2)
    await wrapper.setProps({ modelValue: 3 })
    expect(wrapper.findAll('[aria-current=step]')).toHaveLength(0)
    expect(wrapper.findAll('[class*=item-finish]')).toHaveLength(2)
    expect(stepsProps.modelValue.validator(NaN)).toBe(false)
    expect(stepsProps.modelValue.validator(1.5)).toBe(false)
    expect(stepsProps.modelValue.validator(0)).toBe(true)
    expect(stepsProps.orientation.validator('vertical')).toBe(true)
    expect(stepsProps.orientation.validator('diagonal' as never)).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
