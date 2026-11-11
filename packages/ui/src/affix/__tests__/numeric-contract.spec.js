import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Affix from '..'

test('CSS mode normalizes decimal numeric offsets and clears nonfinite old dimensions', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Affix, { props: { cssMode: true, offsetTop: '0.5' } })
  expect(w.element.style.top).toBe('0.5px')
  await w.setProps({ offsetTop: Number.NaN })
  expect(w.element.style.top).toBe('')
  expect(warn).toHaveBeenCalled()
  await w.setProps({ offsetTop: 'calc(1rem + 2px)' })
  expect(w.element.style.top).toContain('1rem')
  expect(w.element.style.top).toContain('2px')
  w.unmount()
  warn.mockRestore()
})
test('unsupported JS-mode units warn instead of silently treating em as pixels', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Affix, { props: { offsetTop: '10em' } })
  expect(warn).toHaveBeenCalled()
  const count = warn.mock.calls.length
  await w.setProps({ cssMode: true, offsetTop: 'calc(2rem + 4px)' })
  expect(warn.mock.calls.length).toBe(count)
  w.unmount()
  warn.mockRestore()
})
