import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

const wrappers = [],
  hosts = []
function setup(component, options = {}, dir = 'rtl') {
  const host = document.createElement('div')
  host.dir = dir
  document.body.append(host)
  hosts.push(host)
  const wrapper = mount(component, { attachTo: host, ...options })
  wrappers.push(wrapper)
  return wrapper
}
async function settled() {
  await nextTick()
  await Promise.resolve()
  await nextTick()
  await nextTick()
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  hosts.splice(0).forEach((h) => h.remove())
})
test('mobile bar keyboard mirrors dynamically and teleported option panels inherit their item scope', async () => {
  const wrapper = setup(NavMenu, {
    slots: {
      default: () => [
        h(NavMenuItem, {
          label: 'One',
          name: 'one',
          options: [
            { key: 'a', label: 'A' },
            { key: 'b', label: 'B' },
          ],
        }),
        h(NavMenuItem, { label: 'Two', name: 'two' }),
      ],
    },
  })
  await settled()
  const items = wrapper.findAll('[data-nav-item]')
  items[0].element.focus()
  await items[0].trigger('keydown', { key: 'ArrowLeft' })
  expect(document.activeElement).toBe(items[1].element)
  hosts[0].dir = 'ltr'
  await settled()
  await items[1].trigger('keydown', { key: 'ArrowLeft' })
  expect(document.activeElement).toBe(items[0].element)
  await items[0].trigger('keydown', { key: 'ArrowDown' })
  await settled()
  expect(document.querySelector('.mp-nav-menu__popup').closest('[dir]').getAttribute('dir')).toBe('ltr')
  hosts[0].dir = 'rtl'
  await settled()
  expect(document.querySelector('.mp-nav-menu__popup').closest('[dir]').getAttribute('dir')).toBe('rtl')
})
