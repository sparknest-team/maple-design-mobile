import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('alert')

describe('alert copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('closes once with keyboard and keeps instances independent', async () => {
    const a = mount(Component, { props: { closable: true } })
    const b = mount(Component, { props: { closable: true } })
    const close = a.find('[role="button"]')
    expect(close.attributes('tabindex')).toBe('0')
    await close.trigger('keydown', { key: 'Enter' })
    expect(a.emitted('close')).toHaveLength(1)
    expect(a.emitted('close')[0][0]).toBeInstanceOf(MouseEvent)
    expect(a.find('[role="alert"]').exists()).toBe(false)
    expect(b.find('[role="alert"]').exists()).toBe(true)
    a.unmount()
    b.unmount()
  })
  it('reacts to title slot changes', async () => {
    const enabled = ref(false)
    const w = mount({ setup: () => () => h(Component, {}, enabled.value ? { title: () => 'title' } : {}) })
    enabled.value = true
    await nextTick()
    expect(w.find('.' + n('title')).text()).toBe('title')
    expect(w.find('[role="alert"]').classes()).toContain(n('--with-title'))
    w.unmount()
  })
})
