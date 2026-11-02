import { createApp, nextTick } from 'vue'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'

let methods: typeof import('../service').dialogMethods
beforeAll(async () => {
  vi.resetModules()
  vi.doMock('../Dialog.vue', async () => {
    const { defineComponent, h } = await import('vue')
    return {
      default: defineComponent({
        emits: ['confirm', 'cancel', 'close', 'closed'],
        setup(_, { emit }) {
          return () =>
            h(
              'section',
              { 'data-service-dialog': '' },
              ['confirm', 'cancel', 'close', 'closed'].map((name) =>
                h('button', { 'data-action': name, onClick: () => emit(name as 'close') }, name),
              ),
            )
        },
      }),
    }
  })
  methods = (await import('../service')).dialogMethods
})
afterAll(() => {
  vi.doUnmock('../Dialog.vue')
  vi.resetModules()
})
for (const action of ['confirm', 'cancel', 'close'] as const) {
  test(`throwing ${action} notification cannot leave its service result pending`, async () => {
    const app = createApp({}),
      report = vi.fn(),
      cause = new Error(action)
    app.config.errorHandler = report
    let result: unknown
    const handle = methods.open(
      {
        ['on' + action[0].toUpperCase() + action.slice(1)]: () => {
          throw cause
        },
      },
      app._context,
    )
    handle.then((value) => {
      result = value
    })
    try {
      document.querySelector<HTMLButtonElement>(`[data-action="${action}"]`)!.click()
      await nextTick()
      expect(report.mock.calls[0][0]).toBe(cause)
      expect(result).toBe(action)
    } finally {
      handle.close()
      document.querySelector<HTMLButtonElement>('[data-action="closed"]')!.click()
      await nextTick()
    }
  })
}

test('rejected callback Promises reach Vue errors without delaying the service result', async () => {
  const app = createApp({}),
    report = vi.fn(),
    cause = new Error('async close')
  app.config.errorHandler = report
  let result: unknown
  const handle = methods.open({ onClose: () => Promise.reject(cause) }, app._context)
  handle.then((value) => {
    result = value
  })
  try {
    document.querySelector<HTMLButtonElement>('[data-action="close"]')!.click()
    await nextTick()
    expect(result).toBe('close')
    expect(report.mock.calls[0][0]).toBe(cause)
  } finally {
    handle.close()
    document.querySelector<HTMLButtonElement>('[data-action="closed"]')!.click()
    await nextTick()
  }
})
