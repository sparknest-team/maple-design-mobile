import { createApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import StyleProvider, { styleProviderProps } from '../index'

const originalDocument = document

afterEach(() => {
  vi.stubGlobal('document', originalDocument)
  StyleProvider.setStyleVars(null)
  StyleProvider.setPropsDefaults({ tag: 'div', styleVars: () => ({}) })
})

test('uses one component entry for installation and configuration', () => {
  const app = createApp({}).use(StyleProvider)
  expect(app.component(StyleProvider.name ?? '')).toBe(StyleProvider)
  expect('Component' in StyleProvider).toBe(false)
})

test('renders slots, attributes and reactive local variables', async () => {
  const wrapper = mount(StyleProvider, {
    attrs: { id: 'local' },
    slots: { default: 'content' },
    props: { tag: 'section', styleVars: { '--mp-test': '1px' } },
  })
  expect(wrapper.element.tagName).toBe('SECTION')
  expect(wrapper.attributes('id')).toBe('local')
  expect(wrapper.text()).toBe('content')
  expect(wrapper.element.style.getPropertyValue('--mp-test')).toBe('1px')
  await wrapper.setProps({ styleVars: null })
  expect(wrapper.element.style.getPropertyValue('--mp-test')).toBe('')
  wrapper.unmount()
})

test('the default setter supports objects, factories and null', () => {
  StyleProvider.setPropsDefaults({ tag: 'section', styleVars: { '--mp-test': '2px' } })
  const first = styleProviderProps.styleVars.default()
  const second = styleProviderProps.styleVars.default()
  expect(first).toEqual(second)
  expect(first).not.toBe(second)
  const wrapper = mount(StyleProvider)
  expect(wrapper.element.tagName).toBe('SECTION')
  wrapper.unmount()
  StyleProvider.setPropsDefaults({ styleVars: () => ({ '--mp-test': '3px' }) })
  expect(styleProviderProps.styleVars.default()).toEqual({ '--mp-test': '3px' })
  StyleProvider.setPropsDefaults({ styleVars: null })
  expect(styleProviderProps.styleVars.default()).toBeNull()
})

test('global calls replace rather than accumulate and normalize theme names', () => {
  StyleProvider.setStyleVars({ mpColorScheme: 'dark', '--mp-first': '1px' })
  expect(document.documentElement.getAttribute('maple-theme')).toBe('dark')
  StyleProvider.setStyleVars({ '--mp-second': '2px' })
  const style = document.getElementById('maple-style-vars')
  expect(style?.textContent).not.toContain('first')
  expect(style?.textContent).toContain('--mp-second:2px')
  expect(document.querySelectorAll('#maple-style-vars')).toHaveLength(1)
  StyleProvider.setStyleVars({ '--mp-color-scheme': 'light' })
  expect(document.documentElement.hasAttribute('maple-theme')).toBe(false)
  StyleProvider.setStyleVars(null)
  expect(document.getElementById('maple-style-vars')).toBeNull()
})

test('omits baseline variables without losing overrides on repeated calls', () => {
  const baseline = document.createElement('style')
  baseline.textContent = ':root { --mp-baseline: 1px; }'
  document.head.appendChild(baseline)
  try {
    for (let i = 0; i < 2; i++) {
      StyleProvider.setStyleVars({ '--mp-baseline': '1px', '--mp-other': '3px' })
      expect(document.getElementById('maple-style-vars')?.textContent).not.toContain('baseline')
      expect(document.getElementById('maple-style-vars')?.textContent).toContain('other:3px')
    }
    StyleProvider.setStyleVars({})
    expect(document.getElementById('maple-style-vars')).toBeNull()
  } finally {
    baseline.remove()
  }
})

test('does not clear another library theme or style', () => {
  const other = document.createElement('style')
  other.id = 'cedar-style-vars'
  document.head.appendChild(other)
  document.documentElement.setAttribute('cedar-theme', 'dark')
  try {
    StyleProvider.setStyleVars({ '--mp-color-scheme': 'dark' })
    StyleProvider.setStyleVars(null)
    expect(document.getElementById('cedar-style-vars')).toBe(other)
    expect(document.documentElement.getAttribute('cedar-theme')).toBe('dark')
  } finally {
    other.remove()
    document.documentElement.removeAttribute('cedar-theme')
  }
})

test('SSR renders local styles and global calls are no-ops', async () => {
  vi.stubGlobal('document', undefined)
  expect(() => StyleProvider.setStyleVars({ '--mp-test': '1px' })).not.toThrow()
  expect(() => StyleProvider.setStyleVars(null)).not.toThrow()
  const html = await renderToString(h(StyleProvider, { styleVars: { '--mp-test': '1px' } }))
  expect(html).toContain('--mp-test:1px')
})
