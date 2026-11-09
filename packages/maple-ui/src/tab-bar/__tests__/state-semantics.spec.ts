import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TabBar, { TabBarItem } from '..'

test('group exposes committed selection rather than pending or rejected selection', async () => {
  const allow = ref(false)
  const wrapper = mount(TabBar, {
    attrs: { 'aria-label': 'Sections' },
    props: { defaultValue: 'a', beforeChange: () => allow.value },
    slots: { default: () => [h(TabBarItem, { name: 'a', label: 'A' }), h(TabBarItem, { name: 'b', label: 'B' })] },
  })
  try {
    await nextTick()
    await nextTick()
    expect(wrapper.get('[role=group]').attributes('aria-label')).toBe('Sections')
    const buttons = wrapper.findAll('button')
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false'])
    await buttons[1].trigger('click')
    await nextTick()
    await nextTick()
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false'])
    allow.value = true
    await buttons[1].trigger('click')
    await nextTick()
    await nextTick()
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['false', 'true'])
  } finally {
    wrapper.unmount()
  }
})
