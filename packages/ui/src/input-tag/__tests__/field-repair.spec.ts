import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import InputTag from '..'
import FieldDecorator from '../../field-decorator'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import InputGroup from '../../input/InputGroup.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
function render(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  const owner = mount(InputTag, { props: { editMode: 'direct', ...props }, attrs, attachTo: document.body })
  owners.push(owner)
  return owner
}
for (const state of ['disabled', 'readonly'] as const) {
  test(`inherits Form ${state} and allows explicit false`, async () => {
    const owner = mount(Form, {
      props: { [state]: true },
      slots: {
        default: () => [
          h(InputTag, { editMode: 'direct', defaultValue: ['a'] }),
          h(InputTag, { editMode: 'direct', [state]: false }),
        ],
      },
    })
    owners.push(owner)
    await flushPromises()
    const fields = owner.findAllComponents(InputTag)
    expect(fields[0].get('input').attributes(state)).toBeDefined()
    expect(fields[1].get('input').attributes(state)).toBeUndefined()
    await owner.setProps({ [state]: false })
    expect(fields[0].get('input').attributes(state)).toBeUndefined()
  })
  test(`FormItem ${state} overrides Form and field overrides item`, async () => {
    const owner = mount(Form, {
      props: { [state]: true },
      slots: {
        default: () =>
          h(
            FormItem,
            { [state]: false },
            {
              default: () => [h(InputTag, { editMode: 'direct' }), h(InputTag, { editMode: 'direct', [state]: true })],
            },
          ),
      },
    })
    owners.push(owner)
    await flushPromises()
    const fields = owner.findAllComponents(InputTag)
    expect(fields[0].get('input').attributes(state)).toBeUndefined()
    expect(fields[1].get('input').attributes(state)).toBeDefined()
  })
  test(`${state} suppresses editor, create, clear and tag checks`, async () => {
    const owner = render({
      [state]: true,
      clearable: true,
      defaultValue: [{ value: 'a', label: 'A', closable: true, tagProps: { checkable: true } }],
    })
    const input = owner.get('input')
    await input.setValue('b')
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('update:inputValue')).toBeUndefined()
    expect(owner.find('button[class*=clear]').exists()).toBe(false)
    expect(owner.find('[role=checkbox]').exists()).toBe(false)
  })
}
test('inherits FormItem error presentation and supports explicit false', async () => {
  const owner = mount(FormItem, {
    props: { validateStatus: 'error' },
    slots: { default: () => [h(InputTag, { editMode: 'direct' }), h(InputTag, { editMode: 'direct', error: false })] },
  })
  owners.push(owner)
  await flushPromises()
  const fields = owner.findAllComponents(InputTag)
  expect(fields[0].getComponent(FieldDecorator).props('error')).toBe(true)
  expect(fields[0].get('input').attributes('aria-invalid')).toBe('true')
  expect(fields[1].getComponent(FieldDecorator).props('error')).toBe(false)
})
test('InputGroup provides state, size and variant without changing standalone filled', async () => {
  const owner = mount(InputGroup, {
    props: { disabled: true, readonly: true, size: 'xl', variant: 'outline' },
    slots: {
      default: () => [
        h(InputTag, { editMode: 'direct' }),
        h(InputTag, { editMode: 'direct', disabled: false, readonly: false, size: 'sm', variant: 'filled' }),
      ],
    },
  })
  owners.push(owner)
  const fields = owner.findAllComponents(InputTag)
  expect(fields[0].get('input').attributes('disabled')).toBeDefined()
  expect(fields[0].get('input').attributes('readonly')).toBeDefined()
  expect(fields[0].getComponent(FieldDecorator).props()).toMatchObject({ size: 'xl', variant: 'outline' })
  expect(fields[1].getComponent(FieldDecorator).props()).toMatchObject({
    disabled: false,
    readonly: false,
    size: 'sm',
    variant: 'filled',
  })
  expect(render().getComponent(FieldDecorator).props('variant')).toBe('filled')
})
test('native id/name/aria/data/constraints belong to input and root keeps class/style', () => {
  const owner = render(
    {},
    {
      id: 'native-tag',
      name: 'query',
      'aria-label': 'Tags',
      'aria-describedby': 'help',
      'data-probe': 'native',
      required: true,
      maxlength: 8,
      tabindex: 3,
      class: 'custom-shell',
      style: { color: 'red' },
    },
  )
  const input = owner.get('input')
  expect(input.attributes()).toMatchObject({
    id: 'native-tag',
    name: 'query',
    'aria-label': 'Tags',
    'aria-describedby': 'help',
    'data-probe': 'native',
    required: '',
    maxlength: '8',
    tabindex: '3',
  })
  expect(owner.attributes('id')).toBeUndefined()
  expect(owner.attributes('aria-label')).toBeUndefined()
  expect(owner.classes()).toContain('custom-shell')
  expect(owner.attributes('style')).toContain('red')
})
test('native draft values initialize from inputValue/defaultInputValue and remain controlled', async () => {
  const owner = render({ inputValue: 'accepted', defaultInputValue: 'default' })
  expect(owner.get('input').element.value).toBe('accepted')
  await owner.get('input').setValue('rejected')
  await flushPromises()
  expect(owner.get('input').element.value).toBe('accepted')
  expect(render({ defaultInputValue: 'draft' }).get('input').element.value).toBe('draft')
})
test('native keyboard preventDefault can veto Enter creation', async () => {
  const owner = render({}, { onKeydown: (event: KeyboardEvent) => event.preventDefault() })
  await owner.get('input').setValue('veto')
  await owner.get('input').trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
test('default clear is a named native button and does not submit a form', async () => {
  const owner = render({ defaultValue: ['a'], clearable: true })
  const clear = owner.get('button[class*=clear]')
  expect(clear.attributes()).toMatchObject({ type: 'button', 'aria-label': '清空' })
  await clear.trigger('click')
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([])
  expect(owner.emitted('clear')).toHaveLength(1)
})
test('field clear-icon slot receives its existing clear action', async () => {
  const owner = mount(InputTag, {
    props: { editMode: 'direct', defaultValue: ['a'], clearable: true },
    slots: {
      'clear-icon': ({ clear }: any) =>
        h('button', { type: 'button', id: 'custom-clear', onClick: clear }, 'Clear tags'),
    },
  })
  owners.push(owner)
  await owner.get('#custom-clear').trigger('click')
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([])
})
test('manual line loading announces busy while keeping input editable', () => {
  const owner = render({ loading: true, loadingMode: 'line' })
  expect(owner.get('input').attributes('aria-busy')).toBe('true')
  expect(owner.find('.mp-field-decorator__loading-line').exists()).toBe(true)
  expect(owner.find('.mp-field-decorator__loading-icon').exists()).toBe(false)
  expect(owner.get('input').attributes('readonly')).toBeUndefined()
})
test('compositionend plus matching input publishes the draft once', async () => {
  const owner = render()
  const input = owner.get('input')
  await input.trigger('compositionstart')
  input.element.value = '中文'
  await input.trigger('compositionend')
  input.element.value = '中文'
  await input.trigger('input')
  expect(owner.emitted('update:inputValue')).toEqual([['中文']])
  expect(owner.emitted('input-value-change')).toHaveLength(1)
})
for (const state of ['disabled', 'readonly'] as const) {
  test(`${state} during composition rejects late completion and allows a fresh edit later`, async () => {
    const owner = render({ defaultInputValue: 'accepted' })
    const input = owner.get('input')
    await input.trigger('compositionstart')
    input.element.value = 'late'
    await owner.setProps({ [state]: true })
    await input.trigger('compositionend')
    expect(owner.emitted('update:inputValue')).toBeUndefined()
    expect(input.element.value).toBe('accepted')
    await owner.setProps({ [state]: false })
    await input.setValue('late')
    expect(owner.emitted('update:inputValue')).toEqual([['late']])
  })
}
test('a newer composition retires queued normalization', async () => {
  const owner = render({ inputValue: 'accepted' })
  const input = owner.get('input')
  input.element.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
  input.element.value = 'first'
  input.element.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }))
  input.element.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
  input.element.value = 'new session'
  await flushPromises()
  expect(input.element.value).toBe('new session')
})

