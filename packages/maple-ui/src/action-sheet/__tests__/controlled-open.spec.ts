import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ActionSheet from '../ActionSheet.vue'

for (const accept of [false, true]) {
  test(`action close is a request that the controlled parent can ${accept ? 'accept' : 'decline'}`, async () => {
    const open = ref(true)
    const requests: boolean[] = []
    const Fixture = defineComponent({
      setup: () => () =>
        h(ActionSheet, {
          open: open.value,
          actions: [{ name: 'Choice' }],
          popupContainer: false,
          'onUpdate:open': (value) => {
            requests.push(value)
            if (accept) {
              open.value = value
            }
          },
        }),
    })
    const wrapper = mount(Fixture, { attachTo: document.body })
    try {
      await nextTick()
      const sheet = wrapper.getComponent(ActionSheet)
      ;(sheet.vm as any).handleSelect({ name: 'Choice' })
      await nextTick()
      expect(requests).toEqual([false])
      expect((sheet.vm as any).open).toBe(!accept)
      expect(wrapper.find('.mp-popup').exists()).toBe(true)
      expect(sheet.emitted('select')).toEqual([[{ name: 'Choice' }]])
    } finally {
      wrapper.unmount()
    }
  })
}

test('when released from control, the last controlled state becomes the local state', async () => {
  const wrapper = mount(ActionSheet, { props: { open: false, defaultOpen: true, popupContainer: false } })
  try {
    expect((wrapper.vm as any).open).toBe(false)
    await wrapper.setProps({ open: true })
    await wrapper.setProps({ open: undefined })
    expect((wrapper.vm as any).open).toBe(true)
    ;(wrapper.vm as any).handleSelect({ name: 'Choice' })
    await nextTick()
    expect((wrapper.vm as any).open).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
