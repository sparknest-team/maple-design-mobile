import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

for (const mode of ['document', 'open', 'closed'] as const) {
  for (const scenario of ['normal', 'controlled', 'prevented', 'moved'] as const) {
    test(`Escape from multiple search checkbox in ${mode} (${scenario})`, async () => {
      vi.useFakeTimers()
      const host = document.createElement('div')
      const outside = document.createElement('button')
      document.body.append(host, outside)
      const root = mode === 'document' ? document : host.attachShadow({ mode })
      const wrapper = mount(Cascader, {
        global: { stubs: { transition: false } },
        attachTo: mode === 'document' ? host : (root as ShadowRoot as unknown as Element),
        props: {
          multiple: true,
          filterable: true,
          editMode: 'direct',
          popupContainer: false,
          inputValue: 'Alpha',
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
        vi.advanceTimersToNextFrame()
        vi.advanceTimersToNextFrame()
        await flushPromises()
        const checkbox = wrapper.get('[title="Alpha"] input[type="checkbox"]')
        const input = wrapper.get('input[role="combobox"]')
        ;(checkbox.element as HTMLElement).focus()
        expect(root.activeElement).toBe(checkbox.element)
        checkbox.element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }),
        )
        // Run the deferred focus restoration before the leave transition hides the popup.
        await vi.advanceTimersByTimeAsync(0)
        expect(input.attributes('aria-expanded')).toBe(
          scenario === 'controlled' || scenario === 'prevented' ? 'true' : 'false',
        )
        if (scenario === 'moved') {
          expect(document.activeElement).toBe(outside)
        } else {
          expect(root.activeElement).toBe(scenario === 'normal' ? input.element : checkbox.element)
        }
      } finally {
        wrapper.unmount()
        host.remove()
        outside.remove()
        vi.useRealTimers()
      }
    })
  }
}
