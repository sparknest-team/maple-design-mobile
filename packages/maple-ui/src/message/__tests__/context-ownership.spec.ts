import { createApp, defineComponent, getCurrentInstance, h, inject, nextTick, resolveComponent } from 'vue'
import { afterEach, expect, test, vi } from 'vitest'
import Message from '..'

const wait = () => new Promise((resolve) => setTimeout(resolve, 70))
afterEach(async () => {
  Message.clear()
  Message.resetDefaultOptions()
  await nextTick()
  await wait()
})
const app = (owner: string) => {
  const value = createApp({})
  value.provide('message-owner', owner)
  value.config.globalProperties.$owner = owner
  value.component('OwnerGlyph', { render: () => h('b', owner) })
  return value
}
const Probe = defineComponent({
  setup() {
    const owner = inject('message-owner', 'missing')
    const global = getCurrentInstance()!.appContext.config.globalProperties.$owner
    const Glyph = resolveComponent('OwnerGlyph')
    return () => h('span', { 'data-context-owner': owner }, [String(global), h(Glyph)])
  },
})
const owners = () =>
  Array.from(document.querySelectorAll('[data-context-owner]')).map((n) => [
    n.getAttribute('data-context-owner'),
    n.textContent,
  ])
test('every explicit app context owns its content within one target/position stack', async () => {
  const a = app('A'),
    b = app('B')
  Message({ id: 'a', content: () => h(Probe), duration: 0 }, a._context)
  Message({ id: 'b', content: () => h(Probe), duration: 0 }, b._context)
  await nextTick()
  expect(owners()).toEqual([
    ['A', 'AA'],
    ['B', 'BB'],
  ])
  expect(document.querySelectorAll('[class*="message-list"]')).toHaveLength(1)
})
test('an unqualified update without an installed default keeps the item context', async () => {
  const a = app('A')
  Message({ id: 'retain', content: () => h(Probe), duration: 0 }, a._context)
  await nextTick()
  Message({ id: 'retain', content: () => h(Probe), duration: 0 })
  await nextTick()
  expect(owners()).toEqual([['A', 'AA']])
})

test('install defaults are captured per call and explicit overrides still win', async () => {
  const a = app('A'),
    b = app('B')
  Message.install(a)
  Message({ id: 'a', content: () => h(Probe), duration: 0 })
  Message.install(b)
  Message({ id: 'b', content: () => h(Probe), duration: 0 })
  Message({ id: 'explicit', content: () => h(Probe), duration: 0 }, a._context)
  await nextTick()
  expect(owners()).toEqual([
    ['A', 'AA'],
    ['B', 'BB'],
    ['A', 'AA'],
  ])
})
test('same-id context updates replace only the rendering scope and keep its item handle valid', async () => {
  const a = app('A'),
    b = app('B')
  const closed = vi.fn()
  const first = Message({ id: 'same', content: () => h(Probe), duration: 0, onClosed: closed }, a._context)
  await nextTick()
  Message({ id: 'same', content: () => h(Probe), duration: 0 }, b._context)
  await nextTick()
  expect(owners()).toEqual([['B', 'BB']])
  first.close()
  await nextTick()
  await wait()
  expect(closed).toHaveBeenCalledTimes(1)
  expect(document.querySelector('[class*="message-list"]')).toBeNull()
})
test('business component errors go to their own app error handler', async () => {
  const a = app('A'),
    b = app('B'),
    reportA = vi.fn(),
    reportB = vi.fn(),
    cause = new Error('owner B')
  a.config.errorHandler = reportA
  b.config.errorHandler = reportB
  const Thrower = defineComponent({
    setup() {
      throw cause
    },
  })
  Message({ id: 'a', content: () => h(Probe), duration: 0 }, a._context)
  Message({ id: 'b', content: () => h(Thrower), duration: 0 }, b._context)
  await nextTick()
  expect(reportA).not.toHaveBeenCalled()
  expect(reportB.mock.calls[0][0]).toBe(cause)
})
