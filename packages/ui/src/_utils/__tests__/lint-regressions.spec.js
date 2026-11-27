import { createVNode, defineComponent } from 'vue'
import { expect, test } from 'vitest'
import { legacyRoute } from '../../../docs/.vuepress/legacy-route'
import { isEqual } from '../is-equal'
import { resolveProps, ShapeFlags } from '../vue-utils'

test('VuePress legacy routing only resolves concrete documentation paths', () => {
  for (const [hash, path] of [
    ['', undefined],
    ['#/', undefined],
    ['#/button', '/zh-CN/button/'],
    ['#/en-US/button', '/en-US/button/'],
    ['#/index?language=en-US', '/en-US/'],
  ]) {
    expect(legacyRoute(hash)).toBe(path)
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
  ).toBe(false)
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
