import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { SkeletonLine } from '..'

test.each([Infinity, -Infinity, NaN, -1, 2.8])('Line normalizes non-finite and fractional rows: %s', (rows) => {
  const w = mount(SkeletonLine, { props: { rows } })
  const count = Number.isFinite(rows) ? Math.max(0, Math.floor(rows)) : 0
  expect(w.findAll('li')).toHaveLength(count)
  w.unmount()
})
