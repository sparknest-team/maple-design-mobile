import { describe, expect, it } from 'vitest'
import { getTextareaAutoSizeStyle } from '../utils'

const styles = {
  'font-size': '16px',
  'line-height': '20px',
  'border-width': '1px',
  'padding-top': '4px',
  'padding-bottom': '4px',
}

describe('Textarea auto size', () => {
  it('keeps the mirror height without row limits', () => {
    expect(getTextareaAutoSizeStyle(styles, 90)).toEqual({ height: '90px', overflow: 'hidden' })
  })

  it('applies minimum and maximum row limits', () => {
    expect(getTextareaAutoSizeStyle(styles, 20, { minRows: 2, maxRows: 4 })).toEqual({
      height: '50px',
      overflow: 'hidden',
    })
    expect(getTextareaAutoSizeStyle(styles, 120, { minRows: 2, maxRows: 4 })).toEqual({
      height: '90px',
      overflow: 'auto',
    })
  })
})
