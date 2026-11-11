import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Paper from '..'

test('decimal numeric strings are px and CSS expressions retain their meaning', async () => {
  const w = mount(Paper, { props: { width: '120.5', height: '.5', radius: '1.5' } })
  expect(w.element.style.width).toBe('120.5px')
  expect(w.element.style.height).toBe('0.5px')
  expect(w.element.style.borderRadius).toBe('1.5px')
  await w.setProps({ width: 'calc(100% - 8px)', height: '2rem', radius: 0 })
  expect(w.element.style.width).toBe('calc(100% - 8px)')
  expect(w.element.style.height).toBe('2rem')
  expect(w.element.style.borderRadius).toBe('0px')
  w.unmount()
})
test('invalid numeric dimensions clear old geometry and ordinary Vue validation reports them', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Paper, { props: { width: 120, height: 80, radius: 8 } })
  await w.setProps({ width: Number.NaN, height: Number.POSITIVE_INFINITY, radius: -1 })
  expect(w.element.style.width).toBe('')
  expect(w.element.style.height).toBe('')
  expect(w.element.style.borderRadius).toBe('')
  expect(warn).toHaveBeenCalled()
  await w.setProps({ width: 0, height: 0, radius: 0 })
  expect(w.element.style.width).toBe('0px')
  expect(w.element.style.height).toBe('0px')
  expect(w.element.style.borderRadius).toBe('0px')
  w.unmount()
  warn.mockRestore()
})
