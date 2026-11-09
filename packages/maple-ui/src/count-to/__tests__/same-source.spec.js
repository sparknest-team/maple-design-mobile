import { Comment, createSSRApp, Fragment, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('count-to')

describe('count-to copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('renders start values independently and exposes manual controls', () => {
    const a = mount(Component, { props: { from: 12.35, to: 50, precision: 1, autoStart: false } })
    const b = mount(Component, { props: { from: 7, autoStart: false } })
    expect(a.text()).toBe('12.3')
    expect(b.text()).toBe('7')
    for (const method of ['start', 'pause', 'reset']) {
      expect(typeof a.vm[method]).toBe('function')
    }
    a.unmount()
    b.unmount()
  })
  it('does not emit end after unmount', async () => {
    const ended = vi.fn()
    const w = mount(Component, { props: { to: 100, duration: 40, onEnd: ended } })
    w.unmount()
    await new Promise((resolve) => setTimeout(resolve, 80))
    expect(ended).not.toHaveBeenCalled()
  })

  it('pauses under KeepAlive and resumes its own animation', async () => {
    let now = 1000,
      id = 0
    const frames = new Map()
    const clock = vi.spyOn(performance, 'now').mockImplementation(() => now)
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.set(++id, callback)
      return id
    })
    const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
    const advance = (elapsed) => {
      now += elapsed
      const callbacks = [...frames.values()]
      frames.clear()
      callbacks.forEach((callback) => callback(now))
    }
    const visible = ref(true),
      ended = vi.fn()
    const Host = {
      setup: () => () =>
        h(
          KeepAlive,
          {},
          {
            default: () => (visible.value ? h(Component, { to: 100, duration: 160, onEnd: ended }) : null),
          },
        ),
    }
    const w = mount(Host)
    try {
      advance(40)
      visible.value = false
      await nextTick()
      advance(200)
      expect(ended).not.toHaveBeenCalled()
      expect(frames.size).toBe(0)
      visible.value = true
      await nextTick()
      advance(120)
      expect(ended).toHaveBeenCalledTimes(1)
    } finally {
      w.unmount()
      clock.mockRestore()
      raf.mockRestore()
      cancel.mockRestore()
    }
  })
})

it('normalizes non-finite endpoints and retains parseFloat string compatibility', async () => {
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Component, { props: { from: Infinity, to: 'bad', autoStart: false } })
  expect(w.text()).toBe('0')
  expect(warning).toHaveBeenCalled()
  await w.setProps({ from: '10px', to: 20 })
  expect(w.text()).toBe('10')
  w.unmount()
  warning.mockRestore()
})

it('completes overflowing finite endpoint distance on the next frame', async () => {
  const done = vi.fn()
  const w = mount(Component, { props: { from: -1e308, to: 1e308, duration: 1000, onEnd: done } })
  await new Promise((resolve) => setTimeout(resolve, 100))
  expect(w.text()).toContain('e+308')
  expect(done).toHaveBeenCalledTimes(1)
  w.unmount()
})
