import { defineComponent, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Input, { InputGroup } from '..'
import Textarea from '../../textarea'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})

for (const [name, Component, selector] of [
  ['Input', Input, 'input'],
  ['Textarea', Textarea, 'textarea'],
] as const) {
  describe(`${name} Vue trim model notifications`, () => {
    for (const controlled of [false, true]) {
      test(`does not repeat the trimmed model proposal on blur (${controlled ? 'controlled' : 'uncontrolled'})`, async () => {
        const updates: (string | null)[] = []
        const inputs: string[] = []
        const value = ref('')
        const owner = mount(
          defineComponent({
            setup: () => () =>
              h(Component as any, {
                editMode: 'direct',
                ...(controlled ? { modelValue: value.value } : {}),
                modelModifiers: { trim: true },
                maxLength: 4,
                'onUpdate:modelValue': (next: string | null) => {
                  updates.push(next)
                  if (controlled) {
                    value.value = next ?? ''
                  }
                },
                onInput: (next: string) => inputs.push(next),
              }),
          }),
        )
        owners.push(owner)
        const input = owner.get(selector)
        await input.trigger('focus')
        await input.setValue(' abcde ')
        await flushPromises()
        expect(inputs).toEqual([' abc'])
        expect(updates).toEqual(['abc'])
        expect((input.element as HTMLInputElement).value).toBe(controlled ? 'abc' : ' abc')
        await input.trigger('blur')
        await nextTick()
        expect(updates).toEqual(['abc'])
        expect((input.element as HTMLInputElement).value).toBe('abc')
      })
    }
    test('still trims an initial value and later externally supplied value on commit', async () => {
      const owner = mount(Component as any, {
        props: { editMode: 'direct', defaultValue: ' first ', modelModifiers: { trim: true } },
      })
      owners.push(owner)
      const input = owner.get(selector)
      await input.trigger('focus')
      await input.trigger('blur')
      expect(owner.emitted('update:modelValue')?.map((args) => args[0])).toEqual(['first'])
      await owner.setProps({ modelValue: ' first ' })
      await input.trigger('focus')
      await input.trigger('blur')
      expect(owner.emitted('update:modelValue')?.map((args) => args[0])).toEqual(['first', 'first'])
    })
  })
}

test('Enter commits once and blur does not repeat the trimmed model or change', async () => {
  const updates: (string | null)[] = []
  const owner = mount(Input, {
    props: { defaultValue: '', modelModifiers: { trim: true }, 'onUpdate:modelValue': (next) => updates.push(next) },
  })
  owners.push(owner)
  const input = owner.get('input')
  await input.trigger('focus')
  await input.setValue(' entered ')
  await input.trigger('keydown', { key: 'Enter' })
  await input.trigger('blur')
  expect(updates).toEqual(['entered'])
  expect(owner.emitted('change')?.map((args) => args[0])).toEqual(['entered'])
  expect(owner.emitted('press-enter')).toHaveLength(1)
  expect(input.element.value).toBe('entered')
})

test('standalone hint defaults off; explicit and inherited opt-in remain supported', async () => {
  const owner = mount(Input, { props: { placeholder: 'Account' } })
  owners.push(owner)
  expect(owner.find('label').exists()).toBe(false)
  expect(owner.get('input').attributes('placeholder')).toBe('Account')
  await owner.setProps({ hint: true })
  expect(owner.find('label').exists()).toBe(true)
  expect(owner.get('input').attributes('placeholder')).toBeUndefined()
  await owner.setProps({ hint: false })
  expect(owner.find('label').exists()).toBe(false)
  expect(owner.get('input').attributes('placeholder')).toBe('Account')
  const group = mount(InputGroup, {
    props: { hint: false },
    slots: { default: () => h(Input, { placeholder: 'Grouped' }) },
  })
  owners.push(group)
  expect(group.find('label').exists()).toBe(false)
  expect(group.get('input').attributes('placeholder')).toBe('Grouped')
})

test('group hint opt-in inherits through nested groups and explicit false wins', () => {
  const group = mount(InputGroup, {
    props: { hint: true },
    slots: {
      default: () =>
        h(
          InputGroup,
          {},
          {
            default: () => [h(Input, { placeholder: 'Inherited' }), h(Input, { placeholder: 'Native', hint: false })],
          },
        ),
    },
  })
  owners.push(group)
  const inputs = group.findAll('input')
  expect(inputs[0].attributes('placeholder')).toBeUndefined()
  expect(inputs[1].attributes('placeholder')).toBe('Native')
  expect(group.findAll('label')).toHaveLength(1)
})
