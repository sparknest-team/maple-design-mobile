import { expect, test } from 'vitest'
import { navMenuItemProps, navMenuProps } from '..'
import { navMenuItemProps as rootItemProps, navMenuProps as rootProps } from '../../index'

test('exports NavMenu props and diagnoses unsupported root orientations', () => {
  expect(rootProps).toBe(navMenuProps)
  expect(rootItemProps).toBe(navMenuItemProps)
  expect(navMenuProps.mode.validator('horizontal')).toBe(true)
  expect(navMenuProps.mode.validator('vertical' as never)).toBe(false)
})
