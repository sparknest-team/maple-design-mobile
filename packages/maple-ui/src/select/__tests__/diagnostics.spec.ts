import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select, { optionProps } from '..'
import Cascader from '../../cascader'

for (const emptyValue of ['invalid', () => 'invalid', [], () => [], null, () => null]) {
  test(`multiple clear keeps array or designated empty shape for ${String(emptyValue)}`, async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const owner = mount(Select, {
      props: { editMode: 'direct', multiple: true, defaultValue: ['a'], options: ['a'], clearable: true, emptyValue },
    })
    try {
      await flushPromises()
      await owner.get('[class*=field-decorator__clear-btn]').trigger('click')
      const expected = emptyValue === null || (typeof emptyValue === 'function' && emptyValue() === null) ? null : []
      expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(expected)
    } finally {
      owner.unmount()
      warning.mockRestore()
    }
  })
}
test('public option props omit obsolete extra and private internal', () => {
  expect('extra' in optionProps).toBe(false)
  expect('internal' in optionProps).toBe(false)
})
for (const [name, Component] of [
  ['Select', Select],
  ['Cascader', Cascader],
] as const) {
  test(`${name} diagnoses invalid tag counts and search delays without changing valid defaults`, async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const owner = mount(Component as any, {
      props: {
        editMode: 'direct',
        options: [],
        maxTagCount: 1.5,
        searchDelay: Infinity,
        ...(name === 'Select' ? { limit: -1 } : {}),
      },
    })
    try {
      await flushPromises()
      const messages = warning.mock.calls.flat().join(' ')
      expect(messages).toContain('maxTagCount')
      expect(messages).toContain('searchDelay')
      if (name === 'Select') {
        expect(messages).toContain('limit')
      }
    } finally {
      owner.unmount()
      warning.mockRestore()
    }
  })
}
test('Cascader forwards focused and open arrow scope from its real field', async () => {
  const arrow = vi.fn((_scope: unknown) => h('span', 'Arrow'))
  const owner = mount(Cascader, {
    props: { editMode: 'direct', filterable: false, options: [{ value: 'a', label: 'Alpha' }] },
    slots: { 'arrow-icon': arrow },
  })
  try {
    await flushPromises()
    await owner.get('input').trigger('focus')
    expect(arrow.mock.calls.at(-1)?.[0]).toMatchObject({ focus: true, menuOpen: false })
    await owner.setProps({ open: true })
    expect(arrow.mock.calls.at(-1)?.[0]).toMatchObject({ focus: true, menuOpen: true })
  } finally {
    owner.unmount()
  }
})

test('multiple clear retains an explicitly recognized scalar empty value', async () => {
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(Select, {
    props: {
      editMode: 'direct',
      multiple: true,
      defaultValue: ['a'],
      options: ['a'],
      clearable: true,
      emptyValues: [0],
      emptyValue: 0,
    },
  })
  try {
    await flushPromises()
    await owner.get('[class*=field-decorator__clear-btn]').trigger('click')
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe(0)
    expect(warning).not.toHaveBeenCalled()
  } finally {
    owner.unmount()
    warning.mockRestore()
  }
})
