import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Field from '../FieldDecorator.vue'

const previous = {
  ResizeObserver: globalThis.ResizeObserver,
  requestAnimationFrame: globalThis.requestAnimationFrame,
  cancelAnimationFrame: globalThis.cancelAnimationFrame,
}
let frames, observers, owners
class Observer {
  targets = new Set()
  constructor(callback) {
    this.callback = callback
    observers.push(this)
  }
  observe(target) {
    this.targets.add(target)
  }
  disconnect() {
    this.targets.clear()
  }
  notify(target) {
    if (this.targets.has(target)) {
      this.callback([])
    }
  }
}
const tick = async () => {
  frames.splice(0).forEach((fn) => fn())
  await nextTick()
}
function dimensions(root, value) {
  const middle = root.querySelector('.mp-field-decorator__middle')
  Object.defineProperty(root, 'clientWidth', { configurable: true, value: 500 })
  Object.defineProperty(middle, 'offsetLeft', { configurable: true, value: 10 })
  Object.defineProperty(middle, 'offsetWidth', { configurable: true, get: value })
}
beforeEach(() => {
  frames = []
  observers = []
  owners = []
  vi.stubGlobal('ResizeObserver', Observer)
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn().mockImplementation((fn) => frames.push(fn)),
  )
  vi.stubGlobal(
    'cancelAnimationFrame',
    vi.fn().mockImplementation(() => {}),
  )
})
afterEach(() => {
  owners.forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  Object.entries(previous).forEach(([key, value]) => vi.stubGlobal(key, value))
})
test('a replacement tag is observed for later resizes rather than only measured once', async () => {
  const owner = mount(Field, { props: { tag: 'div', placeholder: 'Account' }, slots: { default: () => h('input') } })
  owners.push(owner)
  let width = 200
  dimensions(owner.element, () => width)
  window.dispatchEvent(new Event('resize'))
  await tick()
  await tick()
  await owner.setProps({ tag: 'span' })
  dimensions(owner.element, () => width)
  await tick()
  await tick()
  expect(owner.element.style.getPropertyValue('--mp-internal-field-content-width')).toBe('200px')
  width = 350
  observers.forEach((observer) => observer.notify(owner.element))
  await tick()
  await tick()
  expect(owner.element.style.getPropertyValue('--mp-internal-field-content-width')).toBe('350px')
})
test('a delivered old frame cannot mutate geometry after a KeepAlive cycle', async () => {
  const show = ref(true),
    inner = ref()
  const owner = mount({
    setup: () => () =>
      h(KeepAlive, null, {
        default: () => (show.value ? h(Field, { ref: inner }, { default: () => h('input') }) : null),
      }),
  })
  owners.push(owner)
  const root = inner.value.$el
  let width = 200
  dimensions(root, () => width)
  window.dispatchEvent(new Event('resize'))
  await tick()
  await tick()
  observers.forEach((observer) => observer.notify(root))
  const old = frames.splice(0)[0]
  show.value = false
  await nextTick()
  show.value = true
  await nextTick()
  width = 350
  old()
  await nextTick()
  expect(root.style.getPropertyValue('--mp-internal-field-content-width')).toBe('200px')
  observers.forEach((observer) => observer.notify(root))
  await tick()
  await tick()
  expect(root.style.getPropertyValue('--mp-internal-field-content-width')).toBe('350px')
})
