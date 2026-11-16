// Copy to src/cascader/__tests__/dialog-spike.spec.ts after generate.py.
import { createSSRApp, defineComponent, h, onBeforeUnmount } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../Cascader.vue'

const props = {
  multiple: true,
  filterable: true,
  editMode: 'direct' as const,
  defaultOpen: true,
  popupContainer: false as const,
  inputValue: 'Alpha',
  options: [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Alpha two' },
  ],
}

test('SSR exposes a named dialog with a single checkbox tab stop per result', async () => {
  const html = await renderToString(createSSRApp({ render: () => h(Cascader, props) }))
  const host = document.createElement('div')
  host.innerHTML = html
  const input = host.querySelector('input[role="combobox"]')!
  const dialog = host.querySelector('[role="dialog"]')!
  expect(dialog).toBeTruthy()
  expect(dialog.getAttribute('aria-label')).toBeTruthy()
  expect(input.getAttribute('aria-haspopup')).toBe('dialog')
  expect(input.getAttribute('aria-controls')).toBe(dialog.id)
  expect(dialog.querySelectorAll('input[type="checkbox"]')).toHaveLength(2)
  expect(Array.from(dialog.querySelectorAll('li')).every((item) => item.tabIndex < 0)).toBe(true)
})

test('checkbox toggles selection in the dialog', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const checkbox = wrapper.get('[title="Alpha"] input[type="checkbox"]')
    await checkbox.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a']])
  } finally {
    wrapper.unmount()
  }
})

test('ArrowDown moves focus from the combobox into the dialog', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[role="dialog"] input[type="checkbox"]').element)
  } finally {
    wrapper.unmount()
  }
})

test('Escape from a dialog checkbox closes and restores input focus', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    const checkbox = wrapper.get('[role="dialog"] input[type="checkbox"]')
    ;(checkbox.element as HTMLElement).focus()
    await checkbox.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('a caller-provided popup role does not claim the generated dialog', async () => {
  const wrapper = mount(Cascader, { props: { ...props, 'aria-haspopup': 'tree' } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    expect(input.attributes('aria-haspopup')).toBe('tree')
    expect(input.attributes('aria-controls')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([{ 'aria-haspopup': 'tree' }, { 'aria-controls': 'external-popup' }])(
  'custom popup ownership does not transfer focus to the generated dialog: %o',
  async (attrs) => {
    const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, ...attrs } })
    try {
      await flushPromises()
      const input = wrapper.get('input[role="combobox"]')
      ;(input.element as HTMLElement).focus()
      await input.trigger('keydown', { key: 'ArrowDown' })
      await flushPromises()
      expect(document.activeElement).toBe(input.element)
    } finally {
      wrapper.unmount()
    }
  },
)

test.each([{ readonly: true }, { loading: true }])('blocked field does not transfer focus: %o', async (blocked) => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, ...blocked } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('interactive option slot owns its click without selecting the result', async () => {
  let clicks = 0
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h('button', { type: 'button', class: 'slot-action', onClick: () => clicks++ }, 'Details') },
  })
  try {
    await flushPromises()
    const button = wrapper.get('[role="dialog"] .slot-action')
    await button.trigger('click')
    expect(clicks).toBe(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('[role="dialog"] input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a']])
  } finally {
    wrapper.unmount()
  }
})

test('controlled open remains open until its parent accepts Escape', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, open: true } })
  try {
    await flushPromises()
    const checkbox = wrapper.get('[role="dialog"] input[type="checkbox"]')
    ;(checkbox.element as HTMLElement).focus()
    await checkbox.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    expect(wrapper.get('input[role="combobox"]').attributes('aria-expanded')).toBe('true')
    await wrapper.setProps({ open: false })
    await flushPromises()
    expect(wrapper.get('input[role="combobox"]').attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

test('ArrowDown enters a dialog teleported into a custom container', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, popupContainer: container } })
  try {
    await flushPromises()
    const dialog = container.querySelector('[role="dialog"]')!
    expect(dialog).toBeTruthy()
    const input = wrapper.get('input[role="combobox"]')
    expect(input.attributes('aria-controls')).toBe(dialog.id)
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(dialog.querySelector('input[type="checkbox"]'))
  } finally {
    wrapper.unmount()
    container.remove()
  }
})

test('closed searchable multiple field advertises its dialog before opening', async () => {
  const wrapper = mount(Cascader, { props: { ...props, defaultOpen: false } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-haspopup')).toBe('dialog')
  } finally {
    wrapper.unmount()
  }
})

test('opening with ArrowDown keeps input focus, then enters the dialog', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, defaultOpen: false } })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.activeElement).toBe(input.element)
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.get('[role="dialog"] input[type="checkbox"]').element)
  } finally {
    wrapper.unmount()
  }
})

test.each(['remove-first', 'remove-all'] as const)(
  'focused search result survives %s without losing focus',
  async (mode) => {
    const wrapper = mount(Cascader, { attachTo: document.body, props })
    try {
      await flushPromises()
      const input = wrapper.get('input[role="combobox"]')
      const checkbox = wrapper.get('[role="dialog"] input[type="checkbox"]')
      ;(checkbox.element as HTMLElement).focus()
      expect(document.activeElement).toBe(checkbox.element)
      await wrapper.setProps({ options: mode === 'remove-first' ? [props.options[1]] : [] })
      await flushPromises()
      const active = document.activeElement
      const next = wrapper.find('[role="dialog"] input[type="checkbox"]')
      expect(
        active === input.element ||
          active === wrapper.get('[role="dialog"]').element ||
          (next.exists() && active === next.element),
      ).toBe(true)
    } finally {
      wrapper.unmount()
    }
  },
)

