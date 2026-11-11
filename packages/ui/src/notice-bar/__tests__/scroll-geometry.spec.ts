import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Button from '../../button'
import PauseDemo from '../example/demos/pausable.vue'
import NoticeBar from '../NoticeBar.vue'

const originalObserver = globalThis.ResizeObserver
const observers: FakeResizeObserver[] = []
class FakeResizeObserver {
  callback: ResizeObserverCallback
  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    observers.push(this)
  }
  trigger() {
    this.callback([], this as unknown as ResizeObserver)
  }
}
afterEach(() => {
  globalThis.ResizeObserver = originalObserver
  vi.restoreAllMocks()
  observers.length = 0
})

test('uses actual animated width, updates on resize, and disconnects', async () => {
  globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver
  let textWidth = 360,
    contentWidth = 260
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    return this.classList.contains('mp-notice-bar__text') ? textWidth : contentWidth
  })
  const owner = mount(NoticeBar, { props: { scrollable: true, speed: 60, text: 'Notice' } })
  const observer = observers[0]
  await owner.vm.$nextTick()
  await owner.vm.$nextTick()
  expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-duration: 6s')
  textWidth = 600
  contentWidth = 400
  observer.trigger()
  await owner.vm.$nextTick()
  expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-duration: 10s')
  expect(observer.observe).toHaveBeenCalledTimes(2)
  owner.unmount()
  expect(observer.disconnect).toHaveBeenCalledOnce()
})

test('paused state controls animation without changing the scrollable contract', async () => {
  const owner = mount(NoticeBar, { props: { scrollable: true, paused: true } })
  try {
    expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-play-state: paused')
    await owner.setProps({ paused: false })
    expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-play-state: running')
  } finally {
    owner.unmount()
  }
})

test('invalid speeds fall back to one pixel per second and nonfinite delay to zero', async () => {
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(300)
  const owner = mount(NoticeBar, { props: { scrollable: true, speed: Infinity, delay: Infinity } })
  try {
    await owner.vm.$nextTick()
    await owner.vm.$nextTick()
    const text = owner.get('.mp-notice-bar__text')
    expect(text.attributes('style')).toContain('animation-duration: 300s')
    expect(text.attributes('style')).toContain('animation-delay: 0s')
    await owner.setProps({ speed: 'invalid', delay: -2 })
    await owner.vm.$nextTick()
    expect(text.attributes('style')).toContain('animation-duration: 300s')
    expect(text.attributes('style')).toContain('animation-delay: -2s')
  } finally {
    owner.unmount()
  }
})

test('pause demo lets a reader pause and resume the notice', async () => {
  const owner = mount(PauseDemo, { global: { components: { MpNoticeBar: NoticeBar, MpButton: Button } } })
  try {
    const button = owner.get('button')
    expect(button.attributes('aria-pressed')).toBe('false')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).toBe('true')
    expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-play-state: paused')
    await button.trigger('click')
    expect(owner.get('.mp-notice-bar__text').attributes('style')).toContain('animation-play-state: running')
  } finally {
    owner.unmount()
  }
})
