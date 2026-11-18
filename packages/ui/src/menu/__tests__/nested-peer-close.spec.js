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
for (const unmountOnClose of [false, true]) {
  for (const popupContainer of [false, undefined]) {
    for (const keyboard of [false, true]) {
      test(`a sibling reference closes an open root and child with unmountOnClose=${unmountOnClose}, popupContainer=${popupContainer}, keyboard=${keyboard}`, async () => {
        const wrapper = mount(
          {
            render: () =>
              h('div', [
                h(
                  Menu,
                  {
                    popupContainer,
                    unmountOnClose,
                    submenuTrigger: 'click',
                    options: [{ value: 'parent', label: 'Parent', children: [{ value: 'child', label: 'Child' }] }],
                  },
                  { default: () => h('button', 'First') },
                ),
                h(
                  Menu,
                  { popupContainer, unmountOnClose, options: [{ value: 'other', label: 'Other' }] },
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
          const branch = menus[0].findComponent(MenuBranch)
          await branch.findComponent(MenuOption).trigger('click')
          await tick()
          expect(branch.findComponent(Trigger).props('open')).toBe(true)
          const second = wrapper.findAll('button')[1]
          if (keyboard) {
            second.element.focus()
            second.element.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
            )
          } else {
            await second.trigger('click')
          }
          await tick()
          expect(menus[0].emitted('update:open')).toEqual([[true], [false]])
          expect(menus[1].emitted('update:open')).toEqual([[true]])
          expect(menus[0].vm.computedOpen).toBe(false)
          expect(menus[1].vm.computedOpen).toBe(true)
          if (branch.exists()) {
            expect(branch.findComponent(Trigger).props('open')).toBe(false)
          }
        } finally {
          wrapper.unmount()
        }
      })
    }
  }
}
