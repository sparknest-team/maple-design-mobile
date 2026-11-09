import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import DefaultInputNumber, { _InputNumberComponent, InputNumber } from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
test('named and default exports identify the installed InputNumber', () => {
  expect(InputNumber).toBe(DefaultInputNumber)
  expect(_InputNumberComponent).toBe(DefaultInputNumber)
})
for (const [label, bounds, expected] of [
  ['NaN minimum', { min: NaN, max: 5 }, 3],
  ['NaN maximum', { min: -5, max: NaN }, 3],
  ['inverted range', { min: 5, max: 1 }, 3],
  ['positive infinite minimum', { min: Infinity }, 3],
  ['negative infinite maximum', { max: -Infinity }, 3],
] as const) {
  test(`${label} diagnoses and restores a usable range`, async () => {
    const warnings: string[] = []
    const owner = mount(DefaultInputNumber, {
      props: { editMode: 'direct', ...bounds },
      global: { config: { warnHandler: (message) => warnings.push(message) } },
    })
    owners.push(owner)
    const input = owner.get('input')
    await input.setValue('3')
    await input.trigger('blur')
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe(expected)
    expect(input.element.value).toBe(String(expected))
    if (label === 'inverted range') {
      expect(input.attributes('aria-valuemin')).toBeUndefined()
      expect(input.attributes('aria-valuemax')).toBeUndefined()
    }
    expect(warnings.some((message) => message.includes('Invalid prop') && /min|max/.test(message))).toBe(true)
  })
}
test('legal infinite boundaries, negatives and zero remain valid', async () => {
  const warnings: string[] = []
  const owner = mount(DefaultInputNumber, {
    props: { editMode: 'direct', min: -Infinity, max: Infinity },
    global: { config: { warnHandler: (message) => warnings.push(message) } },
  })
  owners.push(owner)
  const input = owner.get('input')
  await input.setValue('-3')
  await input.trigger('blur')
  await flushPromises()
  expect(input.element.value).toBe('-3')
  await owner.setProps({ min: -5, max: 0 })
  await input.setValue('0')
  await input.trigger('blur')
  await flushPromises()
  expect(input.element.value).toBe('0')
  expect(warnings).toEqual([])
})
test('approved clear notifies clear before input, model and change', async () => {
  const order: string[] = []
  let allow: (() => void) | undefined
  const owner = mount(DefaultInputNumber, {
    props: {
      editMode: 'direct',
      defaultValue: 3,
      clearable: true,
      beforeCommit: (_payload, done) => {
        allow = () => done()
      },
      onClear: () => order.push('clear'),
      onInput: () => order.push('input'),
      'onUpdate:modelValue': () => order.push('model'),
      onChange: () => order.push('change'),
    },
  })
  owners.push(owner)
  await owner.get('button[class*="clear"]').trigger('click')
  await flushPromises()
  expect(order).toEqual([])
  expect(allow).toBeTypeOf('function')
  allow?.()
  await flushPromises()
  expect(order).toEqual(['clear', 'input', 'model', 'change'])
})
test('rejected clear emits no action or model notification', async () => {
  const owner = mount(DefaultInputNumber, {
    props: { editMode: 'direct', defaultValue: 3, clearable: true, beforeCommit: () => false },
  })
  owners.push(owner)
  await owner.get('button[class*="clear"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('clear')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(owner.get('input').element.value).toBe('3')
})
test('clearing an intermediate empty-model draft does not invent a changed numeric value', async () => {
  const owner = mount(DefaultInputNumber, { props: { editMode: 'direct', clearable: true } })
  owners.push(owner)
  await owner.get('input').setValue('-')
  await owner.get('button[class*="clear"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('clear')).toHaveLength(1)
  expect(owner.emitted('change')).toBeUndefined()
  expect(owner.get('input').element.value).toBe('')
})

test('clear after input-mode publication reports the changed current model once', async () => {
  const owner = mount(DefaultInputNumber, { props: { editMode: 'direct', modelEvent: 'input', clearable: true } })
  owners.push(owner)
  await owner.get('input').setValue('3')
  await flushPromises()
  await owner.get('button[class*="clear"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.map((args) => args[0])).toEqual([3, undefined])
  expect(owner.emitted('change')?.map((args) => args[0])).toEqual([undefined])
})
