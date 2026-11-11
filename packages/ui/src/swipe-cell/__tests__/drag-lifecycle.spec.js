import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import SwipeCell from '../SwipeCell.vue'

let tasks, bindings, cleanups
beforeEach(() => {
  tasks = []
  bindings = []
  cleanups = []
  vi.useFakeTimers()
  const timeout = window.setTimeout.bind(window),
    add = EventTarget.prototype.addEventListener
  vi.spyOn(window, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    const id = timeout(callback, delay, ...args)
    if (delay === 0 && typeof callback === 'function') {
      tasks.push({ callback, id })
    }
    return id
  })
  vi.spyOn(EventTarget.prototype, 'addEventListener').mockImplementation(function (type, callback, options) {
    if (type === 'touchmove' || type === 'touchstart') {
      bindings.push({ target: this, type, callback })
    }
    return add.call(this, type, callback, options)
  })
})
afterEach(() => {
  cleanups.reverse().forEach((cleanup) => cleanup())
  vi.clearAllTimers()
  vi.restoreAllMocks()
  vi.useRealTimers()
})
function touch(type, x = 0, y = 0) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: [{ clientX: x, clientY: y }] })
  return event
}
async function create(extra = {}) {
  const active = ref(true),
    props = ref(extra)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, {}, () => (active.value ? h(SwipeCell, { leftWidth: 80, rightWidth: 90, ...props.value }) : null)),
    }),
    { attachTo: document.body },
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
  const component = wrapper.findComponent(SwipeCell),
    root = component.element
  return {
    active,
    props,
    dispose,
    component,
    root,
    api: component.vm.$.exposed,
    state: component.vm.$.setupState,
    drag: (x = 40) => {
      root.dispatchEvent(touch('touchstart'))
      root.dispatchEvent(touch('touchmove', x))
    },
    end: () => root.dispatchEvent(touch('touchend')),
    click: () => component.vm.$.setupState.handleClick('cell', new Event('click')),
    transform: () => component.vm.$.setupState.wrapperStyle.transform,
  }
}
describe('SwipeCell drag and click-unlock lifetime', () => {
  test('activation binds a fresh working move listener', async () => {
    const f = await create()
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.drag()
    expect(f.transform()).toBe('translate3d(40px, 0, 0)')
  })
  test('unmount removes the current root and document listeners', async () => {
    const f = await create(),
      remove = vi.spyOn(EventTarget.prototype, 'removeEventListener')
    const move = bindings.findLast(
      (entry) => entry.target === f.root && entry.type === 'touchmove' && entry.callback.name !== 'eventListener',
    )
    const outside = bindings.findLast((entry) => entry.target === document && entry.type === 'touchstart')
    f.dispose()
    expect(remove).toHaveBeenCalledWith('touchmove', move.callback)
    expect(remove).toHaveBeenCalledWith('touchstart', outside.callback)
  })
  test('open callback starting a new drag does not schedule an old unlock', async () => {
    const f = await create({ onOpen: () => f.drag() })
    f.drag()
    f.end()
    expect(tasks).toHaveLength(0)
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
  })
  test('click callback reopening another side is not closed by old click continuation', async () => {
    const f = await create({ onClick: () => f.api.open('right') })
    f.api.open('left')
    f.click()
    expect(f.transform()).toBe('translate3d(-90px, 0, 0)')
  })
  test('old unlock cannot cross reactivation and unlock a new drag', async () => {
    const f = await create()
    f.drag()
    f.end()
    const old = tasks.at(-1)
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.drag()
    old.callback()
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
  })
  test('release restores transition even when offset is already clamped', async () => {
    const f = await create()
    f.drag(100)
    expect(f.state.wrapperStyle.transitionDuration).toBe('0s')
    f.end()
    expect(f.state.wrapperStyle.transitionDuration).toBeUndefined()
  })
  test('cancel preserves a previously opened side without a new open notification', async () => {
    const f = await create()
    f.api.open('right')
    f.drag(40)
    f.root.dispatchEvent(touch('touchcancel'))
    expect(f.transform()).toBe('translate3d(-90px, 0, 0)')
    expect(f.component.emitted('open')).toHaveLength(1)
  })
  test('current unlock permits click after suppressing the release turn', async () => {
    const f = await create()
    f.drag()
    f.end()
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
    tasks.at(-1).callback()
    f.click()
    expect(f.component.emitted('click')).toHaveLength(1)
  })
  test('new gesture cancels pending unlock physically', async () => {
    const f = await create()
    f.drag()
    f.end()
    const old = tasks.at(-1),
      clear = vi.spyOn(window, 'clearTimeout')
    f.drag()
    expect(clear).toHaveBeenCalledWith(old.id)
  })
  test('cancelled unlock cannot release a fresh drag lock', async () => {
    const f = await create()
    f.drag()
    f.end()
    const old = tasks.at(-1)
    f.drag()
    old.callback()
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
  })
  test('consumed unlock cannot release a later gesture', async () => {
    const f = await create()
    f.drag()
    f.end()
    const old = tasks.at(-1)
    old.callback()
    f.drag()
    old.callback()
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
  })
  for (const reason of ['deactivate', 'unmount', 'disabled']) {
    test(`${reason} physically cancels pending unlock`, async () => {
      const f = await create()
      f.drag()
      f.end()
      const old = tasks.at(-1),
        clear = vi.spyOn(window, 'clearTimeout')
      if (reason === 'unmount') {
        f.dispose()
      } else if (reason === 'disabled') {
        f.props.value = { disabled: true }
        await nextTick()
      } else {
        f.active.value = false
        await nextTick()
      }
      expect(clear).toHaveBeenCalledWith(old.id)
    })
  }
  test('touchcancel restores pre-gesture offset without opening', async () => {
    const f = await create()
    f.drag()
    f.root.dispatchEvent(touch('touchcancel'))
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
    expect(f.component.emitted('open')).toBeUndefined()
  })
  test('suspension cancels partial drag instead of resuming it', async () => {
    const f = await create()
    f.drag()
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.end()
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
    expect(f.component.emitted('open')).toBeUndefined()
  })
  test('inactive retained click does not notify', async () => {
    const f = await create()
    f.active.value = false
    await nextTick()
    f.click()
    expect(f.component.emitted('click')).toBeUndefined()
  })
  test('old move binding cannot drive a new activation gesture', async () => {
    const f = await create()
    const old = bindings.findLast(
      (entry) => entry.target === f.root && entry.type === 'touchmove' && entry.callback.name !== 'eventListener',
    )
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.root.dispatchEvent(touch('touchstart'))
    old.callback(touch('touchmove', 40))
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
  })
  test('old outside binding cannot close after activation', async () => {
    const f = await create()
    const old = bindings.findLast((entry) => entry.target === document && entry.type === 'touchstart')
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    f.api.open('left')
    old.callback(touch('touchstart'))
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('ordinary outside interaction closes current cell', async () => {
    const f = await create()
    f.api.open('left')
    document.body.dispatchEvent(touch('touchstart'))
    expect(f.component.emitted('close')).toHaveLength(1)
  })
  test('move without a started touch is ignored', async () => {
    const f = await create()
    f.root.dispatchEvent(touch('touchmove', 40))
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
  })
})
