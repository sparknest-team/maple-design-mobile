import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

for (const scenario of ['normal', 'controlled', 'prevented', 'disabled', 'readonly', 'loading', 'composing'] as const) {
  test(`ArrowDown opens a closed direct Cascader only when allowed (${scenario})`, async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        popupContainer: false,
        options: [{ value: 'a', label: 'Alpha' }],
        ...(scenario === 'controlled' ? { open: false } : {}),
        ...(scenario === 'prevented' ? { onKeydown: (event: KeyboardEvent) => event.preventDefault() } : {}),
        ...(scenario === 'disabled' ? { disabled: true } : {}),
        ...(scenario === 'readonly' ? { readonly: true } : {}),
        ...(scenario === 'loading' ? { loading: true } : {}),
      },
    })
    try {
      const input = wrapper.get('input[role="combobox"]')
      ;(input.element as HTMLElement).focus()
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
        isComposing: scenario === 'composing',
      })
      input.element.dispatchEvent(event)
      await flushPromises()
      expect(input.attributes('aria-expanded')).toBe(scenario === 'normal' ? 'true' : 'false')
      expect(wrapper.emitted('update:open')).toEqual(
        scenario === 'normal' || scenario === 'controlled' ? [[true]] : undefined,
      )
      if (scenario === 'normal') {
        expect(wrapper.find(':is([role="menuitem"],[role="menuitemradio"])').exists()).toBe(true)
      }
      if (scenario === 'controlled') {
        expect(wrapper.find(':is([role="menuitem"],[role="menuitemradio"])').isVisible()).toBe(false)
      }
    } finally {
      wrapper.unmount()
    }
  })
}

test('ArrowDown and Enter select the first enabled option after opening', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    for (const key of ['ArrowDown', 'Enter']) {
      input.element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
      await flushPromises()
    }
    expect(wrapper.emitted('update:modelValue')).toEqual([['a']])
    expect(input.attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

for (const config of [{ openTriggerTarget: 'icon' as const }, { filterable: true }]) {
  test(`ArrowDown opens the closed field with ${JSON.stringify(config)}`, async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        popupContainer: false,
        options: [{ value: 'a', label: 'Alpha' }],
        ...config,
      },
    })
    try {
      const input = wrapper.get('input[role="combobox"]')
      ;(input.element as HTMLElement).focus()
      input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(input.attributes('aria-expanded')).toBe('true')
      expect(wrapper.emitted('update:open')).toEqual([[true]])
    } finally {
      wrapper.unmount()
    }
  })
}

test('opening does not move active selection when a listener moves focus elsewhere', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      options: [{ value: 'a', label: 'Alpha' }],
      onOpenChange: (open: boolean) => {
        if (open) {
          outside.focus()
        }
      },
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(document.activeElement).toBe(outside)
    expect(
      wrapper
        .get(':is([role="menuitem"],[role="menuitemradio"])')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(false)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('a rejected controlled open does not activate a hidden option', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      open: false,
      options: [{ value: 'a', label: 'Alpha' }],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    await wrapper.setProps({ open: true })
    await flushPromises()
    expect(
      wrapper
        .get(':is([role="menuitem"],[role="menuitemradio"])')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('a controlled parent accepting the request activates the first enabled option', async () => {
  const opened = ref(false)
  const values: unknown[] = []
  const wrapper = mount(
    {
      render: () =>
        h(Cascader, {
          editMode: 'direct',
          popupContainer: false,
          open: opened.value,
          options: [
            { value: 'disabled', label: 'Disabled', disabled: true },
            { value: 'a', label: 'Alpha' },
          ],
          'onUpdate:open': (value: boolean) => {
            opened.value = value
          },
          'onUpdate:modelValue': (value: unknown) => values.push(value),
        }),
    },
    { attachTo: document.body },
  )
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    for (const key of ['ArrowDown', 'Enter']) {
      input.element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
      await flushPromises()
    }
    expect(values).toEqual(['a'])
    expect(opened.value).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('opening retains the already selected option instead of activating the first', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      modelValue: 'b',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(
      wrapper
        .get('[title="Beta"]')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(true)
    expect(
      wrapper
        .get('[title="Alpha"]')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('activates an option that arrives after the keyboard-open request', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      options: [],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    await wrapper.setProps({
      options: [
        { value: 'disabled', label: 'Disabled', disabled: true },
        { value: 'a', label: 'Alpha' },
      ],
    })
    await flushPromises()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['a']])
  } finally {
    wrapper.unmount()
  }
})

for (const cancellation of ['blur', 'escape', 'pointer'] as const) {
  test(`a delayed option is not activated after ${cancellation}`, async () => {
    const outside = document.createElement('button')
    document.body.append(outside)
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        popupContainer: false,
        options: [],
      },
    })
    try {
      const input = wrapper.get('input[role="combobox"]')
      ;(input.element as HTMLElement).focus()
      input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
      await flushPromises()
      if (cancellation === 'blur') {
        outside.focus()
      }
      if (cancellation === 'escape') {
        input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
      }
      if (cancellation === 'pointer') {
        outside.dispatchEvent(new Event('pointerdown', { bubbles: true }))
      }
      await flushPromises()
      await wrapper.setProps({ options: [{ value: 'a', label: 'Alpha' }] })
      await flushPromises()
      const option = wrapper.find(':is([role="menuitem"],[role="menuitemradio"])')
      if (option.exists()) {
        expect(option.classes().some((name) => name.endsWith('-active'))).toBe(false)
      }
    } finally {
      wrapper.unmount()
      outside.remove()
    }
  })
}

test('an externally closed request does not activate options on a later reopen', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      options: [],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    await wrapper.setProps({ open: false })
    await flushPromises()
    await wrapper.setProps({ options: [{ value: 'a', label: 'Alpha' }], open: true })
    await flushPromises()
    expect(
      wrapper
        .get('[title="Alpha"]')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('a later key cancels the pending activation', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      popupContainer: false,
      options: [],
    },
  })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }))
    await wrapper.setProps({ options: [{ value: 'a', label: 'Alpha' }] })
    await flushPromises()
    expect(
      wrapper
        .get('[title="Alpha"]')
        .classes()
        .some((name) => name.endsWith('-active')),
    ).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('ArrowDown enters the open hierarchy dialog at its enabled menu entry', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: {
    editMode: 'direct', popupContainer: false, defaultOpen: true,
    options: [{ value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'parent', label: 'Parent', children: [{ value: 'leaf', label: 'Leaf' }] }],
  } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    const dialog = wrapper.get('[role="dialog"]')
    expect(input.attributes('aria-haspopup')).toBe('dialog')
    expect(input.attributes('aria-controls')).toBe(dialog.attributes('id'))
    expect(dialog.attributes('aria-label')).toBeTruthy()
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(dialog.get('[role="menuitem"][tabindex="0"]').element)
    await dialog.get('[role="menuitem"][tabindex="0"]').trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(document.activeElement?.textContent).toContain('Leaf')
  } finally { wrapper.unmount() }
})

test.each(['open', 'closed'] as const)('opening from a %s shadow root activates the first enabled option', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode })
  const container = document.createElement('div')
  root.append(container)
  const wrapper = mount(Cascader, { attachTo: container, props: {
    editMode: 'direct', popupContainer: false,
    options: [{ value: 'disabled', label: 'Disabled', disabled: true }, { value: 'a', label: 'Alpha' }],
  } })
  try {
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    expect(document.activeElement).toBe(host)
    expect(root.activeElement).toBe(input.element)
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['a']])
    expect(input.attributes('aria-expanded')).toBe('false')
  } finally { wrapper.unmount(); host.remove() }
})
