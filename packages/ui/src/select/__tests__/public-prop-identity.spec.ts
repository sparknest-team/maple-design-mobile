import { expect, test } from 'vitest'
import { CascaderPanel, cascaderPanelProps } from '../../cascader'
import { Optgroup, optgroupProps } from '../index'

test('public panel and optgroup props are the component runtime props', () => {
  expect(CascaderPanel.props).toBe(cascaderPanelProps)
  expect(Optgroup.props).toBe(optgroupProps)
  expect(cascaderPanelProps.multiple.default).toBe(false)
  expect(cascaderPanelProps.options.default()).toEqual([])
  expect(optgroupProps.label.type).toBe(String)
})
