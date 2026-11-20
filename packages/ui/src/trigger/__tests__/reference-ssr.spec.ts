import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, it } from 'vitest'
import Trigger from '..'
import Tooltip from '../../tooltip'

it('preserves caller attributes after hydrating the SSR association and reference switch', async () => {
  const trigger = ref<any>()
  const root = {
    render: () =>
      h(
        Trigger,
        { ref: trigger, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'shared extra' } },
        {
          default: () => h('button', { 'aria-describedby': 'original shared' }, 'Anchor'),
          content: () => 'Details',
        },
      ),
  }
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(createSSRApp(root), context)
  const template = document.createElement('template')
  template.innerHTML = context.teleports?.body ?? ''
  const anchors = Array.from(template.content.childNodes)
  document.body.prepend(template.content)
  const host = document.createElement('div')
  document.body.append(host)
  host.innerHTML = html
  const button = host.querySelector('button')!
  expect(button.getAttribute('aria-describedby')).toBe('original shared extra')
  const external = document.createElement('button')
  document.body.append(external)
  const app = createSSRApp(root)
  try {
    app.mount(host)
    await nextTick()
    await nextTick()
    trigger.value.setReference(external)
    await nextTick()
    await nextTick()
    expect(button.getAttribute('aria-describedby')).toBe('original shared')
  } finally {
    app.unmount()
    host.remove()
    external.remove()
    anchors.forEach((node) => node.remove())
  }
})

it('renders explicit semantic reference attributes with existing descriptions on the server', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(
          Trigger,
          {
            open: true,
            popupContainer: false,
            referenceAttrs: { 'aria-describedby': 'shared extra', 'aria-expanded': true },
          },
          {
            default: () => h('button', { 'aria-describedby': 'original shared' }, 'Anchor'),
            content: () => 'Details',
          },
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  const button = container.querySelector('button')!
  expect(button.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['original', 'shared', 'extra'])
  expect(button.getAttribute('aria-expanded')).toBe('true')
})

it('links the initially open tooltip to the server-rendered content', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () => h(Tooltip, { open: true, content: 'Tip', popupContainer: false }, () => h('button', 'Anchor')),
    }),
  )
  const host = document.createElement('div')
  host.innerHTML = html
  const tooltip = host.querySelector('[role=tooltip]')!
  expect(tooltip.textContent).toBe('Tip')
  expect(host.querySelector('button')?.getAttribute('aria-describedby')).toBe(tooltip.id)
})
