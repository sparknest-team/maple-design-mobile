import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Select from '..'
import Option from '../Option.vue'
import SelectMenu from '../SelectMenu'
import { getOptionInfos, getValidOptions } from '../utils'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const options = [
  { value: 'CODE_A', label: 'Apple' },
  { value: 0, label: 'Zero' },
]
function setup(props: Record<string, unknown> = {}, slots?: Record<string, any>) {
  const owner = mount(Select, {
    props: {
      editMode: 'direct',
      options,
      filterable: true,
      defaultOpen: true,
      inputValue: 'ap',
      searchDelay: 0,
      ...props,
    },
    slots,
    global: {
      stubs: {
        Trigger: { template: '<div><slot/><slot name="content"/></div>' },
        CTrigger: { template: '<div><slot/><slot name="content"/></div>' },
        MpTrigger: { template: '<div><slot/><slot name="content"/></div>' },
        teleport: true,
      },
    },
  })
  owners.push(owner)
  const controller = () => owner.getComponent(SelectMenu).props('controller')
  return { owner, controller }
}
test('Select keeps case-insensitive defaults and updates rendered/keyboard candidates when caseSensitive changes', async () => {
  const { owner, controller } = setup()
  await flushPromises()
  expect(controller().validOptionInfos.map((item: any) => item.label)).toEqual(['Apple'])
  await owner.setProps({ caseSensitive: true })
  expect(controller().validOptionInfos).toHaveLength(0)
  expect(owner.findAll('[role=option]')).toHaveLength(0)
  await owner.setProps({ inputValue: 'Ap' })
  expect(controller().validOptionInfos.map((item: any) => item.label)).toEqual(['Apple'])
  controller().handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }))
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.[0][0]).toBe('CODE_A')
})
test('custom value OR label filtering has priority over caseSensitive, and remote mode bypasses local matching', async () => {
  const filterOption = vi.fn((query: string, option: any) =>
    [option.value, option.label].some((text) =>
      String(text ?? '')
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
  )
  const { owner, controller } = setup({ inputValue: 'code', caseSensitive: true, filterOption })
  await flushPromises()
  expect(controller().validOptionInfos.map((item: any) => item.value)).toEqual(['CODE_A'])
  await owner.setProps({ inputValue: 'apple' })
  expect(controller().validOptionInfos).toHaveLength(1)
  await owner.setProps({ filterOption: false, inputValue: 'no match' })
  expect(controller().validOptionInfos).toHaveLength(2)
  await owner.setProps({ filterOption, inputValue: '' })
  filterOption.mockClear()
  expect(controller().validOptionInfos).toHaveLength(2)
  expect(filterOption).not.toHaveBeenCalled()
})
test('slot Options use the same caseSensitive setting as candidate navigation', async () => {
  const { owner, controller } = setup(
    { options: [], caseSensitive: true },
    { default: () => h(Option, { value: 'a', label: 'Apple' }) },
  )
  await flushPromises()
  expect(controller().validOptionInfos).toHaveLength(0)
  expect(owner.get<HTMLElement>('[role=option]').element.style.display).toBe('none')
  await owner.setProps({ caseSensitive: false })
  controller().handleOpenChange(true)
  await flushPromises()
  expect(controller().validOptionInfos).toHaveLength(1)
  expect(owner.get<HTMLElement>('[role=option]').element.style.display).toBe('')
})
test('grouped mapped labels and numeric zero retain matching behavior', () => {
  const optionInfos = getOptionInfos([{ isGroup: true, label: 'Group', options: [{ id: 0, name: 'Apple' }] }] as any, {
    fieldNames: { value: 'id', label: 'name', disabled: 'disabled', tagProps: 'tagProps', render: 'render' },
    origin: 'options',
    optionInfoMap: new Map(),
  })
  expect(getValidOptions(optionInfos, { inputValue: 'ap', filterOption: true })).toHaveLength(1)
  expect(getValidOptions(optionInfos, { inputValue: 'ap', filterOption: true, caseSensitive: true })).toHaveLength(0)
  expect(getValidOptions(optionInfos, { inputValue: '', filterOption: true, caseSensitive: true })).toHaveLength(1)
})

test('searchFields defaults to label and supports value OR label with live fieldNames mapping', async () => {
  const { owner, controller } = setup({ inputValue: 'code' })
  await flushPromises()
  expect(controller().validOptionInfos).toHaveLength(0)
  await owner.setProps({ searchFields: ['value', 'label'] })
  expect(controller().validOptionInfos.map((item: any) => item.value)).toEqual(['CODE_A'])
  await owner.setProps({ inputValue: 'apple' })
  expect(controller().validOptionInfos).toHaveLength(1)
  await owner.setProps({
    options: [{ id: 0, name: 'Zero' }],
    fieldNames: { value: 'id', label: 'name' },
    inputValue: '0',
  })
  expect(controller().validOptionInfos.map((item: any) => item.value)).toEqual([0])
})
