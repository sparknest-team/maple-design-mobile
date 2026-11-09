import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Skeleton, { SkeletonLine, SkeletonShape } from '..'

const owners = []
afterEach(() => owners.splice(0).forEach((w) => w.unmount()))
test('empty built-in shape and line primitives are hidden from the accessibility tree', () => {
  for (const Component of [SkeletonLine, SkeletonShape]) {
    const w = mount(Component)
    owners.push(w)
    expect(w.attributes('aria-hidden')).toBe('true')
  }
})
test('only built-in placeholder content is decorative; custom template and real content remain exposed', async () => {
  const w = mount(Skeleton)
  owners.push(w)
  expect(w.get('.mp-skeleton__content').attributes('aria-hidden')).toBe('true')
  expect(w.attributes('aria-busy')).toBe('true')
  const custom = mount(Skeleton, {
    slots: { template: () => h('p', { role: 'status' }, 'Fetching records'), default: () => h('button', 'Results') },
  })
  owners.push(custom)
  expect(custom.get('[role=status]').element.closest('[aria-hidden=true]')).toBeNull()
  await custom.setProps({ loading: false })
  expect(custom.get('button').element.closest('[aria-hidden=true]')).toBeNull()
  expect(custom.attributes('aria-busy')).toBe('false')
})
