import { afterEach, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.doUnmock('vue')
  vi.resetModules()
})

test('duplicate modules share IDs for a non-extensible app context', async () => {
  const appContext = Object.preventExtensions({})
  vi.doMock('vue', () => ({ useId: undefined, getCurrentInstance: () => ({ appContext }) }))
  const first = await import('../vue-compat')
  vi.resetModules()
  const second = await import('../vue-compat')
  expect(first.useId()).not.toBe(second.useId())
})

test('keeps separate frozen apps independent and reuses each counter', async () => {
  const appA = Object.preventExtensions({})
  const appB = Object.preventExtensions({})
  let appContext = appA
  vi.doMock('vue', () => ({ useId: undefined, getCurrentInstance: () => ({ appContext }) }))
  const module = await import('../vue-compat')
  const first = module.useId()
  appContext = appB
  expect(module.useId()).toBe(first)
  appContext = appA
  expect(module.useId()).not.toBe(first)
})

test('keeps using the native Vue implementation when present', async () => {
  const native = vi.fn(() => 'native-id')
  vi.doMock('vue', () => ({ useId: native }))
  const module = await import('../vue-compat')
  expect(module.useId()).toBe('native-id')
  expect(native).toHaveBeenCalledTimes(1)
})

test('keeps a local fallback if a hardened global rejects the shared registry', async () => {
  const appContext = Object.preventExtensions({})
  vi.doMock('vue', () => ({ useId: undefined, getCurrentInstance: () => ({ appContext }) }))
  const module = await import('../vue-compat')
  const get = Reflect.get
  const define = Object.defineProperty
  const getSpy = vi
    .spyOn(Reflect, 'get')
    .mockImplementation((target, key, receiver) =>
      target === globalThis && typeof key === 'symbol' && Symbol.keyFor(key)?.includes('vue-id-fallback-registry')
        ? undefined
        : get(target, key, receiver ?? target),
    )
  const defineSpy = vi.spyOn(Object, 'defineProperty').mockImplementation((target, key, descriptor) => {
    if (target === globalThis && typeof key === 'symbol' && Symbol.keyFor(key)?.includes('vue-id-fallback-registry')) {
      throw new TypeError('hardened global')
    }
    return define(target, key, descriptor)
  })
  let first: string, second: string
  try {
    first = module.useId()
    second = module.useId()
  } finally {
    getSpy.mockRestore()
    defineSpy.mockRestore()
  }
  expect(first).not.toBe(second)
})
