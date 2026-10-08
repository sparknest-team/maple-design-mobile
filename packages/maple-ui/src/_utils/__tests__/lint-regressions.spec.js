import { createVNode, defineComponent } from 'vue'
import { expect, test } from 'vitest'
import { joinSiteRoutes } from '../../../../maple-cli/src/node/compiler/siteRoutes'
import { isEqual } from '../is-equal'
import { resolveProps, ShapeFlags } from '../vue-utils'

test('route groups never emit empty array entries', () => {
  for (const groups of [
    [[], []],
    [['1'], []],
    [[], ['2']],
    [['1'], ['2']],
    [[], ['3']],
  ]) {
    const source = joinSiteRoutes(...groups)
    const routes = JSON.parse(`[${source}]`)
    expect(routes).toEqual(groups.flat().map(Number))
  }
})

test('function equality narrows unknown values without suppressing type errors', () => {
  const same = () => 1
  expect(isEqual(same, same)).toBe(true)
  expect(
    isEqual(
      () => 1,
      () => 1,
    ),
  ).toBe(true)
  expect(
    isEqual(
      () => 1,
      () => 2,
    ),
  ).toBe(false)
  expect(isEqual(undefined, same)).toBe(false)
})

test('resolveProps accepts component, native element and symbol vnode types', () => {
  const component = defineComponent({ props: { disabled: Boolean } })
  expect(resolveProps(createVNode(component, { disabled: '' })).disabled).toBe(true)
  expect(resolveProps(createVNode('div', { title: 'hello' })).title).toBe('hello')
  expect(resolveProps(createVNode(Symbol('custom')))).toEqual({})
  expect(ShapeFlags.COMPONENT).toBe(ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT)
  expect(ShapeFlags.COMPONENT_KEPT_ALIVE).toBe(512)
})
