import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import CascaderOption from '../cascader-option'
import CascaderMenu from '../CascaderMenu.vue'
import Cascader from '../index'

const options = [
  {
    value: 'group',
    label: 'Group',
    children: [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ],
  },
]
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
function create(props = {}) {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { options, defaultOpen: true, popupContainer: false, ...props },
  })
  wrappers.push(wrapper)
  return wrapper
}
function row(wrapper: ReturnType<typeof mount>, value: string) {
  const option = wrapper.findAllComponents(CascaderOption).find((item) => item.props('option').value === value)
  expect(option).toBeTruthy()
  return option!
}

describe('Cascader selection indicators', () => {
  test('multiple parent is unchecked, mixed, then checked; disabled leaves do not block select-all', async () => {
    const wrapper = create({ multiple: true, modelValue: [] })
    await nextTick()
    const parent = row(wrapper, 'group')
    const input = () => parent.get('input[type="checkbox"]')
    expect(input().attributes('aria-checked')).toBe('false')
    await wrapper.setProps({ modelValue: ['a'] })
    expect(input().attributes('aria-checked')).toBe('mixed')
    expect((input().element as HTMLInputElement).indeterminate).toBe(true)
    await wrapper.setProps({ modelValue: ['a', 'b'] })
    expect(input().attributes('aria-checked')).toBe('true')
    expect((input().element as HTMLInputElement).checked).toBe(true)
    expect((input().element as HTMLInputElement).indeterminate).toBe(false)
    expect(parent.find('.mp-cascader-option-check').exists()).toBe(false)
    await wrapper.setProps({ modelValue: [] })
    expect(input().attributes('aria-checked')).toBe('false')
    ;(input().element as HTMLInputElement).click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a', 'b']]])
  })

  for (const checkStrictly of [false, true]) {
    test(`single selection uses IconCheck, including strict parent selection (${checkStrictly})`, async () => {
      const value = checkStrictly ? 'group' : 'a'
      const wrapper = create({ modelValue: value, checkStrictly })
      const controller = wrapper.findComponent(CascaderMenu).props('controller')
      const node = Array.from(controller.optionMap.values()).find((item: any) => item.value === value) as any
      controller.setSelectedPath(node.key)
      await nextTick()
      const selected = row(wrapper, value)
      expect(selected.get('.mp-cascader-option-check').attributes('aria-hidden')).toBe('true')
      expect(selected.find('.mp-cascader-option-check svg').exists()).toBe(true)
      expect(selected.find('input[type="checkbox"]').exists()).toBe(false)
      expect(selected.find('.mp-selection-indicator--radio').exists()).toBe(false)
      const unselected = checkStrictly ? row(wrapper, 'a') : row(wrapper, 'b')
      expect(unselected.find('.mp-cascader-option-check').exists()).toBe(false)
    })
  }

  test('strict multiple selection keeps parent and child checks independent', async () => {
    const wrapper = create({ multiple: true, checkStrictly: true, modelValue: ['a'] })
    await nextTick()
    expect(row(wrapper, 'group').get('input[type="checkbox"]').attributes('aria-checked')).toBe('false')
    await wrapper.setProps({ modelValue: ['group'] })
    expect(row(wrapper, 'group').get('input[type="checkbox"]').attributes('aria-checked')).toBe('true')
  })
})
