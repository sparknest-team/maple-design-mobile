// @vitest-environment node
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test } from 'vitest'
import InputNumber from '..'

test('numeric input renders without browser globals or starting repeat timers', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () => h(InputNumber, { editMode: 'direct', defaultValue: 1e-7, step: 1e-7, precision: 0 }),
    }),
  )
  expect(html).toContain('role="spinbutton"')
  expect(html).toContain('value="0.0000001"')
})
