import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tabs, { TabPane, tabsProps } from '..'

test('tablist label and close button refer to the visible title slot', async () => {
  const title = ref('Visible')
  const wrapper = mount(Tabs, {
    props: { editable: true, tabListAriaLabel: 'Settings' },
    slots: { default: () => h(TabPane, { name: 'a' }, { title: () => title.value }) },
  })
  try {
    expect(wrapper.get('[role=tablist]').attributes('aria-label')).toBe('Settings')
    const close = wrapper.get('button[aria-labelledby]')
    const ids = close.element.getAttribute('aria-labelledby')!.split(' ')
    expect(ids).toHaveLength(2)
    expect(wrapper.get(`[id="${ids[1]}"]`).text()).toBe('Visible')
    title.value = 'Updated'
    await nextTick()
    expect(wrapper.get(`[id="${ids[1]}"]`).text()).toBe('Updated')
  } finally {
    wrapper.unmount()
  }
})

test('enum validators reject unsupported values', () => {
  expect(tabsProps.orientation.validator('vertical')).toBe(true)
  expect(tabsProps.orientation.validator('diagonal' as never)).toBe(false)
  expect(tabsProps.indicatorPosition.validator('left' as never)).toBe(false)
  expect(tabsProps.scrollPosition.validator(Infinity)).toBe(false)
  expect(tabsProps.scrollPosition.validator(-5)).toBe(true)
  expect(tabsProps.trigger.validator('focus' as never)).toBe(false)
})
