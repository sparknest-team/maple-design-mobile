import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import { getScrollElements } from '../position'
import Trigger from '../trigger'

it('finds scroll ancestors across nested shadow roots', () => {
  const outside = document.createElement('div')
  outside.style.overflow = 'auto'
  const host = document.createElement('div')
  const nestedHost = document.createElement('div')
  const innerScroll = document.createElement('div')
  innerScroll.style.overflowY = 'scroll'
  const reference = document.createElement('button')
  document.body.append(outside)
  outside.append(host)
  host.attachShadow({ mode: 'open' }).append(innerScroll)
  innerScroll.append(nestedHost)
  nestedHost.attachShadow({ mode: 'closed' }).append(reference)
  try {
    expect(getScrollElements(reference)).toEqual([innerScroll, outside])
  } finally {
    outside.remove()
  }
})

it('binds and releases an outer scroll listener for a shadow-root trigger', async () => {
  const scroll = document.createElement('div')
  const host = document.createElement('div')
  scroll.style.overflow = 'auto'
  document.body.append(scroll)
  scroll.append(host)
  const mountPoint = document.createElement('div')
  host.attachShadow({ mode: 'open' }).append(mountPoint)
  const add = vi.spyOn(scroll, 'addEventListener')
  const remove = vi.spyOn(scroll, 'removeEventListener')
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, updateAtScroll: true },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    expect(add.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
  } finally {
    wrapper.unmount()
    scroll.remove()
  }
  expect(remove.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
})

it('follows the assigned slot through the rendered scroll container', () => {
  const host = document.createElement('div')
  const reference = document.createElement('button')
  const scroll = document.createElement('div')
  scroll.style.overflow = 'auto'
  scroll.append(document.createElement('slot'))
  host.attachShadow({ mode: 'open' }).append(scroll)
  host.append(reference)
  document.body.append(host)
  try {
    expect(getScrollElements(reference)).toEqual([scroll])
  } finally {
    host.remove()
  }
})

it('closes after a shadow-root scroll event is processed on a later frame', async () => {
  const host = document.createElement('div')
  const scroll = document.createElement('div')
  const mountPoint = document.createElement('div')
  scroll.style.overflow = 'auto'
  scroll.append(document.createElement('slot'))
  host.attachShadow({ mode: 'open' }).append(scroll)
  host.append(mountPoint)
  document.body.append(host)
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, scrollToClose: true, scrollToCloseDistance: 10 },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    scroll.scrollTop = 30
    scroll.dispatchEvent(new Event('scroll'))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

it('rebinds scroll listeners when a trigger changes slots', async () => {
  const host = document.createElement('div'),
    mountPoint = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' })
  const a = document.createElement('div'),
    b = document.createElement('div')
  a.style.overflow = b.style.overflow = 'auto'
  const first = document.createElement('slot'),
    second = document.createElement('slot')
  first.name = 'first'
  second.name = 'second'
  a.append(first)
  b.append(second)
  shadow.append(a, b)
  mountPoint.slot = 'first'
  host.append(mountPoint)
  document.body.append(host)
  const addA = vi.spyOn(a, 'addEventListener'),
    removeA = vi.spyOn(a, 'removeEventListener'),
    addB = vi.spyOn(b, 'addEventListener'),
    removeB = vi.spyOn(b, 'removeEventListener')
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, updateAtScroll: true },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    expect(addA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    mountPoint.slot = 'second'
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(removeA.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    expect(addB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
  } finally {
    wrapper.unmount()
    host.remove()
  }
  expect(removeB.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
})

it('binds a scroll ancestor when a previously unassigned trigger enters a slot', async () => {
  const host = document.createElement('div'),
    mountPoint = document.createElement('div')
  const scroll = document.createElement('div'),
    slot = document.createElement('slot')
  scroll.style.overflow = 'auto'
  slot.name = 'target'
  scroll.append(slot)
  host.attachShadow({ mode: 'open' }).append(scroll)
  mountPoint.slot = 'missing'
  host.append(mountPoint)
  document.body.append(host)
  const add = vi.spyOn(scroll, 'addEventListener'),
    remove = vi.spyOn(scroll, 'removeEventListener')
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, updateAtScroll: true },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    expect(add.mock.calls.some(([type]) => type === 'scroll')).toBe(false)
    mountPoint.slot = 'target'
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(add.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
  } finally {
    wrapper.unmount()
    host.remove()
  }
  expect(remove.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
})
