import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../trigger'

test.each(['unavailable', 'throws'] as const)(
  'does not restore focus when the destination frame ancestor is %s',
  async (mode) => {
    const host = document.createElement('div')
    const frame = document.createElement('iframe')
    document.body.append(host, frame)
    const frameWindow = frame.contentWindow!
    const parentFrame = vi.spyOn(frameWindow, 'frameElement', 'get').mockImplementation(() => {
      if (mode === 'throws') {
        throw new DOMException('Access denied', 'SecurityError')
      }
      return null
    })
    const wrapper = mount(Trigger, {
      props: { open: true, popupContainer: host },
      slots: { default: () => h('button'), content: () => h('input') },
    })
    try {
      await nextTick()
      const input = host.querySelector('input')!
      input.value = 'draft'
      input.focus()
      const focus = vi.spyOn(input, 'focus')
      await wrapper.setProps({ popupContainer: frame.contentDocument!.body })
      await nextTick()
      expect(frame.contentDocument!.body.querySelector('input')).toBe(input)
      expect(input.value).toBe('draft')
      expect(focus).not.toHaveBeenCalled()
    } finally {
      wrapper.unmount()
      parentFrame.mockRestore()
      host.remove()
      frame.remove()
    }
  },
)

test('restores focus between accessible descendants of an opaque outer frame', async () => {
  const outer = document.createElement('iframe')
  document.body.append(outer)
  const innerDocument = outer.contentDocument!
  const host = innerDocument.createElement('div')
  const destination = innerDocument.createElement('iframe')
  innerDocument.body.append(host, destination)
  const outerWindow = outer.contentWindow!
  const hiddenParent = vi.spyOn(outerWindow, 'frameElement', 'get').mockReturnValue(null)
  const focused = vi.spyOn(innerDocument, 'hasFocus').mockReturnValue(true)
  const wrapper = mount(Trigger, {
    props: { open: true, trigger: 'focus', popupContainer: host },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    const input = host.querySelector('input')!
    input.value = 'draft'
    input.focus()
    const focus = vi.spyOn(input, 'focus')
    await wrapper.setProps({ popupContainer: destination.contentDocument!.body })
    await nextTick()
    expect(destination.contentDocument!.body.querySelector('input')).toBe(input)
    expect(input.value).toBe('draft')
    expect(focus).toHaveBeenCalledOnce()
    expect(destination.contentDocument!.activeElement).toBe(input)
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
    focused.mockRestore()
    hiddenParent.mockRestore()
    outer.remove()
  }
})
