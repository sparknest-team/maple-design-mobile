import { expect, test } from 'vitest'
import { isEqual } from '../is-equal'

test('compares own object keys symmetrically including undefined values', () => {
  expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
  expect(isEqual({ a: undefined }, { b: undefined })).toBe(false)
  expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
})

test('distinguishes functions with identical source and different closures', () => {
  const create = (value: string) => () => value
  const first = create('first')
  const second = create('second')
  expect(first.toString()).toBe(second.toString())
  expect(isEqual(first, first)).toBe(true)
  expect(isEqual(first, second)).toBe(false)
  expect(isEqual({ handler: first }, { handler: second })).toBe(false)
})
