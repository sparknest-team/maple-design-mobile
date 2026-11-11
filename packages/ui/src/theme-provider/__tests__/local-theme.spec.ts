import { h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, expect, it } from 'vitest'
import Dialog from '../../dialog'
import Overlay from '../../overlay'
import Trigger from '../../trigger'
import type { ThemeProviderTheme } from '../props'
import ThemeProvider from '../ThemeProvider.vue'

const owners: Array<ReturnType<typeof mount>> = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.querySelectorAll('[data-test-host]').forEach((host) => host.remove())
})

it('inherits theme and overrides through nested providers and real body Teleports', async () => {
  const theme = ref<ThemeProviderTheme | undefined>('dark')
  const innerTheme = ref<ThemeProviderTheme>()
  const vars = ref<Record<string, string> | null>({ '--mp-test-color': 'coral' })
  const owner = mount(
    {
      setup: () => () =>
        h(ThemeProvider, { theme: theme.value, styleVars: { '--mp-parent': 'teal' } }, () =>
          h(ThemeProvider, { theme: innerTheme.value, styleVars: vars.value }, () =>
            h(
              Trigger,
              { open: true, animationName: '', duration: 0 },
              { default: () => h('button', 'open'), content: () => h('span', { 'data-theme-content': '' }, 'popup') },
            ),
          ),
        ),
    },
    { attachTo: document.body },
  )
  owners.push(owner)
  await nextTick()
  const popup = () => document.querySelector('[data-theme-content]')!.closest('[data-mp-theme]') as HTMLElement
  expect(popup().getAttribute('data-mp-theme')).toBe('dark')
  expect(popup().style.getPropertyValue('--mp-test-color')).toBe('coral')
  expect(popup().style.getPropertyValue('--mp-parent')).toBe('teal')
  expect(document.documentElement.getAttribute('maple-theme')).toBeNull()
  innerTheme.value = 'light'
  await nextTick()
  expect(popup().getAttribute('data-mp-theme')).toBe('light')
  theme.value = 'light'
  innerTheme.value = undefined
  vars.value = null
  await nextTick()
  expect(popup().getAttribute('data-mp-theme')).toBe('light')
  expect(popup().style.getPropertyValue('--mp-test-color')).toBe('')
  expect(popup().style.getPropertyValue('--mp-parent')).toBe('teal')
  const boundary = popup()
  theme.value = undefined
  await nextTick()
  expect(boundary.hasAttribute('data-mp-theme')).toBe(false)
  owner.unmount()
  owners.pop()
  expect(document.querySelector('[data-theme-content]')).toBeNull()
})

it.each([false, 'custom'])('keeps theme when popup-container is %s', async (destination) => {
  const host = document.createElement('div')
  host.dataset.testHost = ''
  document.body.append(host)
  const owner = mount(ThemeProvider, {
    props: { theme: 'dark' },
    slots: {
      default: () =>
        h(
          Trigger,
          { open: true, popupContainer: destination === false ? false : host },
          { default: () => h('button'), content: () => h('span', { 'data-theme-content': '' }, 'popup') },
        ),
    },
    attachTo: document.body,
  })
  owners.push(owner)
  await nextTick()
  const content = document.querySelector('[data-theme-content]')!
  expect(content.closest('[data-mp-theme]')?.getAttribute('data-mp-theme')).toBe('dark')
  expect(destination === false ? owner.element.contains(content) : host.contains(content)).toBe(true)
})

it('renders an explicit local boundary for SSR without changing global theme', async () => {
  const html = await renderToString(
    h(ThemeProvider, { theme: 'dark' }, () => h(ThemeProvider, { theme: 'light' }, () => 'nested')),
  )
  expect(html).toContain('data-mp-theme="dark"')
  expect(html).toContain('data-mp-theme="light"')
  expect(document.documentElement.getAttribute('maple-theme')).toBeNull()
})

it.each([
  ['Dialog', Dialog],
  ['Overlay', Overlay],
])('themes the actual %s teleport root including its overlay', async (_name, Component) => {
  const owner = mount(ThemeProvider, {
    props: { theme: 'dark', styleVars: { '--mp-surface-test': 'teal' } },
    slots: {
      default: () =>
        h(
          Component,
          { open: true },
          { default: () => h('span', { 'data-modal-theme-content': '' }, 'dialog content') },
        ),
    },
    attachTo: document.body,
  })
  owners.push(owner)
  await nextTick()
  const content = document.querySelector('[data-modal-theme-content]')!
  const boundary = content.closest('[data-mp-theme]') as HTMLElement
  expect(boundary?.getAttribute('data-mp-theme')).toBe('dark')
  expect(boundary.style.getPropertyValue('--mp-surface-test')).toBe('teal')
  await owner.setProps({ theme: 'light' })
  expect(boundary.getAttribute('data-mp-theme')).toBe('light')
})

it('replaces an inherited preset at an explicit mode boundary while preserving user overrides', async () => {
  const owner = mount(ThemeProvider, {
    props: {
      theme: { '--mp-color-scheme': 'dark', '--mp-color-bg-2': '#123456' },
      styleVars: { '--mp-custom': 'teal' },
    },
    slots: {
      default: () =>
        h(ThemeProvider, { theme: 'light' }, () =>
          h(
            Trigger,
            { open: true },
            { default: () => h('button'), content: () => h('span', { 'data-preset-content': '' }) },
          ),
        ),
    },
    attachTo: document.body,
  })
  owners.push(owner)
  await nextTick()
  const popup = document.querySelector('[data-preset-content]')!.closest('[data-mp-theme]') as HTMLElement
  expect(popup.getAttribute('data-mp-theme')).toBe('light')
  expect(popup.style.getPropertyValue('--mp-color-bg-2')).toBe('')
  expect(popup.style.getPropertyValue('--mp-custom')).toBe('teal')
})
