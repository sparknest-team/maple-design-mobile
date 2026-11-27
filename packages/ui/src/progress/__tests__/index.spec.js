import { createApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Progress from '..'

describe('Progress complete contract', () => {
  test('installs and renders default text', () => {
    expect(createApp({}).use(Progress).component(Progress.name)).toBeTruthy()
    const wrapper = mount(Progress)
    expect(wrapper.text()).toBe('0%')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  test.each(['xs', 'sm', 'md', 'lg', 'xl', 12, '2rem'])('size %s applies to both modes', async (size) => {
    const wrapper = mount(Progress, { props: { size } })
    expect(wrapper.get('.mp-progress__track').attributes('style')).toContain('height:')
    await wrapper.setProps({ mode: 'circle' })
    expect(wrapper.get('.mp-progress__circle').attributes('style')).toContain('aspect-ratio: 1')
    wrapper.unmount()
  })
  test('stroke wins over custom line size and supports CSS strings', async () => {
    const wrapper = mount(Progress, { props: { size: 12, strokeWidth: 5 } })
    expect(wrapper.get('.mp-progress__track').attributes('style')).toContain('height: 5px')
    await wrapper.setProps({ strokeWidth: '0.5rem' })
    expect(wrapper.get('.mp-progress__track').attributes('style')).toContain('height: 0.5rem')
    wrapper.unmount()
  })
  test('all statuses and explicit completion status', async () => {
    const wrapper = mount(Progress, { props: { percent: 100 } })
    expect(wrapper.classes()).toContain('mp-progress--success')
    for (const status of ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']) {
      await wrapper.setProps({ status })
      expect(wrapper.classes()).toContain('mp-progress--' + status)
    }
    wrapper.unmount()
  })
  test.each(['line', 'circle'])('%s indeterminate omits value and never infers success', (mode) => {
    const wrapper = mount(Progress, { props: { mode, percent: 100, indeterminate: true } })
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.classes()).toContain('mp-progress--default')
    expect(wrapper.text()).toBe('…')
    wrapper.unmount()
  })
  test('line color, buffer, track and animation update reactively', async () => {
    const wrapper = mount(Progress, {
      props: { percent: 25, color: 'red', bufferColor: 'pink', trackColor: 'gray', animation: true },
    })
    expect(wrapper.get('.mp-progress__bar').attributes('style')).toContain('width: 25%')
    expect(wrapper.get('.mp-progress__bar').attributes('style')).toContain('background: red')
    expect(wrapper.get('.mp-progress__buffer').attributes('style')).toContain('background: pink')
    expect(wrapper.get('.mp-progress__bar').classes()).toContain('mp-progress__bar--animated')
    await wrapper.setProps({ track: false })
    expect(wrapper.find('.mp-progress__buffer').exists()).toBe(false)
    expect(wrapper.get('.mp-progress__track').element.style.background).toMatch(/^(transparent|none)$/)
    wrapper.unmount()
  })
  test('circle gradient reacts and IDs stay stable and unique', async () => {
    const wrapper = mount({
      render: () =>
        h('div', [
          h(Progress, { mode: 'circle', color: { '0%': 'red', '100%': 'blue' } }),
          h(Progress, { mode: 'circle', color: { '0%': 'red' } }),
        ]),
    })
    const ids = wrapper.findAll('linearGradient').map((node) => node.attributes('id'))
    expect(new Set(ids).size).toBe(2)
    wrapper.unmount()
    const circle = mount(Progress, { props: { mode: 'circle', color: 'red', percent: 12.5, rotate: 30 } })
    expect(circle.find('defs').exists()).toBe(false)
    await circle.setProps({ color: { '0%': 'red', '100%': 'blue' } })
    const id = circle.get('linearGradient').attributes('id')
    await circle.setProps({ color: { '20%': 'green' } })
    expect(circle.get('linearGradient').attributes('id')).toBe(id)
    expect(circle.findAll('stop')).toHaveLength(1)
    const bar = circle.get('.mp-progress__circle-bar')
    expect(Number(bar.attributes('stroke-dashoffset')) / Number(bar.attributes('stroke-dasharray'))).toBeCloseTo(0.875)
    expect(bar.attributes('style')).toContain('rotate(-60deg)')
    await circle.setProps({ color: 'blue', track: false })
    expect(circle.find('defs').exists()).toBe(false)
    expect(circle.find('.mp-progress__circle-track').exists()).toBe(false)
    circle.unmount()
  })
  test('segmented normalization and invalid counts', async () => {
    const wrapper = mount(Progress, { props: { steps: 4.9, percent: 50 } })
    expect(wrapper.findAll('.mp-progress__step')).toHaveLength(4)
    expect(wrapper.findAll('.mp-progress__step--active')).toHaveLength(2)
    await wrapper.setProps({ mode: 'circle' })
    expect(wrapper.find('.mp-progress__steps').exists()).toBe(false)
    for (const steps of [-1, NaN, Infinity, 0]) {
      await wrapper.setProps({ mode: 'line', steps })
      expect(wrapper.find('.mp-progress__track').exists()).toBe(true)
    }
    wrapper.unmount()
  })
  test('text slot precedes default slot and text class works', async () => {
    const wrapper = mount(Progress, {
      props: { percent: '12.5', textClass: 'custom' },
      slots: { text: ({ percent }) => 'text:' + percent, default: () => 'default' },
    })
    expect(wrapper.get('.custom').text()).toBe('text:12.5')
    await wrapper.setProps({ showText: false })
    expect(wrapper.find('.custom').exists()).toBe(false)
    wrapper.unmount()
  })
  test('ResizeObserver follows mode changes and cleans up', async () => {
    const originalObserver = globalThis.ResizeObserver
    const observe = vi.fn(),
      disconnect = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = observe
        disconnect = disconnect
      },
    )
    const wrapper = mount(Progress, { props: { mode: 'circle', size: '50%' } })
    await nextTick()
    expect(observe).toHaveBeenCalled()
    await wrapper.setProps({ mode: 'line' })
    expect(disconnect).toHaveBeenCalled()
    wrapper.unmount()
    globalThis.ResizeObserver = originalObserver
  })
  test('circle completion and danger icons preserve numeric ARIA and text override', () => {
    for (const status of ['success', 'danger']) {
      const wrapper = mount(Progress, { props: { mode: 'circle', status, percent: 80, size: 'xs' } })
      expect(wrapper.find('.mp-progress__status-icon').exists()).toBe(true)
      expect(wrapper.attributes('aria-valuenow')).toBe('80')
      wrapper.unmount()
    }
    const wrapper = mount(Progress, {
      props: { mode: 'circle', percent: 100 },
      slots: { text: ({ percent }) => 'Done: ' + percent },
    })
    expect(wrapper.find('.mp-progress__status-icon').exists()).toBe(false)
    expect(wrapper.text()).toBe('Done: 100')
    wrapper.unmount()
  })
  test('SSR is deterministic with gradient IDs and unknown lengths', async () => {
    const render = () =>
      renderToString(createApp({ render: () => h(Progress, { mode: 'circle', size: '50%', color: { '0%': 'red' } }) }))
    expect(await render()).toBe(await render())
  })
})
