import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Progress from '..'
import { normalizePercent } from '../percent'

test.each([
  [0.5, 0.5],
  [1, 1],
  [12.5, 12.5],
  ['12.5', 12.5],
  ['1e2', 100],
  [-1, 0],
  [120, 100],
  [NaN, 0],
  [Infinity, 0],
  ['50%', 0],
  ['20px', 0],
  ['0x20', 0],
  ['', 0],
  [undefined, 0],
])('normalizes %s to %s', (input, output) => {
  expect(normalizePercent(input)).toBe(output)
})
test.each(['line', 'circle'])('%s uses a decimal zero-to-100 contract', (mode) => {
  const wrapper = mount(Progress, { props: { mode, percent: '12.5', showText: true } })
  const bar = wrapper.get('[role="progressbar"]')
  expect(bar.attributes('aria-valuemax')).toBe('100')
  expect(bar.attributes('aria-valuenow')).toBe('12.5')
  expect(wrapper.text()).toContain('12.5%')
  wrapper.unmount()
})
test.each(['line', 'circle'])('%s clamps invalid input before rendering', (mode) => {
  const wrapper = mount(Progress, { props: { mode, percent: 'bad' } })
  expect(wrapper.get('[role="progressbar"]').attributes('aria-valuenow')).toBe('0')
  expect(wrapper.html()).not.toContain('NaN')
  wrapper.unmount()
})

test('text slot receives the normalized percentage', () => {
  const wrapper = mount(Progress, {
    props: { percent: '12.5', showText: true },
    slots: { text: ({ percent }) => 'slot:' + percent },
  })
  expect(wrapper.text()).toContain('slot:12.5')
  wrapper.unmount()
})
