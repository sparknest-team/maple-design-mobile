import { ref } from 'vue'
import { pascalCase } from '@maple-design/shared-vue'
import { describe, expect, test } from 'vitest'
import { createNamespace, withPropsDefaultsSetter } from '../components'
import { toSizeUnit } from '../elements'

describe('shared namespace integration', () => {
  test.each([
    ['icon', 'MpIcon'],
    ['registered-icon', 'MpRegisteredIcon'],
    ['tab-bar-item', 'MpTabBarItem'],
    ['', 'Mp-'],
    ['Foo-Bar', 'MpFooBar'],
  ])('%s keeps names and BEM semantics', (name, expectedName) => {
    const namespace = createNamespace(name)
    const base = `mp-${name}`
    expect(namespace.name).toBe(expectedName)
    expect(namespace.n()).toBe(base)
    expect(namespace.n('')).toBe(base)
    expect(namespace.n('content')).toBe(`${base}__content`)
    expect(namespace.n('--active')).toBe(`${base}--active`)
    expect(namespace.n('$--box')).toBe('mp--box')
    expect(namespace.n('$prefix-$suffix')).toBe('mpprefix-$suffix')
    expect(
      namespace.classes(
        'base',
        null,
        undefined,
        [true, 'yes', 'no'],
        [false, 'yes'],
        [false, 'yes', 'no'],
        [ref(false), 'ref'],
        [false, 'yes', null],
        [false, 'yes', undefined],
      ),
    ).toEqual(['base', null, undefined, 'yes', null, 'no', 'ref', null, null])
  })

  test.each([
    ['fire', 'Fire'],
    ['check-circle-fill', 'CheckCircleFill'],
    ['Foo-Bar', 'fooBar'],
    ['', ''],
    ['a--b', 'A-B'],
  ])('registered name %s preserves casing behavior', (name, expected) => {
    expect(pascalCase(name)).toBe(expected)
  })
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

test('default setters preserve descriptors, mixed types, null factories and literal defaults', () => {
  const validator = () => true
  const props = {
    mixed: { type: [Object, Array], required: true, validator },
    nullableArray: Array,
    literal: String,
    ignored: null,
  }
  const target = withPropsDefaultsSetter({}, props)
  target.setPropsDefaults({ mixed: [1], nullableArray: null, literal: false, ignored: 'value' })
  expect(props.mixed).toMatchObject({ required: true, validator })
  expect(props.mixed.default()).toEqual([1])
  expect(props.mixed.default()).not.toBe(props.mixed.default())
  expect(props.nullableArray.default()).toBe(null)
  expect(props.literal.default).toBe(false)
  expect(props.ignored).toBe(null)
  target.setPropsDefaults({ mixed: { nested: { id: 1 } }, literal: 0 })
  const first = props.mixed.default()
  const second = props.mixed.default()
  expect(first).not.toBe(second)
  expect(first.nested).toBe(second.nested)
  expect(props.literal.default).toBe(0)
})

test('mixed prop defaults preserve Object precedence for tagged arrays', () => {
  const props = { value: [Object, Array] }
  const target = withPropsDefaultsSetter({}, props)
  const value = [1]
  value[Symbol.toStringTag] = 'Object'
  target.setPropsDefaults({ value })
  expect(Array.isArray(props.value.default())).toBe(false)
  expect(props.value.default()[0]).toBe(1)
})
