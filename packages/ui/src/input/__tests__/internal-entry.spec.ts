import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import BaseInput from '../base'
import Input from '../index'
import { inputProps } from '../props'

test('the internal input shares public defaults and component identity', () => {
  expect(BaseInput).toBe(Input)
  const original = inputProps.placeholder
  try {
    Input.setPropsDefaults({ placeholder: 'Shared default' })
    const wrapper = mount(BaseInput)
    expect(wrapper.props('placeholder')).toBe('Shared default')
    wrapper.unmount()
  } finally {
    inputProps.placeholder = original
  }
})
