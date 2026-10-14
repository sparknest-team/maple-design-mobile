import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import List from '../../../list/List.vue'
import VirtualList from '../VirtualList.vue'

const ticks = []
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    nextTick: (callback) => {
      if (callback) {
        ticks.push(callback)
        return Promise.resolve()
      }
      return actual.nextTick()
    },
  }
})
const cleanups = []
afterEach(() => {
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup())
  ticks.length = 0
  vi.restoreAllMocks()
})

async function harness(cached = false, listMode = false) {
  const visible = ref(true),
    data = ref(Array.from({ length: 100 }, (_, key) => ({ key })))
  const frames = vi.spyOn(globalThis, 'requestAnimationFrame')
  const props = { fixedSize: true, estimatedSize: 20, buffer: 2, height: 100, itemKey: 'key' }
  const Child = defineComponent({
    setup: () => () =>
      listMode
        ? h(List, { data: data.value, virtualListProps: props }, { item: ({ item }) => h('div', String(item.key)) })
        : h(VirtualList, { ...props, data: data.value }, { item: ({ item }) => h('div', String(item.key)) }),
  })
  const wrapper = mount(
    defineComponent({
      setup: () => () => (cached ? h(KeepAlive, null, () => (visible.value ? h(Child) : null)) : h(Child)),
    }),
    { attachTo: document.body },
  )
  await nextTick()
  const virtual = wrapper.findComponent(VirtualList),
    element = virtual.element
  let top = 0,
    disposed = false
  const writes = []
  Object.defineProperties(element, {
    scrollTop: {
      configurable: true,
      get: () => top,
      set: (value) => {
        top = value
        writes.push(value)
      },
    },
    clientHeight: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, value: 2000 },
  })
  ticks.length = 0
  cleanups.push(() => {
    if (!disposed) {
      wrapper.unmount()
    }
    wrapper.element.remove()
  })
  const command = virtual.vm
  const listCommand = listMode ? wrapper.findComponent(List).vm : undefined
  return {
    wrapper,
    command,
    listCommand,
    virtual,
    element,
    writes,
    frames,
    data,
    clear: () => {
      writes.length = 0
    },
    event(value) {
      top = value
      command.onScroll({ target: element })
    },
    async hide() {
      visible.value = false
      await nextTick()
    },
    async show() {
      visible.value = true
      await nextTick()
    },
    unmount() {
      wrapper.unmount()
      disposed = true
    },
  }
}
async function deliver() {
  const jobs = ticks.splice(0)
  jobs.forEach((job) => job())
  await nextTick()
}
describe('VirtualList deferred correction ownership', () => {
  test('old scroll-event correction cannot overwrite a newer numeric command', async () => {
    const p = await harness()
    p.event(150)
    p.command.scrollTo(700)
    p.clear()
    await deliver()
    expect(p.element.scrollTop).toBe(700)
    expect(p.writes).toEqual([])
  })
  test('newer native scroll invalidates the older queued position correction', async () => {
    const p = await harness()
    p.event(150)
    p.event(250)
    p.clear()
    await deliver()
    expect(p.writes).toEqual([250])
  })
  test('consumed scroll correction cannot become a new command on replay', async () => {
    const p = await harness()
    p.event(150)
    const old = ticks[0]
    await deliver()
    p.command.scrollTo(700)
    p.clear()
    old()
    await nextTick()
    expect(p.element.scrollTop).toBe(700)
    expect(p.writes).toEqual([])
  })
  test('deactivation invalidates queued object correction', async () => {
    const p = await harness(true)
    p.command.scrollTo({ index: 10 })
    await p.hide()
    p.clear()
    await deliver()
    expect(p.writes).toEqual([])
  })
  test('retained inactive commands do not write or schedule', async () => {
    const p = await harness(true)
    await p.hide()
    p.clear()
    p.command.scrollTo(700)
    p.command.scrollTo({ index: 10 })
    expect(p.writes).toEqual([])
    expect(ticks).toHaveLength(0)
  })
  test('retained inactive event handler does not notify or queue work', async () => {
    const p = await harness(true)
    await p.hide()
    p.event(150)
    expect(p.virtual.emitted('scroll')).toBeUndefined()
    expect(ticks).toHaveLength(0)
  })
  test('activation accepts new commands but does not revive old correction', async () => {
    const p = await harness(true)
    p.command.scrollTo({ index: 10 })
    await p.hide()
    await p.show()
    p.element.scrollTop = 50
    p.clear()
    await deliver()
    expect(p.element.scrollTop).toBe(50)
    expect(p.writes).toEqual([])
    p.command.scrollTo(400)
    expect(p.element.scrollTop).toBe(400)
  })
  test('disposed event handler does not create a fresh deferred task', async () => {
    const p = await harness()
    p.unmount()
    p.event(150)
    expect(ticks).toHaveLength(0)
  })
  test('data replacement invalidates pending index correction', async () => {
    const p = await harness()
    p.command.scrollTo({ index: 80 })
    p.data.value = [{ key: 0 }]
    await nextTick()
    p.clear()
    await deliver()
    expect(p.writes).toEqual([])
  })
  test('normal alignment writes are synchronous plus current correction, with no RAF', async () => {
    const p = await harness()
    p.command.scrollTo({ index: 10, align: 'bottom' })
    expect(p.element.scrollTop).toBe(120)
    await deliver()
    expect(p.element.scrollTop).toBe(120)
    expect(p.frames).not.toHaveBeenCalled()
  })
  test('post-render object correction is consumed once even if delivered twice', async () => {
    const p = await harness()
    p.command.scrollTo({ index: 10 })
    const old = ticks[0]
    p.clear()
    old()
    old()
    await nextTick()
    expect(p.writes).toEqual([200])
  })
  test('object request supersession already rejects older apply', async () => {
    const p = await harness()
    p.command.scrollTo({ index: 10 })
    p.command.scrollTo({ index: 20 })
    p.clear()
    await deliver()
    expect(p.writes).toEqual([400])
  })
  test('disposal clears refs and pending object apply remains inert', async () => {
    const p = await harness()
    p.command.scrollTo({ index: 10 })
    p.unmount()
    p.clear()
    await deliver()
    p.command.scrollTo(700)
    expect(p.writes).toEqual([])
  })
})
describe('List public retained delegation', () => {
  test('inactive List scrollIntoView cannot drive its retained child', async () => {
    const p = await harness(true, true)
    await p.hide()
    p.clear()
    p.listCommand.scrollIntoView({ index: 10, align: 'top' })
    await deliver()
    expect(p.writes).toEqual([])
  })
  test('active List delegation preserves key/bottom alignment', async () => {
    const p = await harness(false, true)
    p.listCommand.scrollIntoView({ key: 10, align: 'bottom' })
    await deliver()
    expect(p.element.scrollTop).toBe(120)
  })
})
