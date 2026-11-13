import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test } from 'vitest'
import Service from '..'
import Component from '../Dialog.vue'
import {
  finishServiceTransitions,
  installServiceTransitionTimers,
  restoreServiceTransitionTimers,
} from './service-test-utils'

const owners: ReturnType<typeof mount>[] = []
const handles: { close: () => void }[] = []
beforeEach(installServiceTransitionTimers)
afterEach(async () => {
  try {
    owners.splice(0).forEach((owner) => owner.unmount())
    handles.splice(0).forEach((handle) => handle.close())
    await finishServiceTransitions()
  } finally {
    restoreServiceTransitionTimers()
  }
})

function fixture(props = {}, slots = {}) {
  const owner = mount(Component, {
    global: { stubs: { transition: false } },
    props: { open: true, popupContainer: false, title: 'Title', ...props },
    slots: { default: () => h('input', { 'data-divider-draft': '', value: 'Draft' }), ...slots },
  })
  owners.push(owner)
  return owner
}

test('dividers default off and update independently without remounting content', async () => {
  const owner = fixture()
  const input = owner.get('input').element
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(false)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(false)
  await owner.setProps({ topDivider: true })
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(true)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(false)
  await owner.setProps({ bottomDivider: true, topDivider: false })
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(false)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(true)
  expect(owner.get('input').element).toBe(input)
})

test('custom title and footer slots retain divider controls', () => {
  const owner = fixture(
    { topDivider: true, bottomDivider: true },
    {
      title: () => h('span', 'Custom title'),
      footer: () => h('button', 'Custom footer'),
    },
  )
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(true)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(true)
  expect(owner.text()).toContain('Custom footer')
})

test('hidden header and footer leave no orphan divider', async () => {
  const owner = fixture({ topDivider: true, bottomDivider: true })
  await owner.setProps({ hideTitle: true, footer: false })
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(false)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(false)
})

test('service configuration and updates support both divider flags', async () => {
  const handle = Service.open({ title: 'Service', content: 'Content', topDivider: true, bottomDivider: true })
  handles.push(handle)
  await nextTick()
  await nextTick()
  expect(document.querySelector('.mp-dialog__title--divider')).not.toBeNull()
  expect(document.querySelector('.mp-dialog__message--bottom-divider')).not.toBeNull()
  handle.update({ topDivider: false, bottomDivider: false })
  await nextTick()
  expect(document.querySelector('.mp-dialog__title--divider')).toBeNull()
  expect(document.querySelector('.mp-dialog__message--bottom-divider')).toBeNull()
})

test('simple dialogs respect explicit divider opt-in', () => {
  const owner = fixture({ simple: true, topDivider: true, bottomDivider: true })
  expect(owner.find('.mp-dialog__title--divider').exists()).toBe(true)
  expect(owner.find('.mp-dialog__message--bottom-divider').exists()).toBe(true)
})
