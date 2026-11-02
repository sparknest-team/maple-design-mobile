import { expect, test } from 'vitest'
import { autoCompleteProps } from '../../auto-complete/props'
import { cascaderProps } from '../../cascader/props'
import { searchProps } from '../../search/props'
import { selectProps } from '../../select/props'

for (const [name, props] of [
  ['AutoComplete', autoCompleteProps],
  ['Select', selectProps],
  ['Cascader', cascaderProps],
] as const) {
  test(`${name} accepts array options and loaders without transport-specific fetch props`, () => {
    expect(props.options.type).toEqual([Array, Function])
    expect('fetch' in props).toBe(false)
  })
}
test('Search owns query fields and history arrays, not a result loader', () => {
  expect(searchProps.fields.type).toBe(Array)
  expect(searchProps.recentSearches.type).toBe(Array)
  expect('fetch' in searchProps).toBe(false)
  expect('options' in searchProps).toBe(false)
})
test('Cascader keeps its node-specific callback loading protocol', () => {
  expect(cascaderProps.loadMore.type).toBe(Function)
})
