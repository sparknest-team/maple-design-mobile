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
  it('allocates an unused id when the next generated id is already in the queue', async () => {
    const closed = vi.fn()
    Message({ duration: 0, onClosed: closed }).close()
    const seed = Number(String(closed.mock.calls[0][0]).split('_').pop())
    const first = Message({ id: `__message_${seed + 1}`, duration: 0, content: 'explicit' })
    const second = Message({ duration: 0, content: 'automatic' })
    await nextTick()
    expect(Array.from(document.querySelectorAll('[role="alert"]'), (el) => el.textContent)).toEqual([
      'explicit',
      'automatic',
    ])
    first.close()
    second.close()
  })
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
