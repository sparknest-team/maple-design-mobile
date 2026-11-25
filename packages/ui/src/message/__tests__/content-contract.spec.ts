import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Message from '..'
import { messageProps } from '../props'

test('boolean content,icon and action use the declared Vue child protocol without prop warnings', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Message.Component, {
    props: { open: true, duration: 0, popupContainer: false, content: false, icon: true, action: false },
  })
  expect(w.find('[role="alert"]').exists()).toBe(true)
  expect(warn.mock.calls.filter((call) => String(call[0]).includes('Invalid prop'))).toHaveLength(0)
  w.unmount()
  warn.mockRestore()
})
test('render functions support nested Vue children and preserve explicit slot precedence', () => {
  const w = mount(Message.Component, {
    props: {
      open: true,
      duration: 0,
      popupContainer: false,
      content: () => [h('strong', 'Text'), false],
      icon: () => h('span', 'Icon'),
      action: () => h('button', 'Action'),
    },
  })
  expect(w.get('strong').text()).toBe('Text')
  expect(w.get('button').text()).toBe('Action')
  w.unmount()
  const local = mount(Message.Component, {
    props: { open: true, duration: 0, popupContainer: false, content: 'Prop content' },
    slots: { default: () => 'Slot content' },
  })
  expect(local.text()).toContain('Slot content')
  expect(local.text()).not.toContain('Prop content')
  local.unmount()
})
test('duration diagnostics agree with finite nonnegative values and documented zero fallback', () => {
  for (const duration of [0, 1, 3000]) {
    expect(messageProps.duration.validator(duration)).toBe(true)
  }
  for (const duration of [-1, NaN, Infinity, -Infinity]) {
    expect(messageProps.duration.validator(duration)).toBe(false)
  }
})

test('numeric zero renders in the icon and action regions', () => {
  const wrapper = mount(Message.Component, {
    props: { open: true, duration: 0, popupContainer: false, icon: 0, action: 0 },
  })
  try {
    expect(wrapper.get('.mp-message__icon').text()).toBe('0')
    expect(wrapper.get('.mp-message__action').text()).toBe('0')
  } finally {
    wrapper.unmount()
  }
})
