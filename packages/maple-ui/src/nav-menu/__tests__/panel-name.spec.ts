import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

test('custom panel follows the visible entry and preserves caller ids', async () => {
  const title = ref('Custom filters')
  const id = ref('filter-entry')
  const wrapper = mount(NavMenu, {
    attachTo: document.body,
    props: { popupContainer: false },
    slots: {
      default: () =>
        h(
          NavMenuItem,
          { id: id.value, open: true },
          {
            label: () => title.value,
            content: () => h('input'),
          },
        ),
    },
  })
  try {
    await nextTick()
    const panel =
      document.querySelector('[role=dialog], [role=group] .mp-nav-menu__popup') ??
      document.querySelector('.mp-nav-menu__popup[role=group]')
    expect(panel?.getAttribute('aria-labelledby')).toBe('filter-entry')
    expect(document.getElementById('filter-entry')?.textContent).toContain('Custom filters')
    id.value = 'renamed-entry'
    title.value = 'Updated filters'
    await nextTick()
    expect(panel?.getAttribute('aria-labelledby')).toBe('renamed-entry')
    expect(document.getElementById('renamed-entry')?.textContent).toContain('Updated filters')
  } finally {
    wrapper.unmount()
  }
})
