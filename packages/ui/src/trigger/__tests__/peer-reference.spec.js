import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Trigger from '..'

const tick = async () => {
  await nextTick()
  await nextTick()
}
const mouse = (node, type) => node.dispatchEvent(new MouseEvent(type, { bubbles: type === 'click' }))
test('clicking an already-open hover peer reference dismisses the previous click trigger', async () => {
  const wrapper = mount(
    {
      render: () =>
        h(
          'div',
          ['click', 'hover'].map((trigger) =>
            h(
              Trigger,
              { trigger, popupContainer: false, mouseEnterDelay: 0 },
              {
                default: () => h('button', { 'data-reference': trigger }, trigger),
                content: () => h('button', { 'data-panel': trigger }, 'Panel'),
              },
            ),
          ),
        ),
    },
    { attachTo: document.body },
  )
  try {
    const triggers = wrapper.findAllComponents(Trigger)
    mouse(wrapper.get('[data-reference=click]').element, 'click')
    await tick()
    mouse(wrapper.get('[data-reference=hover]').element, 'mouseenter')
    await tick()
    expect(triggers[0].emitted('update:open')).toEqual([[true]])
    expect(triggers[1].emitted('update:open')).toEqual([[true]])
    // A higher popup still owns its own content; a peer reference is the explicit switch.
    mouse(wrapper.get('[data-panel=hover]').element, 'click')
    await tick()
    expect(triggers[0].emitted('update:open')).toEqual([[true]])
    mouse(wrapper.get('[data-reference=hover]').element, 'click')
    await tick()
    expect(triggers[0].emitted('update:open')).toEqual([[true], [false]])
    expect(triggers[1].emitted('update:open')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

test('inactive sibling references cannot receive outside clicks from an active hover peer', async () => {
  const show = ref(true)
  const Child = {
    render: () =>
      h(
        Trigger,
        { trigger: 'click', popupContainer: false },
        {
          default: () => h('button', { 'data-inactive-reference': '' }, 'Saved'),
          content: () => h('span', 'Saved panel'),
        },
      ),
  }
  const wrapper = mount(
    {
      render: () =>
        h('div', [
          h(KeepAlive, () => (show.value ? h(Child) : null)),
          h(
            Trigger,
            { trigger: 'hover', popupContainer: false, mouseEnterDelay: 0 },
            {
              default: () => h('button', { 'data-active-reference': '' }, 'Hover'),
              content: () => h('span', 'Hover panel'),
            },
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    const inactive = wrapper.findAllComponents(Trigger)[0]
    mouse(wrapper.get('[data-inactive-reference]').element, 'click')
    await tick()
    show.value = false
    await tick()
    const previousUpdates = [...(inactive.emitted('update:open') ?? [])]
    mouse(wrapper.get('[data-active-reference]').element, 'mouseenter')
    await tick()
    mouse(wrapper.get('[data-active-reference]').element, 'click')
    await tick()
    expect(inactive.emitted('click-outside')).toBeUndefined()
    expect(inactive.emitted('update:open')).toEqual(previousUpdates)
  } finally {
    wrapper.unmount()
  }
})
