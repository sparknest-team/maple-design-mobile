import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useTriggerPositioner } from '../positioner'

test('popup window replacement removes the original window listener', async () => {
  const probe = await fixture()
  try {
    expect(probe.windowListener).toBeTruthy()
    probe.popupRef.value = document.createElement('div')
    await nextTick()
    expect(probe.remove).toHaveBeenCalledWith('scroll', probe.windowListener)
  } finally {
    probe.cleanup()
  }
})

test('clearing popup ref removes the original listener', async () => {
  const probe = await fixture()
  try {
    probe.popupRef.value = undefined
    await nextTick()
    expect(probe.remove).toHaveBeenCalledWith('scroll', probe.windowListener)
  } finally {
    probe.cleanup()
  }
})

test('unmount cleans the bound window even before popup watcher flushes', async () => {
  const probe = await fixture()
  try {
    probe.popupRef.value = undefined
    probe.wrapper.unmount()
    expect(probe.remove).toHaveBeenCalledWith('scroll', probe.windowListener)
  } finally {
    probe.cleanup()
  }
})

async function fixture(nested = false) {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const view = iframe.contentWindow
  const doc = view.document
  Object.defineProperty(view, 'ResizeObserver', {
    configurable: true,
    value: class {
      observe() {}
      disconnect() {}
    },
  })
  const scroll = doc.createElement('div')
  scroll.style.overflow = 'auto'
  const reference = doc.createElement('button')
  const popup = doc.createElement('div')
  scroll.append(reference, popup)
  const outer = doc.createElement('div')
  if (nested) {
    outer.style.overflow = 'auto'
    outer.append(scroll)
    doc.body.append(outer)
  } else {
    doc.body.append(scroll)
  }
  const callbacks = new Map()
  let id = 0
  const raf = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.set(++id, callback)
    return id
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame').mockImplementation(() => {})
  const hostRaf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.set(++id, callback)
    return id
  })
  const hostCancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  const popupRef = ref(popup)
  const originalAdd = view.addEventListener.bind(view)
  const originalRemove = view.removeEventListener.bind(view)
  const addDescriptor = Object.getOwnPropertyDescriptor(view, 'addEventListener')
  const removeDescriptor = Object.getOwnPropertyDescriptor(view, 'removeEventListener')
  const add = vi.fn((type, listener, options) => originalAdd(type, listener, options))
  const remove = vi.fn((type, listener, options) => originalRemove(type, listener, options))
  Object.defineProperty(view, 'addEventListener', { configurable: true, value: add })
  Object.defineProperty(view, 'removeEventListener', { configurable: true, value: remove })
  const visible = ref(false)
  const requestClose = vi.fn()
  const wrapper = mount({
    setup() {
      useTriggerPositioner(
        {
          placement: 'bottom',
          strategy: 'fixed',
          cover: false,
          popupOffset: 8,
          showArrow: false,
          autoFitPopupWidth: false,
          autoFitPopupMinWidth: false,
          autoFitPosition: false,
          autoFitTransformOrigin: false,
          autoFixPosition: false,
          updateAtScroll: true,
          scrollToClose: true,
          scrollToCloseDistance: 5,
        },
        {
          reference: ref(reference),
          popup: popupRef,
          visible,
          point: ref(),
          globalUpdateAtScroll: ref(false),
          globalScrollToClose: ref(false),
          requestClose,
          referenceResize() {},
        },
      )
      return () => h('div')
    },
  })
  await nextTick()
  visible.value = true
  await nextTick()
  for (const callback of callbacks.values()) {
    callback(0)
  }
  callbacks.clear()
  raf.mockClear()
  cancel.mockClear()
  hostRaf.mockClear()
  hostCancel.mockClear()
  remove.mockClear()
  return {
    popupRef,
    remove,
    wrapper,
    windowListener: add.mock.calls.find(([type]) => type === 'scroll')?.[1],
    view,
    scroll,
    outer,
    visible,
    callbacks,
    raf,
    cancel,
    hostRaf,
    hostCancel,
    requestClose,
    cleanup() {
      wrapper.unmount()
      if (addDescriptor) {
        Object.defineProperty(view, 'addEventListener', addDescriptor)
      } else {
        Reflect.deleteProperty(view, 'addEventListener')
      }
      if (removeDescriptor) {
        Object.defineProperty(view, 'removeEventListener', removeDescriptor)
      } else {
        Reflect.deleteProperty(view, 'removeEventListener')
      }
      raf.mockRestore()
      cancel.mockRestore()
      hostRaf.mockRestore()
      hostCancel.mockRestore()
      iframe.remove()
    },
  }
}

test('element scroll frame is canceled by its iframe owner', async () => {
  const probe = await fixture()
  try {
    probe.scroll.dispatchEvent(new probe.view.Event('scroll'))
    const id = [...probe.callbacks.keys()][0]
    probe.visible.value = false
    await nextTick()
    expect(probe.cancel).toHaveBeenCalledWith(id)
    expect(probe.hostCancel).not.toHaveBeenCalled()
  } finally {
    probe.cleanup()
  }
})

test('iframe window scroll schedules on the iframe, not the host', async () => {
  const probe = await fixture()
  try {
    probe.view.dispatchEvent(new probe.view.Event('scroll'))
    expect(probe.raf).toHaveBeenCalledTimes(1)
    expect(probe.hostRaf).not.toHaveBeenCalled()
  } finally {
    probe.cleanup()
  }
})

test('canceled dequeued frame cannot consume replacement scroll work', async () => {
  const probe = await fixture()
  try {
    probe.scroll.dispatchEvent(new probe.view.Event('scroll'))
    const old = [...probe.callbacks.values()][0]
    probe.visible.value = false
    await nextTick()
    probe.visible.value = true
    await nextTick()
    probe.callbacks.clear()
    probe.scroll.scrollTop = 20
    probe.scroll.dispatchEvent(new probe.view.Event('scroll'))
    const current = [...probe.callbacks.values()][0]
    old(0)
    expect(probe.requestClose).not.toHaveBeenCalled()
    current(0)
    expect(probe.requestClose).toHaveBeenCalledTimes(1)
  } finally {
    probe.cleanup()
  }
})

test('consumed frame cannot issue a second close', async () => {
  const probe = await fixture()
  try {
    probe.scroll.scrollTop = 20
    probe.scroll.dispatchEvent(new probe.view.Event('scroll'))
    const callback = [...probe.callbacks.values()][0]
    callback(0)
    callback(0)
    expect(probe.requestClose).toHaveBeenCalledTimes(1)
  } finally {
    probe.cleanup()
  }
})

test('checks every scroller that moved before the same animation frame', async () => {
  const probe = await fixture(true)
  try {
    probe.scroll.scrollTop = 20
    probe.scroll.dispatchEvent(new probe.view.Event('scroll'))
    probe.outer.scrollTop = 1
    probe.outer.dispatchEvent(new probe.view.Event('scroll'))
    expect(probe.callbacks.size).toBe(1)
    for (const callback of probe.callbacks.values()) {
      callback(0)
    }
    expect(probe.requestClose).toHaveBeenCalledTimes(1)
  } finally {
    probe.cleanup()
  }
})
