import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '..'

test('native busy metadata survives without an internal loading indicator', () => {
  const owner = mount(Input, { props: { inputAttrs: { 'aria-busy': 'true' } } })
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  expect(owner.find('.mp-loading').exists()).toBe(false)
  owner.unmount()
})
test.each([false, 'false'])('internal loading temporarily overrides native busy hint %s', async (hint) => {
  const owner = mount(Input, { props: { loading: true, inputAttrs: { 'aria-busy': hint } } })
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  await owner.setProps({ loading: false })
  expect(owner.get('input').attributes('aria-busy')).toBe('false')
  owner.unmount()
})
