import { createSSRApp, h } from 'vue'
import { describe, expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Loading from '../../loading/Loading.vue'
import Result from '../Result.vue'

describe('Loading and Result SSR', () => {
  test('renders Loading without browser globals', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Loading, { tip: 'Loading' }) }))
    expect(html).toContain('role="status"')
    expect(html).toContain('Loading')
  })

  test('renders every Result status without browser globals', async () => {
    const statuses = ['info', 'success', 'warning', 'danger', 'question', 'empty', '403', '404', '500']
    for (const status of statuses) {
      const html = await renderToString(createSSRApp({ render: () => h(Result, { status }) }))
      expect(html).toContain(`result__${status}`)
      expect(html).toContain('<svg')
    }
  })
})
