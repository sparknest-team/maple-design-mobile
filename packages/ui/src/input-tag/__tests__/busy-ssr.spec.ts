import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test } from 'vitest'
import InputTag from '..'

test('SSR and hydration preserve the caller busy state through loading changes', async () => {
  const loading = ref(false)
  const Root = defineComponent({
    setup: () => () => h(InputTag, { editMode: 'direct', loading: loading.value, 'aria-busy': false }),
  })
  const html = await renderToString(createSSRApp(Root))
  const host = document.createElement('div')
  host.innerHTML = html
  document.body.appendChild(host)
  const initialInput = host.querySelector('input')!
  expect(initialInput.getAttribute('aria-busy')).toBe('false')
  const app = createSSRApp(Root)
  const warnings: string[] = []
  app.config.warnHandler = (message) => warnings.push(message)
  try {
    app.mount(host)
    await nextTick()
    expect(host.querySelector('input')).toBe(initialInput)
    loading.value = true
    await nextTick()
    expect(initialInput.getAttribute('aria-busy')).toBe('true')
    loading.value = false
    await nextTick()
    expect(initialInput.getAttribute('aria-busy')).toBe('false')
    expect(warnings).toEqual([])
  } finally {
    app.unmount()
    host.remove()
  }
})
