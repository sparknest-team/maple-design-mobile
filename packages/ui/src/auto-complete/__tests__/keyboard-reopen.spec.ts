import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import AutoComplete from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
const create = (extra = {}) => {
  const owner = mount(AutoComplete, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'blocked', label: 'Blocked', disabled: true },
        { value: 'b', label: 'Beta' },
      ],
      filterOption: false,
      shouldOpen: () => true,
      ...extra,
    },
  })
  owners.push(owner)
  return owner
}
for (const [key, label] of [
  ['ArrowDown', 'Alpha'],
  ['ArrowUp', 'Beta'],
]) {
  test(`${key} reopens after Escape and locates an enabled candidate without submitting`, async () => {
    const owner = create()
    const input = owner.get('input')
    await input.trigger('focus')
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    await input.trigger('keydown', { key: 'Escape' })
    expect(input.attributes('aria-expanded')).toBe('false')
    await input.trigger('keydown', { key })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    const id = input.attributes('aria-activedescendant')!
    expect(document.getElementById(id)?.textContent).toContain(label)
    expect(owner.emitted('select')).toBeUndefined()
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('select')?.[0][0]).toBe(key === 'ArrowDown' ? 'a' : 'b')
  })
}
for (const event of [{ key: 'ArrowDown', isComposing: true }, { key: 'ArrowDown', keyCode: 229 }, { key: 'Tab' }]) {
  test(`closed keyboard boundary ${JSON.stringify(event)}`, async () => {
    const owner = create()
    const input = owner.get('input')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'Escape' })
    const native = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...event })
    input.element.dispatchEvent(native)
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(native.defaultPrevented).toBe(false)
    expect(owner.emitted('select')).toBeUndefined()
  })
}
for (const blocked of [{ readonly: true }, { disabled: true }, { shouldOpen: () => false }, { options: [] }]) {
  test(`respects closed opening policy ${JSON.stringify(blocked)}`, async () => {
    const owner = create(blocked)
    const input = owner.get('input')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(owner.emitted('select')).toBeUndefined()
  })
}
test('a canceled native arrow does not reopen', async () => {
  const owner = create()
  const input = owner.get('input')
  await input.trigger('focus')
  await input.trigger('keydown', { key: 'Escape' })
  const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
  event.preventDefault()
  input.element.dispatchEvent(event)
  await flushPromises()
  expect(input.attributes('aria-expanded')).toBe('false')
})
