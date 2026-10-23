import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Counter from '../Counter.vue'

let tasks, cleanups
beforeEach(() => {
  vi.useFakeTimers()
  tasks = []
  cleanups = []
  const original = window.setTimeout.bind(window)
  vi.spyOn(window, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    const id = original(callback, delay, ...args)
    if (typeof callback === 'function' && (delay === 600 || delay === 100)) {
      tasks.push({ callback, delay, id })
    }
    return id
  })
})
afterEach(() => {
  cleanups.reverse().forEach((cleanup) => cleanup())
  vi.clearAllTimers()
  vi.restoreAllMocks()
  vi.useRealTimers()
})
async function create(extra = {}) {
  const active = ref(true),
    value = ref(0),
    props = ref(extra)
  let afterStep
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, {}, () =>
          active.value
            ? h(Counter, {
                ...props.value,
                modelValue: value.value,
                'onUpdate:modelValue': (next) => {
                  value.value = next
                },
                onIncrement: () => afterStep?.(),
                onDecrement: () => afterStep?.(),
              })
            : null,
        ),
    }),
    { global: { stubs: { MpButton: true, MpIcon: true, MIconMinus: true, MIconPlus: true } } },
  )
  cleanups.push(() => wrapper.unmount())
  await nextTick()
  const component = wrapper.findComponent(Counter)
  return {
    wrapper,
    active,
    props,
    component,
    vm: component.vm,
    onStep: (callback) => {
      afterStep = callback
    },
  }
}
for (const direction of ['Increment', 'Decrement']) {
  const event = direction.toLowerCase()
  describe(`Counter ${event} hold lifetime`, () => {
    test('reaching the configured bound prevents hold scheduling', async () => {
      const f = await create(direction === 'Increment' ? { max: 0 } : { min: 0 })
      f.vm[`press${direction}`]()
      expect(tasks.filter((task) => task.delay === 600)).toHaveLength(0)
    })
    test('changing press off invalidates a pending repeat', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      tasks.find((task) => task.delay === 600).callback()
      const repeat = tasks.find((task) => task.delay === 100)
      f.props.value = { press: false }
      await nextTick()
      repeat.callback()
      expect(f.component.emitted(event)).toBeUndefined()
    })
    test('activation accepts a new hold without resuming the old one', async () => {
      const f = await create()
      f.active.value = false
      await nextTick()
      f.active.value = true
      await nextTick()
      f.vm[`press${direction}`]()
      tasks.find((task) => task.delay === 600).callback()
      tasks.find((task) => task.delay === 100).callback()
      expect(f.component.emitted(event)).toHaveLength(1)
    })
    test('inactive retained direct step does not notify', async () => {
      const f = await create()
      f.active.value = false
      await nextTick()
      f.vm[event]()
      expect(f.component.emitted(event)).toBeUndefined()
    })
    test('release rejects dequeued delay', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      const delay = tasks.find((task) => task.delay === 600)
      f.vm[`release${direction}`]()
      delay.callback()
      expect(tasks.filter((task) => task.delay === 100)).toHaveLength(0)
    })
    test('delay callback consumes once', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      const delay = tasks.find((task) => task.delay === 600)
      delay.callback()
      delay.callback()
      expect(tasks.filter((task) => task.delay === 100)).toHaveLength(1)
    })
    test('repeat callback consumes once', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      tasks.find((task) => task.delay === 600).callback()
      const repeat = tasks.find((task) => task.delay === 100)
      repeat.callback()
      repeat.callback()
      expect(f.component.emitted(event)).toHaveLength(1)
    })
    test('new press replaces the old delay', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      const old = tasks.find((task) => task.delay === 600)
      f.vm[`press${direction}`]()
      old.callback()
      expect(tasks.filter((task) => task.delay === 100)).toHaveLength(0)
    })
    test('unmount rejects old delay scheduling', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      const old = tasks.find((task) => task.delay === 600)
      f.wrapper.unmount()
      old.callback()
      expect(tasks.filter((task) => task.delay === 100)).toHaveLength(0)
    })
    test('inactive retained press does not schedule', async () => {
      const f = await create()
      f.active.value = false
      await nextTick()
      f.vm[`press${direction}`]()
      expect(tasks.filter((task) => task.delay === 600)).toHaveLength(0)
    })
    test('suspension physically cancels pending delay', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      const old = tasks.find((task) => task.delay === 600),
        clear = vi.spyOn(window, 'clearTimeout')
      f.active.value = false
      await nextTick()
      expect(clear).toHaveBeenCalledWith(old.id)
    })
    test('old repeat does not cross suspension/reactivation', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      tasks.find((task) => task.delay === 600).callback()
      const repeat = tasks.find((task) => task.delay === 100)
      f.active.value = false
      await nextTick()
      f.active.value = true
      await nextTick()
      repeat.callback()
      expect(f.component.emitted(event)).toBeUndefined()
    })
    test('disabled press does not schedule', async () => {
      const f = await create({ disabled: true })
      f.vm[`press${direction}`]()
      expect(tasks.filter((task) => task.delay === 600)).toHaveLength(0)
    })
    test('release inside step callback does not restart repetition', async () => {
      const f = await create()
      f.onStep(() => f.vm[`release${direction}`]())
      f.vm[`press${direction}`]()
      tasks.find((task) => task.delay === 600).callback()
      tasks.find((task) => task.delay === 100).callback()
      expect(tasks.filter((task) => task.delay === 100)).toHaveLength(1)
    })
    test('normal first repeat stays at 700ms', async () => {
      const f = await create()
      f.vm[`press${direction}`]()
      vi.advanceTimersByTime(699)
      expect(f.component.emitted(event)).toBeUndefined()
      vi.advanceTimersByTime(1)
      expect(f.component.emitted(event)).toHaveLength(1)
    })
    test('lazy change still disables hold', async () => {
      const f = await create({ lazyChange: true })
      f.vm[`press${direction}`]()
      expect(tasks.filter((task) => task.delay === 600)).toHaveLength(0)
    })
  })
}
