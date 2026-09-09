import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('countdown')

describe('countdown copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('formats initial SSR time and updates format while paused', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component, { time: 65000, autoStart: false }) }))
    expect(html).toContain('00:01:05')
    const w = mount(Component, { props: { time: 65000, autoStart: false } })
    await w.setProps({ format: 'mm:ss' })
    expect(w.text()).toBe('01:05')
    w.unmount()
  })
  it('finishes zero once and reset allows another run', () => {
    const w = mount(Component, { props: { time: 0 } })
    expect(w.emitted('end')).toHaveLength(1)
    w.vm.start()
    expect(w.emitted('end')).toHaveLength(1)
    w.vm.reset()
    expect(w.emitted('end')).toHaveLength(2)
    w.unmount()
  })
  it('cancels frames on unmount', async () => {
    const ended = vi.fn()
    const w = mount(Component, { props: { time: 40, onEnd: ended } })
    w.unmount()
    await new Promise((resolve) => setTimeout(resolve, 80))
    expect(ended).not.toHaveBeenCalled()
  })
})
