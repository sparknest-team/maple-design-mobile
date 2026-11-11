import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test, vi } from 'vitest'
import Select from '../select'

test.each([false, true])('virtual Select renders and hydrates with controlled open=%s', async (open) => {
  const options = Array.from({ length: 200 }, (_, i) => ({ label: `Option ${i}`, value: String(i) }))
  const props = {
    editMode: 'direct' as const,
    open,
    modelValue: '199',
    popupContainer: false as const,
    options,
    virtualListProps: { height: 120, fixedSize: true, estimatedSize: 36, buffer: 1 },
  }
  const make = () => createSSRApp({ render: () => h(Select, props) })
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(make(), context)
  const template = document.createElement('template')
  template.innerHTML = context.teleports?.body ?? ''
  const teleportNodes = Array.from(template.content.childNodes)
  document.body.appendChild(template.content)
  expect(html).toContain('aria-expanded=')
  const root = document.createElement('div')
  root.innerHTML = html
  document.body.appendChild(root)
  const client = make()
  const warnings: string[] = []
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
  client.config.warnHandler = (message) => {
    warnings.push(message)
  }
  try {
    client.mount(root)
    await nextTick()
    expect(root.querySelector('input')?.getAttribute('aria-expanded')).toBe(String(open))
    expect(warnings.filter((message) => /hydration/i.test(message))).toEqual([])
    expect(errors.mock.calls.filter((args) => args.some((arg) => /hydration/i.test(String(arg))))).toEqual([])
  } finally {
    client.unmount()
    errors.mockRestore()
    root.remove()
    teleportNodes.forEach((node) => node.parentNode?.removeChild(node))
  }
})
