import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Trigger from '..'
import { popupContainerProp, resolvePopupContainer } from '../../utils/popup-container'

describe('PopupContainer contract', () => {
  test('server render does not require document or HTMLElement', async () => {
    const documentValue = globalThis.document
    const elementValue = globalThis.HTMLElement
    vi.stubGlobal('document', undefined)
    vi.stubGlobal('HTMLElement', undefined)
    try {
      expect(resolvePopupContainer('#not-on-server')).toBe('body')
      expect(popupContainerProp.validator({})).toBe(false)
      const html = await renderToString(
        createSSRApp({
          render: () =>
            h(
              Trigger,
              { open: true, popupContainer: false },
              { default: () => h('button', 'reference'), content: () => h('span', 'panel') },
            ),
        }),
      )
      expect(html).toContain('reference')
    } finally {
      vi.stubGlobal('document', documentValue)
      vi.stubGlobal('HTMLElement', elementValue)
    }
  })
  test('validates only selector, HTMLElement and false', () => {
    expect(popupContainerProp.validator(false)).toBe(true)
    expect(popupContainerProp.validator('#popup')).toBe(true)
    expect(popupContainerProp.validator(document.createElement('div'))).toBe(true)
    for (const value of [true, null, {}, () => document.body]) {
      expect(popupContainerProp.validator(value)).toBe(false)
    }
  })
  test('missing and invalid selectors safely fall back', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      expect(resolvePopupContainer('#missing-popup-contract')).toBe('body')
      expect(resolvePopupContainer('[')).toBe('body')
      expect(warn).toHaveBeenCalledTimes(2)
    } finally {
      warn.mockRestore()
    }
  })
  test.each(['default', 'selector', 'element', 'inline'])('mounts into %s and removes owned content', async (mode) => {
    const host = document.createElement('div')
    const target = document.createElement('div')
    target.id = 'popup-contract-target'
    document.body.append(host, target)
    const popupContainer =
      mode === 'selector'
        ? '#popup-contract-target'
        : mode === 'element'
          ? target
          : mode === 'inline'
            ? false
            : undefined
    const wrapper = mount(Trigger, {
      attachTo: host,
      props: { open: true, popupContainer },
      slots: {
        default: () => h('button', 'reference'),
        content: () => h('div', { 'data-popup-contract': '' }, 'panel'),
      },
    })
    try {
      await nextTick()
      const panel = document.querySelector('[data-popup-contract]')
      expect(panel).toBeTruthy()
      expect((mode === 'inline' ? host : mode === 'default' ? document.body : target).contains(panel)).toBe(true)
      if (mode !== 'inline') {
        expect(host.contains(panel)).toBe(false)
      }
    } finally {
      wrapper.unmount()
      expect(document.querySelector('[data-popup-contract]')).toBeNull()
      host.remove()
      target.remove()
    }
  })
  test('external open changes emit one lifecycle start without update requests', async () => {
    const wrapper = mount(Trigger, {
      props: { open: false, popupContainer: false },
      slots: { default: () => h('button'), content: 'panel' },
    })
    try {
      await wrapper.setProps({ open: true })
      expect(wrapper.emitted('open')).toHaveLength(1)
      await wrapper.setProps({ open: false })
      expect(wrapper.emitted('close')).toHaveLength(1)
      expect(wrapper.emitted('update:open')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
})
