import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@vue/compiler-sfc'
import less from 'less'
import { describe, expect, it } from 'vitest'

const directory = dirname(fileURLToPath(import.meta.url))

describe('documentation responsive layout contract', () => {
  it('compiles shrinking columns, stacked preview and an accessible narrow navigation', async () => {
    const source = readFileSync(resolve(directory, 'Layout.vue'), 'utf8')
    const { descriptor } = parse(source)
    const { css } = await less.render(descriptor.styles.map((style) => style.content).join('\n'))

    expect(css).not.toContain('min-width: 1200px')
    expect(css).not.toContain('min-width: 500px')
    expect(css).toContain('grid-template-columns: 220px minmax(0, 1fr)')
    expect(css).toContain('@media (max-width: 1199px)')
    expect(css).toContain('@media (max-width: 767px)')
    expect(css).toMatch(/\.maple-site-content--navigation-open \.maple-site-sidebar\s*\{\s*display: block/)
    expect(css).toMatch(/\.maple-site-mobile\s*\{[^}]*position: static/)
    expect(source).toContain('aria-controls="maple-site-navigation"')
    expect(source).toContain(':aria-expanded="sidebarOpen"')
    expect(source).toContain('@keydown.esc="closeSidebar"')
    expect(source).toContain('content.focus({ preventScroll: true })')
    expect(source).not.toMatch(/<main[^>]*tabindex=/)
    expect(source).toContain('sidebarToggle.value?.focus()')
  })

  it('keeps language selection and visible keyboard focus available on narrow screens', async () => {
    const header = parse(readFileSync(resolve(directory, 'components/AppHeader.vue'), 'utf8')).descriptor
    const sidebar = parse(readFileSync(resolve(directory, 'components/AppSidebar.vue'), 'utf8')).descriptor
    const { css } = await less.render([...header.styles, ...sidebar.styles].map((style) => style.content).join('\n'))
    expect(css).not.toMatch(/\.maple-site-header__tail\s*\{\s*display: none/)
    expect(css.indexOf('@media screen and (max-width: 562px)')).toBeGreaterThan(
      css.indexOf('.maple-site-header__link {'),
    )
    expect(css).toMatch(/\.maple-site-sidebar__link:focus-visible\s*\{[^}]*outline: 2px solid/)
  })
})
