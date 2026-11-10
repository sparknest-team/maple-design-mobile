import { afterEach, expect, test, vi } from 'vitest'

const hooks = vi.hoisted(() => ({ afterUnmount: undefined, oldRef: undefined }))
vi.mock('../../utils/components', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    mountInstance: (...args) => {
      const mounted = actual.mountInstance(...args)
      return {
        ...mounted,
        unmountInstance: () => {
          mounted.unmountInstance()
          if (hooks.afterUnmount) {
            hooks.oldRef = args[2].ref
          }
          hooks.afterUnmount?.()
        },
      }
    },
  }
})

afterEach(() => {
  hooks.afterUnmount = undefined
  hooks.oldRef = undefined
  vi.restoreAllMocks()
  vi.useRealTimers()
})

test('starting during old instance cleanup preserves the new service instance', async () => {
  vi.useFakeTimers()
  vi.resetModules()
  const { nextTick } = await import('vue')
  const LoadingBar = (await import('..')).default
  LoadingBar.start()
  LoadingBar.finish()
  hooks.afterUnmount = () => {
    hooks.afterUnmount = undefined
    LoadingBar.start()
  }
  await vi.advanceTimersByTimeAsync(0)
  await nextTick()
  await vi.advanceTimersByTimeAsync(300)
  await nextTick()
  await vi.advanceTimersByTimeAsync(250)
  await nextTick()
  expect(document.querySelector('.mp-loading-bar')).not.toBeNull()
  // An old callback arriving after the new mount must not erase its element.
  hooks.oldRef(null)
  const getStyle = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    transitionProperty: 'width, opacity',
    transitionDuration: '600ms, 0ms',
    transitionDelay: '0ms, 0ms',
  })
  LoadingBar.finish()
  await vi.advanceTimersByTimeAsync(0)
  await nextTick()
  expect(getStyle).toHaveBeenCalled()
  await vi.advanceTimersByTimeAsync(300)
  await nextTick()
  expect(document.querySelector('.mp-loading-bar')).not.toBeNull()
  await vi.advanceTimersByTimeAsync(300)
  await nextTick()
  await vi.advanceTimersByTimeAsync(250)
  await nextTick()
  expect(document.querySelector('.mp-loading-bar')).toBeNull()
})
