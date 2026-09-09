import { h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createRequestGuard } from '../../utils/async-request'
import { resolveFieldPath } from '../../utils/field-path'
import { useInputComposition } from '../../utils/input-composition'
import { matchesOptionText, resolveOptionFields, sameOptionValue } from '../../utils/option-data'
import {
  calendarMonthDays,
  clockHour,
  clockSeconds,
  isOvernight,
  parseClock,
  unitSequence,
} from '../../utils/picker-data'
import { usePopupTransition } from '../../utils/popup-transition'
import { collectTreeLeaves, collectTreePaths, findTreePath } from '../../utils/tree-data'

describe('selection, form, input and picker data contract', () => {
  test('only latest async result may commit; resetting invalidates in-flight results', () => {
    const guard = createRequestGuard(),
      first = guard.begin(),
      second = guard.begin()
    expect(first()).toBe(false)
    expect(second()).toBe(true)
    guard.invalidate()
    expect(second()).toBe(false)
  })
  test('option identity handles proxies, false/zero, object identity and mapped fields', () => {
    const raw = { id: 1 }
    expect(sameOptionValue(reactive(raw), raw)).toBe(true)
    expect(sameOptionValue(raw, { id: 1 })).toBe(false)
    expect(sameOptionValue(false, 0)).toBe(false)
    expect(resolveOptionFields({ label: 'text' }, { children: 'items' })).toEqual({
      label: 'text',
      children: 'items',
      value: 'value',
      disabled: 'disabled',
    })
    expect(matchesOptionText(12, '2')).toBe(true)
    expect(matchesOptionText('Abc', 'a')).toBe(true)
    expect(matchesOptionText('Abc', 'a', true)).toBe(false)
  })
  test('form paths handle arrays, missing intermediate values and strict errors', () => {
    const model = { users: [{ name: '甲' }], nested: null }
    const entry = resolveFieldPath(model, 'users[0].name')
    expect(entry.v).toBe('甲')
    entry.o[entry.k] = '乙'
    expect(model.users[0].name).toBe('乙')
    expect(resolveFieldPath(model, 'nested.child.name').v).toBeUndefined()
    expect(() => resolveFieldPath(model, 'nested.child.name', true)).toThrow()
    expect(resolveFieldPath(model, '').v).toBeUndefined()
  })
  test('Chinese composition emits one commit and accepts subsequent normal input', async () => {
    let composition, input
    const values = []
    const wrapper = mount({
      setup() {
        composition = useInputComposition()
        input = ref()
        return () =>
          h('input', {
            ref: input,
            onCompositionstart: composition.start,
            onCompositionend: (event) => {
              if (composition.end(event)) {
                values.push(event.target.value)
              }
            },
            onInput: (event) => {
              if (composition.accepts(event)) {
                values.push(event.target.value)
              }
            },
          })
      },
    })
    try {
      input.value.dispatchEvent(new Event('compositionstart'))
      input.value.value = '中'
      input.value.dispatchEvent(new Event('input'))
      expect(values).toEqual([])
      input.value.value = '中文'
      input.value.dispatchEvent(new Event('compositionend'))
      input.value.dispatchEvent(new Event('input'))
      expect(values).toEqual(['中文'])
      await nextTick()
      input.value.value = '中文a'
      input.value.dispatchEvent(new Event('input'))
      expect(values).toEqual(['中文', '中文a'])
    } finally {
      wrapper.unmount()
    }
  })
  test('Gregorian leap boundaries, midnight/noon, overnight and invalid clock values', () => {
    expect([1900, 2000, 2024, 2100].map((year) => calendarMonthDays(year, 2))).toEqual([28, 29, 29, 28])
    expect(calendarMonthDays(2026, 13)).toBeNaN()
    expect(clockHour(12, 'am')).toBe(0)
    expect(clockHour(12, 'pm')).toBe(12)
    expect(clockHour(1, 'pm')).toBe(13)
    expect(isOvernight(parseClock('23:59'), parseClock('00:00'))).toBe(true)
    expect(isOvernight(null, parseClock('00:00'))).toBe(false)
    for (const value of ['24:00', '12:60', '12:', '1.5:30', 'aa:00']) {
      expect(parseClock(value)).toBeNull()
    }
    expect(clockSeconds(23, 59, 59)).toBe(86399)
    expect(unitSequence(5, 0)).toEqual([0, 1, 2, 3, 4])
    expect(unitSequence(5, -1)).toEqual([0, 1, 2, 3, 4])
    expect(unitSequence(5, 2)).toEqual([0, 2, 4])
  })
})

test('tree paths keep branch identity and omit entire disabled subtrees', () => {
  const leaf = { value: 'a.b-1' },
    hidden = { value: 'hidden' }
  const nodes = [
    { value: 'a.b', children: [leaf] },
    { value: 'aXb', disabled: true, children: [hidden] },
  ]
  const children = (node) => node.children
  expect(findTreePath(nodes, children, (node) => node === leaf).map((node) => node.value)).toEqual(['a.b', 'a.b-1'])
  expect(collectTreeLeaves(nodes, children, (node) => !!node.disabled)).toEqual([leaf])
  expect(collectTreePaths(nodes, children, (node) => !!node.disabled)).toEqual([[nodes[0], leaf]])
})

test('popup completion callbacks are ignored after unmount and after a canceled leave', async () => {
  let transition
  const open = ref(true),
    events = []
  const wrapper = mount({
    setup() {
      transition = usePopupTransition(
        () => open.value,
        () => true,
        (event) => events.push(event),
      )
      return () => h('div')
    },
  })
  await nextTick()
  open.value = false
  await nextTick()
  open.value = true
  await nextTick()
  transition.closed()
  expect(events).not.toContain('closed')
  wrapper.unmount()
  const count = events.length
  transition.opened()
  await nextTick()
  expect(events).toHaveLength(count)
})
