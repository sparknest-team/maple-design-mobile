import { createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { afterEach, beforeEach, expect, it } from 'vitest'
import Trigger, { type TriggerInstance } from '..'
import Tooltip from '../../tooltip'

// Each hydration represents a fresh page, including the body used as the Teleport target.
let previousBody: HTMLElement
beforeEach(() => {
  previousBody = document.body
  document.body = document.createElement('body')
})
afterEach(() => {
  document.body = previousBody
})

it.each([false, true])('restores hydrated attributes on reference switch (deferred=%s)', async (deferred) => {
  const trigger = ref<TriggerInstance>()
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
    if (deferred) {
      await nextTick()
    }
    trigger.value!.setReference(external)
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

it('merges semantic attributes while preserving caller-owned SSR data on a native reference', async () => {
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
            default: () =>
              h(
                'button',
                { 'aria-describedby': 'original shared', 'data-design-ui-trigger-ssr': 'app-owned' },
                'Anchor',
              ),
            content: () => 'Details',
          },
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  const button = container.querySelector('button')!
  expect(button.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['original', 'shared', 'extra'])
  expect(button.getAttribute('data-design-ui-trigger-ssr')).toBe('app-owned')
  expect(button.getAttribute('aria-expanded')).toBe('true')
})

it('preserves application data shaped like a marker with a non-semantic attribute', async () => {
  const name = 'data-design-ui-trigger-ssr'
  const value = '[ [ "title", null, "application" ] ]'
  const trigger = ref<TriggerInstance>()
  const anchor = { render: () => h('button', { [name]: value, [name + '-']: 'business', 'aria-label': 'Anchor' }) }
  const make = () =>
    createSSRApp({
      render: () =>
        h(
          Trigger,
          { ref: trigger, popupContainer: false, referenceAttrs: { 'aria-label': 'Details' } },
          { default: () => h(anchor) },
        ),
    })
  const host = document.createElement('div')
  host.innerHTML = await renderToString(make())
  const button = host.querySelector('button')!
  expect(button.getAttribute(name)).toBe(value)
  expect(button.getAttribute('aria-label')).toBe('Details')
  const app = make()
  try {
    app.mount(host)
    trigger.value!.setReference(document.createElement('button'))
    expect(button.getAttribute('aria-label')).toBe('Anchor')
    expect(button.getAttribute(name)).toBe(value)
    expect(button.getAttribute(name + '-')).toBe('business')
    expect(button.hasAttribute(name + '--')).toBe(false)
  } finally {
    app.unmount()
  }
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

it('preserves a multi-root component’s own description through hydration and release', async () => {
  const content = {
    render: () => h(Fragment, null, [h('button', { 'aria-describedby': 'inside' }, 'Anchor'), h('span', 'Sibling')]),
  }
  const trigger = ref<TriggerInstance>()
  const make = () =>
    createSSRApp({
      render: () =>
        h(
          Trigger,
          {
            ref: trigger,
            open: true,
            popupContainer: false,
            referenceAttrs: { 'aria-describedby': 'extra' },
          },
          { default: () => h(content), content: () => 'Tip' },
        ),
    })
  const container = document.createElement('div')
  container.innerHTML = await renderToString(make())
  document.body.append(container)
  const button = container.querySelector('button')!
  const app = make()
  try {
    expect(button.getAttribute('aria-describedby')).toBe('inside extra')
    app.mount(container)
    trigger.value!.setReference(document.createElement('button'))
    expect(container.querySelector('button')).toBe(button)
    expect(button.getAttribute('aria-describedby')).toBe('inside')
  } finally {
    app.unmount()
    container.remove()
  }
})

it('shares a nested component reference during SSR and releases each description separately', async () => {
  const outer = ref<TriggerInstance>()
  const inner = ref<TriggerInstance>()
  const anchor = { render: () => h('button', { 'aria-describedby': 'business' }, 'Anchor') }
  const make = () =>
    createSSRApp({
      render: () =>
        h(
          Trigger,
          {
            ref: outer,
            referenceAttrs: { 'aria-describedby': 'outer' },
          },
          {
            default: () =>
              h(
                Trigger,
                {
                  ref: inner,
                  referenceAttrs: { 'aria-describedby': 'inner' },
                },
                { default: () => h(anchor) },
              ),
          },
        ),
    })
  const host = document.createElement('div')
  const context: { teleports?: Record<string, string> } = {}
  host.innerHTML = await renderToString(make(), context)
  const portal = document.createElement('template')
  portal.innerHTML = context.teleports?.body ?? ''
  const anchors = Array.from(portal.content.childNodes)
  document.body.prepend(portal.content)
  const button = host.querySelector('button')!
  expect(button.getAttribute('aria-describedby')).toBe('business inner outer')
  const warnings: string[] = []
  const app = make()
  app.config.warnHandler = (message) => warnings.push(message)
  document.body.append(host)
  try {
    app.mount(host)
    expect(warnings).toEqual([])
    outer.value!.setReference(document.createElement('button'))
    expect(button.getAttribute('aria-describedby')).toBe('business inner')
    inner.value!.setReference(document.createElement('button'))
    expect(button.getAttribute('aria-describedby')).toBe('business')
  } finally {
    app.unmount()
    host.remove()
    anchors.forEach((node) => node.remove())
  }
})
