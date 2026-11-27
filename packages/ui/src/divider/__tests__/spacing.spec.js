import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Divider from '../Divider.vue'
import { dividerProps } from '../props'

describe('divider orientation-relative spacing', () => {
  it('exposes inset and spacing with matching defaults and no axis prop aliases', () => {
    expect(dividerProps).toHaveProperty('inset')
    expect(dividerProps).toHaveProperty('spacing')
    expect(dividerProps).not.toHaveProperty('sizeX')
    expect(dividerProps).not.toHaveProperty('sizeY')
    const wrapper = mount(Divider)
    expect(wrapper.props('inset')).toBeUndefined()
    expect(wrapper.props('spacing')).toBe('md')
    expect(wrapper.classes()).toContain('mp-divider--spacing-md')
    wrapper.unmount()
  })

  it('applies lengths and switches back to presets without retaining custom styles', async () => {
    const wrapper = mount(Divider, { props: { inset: 0, spacing: ['1rem', 24] } })
    const style = wrapper.element.style
    expect(style.marginInlineStart).toBe('0px')
    expect(style.marginInlineEnd).toBe('0px')
    expect(style.marginBlockStart).toBe('1rem')
    expect(style.marginBlockEnd).toBe('24px')
    await wrapper.setProps({ inset: ['2rem'], spacing: 0 })
    expect(style.marginInlineStart).toBe('2rem')
    expect(style.marginInlineEnd).toBe('2rem')
    expect(style.marginBlockStart).toBe('0px')
    await wrapper.setProps({ inset: 'lg', spacing: 'xs' })
    expect(wrapper.classes()).toContain('mp-divider--inset-lg')
    expect(wrapper.classes()).toContain('mp-divider--spacing-xs')
    expect(style.maxWidth).toBe('')
    expect(style.marginInlineStart).toBe('')
    expect(style.marginBlockStart).toBe('')
    wrapper.unmount()
  })

  it('keeps vertical height tied to the along-line inset when outer spacing changes', async () => {
    const wrapper = mount(Divider, { props: { orientation: 'vertical', inset: [8, 24], spacing: [12, 20] } })
    const style = wrapper.element.style
    expect(style.maxHeight).toMatch(/^calc\(100% - (?:8px - 24px|32px)\)$/)
    expect(style.marginBlockStart).toBe('8px')
    expect(style.marginBlockEnd).toBe('24px')
    expect(style.marginInlineStart).toBe('12px')
    expect(style.marginInlineEnd).toBe('20px')
    await wrapper.setProps({ spacing: [16, 32] })
    expect(style.maxHeight).toMatch(/^calc\(100% - (?:8px - 24px|32px)\)$/)
    await wrapper.setProps({ orientation: 'horizontal' })
    expect(style.maxHeight).toBe('')
    expect(style.maxWidth).toMatch(/^calc\(100% - (?:8px - 24px|32px)\)$/)
    expect(style.marginBlockStart).toBe('16px')
    expect(style.marginBlockEnd).toBe('32px')
    wrapper.unmount()
  })
})
