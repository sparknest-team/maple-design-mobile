import { createApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ProgressGroup from '..'

describe('ProgressGroup complete contract', () => {
  const items = [
    { label: 'A', value: 70 },
    { label: 'B', value: 50, color: 'red' },
    { label: 'C', value: 10 },
  ]
  test('text API and normalized values', () => {
    const wrapper = mount(ProgressGroup, { props: { items, showText: true, ariaLabel: 'Capacity' } })
    expect(wrapper.attributes('aria-label')).toBe('Capacity')
    expect(wrapper.get('.mp-progress-group__status').text()).toBe('100%')
    expect(wrapper.findAll('.mp-progress-group__segment').map((node) => node.attributes('style'))).toEqual(
      expect.arrayContaining([
        expect.stringContaining('width: 70%'),
        expect.stringContaining('width: 30%'),
        expect.stringContaining('width: 0%'),
      ]),
    )
    expect(wrapper.findAll('.mp-progress-group__value').map((node) => node.text())).toEqual(['70%', '50%', '10%'])
    wrapper.unmount()
  })
  test.each(['line', 'circle'])('%s focus, hover, escape and blur', async (mode) => {
    const wrapper = mount(ProgressGroup, { props: { items, mode } })
    const segments = wrapper.findAll('[role="progressbar"]')
    await segments[1].trigger('focus')
    const tip = wrapper.get('[role="tooltip"]')
    expect(tip.text()).toBe('B: 50 (50%)')
    expect(segments[1].attributes('aria-describedby')).toBe(tip.attributes('id'))
    await segments[1].trigger('mouseenter')
    await segments[1].trigger('mouseleave')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
    await segments[1].trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    await segments[1].trigger('blur')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    expect(segments[2].attributes('tabindex')).toBeUndefined()
    await wrapper.setProps({ tooltip: false })
    expect(wrapper.findAll('[tabindex]')).toHaveLength(0)
    wrapper.unmount()
  })
  test('numeric edge cases never produce NaN or Infinity', () => {
    const wrapper = mount(ProgressGroup, {
      props: {
        mode: 'circle',
        showText: true,
        max: Infinity,
        circleSize: -1,
        strokeWidth: Infinity,
        items: [{ value: Infinity }, { value: NaN }, { value: -1 }],
      },
    })
    expect(wrapper.text()).toBe('0%')
    expect(wrapper.html()).not.toMatch(/NaN|Infinity/)
    expect(wrapper.get('.mp-progress-group__circle').attributes('style')).toContain('width: 120px')
    wrapper.unmount()
  })
  test('text and named item slots retain logical values', () => {
    const wrapper = mount(ProgressGroup, {
      props: { items: [{ label: 'A', value: 25, slot: 'custom' }] },
      slots: { text: ({ value }) => 'total:' + value, custom: ({ item }) => 'item:' + item.value },
    })
    expect(wrapper.text()).toContain('total:25')
    expect(wrapper.text()).toContain('item:25')
    wrapper.unmount()
  })
  test('vertical geometry and reactive data', async () => {
    const wrapper = mount(ProgressGroup, { props: { items, orientation: 'vertical' } })
    await wrapper.get('.mp-progress-group__segment').trigger('focus')
    expect(wrapper.get('.mp-progress-group__tooltip').attributes('style')).toContain('top: 35%')
    await wrapper.setProps({ items: [] })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    wrapper.unmount()
  })
  test('SSR is safe and deterministic', async () => {
    const render = () =>
      renderToString(createApp({ render: () => h(ProgressGroup, { items, mode: 'circle', showText: true }) }))
    expect(await render()).toBe(await render())
  })
})
