import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import PullRefresh from '../PullRefresh.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})
function mountRefresh(props) {
  const owner = mount(PullRefresh, { attachTo: document.body, props })
  owners.push(owner)
  return owner
}
function touch(type, x, y) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: [{ clientX: x, clientY: y }] })
  return event
}

test.each([{ modelValue: true }, { defaultValue: true }])(
  'initial loading reflects the model without emitting: %o',
  async (props) => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 40, height: 40 })
    const owner = mountRefresh(props)
    expect(owner.vm.refreshStatus).toBe('loading')
    await nextTick()
    expect(owner.find('.mp-pull-refresh__control').attributes('style')).toContain('30px')
    expect(owner.emitted('refresh')).toBeUndefined()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  },
)

test('horizontal gesture stays available to its child and does not refresh', async () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 40, height: 40 })
  const owner = mountRefresh({})
  const root = owner.element
  root.dispatchEvent(touch('touchstart', 0, 0))
  const horizontal = touch('touchmove', 700, 200)
  root.dispatchEvent(horizontal)
  root.dispatchEvent(touch('touchmove', 800, 400))
  root.dispatchEvent(touch('touchend', 800, 400))
  await Promise.resolve()
  expect(horizontal.defaultPrevented).toBe(false)
  expect(owner.vm.refreshStatus).toBe('default')
  expect(owner.emitted('refresh')).toBeUndefined()
})

test('rebinding during success settles and permits another gesture', async () => {
  vi.useFakeTimers()
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 40, height: 40 })
  const a = document.createElement('div'),
    b = document.createElement('div')
  document.body.append(a, b)
  const owner = mountRefresh({ modelValue: true, target: a, successDuration: 80, animationDuration: 30 })
  await owner.setProps({ modelValue: false })
  expect(owner.vm.refreshStatus).toBe('success')
  await owner.setProps({ target: b })
  expect(owner.vm.refreshStatus).toBe('default')
  vi.advanceTimersByTime(200)
  const root = owner.element
  root.dispatchEvent(touch('touchstart', 0, 0))
  root.dispatchEvent(touch('touchmove', 0, 50))
  root.dispatchEvent(touch('touchmove', 0, 250))
  root.dispatchEvent(touch('touchend', 0, 250))
  await Promise.resolve()
  expect(owner.emitted('update:modelValue')).toEqual([[true]])
})

test('remeasures the indicator after size changes', async () => {
  let deliver
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback) {
        deliver = callback
      }
      observe() {}
      disconnect() {}
    },
  )
  let width = 40
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({ width, height: width }))
  const owner = mountRefresh({ modelValue: true })
  await nextTick()
  expect(owner.find('.mp-pull-refresh__control').attributes('style')).toContain('30px')
  width = 80
  deliver()
  expect(owner.vm.controlStyle.transform).toContain('60px')
})

test('invalid durations use safe defaults while zero remains valid', async () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 40, height: 40 })
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mountRefresh({ modelValue: true, animationDuration: '200ms', successDuration: -1 })
  await nextTick()
  expect(owner.vm.controlStyle.transition).toContain('300ms')
  expect(warn).toHaveBeenCalled()
  await owner.setProps({ animationDuration: '0', successDuration: 0 })
  expect(owner.vm.controlStyle.transition).toContain('0ms')
})
