import { effectScope, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useFieldOpen } from '../use-field-open'
import { useFieldValue } from '../use-field-value'

describe('field state', () => {
  it('initializes once, clones defaults and accepts external clearing', () => {
    const scope = effectScope()
    const date = new Date(2026, 8, 23, 9)
    const props = reactive<{ value?: (Date | string)[]; initial: (Date | string)[] }>({ initial: [date] })
    const state = scope.run(() => useFieldValue({ value: () => props.value, defaultValue: () => props.initial }))!
    expect(state.value.value).not.toBe(props.initial)
    expect(state.value.value?.[0]).not.toBe(date)
    props.initial = ['changed default']
    expect(state.value.value?.[0]).toEqual(date)
    state.setValue(['selected'])
    expect(state.value.value).toEqual(['selected'])
    props.value = ['external']
    expect(state.value.value).toEqual(['external'])
    state.setValue(['request only'])
    expect(state.value.value).toEqual(['external'])
    props.value = undefined
    expect(state.value.value).toBeUndefined()
    scope.stop()
  })
  it('does not fall back from an invalid controlled parsed value', () => {
    const scope = effectScope()
    const state = scope.run(() =>
      useFieldValue({
        value: () => undefined,
        defaultValue: () => 'default',
        controlled: () => true,
      }),
    )!
    expect(state.value.value).toBeUndefined()
    scope.stop()
  })
  it('isolates defaults across instances', () => {
    const scope = effectScope()
    const [first, second] = scope.run(() =>
      [0, 1].map(() =>
        useFieldValue({
          value: () => undefined,
          defaultValue: () => ['09:00'],
        }),
      ),
    )!
    first.setValue(['10:00'])
    expect(second.value.value).toEqual(['09:00'])
    scope.stop()
  })
  it('respects controlled open and blocks opening, never closing', () => {
    const props = reactive<{ open?: boolean; blocked: boolean }>({ open: true, blocked: false })
    const onChange = vi.fn()
    const open = useFieldOpen({ value: () => props.open, blocked: () => props.blocked, onChange })
    open.value = false
    expect(open.value).toBe(true)
    expect(onChange).toHaveBeenCalledWith(false)
    props.open = false
    expect(open.value).toBe(false)
    props.blocked = true
    open.value = true
    expect(onChange).toHaveBeenCalledTimes(1)
    props.open = true
    open.value = false
    expect(onChange).toHaveBeenCalledTimes(2)
  })
  it('uses defaultOpen once without emitting on initialization', () => {
    const props = reactive({ defaultOpen: true })
    const onChange = vi.fn()
    const open = useFieldOpen({
      value: () => undefined,
      defaultValue: () => props.defaultOpen,
      blocked: () => false,
      onChange,
    })
    expect(open.value).toBe(true)
    expect(onChange).not.toHaveBeenCalled()
    props.defaultOpen = false
    expect(open.value).toBe(true)
    open.value = false
    expect(open.value).toBe(false)
    expect(onChange).toHaveBeenCalledOnce()
  })
})
