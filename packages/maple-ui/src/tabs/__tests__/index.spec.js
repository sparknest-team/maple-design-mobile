import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tabs from '..'

test('Tabs public entry', () => {
  const wrapper = mount(Tabs)
  expect(wrapper.exists()).toBe(true)
  wrapper.unmount()
})
