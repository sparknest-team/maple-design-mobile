import { nextTick, transformVNodeArgs } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'

export function installServiceTransitionTimers() {
  // mount() leaves a global VNode transformer behind; raw service render() needs real leave hooks.
  transformVNodeArgs()
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  // Restore each jsdom window's RAF explicitly rather than using a worker-level fake-clock snapshot.
  vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(
    (callback) => setTimeout(() => callback(performance.now()), 16) as unknown as number,
  )
  vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id))
}

export async function finishServiceTransitions() {
  // Action promises settle before Vue's two-frame leave hook disposes the service DOM.
  await nextTick()
  vi.runAllTimers()
  await flushPromises()
}

export function restoreServiceTransitionTimers() {
  transformVNodeArgs()
  vi.restoreAllMocks()
  vi.useRealTimers()
}
