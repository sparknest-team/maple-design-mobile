import { effectScope, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { bulkChoices, choiceLimit, toggleChoice, useChoiceState } from '../choice-state'

describe('choice state copies', () => {
  it('does not retain rejected controlled proposals or notify external changes', () => {
    const props = reactive({ value: ['a'] })
    const notify = vi.fn()
    const state = useChoiceState(() => props.value, [], notify)
    state.commit(['b'])
    expect(state.value.value).toEqual(['a'])
    props.value = ['c']
    expect(state.value.value).toEqual(['c'])
    expect(notify).toHaveBeenCalledTimes(1)
    props.value = undefined
    expect(state.value.value).toEqual([])
  })

  it('copies defaults and proposals, isolates instances, and ignores equal values', () => {
    const initial = ['a']
    const notify = vi.fn()
    const left = useChoiceState(() => undefined, initial, notify)
    const right = useChoiceState(() => undefined, initial, vi.fn())
    initial.push('outside')
    expect(left.value.value).toEqual(['a'])
    expect(left.commit(['a'])).toBe(false)
    const next = ['b']
    left.commit(next)
    next.push('outside')
    notify.mock.calls[0][0].push('consumer')
    expect(left.value.value).toEqual(['b'])
    expect(right.value.value).toEqual(['a'])
  })

  it('recognizes false, zero, and empty string as controlled radio values', () => {
    for (const value of [false, 0, '']) {
      const state = useChoiceState(() => value, 'initial', vi.fn())
      expect(state.value.value).toBe(value)
      expect(state.commit(value)).toBe(false)
      state.commit('proposal')
      expect(state.value.value).toBe(value)
    }
  })

  it('enforces reactive interaction guards', () => {
    const props = reactive({ blocked: true })
    const notify = vi.fn()
    const state = useChoiceState(
      () => undefined,
      [],
      notify,
      () => props.blocked,
    )
    expect(state.commit(['a'])).toBe(false)
    props.blocked = false
    expect(state.commit(['a'])).toBe(true)
    expect(notify).toHaveBeenCalledTimes(1)
  })

  it('limits additions without pruning externally supplied over-limit values', () => {
    expect(toggleChoice(['a', 'b'], 'c', true, 1)).toEqual(['a', 'b'])
    expect(toggleChoice(['a', 'b'], 'a', false, 1)).toEqual(['b'])
    expect(toggleChoice([], false, true, 1)).toEqual([false])
    expect(toggleChoice([false], false, false, 1)).toEqual([])
    expect(toggleChoice(['a'], 'a', true)).toEqual(['a'])
    expect(choiceLimit('2')).toBe(2)
    expect(choiceLimit(-1)).toBe(0)
  })

  it('bulk selection preserves locked and unloaded values and observes max', () => {
    const choices = [{ value: 'a' }, { value: 'b', disabled: true }, { value: 'c', readonly: true }, { value: 'd' }]
    expect(bulkChoices(['remote', 'b'], choices, false, 3)).toEqual(['remote', 'b', 'a'])
    expect(bulkChoices(['remote', 'b', 'a'], choices, true, 3)).toEqual(['remote', 'b', 'd'])
    expect(bulkChoices(['a'], [{ value: 'a' }, { value: 'a', disabled: true }], true)).toEqual(['a'])
    expect(bulkChoices(['b'], [{ value: 'a' }, { value: 'b' }], false, 1)).toEqual(['b'])
    expect(bulkChoices(['a', 'b'], [{ value: 'a' }, { value: 'b' }], false, 1)).toEqual(['a', 'b'])
    expect(bulkChoices([], [{ value: 'a' }, { value: 'a' }], false)).toEqual(['a'])
  })

  it('has no scheduled work or cross-instance singleton state', () => {
    const scope = effectScope()
    const notify = vi.fn()
    scope.run(() => useChoiceState(() => undefined, [], notify))
    scope.stop()
    expect(notify).not.toHaveBeenCalled()
  })
})
