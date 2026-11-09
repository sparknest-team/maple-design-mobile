import { describe, expect, it } from 'vitest'
import { getSizeStyles, getTextareaAutoSizeStyle } from '../utils'

const styles = {
  'box-sizing': 'border-box',
  'font-size': '16px',
  'line-height': '20px',
  'border-top-width': '1px',
  'border-bottom-width': '3px',
  'padding-top': '4px',
  'padding-bottom': '4px',
}

describe('Textarea auto-size CSS box conversion', () => {
  it('keeps measured border-box height when no row limit is supplied', () => {
    expect(getTextareaAutoSizeStyle(styles, 90)).toEqual({ height: '90px', overflow: 'hidden' })
  })
  it('subtracts padding and both border widths for a content-box CSS height', () => {
    expect(getTextareaAutoSizeStyle({ ...styles, 'box-sizing': 'content-box' }, 90)).toEqual({
      height: '78px',
      overflow: 'hidden',
    })
  })
  for (const box of ['border-box', 'content-box']) {
    it(`clamps the minimum and maximum in ${box} CSS units`, () => {
      const own = { ...styles, 'box-sizing': box }
      const min = box === 'border-box' ? '52px' : '40px'
      const max = box === 'border-box' ? '92px' : '80px'
      expect(getTextareaAutoSizeStyle(own, 20, { minRows: 2, maxRows: 4 })).toEqual({
        height: min,
        minHeight: min,
        overflow: 'hidden',
      })
      expect(getTextareaAutoSizeStyle(own, 140, { minRows: 2, maxRows: 4 })).toEqual({
        height: max,
        minHeight: min,
        overflow: 'auto',
      })
    })
    it(`a max-only limit releases the theme minimum for ${box}`, () => {
      const own = { ...styles, 'box-sizing': box }
      expect(getTextareaAutoSizeStyle(own, 120, { maxRows: 1 })).toEqual({
        height: box === 'border-box' ? '32px' : '20px',
        minHeight: '0px',
        overflow: 'auto',
      })
    })
  }
  it('copies each border width and style so the mirror measures the native wrapping box', () => {
    const input = document.createElement('textarea')
    input.style.cssText =
      'border-style:solid dashed dotted double;border-width:1px 2px 3px 4px;box-sizing:content-box;padding:4px'
    document.body.append(input)
    const copied = getSizeStyles(getComputedStyle(input))
    expect(copied['border-top-width']).toBe('1px')
    expect(copied['border-right-width']).toBe('2px')
    expect(copied['border-bottom-width']).toBe('3px')
    expect(copied['border-left-width']).toBe('4px')
    expect(copied['border-top-style']).toBe('solid')
    expect(copied['border-bottom-style']).toBe('dotted')
    expect(copied['box-sizing']).toBe('content-box')
    input.remove()
  })
})
