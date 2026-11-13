import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

test('undefined ARIA overrides allow internal search ownership and update when explicit values change', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
    attrs: {
      'aria-haspopup': undefined,
      'aria-controls': undefined,
      'aria-activedescendant': undefined,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    const list = wrapper.get('[role="listbox"]')
    expect(input.attributes('aria-haspopup')).toBe('listbox')
    expect(input.attributes('aria-controls')).toBe(list.attributes('id'))
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-activedescendant')).toBeTruthy()
    await (wrapper.setProps as (props: Record<string, unknown>) => Promise<void>)({
      'aria-controls': 'external',
      'aria-haspopup': 'tree',
      'aria-activedescendant': 'external-option',
    })
    expect(input.attributes('aria-controls')).toBe('external')
    expect(input.attributes('aria-haspopup')).toBe('tree')
    expect(input.attributes('aria-activedescendant')).toBe('external-option')
    await (wrapper.setProps as (props: Record<string, unknown>) => Promise<void>)({
      'aria-controls': null,
      'aria-haspopup': null,
      'aria-activedescendant': null,
    })
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-haspopup')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await (wrapper.setProps as (props: Record<string, unknown>) => Promise<void>)({
      'aria-controls': undefined,
      'aria-haspopup': undefined,
      'aria-activedescendant': undefined,
    })
    await flushPromises()
    expect(input.attributes('aria-controls')).toBe(list.attributes('id'))
    expect(input.attributes('aria-haspopup')).toBe('listbox')
    expect(input.attributes('aria-activedescendant')).toBeTruthy()
  } finally {
    wrapper.unmount()
  }
})
