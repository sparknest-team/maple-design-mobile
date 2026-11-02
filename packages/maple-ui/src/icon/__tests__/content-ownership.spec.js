import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Icon from '..'

const icons = {
  IconOne: { render: () => h('svg', { 'data-name': 'one' }) },
  IconTwo: { render: () => h('svg', { 'data-name': 'two' }) },
}

describe('Icon content ownership', () => {
  afterEach(() => vi.useRealTimers())

  it('does not animate unused name changes with a default slot', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Icon, {
      props: { name: 'one', transition: 200, spin: true },
      slots: { default: () => h('svg', { 'data-name': 'slot' }) },
    })
    const baselineTimers = vi.getTimerCount()
    try {
      await wrapper.setProps({ name: 'two' })
      expect(wrapper.classes().some((name) => name.endsWith('--shrinking'))).toBe(false)
      expect(wrapper.get('svg').attributes('data-name')).toBe('slot')
      expect(vi.getTimerCount()).toBe(baselineTimers)
    } finally {
      wrapper.unmount()
    }
  })

  it('cancels a pending transition when a slot takes over, then reveals the latest name', async () => {
    vi.useFakeTimers()
    const slotted = ref(false)
    const name = ref('one')
    const wrapper = mount(
      {
        render: () =>
          h(
            Icon,
            { name: name.value, transition: 200 },
            slotted.value ? { default: () => h('svg', { 'data-name': 'slot' }) } : undefined,
          ),
      },
      { global: { components: icons } },
    )
    const baselineTimers = vi.getTimerCount()
    try {
      name.value = 'two'
      await nextTick()
      expect(
        wrapper
          .getComponent(Icon)
          .classes()
          .some((name) => name.endsWith('--shrinking')),
      ).toBe(true)
      slotted.value = true
      await nextTick()
      expect(wrapper.get('svg').attributes('data-name')).toBe('slot')
      expect(vi.getTimerCount()).toBe(baselineTimers)
      name.value = 'one'
      await nextTick()
      name.value = 'two'
      await nextTick()
      slotted.value = false
      await nextTick()
      expect(wrapper.get('svg').attributes('data-name')).toBe('two')
      expect(
        wrapper
          .getComponent(Icon)
          .classes()
          .some((name) => name.endsWith('--shrinking')),
      ).toBe(false)
      expect(vi.getTimerCount()).toBe(baselineTimers)
    } finally {
      wrapper.unmount()
    }
  })

  it('keeps click.once as a notification even with an unresolved promise', async () => {
    const click = vi.fn(() => new Promise(() => {}))
    const wrapper = mount(Icon, { attrs: { onClickOnce: click } })
    try {
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      expect(click).toHaveBeenCalledTimes(1)
      expect(wrapper.attributes('aria-busy')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
})
