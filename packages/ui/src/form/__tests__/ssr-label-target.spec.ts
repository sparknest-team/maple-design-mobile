import { createSSRApp, h, nextTick, reactive } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, it } from 'vitest'
import FormItem from '../FormItem.vue'

it('keeps one explicit native label target through SSR, hydration and read-only display', async () => {
  const state = reactive({ readPretty: false, attrs: { for: 'first', htmlFor: 'second' } as Record<string, string> })
  const create = () => createSSRApp({ render: () => h(FormItem, {
    label: 'Contact', readPretty: state.readPretty, labelAttrs: state.attrs,
  }, () => [h('input', { id: 'first' }), h('input', { id: 'second' })]) })
  const container = document.createElement('div')
  document.body.append(container)
  const app = create()
  let mounted = false
  try {
    const html = await renderToString(create())
    const tag = html.match(/<label\b[^>]*>/)?.[0]
    expect(tag?.match(/\sfor="/g)).toHaveLength(1)
    container.innerHTML = html
    const label = container.querySelector('label')!
    const [first, second] = container.querySelectorAll('input')
    expect(label.control).toBe(first)
    app.mount(container)
    mounted = true
    await nextTick()
    expect(label.control).toBe(first)
    state.attrs = { htmlFor: 'second' }
    await nextTick()
    expect(label.control).toBe(second)
    state.readPretty = true
    await nextTick()
    expect(label.control).toBeNull()
    expect((await renderToString(create())).match(/<label\b[^>]*>/)?.[0]).not.toContain(' for=')
    state.readPretty = false
    await nextTick()
    expect(label.control).toBe(second)
  } finally {
    if (mounted) app.unmount()
    container.remove()
  }
})
