import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import Message from '../Message.vue'

describe('Message hydration', () => {
  it('reuses the server content and reports the initial open once', async () => {
    const events: string[] = []
    const Root = {
      render: () =>
        h('main', [
          h(
            Message,
            {
              open: true,
              popupContainer: false,
              duration: 0,
              onOpen: () => events.push('open'),
              onOpened: () => events.push('opened'),
            },
            () => 'Server message',
          ),
        ]),
    }
    const context: { teleports?: Record<string, string> } = {}
    const html = await renderToString(createSSRApp(Root), context)
    document.body.insertAdjacentHTML('afterbegin', context.teleports?.body ?? '')
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)
    const serverMessage = container.querySelector('[role="alert"]')
    expect(serverMessage?.textContent).toContain('Server message')
    const warnings: string[] = []
    const app = createSSRApp(Root)
    app.config.warnHandler = (message) => warnings.push(message)
    try {
      app.mount(container)
      expect(container.querySelector('[role="alert"]')).toBe(serverMessage)
      expect(events).toEqual(['open', 'opened'])
      expect(warnings).toEqual([])
    } finally {
      app.unmount()
      container.remove()
    }
  })
})
