import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Icon from '..'

test.each([false, true])('Icon respects live reduced motion, initially %s', async (initial) => {
  vi.useFakeTimers()
  const view = document.defaultView
  const original = view.matchMedia
  let listener
  const remove = vi.fn()
  const media = {
    matches: initial,
    addEventListener: vi.fn((_, fn) => {
      listener = fn
    }),
    removeEventListener: remove,
  }
  view.matchMedia = vi.fn(() => media)
  let wrapper
  try {
    wrapper = mount(Icon, {
      props: { name: 'one', transition: 200 },
      global: {
        components: {
          IconOne: { render: () => h('svg', { 'data-icon': 'one' }) },
          IconTwo: { render: () => h('svg', { 'data-icon': 'two' }) },
        },
      },
    })
    await nextTick()
    // Vue devtools may schedule its own bootstrap timer on the first mount.
    const baselineTimers = vi.getTimerCount()
    await wrapper.setProps({ name: 'two' })
    expect(wrapper.find('svg').attributes('data-icon')).toBe(initial ? 'two' : 'one')
    if (!initial) {
      media.matches = true
      listener()
      await nextTick()
      expect(wrapper.find('svg').attributes('data-icon')).toBe('two')
    }
    expect(vi.getTimerCount()).toBe(baselineTimers)
    media.matches = false
    listener()
    await nextTick()
    await wrapper.setProps({ name: 'one' })
    vi.advanceTimersByTime(200)
    await nextTick()
    expect(wrapper.find('svg').attributes('data-icon')).toBe('one')
    wrapper.unmount()
    wrapper = undefined
    expect(remove).toHaveBeenCalledWith('change', listener)
    expect(vi.getTimerCount()).toBe(baselineTimers)
  } finally {
    wrapper?.unmount()
    view.matchMedia = original
    vi.useRealTimers()
  }
})
