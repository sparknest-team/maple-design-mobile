import { nextTick } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Cascader from '..'
import CascaderMenu from '../CascaderMenu.vue'

const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})
const options = [
  {
    value: 'a',
    label: 'Group A',
    children: [
      { value: 1, label: 'Same' },
      { value: 2, label: 'Disabled', disabled: true },
    ],
  },
  { value: 'b', label: 'Group B', children: [{ value: 3, label: 'Same' }] },
]
const mountCascader = (props = {}) => {
  const wrapper = mount(Cascader, { props: { options, ...props }, attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}
const controller = (wrapper) => wrapper.findComponent(CascaderMenu).props('controller')
const option = (c, value) => [...c.optionMap.values()].find((option) => option.value === value)

describe('Cascader common contract', () => {
  test('selects only leaves unless checkStrictly is set', () => {
    const wrapper = mountCascader()
    const c = controller(wrapper)
    c.handleClickOption(option(c, 'a'))
    expect(wrapper.emitted('change')).toBeUndefined()
    c.handleClickOption(option(c, 1))
    expect(wrapper.emitted('change')).toEqual([[1]])
  })
  test('strict selection publishes a parent and pathMode publishes a complete path', () => {
    const wrapper = mountCascader({ checkStrictly: true, pathMode: true })
    const c = controller(wrapper)
    c.handleClickOption(option(c, 'a'))
    expect(wrapper.emitted('change')).toEqual([[['a']]])
  })
  test('multiple parent checks select enabled leaves only', () => {
    const wrapper = mountCascader({ multiple: true })
    const c = controller(wrapper)
    c.handleClickOption(option(c, 'a'), true)
    expect(wrapper.emitted('change')).toEqual([[[1]]])
  })
  test('disabled options cannot be selected', () => {
    const wrapper = mountCascader()
    const c = controller(wrapper)
    c.handleClickOption(option(c, 2))
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  for (const state of ['disabled', 'readonly']) {
    test(state + ' blocks field operations', () => {
      const wrapper = mountCascader({ [state]: true, modelValue: [1], multiple: true, clearable: true })
      const c = controller(wrapper)
      c.handleOpenChange(true)
      c.handleClickOption(option(c, 3), true)
      c.handleClear(new Event('click'))
      c.handleRemove(option(c, 1).key)
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:open')).toBeUndefined()
    })
  }
  test('clear preserves disabled selections', () => {
    const wrapper = mountCascader({ defaultValue: [1, 2], multiple: true, clearable: true })
    controller(wrapper).handleClear(new Event('click'))
    expect(wrapper.emitted('change')).toEqual([[[2]]])
    expect(wrapper.emitted('clear')[0][0]).toBeInstanceOf(Event)
  })
  test('same labels and separator-containing paths do not collide', () => {
    const wrapper = mountCascader({
      multiple: true,
      pathMode: true,
      options: [
        { value: 'a-b', label: 'Same', children: [{ value: 'c', label: 'Same' }] },
        { value: 'a', label: 'Same', children: [{ value: 'b-c', label: 'Same' }] },
      ],
      modelValue: [
        ['a-b', 'c'],
        ['a', 'b-c'],
      ],
    })
    const c = controller(wrapper)
    expect(c.fieldItems).toHaveLength(2)
    expect(c.fieldItems[0].key).not.toBe(c.fieldItems[1].key)
    c.handleRemove(c.fieldItems[1].key)
    expect(wrapper.emitted('change')).toEqual([[[['a-b', 'c']]]])
  })
  test('numeric and string IDs remain distinct', () => {
    const wrapper = mountCascader({
      options: [
        { value: 1, label: 'Number' },
        { value: '1', label: 'String' },
      ],
      multiple: true,
      modelValue: [1, '1'],
    })
    expect(controller(wrapper).fieldItems.map((item) => item.label)).toEqual(['Number', 'String'])
  })
  test('late options replace fallback labels without publishing a value', async () => {
    const wrapper = mountCascader({ modelValue: 1, options: [] })
    expect(wrapper.text()).toContain('1')
    await wrapper.setProps({ options })
    expect(wrapper.text()).toContain('Group A / Same')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('lazy requests deduplicate and stale responses cannot replace new options', async () => {
    let done
    const loadMore = vi.fn((_option, resolve) => {
      done = resolve
    })
    const wrapper = mountCascader({ options: [{ value: 'remote', label: 'Remote', isLeaf: false }], loadMore })
    const c = controller(wrapper)
    const node = option(c, 'remote')
    const first = c.expandOption(node)
    c.expandOption(node)
    expect(loadMore).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ options: [{ value: 'new', label: 'New', isLeaf: true }] })
    done([{ value: 'old', label: 'Old', isLeaf: true }])
    await first
    expect([...c.optionMap.values()].some((node) => node.value === 'old')).toBe(false)
  })
  test('search input supports v-model:inputValue', () => {
    const wrapper = mountCascader({ filterable: true })
    controller(wrapper).handleInputValueChange('Same')
    expect(wrapper.emitted('update:inputValue')).toEqual([['Same']])
  })
})
