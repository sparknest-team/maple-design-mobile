import { Comment, createVNode, defineComponent, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Popover from '../Popover.vue'

test('hideEmpty tracks actual content without changing the controlled open value', async () => {
  const message = ref('')
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Popover,
        { open: true, hideEmpty: true, popupContainer: false, animationName: '' },
        {
          default: () => h('button', 'Open'),
          content: () =>
            message.value ? h('span', message.value) : createVNode(Fragment, null, [createVNode(Comment), '  ']),
        },
      ),
  })
  const wrapper = mount(Fixture, { attachTo: document.body })
  try {
    await nextTick()
    expect(wrapper.find('[role=group]').exists()).toBe(false)
    const popover = wrapper.getComponent(Popover)
    expect(popover.emitted('update:open')).toBeUndefined()
    message.value = 'Available'
    await nextTick()
    expect(wrapper.get('[role=group]').text()).toBe('Available')
    message.value = ''
    await nextTick()
    expect(wrapper.find('[role=group]').exists()).toBe(false)
    expect(popover.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('comment-only slots fall back to props and explicit hideEmpty false retains empty panels', async () => {
  const wrapper = mount(Popover, {
    props: { open: true, hideEmpty: true, content: 'Fallback', popupContainer: false },
    slots: { default: () => h('button', 'Open'), content: () => createVNode(Comment) },
  })
  try {
    await nextTick()
    expect(wrapper.get('[role=group]').text()).toBe('Fallback')
    await wrapper.setProps({ content: '', hideEmpty: false })
    expect(wrapper.find('[role=group]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
