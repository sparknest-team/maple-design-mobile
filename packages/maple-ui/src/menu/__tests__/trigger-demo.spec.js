import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Menu, { MenuOption } from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/trigger.vue'

test('trigger demo closes the click menu when the hover button is clicked', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const wrapper = mount(Demo, {
    attachTo: document.body,
    global: {
      components: {
        MpMenu: Menu,
        MpMenuOption: MenuOption,
        MpButton: Button,
        MpSpace: Space,
      },
    },
  })
  try {
    const menus = wrapper.findAllComponents(Menu)
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await nextTick()
    expect(menus[0].emitted('update:open')).toEqual([[true]])
    await buttons[1].trigger('mouseenter')
    vi.advanceTimersByTime(110)
    await nextTick()
    expect(menus[1].emitted('update:open')).toEqual([[true]])
    await buttons[1].trigger('click')
    await nextTick()
    expect(menus[0].emitted('update:open')).toEqual([[true], [false]])
    expect(menus[1].emitted('update:open')).toEqual([[true]])
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
