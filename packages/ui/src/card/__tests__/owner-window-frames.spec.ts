import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Card from '../Card.vue'

test('iframe Card schedules its opening frames in the owning window', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const ownerWindow = iframe.contentWindow!
  const callbacks: FrameRequestCallback[] = []
  const frames = vi.spyOn(ownerWindow, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const wrapper = mount(Card, {
    attachTo: iframe.contentDocument!.body,
    props: { floating: false, ripple: false },
  })
  try {
    await wrapper.setProps({ floating: true })
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(frames).toHaveBeenCalledTimes(1)
    callbacks.shift()!(0)
    expect(frames).toHaveBeenCalledTimes(2)
    callbacks.shift()!(16)
    await nextTick()
    await nextTick()
    expect((wrapper.find('[class$="card__floater"]').element as HTMLElement).style.width).toBe('100vw')
  } finally {
    wrapper.unmount()
    frames.mockRestore()
    iframe.remove()
  }
})

test('closing an iframe Card cancels its pending opening frame', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const view = iframe.contentWindow!
  const callbacks: FrameRequestCallback[] = []
  const frames = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame')
  const wrapper = mount(Card, {
    attachTo: iframe.contentDocument!.body,
    props: { floating: false, ripple: false, floatingDuration: 0 },
  })
  try {
    await wrapper.setProps({ floating: true })
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(frames).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ floating: false })
    expect(cancel).toHaveBeenCalledWith(1)
    callbacks[0]!(0)
    await nextTick()
    expect(frames).toHaveBeenCalledTimes(1)
    expect((wrapper.find('[class$="card__floater"]').element as HTMLElement).style.width).not.toBe('100vw')
  } finally {
    wrapper.unmount()
    frames.mockRestore()
    cancel.mockRestore()
    iframe.remove()
  }
})

test('unmounting an iframe Card cancels its second opening frame', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const view = iframe.contentWindow!
  const callbacks: FrameRequestCallback[] = []
  const frames = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame')
  const wrapper = mount(Card, { attachTo: iframe.contentDocument!.body, props: { floating: false, ripple: false } })
  try {
    await wrapper.setProps({ floating: true })
    await new Promise((resolve) => setTimeout(resolve, 30))
    callbacks[0]!(0)
    expect(frames).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    expect(cancel).toHaveBeenCalledWith(2)
    callbacks[1]!(16)
    await nextTick()
    expect(frames).toHaveBeenCalledTimes(2)
  } finally {
    wrapper.unmount()
    frames.mockRestore()
    cancel.mockRestore()
    iframe.remove()
  }
})

test('deactivating an iframe Card cancels a pending opening frame', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const view = iframe.contentWindow!
  const callbacks: FrameRequestCallback[] = []
  const frames = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame')
  const active = ref(true)
  const wrapper = mount(
    defineComponent({
      setup: () => () => h(KeepAlive, null, () => (active.value ? h(Card, { floating: true, ripple: false }) : null)),
    }),
    { attachTo: iframe.contentDocument!.body },
  )
  try {
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(frames).toHaveBeenCalledTimes(1)
    active.value = false
    await nextTick()
    expect(cancel).toHaveBeenCalledWith(1)
    callbacks[0]!(0)
    await nextTick()
    expect(frames).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    frames.mockRestore()
    cancel.mockRestore()
    iframe.remove()
  }
})

test('iframe Card cancels pending frames when reduced motion becomes active', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const view = iframe.contentWindow!
  const oldMedia = Object.getOwnPropertyDescriptor(view, 'matchMedia')
  const changes: Array<(event: { matches: boolean }) => void> = []
  const media = {
    matches: false,
    addEventListener: vi.fn((_event, callback) => {
      changes.push(callback)
    }),
    removeEventListener: vi.fn(),
  }
  Object.defineProperty(view, 'matchMedia', { configurable: true, value: () => media })
  const callbacks: FrameRequestCallback[] = []
  const frames = vi.spyOn(view, 'requestAnimationFrame').mockImplementation((callback) => {
    callbacks.push(callback)
    return callbacks.length
  })
  const cancel = vi.spyOn(view, 'cancelAnimationFrame')
  const wrapper = mount(Card, { attachTo: iframe.contentDocument!.body, props: { floating: false, ripple: false } })
  try {
    await wrapper.setProps({ floating: true })
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(frames).toHaveBeenCalledTimes(1)
    expect(changes.length).toBeGreaterThan(0)
    media.matches = true
    changes.forEach((change) => change({ matches: true }))
    expect(cancel).toHaveBeenCalledWith(1)
    await new Promise((resolve) => setTimeout(resolve, 30))
    await nextTick()
    expect((wrapper.find('[class$="card__floater"]').element as HTMLElement).style.width).toBe('100vw')
    callbacks[0]!(0)
    await nextTick()
    expect(frames).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
    frames.mockRestore()
    cancel.mockRestore()
    if (oldMedia) {
      Object.defineProperty(view, 'matchMedia', oldMedia)
    } else {
      Reflect.deleteProperty(view, 'matchMedia')
    }
    iframe.remove()
  }
})
