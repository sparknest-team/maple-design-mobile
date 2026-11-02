import { expect, test } from 'vitest'
import { selectMobileDocumentation } from '../compileSiteEntry'

test('opts selected root docs into the phone site in both languages', () => {
  const files = [
    '/project/docs/showcase.zh-CN.md',
    '/project/docs/showcase.en-US.md',
    '/project/docs/quickstart.zh-CN.md',
  ]
  expect(selectMobileDocumentation(files, ['showcase'])).toEqual(files.slice(0, 2))
  expect(selectMobileDocumentation(files, [])).toEqual([])
  expect(selectMobileDocumentation(files, ['missing'])).toEqual([])
})
