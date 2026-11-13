import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PeopleSelect from '..'

for (const multiple of [false, true]) {
  test(`${multiple ? 'multiple' : 'single'} people selection exposes its list and active option`, async () => {
    const owner = mount(PeopleSelect, {
      attachTo: document.body,
      attrs: { 'aria-label': '选择人员' },
      props: {
        editMode: 'direct',
        multiple,
        options: [
          { value: 'a', label: 'Alice' },
          { value: 'b', label: 'Bob' },
        ],
      },
    })
    try {
      await flushPromises()
      const input = owner.get('input[role="combobox"]')
      expect(input.attributes('aria-label')).toBe('选择人员')
      ;(input.element as HTMLInputElement).focus()
      await input.trigger('keydown', { key: 'Enter' })
      await flushPromises()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await flushPromises()
      expect(input.attributes('aria-expanded')).toBe('true')
      const list = document.getElementById(input.attributes('aria-controls') ?? '')
      expect(list?.getAttribute('role')).toBe('listbox')
      if (multiple) {
        expect(list?.getAttribute('aria-multiselectable')).toBe('true')
      }
      const active = document.getElementById(input.attributes('aria-activedescendant') ?? '')
      expect(active?.getAttribute('role')).toBe('option')
      expect(list?.contains(active)).toBe(true)
      expect(document.activeElement).toBe(input.element)
      await input.trigger('keydown', { key: 'Escape' })
      await flushPromises()
      expect(input.attributes('aria-expanded')).toBe('false')
      expect(input.attributes('aria-activedescendant')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
