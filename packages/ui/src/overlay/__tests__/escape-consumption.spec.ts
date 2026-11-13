import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Overlay from '..'

for (const mode of ['prevented', 'composing', 'legacy-ime', 'normal'] as const) {
  test(`overlay respects ${mode} Escape`, async () => {
    const wrapper = mount(Overlay, {
      attachTo: document.body,
      props: { defaultOpen: true, popupContainer: false },
      slots: {
        default: () =>
          h('input', {
            onKeydown: (event: KeyboardEvent) => {
              if (mode === 'prevented') {
                event.preventDefault()
              }
            },
          }),
      },
    })
    try {
      wrapper.get('input').element.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          cancelable: true,
          isComposing: mode === 'composing',
          ...(mode === 'legacy-ime' ? { keyCode: 229 } : {}),
        }),
      )
      await nextTick()
      expect(wrapper.emitted('key-escape')?.length ?? 0).toBe(mode === 'normal' ? 1 : 0)
      expect(wrapper.emitted('update:open')).toEqual(mode === 'normal' ? [[false]] : undefined)
    } finally {
      wrapper.unmount()
    }
  })
}
