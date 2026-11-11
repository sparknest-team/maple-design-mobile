import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('divider')

describe('divider copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('updates slot presence without a prop change', async () => {
    const enabled = ref(false)
    const Host = { setup: () => () => h(Component, {}, enabled.value ? { default: () => 'label' } : {}) }
    const w = mount(Host)
    expect(w.findComponent(Component).classes()).not.toContain(n('--with-text'))
    enabled.value = true
    await nextTick()
    expect(w.findComponent(Component).classes()).toContain(n('--with-text'))
    enabled.value = false
    await nextTick()
    expect(w.findComponent(Component).classes()).not.toContain(n('--with-text'))
    w.unmount()
  })
  it('honors opacity zero and hairline priority', () => {
    const w = mount(Component, { props: { opacity: 0, hairline: true, thickness: 4, orientation: 'vertical' } })
    expect(w.element.style.opacity).toBe('0')
    expect(w.element.style.getPropertyValue('--' + n() + '-border-width')).toBe('')
    expect(w.attributes('aria-orientation')).toBe('vertical')
    w.unmount()
  })
})
