import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import AutoComplete from '../../auto-complete'
import { CheckboxGroup } from '../../checkbox'
import { RadioGroup } from '../../radio'

for (const [name, Component, model] of [
  ['Cascader', Cascader, 'a'],
  ['CheckboxGroup', CheckboxGroup, ['a']],
  ['RadioGroup', RadioGroup, 'a'],
  ['AutoComplete', AutoComplete, 'a'],
] as const) {
  test(`${name} owns one async source across popup open/close and renders resolved labels`, async () => {
    const loader = vi.fn(async () => [{ value: 'a', label: 'Alice' }])
    const owner = mount(Component as any, {
      props: { editMode: 'popup', modelValue: model, options: loader, searchDelay: 0, popupContainer: false },
    })
    try {
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
      const field = owner.getComponent(FieldPresentation)
      if (name !== 'AutoComplete') {
        expect(field.props('text')).toContain('Alice')
      }
      field.vm.$emit('open', true)
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
      field.vm.$emit('cancel')
      await flushPromises()
      field.vm.$emit('open', true)
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
    } finally {
      owner.unmount()
    }
  })
}

test('reopening a searched popup restores the blank-query candidates without reusing an old search', async () => {
  const loader = vi.fn(async (_query: string) => [{ value: 'a', label: 'Alice' }])
  const owner = mount(Cascader, {
    props: { editMode: 'popup', options: loader, filterable: true, searchDelay: 0, popupContainer: false },
  })
  try {
    await flushPromises()
    const field = owner.getComponent(FieldPresentation)
    field.vm.$emit('open', true)
    await flushPromises()
    await owner.get('input').setValue('phone')
    await new Promise((resolve) => setTimeout(resolve, 20))
    await flushPromises()
    expect(loader.mock.calls.at(-1)?.[0]).toBe('phone')
    field.vm.$emit('cancel')
    await flushPromises()
    field.vm.$emit('open', true)
    await flushPromises()
    expect(loader.mock.calls.at(-1)?.[0]).toBe('')
  } finally {
    owner.unmount()
  }
})

test('an async popup field can retry its source before opening an inner editor', async () => {
  const loader = vi
    .fn()
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce([{ value: 'a', label: 'Alice' }])
  const owner = mount(AutoComplete, { props: { editMode: 'popup', options: loader, searchDelay: 0 } })
  try {
    await flushPromises()
    expect(owner.emitted('load-error')).toHaveLength(1)
    await (owner.vm as any).refresh()
    await flushPromises()
    expect(loader).toHaveBeenCalledTimes(2)
    expect(owner.emitted('load-error')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})
