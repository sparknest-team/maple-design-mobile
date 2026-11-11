import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { Pagination } from '..'

test('empty pagination', () => {
  const w = mount(Pagination, { props: { total: 0 } })
  expect(w.findAll('button').every((b) => b.element.disabled)).toBe(true)
  w.unmount()
})
