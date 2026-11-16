import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Editor from '../CascaderEditor.vue'
import { cascaderProps } from '../props'

test('multiple editor search exposes native checkboxes without nested menu items', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () =>
      h(Editor, {
        options: props,
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value: unknown) => emitValue(value),
      }),
  })
  let emitted: unknown
  const emitValue = (value: unknown) => {
    emitted = value
  }
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Alpha two' },
      ],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const boxes = wrapper.findAll('input[type=checkbox]')
    expect(boxes).toHaveLength(2)
    const search = wrapper.get('input[aria-controls]')
    const target = wrapper.get(`[id="${search.attributes('aria-controls')}"]`)
    expect(target.attributes('role')).toBe('group')
    expect(target.attributes('aria-label')).toBeTruthy()
    expect(wrapper.find('ul[role=presentation]').exists()).toBe(true)
    expect(wrapper.find('li[role=menuitem]').exists()).toBe(false)
    expect(wrapper.findAll('li[role=presentation]')).toHaveLength(2)
    expect(wrapper.find('li[tabindex]').exists()).toBe(false)
    await boxes[0].setValue(true)
    expect(emitted).toEqual(['a'])
  } finally {
    wrapper.unmount()
  }
})

test('custom nested buttons keep ownership of activation', async () => {
  let presses = 0,
    changes = 0
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () =>
      h(
        Editor,
        {
          options: props,
          modelValue: props.modelValue,
          'onUpdate:modelValue': () => {
            changes++
          },
        },
        {
          option: () =>
            h(
              'button',
              {
                type: 'button',
                onClick: () => {
                  presses++
                },
              },
              'Details',
            ),
        },
      ),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      searchOptionOnlyLabel: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const button = wrapper.findAll('button').find((item) => item.text() === 'Details')
    expect(button).toBeDefined()
    await button!.trigger('click')
    expect(presses).toBe(1)
    expect(changes).toBe(0)
  } finally {
    wrapper.unmount()
  }
})

test('keeps the named controls target as results disappear and return', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[aria-controls]')
    const targetId = input.attributes('aria-controls')
    const panel = wrapper.get(`[id="${targetId}"]`)
    expect(panel.attributes('role')).toBe('group')
    expect(panel.attributes('aria-label')).toBeTruthy()
    await wrapper.setProps({ inputValue: 'unmatched' })
    await flushPromises()
    expect(wrapper.get('input[aria-controls]').attributes('aria-controls')).toBe(targetId)
    expect(wrapper.get(`[id="${targetId}"]`).attributes('role')).toBe('group')
    expect(wrapper.findAll('input[type=checkbox]')).toHaveLength(0)
    await wrapper.setProps({ inputValue: 'Alpha' })
    await flushPromises()
    expect(wrapper.get(`[id="${targetId}"]`).attributes('role')).toBe('group')
    expect(wrapper.findAll('input[type=checkbox]')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('server output associates the editor search with its named group', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
  })
  const html = await renderToString(
    createSSRApp(Host, {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    }),
  )
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  const input = parsed.querySelector('input[aria-controls]')
  const target = input && parsed.getElementById(input.getAttribute('aria-controls')!)
  expect(target?.getAttribute('role')).toBe('group')
  expect(target?.getAttribute('aria-label')).toBeTruthy()
  expect(target?.querySelectorAll('input[type=checkbox]')).toHaveLength(1)
})

for (const key of ['ArrowDown', 'ArrowUp'] as const) {
  test(`focused checkbox owns ${key}`, async () => {
    let changes = 0
    const Host = defineComponent({
      props: cascaderProps,
      setup: (props) => () =>
        h(Editor, {
          options: props,
          modelValue: props.modelValue,
          'onUpdate:modelValue': () => {
            changes++
          },
        }),
    })
    const wrapper = mount(Host, {
      attachTo: document.body,
      props: {
        multiple: true,
        filterable: true,
        inputValue: 'Alpha',
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Alpha two' },
        ],
        modelValue: [],
      },
    })
    try {
      await flushPromises()
      const box = wrapper.get('input[type=checkbox]').element as HTMLInputElement
      box.focus()
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
      box.dispatchEvent(event)
      await flushPromises()
      expect(event.defaultPrevented).toBe(false)
      expect(document.activeElement).toBe(box)
      expect(changes).toBe(0)
    } finally {
      wrapper.unmount()
    }
  })
}

