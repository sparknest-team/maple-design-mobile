import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import CountTo from '..'

const owners: ReturnType<typeof mount>[] = []
const frames = new Map<number, FrameRequestCallback>()
const originalRequest = Object.getOwnPropertyDescriptor(globalThis, 'requestAnimationFrame')
const originalCancel = Object.getOwnPropertyDescriptor(globalThis, 'cancelAnimationFrame')
let now = 100,
  serial = 0
beforeEach(() => {
  now = 100
  frames.clear()
  vi.spyOn(performance, 'now').mockImplementation(() => now)
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++serial, callback)
    return serial
  })
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id))
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
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
})
async function flush(elapsed = 1) {
  now += elapsed
  const pending = [...frames.values()]
  frames.clear()
  pending.forEach((callback) => callback(now))
  await nextTick()
}
function create(autoStart = false) {
  const owner = mount(CountTo, { props: { from: 0, to: 100, duration: 1000, timingFunction: () => 0, autoStart } })
  owners.push(owner)
  return owner
}
test('manual reset snapshots the latest timing function', async () => {
  const owner = create()
  await owner.setProps({ timingFunction: () => 1 })
  owner.vm.reset()
  owner.vm.start()
  await flush()
  expect(owner.text()).toBe('100')
  expect(owner.emitted('end')).toBeUndefined()
})
test('an active context retains its easing until reset creates a new context', async () => {
  const owner = create(true)
  await flush(250)
  expect(owner.text()).toBe('0')
  await owner.setProps({ timingFunction: () => 1 })
  await flush(250)
  expect(owner.text()).toBe('0')
  owner.vm.reset()
  await flush()
  expect(owner.text()).toBe('100')
  expect(owner.emitted('end')).toBeUndefined()
  await flush(1000)
  expect(owner.emitted('end')).toHaveLength(1)
})
test('clearing a timing function restores linear easing at the next reset', async () => {
  const owner = create()
  await owner.setProps({ timingFunction: undefined })
  owner.vm.reset()
  owner.vm.start()
  await flush(500)
  expect(owner.text()).toBe('50')
})
test('pause and resume retain the existing context; duration reset reads the latest easing', async () => {
  const owner = create(true)
  await flush(100)
  owner.vm.pause()
  await owner.setProps({ timingFunction: () => 1 })
  owner.vm.start()
  await flush(100)
  expect(owner.text()).toBe('0')
  await owner.setProps({ duration: 500 })
  await flush()
  expect(owner.text()).toBe('100')
})
