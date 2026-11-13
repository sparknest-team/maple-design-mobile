import { createSSRApp, defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test, vi } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

test('a controlled menu can open after hydration and still accept closing', async () => {
  const Fixture = defineComponent({
    setup() {
      const open = ref(false)
      onMounted(() => {
        open.value = true
      })
      return () =>
        h(NavMenu, { popupContainer: false }, () =>
          h(NavMenuItem, {
            label: 'Choose',
            open: open.value,
            'onUpdate:open': (next: boolean) => {
              open.value = next
            },
            options: [{ key: 'alpha', label: 'Alpha' }],
          }),
        )
    },
  })
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(createSSRApp(Fixture), context)
  expect(html).toContain('aria-expanded="false"')
  expect(html).not.toContain('Alpha')
  const old = new Set(Array.from(document.body.childNodes))
  document.body.insertAdjacentHTML('afterbegin', context.teleports?.body ?? '')
  const inserted = Array.from(document.body.childNodes).filter((node) => !old.has(node))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const entry = container.querySelector<HTMLButtonElement>('[data-nav-item]')!
  const warnings: string[] = []
  const errors: unknown[] = []
  const app = createSSRApp(Fixture)
  app.config.warnHandler = (message) => warnings.push(message)
  app.config.errorHandler = (error) => errors.push(error)
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    app.mount(container)
    for (let i = 0; i < 4; i++) {
      await nextTick()
    }
    expect(container.querySelector('[data-nav-item]')).toBe(entry)
    expect(entry.getAttribute('aria-expanded')).toBe('true')
    expect(container.textContent).toContain('Alpha')
    entry.click()
    await nextTick()
    expect(entry.getAttribute('aria-expanded')).toBe('false')
    expect(warnings).toEqual([])
    expect(errors).toEqual([])
    expect(consoleError).not.toHaveBeenCalled()
  } finally {
    app.unmount()
    container.remove()
    inserted.forEach((node) => node.remove())
    consoleError.mockRestore()
  }
})
