import { h, nextTick, ref, withDirectives } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { vLoading } from '../../loading'
import Card from '../Card.vue'
import { cardProps } from '../props'

describe('Card shared contract', () => {
  test('independent instances and supported presets', async () => {
    const a = mount(Card, { props: { title: 'first', size: 'sm', variant: 'outline', direction: 'row' } })
    const b = mount(Card, { props: { title: 'second' } })
    expect(a.classes()).toContain('mp-card--size-sm')
    expect(a.classes()).toContain('mp-card--variant-outline')
    expect(a.classes()).toContain('mp-card--direction-row')
    await a.setProps({ title: 'changed' })
    expect(b.text()).toContain('second')
    expect(b.text()).not.toContain('changed')
    a.unmount()
    b.unmount()
  })
  test('cover wins over src; body, footer and click stay available', async () => {
    const wrapper = mount(Card, {
      props: { src: '/unused.png' },
      slots: { cover: 'cover', footer: 'footer', default: 'body' },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('cover')
    expect(wrapper.text()).toContain('footer')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.text()).toContain('body')
    expect(cardProps).not.toHaveProperty('loading')
    expect(wrapper.attributes('aria-busy')).toBeUndefined()
    wrapper.unmount()
  })
  test('composes with the loading directive without replacing content', async () => {
    const busy = ref(true)
    const onClick = vi.fn()
    const wrapper = mount({
      setup: () => () =>
        withDirectives(h(Card, { onClick }, { default: () => h('input', { value: 'retained' }) }), [
          [vLoading, busy.value],
        ]),
    })
    const input = wrapper.find('input').element
    expect(wrapper.find('.mp-loading-directive').exists()).toBe(true)
    const overlayClick = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.find('.mp-loading').element.dispatchEvent(overlayClick)
    expect(overlayClick.defaultPrevented).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
    busy.value = false
    await nextTick()
    expect(wrapper.find('.mp-loading-directive').exists()).toBe(false)
    expect(wrapper.find('input').element).toBe(input)
    await wrapper.find('input').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('does not schedule floating work after unmount', async () => {
    await nextTick()
    const spy = vi.spyOn(globalThis, 'setTimeout')
    try {
      const wrapper = mount(Card, { props: { floating: true, ripple: true } })
      wrapper.unmount()
      await nextTick()
      expect(spy.mock.calls.some(([, delay]) => delay === 500)).toBe(false)
    } finally {
      spy.mockRestore()
    }
  })
  test('cancels its own scheduled floating timer', async () => {
    const schedule = vi.spyOn(globalThis, 'setTimeout')
    const cancel = vi.spyOn(globalThis, 'clearTimeout')
    const wrapper = mount(Card, { props: { floating: true, ripple: true } })
    try {
      await nextTick()
      const index = schedule.mock.calls.findIndex(([, delay]) => delay === 500)
      expect(index).toBeGreaterThanOrEqual(0)
      const timer = schedule.mock.results[index].value
      wrapper.unmount()
      expect(cancel).toHaveBeenCalledWith(timer)
    } finally {
      wrapper.unmount()
      schedule.mockRestore()
      cancel.mockRestore()
    }
  })
})
