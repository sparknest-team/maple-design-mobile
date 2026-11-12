import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

for (const mode of ['open', 'closed'] as const) {
  for (const scenario of ['normal', 'controlled', 'prevented', 'moved'] as const) {
    test(`Escape from a ${mode} shadow menu preserves focus ownership (${scenario})`, async () => {
      const host = document.createElement('div')
      const outside = document.createElement('button')
      document.body.append(host, outside)
      const root = host.attachShadow({ mode })
      const wrapper = mount(Cascader, {
        attachTo: root as unknown as Element,
        props: {
          editMode: 'direct',
          popupContainer: false,
          options: [{ value: 'a', label: 'Alpha' }],
          ...(scenario === 'controlled' ? { open: true } : { defaultOpen: true }),
          ...(scenario === 'prevented' ? { onKeydown: (event: KeyboardEvent) => event.preventDefault() } : {}),
          ...(scenario === 'moved'
            ? {
                onOpenChange: (open: boolean) => {
                  if (!open) {
                    outside.focus()
                  }
                },
              }
            : {}),
        },
      })
      try {
        await flushPromises()
        const option = wrapper.get('[data-cascader-key]')
        const input = wrapper.get('input[role="combobox"]')
        ;(option.element as HTMLElement).focus()
        expect(root.activeElement).toBe(option.element)
        option.element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }),
        )
        await flushPromises()
        if (scenario === 'moved') {
          expect(document.activeElement).toBe(outside)
        } else {
          expect(root.activeElement).toBe(scenario === 'normal' ? input.element : option.element)
        }
        expect(input.attributes('aria-expanded')).toBe(
          scenario === 'controlled' || scenario === 'prevented' ? 'true' : 'false',
        )
      } finally {
        wrapper.unmount()
        host.remove()
        outside.remove()
      }
    })
  }
}
