import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import NavMenu, { NavMenuItem } from '..'

const options = [{ key: 'alpha', label: 'Alpha' }]

test.each([false, true])('SSR controls only references a rendered panel (grouped=%s)', async (grouped) => {
  const item = () => h(NavMenuItem, { label: 'Choose', defaultOpen: true, popupContainer: false, options })
  const app = createSSRApp({ render: () => (grouped ? h(NavMenu, { popupContainer: false }, item) : item()) })
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(app, context)
  const all = html + Object.values(context.teleports ?? {}).join('')
  const id = html.match(/aria-controls="([^"]+)"/)?.[1]
  if (grouped) {
    expect(id).toBeUndefined()
  } else {
    expect(id).toBeTruthy()
    expect(all).toContain(`id="${id}"`)
  }
})

test.each([false, true])('panel controls follows creation and close policy (unmount=%s)', async (unmountOnClose) => {
  const wrapper = mount(NavMenu, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: { popupContainer: false },
    slots: {
      default: () => h(NavMenuItem, { label: 'Choose', options, unmountOnClose }),
    },
  })
  try {
    const button = wrapper.get('[data-nav-item]')
    expect(button.attributes('aria-controls')).toBeUndefined()
    await button.trigger('click')
    for (let i = 0; i < 4; i++) {
      await nextTick()
    }
    const id = button.attributes('aria-controls')!
    expect(id).toBeTruthy()
    expect(document.getElementById(id)).toBeTruthy()
    await button.trigger('click')
    for (let i = 0; i < 4; i++) {
      await nextTick()
    }
    if (unmountOnClose) {
      await vi.waitFor(() => expect(button.attributes('aria-controls')).toBeUndefined(), { timeout: 2000 })
    } else {
      expect(button.attributes('aria-controls')).toBe(id)
      expect(document.getElementById(id)).toBeTruthy()
    }
  } finally {
    wrapper.unmount()
  }
})
