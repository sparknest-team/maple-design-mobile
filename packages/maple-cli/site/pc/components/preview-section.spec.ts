import { afterEach, expect, it, vi } from 'vitest'
import { currentMobileDemo } from './preview-section'

afterEach(() => vi.restoreAllMocks())

it('maps the current heading or group to a demo and leaves API sections unmapped', () => {
  const root = document.createElement('main')
  root.innerHTML =
    '<article class="maple-site-doc"><h2>Examples</h2><div class="card"><h3>First</h3><div data-mobile-demo="first"></div></div><div class="card"><h3>Second</h3><div data-mobile-demo="second"></div></div><h2>API</h2><div class="card"><h3>Props</h3></div></article>'
  let current = 0
  Array.from(root.querySelectorAll('h2,h3')).forEach((heading, index) => {
    vi.spyOn(heading, 'getBoundingClientRect').mockImplementation(
      () => ({ top: index <= current ? 100 : 400 }) as DOMRect,
    )
  })
  expect(currentMobileDemo(root)).toBe('first')
  current = 2
  expect(currentMobileDemo(root)).toBe('second')
  current = 3
  expect(currentMobileDemo(root)).toBeUndefined()
  current = 4
  expect(currentMobileDemo(root)).toBeUndefined()
  expect(currentMobileDemo(null)).toBeUndefined()
})
