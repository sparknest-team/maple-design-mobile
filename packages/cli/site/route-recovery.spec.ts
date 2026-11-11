import { afterEach, expect, it, vi } from 'vitest'
import type { Router } from 'vue-router'
import { installRouteRecovery } from './route-recovery'

afterEach(() => vi.unstubAllGlobals())
function fixture() {
  const storage = new Map<string, string>()
  const location = { pathname: '/', assign: vi.fn(), reload: vi.fn() }
  vi.stubGlobal('window', {
    location,
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  })
  let error: (error: Error, to: { fullPath: string }) => void
  let complete: (to: object, from: object, failure?: object) => void
  const router = {
    onError: (handler: typeof error) => {
      error = handler
    },
    afterEach: (handler: typeof complete) => {
      complete = handler
    },
    resolve: (path: string) => ({ href: '#' + path }),
  } as unknown as Router
  installRouteRecovery(router)
  return {
    location,
    storage,
    error: (...args: Parameters<typeof error>) => error(...args),
    complete: () => complete({}, {}),
  }
}
it('reloads a stale chunk at the requested Input route once, then clears the guard on success', () => {
  const host = fixture()
  const failure = new Error('Failed to fetch dynamically imported module: /assets/input-old.js')
  host.error(failure, { fullPath: '/zh-CN/input' })
  expect(host.location.assign).toHaveBeenCalledWith('#/zh-CN/input')
  expect(host.location.reload).toHaveBeenCalledTimes(1)
  host.error(failure, { fullPath: '/zh-CN/input' })
  expect(host.location.reload).toHaveBeenCalledTimes(1)
  host.complete()
  expect(host.storage.size).toBe(0)
})
it('does not reload for component errors', () => {
  const host = fixture()
  host.error(new Error('Component render failed'), { fullPath: '/zh-CN/input' })
  expect(host.location.reload).not.toHaveBeenCalled()
})
