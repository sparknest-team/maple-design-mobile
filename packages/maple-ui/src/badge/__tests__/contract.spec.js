import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
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
