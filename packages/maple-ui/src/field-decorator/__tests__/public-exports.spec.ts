import { expect, test } from 'vitest'
import FieldDecorator, { FieldDecorator as named, fieldLoadingModes as subpathModes } from '..'
import { fieldLoadingModes as rootModes, FieldDecorator as rootNamed } from '../../index'

test('root and subpath expose the installed component and loading modes', () => {
  expect(named).toBe(FieldDecorator)
  expect(rootNamed).toBe(FieldDecorator)
  expect(rootModes).toBe(subpathModes)
  expect(rootModes).toEqual(['default', 'line'])
})
