import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

for (const mode of ['open', 'closed'] as const) {
  for (const scenario of ['remove', 'move-inside'] as const) {
    test(`Escape preserves ${mode} shadow focus during ${scenario}`, async () => {
      const host = document.createElement('div')
      document.body.append(host)
      const root = host.attachShadow({ mode })
      const options = ref([{ value: 'a', label: 'Alpha' }])
      const wrapper = mount(
        {
          render: () =>
            h('div', [
              h(Cascader, {
                editMode: 'direct',
                defaultOpen: true,
                popupContainer: false,
                options: options.value,
                onOpenChange: (open: boolean) => {
                  if (!open && scenario === 'remove') {
                    options.value = []
                  }
                  if (!open && scenario === 'move-inside') {
                    root.querySelector<HTMLButtonElement>('#inside')!.focus()
                  }
                },
              }),
              h('button', { id: 'inside' }, 'Inside'),
            ]),
        },
        { attachTo: root as unknown as Element },
      )
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
        expect(input.attributes('aria-expanded')).toBe('false')
        if (scenario === 'remove') {
          expect(option.element.isConnected).toBe(false)
        }
        expect(root.activeElement).toBe(scenario === 'remove' ? input.element : wrapper.get('#inside').element)
      } finally {
        wrapper.unmount()
        host.remove()
      }
    })
  }
}
