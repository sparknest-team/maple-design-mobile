import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Button from '../../button'
import Divider from '../../divider'
import Space from '../../space'
import Comparison from '../example/demos/group-declaration-comparison.vue'
import Checkbox, { CheckboxGroup } from '../index'

it('uses the grouped demo ref for check-all and inverse actions', async () => {
  const wrapper = mount(Comparison, {
    global: {
      components: {
        MpCheckbox: Checkbox,
        MpCheckboxGroup: CheckboxGroup,
        MpButton: Button,
        MpDivider: Divider,
        MpSpace: Space,
      },
    },
  })
  try {
    const group = wrapper.findComponent(CheckboxGroup)
    const actions = wrapper.findAll('button')
    await actions[0].trigger('click')
    expect(group.props('modelValue')).toEqual([0, 1])
    await actions[1].trigger('click')
    expect(group.props('modelValue')).toEqual([])
  } finally {
    wrapper.unmount()
  }
})
