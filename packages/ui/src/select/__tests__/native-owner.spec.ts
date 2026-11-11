import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import { selectProps, type SelectProps } from '../props'
import SelectMenu from '../SelectMenu'

const mode = (selectProps.editMode.validator('popup') ? 'popup' : 'click') as NonNullable<SelectProps['editMode']>
test('one public deferred Select owns one candidate source and retains selected raw labels', async () => {
  const loader = vi.fn(async (query: string) =>
    query === 'ab' ? [{ value: 'codeAB', label: 'About' }] : [{ value: 'a', label: 'Alpha' }],
  )
  const owner = mount(Select, {
    props: { editMode: mode, options: loader, filterable: true, searchDelay: 0, popupContainer: false },
  })
  try {
    await flushPromises()
    expect(loader).toHaveBeenCalledTimes(1)
    const field = owner.getComponent(FieldPresentation)
    field.vm.$emit('open', true)
    await flushPromises()
    expect(loader).toHaveBeenCalledTimes(1)
    const menu = owner.findAllComponents(SelectMenu).at(-1)!
    const controller = menu.props('controller')
    controller.handleInputValueChange('ab')
    await new Promise((resolve) => setTimeout(resolve, 20))
    await flushPromises()
    expect(loader.mock.calls.at(-1)?.[0]).toBe('ab')
    const option = [...controller.optionInfoMap.values()].find((item) => item.value === 'codeAB')!
    controller.handleSelect(option.key, new MouseEvent('click'))
    await flushPromises()
    await (field.props('commit') as () => Promise<boolean>)()
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toEqual([['codeAB']])
    expect(field.props('text')).toBe('About')
    field.vm.$emit('open', true)
    await flushPromises()
    expect(field.props('text')).toBe('About')
  } finally {
    owner.unmount()
  }
})

test('editor source errors and refresh belong to the public field once', async () => {
  const error = new Error('offline'),
    loader = vi
      .fn()
      .mockResolvedValueOnce([{ value: 'a', label: 'Alpha' }])
      .mockRejectedValueOnce(error)
      .mockResolvedValue([{ value: 'b', label: 'Beta' }])
  const owner = mount(Select, {
    props: { editMode: mode, options: loader, filterable: true, searchDelay: 0, popupContainer: false },
  })
  try {
    await flushPromises()
    owner.getComponent(FieldPresentation).vm.$emit('open', true)
    await flushPromises()
    const c = owner.findAllComponents(SelectMenu).at(-1)!.props('controller')
    c.handleInputValueChange('bad')
    await new Promise((resolve) => setTimeout(resolve, 20))
    await flushPromises()
    expect(owner.emitted('load-error')).toEqual([[error]])
    await (owner.vm as unknown as { refresh: () => Promise<void> }).refresh()
    await flushPromises()
    expect(loader).toHaveBeenCalledTimes(3)
    expect(owner.emitted('load-error')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})
test('an unrelated Select inside option content keeps its own source', async () => {
  const loader = vi.fn(async () => [{ value: 'a', label: 'Alpha' }]),
    nested = vi.fn(async () => [{ value: 'nested', label: 'Independent' }])
  const owner = mount(Select, {
    props: { editMode: mode, options: loader, popupContainer: false },
    slots: { option: () => h(Select, { editMode: 'direct', options: nested, defaultValue: 'nested' }) },
  })
  try {
    await flushPromises()
    owner.getComponent(FieldPresentation).vm.$emit('open', true)
    await flushPromises()
    expect(loader).toHaveBeenCalledTimes(1)
    expect(nested).toHaveBeenCalledTimes(1)
    expect(owner.text()).toContain('Independent')
  } finally {
    owner.unmount()
  }
})
