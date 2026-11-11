import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tabs, { TabPane } from '..'

test('uses md by default and supports explicit size, RTL and defaults setter', async () => {
  const wrapper = mount(Tabs, { slots: { default: () => h(TabPane, { name: 'a', title: 'a' }) } })
  expect(wrapper.classes()).toContain('mp-tabs--size-md')
  await wrapper.setProps({ size: 'xl', dir: 'rtl' })
  expect(wrapper.classes()).toContain('mp-tabs--size-xl')
  expect(wrapper.attributes('dir')).toBe('rtl')
  wrapper.unmount()
  try {
    Tabs.setPropsDefaults({ size: 'sm' })
    const configured = mount(Tabs)
    expect(configured.classes()).toContain('mp-tabs--size-sm')
    configured.unmount()
  } finally {
    Tabs.setPropsDefaults({ size: undefined })
  }
})
