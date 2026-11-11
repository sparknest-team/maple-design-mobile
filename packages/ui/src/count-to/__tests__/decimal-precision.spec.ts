import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CountTo from '..'

for (const [from, precision, expected] of [
  [1e-7, 8, '1e-7'],
  [-1.234e-7, 9, '-1.24e-7'],
  [1.234e24, -23, '1.2e+24'],
  [-1.234e24, -23, '-1.3e+24'],
  [1e308, 292, '1e+308'],
  [-Number.MIN_VALUE, 292, '-1e-292'],
  [12.359, 1.5, '12'],
  [12.359, Infinity, '12'],
] as const) {
  test(`CountTo formats ${from} at precision ${precision} as a finite floor value`, () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(CountTo, { props: { from, precision, autoStart: false } })
    try {
      expect(wrapper.text()).toBe(expected)
    } finally {
      wrapper.unmount()
      warn.mockRestore()
    }
  })
}
test('string precision uses the existing numeric conversion and slot receives a number', () => {
  const values: number[] = []
  const wrapper = mount(CountTo, {
    props: { from: 1e-7, precision: '8', autoStart: false },
    slots: {
      default: ({ value }: { value: number }) => {
        values.push(value)
        return String(value)
      },
    },
  })
  try {
    expect(values).toEqual([1e-7])
    expect(wrapper.text()).toBe('1e-7')
  } finally {
    wrapper.unmount()
  }
})
