import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { Decimal } from 'decimal.js'
import { expect, test, vi } from 'vitest'
import Slider from '..'
import { sliderBounds, snap, stepValue } from '../model'

test('representable tiny steps advance through keyboard proposals and reverse exactly', async () => {
  const owner = mount(Slider, { props: { editMode: 'direct', min: 0, max: 1e-11, step: 1e-13, defaultValue: 0 } })
  try {
    await owner.get('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    expect(owner.emitted('change')?.at(-1)?.[0]).toBe(1e-13)
    await owner.get('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(owner.emitted('change')?.at(-1)?.[0]).toBe(0)
  } finally {
    owner.unmount()
  }
})
for (const step of [1e-13, 1e-200, Number.MIN_VALUE]) {
  test(`snap preserves the finite step ${step}`, () => {
    const bounds = sliderBounds(0, step * 10, step)
    expect(snap(step, bounds)).toBe(step)
    expect(stepValue(step, 1, bounds)).toBe(step * 2)
    expect(stepValue(step * 2, -1, bounds)).toBe(step)
  })
}
for (const range of [false, true]) {
  test(`blur removes focus from every owned numeric input with range=${range}`, async () => {
    const owner = mount(Slider, {
      attachTo: document.body,
      props: { editMode: 'direct', showInput: true, range, defaultValue: range ? [20, 40] : 20 },
    })
    const outside = document.createElement('input')
    document.body.append(outside)
    try {
      await flushPromises()
      for (const input of owner.findAll('input')) {
        ;(input.element as HTMLInputElement).focus()
        expect(document.activeElement).toBe(input.element)
        ;(owner.vm as unknown as { blur: () => void }).blur()
        expect(document.activeElement).not.toBe(input.element)
      }
      outside.focus()
      ;(owner.vm as unknown as { blur: () => void }).blur()
      expect(document.activeElement).toBe(outside)
    } finally {
      owner.unmount()
      outside.remove()
    }
  })
}
test('invalid orientation and tooltip policies produce development diagnostics', async () => {
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(Slider as any, { props: { editMode: 'direct', orientation: 'diagonal', showTooltip: 'never' } })
  try {
    await flushPromises()
    const messages = warning.mock.calls.flat().join(' ')
    expect(messages).toContain('orientation')
    expect(messages).toContain('showTooltip')
  } finally {
    owner.unmount()
    warning.mockRestore()
  }
})

test('grid rounding keeps decimal min anchors, off-grid endpoints and reversible steps', () => {
  const anchored = sliderBounds(0.1, 1, 0.1)
  expect(snap(0.15, anchored)).toBe(0.2)
  expect(snap(0.30000000000000004, anchored)).toBe(0.3)
  const endpoint = sliderBounds(0, 1, 0.3)
  expect(stepValue(1, -1, endpoint)).toBe(0.9)
  expect(stepValue(0.9, 1, endpoint)).toBe(1)
  const thirds = sliderBounds(0, 2, 0.3333333333333333)
  expect(stepValue(1.3333333333333333, -1, thirds)).toBe(0.9999999999999999)
})
test('an application Decimal configuration does not alter the slider grid', () => {
  const original = { precision: Decimal.precision, rounding: Decimal.rounding, minE: Decimal.minE, maxE: Decimal.maxE }
  try {
    Decimal.set({ precision: 2, rounding: Decimal.ROUND_DOWN, minE: -1, maxE: 1 })
    expect(stepValue(1e-13, 1, sliderBounds(0, 1e-11, 1e-13))).toBe(2e-13)
  } finally {
    Decimal.set(original)
  }
})
test('tiny range keyboard updates retain ordered, noncrossing endpoints', async () => {
  const owner = mount(Slider, {
    props: { editMode: 'direct', range: true, defaultValue: [0, 2e-13], max: 1e-11, step: 1e-13 },
  })
  try {
    const thumbs = owner.findAll('[role="slider"]')
    await thumbs[0]!.trigger('keydown', { key: 'ArrowRight' })
    expect(owner.emitted('change')?.at(-1)?.[0]).toEqual([1e-13, 2e-13])
    await thumbs[0]!.trigger('keydown', { key: 'ArrowRight' })
    await thumbs[0]!.trigger('keydown', { key: 'ArrowRight' })
    expect(owner.emitted('change')).toHaveLength(2)
    expect(owner.emitted('end')?.at(-1)?.[0]).toEqual([2e-13, 2e-13])
  } finally {
    owner.unmount()
  }
})
test('read slot retains nullable model scope and formatted text', async () => {
  const read = vi.fn((_scope: unknown) => h('span', 'Reading'))
  const owner = mount(Slider, { props: { readPretty: true, modelValue: null }, slots: { read } })
  try {
    await flushPromises()
    expect(read.mock.calls.at(-1)?.[0]).toEqual({ value: null, text: '' })
  } finally {
    owner.unmount()
  }
})
