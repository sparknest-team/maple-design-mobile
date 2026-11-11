import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Badge from '../Badge.vue'

describe('Badge aligned contract', () => {
  test('defaults to danger and isolates instances', async () => {
    const first = mount(Badge, { props: { content: 1 } })
    const second = mount(Badge, { props: { content: 2 } })
    expect(first.classes()).toContain('mp-badge--status-danger')
    await first.setProps({ content: 8, status: 'success' })
    expect(second.get('.mp-badge__content').text()).toBe('2')
    expect(second.classes()).toContain('mp-badge--status-danger')
    first.unmount()
    second.unmount()
  })

  test.each(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left', 'right'])(
    'supports physical position %s in RTL',
    (position) => {
      const wrapper = mount(Badge, {
        props: { content: 1, position },
        attrs: { dir: 'rtl' },
        slots: { default: 'anchor' },
      })
      expect(wrapper.classes()).toContain('mp-badge--position-' + position)
      expect(wrapper.attributes('dir')).toBe('rtl')
      wrapper.unmount()
    },
  )

  test('offsets custom content and colors outlines', () => {
    const custom = mount(Badge, {
      props: { position: 'left', offsetX: 4, offsetY: 6 },
      slots: { default: 'anchor', content: 'custom' },
    })
    expect(custom.get('.mp-badge__content-wrapper').attributes('style')).toContain('margin-left: 4px')
    expect(custom.get('.mp-badge__content-wrapper').attributes('style')).toContain('margin-top: 6px')
    const outline = mount(Badge, { props: { content: 1, variant: 'outline', color: 'red' } })
    const style = outline.get('.mp-badge__content').attributes('style')
    expect(style).toContain('border-color: red')
    expect(style).toContain('color: red')
    // The outline background remains controlled by its public CSS variable.
    expect(outline.get('.mp-badge__content').element.style.backgroundColor).toBe('')
    custom.unmount()
    outline.unmount()
  })
})

test('normalizes invalid numbers while preserving zero and string contracts', async () => {
  const warnings = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(Badge, { props: { content: 120, max: 0 } })
  const value = () => wrapper.find('.mp-badge__content')
  expect(value().text()).toBe('120')
  await wrapper.setProps({ max: -1 })
  expect(value().text()).toBe('99+')
  await wrapper.setProps({ max: Infinity })
  expect(value().text()).toBe('99+')
  await wrapper.setProps({ content: 0, dot: true, showZero: false })
  expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(false)
  await wrapper.setProps({ showZero: true })
  expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(true)
  await wrapper.setProps({ content: -1, showZero: true })
  expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(false)
  await wrapper.setProps({ content: NaN })
  expect(wrapper.find('.mp-badge__dot-content').exists()).toBe(false)
  await wrapper.setProps({ content: '0', dot: false, showZero: false })
  expect(value().text()).toBe('0')
  expect(warnings).toHaveBeenCalled()
  wrapper.unmount()
  warnings.mockRestore()
})

test('keeps custom content gated by zero and supports finite negative offsets', async () => {
  const warnings = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const hidden = mount(Badge, { props: { content: 0 }, slots: { content: 'Custom', default: 'Host' } })
  expect(hidden.find('.mp-badge__content-wrapper').exists()).toBe(false)
  const shown = mount(Badge, {
    props: { content: 0, showZero: true, offsetX: -3, offsetY: -4 },
    slots: { content: 'Custom', default: 'Host' },
  })
  expect(shown.get('.mp-badge__content-wrapper').text()).toBe('Custom')
  expect(shown.get('.mp-badge__content-wrapper').attributes('style')).toContain('-3px')
  expect(shown.get('.mp-badge__content-wrapper').attributes('style')).toContain('-4px')
  await shown.setProps({ offsetX: Infinity, offsetY: -Infinity })
  expect(shown.get('.mp-badge__content-wrapper').attributes('style') || '').not.toContain('Infinity')
  expect(warnings).toHaveBeenCalled()
  hidden.unmount()
  shown.unmount()
  warnings.mockRestore()
})
