import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '..'

test('explicit popup relationships take precedence and undefined restores internal ownership', async () => {
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
      'aria-haspopup': 'tree',
      'aria-controls': 'external-tree',
      'aria-activedescendant': 'external-option',
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    expect(input.attributes('aria-haspopup')).toBe('tree')
    expect(input.attributes('aria-controls')).toBe('external-tree')
    expect(input.attributes('aria-activedescendant')).toBe('external-option')
    await (wrapper.setProps as (props: Record<string, unknown>) => Promise<void>)({
      'aria-controls': undefined,
      'aria-activedescendant': undefined,
    })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await (wrapper.setProps as (props: Record<string, unknown>) => Promise<void>)({ 'aria-haspopup': undefined })
    await flushPromises()
    expect(input.attributes('aria-controls')).toBeTruthy()
    expect(document.getElementById(input.attributes('aria-controls')!)?.getAttribute('role')).toBe('listbox')
    expect(input.attributes('aria-activedescendant')).toBeTruthy()
  } finally {
    wrapper.unmount()
  }
})

test('null controls suppress the internal relationship without inventing an active item', async () => {
  const wrapper = mount(Select, {
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
      'aria-controls': null,
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('server render preserves explicit external ownership', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(Select, {
          options: [{ value: 'a', label: 'Alpha' }],
          filterable: true,
          defaultOpen: true,
          editMode: 'direct',
          popupContainer: false,
          'aria-haspopup': 'tree',
          'aria-controls': 'external-tree',
          'aria-activedescendant': 'external-option',
        }),
    }),
  )
  const host = document.createElement('div')
  host.innerHTML = html
  const input = host.querySelector('input[role="combobox"]')!
  expect(input.getAttribute('aria-haspopup')).toBe('tree')
  expect(input.getAttribute('aria-controls')).toBe('external-tree')
  expect(input.getAttribute('aria-activedescendant')).toBe('external-option')
})
