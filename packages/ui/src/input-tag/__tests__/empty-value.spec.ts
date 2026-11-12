import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Component from '..'

test('uses emptyValue for its clear action', async () => {
  const owner = mount(Component, {
    props: {
      editMode: 'direct',
      clearable: true,
      defaultValue: ['a'],
      emptyValue: () => [],
    },
  })
  try {
    await flushPromises()
    await owner.get('.mp-field-decorator__clear-btn').trigger('click')
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([])
  } finally {
    owner.unmount()
  }
})

test('explicit null clear remains null in the public model', async () => {
  const owner = mount(Component, {
    props: { editMode: 'direct', clearable: true, defaultValue: ['a'], emptyValue: null },
  })
  try {
    await flushPromises()
    await owner.get('.mp-field-decorator__clear-btn').trigger('click')
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe(null)
  } finally {
    owner.unmount()
  }
})
