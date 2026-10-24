import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { cloneFieldValue } from '../../_components/picker-field/use-field-value'
import { getTimeCommitValue, type TimeCommitInput, type TimeCommitRules } from '../time-commit'
import { useTimeFieldTransaction } from '../use-time-field-transaction'

describe('time field commit boundary', () => {
  it('validates typed values using format, step, bounds and callbacks', () => {
    expect(getTimeCommitValue('10:15', { format: 'HH:mm', step: { minute: 30 } })).toBeUndefined()
    expect(getTimeCommitValue('10:30', { format: 'HH:mm', step: { minute: 30 } })).toBe('10:30')
    expect(getTimeCommitValue('10:30', { format: 'HH:mm', min: '11:00' })).toBeUndefined()
    expect(getTimeCommitValue('01:30 PM', { format: 'hh:mm A', disabledHours: () => [13] })).toBeUndefined()
    expect(getTimeCommitValue('25:00', { format: 'HH:mm' })).toBeUndefined()
  })

  it.each([false, true])('accepts reversed ranges only with next day=%s', (showNextDay) => {
    const source = ['18:00', '09:00']
    expect(getTimeCommitValue(source, { format: 'HH:mm', showNextDay }, true)).toEqual(showNextDay ? source : undefined)
    expect(source).toEqual(['18:00', '09:00'])
    expect(
      getTimeCommitValue(source, { format: 'HH:mm', showNextDay, disabledHours: () => [18] }, true),
    ).toBeUndefined()
    expect(
      getTimeCommitValue(['18:15', '09:00'], { format: 'HH:mm', showNextDay, step: { minute: 30 } }, true),
    ).toBeUndefined()
    expect(getTimeCommitValue(['18:00', undefined], { format: 'HH:mm' }, true)).toBeUndefined()
    expect(getTimeCommitValue([], { format: 'HH:mm' }, true)).toBeUndefined()
  })

  it('accepts Date and timestamp inputs without mutating them', () => {
    const date = new Date(2026, 8, 23, 10, 30)
    expect(getTimeCommitValue(date, { format: 'HH:mm' })).toBe('10:30')
    expect(getTimeCommitValue(date.getTime(), { format: 'HH:mm' })).toBe('10:30')
    expect(date.getHours()).toBe(10)
  })
})

function setup() {
  const value = ref<TimeCommitInput>('09:00')
  const open = ref(true)
  const blocked = ref(false)
  const rules = ref<TimeCommitRules>({ format: 'HH:mm' })
  const commit = vi.fn()
  const close = vi.fn()
  let transaction!: ReturnType<typeof useTimeFieldTransaction<TimeCommitInput>>
  const wrapper = mount(
    defineComponent({
      setup() {
        transaction = useTimeFieldTransaction<TimeCommitInput>({
          value: () => value.value,
          open,
          blocked: () => blocked.value,
          clone: cloneFieldValue,
          rules: () => rules.value,
          range: () => false,
          onCommit: commit,
          onClose: close,
        })
        return () => h('div')
      },
    }),
  )
  return { value, open, blocked, rules, commit, close, transaction, wrapper }
}

describe('copied time field transaction', () => {
  it('revalidates drafts and blocked state at confirmation', () => {
    const state = setup()
    state.transaction.draft.value = '10:15'
    state.rules.value.step = { minute: 30 }
    expect(state.transaction.canConfirm.value).toBe(false)
    expect(state.transaction.commit()).toBe(false)
    expect(state.open.value).toBe(true)
    state.transaction.draft.value = '10:30'
    state.blocked.value = true
    expect(state.transaction.canConfirm.value).toBe(false)
    expect(state.transaction.commit()).toBe(false)
    state.blocked.value = false
    expect(state.transaction.commit()).toBe(true)
    expect(state.commit).toHaveBeenCalledWith('10:30')
    expect(state.open.value).toBe(false)
    expect(state.close).toHaveBeenCalledWith('10:30')
    state.wrapper.unmount()
  })

  it('external values replace drafts without emitting and cancellation discards edits', async () => {
    const state = setup()
    state.transaction.draft.value = '10:30'
    state.value.value = '11:00'
    await nextTick()
    expect(state.transaction.draft.value).toBe('11:00')
    state.transaction.draft.value = '12:00'
    state.transaction.cancel()
    expect(state.transaction.draft.value).toBe('11:00')
    expect(state.commit).not.toHaveBeenCalled()
    expect(state.close).toHaveBeenCalledWith('11:00')
    state.wrapper.unmount()
  })

  it('clears to undefined even when no candidate is allowed, but respects readonly', () => {
    const state = setup()
    state.rules.value.disabledHours = () => Array.from({ length: 24 }, (_, index) => index)
    expect(state.transaction.canConfirm.value).toBe(false)
    state.blocked.value = true
    expect(state.transaction.clear(undefined)).toBe(false)
    state.blocked.value = false
    expect(state.transaction.clear(undefined)).toBe(true)
    expect(state.commit).toHaveBeenCalledWith(undefined)
    state.wrapper.unmount()
  })
})
