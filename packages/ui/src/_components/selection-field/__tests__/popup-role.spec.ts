import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SelectionField from '../SelectionField.vue'

for (const popup of ['tree', 'listbox', 'grid'] as const) {
  test(`native field and open button describe the same ${popup} popup`, async () => {
    const open = ref(false),
      target = ref('candidate-list')
    const owner = mount({
      render: () => h(SelectionField, { open: open.value, 'aria-haspopup': popup, 'aria-controls': target.value }),
    })
    try {
      const input = owner.get('input'),
        button = owner.get('[data-field-open-trigger]')
      expect(input.attributes('aria-haspopup')).toBe(popup)
      expect(button.attributes('aria-haspopup')).toBe(popup)
      expect(button.attributes('aria-controls')).toBe('candidate-list')
      open.value = true
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe(input.attributes('aria-expanded'))
      target.value = 'new-list'
      await nextTick()
      expect(button.attributes('aria-controls')).toBe('new-list')
    } finally {
      owner.unmount()
    }
  })
}
