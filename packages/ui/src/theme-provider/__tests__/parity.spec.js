import { createApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import ThemeProvider, { themeProviderProps } from '../index'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  ThemeProvider.setPropsDefaults({ theme: undefined, tag: 'div', styleVars: () => ({}) })
})

test('has one installed component entry and no imperative document-theme mutator', () => {
  const app = createApp({}).use(ThemeProvider)
  expect(app.component(ThemeProvider.name ?? '')).toBe(ThemeProvider)
  expect('setStyleVars' in ThemeProvider).toBe(false)
  expect('Component' in ThemeProvider).toBe(false)
})

test('renders slots, attributes and reactive variables on its own root', async () => {
  const owner = mount(ThemeProvider, {
    props: { theme: 'dark', tag: 'section', styleVars: { '--mp-test': '1px' } },
    attrs: { id: 'root' },
    slots: { default: 'application' },
  })
  owners.push(owner)
  expect(owner.element.tagName).toBe('SECTION')
  expect(owner.attributes('id')).toBe('root')
  expect(owner.attributes('data-mp-theme')).toBe('dark')
  expect(owner.element.style.getPropertyValue('--mp-test')).toBe('1px')
  await owner.setProps({ theme: 'light', styleVars: null })
  expect(owner.attributes('data-mp-theme')).toBe('light')
  expect(owner.element.style.getPropertyValue('--mp-test')).toBe('')
  expect(owner.text()).toBe('application')
})

test('two application roots stay independent and cleanup never owns html', async () => {
  const before = document.documentElement.getAttribute('maple-theme')
  const dark = mount(ThemeProvider, { props: { theme: 'dark' }, attachTo: document.body })
  const light = mount(ThemeProvider, { props: { theme: 'light' }, attachTo: document.body })
  owners.push(dark, light)
  await dark.setProps({ theme: 'light' })
  expect(light.attributes('data-mp-theme')).toBe('light')
  dark.unmount()
  owners.shift()
  expect(document.documentElement.getAttribute('maple-theme')).toBe(before)
  expect(light.element.isConnected).toBe(true)
})

test('supports typed defaults without sharing mutable variable objects', () => {
  ThemeProvider.setPropsDefaults({ theme: 'dark', tag: 'section', styleVars: { '--mp-test': '2px' } })
  const first = themeProviderProps.styleVars.default()
  const second = themeProviderProps.styleVars.default()
  expect(first).toEqual(second)
  expect(first).not.toBe(second)
  const owner = mount(ThemeProvider)
  owners.push(owner)
  expect(owner.element.tagName).toBe('SECTION')
  expect(owner.attributes('data-mp-theme')).toBe('dark')
  ThemeProvider.setPropsDefaults({ styleVars: null })
  expect(themeProviderProps.styleVars.default()).toBeNull()
})

test('SSR root props and nested themes are request-local', async () => {
  const before = document.documentElement.getAttribute('maple-theme')
  const render = (theme) => renderToString(h(ThemeProvider, { theme }, () => 'application'))
  const dark = await render('dark')
  const light = await render('light')
  expect(dark).toContain('data-mp-theme="dark"')
  expect(light).toContain('data-mp-theme="light"')
  expect(document.documentElement.getAttribute('maple-theme')).toBe(before)
})
