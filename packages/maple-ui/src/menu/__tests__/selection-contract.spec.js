import { effectScope, reactive, toRaw } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import { createMenuTree, useMenuSelection } from '../selection'

function controller(props) {
  const options = reactive(props)
  const emit = vi.fn()
  const scope = effectScope()
  const selection = scope.run(() => useMenuSelection(options, emit))
  return { options, emit, selection, stop: () => scope.stop() }
}
const tree = () => [{ value: 'p', children: [{ value: 'a' }, { value: 'b' }, { value: 'off', disabled: true }] }]
describe('Menu selection contract', () => {
  test('controlled requests never change selection until accepted', () => {
    const { options, selection, emit, stop } = controller({ multiple: true, modelValue: [], options: tree() })
    selection.select('p', {})
    selection.select('p', {})
    expect(emit.mock.calls.map((call) => call[0])).toEqual([
      ['p', 'a', 'b'],
      ['p', 'a', 'b'],
    ])
    expect(selection.isSelected('p')).toBe(false)
    options.modelValue = emit.mock.calls[0][0]
    expect(selection.isSelected('a')).toBe(true)
    selection.select('p', {})
    expect(emit.mock.calls[2][0]).toEqual([])
    stop()
  })
  test('multiple without a model is empty and supports unmounted descendants', () => {
    const { selection, emit, stop } = controller({ multiple: true, options: tree() })
    expect(selection.isIndeterminate('p')).toBe(false)
    selection.select('p', {})
    expect(emit.mock.calls[0][0]).toEqual(['p', 'a', 'b'])
    stop()
  })
  test('child selection derives ancestors; mixed branch click clears enabled descendants', () => {
    const { options, selection, emit, stop } = controller({ multiple: true, modelValue: ['a'], options: tree() })
    expect(selection.isIndeterminate('p')).toBe(true)
    selection.select('b', {})
    expect(emit.mock.calls[0][0]).toEqual(['p', 'a', 'b'])
    selection.select('p', {})
    expect(emit.mock.calls[1][0]).toEqual([])
    options.modelValue = ['p', 'a', 'b']
    selection.select('a', {})
    expect(emit.mock.calls[2][0]).toEqual(['b'])
    stop()
  })
  test('field mapping, false/zero keys, empty children and raw option identity', () => {
    const raw = [
      { id: false, text: 'false', nodes: [] },
      { id: 0, text: 'zero' },
    ]
    const { selection, emit, stop } = controller({
      options: raw,
      fieldNames: { value: 'id', label: 'text', children: 'nodes', disabled: undefined },
    })
    selection.select(false, {})
    expect(emit.mock.calls[0][0]).toBe(false)
    expect(toRaw(emit.mock.calls[0][1])).toBe(raw[0])
    expect(selection.tree.value.names.disabled).toBe('disabled')
    selection.select(0, {})
    expect(emit.mock.calls[1][0]).toBe(0)
    stop()
  })
  test('disabled ancestors block programmatic selection and exclude their subtree', () => {
    const { selection, emit, stop } = controller({
      multiple: true,
      options: [
        { value: 'p', children: [{ value: 'a' }, { value: 'off', disabled: true, children: [{ value: 'x' }] }] },
      ],
    })
    selection.select('x', {})
    expect(emit).not.toHaveBeenCalled()
    selection.select('p', {})
    expect(emit.mock.calls[0][0]).toEqual(['p', 'a'])
    stop()
  })
  test('async options retain unknown selected values and object identity', () => {
    const key = {}
    const { options, selection, emit, stop } = controller({
      multiple: true,
      modelValue: ['pending', key],
      options: [{ value: key }, { value: 'new' }],
    })
    expect(selection.isSelected(key)).toBe(true)
    selection.select('new', {})
    expect(emit.mock.calls[0][0]).toEqual([key, 'new', 'pending'])
    options.options = [{ value: 'pending' }]
    expect(selection.isSelected('pending')).toBe(true)
    stop()
  })
  test('slot values use registration order and are removed on unregister', () => {
    const { options, selection, emit, stop } = controller({ multiple: true, modelValue: ['b'] })
    const unregister = selection.register(() => 'a')
    selection.register(() => 'b')
    selection.select('a', {})
    expect(emit.mock.calls[0][0]).toEqual(['a', 'b'])
    unregister()
    options.disabled = true
    selection.select('a', {})
    expect(emit).toHaveBeenCalledTimes(1)
    stop()
  })
  test('tree construction does not mutate supplied options', () => {
    const raw = Object.freeze([{ value: 'p', children: Object.freeze([{ value: 'a' }]) }])
    const result = createMenuTree(raw)
    expect(result.flat[1].parent).toBe(result.roots[0])
    expect(raw[0]._children).toBeUndefined()
  })
})
