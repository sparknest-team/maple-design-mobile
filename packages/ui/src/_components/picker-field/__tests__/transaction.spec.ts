import { computed, effectScope, nextTick, ref } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import { useFieldTransaction } from '../use-field-transaction'

describe('field transaction', () => {
  function setup(initialOpen = false) {
    const scope = effectScope()
    const value = ref(['a'])
    const open = ref(initialOpen)
    const blocked = ref(false)
    const onCommit = vi.fn()
    const onCancel = vi.fn()
    const onClose = vi.fn()
    const transaction = scope.run(() =>
      useFieldTransaction({
        value: () => value.value,
        open,
        clone: (value) => [...value],
        blocked: () => blocked.value,
        onCommit,
        onCancel,
        onClose,
      }),
    )!
    return {
      scope,
      value,
      open,
      blocked,
      onCommit,
      onCancel,
      onClose,
      transaction,
    }
  }
  test('isolates drafts and discards cancellation without writing the model', () => {
    const state = setup(true)
    state.transaction.draft.value.push('b')
    expect(state.value.value).toEqual(['a'])
    state.transaction.cancel()
    expect(state.onCommit).not.toHaveBeenCalled()
    expect(state.onCancel).toHaveBeenCalledTimes(1)
    expect(state.onClose).toHaveBeenCalledWith(['a'])
    state.open.value = true
    expect(state.transaction.draft.value).toEqual(['a'])
    state.scope.stop()
  })
  test('commits a clone and reports the committed value when closing', () => {
    const state = setup(true)
    state.transaction.draft.value.push('b')
    state.transaction.commit()
    expect(state.onCommit).toHaveBeenCalledWith(['a', 'b'])
    expect(state.onClose).toHaveBeenCalledWith(['a', 'b'])
    expect(state.onCancel).not.toHaveBeenCalled()
    expect(state.open.value).toBe(false)
    state.scope.stop()
  })
  test('external model replacement wins over an in-progress draft', async () => {
    const state = setup(true)
    state.transaction.draft.value = ['draft']
    state.value.value = ['external']
    await nextTick()
    expect(state.transaction.draft.value).toEqual(['external'])
    state.scope.stop()
  })
  test('clear closes and does not resurrect the old draft', () => {
    const state = setup(true)
    state.transaction.draft.value = ['draft']
    state.transaction.clear([])
    expect(state.onCommit).toHaveBeenCalledTimes(1)
    expect(state.onCommit).toHaveBeenCalledWith([])
    expect(state.onClose).toHaveBeenCalledWith([])
    state.value.value = []
    state.open.value = true
    expect(state.transaction.draft.value).toEqual([])
    state.scope.stop()
  })
  test('blocked fields never commit or clear', () => {
    const state = setup(true)
    state.blocked.value = true
    expect(state.transaction.commit()).toBe(false)
    expect(state.transaction.clear([])).toBe(false)
    expect(state.onCommit).not.toHaveBeenCalled()
    state.scope.stop()
  })
  test('a controlled popup cannot commit twice while awaiting parent closure', () => {
    const scope = effectScope()
    const visible = ref(true)
    const requestClose = vi.fn()
    const onCommit = vi.fn()
    const open = computed({ get: () => visible.value, set: requestClose })
    const transaction = scope.run(() =>
      useFieldTransaction({
        value: () => 'old',
        open,
        clone: (value) => value,
        blocked: () => false,
        onCommit,
      }),
    )!
    expect(transaction.commit('new')).toBe(true)
    expect(transaction.commit('duplicate')).toBe(false)
    expect(onCommit).toHaveBeenCalledTimes(1)
    visible.value = false
    visible.value = true
    expect(transaction.draft.value).toBe('old')
    scope.stop()
  })
})
