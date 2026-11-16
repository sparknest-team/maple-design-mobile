import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'
import Editor from '../CascaderEditor.vue'
import { cascaderProps } from '../props'

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma', disabled: true },
]
const EditorHost = defineComponent({
  props: cascaderProps,
  setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
})

test('editor search keeps its Tab entry on the focused result while another result is hovered', async () => {
  const wrapper = mount(EditorHost, { attachTo: document.body, props: { options, filterable: true, inputValue: 'a' } })
  try {
    await flushPromises()
    const items = () => wrapper.findAll('[role=menuitemradio]')
    ;(items()[0].element as HTMLElement).focus()
    await flushPromises()
    await items()[1].trigger('mouseenter')
    expect(document.activeElement).toBe(items()[0].element)
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['0', '-1', '-1'])
    await items()[0].trigger('keydown', { key: 'Enter' })
    expect(wrapper.getComponent(Editor).emitted('update:modelValue')?.at(-1)).toEqual(['alpha'])
    await items()[1].trigger('mouseenter')
    const outside = document.createElement('button')
    document.body.append(outside)
    outside.focus()
    await flushPromises()
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
    outside.remove()
  } finally {
    wrapper.unmount()
  }
})

test('editor search forgets a focused result that filtering removes', async () => {
  const wrapper = mount(EditorHost, { attachTo: document.body, props: { options, filterable: true, inputValue: 'a' } })
  try {
    await flushPromises()
    const items = () => wrapper.findAll('[role=menuitemradio]')
    ;(items()[0].element as HTMLElement).focus()
    await wrapper.setProps({ inputValue: 'Beta' })
    await wrapper.setProps({ inputValue: 'a' })
    await items()[1].trigger('mouseenter')
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
  } finally {
    wrapper.unmount()
  }
})

test('editor search forgets focus when loading replaces the results', async () => {
  const wrapper = mount(EditorHost, { attachTo: document.body, props: { options, filterable: true, inputValue: 'a' } })
  try {
    await flushPromises()
    const items = () => wrapper.findAll('[role=menuitemradio]')
    ;(items()[0].element as HTMLElement).focus()
    await wrapper.setProps({ loading: true })
    await wrapper.setProps({ loading: false })
    await items()[1].trigger('mouseenter')
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
  } finally {
    wrapper.unmount()
  }
})

test('direct single-select search exposes the selected option and follows model changes', async () => {
  const wrapper = mount(Cascader, {
    props: {
      options,
      modelValue: 'beta',
      filterable: true,
      inputValue: 'a',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
  })
  try {
    await flushPromises()
    const items = () => wrapper.findAll('[role=listbox] [role=option]')
    expect(items().map((item) => item.attributes('aria-selected'))).toEqual(['false', 'true', 'false'])
    expect(items()[2].attributes('aria-disabled')).toBe('true')
    await wrapper.setProps({ modelValue: 'alpha' })
    expect(items().map((item) => item.attributes('aria-selected'))).toEqual(['true', 'false', 'false'])
  } finally {
    wrapper.unmount()
  }
})

test('direct single-select search retains keyboard navigation and selection', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { options, filterable: true, inputValue: 'a', defaultOpen: true, editMode: 'direct', popupContainer: false },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role=combobox]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-activedescendant')).toBeTruthy()
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['alpha'])
  } finally {
    wrapper.unmount()
  }
})

test('strict direct search can select a parent without advertising a submenu', async () => {
  const wrapper = mount(Cascader, {
    props: {
      options: [{ value: 'parent', label: 'Alpha parent', children: [{ value: 'child', label: 'Alpha child' }] }],
      modelValue: 'parent',
      checkStrictly: true,
      filterable: true,
      inputValue: 'Alpha',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
  })
  try {
    await flushPromises()
    const parent = wrapper.get('[role=option][title="Alpha parent"]')
    expect(parent.attributes('aria-selected')).toBe('true')
    expect(parent.attributes('aria-haspopup')).toBeUndefined()
    expect(parent.attributes('aria-expanded')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('multiple search keeps its checkbox controls', async () => {
  const wrapper = mount(Cascader, {
    props: {
      options,
      multiple: true,
      modelValue: ['beta'],
      filterable: true,
      inputValue: 'a',
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
    },
  })
  try {
    await flushPromises()
    expect(wrapper.findAll('[role=option]')).toHaveLength(0)
    expect(wrapper.findAll('[role=menuitem]')).toHaveLength(0)
    const boxes = wrapper.findAll('[role=dialog] input[type=checkbox]')
    expect(boxes).toHaveLength(3)
    expect((boxes[1].element as HTMLInputElement).checked).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('server render exposes selected options without sequential popup entries', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(Cascader, {
          options,
          modelValue: 'beta',
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
  const items = Array.from(container.querySelectorAll('[role=option]'))
  expect(items.map((item) => item.getAttribute('aria-selected'))).toEqual(['false', 'true', 'false'])
  expect(items.map((item) => item.getAttribute('tabindex'))).toEqual(['-1', '-1', '-1'])
})

test('editor search menu retains one sequential entry and keyboard focus navigation', async () => {
  const wrapper = mount(EditorHost, {
    attachTo: document.body,
    props: { options, modelValue: 'beta', filterable: true, inputValue: 'a' },
  })
  try {
    await flushPromises()
    const items = () => wrapper.findAll('[role=menuitemradio]')
    expect(items()).toHaveLength(3)
    expect(items().filter((item) => item.attributes('tabindex') === '0')).toHaveLength(1)
    ;(items()[0].element as HTMLElement).focus()
    await flushPromises()
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['0', '-1', '-1'])
    await items()[0].trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(items()[1].element)
    expect(items().map((item) => item.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
    await wrapper.setProps({ inputValue: 'Alpha' })
    expect(items()).toHaveLength(1)
    expect(items()[0].attributes('tabindex')).toBe('0')
  } finally {
    wrapper.unmount()
  }
})

test('editor search retains an entry when every result is disabled', async () => {
  const wrapper = mount(EditorHost, {
    props: {
      options: [
        { value: 'a', label: 'Alpha', disabled: true },
        { value: 'b', label: 'Beta', disabled: true },
      ],
      filterable: true,
      inputValue: 'a',
    },
  })
  try {
    await flushPromises()
    expect(wrapper.findAll('[role=menuitemradio]').map((item) => item.attributes('tabindex'))).toEqual(['0', '-1'])
  } finally {
    wrapper.unmount()
  }
})
