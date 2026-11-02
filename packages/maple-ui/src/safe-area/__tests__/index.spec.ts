import { createApp, createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SafeArea from '..'
import Popup from '../../popup'
import StyleProvider from '../../style-provider'
import { formatSafeAreaInsets } from '../insets'

afterEach(() => {
  SafeArea.setInsets(null)
  StyleProvider.setStyleVars(null)
})

describe('SafeArea native adapter', () => {
  it('replaces only its four properties, keeps 0 and does not erase theme variables', () => {
    StyleProvider.setStyleVars({ '--mp-primary-6': '1, 2, 3' })
    SafeArea.setInsets({ top: 20, bottom: 34 })
    SafeArea.setInsets({ bottom: 0 })
    const style = document.documentElement.style
    expect(style.getPropertyValue('--mp-safe-area-top')).toBe('')
    expect(style.getPropertyValue('--mp-safe-area-bottom')).toBe('0px')
    expect(document.querySelector('#maple-style-vars')?.textContent).toContain('1, 2, 3')
    StyleProvider.setStyleVars(null)
    expect(style.getPropertyValue('--mp-safe-area-bottom')).toBe('0px')
    SafeArea.setInsets(null)
    expect(style.getPropertyValue('--mp-safe-area-bottom')).toBe('')
  })

  it('validates the entire snapshot before any mutation', () => {
    SafeArea.setInsets({ top: 12 })
    for (const bottom of [-1, NaN, Infinity]) {
      expect(() => SafeArea.setInsets({ top: 99, bottom })).toThrow(TypeError)
      expect(document.documentElement.style.getPropertyValue('--mp-safe-area-top')).toBe('12px')
    }
  })

  it('targets the actual document/portal host independently', () => {
    const other = document.implementation.createHTMLDocument('other')
    SafeArea.setInsets({ left: 12.5, right: 0 }, other.body)
    expect(other.body.style.getPropertyValue('--mp-safe-area-left')).toBe('12.5px')
    expect(document.documentElement.style.getPropertyValue('--mp-safe-area-left')).toBe('')
    SafeArea.setInsets(null, other.body)
    expect(other.body.style.length).toBe(0)
  })

  it('is safe without document', () => {
    vi.stubGlobal('document', undefined)
    try {
      expect(() => SafeArea.setInsets({ bottom: 0 })).not.toThrow()
    } finally {
      vi.unstubAllGlobals()
    }
  })
})

describe('SafeArea component', () => {
  it('registers and renders a reactive local scope without changing global state', async () => {
    const app = createApp({}).use(SafeArea)
    expect(app.component(SafeArea.name!)).toBeTruthy()
    const insets = ref({ bottom: 30 })
    const wrapper = mount({
      render: () => h(SafeArea, { insets: insets.value, edges: ['bottom'] }, () => h('div', 'content')),
    })
    expect(wrapper.classes()).toContain('mp-safe-area--bottom')
    expect(wrapper.classes()).toContain('mp-safe-area--consume')
    expect(wrapper.attributes('style')).toContain('--mp-safe-area-bottom: 30px')
    insets.value = { bottom: 0 }
    await nextTick()
    expect(wrapper.attributes('style')).toContain('--mp-safe-area-bottom: 0px')
    expect(document.documentElement.style.getPropertyValue('--mp-safe-area-bottom')).toBe('')
    wrapper.unmount()
  })

  it('can provide overrides without padding or consumption', () => {
    const wrapper = mount(SafeArea, { props: { edges: [], insets: { top: 0 }, consume: false, tag: 'section' } })
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toEqual(['mp-safe-area'])
    wrapper.unmount()
  })

  it('renders per-request insets in SSR and does not mutate a global store', async () => {
    const render = (bottom: number) =>
      renderToString(createSSRApp({ render: () => h(SafeArea, { insets: { bottom } }, () => 'content') }))
    expect(await render(20)).toContain('--mp-safe-area-bottom:20px')
    expect(await render(0)).toContain('--mp-safe-area-bottom:0px')
    expect(formatSafeAreaInsets()).toEqual({})
  })

  it('exposes four-side flags on the actual Popup surface', () => {
    const wrapper = mount(Popup, {
      props: { open: true, popupContainer: false, safeAreaInsetLeft: true, safeAreaInsetRight: true },
    })
    const panel = wrapper.find('[role="dialog"]')
    expect(panel.classes()).toContain('mp-popup--safe-area-inset-left')
    expect(panel.classes()).toContain('mp-popup--safe-area-inset-right')
    wrapper.unmount()
  })
})
