import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Input from '../../../input'
import InputNumber from '../../../input-number'
import Switch from '../../../switch'
import Textarea from '../../../textarea'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const cases = [
  { name: 'Input', component: Input, value: 'old', next: 'new', selector: 'input' },
  { name: 'Textarea', component: Textarea, value: 'old', next: 'new', selector: 'textarea' },
  { name: 'InputNumber', component: InputNumber, value: 1, next: 5, selector: 'input' },
  { name: 'Switch', component: Switch, value: false, next: true, selector: '[role=switch]' },
]
async function fixture(item: (typeof cases)[number]) {
  const owner = mount(item.component as any, {
    attachTo: document.body,
    props: {
      modelValue: item.value,
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      onChange: () => new Promise(() => {}),
    },
  })
  owners.push(owner)
  await flushPromises()
  if (!owner.getComponent(FieldPresentation).props('open')) {
    await owner.get('.mp-field-presentation__reference').trigger('click')
    await flushPromises()
  }
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
  const panel = owner.get('.mp-field-presentation__panel')
  if (item.name === 'Switch') {
    await panel.get(item.selector).trigger('click')
  } else {
    ;(panel.get(item.selector).element as HTMLElement).focus()
    await panel.get(item.selector).setValue(String(item.next))
  }
  await flushPromises()
  return { owner, panel }
}
for (const item of cases) {
  test(`${item.name} publishes the actual save-button event after deferred confirmation`, async () => {
    const { owner, panel } = await fixture(item)
    const button = panel
      .findAll('footer button')
      .find((button) => /^(确认|保存|确定|Confirm|Save)$/.test(button.text()))!
    await button.trigger('click')
    await flushPromises()
    const args = owner.emitted('change')?.[0]
    expect(args?.[0]).toBe(item.next)
    expect(args?.[1]).toBeInstanceOf(Event)
    expect((args?.[1] as Event)?.type).toBe('click')
    expect((args?.[1] as Event)?.target).toBe(button.element)
  })
  test(`${item.name} preserves an explicitly supplied keyboard confirmation source`, async () => {
    const { owner, panel } = await fixture(item)
    await (owner.getComponent(FieldPresentation).props('commit') as (event: Event) => Promise<unknown>)(
      new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true }),
    )
    await flushPromises()
    const args = owner.emitted('change')?.[0]
    expect(args?.[0]).toBe(item.next)
    expect(args?.[1]).toBeInstanceOf(KeyboardEvent)
    expect((args?.[1] as KeyboardEvent)?.key).toBe('Enter')
  })
  test(`${item.name} internal handoff can confirm without inventing a DOM event`, async () => {
    const { owner } = await fixture(item)
    await (owner.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(owner.emitted('change')?.[0]).toEqual([item.next])
  })
}

for (const custom of [false, true]) {
  test(`confirmation keeps ${custom ? 'custom tuple' : 'value-only'} notifications unchanged`, async () => {
    const Base = defineComponent({
      props: {
        modelValue: String,
        editMode: String,
        defaultOpen: Boolean,
        popupContainer: { type: [Boolean, String, Object, Function], default: undefined },
      },
      emits: ['update:modelValue', 'change'],
      setup:
        (props, { emit }) =>
        () =>
          h('input', {
            value: props.modelValue,
            onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
          }),
    })
    const Wrapped = withFieldPresentation(Base, custom ? { changeArgs: (value) => [value, 'formatted'] } : {})
    const owner = mount(Wrapped, {
      attachTo: document.body,
      props: { modelValue: 'old', editMode: 'popup', defaultOpen: true, popupContainer: false },
    })
    owners.push(owner)
    await flushPromises()
    const panel = owner.get('.mp-field-presentation__panel')
    await panel.get('input').setValue('new')
    await panel
      .findAll('footer button')
      .find((button) => /^(确认|保存|确定|Confirm|Save)$/.test(button.text()))!
      .trigger('click')
    await flushPromises()
    expect(owner.emitted('change')?.[0]).toEqual(custom ? ['new', 'formatted'] : ['new'])
  })
}
test('a later confirmation cannot replace the source of an already waiting commit', async () => {
  let resolve!: (allowed: boolean) => void
  const owner = mount(Textarea, {
    attachTo: document.body,
    props: {
      modelValue: 'old',
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      beforeCommit: () =>
        new Promise<boolean>((done) => {
          resolve = done
        }),
    },
  })
  owners.push(owner)
  await flushPromises()
  const panel = owner.get('.mp-field-presentation__panel')
  await panel.get('textarea').setValue('new')
  const button = panel.findAll('footer button').find((button) => /^(确认|保存|确定|Confirm|Save)$/.test(button.text()))!
  await button.trigger('click')
  await flushPromises()
  expect(owner.emitted('change')).toBeUndefined()
  await (owner.getComponent(FieldPresentation).props('commit') as (event: Event) => Promise<unknown>)(
    new KeyboardEvent('keydown', { key: 'Enter' }),
  )
  resolve(true)
  await flushPromises()
  const args = owner.emitted('change')?.[0]
  expect(args?.[0]).toBe('new')
  expect((args?.[1] as Event).type).toBe('click')
  expect((args?.[1] as Event).target).toBe(button.element)
})
