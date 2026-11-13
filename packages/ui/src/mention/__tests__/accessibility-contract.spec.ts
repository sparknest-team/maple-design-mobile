import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Mention from '..'

const owners: ReturnType<typeof mount>[] = []
const scroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  if (scroll) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', scroll)
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  }
})
for (const type of ['input', 'textarea'] as const) {
  test(`${type} controls its actual suggestion list and active option while native focus stays in the field`, async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        type,
        options: [
          { value: 'alice', label: 'Alice' },
          { value: 'blocked', label: 'Blocked', disabled: true },
          { value: 'bob', label: 'Bob' },
        ],
      },
    })
    owners.push(owner)
    const input = owner.get(type)
    ;(input.element as HTMLElement).focus()
    await input.setValue('@')
    await flushPromises()
    expect(input.attributes('role')).toBe(type === 'input' ? 'combobox' : 'textbox')
    expect(input.attributes('aria-multiline')).toBe(type === 'textarea' ? 'true' : undefined)
    const listbox = document.getElementById(input.attributes('aria-controls')!)
    expect(listbox?.getAttribute('role')).toBe('listbox')
    const current = () => document.getElementById(input.attributes('aria-activedescendant')!)
    expect(current()?.textContent).toContain('Alice')
    expect(current()?.getAttribute('aria-selected')).toBe('true')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(current()?.textContent).toContain('Bob')
    expect(listbox?.contains(current())).toBe(true)
    expect(document.activeElement).toBe(input.element)
    const id = input.attributes('aria-activedescendant')
    await input.trigger('keydown', { key: 'ArrowDown', isComposing: true })
    expect(input.attributes('aria-activedescendant')).toBe(id)
    await owner.setProps({ readonly: true })
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    expect(input.attributes('aria-controls')).toBeUndefined()
    if (type === 'input') {
      expect(input.attributes('aria-expanded')).toBe('false')
    }
  })
}

for (const type of ['input', 'textarea'] as const) {
  test(`${type} exposes the resolved atomic mention once through the editable value`, async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        type,
        atomic: true,
        modelValue: '联系 @[alice]',
        options: [{ value: 'alice', label: '艾丽丝' }],
        'aria-label': '提及人员',
      },
    })
    owners.push(owner)
    const input = owner.get(type)
    expect(input.attributes('aria-label')).toBe('提及人员')
    expect((input.element as HTMLInputElement).value).toBe('联系 @艾丽丝')
    const overlay = owner.get('.mp-mention-atomic-overlay[aria-hidden=true]')
    expect(overlay.text()).toContain('@艾丽丝')
    await owner.setProps({ options: [{ value: 'alice', label: '新姓名' }] })
    expect((input.element as HTMLInputElement).value).toBe('联系 @新姓名')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  })
}
