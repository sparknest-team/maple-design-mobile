import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '..'

test('native busy metadata survives without an internal loading indicator', () => {
  const owner = mount(Input, { props: { inputAttrs: { 'aria-busy': 'true' } } })
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  expect(owner.find('.mp-loading').exists()).toBe(false)
  owner.unmount()
})
test('internal loading takes precedence over a false native busy hint', () => {
  const owner = mount(Input, { props: { loading: true, inputAttrs: { 'aria-busy': 'false' } } })
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  owner.unmount()
})