test('native listener option modifiers never migrate onto clear controls', async () => {
  let keys = 0
  const owner = render(
    { defaultValue: ['a'], clearable: true },
    {
      onKeyupOnce: () => {
        keys++
      },
    },
  )
  const clear = owner.get('button[class*=clear]')
  await clear.trigger('keyup', { key: 'x' })
  expect(keys).toBe(0)
  await owner.get('input').trigger('keyup', { key: 'x' })
  await owner.get('input').trigger('keyup', { key: 'y' })
  expect(keys).toBe(1)
})
test('controlled duplicate composition input restores the accepted native value', async () => {
  const owner = render({ inputValue: 'accepted' })
  const input = owner.get('input')
  await input.trigger('compositionstart')
  input.element.value = 'candidate'
  await input.trigger('compositionend')
  input.element.value = 'candidate'
  await input.trigger('input')
  await flushPromises()
  expect(owner.emitted('update:inputValue')).toEqual([['candidate']])
  expect(input.element.value).toBe('accepted')
})
test('native auto IDs are unique and a supplied ID is owned once', () => {
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h('div', [
          h(InputTag, { editMode: 'direct' }),
          h(InputTag, { editMode: 'direct' }),
          h(InputTag, { editMode: 'direct', id: 'supplied-tag' }),
        ]),
    }),
  )
  owners.push(owner)
  const ids = owner.findAll('input').map((input) => input.attributes('id'))
  expect(ids.every(Boolean)).toBe(true)
  expect(new Set(ids).size).toBe(3)
  expect(owner.findAll('#supplied-tag')).toHaveLength(1)
})

for (const state of ['disabled', 'readonly'] as const) {
  test(`deferred InputTag respects Group ${state} before opening`, async () => {
    const owner = mount(InputGroup, {
      props: { [state]: true },
      slots: { default: () => h(InputTag, { editMode: 'popup' }) },
      attachTo: document.body,
    })
    owners.push(owner)
    const field = owner.getComponent(InputTag)
    ;(field.vm as any).focus()
    await flushPromises()
    expect(field.emitted('update:open')).toBeUndefined()
    expect(field.find('input').exists()).toBe(false)
  })
}
