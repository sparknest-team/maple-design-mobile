import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import PeopleSelect from '..'
import Select from '../../select'
import SelectMenu from '../../select/SelectMenu'

const people = [
  { value: 'a', label: 'Alice', avatar: '/alice.png' },
  { value: 'b', label: 'Bob' },
  { value: 'locked', label: 'Locked', disabled: true },
]
const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const Surface = { template: '<div><slot/><slot name="content"/></div>' }
function setup(props: Record<string, unknown> = {}) {
  const owner = mount(PeopleSelect, {
    props: { multiple: true, editMode: 'direct', options: people, ...props },
    global: { stubs: { Trigger: Surface, MpTrigger: Surface, Dialog: Surface, MpDialog: Surface, teleport: true } },
  })
  owners.push(owner)
  return owner
}

test('multiple defaults are independent arrays and uncontrolled changes remain arrays', async () => {
  const owner = setup()
  const other = setup()
  const select = owner.getComponent(Select)
  expect(select.props('modelValue')).toEqual([])
  expect(select.props('modelValue')).not.toBe(other.getComponent(Select).props('modelValue'))
  select.vm.$emit('change', ['a', 'b'])
  await flushPromises()
  expect(select.props('modelValue')).toEqual(['a', 'b'])
  expect(owner.emitted('change')).toEqual([[['a', 'b']]])
  await owner.setProps({ defaultValue: ['locked'] })
  expect(select.props('modelValue')).toEqual(['a', 'b'])
})

test('clicking options selects multiple people and clear retains disabled selections', async () => {
  const owner = setup({ clearable: true })
  owner.getComponent(SelectMenu).props('controller').handleOpenChange(true)
  await flushPromises()
  for (const name of ['Alice', 'Bob']) {
    await owner
      .findAll('[role="option"]')
      .find((option) => option.text().includes(name))!
      .trigger('click')
    await flushPromises()
  }
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['a', 'b']])
  await owner.get('.mp-tag__close-btn').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['b']])
  await owner.get('button[class*="clear-btn"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([[]])
  await owner.setProps({ modelValue: ['a', 'locked'] })
  await owner.get('button[class*="clear-btn"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['locked']])
})

test('explicit null clearing is preserved in multiple mode', async () => {
  const owner = setup({ defaultValue: ['a', 'b'], clearable: true, emptyValue: null })
  await owner.get('button[class*="clear-btn"]').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toEqual([[null]])
})

test('remote searches retain all selected labels and do not retain removed identities', async () => {
  const request = vi.fn(async (query: string) => (query ? [{ value: 'c', label: 'Carol' }] : people))
  const owner = setup({ modelValue: ['b', 'a'], options: request })
  await flushPromises()
  owner.getComponent(Select).vm.$emit('search', 'c')
  await flushPromises()
  expect(owner.text()).toContain('Alice')
  expect(owner.text()).toContain('Bob')
  await owner.setProps({ readPretty: true })
  expect(owner.findAll('.mp-people-select-person__name').map((person) => person.text())).toEqual(['Bob', 'Alice'])
  await owner.setProps({ modelValue: [] })
  await owner.setProps({ modelValue: ['a'] })
  expect(owner.text()).not.toContain('Alice')
})

test('multiple reading resolves fallback per identity and actions receive their own person', async () => {
  const action = vi.fn()
  const fallback = vi.fn((id: string) => ({ value: id, label: `Person ${id}` }))
  const owner = setup({
    isLabel: true,
    modelValue: ['x', 'y'],
    options: [],
    fallbackOption: fallback,
    renderActions: ({ person }: { person: { value: string } }) =>
      h('button', { onClick: () => action(person.value) }, person.value),
  })
  expect(owner.text()).toContain('Person x')
  expect(owner.text()).toContain('Person y')
  await owner.findAll('button')[1].trigger('click')
  expect(action).toHaveBeenCalledWith('y')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

for (const state of ['disabled', 'readonly', 'loading']) {
  test(`${state} prevents multiple changes`, async () => {
    const owner = setup({ [state]: true, modelValue: ['a'] })
    owner.getComponent(Select).vm.$emit('change', ['a', 'b'])
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  })
}

test('deferred reference respects disabled fallback for unmatched people', async () => {
  const owner = setup({
    editMode: 'popup',
    modelValue: ['b', 'unknown-id', 'a'],
    fallbackOption: false,
    defaultText: 'Unavailable',
  })
  const label = () => owner.get('[aria-haspopup="dialog"]').text()
  expect(label()).toContain('Bob, Unavailable, Alice')
  await owner.setProps({ multiple: false, modelValue: 'unknown-id', label: 'Old name' })
  expect(label()).toContain('Unavailable')
  expect(label()).not.toContain('Old name')
  await owner.setProps({ options: [...people, { value: 'unknown-id', label: 'New name' }] })
  expect(label()).toContain('New name')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('deferred multiple editing commits an array only after confirmation', async () => {
  const owner = setup({ editMode: 'popup', defaultValue: ['a'] })
  await owner.get('[aria-haspopup="dialog"]').trigger('click')
  await flushPromises()
  owner.getComponent(SelectMenu).props('controller').handleOpenChange(true)
  await flushPromises()
  await owner
    .findAll('[role="option"]')
    .find((option) => option.text().includes('Bob'))!
    .trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await owner
    .get('.mp-field-presentation__footer')
    .findAll('button')
    .find((button) => ['确定', '确认'].includes(button.text()))!
    .trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['a', 'b']])
})
