import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import InputNumber from '..'

const owners = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function field(props = {}) {
  const owner = mount(InputNumber, { props: { defaultValue: 2, editMode: 'direct', mode: 'button', ...props } })
  owners.push(owner)
  return owner
}
const indicator = (owner) => owner.find('.mp-field-decorator__loading-icon').exists()
test('an explicit beforeCommit wait lights the field and native busy state', async () => {
  let finish
  const owner = field({
    beforeCommit: () =>
      new Promise((resolve) => {
        finish = resolve
      }),
  })
  await owner.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(indicator(owner)).toBe(true)
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  expect(owner.get('input').attributes('readonly')).toBeDefined()
  finish(true)
  await flushPromises()
  expect(indicator(owner)).toBe(false)
  expect(owner.get('input').attributes('aria-busy')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toEqual([[3]])
})
test('guard pending uses the existing line mode and manual loading keeps ownership after settlement', async () => {
  let finish
  const owner = field({
    loading: true,
    loadingMode: 'line',
    beforeCommit: () =>
      new Promise((resolve) => {
        finish = resolve
      }),
  })
  expect(owner.get('input').attributes('readonly')).toBeUndefined()
  await owner.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(owner.find('.mp-field-decorator__loading-line').exists()).toBe(true)
  await owner.setProps({ loading: false })
  expect(owner.find('.mp-field-decorator__loading-line').exists()).toBe(true)
  await owner.setProps({ loading: true })
  finish(false)
  await flushPromises()
  expect(owner.find('.mp-field-decorator__loading-line').exists()).toBe(true)
  expect(owner.get('input').attributes('readonly')).toBeUndefined()
  await owner.setProps({ loading: false })
  expect(owner.find('.mp-field-decorator__loading-line').exists()).toBe(false)
})
test('rejection ends the explicit guard feedback and emits the original error', async () => {
  let reject
  const owner = field({
    beforeCommit: () =>
      new Promise((_, fail) => {
        reject = fail
      }),
  })
  await owner.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(indicator(owner)).toBe(true)
  const cause = new Error('commit failed')
  reject(cause)
  await flushPromises()
  expect(indicator(owner)).toBe(false)
  expect(owner.emitted('commit-error')[0][0]).toBe(cause)
})
test('manual loading does not implicitly block editing and change Promises do not start a task', async () => {
  let finish
  const pending = new Promise((resolve) => {
    finish = resolve
  })
  const owner = field({ loading: true, onChange: () => pending })
  await owner.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(owner.emitted('update:modelValue')).toEqual([[3]])
  expect(owner.get('input').attributes('readonly')).toBeUndefined()
  await owner.setProps({ loading: false })
  await flushPromises()
  expect(indicator(owner)).toBe(false)
  expect(owner.get('input').attributes('aria-busy')).toBeUndefined()
  finish()
})
