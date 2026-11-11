import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useIndexBar } from '../anchor-provide'
import IndexBar from '../IndexBar.vue'
import { createIndexScrollTask } from '../scroll-task'

const cleanups = []
afterEach(() => {
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup())
  vi.restoreAllMocks()
})

describe('IndexBar private scroll task controls', () => {
  test('cancellation between RAF delivery and microtask does not write', async () => {
    const p = await harness(300)
    const task = createIndexScrollTask(document.defaultView, () => true)
    const done = task.scroll(p.wrapper.element, 0, 200, 300)
    p.history.at(-1)(0)
    task.cancel()
    expect(await done).toBe(false)
    expect(p.scroll).not.toHaveBeenCalled()
  })
  test('cancelled settlement resolves false and dequeued replay stays inert', async () => {
    const p = await harness()
    const task = createIndexScrollTask(document.defaultView, () => true)
    const done = task.frames(2),
      old = p.history.at(-1)
    task.cancel()
    expect(await done).toBe(false)
    old(0)
    await flush()
    expect(p.queue.size).toBe(0)
  })
  test('positive duration preserves cubic interpolation and final target', async () => {
    const p = await harness(300)
    p.command.scrollTo('B')
    await p.frame()
    await p.frame(150)
    expect(p.scroll).toHaveBeenLastCalledWith(0, 100)
    await p.frame(300)
    expect(p.scroll).toHaveBeenLastCalledWith(0, 200)
    await p.frame(316)
    await p.frame(332)
    await p.scrollEvent()
    expect(p.changes).toEqual(['B', 'C'])
    expect(p.queue.size).toBe(0)
  })
  test('owner reduced motion completes without interpolation but still settles', async () => {
    const p = await harness(300)
    Object.defineProperty(document.defaultView, 'matchMedia', { configurable: true, value: () => ({ matches: true }) })
    p.command.scrollTo('B')
    await p.frame()
    expect(p.scroll).toHaveBeenLastCalledWith(0, 200)
    await p.frame()
    await p.frame()
    expect(p.queue.size).toBe(0)
  })
})
const flush = async () => {
  for (let i = 0; i < 8; i++) {
    await nextTick()
    await Promise.resolve()
  }
}

async function harness(duration = 0, cached = false, onChange = undefined) {
  const view = document.defaultView
  let clock = 0,
    id = 0
  const queue = new Map(),
    history = []
  const request = (callback) => {
    queue.set(++id, callback)
    history.push(callback)
    return id
  }
  const cancel = vi.fn((key) => queue.delete(key))
  const descriptors = ['requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia'].map((key) => [
    key,
    Object.getOwnPropertyDescriptor(view, key),
  ])
  Object.defineProperties(view, {
    requestAnimationFrame: { configurable: true, value: request },
    cancelAnimationFrame: { configurable: true, value: cancel },
    matchMedia: { configurable: true, value: () => ({ matches: false }) },
  })
  if (globalThis !== view) {
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(request)
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(cancel)
  }
  vi.spyOn(Date, 'now').mockImplementation(() => clock)
  const visible = ref(true),
    bar = ref(),
    changes = [],
    clicks = []
  const anchor = defineComponent({
    props: ['index'],
    setup(props) {
      const { bindIndexBar, index } = useIndexBar()
      bindIndexBar({
        index,
        name: ref(props.index),
        setDisabled() {},
        getOffsetTop: () => ['A', 'B', 'C'].indexOf(props.index) * 200,
      })
      return () => h('div', props.index)
    },
  })
  const child = defineComponent({
    setup: () => () =>
      h(
        IndexBar,
        {
          ref: bar,
          sticky: false,
          duration,
          onChange: (value) => {
            changes.push(value)
            onChange?.(value)
          },
          onClick: (value) => clicks.push(value),
        },
        () => ['A', 'B', 'C'].map((index) => h(anchor, { index })),
      ),
  })
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(
          'div',
          { style: 'height:100px;overflow:auto' },
          cached ? [h(KeepAlive, null, () => (visible.value ? h(child) : null))] : visible.value ? [h(child)] : [],
        ),
    }),
    { attachTo: document.body },
  )
  const scroll = vi.fn((left, top) => {
    wrapper.element.scrollLeft = left
    wrapper.element.scrollTop = top
  })
  wrapper.element.scrollTo = scroll
  Object.defineProperty(wrapper.element, 'scrollHeight', { configurable: true, value: 1000 })
  wrapper.find('.mp-index-bar').element.getBoundingClientRect = () => ({ top: -wrapper.element.scrollTop, left: 0 })
  let alive = true
  cleanups.push(() => {
    if (alive) {
      wrapper.unmount()
    }
    wrapper.element.remove()
    descriptors.forEach(([key, descriptor]) => {
      if (descriptor) {
        Object.defineProperty(view, key, descriptor)
      } else {
        Reflect.deleteProperty(view, key)
      }
    })
  })
  async function frame(time = clock) {
    clock = time
    const callbacks = [...queue.values()]
    queue.clear()
    callbacks.forEach((callback) => callback(time))
    await flush()
  }
  await flush()
  for (let i = 0; i < 5 && queue.size; i++) {
    await frame()
  }
  scroll.mockClear()
  changes.length = 0
  const command = bar.value
  return {
    wrapper,
    command,
    queue,
    history,
    cancel,
    scroll,
    changes,
    clicks,
    frame,
    async hide() {
      visible.value = false
      await flush()
    },
    async show() {
      visible.value = true
      await flush()
    },
    unmount() {
      wrapper.unmount()
      alive = false
    },
    async scrollEvent(top = 400) {
      wrapper.element.scrollTop = top
      await wrapper.trigger('scroll')
    },
  }
}

