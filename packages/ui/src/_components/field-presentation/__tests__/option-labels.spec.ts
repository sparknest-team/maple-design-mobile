import { expect, test } from 'vitest'
import { optionValueText } from '../option-labels'

const options = [
  { id: 'east', name: 'East', nodes: [{ id: 'device', name: 'Device E' }] },
  { id: 'west', name: 'West', nodes: [{ id: 'device', name: 'Device W' }] },
]
const props = {
  options,
  fieldNames: { value: 'id', label: 'name', children: 'nodes' },
  pathMode: true,
  showPathLabel: true,
}
test('formats a single path once and resolves repeated leaf IDs within its own branch', () => {
  expect(optionValueText(['east', 'device'], props)).toBe('East / Device E')
  expect(optionValueText(['west', 'device'], props)).toBe('West / Device W')
})
test('formats multiple paths with the configured selection separator', () => {
  expect(
    optionValueText(
      [
        ['east', 'device'],
        ['west', 'device'],
      ],
      { ...props, multiple: true, separator: '; ' },
    ),
  ).toBe('East / Device E; West / Device W')
})
test('reflects asynchronous option labels without changing the saved IDs', () => {
  const value = ['east', 'device']
  expect(optionValueText(value, { ...props, options: [] })).toBe('east / device')
  expect(optionValueText(value, props)).toBe('East / Device E')
  expect(value).toEqual(['east', 'device'])
  expect(optionValueText(undefined, props)).toBe('')
})
test('keeps ordinary multi-select formatting unchanged', () => {
  expect(optionValueText(['east', 'west'], { ...props, pathMode: false, multiple: true })).toBe('East, West')
})
