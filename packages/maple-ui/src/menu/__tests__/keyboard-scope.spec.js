import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { Menu } from '../index'

async function settle() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 30))
  await nextTick()
}
async function key(name) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }))
  await settle()
}

test('keyboard opens the menu and its branch with accessible expanded states', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const wrapper = mount(Menu, {
    attachTo: host,
    props: {
      options: [{ label: 'Parent', value: 'p', children: [{ label: 'Child', value: 'c' }] }],
      popupContainer: false,
    },
    slots: { default: () => h('button', 'Menu') },
  })
  await settle()
  const button = host.querySelector('button')
  expect(button.getAttribute('aria-haspopup')).toBe('menu')
  expect(button.getAttribute('aria-expanded')).toBe('false')
  button.focus()
  await key('Enter')
  const parent = document.activeElement
  expect(parent.textContent).toContain('Parent')
  expect(button.getAttribute('aria-expanded')).toBe('true')
  expect(parent.getAttribute('aria-haspopup')).toBe('menu')
  expect(parent.getAttribute('aria-expanded')).toBe('false')
  await key('Enter')
  expect(document.activeElement.textContent).toContain('Child')
  expect(parent.getAttribute('aria-expanded')).toBe('true')
  await key('Escape')
  expect(document.activeElement).toBe(parent)
  await key(' ')
  window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true, cancelable: true }))
  await settle()
  expect(document.activeElement.textContent).toContain('Child')
  expect(wrapper.emitted('select')).toBeUndefined()
  wrapper.unmount()
  host.remove()
})

test('unrelated focus is never captured and Tab closes without preventing navigation', async () => {
  const host = document.createElement('div')
  const outside = document.createElement('input')
  document.body.append(host, outside)
  const wrapper = mount(Menu, {
    attachTo: host,
    props: { defaultOpen: true, options: [{ label: 'Item', value: 'a' }], popupContainer: false },
    slots: { default: () => h('button', 'Menu') },
  })
  await settle()
  outside.focus()
  const arrow = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
  window.dispatchEvent(arrow)
  await settle()
  expect(document.activeElement).toBe(outside)
  expect(arrow.defaultPrevented).toBe(false)
  host.querySelector('button').focus()
  const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
  window.dispatchEvent(tab)
  await settle()
  expect(tab.defaultPrevented).toBe(false)
  expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  wrapper.unmount()
  host.remove()
  outside.remove()
})

test('external reference receives and restores menu semantics', async () => {
  const host = document.createElement('div')
  const reference = document.createElement('button')
  reference.setAttribute('aria-haspopup', 'dialog')
  document.body.append(host, reference)
  const wrapper = mount(Menu, {
    attachTo: host,
    props: { reference, options: [{ label: 'Item', value: 'a' }], popupContainer: false },
  })
  await settle()
  expect(reference.getAttribute('aria-haspopup')).toBe('menu')
  expect(reference.getAttribute('aria-expanded')).toBe('false')
  reference.focus()
  await key('ArrowDown')
  expect(reference.getAttribute('aria-expanded')).toBe('true')
  wrapper.unmount()
  expect(reference.getAttribute('aria-haspopup')).toBe('dialog')
  expect(reference.hasAttribute('aria-expanded')).toBe(false)
  host.remove()
  reference.remove()
})
