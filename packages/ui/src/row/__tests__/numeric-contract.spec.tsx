import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Col from '../../col/Col.vue'
import { colProps } from '../../col/props'
import { rowProps } from '../props'
import Row from '../Row.vue'

describe('row and col numeric and diagnostic contracts', () => {
  it('defaults both axes to 16px and keeps explicit gutters and plain mode independent', async () => {
    const wrapper = mount(Row, {
      slots: {
        default: () => (
          <>
            <Col />
            <Row gutter={0}>
              <Col />
            </Row>
          </>
        ),
      },
    })
    const col = wrapper.findComponent(Col)
    expect(col.element.style.paddingLeft).toBe('8px')
    expect(col.element.style.paddingTop).toBe('8px')
    expect(wrapper.findAllComponents(Col)[1].element.style.paddingLeft).toBe('')
    await wrapper.setProps({ gutter: 0 })
    expect(col.element.style.paddingLeft).toBe('')
    expect(col.element.style.paddingTop).toBe('')
    await wrapper.setProps({ gutter: [24, 8] })
    expect(col.element.style.paddingLeft).toBe('12px')
    expect(col.element.style.paddingTop).toBe('4px')
    await wrapper.setProps({ div: true })
    expect(col.element.style.paddingLeft).toBe('')
    expect(col.element.style.paddingTop).toBe('')
    wrapper.unmount()
  })

  it('validates integer column counts and finite signed order values', () => {
    for (const value of [0, 12, 24]) {
      expect(colProps.span.validator!(value)).toBe(true)
      expect(colProps.offset.validator!(value)).toBe(true)
    }
    for (const value of [-1, 25, 0.5, NaN, Infinity]) {
      expect(colProps.span.validator!(value)).toBe(false)
      expect(colProps.offset.validator!(value)).toBe(false)
    }
    for (const value of [-100, -1, 0, 100]) {
      expect(colProps.order.validator!(value)).toBe(true)
    }
    for (const value of [0.5, NaN, Infinity]) {
      expect(colProps.order.validator!(value)).toBe(false)
    }
  })
  it('validates breakpoint descriptor keys and values', () => {
    expect(colProps.sm.validator!({ span: 0, offset: 24, order: -1 })).toBe(true)
    for (const value of [null, [], { spans: 12 }, { span: 25 }, { order: 1.5 }]) {
      expect(colProps.sm.validator!(value)).toBe(false)
    }
  })
  it('validates responsive gutter tuples, finite distances and alignment enums', () => {
    expect(rowProps.gutter.validator!([{ xs: 0, md: 24 }, 8])).toBe(true)
    for (const value of [null, [12], [12, 4, 2], -1, Infinity, { medium: 12 }, { md: NaN }]) {
      expect(rowProps.gutter.validator!(value)).toBe(false)
    }
    expect(rowProps.justify.validator!('center')).toBe(true)
    expect(rowProps.justify.validator!('middle')).toBe(false)
    expect(rowProps.align.validator!('stretch')).toBe(true)
    expect(rowProps.align.validator!('middle')).toBe(false)
  })
  it('normalizes malformed JS gutters without throwing or generating invalid CSS', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const wrapper = mount(Row, {
        props: { gutter: null as any, align: 'bad' as any, justify: 'bad' as any },
        slots: { default: () => <Col /> },
      })
      expect(wrapper.classes().some((value) => value.endsWith('--align-start'))).toBe(true)
      expect(wrapper.classes().some((value) => value.endsWith('--justify-start'))).toBe(true)
      for (const gutter of [[12], [Infinity, 8], { typo: 12 }, { xs: NaN }]) {
        await wrapper.setProps({ gutter: gutter as any })
        expect(wrapper.html()).not.toMatch(/NaN|Infinity|undefinedpx/)
      }
      expect(warn).toHaveBeenCalled()
      wrapper.unmount()
    } finally {
      warn.mockRestore()
    }
  })
  it('omits invalid column fields while retaining valid siblings and signed orders', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const wrapper = mount(Col, {
        props: { span: NaN, offset: -1, order: -100, sm: { span: 25, offset: 24, order: -1 }, md: null as any },
      })
      expect(wrapper.classes().some((value) => value.endsWith('--span-24'))).toBe(true)
      expect(wrapper.classes().some((value) => value.endsWith('--offset-sm-24'))).toBe(true)
      expect(wrapper.classes().join(' ')).not.toMatch(/NaN|span-sm-25|offset--1/)
      expect(wrapper.attributes('style')).toContain('-100')
      expect(warn).toHaveBeenCalled()
      wrapper.unmount()
    } finally {
      warn.mockRestore()
    }
  })
  it('removes retired order bindings when props change', async () => {
    const wrapper = mount(Col, { props: { order: -1, sm: { order: 100 } } })
    expect(wrapper.element.style.getPropertyValue('--mp-col-order')).toBe('-1')
    expect(wrapper.element.style.getPropertyValue('--mp-col-order-sm')).toBe('100')
    await wrapper.setProps({ order: undefined, sm: undefined })
    expect(wrapper.element.style.getPropertyValue('--mp-col-order')).toBe('')
    expect(wrapper.element.style.getPropertyValue('--mp-col-order-sm')).toBe('')
    expect(wrapper.classes().some((value) => value.includes('--order'))).toBe(false)
    wrapper.unmount()
  })
  it('validates flex while leaving CSS string parsing to the browser', () => {
    for (const value of [0, 1, 'auto', '100px', 'calc(100% - 12px)']) {
      expect(colProps.flex.validator!(value)).toBe(true)
    }
    for (const value of [-1, Infinity, NaN, '', {}, null]) {
      expect(colProps.flex.validator!(value)).toBe(false)
    }
  })
  it('treats undefined breakpoint values as omitted', () => {
    expect(rowProps.gutter.validator!({ xs: 12, sm: undefined })).toBe(true)
    expect(colProps.sm.validator!({ span: undefined, order: undefined })).toBe(true)
  })
  it('serializes huge integer orders without scientific notation', () => {
    const wrapper = mount(Col, { props: { order: 1e21, sm: { order: -1e21 } } })
    expect(wrapper.attributes('style')).toContain('1000000000000000000000')
    expect(wrapper.attributes('style')).not.toMatch(/1e[+-]21/)
    wrapper.unmount()
  })
})
