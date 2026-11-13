import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test } from 'vitest'
import Slider from '..'

test.each([false, true])('hydrates the plain slider description and preserves controls (range=%s)', async (range) => {
  const description = ref('Initial description')
  const root = {
    setup: () => () =>
      h(Slider, {
        modelValue: range ? [10, 30] : 20,
        range,
        showInput: true,
        showTooltip: false,
        'aria-description': description.value,
      }),
  }
  const html = await renderToString(createSSRApp(root))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const selector = '[role=slider], input[role=spinbutton]'
  const before = Array.from(container.querySelectorAll(selector))
  expect(before).toHaveLength(range ? 4 : 2)
  expect(before.every((node) => node.getAttribute('aria-description') === 'Initial description')).toBe(true)
  const warnings: string[] = []
  const app = createSSRApp(root)
  app.config.warnHandler = (message) => warnings.push(message)
  try {
    app.mount(container)
    await nextTick()
    const after = Array.from(container.querySelectorAll(selector))
    expect(after).toEqual(before)
    expect(warnings).toEqual([])
    description.value = 'Updated description'
    await nextTick()
    expect(after.every((node) => node.getAttribute('aria-description') === 'Updated description')).toBe(true)
  } finally {
    app.unmount()
    container.remove()
  }
})
