import { reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Input, { InputPassword } from '..'
import Textarea from '../../textarea'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
const invalidLimits: [string, unknown][] = [
  ['negative', -1],
  ['NaN', NaN],
  ['infinity', Infinity],
  ['negative infinity', -Infinity],
  ['negative object', { length: -1 }],
  ['NaN object', { length: NaN }],
  ['infinite object', { length: Infinity }],
  ['missing length', {}],
  ['string length', { length: '2' }],
  ['invalid errorOnly', { length: 2, errorOnly: 'yes' }],
  ['array', []],
]
for (const [name, Field, selector] of [
  ['Input', Input, 'input'],
  ['Textarea', Textarea, 'textarea'],
] as const) {
  describe(`${name} safe length parameters`, () => {
    test.each(invalidLimits)('%s diagnoses through Vue and falls back to no limit', async (_label, maxLength) => {
      const warnings: string[] = []
      const owner = mount(Field as any, {
        props: { editMode: 'direct', maxLength },
        global: { config: { warnHandler: (message) => warnings.push(message) } },
      })
      owners.push(owner)
      await owner.get(selector).setValue('abcd')
      expect(owner.get(selector).element.value).toBe('abcd')
      expect(warnings.some((message) => message.includes('maxLength') && message.includes('Invalid prop'))).toBe(true)
    })
    test('null behaves as an omitted optional limit without crashing', async () => {
      const owner = mount(Field as any, { props: { editMode: 'direct', maxLength: null } })
      owners.push(owner)
      await owner.get(selector).setValue('abcd')
      expect(owner.get(selector).element.value).toBe('abcd')
    })
    test('zero is unlimited and error-only keeps text while announcing an error', async () => {
      const owner = mount(Field as any, { props: { editMode: 'direct', maxLength: 0 } })
      owners.push(owner)
      const input = owner.get(selector)
      await input.setValue('abcd')
      expect(input.element.value).toBe('abcd')
      await owner.setProps({ maxLength: { length: 2, errorOnly: true } })
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.element.value).toBe('abcd')
      await owner.setProps({ maxLength: { length: 2, errorOnly: false } })
      await input.setValue('abcde')
      expect(input.element.value).toBe('ab')
    })
    test('nested limit changes remain reactive and invalid nested values cannot slice from the end', async () => {
      const limit = reactive({ length: 2 })
      const owner = mount(Field as any, { props: { editMode: 'direct', maxLength: limit } })
      owners.push(owner)
      const input = owner.get(selector)
      await input.setValue('abcd')
      expect(input.element.value).toBe('ab')
      limit.length = -1
      await flushPromises()
      await input.setValue('abcdef')
      expect(input.element.value).toBe('abcdef')
    })
  })
}

test('Password forwards model, input and optional-source change notifications once', async () => {
  const order: string[] = []
  const owner = mount(InputPassword, {
    props: {
      onInput: () => order.push('input'),
      'onUpdate:modelValue': () => order.push('model'),
      onChange: () => order.push('change'),
    },
  })
  owners.push(owner)
  const input = owner.get('input')
  await input.trigger('focus')
  await input.setValue('password')
  await input.trigger('blur')
  expect(order).toEqual(['input', 'model', 'change'])
})
test('a disabled Password click does not consume the component once listener', async () => {
  const once = vi.fn()
  const owner = mount(InputPassword, { props: { disabled: true }, attrs: { onClickOnce: once } })
  owners.push(owner)
  await owner.get('input').trigger('click')
  expect(once).not.toHaveBeenCalled()
  await owner.setProps({ disabled: false })
  await owner.get('input').trigger('click')
  await owner.get('input').trigger('click')
  expect(once).toHaveBeenCalledTimes(1)
})
test('Password notification Promises do not create a loading task', async () => {
  const owner = mount(InputPassword, { props: { onChange: () => new Promise(() => {}) } })
  owners.push(owner)
  const input = owner.get('input')
  await input.trigger('focus')
  await input.setValue('password')
  await input.trigger('blur')
  expect(input.attributes('aria-busy')).toBeUndefined()
  expect(input.element.disabled).toBe(false)
})
