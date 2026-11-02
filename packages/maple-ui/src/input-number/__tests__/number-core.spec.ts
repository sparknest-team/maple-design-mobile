import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import InputNumber from '..'
import { clampNumber, getNumberPrecision, parseNumberInput } from '../number-value'
import { useStepRepeat } from '../use-step-repeat'

const wrappers: Array<ReturnType<typeof mount>> = []
function render(props: Record<string, unknown> = {}) {
  const wrapper = mount(InputNumber, { props: { editMode: 'direct', ...props } })
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})

describe('numeric source contract', () => {
  test('accounts for scientific notation and caps native formatting precision', () => {
    expect(getNumberPrecision(1e-7, 0)).toBe(7)
    expect(getNumberPrecision(1.2e-7, 2)).toBe(8)
    expect(getNumberPrecision(1e2, 2)).toBe(2)
    expect(getNumberPrecision(1, undefined)).toBeUndefined()
    expect(getNumberPrecision(1e-200, 200)).toBe(100)
  })

  test('parses once, preserves intermediate text and rejects non-finite values', () => {
    const parser = vi.fn((value: string) => value.slice(1))
    expect(parseNumberInput('$12', parser)).toEqual({ text: '12', number: 12, intermediate: false })
    expect(parser).toHaveBeenCalledTimes(1)
    expect(parseNumberInput('1.').intermediate).toBe(true)
    expect(parseNumberInput('Infinity').number).toBeUndefined()
    expect(parseNumberInput('NaN').number).toBeUndefined()
    expect(clampNumber(0, -10, -1)).toBe(-1)
  })

  test('does not parse formatted output or parse input twice', async () => {
    const parser = vi.fn((value: string) => value.slice(1))
    const wrapper = render({ defaultValue: 1, modelEvent: 'input', parser, formatter: (value: string) => '$' + value })
    parser.mockClear()
    await wrapper.get('input').trigger('focus')
    await wrapper.get('input').setValue('$12')
    expect(parser).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe(12)
    expect(wrapper.emitted('update:modelValue')).toEqual([[12]])
    await wrapper.get('input').trigger('blur')
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(12)
    expect(parser).toHaveBeenCalledTimes(1)
  })

  test('keeps small scientific steps', async () => {
    const wrapper = render({ defaultValue: 0, step: 1e-7, precision: 0 })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[1e-7]])
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('0.0000001')
  })

  test('starts empty values inside a negative-only range', async () => {
    const wrapper = render({ max: -1 })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[-1]])
  })

  test('clamps after rounding at a non-aligned boundary', async () => {
    const wrapper = render({ defaultValue: 0.1, max: 0.15, precision: 1, step: 0.1 })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[0.15]])
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('0.15')
  })

  test('external synchronization does not parse or emit', async () => {
    const parser = vi.fn((value: string) => value)
    const wrapper = render({ modelValue: 1, parser })
    await wrapper.setProps({ modelValue: 5 })
    expect(parser).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('5')
  })

  test('long presses call the step directly and stop on window release', async () => {
    vi.useFakeTimers()
    const wrapper = render({ defaultValue: 0 })
    const button = wrapper.get('button')
    const nativeDown = vi.fn()
    button.element.addEventListener('pointerdown', nativeDown)
    await button.trigger('pointerdown', { button: 0, isPrimary: true })
    vi.advanceTimersByTime(950)
    expect(wrapper.emitted('update:modelValue')).toEqual([[1], [2], [3]])
    expect(nativeDown).toHaveBeenCalledTimes(1)
    window.dispatchEvent(new Event('pointerup'))
    vi.advanceTimersByTime(2000)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
  })

  test('stops at bounds and never reschedules disabled steps', async () => {
    vi.useFakeTimers()
    const wrapper = render({ defaultValue: 0, max: 2 })
    await wrapper.get('button').trigger('pointerdown', { button: 0, isPrimary: true })
    vi.advanceTimersByTime(2000)
    expect(wrapper.emitted('update:modelValue')).toEqual([[1], [2]])
    await wrapper.setProps({ disabled: true })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
  })

  test('cleans repeat callbacks on unmount', async () => {
    vi.useFakeTimers()
    const update = vi.fn()
    const wrapper = render({ defaultValue: 0, 'onUpdate:modelValue': update })
    await wrapper.get('button').trigger('pointerdown', { button: 0, isPrimary: true })
    wrapper.unmount()
    vi.advanceTimersByTime(5000)
    expect(update.mock.calls).toEqual([[1]])
  })

  test('instances have separate timers and window blur stops both', async () => {
    vi.useFakeTimers()
    const first = render({ defaultValue: 0 })
    const second = render({ defaultValue: 10 })
    await first.get('button').trigger('pointerdown', { button: 0, isPrimary: true })
    await second.get('button').trigger('pointerdown', { button: 0, isPrimary: true })
    await first.get('button').trigger('pointerleave')
    vi.advanceTimersByTime(800)
    expect(first.emitted('update:modelValue')).toEqual([[1]])
    expect(second.emitted('update:modelValue')).toEqual([[11], [12]])
    window.dispatchEvent(new Event('blur'))
    vi.advanceTimersByTime(2000)
    expect(second.emitted('update:modelValue')).toHaveLength(2)
  })

  test('deactivation disposes a kept-alive repeat', async () => {
    vi.useFakeTimers()
    const visible = ref(true)
    const step = vi.fn(() => true)
    const Child = defineComponent({
      setup() {
        const repeat = useStepRepeat()
        return () => h('button', { onClick: () => repeat.start(step) })
      },
    })
    const wrapper = mount(
      defineComponent({
        setup: () => () => h(KeepAlive, null, { default: () => (visible.value ? h(Child) : null) }),
      }),
    )
    wrappers.push(wrapper)
    await wrapper.get('button').trigger('click')
    visible.value = false
    await nextTick()
    vi.advanceTimersByTime(2000)
    expect(step).not.toHaveBeenCalled()
  })
  test('readonly changes stop an active long press immediately', async () => {
    vi.useFakeTimers()
    const wrapper = render({ defaultValue: 0 })
    await wrapper.get('button').trigger('pointerdown', { button: 0, isPrimary: true })
    await wrapper.setProps({ readonly: true })
    vi.advanceTimersByTime(1600)
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
  })

  test('stopping within a repeat callback never schedules another tick', async () => {
    vi.useFakeTimers()
    const step = vi.fn(() => {
      repeat.stop()
      return true
    })
    let repeat: ReturnType<typeof useStepRepeat>
    const wrapper = mount(
      defineComponent({
        setup() {
          repeat = useStepRepeat()
          return () => h('button', { onClick: () => repeat.start(step) })
        },
      }),
    )
    wrappers.push(wrapper)
    await wrapper.get('button').trigger('click')
    vi.advanceTimersByTime(3000)
    expect(step).toHaveBeenCalledTimes(1)
  })
})
