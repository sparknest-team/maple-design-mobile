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

describe('DropdownMenu activation contract', () => {
  test('controlled requests never change selection until accepted', () => {
    const { options, selection, emit, stop } = controller({ modelValue: 'a', options: tree() })
    selection.select('b', {})
    expect(emit.mock.calls[0][0]).toBe('b')
    expect(selection.isSelected('a')).toBe(true)
    expect(selection.isSelected('b')).toBe(false)
    options.modelValue = 'b'
    expect(selection.isSelected('a')).toBe(false)
    expect(selection.isSelected('b')).toBe(true)
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
      options: [
        { value: 'p', children: [{ value: 'a' }, { value: 'off', disabled: true, children: [{ value: 'x' }] }] },
      ],
    })
    selection.select('x', {})
    expect(emit).not.toHaveBeenCalled()
    stop()
  })

  test('tree construction does not mutate supplied options', () => {
    const raw = Object.freeze([{ value: 'p', children: Object.freeze([{ value: 'a' }]) }])
    const result = createMenuTree(raw)
    expect(result.flat[1].parent).toBe(result.roots[0])
    expect(raw[0]._children).toBeUndefined()
  })
})
