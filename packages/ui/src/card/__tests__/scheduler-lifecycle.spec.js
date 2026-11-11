import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Card from '../Card.vue'

const ticks = []
const paints = []
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
vi.mock('@maple-design/shared-vue', async () => {
  const actual = await vi.importActual('@maple-design/shared-vue')
  return { ...actual, doubleRaf: () => new Promise((resolve) => paints.push(resolve)) }
})
const owners = []
const restores = []
function patch(object, key, value) {
  const old = Object.getOwnPropertyDescriptor(object, key)
  Object.defineProperty(object, key, { configurable: true, writable: true, value })
  restores.push(() => {
    if (old) {
      Object.defineProperty(object, key, old)
    } else {
      Reflect.deleteProperty(object, key)
    }
  })
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  vi.useRealTimers()
  restores
    .splice(0)
    .reverse()
    .forEach((restore) => restore())
  ticks.length = paints.length = 0
})
const flush = async () => {
  await nextTick()
  await nextTick()
}
const deliver = () => ticks.splice(0).forEach((callback) => callback())
async function fixture(initialFloating = false) {
  patch(globalThis, '__VUE_DEVTOOLS_GLOBAL_HOOK__', { emit() {} })
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const schedule = vi.spyOn(globalThis, 'setTimeout')
  const floating = ref(initialFloating),
    active = ref(true),
    direction = ref('column')
  const Child = defineComponent({
    setup: () => () => h(Card, { floating: floating.value, direction: direction.value, ripple: true }),
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
  )
  owners.push(owner)
  await flush()
  deliver()
  const child = owner.findComponent(Card),
    state = child.vm.$.setupState
  const rect = vi
    .spyOn(child.element, 'getBoundingClientRect')
    .mockReturnValue({ width: 120, height: 80, left: 8, top: 12, right: 128, bottom: 92, x: 8, y: 12, toJSON() {} })
  const float = async () => {
    floating.value = true
    await flush()
    deliver()
  }
  const finish = async () => {
    await float()
    vi.advanceTimersByTime(500)
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
  }
  const drop = async () => {
    floating.value = false
    await flush()
    deliver()
  }
  const callbacks = (delay) => schedule.mock.calls.filter((call) => call[1] === delay).map((call) => call[0])
  return { owner, child, state, rect, active, floating, direction, float, finish, drop, callbacks }
}
describe('Card floating scheduler ownership', () => {
  test('reduced motion skips the ripple and closing animation waits', async () => {
    patch(document.defaultView, 'matchMedia', () => ({ matches: true }))
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(0)
    expect(f.rect).toHaveBeenCalledTimes(1)
    expect(paints).toHaveLength(0)
    await flush()
    expect(f.state.floated).toBe(true)
    await f.drop()
    vi.advanceTimersByTime(0)
    expect(f.state.floaterPosition).toBeUndefined()
  })
  test('motion preference changes settle pending transitions and detach on deactivation', async () => {
    let change
    const query = {
      matches: false,
      addEventListener: vi.fn((_, callback) => {
        change = callback
      }),
      removeEventListener: vi.fn(),
    }
    patch(document.defaultView, 'matchMedia', () => query)
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(100)
    expect(f.rect).not.toHaveBeenCalled()
    query.matches = true
    change({ matches: true })
    vi.advanceTimersByTime(0)
    expect(f.rect).toHaveBeenCalledTimes(1)
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    expect(f.state.floated).toBe(true)
    query.matches = false
    change({ matches: false })
    await f.drop()
    await f.float()
    query.matches = true
    change({ matches: true })
    vi.advanceTimersByTime(0)
    expect(f.rect).toHaveBeenCalledTimes(3)
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    query.matches = false
    change({ matches: false })
    await f.drop()
    expect(f.state.floaterPosition).toBe('fixed')
    query.matches = true
    change({ matches: true })
    vi.advanceTimersByTime(0)
    expect(f.state.floaterPosition).toBeUndefined()
    f.active.value = false
    await flush()
    expect(query.removeEventListener).toHaveBeenCalledWith('change', change)
    const previousSubscriptions = query.addEventListener.mock.calls.length
    f.active.value = true
    await flush()
    expect(query.addEventListener.mock.calls.length).toBeGreaterThan(previousSubscriptions)
  })
  test('legacy media query listener tracks motion and is removed on deactivation', async () => {
    let change
    const query = {
      matches: false,
      addListener: vi.fn((callback) => {
        change = callback
      }),
      removeListener: vi.fn(),
    }
    patch(document.defaultView, 'matchMedia', () => query)
    const f = await fixture()
    await f.float()
    query.matches = true
    change({ matches: true })
    vi.advanceTimersByTime(0)
    expect(f.rect).toHaveBeenCalledTimes(1)
    f.active.value = false
    await flush()
    expect(query.removeListener).toHaveBeenCalledWith(change)
  })
  test('uses the owning iframe window for the motion preference', async () => {
    const frame = document.createElement('iframe')
    document.body.appendChild(frame)
    const iframeQuery = vi.fn(() => ({ matches: true }))
    patch(document.defaultView, 'matchMedia', () => ({ matches: false }))
    patch(frame.contentWindow, 'matchMedia', iframeQuery)
    const owner = mount(Card, { attachTo: frame.contentDocument.body })
    owners.push(owner)
    await flush()
    expect(iframeQuery).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    frame.remove()
  })
  test('enabling reduced motion during pending frames completes without waiting for them', async () => {
    let change
    const query = {
      matches: false,
      addEventListener: vi.fn((_, callback) => {
        change = callback
      }),
      removeEventListener: vi.fn(),
    }
    patch(document.defaultView, 'matchMedia', () => query)
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(500)
    expect(paints).toHaveLength(1)
    expect(f.state.floated).toBe(false)
    query.matches = true
    change({ matches: true })
    vi.advanceTimersByTime(0)
    await flush()
    expect(f.state.floated).toBe(true)
    expect(f.state.floaterWidth).toBe('100vw')
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    expect(f.state.floated).toBe(true)
    expect(f.state.floaterWidth).toBe('100vw')
  })
  test('normal ripple wait and double-frame settlement remain', async () => {
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(499)
    expect(f.rect).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(f.rect).toHaveBeenCalledTimes(1)
    expect(f.state.floated).toBe(false)
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    expect(f.state.floated).toBe(true)
  })
  test('superseded render task cannot start floating', async () => {
    const f = await fixture()
    f.floating.value = true
    await flush()
    f.floating.value = false
    await flush()
    deliver()
    expect(f.callbacks(500)).toHaveLength(0)
  })
  test('direction change invalidates pending render work', async () => {
    const f = await fixture()
    f.floating.value = true
    await flush()
    f.direction.value = 'row'
    await flush()
    deliver()
    expect(f.callbacks(500)).toHaveLength(0)
  })
  test('render callback consumes once', async () => {
    const f = await fixture()
    f.floating.value = true
    await flush()
    const callback = ticks.splice(0).at(-1)
    callback()
    callback()
    expect(f.callbacks(500)).toHaveLength(1)
  })
  test('old render task cannot replay after activation', async () => {
    const f = await fixture()
    f.floating.value = true
    await flush()
    const callback = ticks.splice(0).at(-1)
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    callback()
    expect(f.callbacks(500)).toHaveLength(1)
  })
  test('floating timer consumes geometry measurement once', async () => {
    const f = await fixture()
    await f.float()
    const callback = f.callbacks(500).at(-1)
    callback()
    callback()
    expect(f.rect).toHaveBeenCalledTimes(1)
    expect(paints).toHaveLength(1)
  })
  test('closing remeasures the current placeholder after its layout changes', async () => {
    const f = await fixture()
    await f.finish()
    f.rect.mockReturnValue({
      width: 180,
      height: 90,
      left: 34,
      top: 56,
      right: 214,
      bottom: 146,
      x: 34,
      y: 56,
      toJSON() {},
    })
    await f.drop()
    expect(f.state.floaterWidth).toBe('180px')
    expect(f.state.floaterHeight).toBe('90px')
    expect(f.state.floaterLeft).toBe('34px')
    expect(f.state.floaterTop).toBe('56px')
  })
  test('disposal during return measurement cannot publish stale geometry', async () => {
    const f = await fixture()
    await f.finish()
    f.rect.mockImplementation(() => {
      f.owner.unmount()
      return { width: 180, height: 90, left: 34, top: 56, right: 214, bottom: 146, x: 34, y: 56, toJSON() {} }
    })
    await f.drop()
    expect(f.state.floaterWidth).toBe('100vw')
    expect(f.state.floaterTop).toBe('0')
    expect(f.callbacks(250)).toHaveLength(0)
  })
  test('old dropdown timer cannot reset a new floating phase', async () => {
    const f = await fixture()
    await f.finish()
    await f.drop()
    const old = f.callbacks(250).at(-1)
    await f.float()
    vi.advanceTimersByTime(500)
    expect(f.state.floaterPosition).toBe('fixed')
    old()
    expect(f.state.floaterPosition).toBe('fixed')
  })
  test('dropdown delivery after deactivation cannot reset saved layout', async () => {
    const f = await fixture()
    await f.finish()
    await f.drop()
    const old = f.callbacks(250).at(-1)
    f.active.value = false
    await flush()
    old()
    expect(f.state.floaterPosition).toBe('fixed')
  })
  test('dropdown delivery after disposal cannot mutate retained state', async () => {
    const f = await fixture()
    await f.finish()
    await f.drop()
    const old = f.callbacks(250).at(-1)
    f.owner.unmount()
    old()
    expect(f.state.floaterPosition).toBe('fixed')
  })
  test('retained inactive close and click cannot notify', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.state.close()
    f.state.handleClick(new Event('click'))
    expect(f.child.emitted('update:floating')).toBeUndefined()
    expect(f.child.emitted('click')).toBeUndefined()
  })
  test('canceled double-frame continuation cannot expand after close', async () => {
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(500)
    await f.drop()
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    expect(f.state.floated).toBe(false)
  })
  test('unmount cancels current wait and rejects its old delivery', async () => {
    const f = await fixture()
    await f.float()
    const old = f.callbacks(500).at(-1)
    f.owner.unmount()
    old()
    expect(f.rect).not.toHaveBeenCalled()
    expect(paints).toHaveLength(0)
  })
  test('initial KeepAlive activation does not duplicate the wait', async () => {
    const f = await fixture(true)
    expect(f.callbacks(500)).toHaveLength(1)
  })
  test('geometry reentrant disposal cannot start double-frame work', async () => {
    const f = await fixture()
    await f.float()
    f.rect.mockImplementation(() => {
      f.owner.unmount()
      return { width: 120, height: 80, left: 8, top: 12, right: 128, bottom: 92, x: 8, y: 12, toJSON() {} }
    })
    vi.advanceTimersByTime(500)
    expect(paints).toHaveLength(0)
    expect(f.state.floaterPosition).toBeUndefined()
  })
  test('deactivated double-frame continuation cannot expand', async () => {
    const f = await fixture()
    await f.float()
    vi.advanceTimersByTime(500)
    f.active.value = false
    await flush()
    paints.splice(0).forEach((resolve) => resolve())
    await flush()
    expect(f.state.floated).toBe(false)
  })
})
