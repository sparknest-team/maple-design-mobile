import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('page-header')

describe('page-header copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('uses a native back button and emits the original click once', async () => {
    const w = mount(Component, { props: { showBack: true }, attrs: { id: 'heading' } })
    expect(w.attributes('id')).toBe('heading')
    const button = w.find('button')
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-label')).toBe('返回')
    await button.trigger('click')
    expect(w.emitted('back')).toHaveLength(1)
    expect(w.emitted('back')[0][0]).toBeInstanceOf(MouseEvent)
    w.unmount()
  })
})
