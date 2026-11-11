import { nextTick } from 'vue'
import { useMotion } from '@maple-design/use-vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import CountTo from '..'
import Statistic from '../../statistic'

const owners: ReturnType<typeof mount>[] = []
const frames = new Map<number, FrameRequestCallback>()
const originalRequest = Object.getOwnPropertyDescriptor(globalThis, 'requestAnimationFrame')
const originalCancel = Object.getOwnPropertyDescriptor(globalThis, 'cancelAnimationFrame')
let serial = 0
beforeEach(() => {
  frames.clear()
  vi.spyOn(performance, 'now').mockReturnValue(100)
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
async function flush() {
  const pending = [...frames.values()]
  frames.clear()
  pending.forEach((callback) => callback(100))
  await nextTick()
}
for (const duration of [0, -1, NaN, Infinity, -Infinity]) {
  test(`CountTo duration ${duration} terminates at its target and ends once`, async () => {
    const end = vi.fn(() => new Promise(() => {}))
    const owner = mount(CountTo, { props: { from: 2, to: 7, duration, onEnd: end } })
    owners.push(owner)
    await flush()
    expect(owner.text()).toBe('7')
    expect(end).toHaveBeenCalledTimes(1)
    expect(frames.size).toBe(0)
    owner.vm.start()
    await flush()
    expect(end).toHaveBeenCalledTimes(1)
    owner.vm.reset()
    owner.vm.pause()
    await flush()
    expect(end).toHaveBeenCalledTimes(1)
    expect(frames.size).toBe(0)
  })
  test(`Statistic duration ${duration} terminates at its target`, async () => {
    const owner = mount(Statistic, { props: { value: 7, valueFrom: 2, animation: true, animationDuration: duration } })
    owners.push(owner)
    await flush()
    expect(owner.text()).toContain('7')
    expect(frames.size).toBe(0)
  })
}
test('useMotion numeric zero is preserved rather than replaced by the default', async () => {
  const finished = vi.fn()
  const motion = useMotion({ from: 2, to: 7, duration: 0, onFinished: finished })
  motion.start()
  await flush()
  expect(motion.value.value).toBe(7)
  expect(motion.state.value).toBe('finished')
  expect(finished).toHaveBeenCalledTimes(1)
  expect(frames.size).toBe(0)
})
test('unmount cancels a zero-duration completion before the first frame', async () => {
  const end = vi.fn()
  const owner = mount(CountTo, { props: { to: 7, duration: 0, onEnd: end } })
  owner.unmount()
  await flush()
  expect(end).not.toHaveBeenCalled()
  expect(frames.size).toBe(0)
})
