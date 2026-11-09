import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import NumberKeyboard from '../NumberKeyboard.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
})
function setup(props = {}, attrs = {}) {
  const owner = mount(NumberKeyboard, {
    attachTo: document.body,
    props: { defaultOpen: true, popupContainer: false, ...props },
    attrs,
  })
  owners.push(owner)
  return owner
}

test('keys are native non-submit buttons and delete has an accessible name', () => {
  const owner = setup({ theme: 'custom' })
  const buttons = owner.findAll('.mp-number-keyboard__key')
  expect(buttons.length).toBeGreaterThan(10)
  expect(buttons.every((button) => button.element.tagName === 'BUTTON' && button.attributes('type') === 'button')).toBe(
    true,
  )
  expect(owner.find('.mp-number-keyboard__key--delete').attributes('aria-label')).toBeTruthy()
  expect(
    owner.findAll('.mp-number-keyboard__key--blank').every((key) => key.attributes('disabled') !== undefined),
  ).toBe(true)
})

test('multi-character keys are accepted only when the entire value fits', async () => {
  const owner = setup({ defaultValue: '1', maxLength: 2, extraKey: 'ABC' })
  await owner.find('.mp-number-keyboard__key--extra').trigger('click')
  expect(owner.emitted('input')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await owner.find('.mp-number-keyboard__key--number').trigger('click')
  await nextTick()
  expect(owner.emitted('update:modelValue')).toEqual([['11']])
})

test('completion triggers one close and blur, including external reopening', async () => {
  const owner = setup({ theme: 'custom' })
  await owner.find('.mp-number-keyboard__key--close').trigger('click')
  await nextTick()
  expect(owner.emitted('close')).toHaveLength(1)
  expect(owner.emitted('blur')).toHaveLength(1)
})

test('dialog uses visible title and respects dynamic explicit naming', async () => {
  const owner = setup({ title: 'Payment' })
  const dialog = owner.get('[role=dialog]')
  const title = owner.get('.mp-number-keyboard__header')
  expect(dialog.attributes('aria-labelledby')).toBe(title.attributes('id'))
  await owner.setProps({ 'aria-label': 'Pay securely' })
  expect(dialog.attributes('aria-label')).toBe('Pay securely')
  expect(dialog.attributes('aria-labelledby')).toBeUndefined()
  expect(owner.get('.mp-number-keyboard').attributes('aria-label')).toBeUndefined()
})

test('external close and overlay close each emit one notification', async () => {
  const external = setup({ open: true })
  await external.setProps({ open: false })
  await nextTick()
  expect(external.emitted('close')).toHaveLength(1)
  expect(external.emitted('blur')).toHaveLength(1)
  external.unmount()
  owners.splice(owners.indexOf(external), 1)
  const overlay = setup()
  const backdrop = overlay.get('.mp-popup__overlay')
  await backdrop.trigger('pointerdown')
  await backdrop.trigger('click')
  await nextTick()
  expect(overlay.emitted('close')).toHaveLength(1)
  expect(overlay.emitted('blur')).toHaveLength(1)
})

test('explicit false input remains passive after the parent declines the close update', async () => {
  const owner = setup({ open: true, theme: 'custom' })
  await owner.get('.mp-number-keyboard__key--close').trigger('click')
  await nextTick()
  expect(owner.emitted('update:open')).toEqual([[false]])
  expect(owner.emitted('close')).toHaveLength(1)
  expect(owner.get('.mp-number-keyboard').isVisible()).toBe(false)
})
