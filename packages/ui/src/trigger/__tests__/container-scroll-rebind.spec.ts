import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../trigger'

test('moves scroll listeners when the popup container changes', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div')
  a.style.overflow = 'auto'
  b.style.overflow = 'auto'
  document.body.append(a, b)
  const addA = vi.spyOn(a, 'addEventListener'),
    removeA = vi.spyOn(a, 'removeEventListener')
  const addB = vi.spyOn(b, 'addEventListener'),
    removeB = vi.spyOn(b, 'removeEventListener')
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: a, updateAtScroll: true },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    await nextTick()
    expect(addA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    await wrapper.setProps({ popupContainer: b })
    await nextTick()
    expect(removeA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    expect(addB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    await wrapper.setProps({ popupContainer: false })
    await nextTick()
    expect(removeB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
  }
})
