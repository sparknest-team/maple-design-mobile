import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import PeopleSelect from '..'
import Select from '../../select'

const person = { value: 'a', label: 'Alice' }
for (const mode of ['isLabel', 'readPretty'] as const) {
  test(`${mode}: read slot has common value/text plus resolved person`, async () => {
    const read = vi.fn((_scope: unknown) => h('span', 'Custom read'))
    const owner = mount(PeopleSelect, { props: { [mode]: true, modelValue: 'a', options: [person] }, slots: { read } })
    try {
      await flushPromises()
      expect(read.mock.calls.at(-1)?.[0]).toEqual({ value: 'a', text: 'Alice', person })
      await owner.setProps({ options: [{ ...person, label: 'Renamed' }] })
      expect(read.mock.calls.at(-1)?.[0]).toEqual({
        value: 'a',
        text: 'Renamed',
        person: { ...person, label: 'Renamed' },
      })
    } finally {
      owner.unmount()
    }
  })
  test(`${mode}: pure reading does not fetch candidates`, async () => {
    const loader = vi.fn(async () => [person])
    const owner = mount(PeopleSelect, {
      props: { [mode]: true, modelValue: 'a', label: 'Known person', options: loader },
    })
    try {
      await flushPromises()
      expect(loader).not.toHaveBeenCalled()
      expect(owner.text()).toContain('Known person')
    } finally {
      owner.unmount()
    }
  })
}
for (const state of ['disabled', 'readonly'] as const) {
  test(`${state}: reads initial labels and explicit refresh while preventing edits`, async () => {
    const loader = vi.fn(async () => [person])
    const owner = mount(PeopleSelect, {
      props: { editMode: 'direct', [state]: true, modelValue: 'a', options: loader, clearable: true },
    })
    try {
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
      expect(owner.text()).toContain('Alice')
      owner.getComponent(Select).vm.$emit('change', 'b')
      owner.getComponent(Select).vm.$emit('search', 'query')
      await flushPromises()
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      expect(owner.emitted('search')).toBeUndefined()
      await (owner.vm as unknown as { refresh: () => Promise<void> }).refresh()
      expect(loader).toHaveBeenCalledTimes(2)
    } finally {
      owner.unmount()
    }
  })
}
