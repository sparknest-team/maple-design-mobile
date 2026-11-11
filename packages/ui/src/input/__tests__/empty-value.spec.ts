import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Input from '..'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import InputNumber from '../../input-number'
import PeopleSelect from '../../people-select'
import Search from '../../search'
import Select from '../../select'
import Textarea from '../../textarea'
import Time from '../../time'
import TimeRange from '../../time-range'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const options = [
  { value: 'a', label: 'Alice' },
  { value: 'z', label: 'Zero' },
]
const cases: [string, any, Record<string, unknown>, unknown][] = [
  ['Input', Input, { defaultValue: 'a', emptyValue: 'EMPTY' }, 'EMPTY'],
  ['Textarea', Textarea, { defaultValue: 'a', emptyValue: () => 'EMPTY' }, 'EMPTY'],
  ['AutoComplete', AutoComplete, { defaultValue: 'a', options, emptyValue: 'EMPTY' }, 'EMPTY'],
  ['Search', Search, { defaultValue: 'a', emptyValue: 'EMPTY' }, 'EMPTY'],
  ['Select', Select, { defaultValue: 'a', options, emptyValue: () => undefined }, undefined],
  ['Select multiple', Select, { defaultValue: ['a'], options, multiple: true, emptyValue: () => ['z'] }, ['z']],
  ['InputNumber', InputNumber, { defaultValue: 10, emptyValue: 0 }, 0],
  ['Cascader', Cascader, { defaultValue: 'a', options, emptyValue: 'z' }, 'z'],
  ['PeopleSelect', PeopleSelect, { defaultValue: 'a', options, emptyValue: 'z' }, 'z'],
  ['Date', DateField, { defaultValue: '2026-09-10', emptyValue: '2026-01-01' }, '2026-01-01'],
  ['DateRange', DateRange, { defaultValue: ['2026-09-10', '2026-10-10'], emptyValue: () => [] }, []],
  ['Time', Time, { defaultValue: '09:00:00', emptyValue: '00:00:00' }, '00:00:00'],
  ['TimeRange', TimeRange, { defaultValue: ['09:00:00', '10:00:00'], emptyValue: () => [] }, []],
]
for (const [name, Component, props, expected] of cases) {
  test(`${name} clears through emptyValue while retaining the model shape`, async () => {
    const owner = mount(Component, { props: { editMode: 'direct', clearable: true, ...props } })
    owners.push(owner)
    await flushPromises()
    await owner.get('.mp-field-decorator__clear-btn').trigger('click')
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(expected)
  })
}
test('protected disabled selections survive even when an empty override is configured', async () => {
  const owner = mount(Select, {
    props: {
      editMode: 'direct',
      multiple: true,
      defaultValue: ['a'],
      options: [{ value: 'a', label: 'Alice', disabled: true }],
      emptyValue: () => [],
    },
  })
  owners.push(owner)
  const clear = owner.find('.mp-field-decorator__clear-btn')
  if (clear.exists()) {
    await clear.trigger('click')
  }
  await flushPromises()
  expect((owner.emitted('update:modelValue') ?? []).every((args) => JSON.stringify(args[0]) === '["a"]')).toBe(true)
})

for (const [name, Component, props] of cases) {
  test(`${name} emits explicit null unchanged and renders the accepted empty model`, async () => {
    const owner = mount(Component, { props: { editMode: 'direct', clearable: true, ...props, emptyValue: null } })
    owners.push(owner)
    await flushPromises()
    await owner.get('.mp-field-decorator__clear-btn').trigger('click')
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe(null)
    await owner.setProps({ modelValue: null })
    await flushPromises()
    expect(owner.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
  })
}
test('nullable text clear does not change ordinary empty-string input and supports retyping', async () => {
  const owner = mount(Input, { props: { defaultValue: 'a', clearable: true, emptyValue: null } })
  owners.push(owner)
  await owner.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([null])
  await owner.setProps({ modelValue: null })
  await owner.get('input').setValue('next')
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['next'])
  await owner.get('input').setValue('')
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([''])
})

for (const [name, Component, props] of cases) {
  test(`${name} initial controlled null overrides a nonempty default`, async () => {
    const owner = mount(Component, {
      props: { editMode: 'direct', clearable: true, ...props, modelValue: null, emptyValue: null },
    })
    owners.push(owner)
    await flushPromises()
    expect(owner.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
  })
}
