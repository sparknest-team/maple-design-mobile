import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Trigger from '../trigger'

it('moves and cleans up scroll listeners when an iframe reference changes slots', async () => {
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const child = frame.contentDocument!
  const host = child.createElement('div'),
    mountPoint = child.createElement('div')
  const root = host.attachShadow({ mode: 'open' }),
    a = child.createElement('div'),
    b = child.createElement('div')
  const first = child.createElement('slot'),
    second = child.createElement('slot')
  first.name = 'first'
  second.name = 'second'
  a.style.overflow = b.style.overflow = 'auto'
  a.append(first)
  b.append(second)
  root.append(a, b)
  mountPoint.slot = 'first'
  host.append(mountPoint)
  child.body.append(host)
  const addA = vi.spyOn(a, 'addEventListener'),
    removeA = vi.spyOn(a, 'removeEventListener'),
    addB = vi.spyOn(b, 'addEventListener'),
    removeB = vi.spyOn(b, 'removeEventListener')
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, popupContainer: document.body, updateAtScroll: true },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(addA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    mountPoint.slot = 'second'
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(removeA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    expect(addB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
  } finally {
    wrapper.unmount()
    frame.remove()
  }
  expect(removeB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
})
