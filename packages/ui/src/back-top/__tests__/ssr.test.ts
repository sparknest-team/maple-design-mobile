// @vitest-environment node
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, test } from 'vitest'
import Ellipsis from '../../ellipsis'
import BackTop from '../index'

describe('scroll/text SSR without DOM', () => {
  test('BackTop renders a hidden inline button without DOM access', async () => {
    expect(typeof window).toBe('undefined')
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(BackTop, {
            targetContainer: () => document.querySelector<HTMLElement>('#not-on-server'),
          }),
      }),
    )
    expect(html).toContain('<button')
    expect(html).toContain('display:none')
  })
  test('Ellipsis renders text and stable expanded semantics', async () => {
    const html = await renderToString(
      createSSRApp({ render: () => h(Ellipsis, { expandTrigger: 'click', defaultExpand: true }, () => 'Text') }),
    )
    expect(html).toContain('aria-expanded="true"')
    expect(html).toContain('Text')
  })
})
