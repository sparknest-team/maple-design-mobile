import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Fab from '../Fab'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
})
function setup(props = {}, slots = {}, attrs = {}) {
  const owner = mount(Fab, {
    attachTo: document.body,
    props: { popupContainer: false, ...props },
    attrs,
    slots: { default: () => h('button', { id: 'action', type: 'button' }, 'Action'), ...slots },
  })
  owners.push(owner)
  return owner
}

test('default trigger owns its accessible name and expanded relationship', async () => {
  const owner = setup({}, {}, { 'aria-label': 'Order actions' })
  const trigger = owner.get('.mp-fab__trigger')
  expect(trigger.attributes('aria-label')).toBe('Order actions')
  expect(trigger.attributes('aria-expanded')).toBe('false')
  expect(trigger.attributes('aria-controls')).toBe(owner.get('.mp-fab__actions').attributes('id'))
  expect(owner.get('.mp-drag').attributes('aria-label')).toBeUndefined()
  await trigger.trigger('click')
  expect(trigger.attributes('aria-expanded')).toBe('true')
})

test('custom trigger receives bindable naming and state attributes', async () => {
  const owner = setup(
    {},
    { trigger: ({ triggerProps }) => h('button', { type: 'button', ...triggerProps }, 'Custom') },
    { 'aria-label': 'Custom actions' },
  )
  const trigger = owner.findAll('button').find((button) => button.text() === 'Custom')
  expect(trigger.attributes('aria-label')).toBe('Custom actions')
  expect(trigger.attributes('aria-expanded')).toBe('false')
  await trigger.trigger('click')
  expect(trigger.attributes('aria-expanded')).toBe('true')
})

test('hover mode supports keyboard clicks, retains focused actions, and Escape restores focus', async () => {
  const owner = setup({ trigger: 'hover' })
  const trigger = owner.get('.mp-fab__trigger')
  trigger.element.focus()
  trigger.element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))
  await nextTick()
  expect(trigger.attributes('aria-expanded')).toBe('true')
  const action = owner.get('#action')
  action.element.focus()
  await owner.get('.mp-fab').trigger('mouseleave')
  expect(trigger.attributes('aria-expanded')).toBe('true')
  await action.trigger('keydown', { key: 'Escape' })
  expect(trigger.attributes('aria-expanded')).toBe('false')
  expect(document.activeElement).toBe(trigger.element)
})

test('hover keyboard request preserves controlled rejection and does not require actions', async () => {
  const owner = setup({ trigger: 'hover', open: false })
  const trigger = owner.get('.mp-fab__trigger')
  trigger.element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))
  await nextTick()
  expect(owner.emitted('update:open')).toEqual([[true]])
  expect(trigger.attributes('aria-expanded')).toBe('false')
})