describe('IndexBar consumer lifecycle ownership', () => {
  test('queued command is cancelled on unmount, including dequeued callback', async () => {
    const p = await harness()
    p.command.scrollTo('B')
    const old = p.history.at(-1)
    p.unmount()
    expect(p.queue.size).toBe(0)
    old(0)
    await flush()
    expect(p.scroll).not.toHaveBeenCalled()
    expect(p.changes).toEqual([])
  })
  test('retained public command and click handler are inert after disposal', async () => {
    const p = await harness()
    p.unmount()
    p.command.scrollTo('B')
    await p.command.anchorClick({ anchorName: 'B', manualCall: true })
    expect(p.queue.size).toBe(0)
    expect(p.clicks).toEqual([])
    expect(p.changes).toEqual([])
  })
  test('latest queued command wins without announcing the replaced request', async () => {
    const p = await harness()
    p.command.scrollTo('A')
    const old = p.history.at(-1)
    p.command.scrollTo('B')
    old(0)
    await p.frame()
    expect(p.changes).toEqual(['B'])
    expect(p.scroll).toHaveBeenCalledTimes(1)
    expect(p.scroll).toHaveBeenLastCalledWith(0, 200)
  })
  test('unmount cancels interpolation and replay cannot write or reschedule', async () => {
    const p = await harness(300)
    p.command.scrollTo('B')
    await p.frame()
    await p.frame(100)
    const old = p.history.at(-1),
      count = p.scroll.mock.calls.length
    p.unmount()
    expect(p.queue.size).toBe(0)
    old(400)
    await flush()
    expect(p.scroll).toHaveBeenCalledTimes(count)
    expect(p.queue.size).toBe(0)
  })
  test('old double-frame completion cannot unlock a newer scroll', async () => {
    const p = await harness()
    void p.command.anchorClick({ anchorName: 'A' })
    await flush()
    const old = p.history.at(-1)
    void p.command.anchorClick({ anchorName: 'B' })
    await flush()
    old(0)
    await p.frame()
    await p.scrollEvent()
    expect(p.changes).toEqual(['A', 'B'])
    await p.frame()
    await p.scrollEvent()
    expect(p.changes).toEqual(['A', 'B', 'C'])
  })
  test('KeepAlive stops pending scroll and rejects retained inactive commands', async () => {
    const p = await harness(300, true)
    p.command.scrollTo('B')
    await p.frame()
    await p.frame(100)
    const old = p.history.at(-1),
      count = p.scroll.mock.calls.length
    await p.hide()
    expect(p.queue.size).toBe(0)
    p.command.scrollTo('C')
    void p.command.anchorClick({ anchorName: 'C', manualCall: true })
    old(400)
    await flush()
    expect(p.queue.size).toBe(0)
    expect(p.scroll).toHaveBeenCalledTimes(count)
    expect(p.changes).toEqual(['B'])
    expect(p.clicks).toEqual([])
  })
  test('reactivation restores scroll listener when there was no active anchor', async () => {
    const p = await harness(0, true)
    await p.hide()
    await p.show()
    await p.scrollEvent(200)
    expect(p.changes).toEqual(['B'])
  })
  test('reactivation restores listener after active anchor settling', async () => {
    const p = await harness(0, true)
    p.command.scrollTo('A')
    for (let i = 0; i < 3; i++) {
      await p.frame()
    }
    await p.hide()
    await p.show()
    for (let i = 0; i < 3; i++) {
      await p.frame()
    }
    await p.scrollEvent(200)
    expect(p.changes).toEqual(['A', 'B'])
  })
  test('change callback unmount prevents the subsequent scroll write', async () => {
    const p = await harness(0, false, () => p.unmount())
    p.command.scrollTo('B')
    await p.frame()
    expect(p.changes).toEqual(['B'])
    expect(p.scroll).not.toHaveBeenCalled()
    expect(p.queue.size).toBe(0)
  })
  test('reactivation waits for child registration before restoring active position', async () => {
    const p = await harness(0, true)
    p.command.scrollTo('B')
    for (let i = 0; i < 3; i++) {
      await p.frame()
    }
    await p.hide()
    p.scroll.mockClear()
    await p.show()
    for (let i = 0; i < 3; i++) {
      await p.frame()
    }
    expect(p.scroll).toHaveBeenCalledTimes(1)
    expect(p.scroll).toHaveBeenLastCalledWith(0, 200)
    expect(p.changes).toEqual(['B'])
  })
  test('normal zero-duration command retains two settlement frames and event:false', async () => {
    const p = await harness()
    p.command.scrollTo('B', { event: false })
    expect(p.scroll).not.toHaveBeenCalled()
    await p.frame()
    expect(p.scroll).toHaveBeenLastCalledWith(0, 200)
    await p.frame()
    await p.scrollEvent()
    expect(p.command.active).toBe('B')
    await p.frame()
    await p.scrollEvent()
    expect(p.command.active).toBe('C')
    expect(p.changes).toEqual(['C'])
  })
})
