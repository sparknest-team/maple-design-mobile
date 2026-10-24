import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Menu, { MenuOption } from '..'
import Trigger from '../../trigger'
import MenuBranch from '../MenuBranch.vue'

const tick = async () => {
  await nextTick()
  await nextTick()
}
test('clicking a sibling reference closes the old root even when its submenu owns the top layer', async () => {
  const wrapper = mount(
    {
      render: () =>
        h('div', [
          h(
            Menu,
            {
              popupContainer: false,
              submenuTrigger: 'click',
              options: [{ value: 'parent', label: 'Parent', children: [{ value: 'child', label: 'Child' }] }],
            },
            { default: () => h('button', 'First') },
          ),
          h(
            Menu,
            { popupContainer: false, options: [{ value: 'other', label: 'Other' }] },
            { default: () => h('button', 'Second') },
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    const menus = wrapper.findAllComponents(Menu)
    await wrapper.findAll('button')[0].trigger('click')
    await tick()
    await wrapper.get('[role="menuitem"]').trigger('click')
    await tick()
    expect(wrapper.findAll('[role="menu"]')).toHaveLength(2)
    await wrapper.findAll('button')[1].trigger('click')
    await tick()
    expect(menus[0].emitted('update:open')).toEqual([[true], [false]])
    expect(menus[1].emitted('update:open')).toEqual([[true]])
    expect(menus[0].vm.computedOpen).toBe(false)
    expect(menus[1].vm.computedOpen).toBe(true)
    expect(wrapper.text()).toContain('Other')
    const branch = menus[0].findComponent(MenuBranch)
    if (branch.exists()) {
      expect(branch.findComponent(Trigger).props('open')).toBe(false)
    }
  } finally {
    wrapper.unmount()
  }
})
