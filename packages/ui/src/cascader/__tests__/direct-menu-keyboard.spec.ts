import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
function create(onKeydown?: (event: KeyboardEvent) => void) {
  return mount(Cascader, {
    attachTo: document.body,
    props: { editMode: 'direct', defaultOpen: true, popupContainer: false, options, onKeydown },
  })
}
test('direct menu moves focus and activates with Space exactly once', async () => {
  const wrapper = create()
  try {
    await flushPromises()
    const [first, second] = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')
    ;(first!.element as HTMLElement).focus()
    first!.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(document.activeElement).toBe(second!.element)
    second!.element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  } finally {
    wrapper.unmount()
  }
})
test('a consumer can prevent a direct menu key before internal processing', async () => {
  const onKeydown = vi.fn((event: KeyboardEvent) => event.preventDefault()),
    wrapper = create(onKeydown)
  try {
    await flushPromises()
    const first = wrapper.get(':is([role="menuitem"],[role="menuitemradio"])')
    ;(first.element as HTMLElement).focus()
    first.element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(onKeydown).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

for (const scenario of ['normal', 'controlled', 'prevented', 'moved'] as const) {
  test(`Escape from a direct menu restores focus only after an accepted close (${scenario})`, async () => {
    const outside = document.createElement('button')
    document.body.append(outside)
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        popupContainer: false,
        options,
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
      const option = wrapper.get(':is([role="menuitem"],[role="menuitemradio"])')
      const input = wrapper.get('input[role="combobox"]')
      ;(option.element as HTMLElement).focus()
      option.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(document.activeElement).toBe(
        scenario === 'normal' ? input.element : scenario === 'moved' ? outside : option.element,
      )
      expect(input.attributes('aria-expanded')).toBe(
        scenario === 'controlled' || scenario === 'prevented' ? 'true' : 'false',
      )
    } finally {
      wrapper.unmount()
      outside.remove()
    }
  })
}
