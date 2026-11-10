import { createApp } from 'vue'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Lazy, { imageCache } from '..'

let frames, images, hosts
class ControlledImage extends EventTarget {
  callbacks = {}
  src = ''
  addEventListener(type, callback, options) {
    this.callbacks[type] = callback
    super.addEventListener(type, callback, options)
  }
  removeAttribute() {
    this.src = ''
  }
  late(type) {
    this.callbacks[type]?.(new Event(type))
  }
}
const tickFrames = async () => {
  for (let i = 0; i < 2; i++) {
    frames.splice(0).forEach((callback) => callback())
    await Promise.resolve()
  }
}
function host(src = '/first.svg', attrs = {}, arg = undefined) {
  const el = document.createElement('img')
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value)
  }
  document.body.appendChild(el)
  hosts.push(el)
  Lazy.mounted(el, { value: src, arg })
  return el
}
beforeEach(() => {
  frames = []
  images = []
  hosts = []
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frames.push(callback))
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  vi.stubGlobal(
    'Image',
    class extends ControlledImage {
      constructor() {
        super()
        images.push(this)
      }
    },
  )
  imageCache.clear()
  Lazy.install(createApp({}), { events: ['scroll'], loading: '', error: '/error.svg', attempt: 3 })
})
afterEach(() => {
  hosts.forEach((el) => {
    Lazy.unmounted(el)
    el.remove()
  })
  imageCache.clear()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
test('late responses cannot overwrite a replacement job or its state', async () => {
  const el = host()
  await tickFrames()
  const old = images[0]
  Lazy.updated(el, { value: '/second.svg' })
  await tickFrames()
  images[1].late('load')
  expect(el.getAttribute('src')).toBe('/second.svg')
  old.late('load')
  old.late('error')
  expect(el.getAttribute('src')).toBe('/second.svg')
  expect(el._lazy.state).toBe('success')
  expect(images).toHaveLength(2)
})
test('unmount cancels queued work and ignores already-delivered old callbacks', async () => {
  const quick = host()
  Lazy.unmounted(quick)
  await tickFrames()
  expect(images).toHaveLength(0)
  const active = host('/active.svg')
  await tickFrames()
  const image = images[0],
    previous = active.getAttribute('src')
  Lazy.unmounted(active)
  image.late('load')
  image.late('error')
  await tickFrames()
  expect(active.getAttribute('src')).toBe(previous)
  expect(active._lazy.state).toBe('pending')
  expect(images).toHaveLength(1)
})
test('replayed frame callbacks cannot schedule a second viewport check', () => {
  host('/replay.svg')
  const first = frames.shift()
  first()
  expect(frames).toHaveLength(1)
  first()
  expect(frames).toHaveLength(1)
  const second = frames.shift()
  second()
  expect(images).toHaveLength(1)
  second()
  expect(images).toHaveLength(1)
})
test('a superseded throttle callback cannot schedule work', async () => {
  vi.spyOn(performance, 'now').mockReturnValue(-100000)
  const callbacks = []
  vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn) => {
    callbacks.push(fn)
    return 123456
  })
  host('/throttle.svg')
  await tickFrames()
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('scroll'))
  expect(callbacks).toHaveLength(2)
  callbacks[0]()
  expect(frames).toHaveLength(0)
})
test.each([
  ['not-number', 3],
  ['Infinity', 3],
  ['0', 1],
  ['-2', 1],
  ['2.8', 2],
])('attempt=%s has a finite total request count', async (attempt, count) => {
  const el = host('/fails.svg', { 'lazy-attempt': attempt })
  await tickFrames()
  for (let i = 0; i < 10 && images[i]; i++) {
    images[i].late('error')
  }
  await tickFrames()
  expect(images).toHaveLength(count)
  expect(el._lazy.state).toBe('error')
  expect(el._lazy.currentAttempt).toBe(count)
})
test('background URLs with parentheses are quoted before CSS assignment', async () => {
  const el = host('/asset(a).svg', {}, 'background-image')
  const setter = vi.spyOn(el.style, 'backgroundImage', 'set')
  await tickFrames()
  images[0].late('load')
  expect(setter).toHaveBeenCalledWith('url("/asset(a).svg")')
})
test('reinstall replaces exact event bindings and final teardown releases them', () => {
  const add = vi.spyOn(window, 'addEventListener'),
    remove = vi.spyOn(window, 'removeEventListener'),
    el = host()
  const old = add.mock.calls.find(([name]) => name === 'scroll')?.[1]
  expect(old).toBeTypeOf('function')
  Lazy.install(createApp({}), { events: ['resize'], throttleWait: 20 })
  expect(remove.mock.calls.some(([name, handler]) => name === 'scroll' && handler === old)).toBe(true)
  const next = add.mock.calls.find(([name]) => name === 'resize')?.[1]
  expect(next).toBeTypeOf('function')
  Lazy.unmounted(el)
  expect(remove.mock.calls.some(([name, handler]) => name === 'resize' && handler === next)).toBe(true)
})

test('a late callback from an earlier retry cannot complete the active attempt', async () => {
  const el = host('/retry.svg')
  await tickFrames()
  const first = images[0]
  first.late('error')
  expect(images).toHaveLength(2)
  first.late('load')
  first.late('error')
  expect(el._lazy.state).toBe('pending')
  expect(images).toHaveLength(2)
  images[1].late('load')
  expect(el._lazy.state).toBe('success')
})

test('inline options can restart a completed source without a source change', async () => {
  const el = host('/same.svg')
  await tickFrames()
  images[0].late('load')
  el.setAttribute('lazy-loading', '/new-placeholder.svg')
  Lazy.updated(el, { value: '/same.svg' })
  expect(el._lazy.loading).toBe('/new-placeholder.svg')
  expect(el._lazy.state).toBe('pending')
  await tickFrames()
  expect(el._lazy.state).toBe('success')
})
