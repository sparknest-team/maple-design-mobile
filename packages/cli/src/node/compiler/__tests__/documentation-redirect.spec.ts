import { expect, test } from 'vitest'
import { documentationRedirect } from '../siteRoutes'

test('reads local documentation redirects without accepting external or body URLs', () => {
  expect(documentationRedirect('---\nredirectTo: /zh-CN/themes\n---\n# ThemeProvider')).toBe('/zh-CN/themes')
  expect(documentationRedirect('---\r\nredirectTo: /en-US/themes\r\n---\r\n')).toBe('/en-US/themes')
  expect(documentationRedirect('---\nredirectTo: https://example.com\n---\n')).toBeUndefined()
  expect(documentationRedirect('# Example\nredirectTo: /en-US/themes')).toBeUndefined()
})
