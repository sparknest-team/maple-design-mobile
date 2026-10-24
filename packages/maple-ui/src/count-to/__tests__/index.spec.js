import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CountTo from '..'
import { delay } from '../../utils/test'

test('count-to plugin', () => {
  const app = createApp({}).use(CountTo)
  expect(app.component(CountTo.name)).toBeTruthy()
})

const DURATION = 100

test('count-to basic animation', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 100,
      duration: DURATION,
    },
  })

  expect(wrapper.text()).toBe('0')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('100')
  wrapper.unmount()
})

test('count-to props change', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 100,
      duration: DURATION,
    },
  })

  expect(wrapper.text()).toBe('0')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('100')
  await wrapper.setProps({ from: -200, to: 200 })
  expect(wrapper.text()).toBe('-200')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('200')
  wrapper.unmount()
})

test('count-to slot', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 100,
      duration: DURATION,
    },
    slots: {
      default: ({ value }) => value * 2,
    },
  })

  expect(wrapper.text()).toBe('0')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('200')
  wrapper.unmount()
})

test('count-to manual control', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 100,
      duration: DURATION,
      autoStart: false,
    },
  })

  expect(wrapper.text()).toBe('0')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('0')
  await wrapper.vm.start()
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('100')
  await wrapper.vm.reset()
  expect(wrapper.text()).toBe('0')
  await wrapper.vm.pause()
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('0')
  await wrapper.vm.start()
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('100')

  wrapper.unmount()
})

test('count-to precision', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 33.333,
      duration: DURATION,
      precision: 2,
    },
  })

  expect(wrapper.text()).toBe('0')
  await delay(DURATION + 20)
  expect(wrapper.text()).toBe('33.33')
  wrapper.unmount()
})

test('count-to timing function', async () => {
  const wrapper = mount(CountTo, {
    props: {
      from: 0,
      to: 100,
      duration: DURATION,
      timingFunction: () => 1,
    },
  })

  await delay(20)
  expect(wrapper.text()).toBe('100')
  wrapper.unmount()
})

test('count-to end event', async () => {
  const onEnd = vi.fn()
  let now = 1000
  let frameId = 0
  const frames = new Map()
  const clock = vi.spyOn(performance, 'now').mockImplementation(() => now)
  const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.set(++frameId, callback)
    return frameId
  })
  const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
  const advance = (elapsed) => {
    now += elapsed
    const callbacks = [...frames.values()]
    frames.clear()
    callbacks.forEach((callback) => callback(now))
  }
  let wrapper
  try {
    wrapper = mount(CountTo, { props: { from: 0, to: 100, duration: DURATION, onEnd } })
    advance(DURATION - 1)
    expect(onEnd).not.toHaveBeenCalled()
    advance(1)
    await nextTick()
    expect(wrapper.text()).toBe('100')
    expect(onEnd).toHaveBeenCalledTimes(1)
    advance(DURATION)
    expect(onEnd).toHaveBeenCalledTimes(1)
  } finally {
    wrapper?.unmount()
    clock.mockRestore()
    raf.mockRestore()
    cancel.mockRestore()
  }
})
