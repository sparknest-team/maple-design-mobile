import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Rate, { rateProps } from '..'

describe('Rate public slot and count contract', () => {
  test('diagnoses a count beyond the supported rendering budget', () => {
    expect(rateProps.count.validator(1001)).toBe(false)
    expect(rateProps.count.validator('1000000000')).toBe(false)
    expect(rateProps.count.validator(1000)).toBe(true)
    expect(rateProps.count.validator(0.5)).toBe(true)
  })
  test.each([1001, '1000000000', Infinity, NaN, -1, 0])(
    'oversized or invalid count %s renders a safe fallback',
    (count) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      try {
        const w = mount(Rate, { props: { count, editMode: 'direct' } })
        expect(w.attributes('aria-valuemax')).toBe('5')
        expect(
          w.findAll('div').filter((item) => item.classes().some((name) => /-rate__content$/.test(name))),
        ).toHaveLength(5)
        expect(warn).toHaveBeenCalled()
        w.unmount()
      } finally {
        warn.mockRestore()
      }
    },
  )
  test('custom read receives the nullable model without text substitution', () => {
    let scope
    const w = mount(Rate, {
      props: { modelValue: null, readPretty: true, emptyText: 'None' },
      slots: {
        read: (value) => {
          scope = value
          return 'custom'
        },
      },
    })
    expect(scope).toEqual({ value: null, text: '' })
    expect(w.text()).toBe('custom')
    w.unmount()
  })
  test('character active means fully selected, and the half state belongs to its wrapper', () => {
    const scopes = []
    const w = mount(Rate, {
      props: { modelValue: 1.5, allowHalf: true, editMode: 'direct' },
      slots: {
        character: (scope) => {
          scopes.push(scope)
          return String(scope.value)
        },
      },
    })
    expect(scopes.slice(0, 3)).toEqual([
      { index: 0, value: 1, active: true },
      { index: 1, value: 2, active: false },
      { index: 2, value: 3, active: false },
    ])
    expect(w.findAll('[class*="rate__content-half"]')).toHaveLength(1)
    w.unmount()
  })
})
