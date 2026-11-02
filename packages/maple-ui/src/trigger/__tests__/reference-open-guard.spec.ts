import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Trigger from '..'

for (const mode of ['stop', 'prevent'] as const) {
  it(`preserves ordinary reference component ${mode} semantics`, async () => {
    const Reference = defineComponent({
      setup: () => () =>
        h(
          'button',
          {
            onClick: (event: MouseEvent) => {
              if (mode === 'stop') {
                event.stopPropagation()
              } else {
                event.preventDefault()
              }
            },
          },
          'Reference',
        ),
    })
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', popupContainer: false },
      slots: {
        default: () => h(Reference),
        content: () => h('div', 'Content'),
      },
    })
    try {
      wrapper.get('button').element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await flushPromises()
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    } finally {
      wrapper.unmount()
    }
  })
}
