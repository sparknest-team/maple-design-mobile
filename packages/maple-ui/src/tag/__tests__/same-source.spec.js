import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('tag')

describe('tag copied implementation contract', () => {
  it('keeps text-color independent of preset backgrounds and outline borders', () => {
    for (const variant of ['default', 'outline']) {
      const w = mount(Component, { props: { color: 'gold', textColor: '#123456', variant } })
      const tag = w.find('.' + n())
      expect(tag.classes()).toContain(n('--gold'))
      expect(tag.element.style.color).toBe('rgb(18, 52, 86)')
      expect(tag.element.style.background).toBe('')
      expect(tag.element.style.borderColor).toBe('')
      w.unmount()
    }
  })
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('does not mutate controlled checked/show props and does not bubble close into check', async () => {
    const w = mount(Component, { props: { show: true, checked: false, checkable: true, closable: true } })
    const root = w.find('[role="checkbox"]')
    await root.trigger('keydown', { key: 'Enter' })
    expect(w.emitted('update:checked')).toEqual([[true]])
    expect(root.attributes('aria-checked')).toBe('false')
    await w.find('[role="button"]').trigger('click')
    expect(w.emitted('close')).toHaveLength(1)
    expect(w.emitted('check')).toHaveLength(1)
    expect(w.find('[role="checkbox"]').exists()).toBe(true)
    await w.setProps({ show: false })
    expect(w.find('[role="checkbox"]').exists()).toBe(false)
    w.unmount()
  })
  it('keeps loading and unchecked state independent', async () => {
    const a = mount(Component, { props: { checkable: true, defaultChecked: false, loading: true } })
    const b = mount(Component, { props: { checkable: true, defaultChecked: false } })
    await a.find('[role="checkbox"]').trigger('click')
    await b.find('[role="checkbox"]').trigger('click')
    expect(a.emitted('check')).toBeUndefined()
    expect(b.emitted('check')[0][0]).toBe(true)
    a.unmount()
    b.unmount()
  })

  it('forwards user classes and styles to the actual tag element', () => {
    const w = mount(Component, {
      props: { nowrap: true },
      attrs: { class: 'custom-tag', style: { maxWidth: '160px' } },
    })
    const tag = w.find('.' + n())
    expect(tag.classes()).toContain('custom-tag')
    expect(tag.element.style.maxWidth).toBe('160px')
    w.unmount()
  })
})
