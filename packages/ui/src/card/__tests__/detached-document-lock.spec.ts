import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { acquireScrollLock } from '../../utils/scroll-lock'
import Card from '../Card.vue'
import * as detachedMonitor from '../detached-card-monitor'

test('moves a detached expanded card into another document and transfers its scroll lock', async () => {
  const iframe = document.createElement('iframe')
  const host = document.createElement('div')
  document.body.append(iframe, host)
  const frameDoc = iframe.contentDocument!
  const wrapper = mount(Card, {
    attachTo: host,
    props: { floating: true, ripple: false, floatingDuration: 0 },
    slots: { default: () => h('input') },
  })
  try {
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    host.remove()
    await new Promise((resolve) => setTimeout(resolve, 0))
    frameDoc.body.append(host)
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(document.body.style.overflow).not.toBe('hidden')
    expect(frameDoc.body.style.overflow).toBe('hidden')
  } finally {
    wrapper.unmount()
    host.remove()
    iframe.remove()
  }
})

test.each(['close', 'unmount', 'deactivate'] as const)('stops detached tracking on %s', async (operation) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shown = ref(true)
  const floating = ref(true)
  const original = detachedMonitor.watchDetachedCard
  let subscriptions = 0
  const spy = vi.spyOn(detachedMonitor, 'watchDetachedCard').mockImplementation((check) => {
    subscriptions++
    const stop = original(check)
    return () => {
      subscriptions--
      stop()
    }
  })
  const wrapper = mount(
    {
      setup: () => () =>
        h(KeepAlive, null, () => (shown.value ? h(Card, { floating: floating.value, ripple: false }) : null)),
    },
    { attachTo: host },
  )
  try {
    await nextTick()
    host.remove()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(subscriptions).toBe(1)
    if (operation === 'close') {
      floating.value = false
    }
    if (operation === 'deactivate') {
      shown.value = false
    }
    if (operation === 'unmount') {
      wrapper.unmount()
    }
    await nextTick()
    expect(subscriptions).toBe(0)
  } finally {
    wrapper.unmount()
    host.remove()
    spy.mockRestore()
  }
})

test.each([false, true])('releases its old document lock during detachment, shared=%s', async (shared) => {
  const host = document.createElement('div')
  document.body.append(host)
  const release = shared ? acquireScrollLock(document.body) : undefined
  const wrapper = mount(Card, { attachTo: host, props: { floating: true, ripple: false } })
  try {
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    host.remove()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(document.body.style.overflow).toBe(shared ? 'hidden' : '')
    release?.()
    expect(document.body.style.overflow).toBe('')
    document.body.append(host)
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(document.body.style.overflow).toBe('hidden')
  } finally {
    wrapper.unmount()
    release?.()
    host.remove()
  }
})

test('detached Card does not consume Escape from a connected Card', async () => {
  const firstHost = document.createElement('div')
  const secondHost = document.createElement('div')
  document.body.append(firstHost, secondHost)
  const first = mount(Card, {
    attachTo: firstHost,
    props: { floating: true, ripple: false },
    slots: { default: () => h('input') },
  })
  const second = mount(Card, {
    attachTo: secondHost,
    props: { floating: true, ripple: false },
    slots: { default: () => h('input') },
  })
  try {
    await nextTick()
    secondHost.remove()
    await new Promise((resolve) => setTimeout(resolve, 0))
    firstHost.querySelector('input')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(first.emitted('update:floating')).toEqual([[false]])
    expect(second.emitted('update:floating')).toBeUndefined()
  } finally {
    first.unmount()
    second.unmount()
    firstHost.remove()
    secondHost.remove()
  }
})

test('handles Escape immediately after reconnecting in another document', async () => {
  const iframe = document.createElement('iframe')
  const host = document.createElement('div')
  document.body.append(iframe, host)
  const wrapper = mount(Card, {
    attachTo: host,
    props: { floating: true, ripple: false },
    slots: { default: () => h('input') },
  })
  try {
    await nextTick()
    host.remove()
    await new Promise((resolve) => setTimeout(resolve, 0))
    iframe.contentDocument!.body.append(host)
    host
      .querySelector('input')!
      .dispatchEvent(new host.ownerDocument.defaultView!.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('update:floating')).toEqual([[false]])
    expect(iframe.contentDocument!.body.style.overflow).toBe('hidden')
  } finally {
    wrapper.unmount()
    host.remove()
    iframe.remove()
  }
})
