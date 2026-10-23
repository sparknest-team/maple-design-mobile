import { ref } from 'vue'
import { createNamespaceFn, pascalCase as sharedPascalCase } from '@maplejs/maple-shared'
import { describe, expect, test } from 'vitest'
import { createNamespace, pascalCase } from '../namespace'
import { withPropsDefaultsSetter } from '../props-defaults'
import { toSizeUnit } from '../size-unit'

describe('lightweight namespace contract', () => {
  test.each(['icon', 'registered-icon', 'tab-bar-item', '', 'Foo-Bar'])('%s keeps names and BEM semantics', (name) => {
    const actual = createNamespace(name)
    const original = createNamespaceFn('mp')(name)
    expect(actual.name).toBe(original.name)
    for (const suffix of [undefined, '', 'content', '--active', '$--box', '$prefix-$suffix']) {
      expect(actual.n(suffix)).toBe(original.n(suffix))
    }
    const names = [
      'base',
      null,
      undefined,
      [true, 'yes', 'no'],
      [false, 'yes'],
      [false, 'yes', 'no'],
      [ref(false), 'ref'],
    ]
    expect(actual.classes(...names)).toEqual(original.classes(...names))
  })

  test.each(['fire', 'check-circle-fill', 'Foo-Bar', '', 'a--b'])(
    'registered name %s preserves casing behavior',
    (name) => {
      expect(pascalCase(name)).toBe(sharedPascalCase(name))
    },
  )
})

test.each([
  [undefined, undefined],
  [null, undefined],
  [0, '0px'],
  [-1, '-1px'],
  [1.5, '1.5px'],
  ['+12', '+12px'],
  ['-12', '-12px'],
  ['1.5', '1.5'],
  ['', ''],
  [' 12 ', ' 12 '],
  ['2rem', '2rem'],
  ['var(--mp-size)', 'var(--mp-size)'],
  ['calc(1em + 2px)', 'calc(1em + 2px)'],
])('size %s retains the public conversion contract', (value, expected) => {
  expect(toSizeUnit(value)).toBe(expected)
})

test('default array/object factories isolate instances and preserve function defaults', () => {
  const props = { items: Array, options: { type: Object }, callback: Function, nullable: [Object, String] }
  const target = {}
  const callback = () => 'result'
  withPropsDefaultsSetter(target, props)
  target.setPropsDefaults({ items: ['a'], options: { key: true }, callback, nullable: null, unknown: 1 })
  const items = props.items.default()
  items.push('b')
  expect(props.items.default()).toEqual(['a'])
  const options = props.options.default()
  options.key = false
  expect(props.options.default()).toEqual({ key: true })
  expect(props.callback.default).toBe(callback)
  expect(props.nullable.default()).toBe(null)
  expect(props).not.toHaveProperty('unknown')
})
