import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Ellipsis from '..'

test('invalid triggers are inert and sub-one row values fall back to ordinary single-line mode', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Ellipsis, { props: { tooltip: false, expandTrigger: 'hover', lineClamp: 0.5 } })
  expect(w.get('div').attributes('role')).toBeUndefined()
  expect(w.get('div').attributes('aria-expanded')).toBeUndefined()
  await w.get('div').trigger('click')
  await w.get('div').trigger('keydown', { key: 'Enter' })
  expect(w.emitted('update:expand')).toBeUndefined()
  expect(w.get('div').element.style.webkitLineClamp).toBe('')
  expect(warn).toHaveBeenCalled()
  w.unmount()
  warn.mockRestore()
})
test('decimal row strings floor to valid rows and return cleanly to one line', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Ellipsis, { props: { tooltip: false, lineClamp: '2.8' } })
  expect(w.get('div').element.style.webkitLineClamp).toBe('2')
  await w.setProps({ lineClamp: 0.5 })
  expect(w.get('div').element.style.webkitLineClamp).toBe('')
  w.unmount()
  warn.mockRestore()
})