test.each(['Enter', ' '] as const)('checkbox activates once for %s', async (key) => {
  let changes = 0
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () =>
      h(Editor, {
        options: props,
        modelValue: props.modelValue,
        'onUpdate:modelValue': () => {
          changes++
        },
      }),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const box = wrapper.get('input[type=checkbox]').element as HTMLInputElement
    box.focus()
    box.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
    box.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true, cancelable: true }))
    await flushPromises()
    expect(changes).toBe(1)
  } finally {
    wrapper.unmount()
  }
})

test('multiple search group reports loading and clears it when results return', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const targetId = wrapper.get('input[aria-controls]').attributes('aria-controls')
    const group = () => wrapper.get(`[id="${targetId}"]`)
    expect(group().attributes('role')).toBe('group')
    expect(group().attributes('aria-busy')).toBeUndefined()
    await wrapper.setProps({ loading: true })
    await flushPromises()
    expect(group().attributes('aria-busy')).toBe('true')
    await wrapper.setProps({ loading: false })
    await flushPromises()
    expect(group().attributes('aria-busy')).toBeUndefined()
    expect(wrapper.findAll('input[type=checkbox]')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('server output marks the multiple search group busy during loading', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
  })
  const html = await renderToString(
    createSSRApp(Host, {
      multiple: true,
      filterable: true,
      loading: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    }),
  )
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  const input = parsed.querySelector('input[aria-controls]')
  const target = input && parsed.getElementById(input.getAttribute('aria-controls')!)
  expect(target?.getAttribute('role')).toBe('group')
  expect(target?.getAttribute('aria-busy')).toBe('true')
})

for (const mode of ['normal', 'prevented', 'composing', 'legacy-ime'] as const) {
  test(`search ArrowDown respects ${mode} and focuses the first enabled checkbox`, async () => {
    const Host = defineComponent({
      props: cascaderProps,
      setup: (props) => () =>
        h(Editor, {
          options: props,
          modelValue: props.modelValue,
          onKeydown: (event: KeyboardEvent) => {
            if (mode === 'prevented') {
              event.preventDefault()
            }
          },
        }),
    })
    const wrapper = mount(Host, {
      attachTo: document.body,
      props: {
        multiple: true,
        filterable: true,
        inputValue: 'Alpha',
        options: [
          { value: 'a', label: 'Alpha disabled', disabled: true },
          { value: 'b', label: 'Alpha enabled' },
        ],
        modelValue: [],
      },
    })
    try {
      await flushPromises()
      const search = wrapper.get('input[aria-controls]').element as HTMLInputElement
      const checkbox = wrapper.get('[title="Alpha enabled"] input[type=checkbox]').element as HTMLInputElement
      search.focus()
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
        isComposing: mode === 'composing',
        ...(mode === 'legacy-ime' ? { keyCode: 229 } : {}),
      })
      search.dispatchEvent(event)
      await flushPromises()
      expect(document.activeElement).toBe(mode === 'normal' ? checkbox : search)
      expect(event.defaultPrevented).toBe(mode === 'normal' || mode === 'prevented')
    } finally {
      wrapper.unmount()
    }
  })
}

test('search ArrowDown leaves focus in place when every result is disabled', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () => h(Editor, { options: props, modelValue: props.modelValue }),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha', disabled: true }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const search = wrapper.get('input[aria-controls]').element as HTMLInputElement
    search.focus()
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    search.dispatchEvent(event)
    expect(document.activeElement).toBe(search)
    expect(event.defaultPrevented).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('ArrowDown in custom option content does not focus a nested checkbox', async () => {
  const Host = defineComponent({
    props: cascaderProps,
    setup: (props) => () =>
      h(
        Editor,
        { options: props, modelValue: props.modelValue },
        {
          option: () =>
            h('div', [
              h('input', { 'aria-controls': 'custom-group' }),
              h('div', { id: 'custom-group', role: 'group' }, [
                h('div', { role: 'presentation', 'data-cascader-key': 'custom' }, [h('input', { type: 'checkbox' })]),
              ]),
            ]),
        },
      ),
  })
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      filterable: true,
      searchOptionOnlyLabel: true,
      inputValue: 'Alpha',
      options: [{ value: 'a', label: 'Alpha' }],
      modelValue: [],
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[aria-controls="custom-group"]').element as HTMLInputElement
    input.focus()
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    input.dispatchEvent(event)
    expect(document.activeElement).toBe(input)
    expect(event.defaultPrevented).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
