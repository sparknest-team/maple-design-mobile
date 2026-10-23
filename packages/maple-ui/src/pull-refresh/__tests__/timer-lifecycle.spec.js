import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import PullRefresh from '../PullRefresh.vue'

let tasks, cleanups
beforeEach(() => {
  tasks = []
  cleanups = []
  vi.useFakeTimers()
  const timeout = window.setTimeout.bind(window)
  vi.spyOn(window, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    const id = timeout(callback, delay, ...args)
    if ([150, 300, 2000].includes(delay) && typeof callback === 'function') {
      tasks.push({ callback, delay, id })
    }
    return id
  })
})
afterEach(() => {
  cleanups.reverse().forEach((cleanup) => cleanup())
  document.body.classList.remove('mp-pull-refresh--lock')
  vi.clearAllTimers()
  vi.restoreAllMocks()
  vi.useRealTimers()
})
function touch(type, y = 0) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: [{ clientX: 0, clientY: y }] })
  return event
}
async function create(extra = {}, initial = true) {
  const active = ref(true),
    value = ref(initial),
    props = ref(extra)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, {}, () => (active.value ? h(PullRefresh, { modelValue: value.value, ...props.value }) : null)),
    }),
    {
      attachTo: document.body,
      global: {
        stubs: { MpIcon: true, MIconRefresh: true, MIconArrowDown: true, MIconCheckboxMarkedCircleFill: true },
      },
    },
  )
  let mounted = true
  const dispose = () => {
    if (mounted) {
      mounted = false
      wrapper.unmount()
    }
  }
  cleanups.push(dispose)
  await nextTick()
  const component = wrapper.findComponent(PullRefresh),
    root = component.element
  vi.spyOn(component.find('.mp-pull-refresh__control').element, 'getBoundingClientRect').mockReturnValue({
    width: 40,
    height: 40,
    left: 0,
    top: 0,
    right: 40,
    bottom: 40,
  })
  return {
    active,
    value,
    props,
    component,
    vm: component.vm,
    root,
    dispose,
    success: async () => {
      value.value = false
      await nextTick()
    },
    drag: () => {
      root.dispatchEvent(touch('touchstart'))
      root.dispatchEvent(touch('touchmove', 50))
      root.dispatchEvent(touch('touchmove', 250))
    },
  }
}
describe('PullRefresh timer and refresh continuation lifetime', () => {
  test('idle disposal does not remove a lock owned elsewhere', async () => {
    const f = await create({}, false)
    document.body.classList.add('mp-pull-refresh--lock')
    f.dispose()
    expect(document.body.classList.contains('mp-pull-refresh--lock')).toBe(true)
  })
  test('cancelled icon promise settles without requiring old delivery', async () => {
    const f = await create({}, false)
    f.drag()
    f.vm.iconName = 'arrow-down'
    const ending = f.vm.handleTouchend()
    let settled = false
    ending.then(() => {
      settled = true
    })
    f.dispose()
    await Promise.resolve()
    await Promise.resolve()
    expect(settled).toBe(true)
  })
  test('controlled model acknowledgement preserves the current refresh notification', async () => {
    const f = await create(
      {
        'onUpdate:modelValue': () => {
          f.value.value = true
        },
      },
      false,
    )
    f.drag()
    await f.vm.handleTouchend()
    await nextTick()
    expect(f.component.emitted('refresh')).toHaveLength(1)
  })
  test('unmount inside model update does not emit deferred refresh', async () => {
    const f = await create({ 'onUpdate:modelValue': () => f.dispose() }, false)
    f.drag()
    await f.vm.handleTouchend()
    await nextTick()
    expect(f.component.emitted('refresh')).toBeUndefined()
  })
  test('inactive retained end cannot schedule work', async () => {
    const f = await create({}, false)
    f.drag()
    f.active.value = false
    await nextTick()
    const before = tasks.length
    await f.vm.handleTouchend()
    expect(tasks).toHaveLength(before)
    expect(f.component.emitted('update:modelValue')).toBeUndefined()
  })
  test('disabled model completion schedules no display timer', async () => {
    const f = await create({ disabled: true })
    await f.success()
    expect(tasks.filter((task) => task.delay === 2000)).toHaveLength(0)
  })
  test('zero configured waits settle without default duration fallback', async () => {
    const f = await create({ successDuration: 0, animationDuration: 0 })
    await f.success()
    await vi.advanceTimersByTimeAsync(1)
    expect(f.vm.refreshStatus).toBe('default')
  })
  test('current success keeps2000ms display then300ms reset', async () => {
    const f = await create()
    await f.success()
    expect(f.vm.refreshStatus).toBe('success')
    await vi.advanceTimersByTimeAsync(1999)
    expect(f.vm.refreshStatus).toBe('success')
    await vi.advanceTimersByTimeAsync(1)
    expect(f.vm.refreshStatus).toBe('success')
    await vi.advanceTimersByTimeAsync(300)
    expect(f.vm.refreshStatus).toBe('default')
  })
  test('old success completion cannot reset a new load', async () => {
    const f = await create()
    await f.success()
    const old = tasks.find((task) => task.delay === 2000)
    f.value.value = true
    await nextTick()
    old.callback()
    expect(tasks.filter((task) => task.delay === 300)).toHaveLength(0)
  })
  test('success completion consumes once', async () => {
    const f = await create()
    await f.success()
    const task = tasks.find((entry) => entry.delay === 2000)
    task.callback()
    task.callback()
    expect(tasks.filter((entry) => entry.delay === 300)).toHaveLength(1)
  })
  for (const reason of ['unmount', 'deactivate', 'disabled']) {
    test(`${reason} cancels success display timer`, async () => {
      const f = await create()
      await f.success()
      const task = tasks.find((entry) => entry.delay === 2000),
        clear = vi.spyOn(window, 'clearTimeout')
      if (reason === 'unmount') {
        f.dispose()
      } else if (reason === 'deactivate') {
        f.active.value = false
        await nextTick()
      } else {
        f.props.value = { disabled: true }
        await nextTick()
      }
      expect(clear).toHaveBeenCalledWith(task.id)
    })
  }
  test('old success cannot cross activation', async () => {
    const f = await create()
    await f.success()
    const old = tasks.find((entry) => entry.delay === 2000)
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    old.callback()
    expect(tasks.filter((entry) => entry.delay === 300)).toHaveLength(0)
  })
  test('old animation reset cannot replace new loading state', async () => {
    const f = await create()
    await f.success()
    tasks.find((entry) => entry.delay === 2000).callback()
    const old = tasks.find((entry) => entry.delay === 300)
    f.value.value = true
    await nextTick()
    old.callback()
    expect(f.vm.refreshStatus).toBe('loading')
  })
  test('disposed icon wait resolves without scheduling refresh', async () => {
    const f = await create()
    f.drag()
    f.vm.iconName = 'arrow-down'
    const ending = f.vm.handleTouchend(),
      old = tasks.findLast((entry) => entry.delay === 150)
    expect(old).toBeTruthy()
    f.dispose()
    old.callback()
    await ending
    expect(f.component.emitted('refresh')).toBeUndefined()
    expect(f.vm.refreshStatus).not.toBe('loading')
  })
  test('ordinary released pull requests one refresh', async () => {
    const f = await create()
    f.drag()
    await f.vm.handleTouchend()
    await nextTick()
    expect(f.component.emitted('update:modelValue')).toEqual([[true]])
    expect(f.component.emitted('refresh')).toHaveLength(1)
  })
})
