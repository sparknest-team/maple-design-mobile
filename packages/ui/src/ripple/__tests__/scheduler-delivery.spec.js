import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import context from '../../context'
import Ripple from '../index'

const Wrapper = {
  directives: { Ripple },
  data: () => ({ disabled: false }),
  template: '<button v-ripple="{ disabled }">Ripple</button>',
}
const wrappers = []
let tasks, seed, now
const key = (element) => element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
const create = () => {
  const wrapper = mount(Wrapper, { attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}
const invoke = (task) => task.callback()
beforeEach(() => {
  tasks = []
  seed = 100000
  now = 1000
  vi.spyOn(performance, 'now').mockImplementation(() => now)
  const original = window.setTimeout.bind(window)
  vi.spyOn(window, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    if (typeof callback === 'function' && (delay === 30 || delay === 20 || delay === 250)) {
      const task = { callback, delay, id: seed++ }
      tasks.push(task)
      return task.id
    }
    return original(callback, delay, ...args)
  })
})
afterEach(() => {
  wrappers
    .splice(0)
    .reverse()
    .forEach((wrapper) => wrapper.unmount())
  vi.restoreAllMocks()
})

describe('Ripple cancelled and consumed scheduler delivery', () => {
  test('global disable during geometry releases the migration observer', () => {
    const wrapper = create(),
      element = wrapper.element,
      enabled = context.enableRipple
    try {
      key(element)
      vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
        context.enableRipple = false
        return { top: 0, left: 0, width: 10, height: 10 }
      })
      invoke(tasks.find((task) => task.delay === 30))
      expect(element.children).toHaveLength(0)
      expect(element._ripple.migrationObserver).toBeUndefined()
    } finally {
      context.enableRipple = enabled
    }
  })
  test('global disable during style lookup restores styles and releases the observer', () => {
    const wrapper = create(),
      element = wrapper.element,
      enabled = context.enableRipple
    try {
      key(element)
      const original = element.style.setProperty.bind(element.style)
      vi.spyOn(element.style, 'setProperty').mockImplementation((...args) => {
        original(...args)
        context.enableRipple = false
      })
      invoke(tasks.find((task) => task.delay === 30))
      expect(element.children).toHaveLength(0)
      expect(element.style.overflowX).toBe('')
      expect(element._ripple.migrationObserver).toBeUndefined()
    } finally {
      context.enableRipple = enabled
    }
  })
  test('global disable before activation removes the wave and observer', () => {
    const wrapper = create(),
      element = wrapper.element,
      enabled = context.enableRipple
    try {
      key(element)
      invoke(tasks.find((task) => task.delay === 30))
      expect(element.children).toHaveLength(1)
      context.enableRipple = false
      invoke(tasks.find((task) => task.delay === 20))
      expect(element.children).toHaveLength(0)
      expect(element._ripple.migrationObserver).toBeUndefined()
    } finally {
      context.enableRipple = enabled
    }
  })
  test('disabled pending creation rejects a dequeued callback', async () => {
    const wrapper = create()
    key(wrapper.element)
    const old = tasks.find((task) => task.delay === 30)
    expect(old).toBeDefined()
    await wrapper.setData({ disabled: true })
    invoke(old)
    expect(wrapper.element.children).toHaveLength(0)
    expect(wrapper.element._ripple.timers.size).toBe(0)
  })
  test('cancelled creation cannot clear a fresh request after re-enable', async () => {
    const wrapper = create()
    key(wrapper.element)
    const old = tasks.find((task) => task.delay === 30)
    await wrapper.setData({ disabled: true })
    await wrapper.setData({ disabled: false })
    key(wrapper.element)
    const fresh = tasks.filter((task) => task.delay === 30).pop()
    expect(fresh.id).not.toBe(old.id)
    invoke(old)
    expect(wrapper.element.children).toHaveLength(0)
    expect(wrapper.element._ripple.tasker).toBe(fresh.id)
    invoke(fresh)
    expect(wrapper.element.children).toHaveLength(1)
  })
  test('creation callback is consumed once', () => {
    const wrapper = create()
    key(wrapper.element)
    const creation = tasks.find((task) => task.delay === 30)
    invoke(creation)
    invoke(creation)
    expect(wrapper.element.children).toHaveLength(1)
    expect(tasks.filter((task) => task.delay === 20)).toHaveLength(1)
  })
  test('activation callback is consumed once', () => {
    const wrapper = create()
    key(wrapper.element)
    invoke(tasks.find((task) => task.delay === 30))
    const activation = tasks.find((task) => task.delay === 20)
    const view = wrapper.element.ownerDocument.defaultView
    const style = vi.spyOn(view, 'getComputedStyle')
    invoke(activation)
    invoke(activation)
    expect(style).toHaveBeenCalledTimes(1)
  })
  test('geometry disposal does not append a wave to the detached host', () => {
    const wrapper = create(),
      element = wrapper.element
    key(element)
    vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => {
      wrapper.unmount()
      return { top: 0, left: 0, width: 10, height: 10 }
    })
    invoke(tasks.find((task) => task.delay === 30))
    expect(element.children).toHaveLength(0)
    expect(element._ripple).toBeUndefined()
  })
  test('style lookup disposal removes the newly appended wave', () => {
    const wrapper = create(),
      element = wrapper.element
    key(element)
    const view = element.ownerDocument.defaultView,
      original = view.getComputedStyle.bind(view)
    vi.spyOn(view, 'getComputedStyle').mockImplementation((target) => {
      if (target.parentElement === element) {
        wrapper.unmount()
        return { transitionProperty: 'none', transitionDuration: '0s', transitionDelay: '0s' }
      }
      return original(target)
    })
    invoke(tasks.find((task) => task.delay === 30))
    expect(element.children).toHaveLength(0)
    expect(element._ripple).toBeUndefined()
  })
  test('ordinary creation and activation preserve the current wave', () => {
    const wrapper = create()
    key(wrapper.element)
    invoke(tasks.find((task) => task.delay === 30))
    invoke(tasks.find((task) => task.delay === 20))
    expect(wrapper.element.children).toHaveLength(1)
    expect(wrapper.element.firstElementChild.style.opacity).toBe('0.25')
    expect(wrapper.element._ripple.timers.size).toBe(0)
  })
  test('unmounted pending creation already rejects its old callback', () => {
    const wrapper = create(),
      element = wrapper.element
    key(element)
    const old = tasks.find((task) => task.delay === 30)
    wrapper.unmount()
    invoke(old)
    expect(element.children).toHaveLength(0)
    expect(element._ripple).toBeUndefined()
  })
  test('a cancelled fade cannot schedule cleanup into a re-enabled instance', async () => {
    const wrapper = create()
    key(wrapper.element)
    invoke(tasks.find((task) => task.delay === 30))
    invoke(tasks.find((task) => task.delay === 20))
    wrapper.element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))
    const fade = tasks.find((task) => task.delay === 250)
    expect(fade).toBeDefined()
    await wrapper.setData({ disabled: true })
    await wrapper.setData({ disabled: false })
    key(wrapper.element)
    now = 1250
    invoke(fade)
    expect(wrapper.element.children).toHaveLength(0)
    expect(wrapper.element._ripple.timers.size).toBe(1)
  })
  test('a fade callback schedules removal once', () => {
    const wrapper = create()
    key(wrapper.element)
    invoke(tasks.find((task) => task.delay === 30))
    invoke(tasks.find((task) => task.delay === 20))
    wrapper.element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))
    const fade = tasks.find((task) => task.delay === 250)
    now = 1250
    invoke(fade)
    invoke(fade)
    expect(tasks.filter((task) => task.delay === 250)).toHaveLength(2)
    expect(wrapper.element._ripple.timers.size).toBe(1)
  })
  test('activation style disposal does not write opacity after cleanup', () => {
    const wrapper = create(),
      element = wrapper.element
    key(element)
    invoke(tasks.find((task) => task.delay === 30))
    const wave = element.firstElementChild,
      view = element.ownerDocument.defaultView
    const original = view.getComputedStyle.bind(view)
    vi.spyOn(view, 'getComputedStyle').mockImplementation((target) => {
      if (target === wave) {
        wrapper.unmount()
        return { transitionProperty: 'none', transitionDuration: '0s', transitionDelay: '0s' }
      }
      return original(target)
    })
    invoke(tasks.find((task) => task.delay === 20))
    expect(element.children).toHaveLength(0)
    expect(wave.style.opacity).toBe('0')
  })
})
