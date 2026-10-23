import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import PullRefresh from '../PullRefresh.vue'

let cleanups, bindings
beforeEach(() => {
  cleanups = []
  bindings = []
  vi.useFakeTimers()
  const add = EventTarget.prototype.addEventListener
  vi.spyOn(EventTarget.prototype, 'addEventListener').mockImplementation(function (type, callback, options) {
    if (['touchmove', 'touchend'].includes(type)) {
      bindings.push({ target: this, type, callback })
    }
    return add.call(this, type, callback, options)
  })
})
afterEach(() => {
  cleanups.reverse().forEach((cleanup) => cleanup())
  document.body.classList.remove('mp-pull-refresh--lock')
  vi.clearAllTimers()
  vi.restoreAllMocks()
  vi.useRealTimers()
})
function scroller() {
  const element = document.createElement('div')
  element.style.overflowY = 'auto'
  document.body.append(element)
  cleanups.push(() => element.remove())
  return element
}
function touch(type, y = 0) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: [{ clientX: 0, clientY: y }] })
  return event
}
async function create(extra = {}) {
  const active = ref(true),
    props = ref(extra)
  const wrapper = mount(
    defineComponent({ setup: () => () => h(KeepAlive, {}, () => (active.value ? h(PullRefresh, props.value) : null)) }),
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
  const control = component.find('.mp-pull-refresh__control').element
  const rect = vi
    .spyOn(control, 'getBoundingClientRect')
    .mockReturnValue({ width: 40, height: 40, top: 0, left: 0, bottom: 40, right: 40 })
  const move = (y) => root.dispatchEvent(touch('touchmove', y))
  return {
    active,
    props,
    component,
    root,
    vm: component.vm,
    dispose,
    rect,
    move,
    drag: () => {
      root.dispatchEvent(touch('touchstart'))
      move(50)
      move(250)
      move(260)
    },
  }
}
describe('PullRefresh gesture and lock ownership', () => {
  test('current activation listener still releases normally', async () => {
    const f = await create()
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.drag()
    f.root.dispatchEvent(touch('touchend'))
    await nextTick()
    expect(f.component.emitted('update:modelValue')).toEqual([[true]])
  })
  test('disabled holder releases only its own lease', async () => {
    const target = scroller(),
      a = await create({ target }),
      b = await create({ target })
    a.drag()
    b.drag()
    a.props.value = { target, disabled: true }
    await nextTick()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(true)
    b.active.value = false
    await nextTick()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
  })
  test('external loading replaces gesture and releases its lock', async () => {
    const target = scroller(),
      f = await create({ target })
    f.drag()
    f.props.value = { target, modelValue: true }
    await nextTick()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
    expect(f.vm.refreshStatus).toBe('loading')
    await f.vm.handleTouchend()
    expect(f.component.emitted('refresh')).toBeUndefined()
  })
  test('release without a started gesture creates no work', async () => {
    const f = await create(),
      before = vi.getTimerCount()
    await f.vm.handleTouchend()
    expect(vi.getTimerCount()).toBe(before)
    expect(f.component.emitted('update:modelValue')).toBeUndefined()
  })
  test('duplicate old release cannot clear another live lease', async () => {
    const target = scroller(),
      a = await create({ target }),
      b = await create({ target })
    a.drag()
    b.drag()
    await a.vm.handleTouchend()
    await a.vm.handleTouchend()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(true)
    b.dispose()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
  })
  test('ordinary active drag locks current target and release unlocks', async () => {
    const target = scroller(),
      f = await create({ target })
    f.drag()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(true)
    await f.vm.handleTouchend()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
    expect(f.component.emitted('update:modelValue')).toEqual([[true]])
  })
  test('touchcancel does not start a refresh', async () => {
    const target = scroller(),
      f = await create({ target })
    f.drag()
    f.root.dispatchEvent(touch('touchcancel'))
    await nextTick()
    expect(f.component.emitted('update:modelValue')).toBeUndefined()
    expect(f.vm.refreshStatus).toBe('default')
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
  })
  test('move after release cannot create a new pull', async () => {
    const f = await create()
    f.root.dispatchEvent(touch('touchstart'))
    f.move(10)
    await f.vm.handleTouchend()
    const before = f.vm.controlStyle.transform
    f.move(400)
    expect(f.vm.controlStyle.transform).toBe(before)
  })
  test('two instances keep shared target locked until both release', async () => {
    const target = scroller(),
      a = await create({ target }),
      b = await create({ target })
    a.drag()
    b.drag()
    a.dispose()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(true)
    b.dispose()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(false)
  })
  test('pre-existing external lock survives an owned gesture', async () => {
    const target = scroller(),
      f = await create({ target })
    target.classList.add('mp-pull-refresh--lock')
    f.drag()
    f.dispose()
    expect(target.classList.contains('mp-pull-refresh--lock')).toBe(true)
  })
  test('target replacement releases old drag and does not continue it', async () => {
    const first = scroller(),
      second = scroller(),
      f = await create({ target: first })
    f.drag()
    f.props.value = { target: second }
    await nextTick()
    expect(first.classList.contains('mp-pull-refresh--lock')).toBe(false)
    await f.vm.handleTouchend()
    expect(f.component.emitted('update:modelValue')).toBeUndefined()
    f.drag()
    expect(second.classList.contains('mp-pull-refresh--lock')).toBe(true)
  })
  test('old move listener cannot drive a reactivated gesture', async () => {
    const f = await create()
    const old = bindings.findLast(
      (entry) => entry.target === f.root && entry.type === 'touchmove' && entry.callback.name !== 'eventListener',
    )
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.root.dispatchEvent(touch('touchstart'))
    const before = f.vm.controlStyle.transform
    old.callback(touch('touchmove', 400))
    expect(f.vm.controlStyle.transform).toBe(before)
  })
  test('old end listener cannot end a new activation gesture', async () => {
    const f = await create()
    const old = bindings.findLast(
      (entry) => entry.target === f.root && entry.type === 'touchend' && entry.callback.name !== 'eventListener',
    )
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.drag()
    await old.callback(touch('touchend'))
    await nextTick()
    expect(f.component.emitted('update:modelValue')).toBeUndefined()
  })
  test('geometry disposal stops before reading the old event target', async () => {
    const f = await create()
    let targetReads = 0
    f.rect.mockImplementation(() => {
      f.dispose()
      return { width: 40 }
    })
    f.vm.handleTouchstart({
      touches: [{ clientX: 0, clientY: 0 }],
      get target() {
        targetReads += 1
        return f.root
      },
    })
    expect(targetReads).toBe(0)
  })
  test('inactive retained start performs no geometry read', async () => {
    const f = await create()
    f.active.value = false
    await nextTick()
    f.rect.mockClear()
    f.vm.handleTouchstart(touch('touchstart'))
    expect(f.rect).not.toHaveBeenCalled()
  })
})
