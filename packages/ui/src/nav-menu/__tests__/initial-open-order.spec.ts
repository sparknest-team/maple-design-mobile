import { createSSRApp, defineAsyncComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

test.each([false, true])(
  'matches grouped default-open state through hydration (first disabled=%s)',
  async (disabled) => {
    const added = ref(false)
    const requests: string[] = []
    const item = (label: string, disabled = false) =>
      h(NavMenuItem, {
        key: label,
        label,
        disabled,
        defaultOpen: true,
        options: [{ key: label, label }],
        'onUpdate:open': (value: boolean) => requests.push(label + ':' + value),
      })
    const fixture = {
      render: () =>
        h(NavMenu, { popupContainer: false }, () => [
          item('First', disabled),
          item('Second'),
          ...(added.value ? [item('Later')] : []),
        ]),
    }
    const context: { teleports?: Record<string, string> } = {}
    const container = document.createElement('div')
    container.innerHTML = await renderToString(createSSRApp(fixture), context)
    const teleports = document.createElement('template')
    teleports.innerHTML = context.teleports?.body ?? ''
    const inserted = Array.from(teleports.content.childNodes)
    document.body.append(teleports.content, container)
    const buttons = () => Array.from(container.querySelectorAll('[data-nav-item]'))
    const expanded = () => buttons().map((button) => button.getAttribute('aria-expanded'))
    const initial = disabled ? ['false', 'true'] : ['true', 'false']
    const before = buttons()
    const app = createSSRApp(fixture)
    let mounted = false
    try {
      expect(expanded()).toEqual(initial)
      app.mount(container)
      mounted = true
      await nextTick()
      expect(expanded()).toEqual(initial)
      expect(requests).toEqual([])
      expect(buttons()[0]).toBe(before[0])
      expect(buttons()[1]).toBe(before[1])
      added.value = true
      await nextTick()
      expect(expanded()).toEqual(['false', 'false', 'true'])
      expect(requests).toEqual([disabled ? 'Second:false' : 'First:false'])
    } finally {
      if (mounted) {
        app.unmount()
      }
      container.remove()
      inserted.forEach((node) => node.remove())
    }
  },
)

test('removing the first entry preserves the active sibling panel and draft', async () => {
  const first = ref(true)
  const owner = mount(NavMenu, {
    attachTo: document.body,
    props: { popupContainer: false },
    slots: {
      default: () => [
        first.value
          ? h(NavMenuItem, { key: 'first', defaultOpen: true, label: 'First', options: [{ key: 'a', label: 'Alpha' }] })
          : null,
        h(NavMenuItem, { key: 'second', label: 'Second' }, { content: () => h('input', { id: 'draft' }) }),
      ],
    },
  })
  try {
    await flushPromises()
    await owner.findAll('button[data-nav-item]')[1].trigger('click')
    await flushPromises()
    const input = owner.get('input').element
    input.value = 'edited'
    input.focus()
    first.value = false
    await nextTick()
    await flushPromises()
    expect(owner.get('input').element).toBe(input)
    expect(input.value).toBe('edited')
    expect(document.activeElement).toBe(input)
    expect(owner.findAll('.mp-overlay')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})

test('standalone default-open panel uses viewport insets before its first measurement', async () => {
  const fixture = {
    render: () =>
      h(NavMenuItem, { defaultOpen: true, label: 'Menu', popupContainer: false }, { content: () => h('input') }),
  }
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(createSSRApp(fixture), context)
  const container = document.createElement('div')
  container.innerHTML = html + (context.teleports?.body ?? '')
  const overlay = container.querySelector<HTMLElement>('.mp-overlay')!
  expect(overlay.querySelector('input')).toBeTruthy()
  expect(overlay.style.top).toBe('var(--mp-nav-menu-height)')
  expect(overlay.style.height).toBe('')
  expect(overlay.style.width).toBe('')
})

test('hydrates the shared panel while its async item is still loading', async () => {
  const item = { render: () => h(NavMenuItem, { defaultOpen: true, label: 'Menu' }, { content: () => h('input') }) }
  const fixture = (row: typeof item | ReturnType<typeof defineAsyncComponent>) => ({
    render: () => h(NavMenu, { popupContainer: false }, () => h(row)),
  })
  const context: { teleports?: Record<string, string> } = {}
  const serverRow = defineAsyncComponent(async () => item)
  const container = document.createElement('div')
  container.innerHTML = await renderToString(createSSRApp(fixture(serverRow)), context)
  document.body.appendChild(container)
  let resolveItem!: (value: typeof item) => void
  const pending = new Promise<typeof item>((resolve) => {
    resolveItem = resolve
  })
  const client = createSSRApp(fixture(defineAsyncComponent(() => pending)))
  const warnings: string[] = []
  client.config.warnHandler = (message) => warnings.push(message)
  try {
    const input = container.querySelector('input')!
    expect(input).toBeTruthy()
    input.value = 'draft'
    input.focus()
    client.mount(container)
    expect(container.querySelector('input')).toBe(input)
    resolveItem(item)
    await flushPromises()
    expect(container.querySelector('input')).toBe(input)
    expect(document.activeElement).toBe(input)
    expect(input.value).toBe('draft')
    expect(warnings).toEqual([])
  } finally {
    client.unmount()
    container.remove()
  }
})
