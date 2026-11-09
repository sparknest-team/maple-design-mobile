import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'
import CascaderMenu from '../CascaderMenu.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const options = [{ value: 'ROOT', label: 'Apple', children: [{ value: 'CHILD', label: 'Banana' }] }]
function setup(props: Record<string, unknown> = {}) {
  const owner = mount(Cascader, { props: { options, filterable: true, defaultOpen: true, inputValue: 'ap', ...props } })
  owners.push(owner)
  return { owner, controller: () => owner.getComponent(CascaderMenu).props('controller') }
}
test('Cascader preserves path label matching and default case-insensitivity; caseSensitive updates live', async () => {
  const { owner, controller } = setup()
  await flushPromises()
  expect(controller().filteredLeafOptions.map((item: any) => item.value)).toEqual(['CHILD'])
  await owner.setProps({ caseSensitive: true })
  expect(controller().filteredLeafOptions).toHaveLength(0)
  await owner.setProps({ inputValue: 'Ap' })
  expect(controller().filteredLeafOptions.map((item: any) => item.value)).toEqual(['CHILD'])
  await owner.setProps({ checkStrictly: true })
  expect(controller().filteredLeafOptions.map((item: any) => item.value)).toEqual(['ROOT'])
})
test('Cascader custom filtering owns value OR label matching and can bypass local filtering for remote data', async () => {
  const filterOption = vi.fn((query: string, option: any) =>
    [option.value, option.label].some((text) => String(text).toLowerCase().includes(query.toLowerCase())),
  )
  const { owner, controller } = setup({ caseSensitive: true, inputValue: 'child', filterOption })
  await flushPromises()
  expect(controller().filteredLeafOptions.map((item: any) => item.value)).toEqual(['CHILD'])
  await owner.setProps({ inputValue: 'banana' })
  expect(controller().filteredLeafOptions).toHaveLength(1)
  await owner.setProps({ filterOption: () => true, inputValue: 'missing' })
  expect(controller().filteredLeafOptions).toHaveLength(1)
})

test('Cascader searchFields can match value in any path node without changing selected values', async () => {
  const { owner, controller } = setup({ inputValue: 'root' })
  await flushPromises()
  expect(controller().filteredLeafOptions).toHaveLength(0)
  await owner.setProps({ searchFields: ['label', 'value'] })
  expect(controller().filteredLeafOptions.map((item: any) => item.value)).toEqual(['CHILD'])
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('empty searchFields match no nonempty query while empty query retains all options', async () => {
  const { owner, controller } = setup({ searchFields: [], inputValue: 'fruit' })
  await flushPromises()
  expect(controller().filteredLeafOptions).toHaveLength(0)
  await owner.setProps({ inputValue: '' })
  expect(controller().filteredLeafOptions).toHaveLength(1)
})

test('strict search results do not announce a submenu that is not displayed', async () => {
  const { owner } = setup({ checkStrictly: true, inputValue: 'Apple', popupContainer: false })
  await flushPromises()
  const result = owner.getComponent(CascaderMenu).get('[role="menuitem"][title="Apple"]')
  expect(result.attributes('aria-haspopup')).toBeUndefined()
  expect(result.attributes('aria-expanded')).toBeUndefined()
})
