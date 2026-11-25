import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Overlay from '..'
import Dialog from '../../dialog'

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

test('moving an open overlay inline transfers the scroll lock and Escape ownership', async () => {
  const frame = document.body.appendChild(document.createElement('iframe'))
  const frameBody = frame.contentDocument!.body
  const wrapper = mount(Overlay, {
    attachTo: document.body,
    props: { open: true, lockScroll: true, popupContainer: frameBody },
  })
  try {
    await nextTick()
    expect(frameBody.style.overflow).toBe('hidden')
    await wrapper.setProps({ popupContainer: false })
    expect(frameBody.style.overflow).toBe('')
    expect(document.body.style.overflow).toBe('hidden')
    frameBody.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('key-escape')).toBeUndefined()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('key-escape')).toHaveLength(1)
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  } finally {
    wrapper.unmount()
    frame.remove()
  }
})

test('a nested inline dialog follows its parent to a new document', async () => {
  const frame = document.body.appendChild(document.createElement('iframe'))
  const open = ref(false)
  const close = () => {
    open.value = false
  }
  const wrapper = mount(Overlay, {
    attachTo: document.body,
    props: { open: true, popupContainer: frame.contentDocument!.body },
    slots: {
      default: () => h(Dialog, { open: open.value, popupContainer: false, zIndex: 9000, 'onUpdate:open': close }),
    },
  })
  try {
    await nextTick()
    await wrapper.setProps({ popupContainer: false })
    open.value = true
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await nextTick()
    expect(open.value).toBe(false)
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
    frame.remove()
  }
})
