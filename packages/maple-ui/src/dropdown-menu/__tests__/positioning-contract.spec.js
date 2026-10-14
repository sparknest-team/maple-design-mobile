import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Trigger from '../../trigger'
import DropdownMenu, { dropdownMenuProps } from '../index'

const cleanups = []
afterEach(() =>
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup()),
)
async function settle() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 40))
  await nextTick()
}
async function create(props = {}, content = undefined) {
  const root = document.createElement('div')
  document.body.append(root)
  const wrapper = mount(DropdownMenu, {
    attachTo: root,
    props: { defaultOpen: true, popupContainer: false, hideOnSelect: false, ...props },
    slots: { default: () => h('button', 'Open'), ...(content ? { content } : {}) },
  })
  cleanups.push(() => {
    wrapper.unmount()
    root.remove()
  })
  await settle()
  return wrapper
}
async function enterBranch(label) {
  const item = Array.from(document.querySelectorAll('[data-dropdown-menu-item]')).find((item) =>
    item.textContent.includes(label),
  )
  item.focus()
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }))
  await settle()
}
describe('DropdownMenu positioning contract', () => {
  test('defaults to the same absolute strategy as Trigger', async () => {
    expect(dropdownMenuProps.strategy.default).toBe('absolute')
    const wrapper = await create()
    expect(wrapper.findComponent(Trigger).props('strategy')).toBe('absolute')
  })
  test('root and every submenu react to strategy without selection or open requests', async () => {
    const wrapper = await create({
      strategy: 'fixed',
      options: [
        { label: 'Level one', children: [{ label: 'Level two', children: [{ label: 'Leaf', value: 'leaf' }] }] },
      ],
    })
    await enterBranch('Level one')
    await enterBranch('Level two')
    const triggers = () => wrapper.findAllComponents(Trigger)
    expect(triggers()).toHaveLength(3)
    expect(triggers().every((trigger) => trigger.props('strategy') === 'fixed')).toBe(true)
    expect(triggers().every((trigger) => trigger.props('open') === true)).toBe(true)
    const fixedPopups = Array.from(document.querySelectorAll('[style]')).filter((el) => el.style.position === 'fixed')
    expect(fixedPopups.length).toBeGreaterThanOrEqual(3)
    await wrapper.setProps({ strategy: 'absolute' })
    await settle()
    expect(triggers().every((trigger) => trigger.props('strategy') === 'absolute')).toBe(true)
    expect(fixedPopups.every((element) => element.style.position === 'absolute')).toBe(true)
    expect(triggers().every((trigger) => trigger.props('open') === true)).toBe(true)
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })
  test('a submenu opened after a strategy update receives the latest value', async () => {
    const wrapper = await create({ options: [{ label: 'Parent', children: [{ label: 'Child' }] }] })
    await wrapper.setProps({ strategy: 'fixed' })
    await enterBranch('Parent')
    expect(wrapper.findAllComponents(Trigger).every((trigger) => trigger.props('strategy') === 'fixed')).toBe(true)
  })
  test('independent nested menus retain their own strategy', async () => {
    const wrapper = await create({ strategy: 'fixed' }, () =>
      h(DropdownMenu, { defaultOpen: true, popupContainer: false }, { default: () => h('button', 'Nested') }),
    )
    expect(wrapper.findAllComponents(Trigger).map((trigger) => trigger.props('strategy'))).toEqual([
      'fixed',
      'absolute',
    ])
    await wrapper.setProps({ strategy: 'absolute' })
    await settle()
    expect(wrapper.findAllComponents(Trigger).map((trigger) => trigger.props('strategy'))).toEqual([
      'absolute',
      'absolute',
    ])
  })
})
