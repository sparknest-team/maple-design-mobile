import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import SelectionField from '../../_components/selection-field/SelectionField.vue'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import { cascaderProps } from '../../cascader/props'
import Input from '../../input'

for (const [name, component] of [
  ['Select', Select],
  ['Cascader', Cascader],
] as const) {
  for (const action of ['clear', 'remove'] as const) {
    test(`${name} pauses ${action} while manually loading, keeps search editable and recovers once`, async () => {
      const owner = mount(component as any, {
        props: {
          editMode: 'direct',
          multiple: true,
          defaultValue: ['a'],
          options: [{ value: 'a', label: 'Alpha' }],
          filterable: true,
          searchDelay: 0,
          clearable: true,
        },
      })
      try {
        const field = owner.findComponent(SelectionField),
          key = field.props('items')![0]!.key
        await owner.setProps({ loading: true })
        expect(field.find('[class*="field-decorator__clear-btn"]').exists()).toBe(false)
        expect(field.find('[class*="tag__close-btn"]').exists()).toBe(false)
        field.vm.$emit('clear', new MouseEvent('click'))
        field.vm.$emit('remove', key)
        await field.get('input').trigger('keydown', { key: 'Backspace' })
        await flushPromises()
        expect(owner.emitted('clear')).toBeUndefined()
        expect(owner.emitted('remove')).toBeUndefined()
        expect(owner.emitted('update:modelValue')).toBeUndefined()
        expect((field.get('input').element as HTMLInputElement).disabled).toBe(false)
        expect((field.get('input').element as HTMLInputElement).readOnly).toBe(false)
        await field.get('input').setValue('search')
        expect((field.get('input').element as HTMLInputElement).value).toBe('search')
        await owner.setProps({ loading: false })
        if (action === 'clear') {
          field.vm.$emit('clear', new MouseEvent('click'))
        } else {
          field.vm.$emit('remove', key)
        }
        await flushPromises()
        expect(owner.emitted('update:modelValue')).toEqual([[[]]])
        if (action === 'clear' || name === 'Select') {
          expect(owner.emitted(action)).toHaveLength(1)
        } else {
          expect(owner.emitted('remove')).toBeUndefined()
          expect(owner.emitted('change')).toHaveLength(1)
        }
      } finally {
        owner.unmount()
      }
    })
  }
  test(`${name} also pauses existing-value mutation during an explicit options request`, async () => {
    let resolve!: (options: { value: string; label: string }[]) => void
    const owner = mount(component as any, {
      props: {
        editMode: 'direct',
        multiple: true,
        defaultValue: ['a'],
        options: [{ value: 'a', label: 'Alpha' }],
        clearable: true,
      },
    })
    try {
      const field = owner.findComponent(SelectionField),
        key = field.props('items')![0]!.key
      await owner.setProps({
        options: () =>
          new Promise((done) => {
            resolve = done
          }),
      })
      await flushPromises()
      expect(field.props('loading')).toBe(true)
      field.vm.$emit('clear', new MouseEvent('click'))
      field.vm.$emit('remove', key)
      await flushPromises()
      expect(owner.emitted('clear')).toBeUndefined()
      expect(owner.emitted('remove')).toBeUndefined()
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      resolve([{ value: 'a', label: 'Alpha' }])
      await flushPromises()
      expect(field.props('loading')).toBe(false)
      field.vm.$emit('clear', new MouseEvent('click'))
      await flushPromises()
      expect(owner.emitted('update:modelValue')).toEqual([[[]]])
    } finally {
      owner.unmount()
    }
  })
}

const deferredMode = cascaderProps.editMode.validator('popup') ? 'popup' : 'click'
test('Cascader deferred footer cannot clear a loading draft through a retained callback', async () => {
  const owner = mount(Cascader as any, {
    props: {
      editMode: deferredMode,
      open: true,
      multiple: true,
      defaultValue: ['a'],
      options: [{ value: 'a', label: 'Alpha' }],
      loading: true,
      clearable: true,
    },
  })
  try {
    await flushPromises()
    const host = owner.findComponent(FieldPresentation)
    expect(host.props('clearable')).toBe(false)
    host.vm.$emit('clear')
    await owner.setProps({ loading: false })
    await (host.props('commit') as () => Promise<boolean>)()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
test('manual loading does not pause free-text AutoComplete draft clearing', async () => {
  const owner = mount(AutoComplete as any, {
    props: {
      editMode: deferredMode,
      open: true,
      defaultValue: 'text',
      emptyValue: null,
      loading: true,
      clearable: true,
    },
  })
  try {
    await flushPromises()
    const host = owner.findComponent(FieldPresentation)
    expect(host.props('clearable')).toBe(true)
    host.vm.$emit('clear')
    await (host.props('commit') as () => Promise<boolean>)()
    expect(owner.emitted('update:modelValue')).toEqual([[null]])
  } finally {
    owner.unmount()
  }
})

test('ordinary Input remains editable and clearable during manual loading', async () => {
  const owner = mount(Input, {
    props: { editMode: 'direct', defaultValue: 'text', emptyValue: null, loading: true, clearable: true },
  })
  try {
    expect((owner.get('input').element as HTMLInputElement).disabled).toBe(false)
    await owner.get('[class*=field-decorator__clear-btn]').trigger('click')
    expect(owner.emitted('update:modelValue')).toEqual([[null]])
  } finally {
    owner.unmount()
  }
})
