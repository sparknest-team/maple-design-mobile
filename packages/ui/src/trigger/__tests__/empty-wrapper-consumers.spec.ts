import { createCommentVNode, defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Popover from '../../popover/Popover.vue'
import Tooltip from '../../tooltip/Tooltip.vue'

test.each([
  ['Popover', Popover, 'group'],
  ['Tooltip', Tooltip, 'tooltip'],
] as const)('%s treats an empty component node as content', async (_name, Component, role) => {
  const Empty = { render: () => null }
  const wrapper = mount(Component, {
    props: { open: true, hideEmpty: true, popupContainer: false, animationName: '' },
    slots: { default: () => h('button', 'Reference'), content: () => h(Empty) },
  })
  try {
    await nextTick()
    const panel = wrapper.get(`[role="${role}"]`)
    expect(panel.text()).toBe('')
    if (role === 'tooltip') {
      expect(wrapper.get('button').attributes('aria-describedby')?.split(/\s+/)).toContain(panel.attributes('id'))
    }
  } finally {
    wrapper.unmount()
  }
})

test('conditionally rendering content adds and removes the tooltip description', async () => {
  const show = ref(false)
  const Tip = { render: () => h('span', 'Details') }
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Tooltip,
        {
          open: true,
          popupContainer: false,
          animationName: '',
        },
        {
          default: () => h('button', { 'aria-describedby': 'existing-help' }, 'Reference'),
          content: () => (show.value ? h(Tip) : createCommentVNode()),
        },
      ),
  })
  const wrapper = mount(Fixture)
  try {
    await nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    expect(wrapper.get('button').attributes('aria-describedby')).toBe('existing-help')
    show.value = true
    await nextTick()
    await nextTick()
    const panel = wrapper.get('[role="tooltip"]')
    expect(panel.text()).toBe('Details')
    expect(wrapper.get('button').attributes('aria-describedby')?.split(/\s+/)).toEqual([
      'existing-help',
      panel.attributes('id'),
    ])
    show.value = false
    await nextTick()
    await nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    expect(wrapper.get('button').attributes('aria-describedby')).toBe('existing-help')
  } finally {
    wrapper.unmount()
  }
})
