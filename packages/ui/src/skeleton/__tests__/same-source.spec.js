import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('skeleton')

describe('skeleton copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('switches content and clamps invalid rows', async () => {
    const w = mount(Component, { props: { rows: -1 }, slots: { default: 'ready' } })
    expect(w.findAll('.' + n('row'))).toHaveLength(0)
    await w.setProps({ rows: '2.8' })
    expect(w.findAll('.' + n('row'))).toHaveLength(2)
    await w.setProps({ loading: false })
    expect(w.text()).toBe('ready')
    expect(w.attributes('aria-busy')).toBe('false')
    w.unmount()
  })
  it('renders template and exposes line and shape components', () => {
    const w = mount(Component, { slots: { template: 'custom' } })
    expect(w.text()).toBe('custom')
    expect(Component.Line).toBeTruthy()
    expect(Component.Shape).toBeTruthy()
    w.unmount()
  })
})
