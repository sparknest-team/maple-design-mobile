import { createApp, defineComponent, h, inject, nextTick, ref, type AppContext } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Dialog from '..'

const handles: ReturnType<typeof Dialog.open>[] = []
const nodes: HTMLElement[] = []
let serial = 0
function target(doc = document) {
  const node = doc.createElement('div')
  node.id = 'dialog-service-target-' + ++serial
  doc.body.append(node)
  nodes.push(node)
  return node
}
function open(config: Parameters<typeof Dialog.open>[0], context?: AppContext) {
  const handle = Dialog.open(config, context)
  handles.push(handle)
  return handle
}
afterEach(async () => {
  handles.splice(0).forEach((handle) => handle.close())
  await new Promise((resolve) => setTimeout(resolve, 360))
  await flushPromises()
  nodes.splice(0).forEach((node) => node.remove())
  Dialog.resetDefaultOptions()
  vi.restoreAllMocks()
})
for (const kind of ['selector', 'element'] as const) {
  test(`service respects its explicit ${kind} popup container and removes all teleported content`, async () => {
    const container = target(),
      onClosed = vi.fn(() => new Promise<void>(() => {}))
    const handle = open({
      title: 'Owned dialog',
      message: 'Content',
      popupContainer: kind === 'selector' ? '#' + container.id : container,
      onClosed,
    })
    await flushPromises()
    expect(container.querySelector('[role="dialog"]')).not.toBeNull()
    handle.close()
    expect(await handle).toBe('close')
    await new Promise((resolve) => setTimeout(resolve, 360))
    await flushPromises()
    expect(container.childNodes.length).toBe(0)
    expect(onClosed).toHaveBeenCalledTimes(1)
  })
}
test('default service options retain their configured container', async () => {
  const container = target()
  Dialog.setDefaultOptions({ popupContainer: container })
  open({ title: 'Default target' })
  await flushPromises()
  expect(container.querySelector('[role="dialog"]')).not.toBeNull()
})
test('updating a container migrates the same content instance and preserves app context and draft', async () => {
  const first = target(),
    second = target(),
    app = createApp({})
  app.provide('container-context', 'Injected')
  let setups = 0
  const Content = defineComponent({
    setup() {
      setups++
      const label = inject('container-context'),
        draft = ref('Draft')
      return () =>
        h('div', { 'data-owned-content': '' }, [
          h('span', String(label)),
          h('input', {
            value: draft.value,
            onInput: (event: Event) => {
              draft.value = (event.target as HTMLInputElement).value
            },
          }),
        ])
    },
  })
  const handle = open({ popupContainer: first, content: () => h(Content) }, app._context)
  await flushPromises()
  const input = first.querySelector('input')!
  expect(input).not.toBeNull()
  input.value = 'Edited'
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  handle.update({ popupContainer: second })
  await flushPromises()
  expect(first.querySelector('[role="dialog"]')).toBeNull()
  expect(second.querySelector('input')).toBe(input)
  expect(input.value).toBe('Edited')
  expect(second.textContent).toContain('Injected')
  expect(setups).toBe(1)
})
test('false keeps service content inline in its own body host', async () => {
  const before = new Set(Array.from(document.body.children))
  open({ popupContainer: false, title: 'Inline service' })
  await flushPromises()
  const host = Array.from(document.body.children).find((node) => !before.has(node))!
  expect(host.querySelector('[role="dialog"]')).not.toBeNull()
})
test('an invalid selector follows the existing component fallback without throwing', async () => {
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
  open({ popupContainer: '[invalid-selector', title: 'Fallback' })
  await flushPromises()
  expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
  expect(warning).toHaveBeenCalled()
})
test('an element in another document owns the service content and cleanup', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  nodes.push(iframe)
  const container = target(iframe.contentDocument!)
  const handle = open({ popupContainer: container, title: 'Other document' })
  await flushPromises()
  const dialog = container.querySelector('[role="dialog"]')!
  expect(dialog).not.toBeNull()
  expect(dialog.ownerDocument).toBe(iframe.contentDocument)
  handle.close()
  await new Promise((resolve) => setTimeout(resolve, 360))
  await flushPromises()
  expect(container.childNodes.length).toBe(0)
})
