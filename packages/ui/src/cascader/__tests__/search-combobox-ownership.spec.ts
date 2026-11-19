import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
]

test('direct single search associates the input with the actual listbox and active option', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      options,
      modelValue: 'alpha',
      filterable: true,
      inputValue: 'a',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    const list = wrapper.get('[role=listbox]')
    expect(input.attributes('aria-controls')).toBe(list.attributes('id'))
    expect(input.attributes('aria-haspopup')).toBe('listbox')
    const items = list.findAll('[role=option]')
    expect(items).toHaveLength(2)
    expect(items.map((item) => item.attributes('tabindex'))).toEqual(['-1', '-1'])
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    const active = input.attributes('aria-activedescendant')
    expect(active).toBeTruthy()
    expect(
      list
        .findAll('[role=option]')
        .find((item) => item.attributes('id') === active)
        ?.attributes('aria-selected'),
    ).toBe('true')
    expect(document.activeElement).toBe(input.element)
    await wrapper.setProps({ inputValue: 'no match' })
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    expect(wrapper.get('[role=listbox]').attributes('id')).toBe(list.attributes('id'))
  } finally {
    wrapper.unmount()
  }
})

test('server render contains the owned search listbox', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(Cascader, {
          options,
          filterable: true,
          inputValue: 'a',
          defaultOpen: true,
          editMode: 'direct',
          popupContainer: false,
        }),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  const input = container.querySelector('input[role=combobox]')!
  const list = container.querySelector('[role=listbox]')!
  expect(list).toBeTruthy()
  expect(input.getAttribute('aria-controls')).toBe(list.id)
  expect(list.querySelectorAll('[role=option]')).toHaveLength(2)
  expect(container.querySelector('[data-field-open-trigger]')?.getAttribute('tabindex')).toBe('-1')
})

test('explicit popup ownership wins without creating an invalid active reference', async () => {
  const activeDescendant = ref<string>()
  const wrapper = mount({
    render: () =>
      h(Cascader, {
        options,
        filterable: true,
        inputValue: 'a',
        defaultOpen: true,
        editMode: 'direct',
        popupContainer: false,
        'aria-controls': 'external-popup',
        'aria-activedescendant': activeDescendant.value,
      }),
  })
  try {
    const input = wrapper.get('input[role=combobox]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-controls')).toBe('external-popup')
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    activeDescendant.value = 'external-option'
    await nextTick()
    expect(input.attributes('aria-activedescendant')).toBe('external-option')
  } finally {
    wrapper.unmount()
  }
})

test('closing or leaving search clears internal references', async () => {
  const wrapper = mount(Cascader, {
    props: { options, filterable: true, inputValue: 'a', open: true, editMode: 'direct', popupContainer: false },
  })
  try {
    const input = wrapper.get('input[role=combobox]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(input.attributes('aria-controls')).toBeTruthy()
    await wrapper.setProps({ open: false })
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.setProps({ open: true, inputValue: '' })
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('reordering and removing search options never leaves a stale active reference', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { options, filterable: true, inputValue: 'a', defaultOpen: true, editMode: 'direct', popupContainer: false },
  })
  try {
    const input = wrapper.get('input[role=combobox]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    const activeTitle = wrapper.get(`[id="${input.attributes('aria-activedescendant')}"]`).attributes('title')
    await wrapper.setProps({ options: [...options].reverse() })
    await flushPromises()
    const id = input.attributes('aria-activedescendant')
    expect(id).toBeTruthy()
    expect(wrapper.get(`[id="${id}"]`).attributes('title')).toBe(activeTitle)
    await wrapper.setProps({ options: options.filter((item) => item.label !== activeTitle) })
    await flushPromises()
    const remaining = input.attributes('aria-activedescendant')
    if (remaining) {
      expect(wrapper.find(`[id="${remaining}"]`).exists()).toBe(true)
    }
  } finally {
    wrapper.unmount()
  }
})

test('a custom popup role does not receive a mismatched generated listbox reference', async () => {
  const wrapper = mount(Cascader, {
    props: {
      options,
      filterable: true,
      inputValue: 'a',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
      'aria-haspopup': 'tree',
    },
  })
  try {
    const input = wrapper.get('input[role=combobox]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(input.attributes('aria-haspopup')).toBe('tree')
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('direct single search excludes the popup icon from Tab but keeps it operable', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      options,
      filterable: true,
      inputValue: 'a',
      editMode: 'direct',
      popupContainer: false,
      openTriggerTarget: 'icon',
    },
  })
  try {
    const button = wrapper.get('[data-field-open-trigger]')
    expect(button.attributes('tabindex')).toBe('-1')
    await button.trigger('click')
    await flushPromises()
    expect(wrapper.get('input[role=combobox]').attributes('aria-expanded')).toBe('true')
    await wrapper.setProps({ inputValue: '' })
    expect(wrapper.get('[data-field-open-trigger]').attributes('tabindex')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('multiple search preserves its current popup icon Tab behavior', () => {
  const wrapper = mount(Cascader, {
    props: { options, multiple: true, filterable: true, inputValue: 'a', editMode: 'direct' },
  })
  try {
    expect(wrapper.get('[data-field-open-trigger]').attributes('tabindex')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])('SSR only emits provable popup references (multiple=%s)', async (multiple) => {
  for (const [placement, inline] of [
    [{}, false],
    [{ popupContainer: 'body', triggerProps: { popupContainer: false } }, false],
    [{ triggerProps: { popupContainer: false } }, true],
    [{ popupContainer: false, triggerProps: { popupContainer: 'body' } }, true],
  ] as const) {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(Cascader, {
            options,
            multiple,
            filterable: true,
            inputValue: 'a',
            defaultOpen: true,
            editMode: 'direct',
            ...placement,
          }),
      }),
    )
    const fragment = document.createElement('template')
    fragment.innerHTML = html
    const input = fragment.content.querySelector('input[role="combobox"]')!
    const id = input.getAttribute('aria-controls')
    if (inline) {
      expect(id).toBeTruthy()
      expect(fragment.content.getElementById(id!)).toBeTruthy()
    } else {
      expect(id).toBeNull()
      expect(input.hasAttribute('aria-activedescendant')).toBe(false)
    }
  }
})

test.each([false, true])('SSR links the inline hierarchy dialog and its menus (multiple=%s)', async (multiple) => {
  const html = await renderToString(
    createSSRApp({
      render: () => h(Cascader, { options, multiple, popupContainer: false, defaultOpen: true, editMode: 'direct' }),
    }),
  )
  const template = document.createElement('template')
  template.innerHTML = html
  const input = template.content.querySelector('input[role="combobox"]')!
  const dialog = template.content.getElementById(input.getAttribute('aria-controls')!)
  expect(input.getAttribute('aria-haspopup')).toBe('dialog')
  expect(dialog?.getAttribute('role')).toBe('dialog')
  expect(dialog?.querySelector('[role="menu"]')).toBeTruthy()
})
