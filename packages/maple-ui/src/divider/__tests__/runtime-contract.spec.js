import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Divider, { Divider as NamedDivider } from '../index'
import { dividerProps, isValidDividerOpacity, isValidDividerSize, isValidDividerThickness } from '../props'

const width = '--mp-divider-border-width'
const wrappers = []
const render = (props) => {
  const w = mount(Divider, { props })
  wrappers.push(w)
  return w
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})

describe('Divider runtime contract', () => {
  it.each(['horizontal', 'vertical'])(
    'keeps minimum width when %s and restores theme for invalid widths',
    async (orientation) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      const w = render({ orientation, thickness: 4, description: 'Section' })
      expect(w.element.style.getPropertyValue(width)).toBe('4px')
      await w.setProps({ thickness: 1 })
      expect(w.element.style.getPropertyValue(width)).toBe('1px')
      expect(w.text()).toBe('Section')
      for (const thickness of [0, 0.5, -1, NaN, Infinity, -Infinity]) {
        await w.setProps({ thickness })
        expect(w.element.style.getPropertyValue(width)).toBe('')
      }
      expect(console.warn).toHaveBeenCalled()
    },
  )
  it('accepts only finite thickness values at least one', () => {
    for (const value of [1, 1.5, 4]) {
      expect(isValidDividerThickness(value)).toBe(true)
    }
    for (const value of [0, 0.5, -1, NaN, Infinity, -Infinity, '1', null]) {
      expect(isValidDividerThickness(value)).toBe(false)
    }
    expect(dividerProps.thickness.validator(-1)).toBe(false)
  })
  it('retains hairline priority over explicit thickness', async () => {
    const w = render({ thickness: 1, hairline: true })
    expect(w.element.style.getPropertyValue(width)).toBe('')
    await w.setProps({ hairline: false })
    expect(w.element.style.getPropertyValue(width)).toBe('1px')
    await w.setProps({ hairline: true, thickness: 4 })
    expect(w.element.style.getPropertyValue(width)).toBe('')
  })
  it('validates opacity and removes invalid overrides', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = render({ opacity: 0 })
    expect(w.element.style.opacity).toBe('0')
    for (const opacity of [-0.1, 1.1, NaN, Infinity]) {
      expect(isValidDividerOpacity(opacity)).toBe(false)
      await w.setProps({ opacity })
      expect(w.element.style.opacity).toBe('')
    }
    await w.setProps({ opacity: 0.5 })
    expect(w.element.style.opacity).toBe('0.5')
    expect(isValidDividerOpacity(1)).toBe(true)
  })
  it('accepts one/two length pairs and finite negative margins', () => {
    for (const value of ['md', 0, -8, ' 12 ', 'calc(1rem + 2px)', 'var(--gap)', [-8], [0, '2rem']]) {
      expect(isValidDividerSize(value)).toBe(true)
    }
    const w = render({ inset: [' 8 ', '2rem'], spacing: [-4] })
    expect(w.element.style.marginInlineStart).toBe('8px')
    expect(w.element.style.marginInlineEnd).toBe('2rem')
    expect(w.element.style.marginBlockStart).toBe('-4px')
    expect(w.element.style.marginBlockEnd).toBe('-4px')
  })
  it('rejects malformed pairs and falls back independently for inset/spacing', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = render({ inset: 8, spacing: 4 })
    for (const value of [[], Array(1), [8, 12, 16], ['sm'], [8, ''], [8, Infinity], NaN, Infinity, 'Infinity', '']) {
      expect(isValidDividerSize(value)).toBe(false)
      await w.setProps({ inset: value, spacing: value })
      expect(w.element.style.marginInlineStart).toBe('')
      expect(w.element.style.marginBlockStart).toBe('')
      expect(w.element.style.maxWidth).toBe('')
      expect(w.classes()).toContain('mp-divider--spacing-md')
      expect(w.attributes('style') ?? '').not.toContain('undefined')
    }
    expect(console.warn).toHaveBeenCalled()
  })
  it('normalizes trimmed presets and clears custom styles', async () => {
    const w = render({ inset: 8, spacing: [4, 8] })
    await w.setProps({ inset: ' sm ', spacing: ' md ' })
    expect(w.classes()).toContain('mp-divider--inset-sm')
    expect(w.classes()).toContain('mp-divider--spacing-md')
    expect(w.element.style.marginInlineStart).toBe('')
    expect(w.element.style.marginBlockStart).toBe('')
  })
  it('diagnoses invalid enums and renders semantic defaults', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    for (const [name, valid, invalid] of [
      ['orientation', 'vertical', 'row'],
      ['textAlign', 'start', 'left'],
      ['type', 'double', 'groove'],
    ]) {
      expect(dividerProps[name].validator(valid)).toBe(true)
      expect(dividerProps[name].validator(invalid)).toBe(false)
    }
    const w = render({ orientation: 'row', textAlign: 'left', type: 'groove' })
    expect(w.attributes('aria-orientation')).toBe('horizontal')
    expect(w.classes()).toContain('mp-divider--text-align-center')
    expect(w.classes()).toContain('mp-divider--type-solid')
    expect(console.warn).toHaveBeenCalled()
  })
  it('exposes the same component through named/default subpath imports', () => {
    expect(NamedDivider).toBe(Divider)
  })
})
