import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import SwipeCell from '../SwipeCell.vue'

const cleanups = []
afterEach(() => {
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup())
  vi.restoreAllMocks()
})
function deferred() {
  let resolve
  const promise = new Promise((done) => {
    resolve = done
  })
  return { promise, resolve }
}
async function create(extra = {}) {
  const active = ref(true),
    props = ref(extra)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, {}, () => (active.value ? h(SwipeCell, { leftWidth: 80, rightWidth: 90, ...props.value }) : null)),
    }),
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
  const component = wrapper.findComponent(SwipeCell)
  return {
    active,
    props,
    wrapper,
    component,
    vm: component.vm.$.exposed,
    dispose,
    transform: () => component.vm.$.setupState.wrapperStyle.transform,
  }
}
describe('SwipeCell close request lifetime', () => {
  test('activation accepts a fresh close request', async () => {
    const f = await create({ beforeClose: () => true })
    f.vm.open('left')
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    await f.vm.close()
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
    expect(f.component.emitted('close')).toHaveLength(1)
  })
  test('retained disposed close does not invoke the hook', async () => {
    const beforeClose = vi.fn(() => true),
      f = await create({ beforeClose })
    f.vm.open('left')
    f.dispose()
    await f.vm.close()
    expect(beforeClose).not.toHaveBeenCalled()
  })
  test('name replacement invalidates old business confirmation', async () => {
    const gate = deferred(),
      beforeClose = () => gate.promise,
      f = await create({ beforeClose, name: 'old' })
    f.vm.open('left')
    const closing = f.vm.close()
    f.props.value = { beforeClose, name: 'new' }
    await nextTick()
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('fresh touch invalidates pending close confirmation', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.component.vm.$.setupState.handleTouchstart({ touches: [{ clientX: 0, clientY: 0 }] })
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('disabled close still honors its current veto', async () => {
    const beforeClose = vi.fn(() => false),
      f = await create({ beforeClose })
    f.vm.open('left')
    f.props.value = { beforeClose, disabled: true }
    await nextTick()
    await Promise.resolve()
    expect(beforeClose).toHaveBeenCalledTimes(1)
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('explicit rejected hook retains rejection and open state', async () => {
    const error = new Error('confirmation failed'),
      f = await create({ beforeClose: () => Promise.reject(error) })
    f.vm.open('left')
    await expect(f.vm.close()).rejects.toBe(error)
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('current confirmation closes normally', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
    expect(f.component.emitted('close')).toHaveLength(1)
  })
  test('false keeps current side open', async () => {
    const f = await create({ beforeClose: () => false })
    f.vm.open('left')
    await f.vm.close()
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
    expect(f.component.emitted('close')).toBeUndefined()
  })
  test('old confirmation cannot close a newly opened side', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.vm.open('right')
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(-90px, 0, 0)')
  })
  test('opening the same side replaces pending confirmation', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.vm.open('left')
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('latest veto prevents an older confirmation from committing', async () => {
    const first = deferred(),
      second = deferred()
    const beforeClose = vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise)
    const f = await create({ beforeClose })
    f.vm.open('left')
    const a = f.vm.close(),
      b = f.vm.close()
    second.resolve(false)
    await b
    first.resolve(true)
    await a
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('synchronous hook reentry cannot close replacement', async () => {
    const f = await create({
      beforeClose: () => {
        f.vm.open('right')
        return true
      },
    })
    f.vm.open('left')
    await f.vm.close()
    expect(f.transform()).toBe('translate3d(-90px, 0, 0)')
  })
  test('unmount invalidates pending confirmation without changing detached state', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.dispose()
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('old confirmation cannot cross deactivation and reactivation', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.active.value = false
    await nextTick()
    f.active.value = true
    await nextTick()
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
  test('retained inactive open command is inert', async () => {
    const f = await create()
    f.active.value = false
    await nextTick()
    f.vm.open('left')
    expect(f.component.emitted('open')).toBeUndefined()
  })
  test('retained inactive close does not invoke business hook', async () => {
    const beforeClose = vi.fn(() => true),
      f = await create({ beforeClose })
    f.vm.open('left')
    f.active.value = false
    await nextTick()
    await f.vm.close()
    expect(beforeClose).not.toHaveBeenCalled()
  })
  test('retained disposed open command leaves state unchanged', async () => {
    const f = await create()
    f.dispose()
    f.vm.open('left')
    expect(f.transform()).toBe('translate3d(0px, 0, 0)')
  })
  test('replacing the hook invalidates its pending confirmation', async () => {
    const gate = deferred(),
      f = await create({ beforeClose: () => gate.promise })
    f.vm.open('left')
    const closing = f.vm.close()
    f.props.value = { beforeClose: () => false }
    await nextTick()
    gate.resolve(true)
    await closing
    expect(f.transform()).toBe('translate3d(80px, 0, 0)')
  })
})
