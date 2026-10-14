import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import FloatingPanel from '..'
import BasicDemo from '../example/demos/basic.vue'

test('all floating panel demo modes remain local and use container-sized anchors', async () => {
  const slotStub = { template: '<div><slot /></div>' }
  const wrapper = mount(BasicDemo, {
    global: {
      components: { MpFloatingPanel: FloatingPanel },
      stubs: {
        MpStyleProvider: slotStub,
        MpTabs: slotStub,
        MpTabsNavs: slotStub,
        MpTabNav: true,
        MpTabsItems: slotStub,
        MpTabItem: slotStub,
        MpCell: true,
      },
    },
  })
  try {
    for (const mode of ['basic', 'anchors', 'head']) {
      wrapper.vm.active = mode
      await nextTick()
      const panel = wrapper.findComponent(FloatingPanel)
      expect(panel.props('popupContainer')).toBe(false)
      expect(Math.max(...panel.props('anchors'))).toBe(320)
      expect(panel.props('contentDraggable')).toBe(mode !== 'head')
      expect(wrapper.find('.mp-floating-panel').exists()).toBe(true)
    }
  } finally {
    wrapper.unmount()
  }
})
