import { describe, expect, test, vi } from 'vitest'
import { scrollTo } from '../elements'

function harness(iframe = false, windowTarget = false) {
  const frame = iframe ? document.createElement('iframe') : undefined
  if (frame) {
    document.body.append(frame)
  }
  const view = frame?.contentWindow ?? document.defaultView
  const hostFrames = []
  const ownerFrames = iframe ? [] : hostFrames
  const host = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
    hostFrames.push(callback)
    return hostFrames.length
  })
  const rafDescriptor = Object.getOwnPropertyDescriptor(view, 'requestAnimationFrame')
  const mediaDescriptor = Object.getOwnPropertyDescriptor(view, 'matchMedia')
  Object.defineProperty(view, 'requestAnimationFrame', {
    configurable: true,
    value: (callback) => {
      ownerFrames.push(callback)
      return ownerFrames.length
    },
  })
  let reduced = false,
    clock = 0
  Object.defineProperty(view, 'matchMedia', { configurable: true, value: () => ({ matches: reduced }) })
  const now = vi.spyOn(Date, 'now').mockImplementation(() => clock)
  const node = view.document.createElement('div')
  view.document.body.append(node)
  const target = windowTarget ? view : node
  const scrollDescriptor = Object.getOwnPropertyDescriptor(target, 'scrollTo')
  const scroll = vi.fn()
  Object.defineProperty(target, 'scrollTo', { configurable: true, value: scroll })
  function restore(object, key, descriptor) {
    if (descriptor) {
      Object.defineProperty(object, key, descriptor)
    } else {
      Reflect.deleteProperty(object, key)
    }
  }
  return {
    target,
    scroll,
    hostFrames,
    ownerFrames,
    setClock(value) {
      clock = value
    },
    setReduced(value) {
      reduced = value
    },
    cleanup() {
      restore(target, 'scrollTo', scrollDescriptor)
      restore(view, 'matchMedia', mediaDescriptor)
      restore(view, 'requestAnimationFrame', rafDescriptor)
      node.remove()
      frame?.remove()
      host.mockRestore()
      now.mockRestore()
    },
  }
}

describe('shared visual scroll execution boundaries', () => {
  for (const duration of [0, -1, NaN, Infinity]) {
    test(`duration ${duration} reaches target without a queued frame`, async () => {
      const p = harness()
      try {
        const done = scrollTo(p.target, { top: 100, left: 20, duration, animation: (x) => x })
        expect(p.scroll).toHaveBeenCalledWith(20, 100)
        expect(p.ownerFrames).toHaveLength(0)
        await done
      } finally {
        p.cleanup()
      }
    })
  }
  for (const windowTarget of [false, true]) {
    test(`iframe ${windowTarget ? 'Window' : 'element'} uses its own RAF`, async () => {
      const p = harness(true, windowTarget)
      try {
        const done = scrollTo(p.target, { top: 100, duration: 100, animation: (x) => x })
        expect(p.hostFrames).toHaveLength(0)
        expect(p.ownerFrames).toHaveLength(1)
        p.setClock(100)
        p.ownerFrames[0](100)
        await done
        expect(p.scroll).toHaveBeenLastCalledWith(0, 100)
      } finally {
        p.cleanup()
      }
    })
  }
  test('consumed and completed callbacks cannot write or schedule again', async () => {
    const p = harness()
    try {
      const done = scrollTo(p.target, { top: 100, duration: 100, animation: (x) => x })
      p.setClock(50)
      p.ownerFrames[0](50)
      expect(p.scroll).toHaveBeenLastCalledWith(0, 50)
      p.ownerFrames[0](50)
      expect(p.scroll).toHaveBeenCalledTimes(1)
      expect(p.ownerFrames).toHaveLength(2)
      p.setClock(100)
      p.ownerFrames[1](100)
      await done
      p.ownerFrames[1](100)
      expect(p.scroll).toHaveBeenCalledTimes(2)
    } finally {
      p.cleanup()
    }
  })
  test('default300ms keeps caller easing and target coordinates', async () => {
    const p = harness()
    try {
      const easing = vi.fn((x) => x * x)
      const done = scrollTo(p.target, { top: 100, left: 20, animation: easing })
      p.setClock(150)
      p.ownerFrames[0](150)
      expect(easing).toHaveBeenCalledWith(0.5)
      expect(p.scroll).toHaveBeenLastCalledWith(5, 25)
      p.setClock(300)
      p.ownerFrames[1](300)
      await done
      expect(p.scroll).toHaveBeenLastCalledWith(20, 100)
    } finally {
      p.cleanup()
    }
  })
  test('owner reduced motion reaches target without interpolation', async () => {
    const p = harness(true)
    try {
      p.setReduced(true)
      const done = scrollTo(p.target, { top: 100, animation: (x) => x })
      expect(p.scroll).toHaveBeenCalledWith(0, 100)
      expect(p.ownerFrames).toHaveLength(0)
      await done
    } finally {
      p.cleanup()
    }
  })
  test('owner preference change completes the next frame without extra interpolation', async () => {
    const p = harness(true)
    try {
      const done = scrollTo(p.target, { top: 100, duration: 100, animation: (x) => x })
      expect(p.ownerFrames).toHaveLength(1)
      p.setReduced(true)
      p.setClock(10)
      p.ownerFrames[0](10)
      expect(p.scroll).toHaveBeenLastCalledWith(0, 100)
      expect(p.ownerFrames).toHaveLength(1)
      await done
    } finally {
      p.cleanup()
    }
  })
})
