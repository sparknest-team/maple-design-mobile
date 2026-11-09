import { Comment, createVNode, defineComponent, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tooltip from '../Tooltip.vue'

test('empty tooltip remains hidden without a dangling description, and reacts to content', async () => {
  const message = ref('')
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Tooltip,
        { open: true, popupContainer: false, animationName: '' },
        {
          default: () => h('button', { 'aria-describedby': 'help' }, 'Open'),
          content: () =>
            message.value ? h('span', message.value) : createVNode(Fragment, null, [createVNode(Comment), ' ']),
        },
      ),
  })
  const wrapper = mount(Fixture, { attachTo: document.body })
  try {
    await nextTick()
    const reference = wrapper.get('button')
    const tooltip = wrapper.getComponent(Tooltip)
    expect(wrapper.find('[role=tooltip]').exists()).toBe(false)
    expect(reference.attributes('aria-describedby')).toBe('help')
    message.value = 'Tip'
    await nextTick()
    const id = wrapper.get('[role=tooltip]').attributes('id')
    expect(reference.attributes('aria-describedby')?.split(/\s+/)).toEqual(['help', id])
    message.value = ''
    await nextTick()
    expect(wrapper.find('[role=tooltip]').exists()).toBe(false)
    expect(reference.attributes('aria-describedby')).toBe('help')
    expect(tooltip.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('comment slots use the prop fallback and hideEmpty=false keeps an empty tooltip', async () => {
  const wrapper = mount(Tooltip, {
    props: { open: true, content: 'Fallback', popupContainer: false },
    slots: { default: () => h('button', 'Open'), content: () => createVNode(Comment) },
  })
  try {
    await nextTick()
    expect(wrapper.get('[role=tooltip]').text()).toBe('Fallback')
    await wrapper.setProps({ content: '', hideEmpty: false })
    expect(wrapper.find('[role=tooltip]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
