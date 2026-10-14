import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Message from '..'

afterEach(async () => {
  Message.clear()
  Message.resetDefaultOptions()
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 60))
})

describe('Message before component mount', () => {
  it('clears every unmounted item without skipping after synchronous removal', async () => {
    const closed = vi.fn()
    for (let id = 0; id < 3; id += 1) {
      Message({ id, duration: 0, content: String(id), onClosed: closed })
    }
    Message.clear()
    await nextTick()
    expect(closed).toHaveBeenCalledTimes(3)
    expect(document.querySelector('[class*="message-list"]')).toBeNull()
  })
  it('disposes a handle closed in the creation tick', async () => {
    const closed = vi.fn()
    const handle = Message({ duration: 0, content: 'immediate-close', onClosed: closed })
    handle.close()
    await nextTick()
    expect(closed).toHaveBeenCalledTimes(1)
    expect(document.querySelector('[class*="message-list"]')).toBeNull()
  })
  it('disposes clear issued in the creation tick', async () => {
    const closed = vi.fn()
    Message({ duration: 0, content: 'immediate-clear', onClosed: closed })
    Message.clear()
    await nextTick()
    expect(closed).toHaveBeenCalledTimes(1)
    expect(document.querySelector('[class*="message-list"]')).toBeNull()
  })
})
