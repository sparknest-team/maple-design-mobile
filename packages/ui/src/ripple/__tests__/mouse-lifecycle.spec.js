import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Ripple from '../index'

const Host = {
  directives: { Ripple },
  data: () => ({ disabled: false }),
  template: '<button v-ripple="{ disabled }">Wave</button>',
}
afterEach(() => vi.restoreAllMocks())
function touch(element) {
  const event = new Event('touchstart')
  Object.defineProperty(event, 'touches', { value: [{ clientX: 12, clientY: 8 }] })
  element.dispatchEvent(event)
}
test('primary mouse creates a wave and document release cleans it', () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0, clientX: 12, clientY: 8 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    document.dispatchEvent(new MouseEvent('mouseup'))
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('non-primary and touch compatibility mouse events do not duplicate waves', () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 2 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    touch(wrapper.element)
    vi.advanceTimersByTime(60)
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    document.dispatchEvent(new Event('touchend'))
    vi.runAllTimers()
    vi.advanceTimersByTime(800)
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    window.dispatchEvent(new Event('blur'))
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('disabled and disposed mouse hosts cannot schedule work', async () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  const element = wrapper.element
  try {
    await wrapper.setData({ disabled: true })
    element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    await wrapper.setData({ disabled: false })
    element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    wrapper.unmount()
    element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.runAllTimers()
    expect(element.querySelector('.mp-ripple')).toBeNull()
    expect(element._ripple).toBeUndefined()
  } finally {
    vi.useRealTimers()
  }
})
