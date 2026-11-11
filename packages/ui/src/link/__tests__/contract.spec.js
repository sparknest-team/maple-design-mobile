import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Link from '..'
import LoadingDemo from '../example/demos/loading.vue'

const globals = { components: { MpLink: Link, MpSpace: { template: '<div><slot /></div>' } } }

describe('Link semantics and controlled download', () => {
  afterEach(() => vi.useRealTimers())

  it.each(['disabled', 'loading'])(
    'retains the role and blocks once during %s, then restores native navigation',
    async (state) => {
      const once = vi.fn()
      const wrapper = mount(Link, {
        props: { href: '#report', target: '_self', rel: 'help', [state]: true },
        attrs: { onClickOnce: once },
      })
      try {
        expect(wrapper.attributes()).toMatchObject({ role: 'link', 'aria-disabled': 'true', tabindex: '-1' })
        expect(wrapper.attributes('href')).toBeUndefined()
        const event = new MouseEvent('click', { cancelable: true })
        wrapper.element.dispatchEvent(event)
        expect(event.defaultPrevented).toBe(true)
        expect(once).not.toHaveBeenCalled()
        await wrapper.setProps({ [state]: false })
        expect(wrapper.attributes('role')).toBeUndefined()
        expect(wrapper.attributes()).toMatchObject({ href: '#report', target: '_self', rel: 'help' })
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        expect(once).toHaveBeenCalledTimes(1)
      } finally {
        wrapper.unmount()
      }
    },
  )

  it('preserves empty href links but does not invent a role for placeholders', async () => {
    const wrapper = mount(Link, { props: { disabled: true } })
    try {
      expect(wrapper.attributes('role')).toBeUndefined()
      await wrapper.setProps({ href: '' })
      expect(wrapper.attributes('role')).toBe('link')
    } finally {
      wrapper.unmount()
    }
  })

  it('prepares a real download destination under business-controlled loading', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LoadingDemo, { global: globals })
    try {
      const link = wrapper.findAll('a')[1]
      expect(link.attributes('href')).toContain('data:text/plain')
      expect(link.attributes('download')).toBe('report.txt')
      const event = new MouseEvent('click', { cancelable: true })
      link.element.dispatchEvent(event)
      await nextTick()
      expect(event.defaultPrevented).toBe(true)
      expect(link.attributes('aria-busy')).toBe('true')
      expect(link.attributes('role')).toBe('link')
      vi.advanceTimersByTime(1000)
      await nextTick()
      expect(link.text()).toBe('下载示例报告')
      expect(link.attributes('aria-busy')).toBeUndefined()
      expect(link.attributes('href')).toContain('data:text/plain')
    } finally {
      wrapper.unmount()
    }
  })

  it('cancels pending demo preparation on unmount', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LoadingDemo, { global: globals })
    const baseline = vi.getTimerCount()
    await wrapper.findAll('a')[1].trigger('click')
    expect(vi.getTimerCount()).toBe(baseline + 1)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(baseline)
  })
})
