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
test('a release on an adopted host clears the in-flight wave', () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  const other = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    other.body.appendChild(wrapper.element)
    wrapper.element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('adoption during a press clears the wave before a later outside release', async () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  const other = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    other.body.appendChild(wrapper.element)
    await Promise.resolve()
    other.dispatchEvent(new Event('mouseup'))
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('detaching an active ancestor cancels its wave before a later cross-document move', async () => {
  vi.useFakeTimers()
  const shell = document.createElement('div')
  document.body.append(shell)
  const wrapper = mount(Host, { attachTo: shell })
  const other = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    shell.remove()
    await Promise.resolve()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    expect(wrapper.element._ripple.migrationObserver).toBeUndefined()
    other.body.append(shell)
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    expect(wrapper.element._ripple.document).toBe(other)
  } finally {
    wrapper.unmount()
    shell.remove()
    vi.useRealTimers()
  }
})
test('same-turn reparenting within a document keeps the active wave', async () => {
  vi.useFakeTimers()
  const a = document.createElement('div'),
    b = document.createElement('div')
  document.body.append(a, b)
  const wrapper = mount(Host, { attachTo: a })
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    b.append(wrapper.element)
    await Promise.resolve()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
    vi.useRealTimers()
  }
})
test('adoption cancels a pending wave before it is created', async () => {
  vi.useFakeTimers()
  const wrapper = mount(Host, { attachTo: document.body })
  const other = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    other.body.appendChild(wrapper.element)
    await Promise.resolve()
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    expect(wrapper.element._ripple.document).toBe(other)
    expect(wrapper.element._ripple.migrationObserver).toBeUndefined()
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('the migration observer exists only during active ripple work', () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  try {
    expect(wrapper.element._ripple.migrationObserver).toBeUndefined()
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    expect(wrapper.element._ripple.migrationObserver).toBeTruthy()
    vi.advanceTimersByTime(60)
    document.dispatchEvent(new Event('mouseup'))
    vi.runAllTimers()
    expect(wrapper.element._ripple.migrationObserver).toBeUndefined()
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
test('an active host in a moved shadow tree is cancelled', async () => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const shell = document.createElement('div')
  document.body.append(shell)
  const target = document.createElement('div')
  shell.attachShadow({ mode: 'closed' }).append(target)
  const wrapper = mount(Host, { attachTo: target })
  const other = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    other.body.append(shell)
    await Promise.resolve()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    expect(wrapper.element._ripple.document).toBe(other)
  } finally {
    wrapper.unmount()
    shell.remove()
    vi.useRealTimers()
  }
})
test.each(['touchend', 'touchcancel'])('an adopted host clears its wave on %s', (type) => {
  vi.useFakeTimers()
  vi.spyOn(performance, 'now').mockImplementation(() => Date.now())
  const wrapper = mount(Host, { attachTo: document.body })
  const other = document.implementation.createHTMLDocument()
  try {
    touch(wrapper.element)
    vi.advanceTimersByTime(60)
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(1)
    other.body.appendChild(wrapper.element)
    wrapper.element.dispatchEvent(new Event(type, { bubbles: true }))
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
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
