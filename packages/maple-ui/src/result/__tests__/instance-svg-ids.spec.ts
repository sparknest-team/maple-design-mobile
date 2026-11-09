import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Result from '../Result.vue'

const Fixture = defineComponent({
  render: () =>
    h(
      'div',
      ['403', '403', '500', '500'].map((status) => h(Result, { status: status as '403' | '500' })),
    ),
})

function verifyReferences(root: Element) {
  const svgs = Array.from(root.querySelectorAll('svg'))
  expect(svgs).toHaveLength(4)
  const ids = Array.from(root.querySelectorAll('[id]'), (node) => node.id)
  expect(ids.length).toBeGreaterThan(20)
  expect(new Set(ids).size).toBe(ids.length)
  for (const svg of svgs) {
    let references = 0
    for (const node of Array.from(svg.querySelectorAll('*'))) {
      for (const attr of Array.from(node.attributes)) {
        const match =
          attr.value.match(/url\(["']?#([^"')]+)["']?\)/) || (attr.name === 'href' ? attr.value.match(/^#(.+)$/) : null)
        if (!match) {
          continue
        }
        references++
        expect(document.getElementById(match[1])?.closest('svg')).toBe(svg)
      }
    }
    expect(references).toBeGreaterThan(0)
  }
}

test('each HTTP illustration references definitions in its own instance', () => {
  const wrapper = mount(Fixture, { attachTo: document.body })
  try {
    verifyReferences(wrapper.element)
  } finally {
    wrapper.unmount()
  }
})

test('SSR identifiers match hydration for repeated illustrations', async () => {
  const html = await renderToString(createSSRApp(Fixture))
  const container = document.createElement('div')
  document.body.appendChild(container)
  container.innerHTML = html
  const warnings = vi.spyOn(console, 'warn')
  const app = createSSRApp(Fixture)
  try {
    app.mount(container)
    expect(warnings.mock.calls.filter((args) => String(args[0]).includes('Hydration'))).toHaveLength(0)
    verifyReferences(container)
  } finally {
    app.unmount()
    warnings.mockRestore()
    container.remove()
  }
})
