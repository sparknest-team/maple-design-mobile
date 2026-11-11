import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select, { Optgroup, Option } from '..'

for (const mode of ['array', 'slots', 'virtual'] as const) {
  test(`${mode}: links native focus to its list and separates activation from selection`, async () => {
    const options = [
      {
        isGroup: true as const,
        label: 'Same',
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'skip', label: 'Disabled', disabled: true },
        ],
      },
      { isGroup: true as const, label: 'Same', options: [{ value: 'b', label: 'Beta' }] },
    ]
    const owner = mount(Select, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        defaultOpen: true,
        multiple: true,
        modelValue: ['a'],
        filterable: true,
        popupContainer: false,
        ...(mode === 'slots' ? {} : { options }),
        ...(mode === 'virtual' ? { virtualListProps: { height: 200, estimatedSize: 36 } } : {}),
      },
      slots:
        mode === 'slots'
          ? {
              default: () => [
                h(Optgroup, { label: 'Same' }, () => [
                  h(Option, { value: 'a', label: 'Alpha' }),
                  h(Option, { value: 'skip', label: 'Disabled', disabled: true }),
                ]),
                h(Optgroup, { label: 'Same' }, () => h(Option, { value: 'b', label: 'Beta' })),
              ],
            }
          : {},
    })
    try {
      await flushPromises()
      const input = owner.get('input[role="combobox"]')
      await input.trigger('keydown', { key: 'ArrowDown' })
      await flushPromises()
      const id = input.attributes('aria-controls')
      expect(id).toBeTruthy()
      const list = document.getElementById(id ?? '')
      expect(list?.getAttribute('role')).toBe('listbox')
      expect(list?.getAttribute('aria-multiselectable')).toBe('true')
      if (!document.getElementById(input.attributes('aria-activedescendant') ?? '')?.textContent?.includes('Beta')) {
        await input.trigger('keydown', { key: 'ArrowDown' })
        await flushPromises()
      }
      const active = input.attributes('aria-activedescendant')
      expect(active).toBeTruthy()
      const option = document.getElementById(active ?? '')
      expect(option?.getAttribute('role')).toBe('option')
      expect(list?.contains(option)).toBe(true)
      expect(option?.textContent).toContain('Beta')
      expect(option?.getAttribute('aria-selected')).toBe('false')
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      const groups = Array.from(list!.querySelectorAll('[role="group"]'))
      expect(groups).toHaveLength(2)
      const titles = groups.map((group) => group.getAttribute('aria-labelledby'))
      expect(new Set(titles).size).toBe(2)
      await input.trigger('keydown', { key: 'Escape' })
      await flushPromises()
      expect(input.attributes('aria-activedescendant')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
