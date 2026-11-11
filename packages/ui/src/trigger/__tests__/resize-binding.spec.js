import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { useElementResize } from '../../utils/resize-observer'

test('a retained window resize listener cannot schedule for a new target', async () => {
  const first = document.createElement('div')
  const second = document.createElement('div')
  const target = ref(first)
  const view = first.ownerDocument.defaultView
  const add = vi.spyOn(view, 'addEventListener')
  const remove = vi.spyOn(view, 'removeEventListener')
  const raf = vi.spyOn(view, 'requestAnimationFrame').mockReturnValue(1)
  const update = vi.fn()
  const wrapper = mount({
    setup() {
      useElementResize(
        () => [target.value],
        () => true,
        update,
        false,
      )
      return () => h('div')
    },
  })
  try {
    const old = add.mock.calls.find(([type]) => type === 'resize')[1]
    target.value = second
    await nextTick()
    expect(remove).toHaveBeenCalledWith('resize', old)
    raf.mockClear()
    old(new Event('resize'))
    expect(raf).not.toHaveBeenCalled()
    const current = add.mock.calls.filter(([type]) => type === 'resize').at(-1)[1]
    current(new Event('resize'))
    expect(raf).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
  }
})

test('rebinding detaches the original visual viewport even when the window property changes', async () => {
  const first = document.createElement('div')
  const target = ref(first)
  const view = first.ownerDocument.defaultView
  const descriptor = Object.getOwnPropertyDescriptor(view, 'visualViewport')
  const oldViewport = new EventTarget()
  const newViewport = new EventTarget()
  const add = vi.spyOn(oldViewport, 'addEventListener')
  const remove = vi.spyOn(oldViewport, 'removeEventListener')
  Object.defineProperty(view, 'visualViewport', { configurable: true, value: oldViewport })
  const wrapper = mount({
    setup() {
      useElementResize(
        () => [target.value],
        () => true,
        () => {},
        false,
      )
      return () => h('div')
    },
  })
  try {
    const old = add.mock.calls.find(([type]) => type === 'resize')[1]
    Object.defineProperty(view, 'visualViewport', { configurable: true, value: newViewport })
    target.value = document.createElement('div')
    await nextTick()
    expect(remove).toHaveBeenCalledWith('resize', old)
    expect(remove).toHaveBeenCalledWith('scroll', old)
  } finally {
    wrapper.unmount()
    if (descriptor) {
      Object.defineProperty(view, 'visualViewport', descriptor)
    } else {
      delete view.visualViewport
    }
    vi.restoreAllMocks()
  }
})
