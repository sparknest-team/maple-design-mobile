import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { NavMenuItem } from '..'

test.each([true, false])('resolves open state when a content slot changes (initial=%s)', async (initial) => {
  const present = ref(initial)
  const owner = mount(
    {
      setup: () => () =>
        h(
          NavMenuItem,
          { label: 'Choices', open: true, popupContainer: false },
          {
            default: ({ open }: { open: boolean }) => h('span', { 'data-open': String(open) }, 'Choices'),
            ...(present.value ? { content: () => h('input', { 'aria-label': 'Draft' }) } : {}),
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    for (const value of [initial, !initial, initial]) {
      present.value = value
      await nextTick()
      await flushPromises()
      expect(owner.get('[data-open]').attributes('data-open')).toBe(String(value))
      expect(owner.get('[data-nav-item]').attributes('aria-expanded')).toBe(value ? 'true' : undefined)
      expect(document.querySelector('input[aria-label="Draft"]') !== null).toBe(value)
    }
  } finally {
    owner.unmount()
  }
})
