import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Statistic from '..'

const owners: ReturnType<typeof mount>[] = []
const originalRequest = Object.getOwnPropertyDescriptor(globalThis, 'requestAnimationFrame')
const originalCancel = Object.getOwnPropertyDescriptor(globalThis, 'cancelAnimationFrame')
let now = 0,
  serial = 0
const frames = new Map<number, FrameRequestCallback>()
beforeEach(() => {
  now = 0
  serial = 0
  frames.clear()
  vi.spyOn(performance, 'now').mockImplementation(() => now)
  Object.defineProperty(globalThis, 'requestAnimationFrame', {
    configurable: true,
    value: (callback: FrameRequestCallback) => {
      const id = ++serial
      frames.set(id, callback)
      return id
    },
  })
  Object.defineProperty(globalThis, 'cancelAnimationFrame', {
    configurable: true,
    value: (id: number) => {
      frames.delete(id)
    },
  })
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  for (const [key, descriptor] of [
    ['requestAnimationFrame', originalRequest],
    ['cancelAnimationFrame', originalCancel],
  ] as const) {
    if (descriptor) {
      Object.defineProperty(globalThis, key, descriptor)
    } else {
      Reflect.deleteProperty(globalThis, key)
    }
  }
  vi.restoreAllMocks()
})
async function advance(ms: number) {
  now += ms
  const current = [...frames.values()]
  frames.clear()
  current.forEach((callback) => callback(now))
  await nextTick()
}
function field(props = {}) {
  const owner = mount(Statistic, { props: { value: 100, animationDuration: 1000, ...props } })
  owners.push(owner)
  return owner
}
test('enabling animation while start is already true reaches the target', async () => {
  const owner = field({ animation: false })
  expect(owner.text()).toBe('100')
  await owner.setProps({ animation: true })
  expect(frames.size).toBe(1)
  await advance(500)
  expect(owner.text()).toBe('50')
  await advance(500)
  expect(owner.text()).toBe('100')
  expect(frames.size).toBe(0)
})
test('disabling animation releases frames and immediately shows the target', async () => {
  const owner = field({ animation: true })
  await advance(400)
  expect(owner.text()).toBe('40')
  await owner.setProps({ animation: false })
  expect(owner.text()).toBe('100')
  expect(frames.size).toBe(0)
  await advance(1000)
  expect(frames.size).toBe(0)
})
test('leaving numeric mode stops animation and returning to a number restarts with current configuration', async () => {
  const owner = field({ animation: true })
  await advance(200)
  await owner.setProps({ value: 'online' })
  expect(owner.text()).toBe('online')
  expect(frames.size).toBe(0)
  await owner.setProps({ value: 200, valueFrom: 20 })
  await advance(500)
  expect(owner.text()).toBe('110')
  await advance(500)
  expect(owner.text()).toBe('200')
})
test('changing from or duration deliberately replays; formatting changes do not replay', async () => {
  const owner = field({ animation: true })
  await advance(400)
  await owner.setProps({ valueFrom: 20, animationDuration: 2000 })
  expect(owner.text()).toBe('20')
  await advance(1000)
  expect(owner.text()).toBe('60')
  await owner.setProps({ precision: 1 })
  expect(owner.text()).toBe('60.0')
  await advance(1000)
  expect(owner.text()).toBe('100.0')
})
test('start false pauses while a later explicit start true replays from the configured origin', async () => {
  const owner = field({ animation: true })
  await advance(400)
  await owner.setProps({ start: false })
  expect(owner.text()).toBe('40')
  expect(frames.size).toBe(0)
  await advance(2000)
  expect(owner.text()).toBe('40')
  await owner.setProps({ start: true })
  expect(owner.text()).toBe('0')
  await advance(1000)
  expect(owner.text()).toBe('100')
})
test('KeepAlive resumes an unchanged run rather than replaying it', async () => {
  const visible = ref(true)
  const owner = mount({
    render: () =>
      h(KeepAlive, null, () =>
        visible.value ? h(Statistic, { value: 100, animation: true, animationDuration: 1000 }) : h('span'),
      ),
  })
  owners.push(owner)
  await advance(400)
  expect(owner.text()).toBe('40')
  visible.value = false
  await nextTick()
  expect(frames.size).toBe(0)
  await advance(2000)
  visible.value = true
  await nextTick()
  expect(owner.text()).toBe('40')
  await advance(300)
  expect(owner.text()).toBe('70')
  owner.unmount()
  owners.splice(owners.indexOf(owner), 1)
  expect(frames.size).toBe(0)
})

test('paused configuration prepares the new origin without starting a frame', async () => {
  const owner = field({ animation: true, start: false })
  await owner.setProps({ valueFrom: 20, animationDuration: 2000 })
  expect(owner.text()).toBe('20')
  expect(frames.size).toBe(0)
  await owner.setProps({ start: true })
  await advance(1000)
  expect(owner.text()).toBe('60')
  await advance(1000)
  expect(owner.text()).toBe('100')
})
test('configuration changed while inactive synchronizes the new run on activation', async () => {
  const visible = ref(true),
    target = ref(100)
  const owner = mount({
    render: () =>
      h(KeepAlive, null, () =>
        visible.value ? h(Statistic, { value: target.value, animation: true, animationDuration: 1000 }) : h('span'),
      ),
  })
  owners.push(owner)
  await advance(400)
  visible.value = false
  await nextTick()
  target.value = 200
  await nextTick()
  expect(frames.size).toBe(0)
  visible.value = true
  await nextTick()
  expect(owner.text()).toBe('0')
  expect(frames.size).toBe(1)
  await advance(1000)
  expect(owner.text()).toBe('200')
})
