import { h, nextTick, toRaw } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { Menu, MenuGroup, MenuOption, MenuSubmenu } from '../index'

const cleanups = []
afterEach(() => {
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup())
})
const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 40))
  await nextTick()
}
async function create(props = {}, content = undefined) {
  const root = document.createElement('div')
  document.body.append(root)
  const popup = document.createElement('div')
  document.body.append(popup)
  const wrapper = mount(Menu, {
    attachTo: root,
    props: { defaultOpen: true, popupContainer: popup, hideOnSelect: false, ...props },
    slots: { default: () => h('button', 'open menu'), ...(content ? { content } : {}) },
  })
  cleanups.push(() => {
    wrapper.unmount()
    root.remove()
    popup.remove()
  })
  await settle()
  return {
    wrapper,
    popup,
    button: root.querySelector('button'),
    items: () => Array.from(popup.querySelectorAll('[data-menu-item]')),
  }
}
async function key(key) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  await settle()
}
async function click(element) {
  element.click()
  await settle()
}

describe('Menu adapter contract', () => {
  test('options and slots share controlled selection and emit update before select', async () => {
    const calls = []
    const options = [
      { value: false, label: 'False' },
      { value: 0, label: 'Zero', children: [] },
    ]
    const { wrapper, items } = await create(
      {
        options,
        modelValue: false,
        'onUpdate:modelValue': (value) => calls.push(['update', value]),
        onSelect: (value, option, event) => calls.push(['select', value, toRaw(option), event]),
      },
      () => h(MenuOption, { value: 'slot', label: 'Slot' }),
    )
    expect(items()).toHaveLength(3)
    await click(items()[1])
    expect(calls[0]).toEqual(['update', 0])
    expect(calls[1].slice(0, 3)).toEqual(['select', 0, options[1]])
    expect(calls[1][3]).toBeInstanceOf(Event)
    await click(items()[2])
    expect(wrapper.emitted('update:modelValue')[1]).toEqual(['slot'])
  })
  test('multiple rejection keeps both row and checkbox unchecked on repeated clicks', async () => {
    const { wrapper, items } = await create({ multiple: true, modelValue: [], options: [{ value: 'a', label: 'A' }] })
    await click(items()[0])
    expect(items()[0].getAttribute('aria-checked')).toBe('false')
    const checkbox = items()[0].querySelector('input[type="checkbox"], [role="checkbox"], [tabindex="0"]')
    expect(checkbox).toBeTruthy()
    await click(checkbox)
    expect(items()[0].getAttribute('aria-checked')).toBe('false')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a']], [['a']]])
    await wrapper.setProps({ modelValue: ['a'] })
    expect(items()[0].getAttribute('aria-checked')).toBe('true')
  })
  test('multiple branch selection includes closed descendants and excludes disabled branches', async () => {
    const { wrapper, items } = await create({
      multiple: true,
      options: [
        {
          value: 'p',
          label: 'Parent',
          children: [
            { value: 'a', label: 'A' },
            { value: 'off', label: 'Off', disabled: true, children: [{ value: 'x', label: 'X' }] },
          ],
        },
      ],
    })
    await click(items()[0])
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([['p', 'a']])
    expect(wrapper.emitted('select')[0][0]).toBe('p')
    await wrapper.setProps({ modelValue: ['a'] })
    // All enabled descendants are selected; disabled descendants do not make it mixed.
    expect(items()[0].getAttribute('aria-checked')).toBe('false')
  })
  test('Arrow/Home/End wrap, skip disabled rows and Enter selects once', async () => {
    const { wrapper, items, button } = await create({
      options: [
        { value: 'a', label: 'A' },
        { value: 'off', label: 'Off', disabled: true },
        { value: 'b', label: 'B' },
      ],
    })
    button.focus()
    await key('ArrowDown')
    expect(document.activeElement).toBe(items()[0])
    await key('ArrowDown')
    expect(document.activeElement).toBe(items()[2])
    await key('ArrowDown')
    expect(document.activeElement).toBe(items()[0])
    await key('End')
    expect(document.activeElement).toBe(items()[2])
    await key('Home')
    expect(document.activeElement).toBe(items()[0])
    await key('Enter')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')[0][0]).toBe('a')
  })
  test('closed trigger opens with ArrowUp and Escape restores reference focus', async () => {
    const { wrapper, items, button } = await create({
      defaultOpen: false,
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ],
    })
    button.focus()
    await key('ArrowUp')
    expect(wrapper.emitted('update:open')[0]).toEqual([true])
    expect(document.activeElement).toBe(items()[1])
    await key('Escape')
    expect(wrapper.emitted('update:open')[1]).toEqual([false])
    expect(document.activeElement).toBe(button)
  })
  test('focus trigger stays closed after Escape and after selection restores focus', async () => {
    const { wrapper, items, button } = await create({
      defaultOpen: false,
      trigger: 'focus',
      hideOnSelect: true,
      options: [{ value: 'a', label: 'A' }],
    })
    button.focus()
    await settle()
    await key('ArrowDown')
    await key('Escape')
    expect(document.activeElement).toBe(button)
    expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
    button.blur()
    button.focus()
    await settle()
    await key('ArrowDown')
    await key('Enter')
    expect(document.activeElement).toBe(button)
    expect(wrapper.emitted('update:open')).toEqual([[true], [false], [true], [false]])
  })
  test('rejected close does not restore focus or change controlled visibility', async () => {
    const { wrapper, items } = await create({ open: true, options: [{ value: 'a', label: 'A' }] })
    items()[0].focus()
    await key('Escape')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(document.activeElement).toBe(items()[0])
  })
  test('submenu owns navigation and Escape closes exactly one layer', async () => {
    const { wrapper, items, button, popup } = await create({
      options: [
        {
          value: 'p',
          label: 'Parent',
          children: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ],
        },
      ],
    })
    const parent = items()[0]
    parent.focus()
    await key('ArrowRight')
    expect(document.activeElement.textContent).toContain('A')
    await key('ArrowDown')
    expect(document.activeElement.textContent).toContain('B')
    await key('Escape')
    expect(document.activeElement).toBe(parent)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await key('Escape')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(document.activeElement).toBe(button)
  })
  test('editable menu content retains native Home/End and text keys', async () => {
    const { popup } = await create({}, () =>
      h(MenuOption, { value: 'input' }, { default: () => h('input', { value: 'draft' }) }),
    )
    const input = popup.querySelector('input')
    input.focus()
    for (const key of ['Home', 'End', 'Enter', ' ']) {
      const event = new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true })
      window.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
      expect(document.activeElement).toBe(input)
    }
  })
  test('dynamic options and field names update labels, values and disabled state', async () => {
    const { wrapper, items } = await create({
      fieldNames: { label: 'text', value: 'id', disabled: 'off' },
      options: [{ text: 'Old', id: 1 }],
    })
    await wrapper.setProps({
      options: [
        { text: 'New', id: 2, off: true },
        { text: 'Ready', id: 3 },
      ],
    })
    await click(items()[0])
    expect(wrapper.emitted('select')).toBeUndefined()
    await click(items()[1])
    expect(wrapper.emitted('select')[0][0]).toBe(3)
  })
  test('public slot submenu and group share keyboard navigation and selection', async () => {
    const { wrapper, items } = await create({}, () =>
      h(MenuGroup, { title: 'Actions' }, () =>
        h(
          MenuSubmenu,
          {},
          {
            default: () => 'More',
            content: () => h(MenuOption, { label: 'Slot child', value: 42 }),
          },
        ),
      ),
    )
    const parent = items()[0]
    parent.focus()
    await key('ArrowRight')
    expect(document.activeElement.textContent).toContain('Slot child')
    await key('Enter')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')[0][0]).toBe(42)
    await key('ArrowLeft')
    expect(document.activeElement).toBe(parent)
  })
  test('opening a sibling closes the previous submenu, including slot branches', async () => {
    const { items, popup } = await create({}, () =>
      ['First', 'Second'].map((label) =>
        h(
          MenuSubmenu,
          {},
          {
            default: () => label,
            content: () => h(MenuOption, { label: label + ' child' }),
          },
        ),
      ),
    )
    const first = items().find((item) => item.textContent === 'First')
    const second = items().find((item) => item.textContent === 'Second')
    first.focus()
    await key('ArrowRight')
    expect(document.activeElement.textContent).toContain('First child')
    second.focus()
    await key('ArrowRight')
    expect(document.activeElement.textContent).toContain('Second child')
    await key('Escape')
    expect(document.activeElement).toBe(second)
    await key('ArrowRight')
    expect(document.activeElement.textContent).toContain('Second child')
  })
  test('slot-only values fall back to text and functional labels receive raw options', async () => {
    const label = vi.fn((option, checked) => h('span', checked ? 'Checked' : option.title))
    const { wrapper, items } = await create(
      { modelValue: 'fn', options: [{ value: 'fn', title: 'Function', label }] },
      () => h(MenuOption, {}, () => 'Slot value'),
    )
    expect(items()[0].textContent).toContain('Checked')
    expect(label.mock.calls[0][0].title).toBe('Function')
    await click(items()[1])
    expect(wrapper.emitted('select')[0][0]).toBe('Slot value')
  })
  test('Space selects exactly once across keydown and keyup', async () => {
    const { wrapper, items } = await create({ options: [{ label: 'A', value: 'a' }] })
    items()[0].focus()
    await key(' ')
    window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true, cancelable: true }))
    await settle()
    expect(wrapper.emitted('select')).toHaveLength(1)
  })
})
