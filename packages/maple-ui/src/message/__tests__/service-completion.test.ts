import { createApp, nextTick } from 'vue'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import type { MessageMethod } from '../types'

let Message: MessageMethod
beforeAll(async () => {
  vi.resetModules()
  vi.doMock('../Message.vue', async () => {
    const { defineComponent, h } = await import('vue')
    return {
      default: defineComponent({
        props: { open: Boolean },
        emits: ['closed'],
        setup(props, { emit, slots }) {
          return () =>
            h(
              'button',
              {
                'data-motion-owner': props.open ? 'open' : 'leaving',
                onClick: () => emit('closed'),
              },
              slots.default?.(),
            )
        },
      }),
    }
  })
  Message = (await import('..')).default
})
afterAll(() => {
  vi.doUnmock('../Message.vue')
  vi.resetModules()
})
afterEach(() => {
  Message.clear()
  document.querySelectorAll<HTMLButtonElement>('[data-motion-owner]').forEach((node) => node.click())
  Message.resetDefaultOptions()
})
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Message service waits for component completion', () => {
  it('does not dispose a pending leave using a fixed 200ms fallback', async () => {
    const closed = vi.fn()
    const handle = Message({ duration: 0, content: 'pending', onClosed: closed })
    await nextTick()
    handle.close()
    await nextTick()
    await wait(250)
    expect(closed).not.toHaveBeenCalled()
    const node = document.querySelector<HTMLButtonElement>('[data-motion-owner="leaving"]')
    expect(node).not.toBeNull()
    node!.click()
    expect(closed).toHaveBeenCalledTimes(1)
    expect(document.querySelector('[data-motion-owner]')).toBeNull()
    node!.click()
    expect(closed).toHaveBeenCalledTimes(1)
  })
  it('ignores completion while a same-id message has reopened', async () => {
    const closed = vi.fn()
    const first = Message({ id: 'reopen', duration: 0, content: 'first', onClosed: closed })
    await nextTick()
    first.close()
    await nextTick()
    Message({ id: 'reopen', duration: 0, content: 'replacement', onClosed: closed })
    await nextTick()
    document.querySelector<HTMLButtonElement>('[data-motion-owner="open"]')!.click()
    expect(closed).not.toHaveBeenCalled()
    Message.clear()
    await nextTick()
    document.querySelector<HTMLButtonElement>('[data-motion-owner="leaving"]')!.click()
    expect(closed).toHaveBeenCalledTimes(1)
  })
})

it('a throwing closed notification still disposes its empty manager host', async () => {
  const app = createApp({}),
    report = vi.fn(),
    cause = new Error('closed notification')
  app.config.errorHandler = report
  const before = document.body.children.length
  const handle = Message(
    {
      content: 'owned host',
      duration: 0,
      onClosed: () => {
        throw cause
      },
    },
    app._context,
  )
  await nextTick()
  handle.close()
  await nextTick()
  document.querySelector<HTMLButtonElement>('[data-motion-owner="leaving"]')!.click()
  await nextTick()
  expect(report.mock.calls[0][0]).toBe(cause)
  expect(document.body.children.length).toBe(before)
})

it('rejected closed notifications reach Vue errors after owned cleanup', async () => {
  const app = createApp({}),
    report = vi.fn(),
    cause = new Error('async closed')
  app.config.errorHandler = report
  const before = document.body.children.length
  const handle = Message({ content: 'async host', duration: 0, onClosed: () => Promise.reject(cause) }, app._context)
  await nextTick()
  handle.close()
  await nextTick()
  document.querySelector<HTMLButtonElement>('[data-motion-owner="leaving"]')!.click()
  await nextTick()
  expect(report.mock.calls[0][0]).toBe(cause)
  expect(document.body.children.length).toBe(before)
})
