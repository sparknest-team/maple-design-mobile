import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Rate from '..'

describe('Rate preview ownership and zero gap', () => {
  test('a keyboard proposal clears hover preview, even when controlled parent refuses', async () => {
    for (const controlled of [false, true]) {
      const w = mount(Rate, {
        props: { editMode: 'direct', allowHalf: true, ...(controlled ? { modelValue: 1 } : { defaultValue: 1 }) },
      })
      const items = w.findAll('div').filter((item) => item.classes().some((name) => /-rate__content$/.test(name)))
      items[3].element.getBoundingClientRect = () => ({ left: 0, right: 20, width: 20 })
      await items[3].trigger('mousemove', { clientX: 19 })
      expect(w.findAll('[class*="rate__content-full"]').length).toBe(4)
      await w.trigger('keydown', { key: 'ArrowRight' })
      expect(w.attributes('aria-valuenow')).toBe(controlled ? '1' : '1.5')
      expect(w.findAll('[class*="rate__content-full"]').length).toBe(1)
      expect(w.findAll('[class*="rate__content-half"]').length).toBe(controlled ? 0 : 1)
      expect(w.emitted('hover-change')).toEqual([[4], [0]])
      expect(w.emitted('change')).toEqual([[1.5]])
      await items[3].trigger('mousemove', { clientX: 19 })
      expect(w.findAll('[class*="rate__content-full"]').length).toBe(4)
      w.unmount()
    }
  })
  test.each([0, '0', '0px', '0rem'])('allows gap %s while size zero keeps token default', (gap) => {
    const w = mount(Rate, { props: { editMode: 'direct', gap, size: 0 } })
    const item = w.find('[class*="rate__content"]')
    expect(item.element.style.marginInlineEnd).toBe(gap === '0rem' ? '0rem' : '0px')
    expect(w.element.style.fontSize).toBe('')
    w.unmount()
  })
})
