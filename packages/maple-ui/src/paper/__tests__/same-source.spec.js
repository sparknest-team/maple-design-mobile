import { createApp, createSSRApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Paper, { paperProps } from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('paper')

describe('Paper independent copies', () => {
  it('installs and renders on the server without interaction semantics', async () => {
    const app = createApp({}).use(Paper)
    expect(app.component(Paper.name)).toBeTruthy()
    const html = await renderToString(createSSRApp({ render: () => h(Paper, {}, () => 'Surface') }))
    expect(html).toContain(n())
    expect(html).toContain('Surface')
    expect(html).not.toContain('role="button"')
    expect(html).not.toContain('--interactive')
    expect(paperProps).not.toHaveProperty('variant')
    expect(paperProps).not.toHaveProperty('status')
  })
  it('keeps borders and elevation independent', async () => {
    const w = mount(Paper)
    expect(w.classes()).not.toContain(n('--bordered'))
    await w.setProps({ bordered: true, elevation: 2 })
    expect(w.classes()).toContain(n('--bordered'))
    expect(w.classes().some((c) => c.endsWith('elevation--2'))).toBe(true)
    await w.setProps({ bordered: false, elevation: true })
    expect(w.classes()).not.toContain(n('--bordered'))
    expect(w.classes().some((c) => c.endsWith('elevation--2'))).toBe(true)
    await w.setProps({ bordered: true, elevation: false })
    expect(w.classes()).toContain(n('--bordered'))
    expect(w.classes().some((c) => c.includes('elevation--'))).toBe(false)
    w.unmount()
  })
  it('supports lengths, round and inline without adding padding', async () => {
    const w = mount(Paper, { props: { width: 120, height: '2rem', radius: '8', round: true, inline: true } })
    expect(w.element.style.width).toBe('120px')
    expect(w.element.style.height).toBe('2rem')
    expect(w.element.style.borderRadius).toBe('8px')
    expect(w.element.style.padding).toBe('')
    expect(w.classes()).toContain(n('--round'))
    expect(w.classes()).toContain(n('--inline'))
    await w.setProps({ radius: undefined, inline: false })
    expect(w.element.style.borderRadius).toBe('')
    expect(w.classes()).not.toContain(n('--inline'))
    w.unmount()
  })
  it('forwards attrs and the original MouseEvent once', () => {
    const onClick = vi.fn()
    const w = mount(Paper, {
      attrs: { class: 'custom', id: 'surface', style: { padding: '8px' }, onClick },
      slots: { default: '<span>Body</span>' },
    })
    expect(w.classes()).toContain('custom')
    expect(w.attributes('id')).toBe('surface')
    expect(w.element.style.padding).toBe('8px')
    expect(w.text()).toBe('Body')
    const event = new MouseEvent('click')
    w.element.dispatchEvent(event)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(event)
    w.unmount()
  })
  it('keeps instances independent and ripple opt-in', async () => {
    const a = mount(Paper)
    const b = mount(Paper)
    await a.setProps({ ripple: true, bordered: true })
    expect(a.classes()).toContain(n('--interactive'))
    expect(b.classes()).not.toContain(n('--interactive'))
    expect(b.classes()).not.toContain(n('--bordered'))
    a.unmount()
    b.unmount()
  })
})