test('does not reclaim focus when the user moves outside during a result update', async () => {
  const outside = document.createElement('button')
  document.body.appendChild(outside)
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[role="dialog"] input[type="checkbox"]').element as HTMLElement).focus()
    const update = wrapper.setProps({ options: [] })
    outside.focus()
    await update
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test.each(['single', 'nested'] as const)(
  'a %s Shadow DOM result unmount does not reclaim focus moved outside during patch',
  async (kind) => {
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    const mountPoint = document.createElement('div')
    const outside = document.createElement('button')
    if (kind === 'nested') {
      const innerHost = document.createElement('div')
      shadow.append(innerHost, outside)
      innerHost.attachShadow({ mode: 'open' }).appendChild(mountPoint)
      document.body.append(host)
    } else {
      shadow.appendChild(mountPoint)
      document.body.append(host, outside)
    }
    const SlotContent = defineComponent({
      setup() {
        onBeforeUnmount(() => outside.focus())
        return () => h('span', 'Result')
      },
    })
    const wrapper = mount(Cascader, {
      attachTo: mountPoint,
      props: { ...props, searchOptionOnlyLabel: true },
      slots: { option: () => h(SlotContent) },
    })
    try {
      await flushPromises()
      ;(wrapper.get('[role="dialog"] input[type="checkbox"]').element as HTMLElement).focus()
      await wrapper.setProps({ options: [] })
      await flushPromises()
      expect(kind === 'nested' ? shadow.activeElement : document.activeElement).toBe(outside)
    } finally {
      wrapper.unmount()
      host.remove()
      outside.remove()
    }
  },
)

test('Escape from an emptied dialog returns focus to the search input', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    ;(wrapper.get('[role="dialog"] input[type="checkbox"]').element as HTMLElement).focus()
    await wrapper.setProps({ options: [] })
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    expect(document.activeElement).toBe(input.element)
    await input.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
  } finally {
    wrapper.unmount()
  }
})

test('invalid contenteditable option content remains selectable in the dialog', async () => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h('span', { contenteditable: 'invalid', class: 'slot-text' }, 'Details') },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="dialog"] .slot-text').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a']])
  } finally {
    wrapper.unmount()
  }
})

test.each([{ 'aria-haspopup': 'tree' }, { 'aria-controls': 'external-popup' }])(
  'explicit external ownership retains the existing menu: %o',
  async (attrs) => {
    const wrapper = mount(Cascader, { attachTo: document.body, props: { ...props, ...attrs } })
    try {
      await flushPromises()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
      expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  },
)

test('switching to an explicitly owned tree preserves focused checkbox', async () => {
  const wrapper = mount(Cascader, { attachTo: document.body, props })
  try {
    await flushPromises()
    const checkbox = wrapper.get('[role="dialog"] input[type="checkbox"]')
    ;(checkbox.element as HTMLElement).focus()
    await wrapper.setProps({ 'aria-haspopup': 'tree' } as unknown as Parameters<typeof wrapper.setProps>[0])
    await flushPromises()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement).toBe(checkbox.element)
  } finally {
    wrapper.unmount()
  }
})

test('Enter on an interactive custom option belongs to the control, not the cascader', async () => {
  let presses = 0
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: {
      option: () => h('button', { type: 'button', class: 'nested-action', onKeydown: () => presses++ }, 'Details'),
    },
  })
  try {
    await flushPromises()
    const button = wrapper.findAll('.nested-action')[0]
    ;(button.element as HTMLElement).focus()
    await button.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(presses).toBe(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([' ', 'ArrowDown', 'ArrowUp'])('custom option control keeps its %s key without selection', async (key) => {
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: { ...props, searchOptionOnlyLabel: true },
    slots: { option: () => h('input', { class: 'nested-input', type: 'text' }) },
  })
  try {
    await flushPromises()
    const input = wrapper.findAll('.nested-input')[0]
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key })
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('does not claim an automatically controlled dialog across a shadow boundary', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const mountPoint = document.createElement('div')
  root.append(mountPoint)
  const wrapper = mount(Cascader, { attachTo: mountPoint, props: { ...props, popupContainer: 'body' } })
  try {
    await flushPromises()
    const input = root.querySelector('input[role="combobox"]')!
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).toBeTruthy()
    const controls = input.getAttribute('aria-controls')
    expect(!controls || root.getElementById(controls)).toBeTruthy()
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test.each(['open', 'closed'] as const)('dialog relationship follows %s shadow root and popup moves', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode })
  const target = document.createElement('div')
  root.append(target)
  const wrapper = mount(Cascader, { attachTo: target, props })
  try {
    await flushPromises()
    const input = root.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const sameDialog = root.querySelector<HTMLElement>('[role="dialog"]')!
    expect(input.getAttribute('aria-controls')).toBe(sameDialog.id)
    await wrapper.setProps({ popupContainer: 'body' })
    await flushPromises()
    const outsideDialog = document.body.querySelector<HTMLElement>('[role="dialog"]')!
    expect(outsideDialog).toBe(sameDialog)
    expect(input.hasAttribute('aria-controls')).toBe(false)
    input.focus()
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true, cancelable: true }),
    )
    await flushPromises()
    expect(document.activeElement).toBe(outsideDialog.querySelector('input[type="checkbox"]'))
    await wrapper.setProps({ popupContainer: false })
    await flushPromises()
    expect(root.querySelector('[role="dialog"]')).toBe(sameDialog)
    expect(input.getAttribute('aria-controls')).toBe(sameDialog.id)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
