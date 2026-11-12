import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test } from 'vitest'
import Upload from '..'

test('SSR preserves camera capture attributes', async () => {
  for (const [capture, expected] of [
    [true, /\scapture(?:="")?(?=\s|>)/],
    ['user', /\scapture="user"/],
    ['environment', /\scapture="environment"/],
  ] as const) {
    const html = await renderToString(createSSRApp({ render: () => h(Upload, { capture }) }))
    expect(html).toMatch(expected)
  }
})
