import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { useFieldSearch } from '../use-field-search'

const owners: Array<ReturnType<typeof mount>> = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  vi.useRealTimers()
})
function fixture(delay = () => 50) {
  vi.useFakeTimers()
  const available = ref(true)
  const active = ref(true)
  const dispatch = vi.fn()
  const queue = new Map<ReturnType<typeof setTimeout>, () => void>()
  const original = globalThis.setTimeout
  vi.spyOn(globalThis, 'setTimeout').mockImplementation(((callback: () => void, ms: number) => {
    const id = original(callback, ms)
    queue.set(id, callback)
    return id
  }) as typeof setTimeout)
  const cleared = vi.spyOn(globalThis, 'clearTimeout')
  let search!: ReturnType<typeof useFieldSearch>
  const Child = defineComponent({
    setup() {
      search = useFieldSearch(delay, () => available.value, dispatch)
      return () => h('div')
    },
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
  )
  owners.push(owner)
  const request = (query: string) => {
    const before = new Set(queue.keys())
    search(query)
    return [...queue].find(([id]) => !before.has(id))
  }
  return { owner, active, available, dispatch, search, request, cleared, queue }
}
test('current delayed search dispatches once at its configured deadline', () => {
  const f = fixture()
  f.request('current')
  vi.advanceTimersByTime(49)
  expect(f.dispatch).not.toHaveBeenCalled()
  vi.advanceTimersByTime(1)
  expect(f.dispatch.mock.calls).toEqual([['current']])
})
test('replacement physically cancels old handle and rejects retained late callback', () => {
  const f = fixture()
  const old = f.request('old')!
  f.request('new')
  expect(f.cleared).toHaveBeenCalledWith(old[0])
  old[1]()
  expect(f.dispatch).not.toHaveBeenCalled()
  vi.advanceTimersByTime(50)
  expect(f.dispatch.mock.calls).toEqual([['new']])
})
test('consumed callback cannot deliver twice', () => {
  const f = fixture()
  const task = f.request('current')!
  task[1]()
  task[1]()
  expect(f.dispatch.mock.calls).toEqual([['current']])
})
test('closing and reopening cannot revive the old callback', () => {
  const f = fixture()
  const task = f.request('old')!
  f.available.value = false
  f.available.value = true
  task[1]()
  expect(f.dispatch).not.toHaveBeenCalled()
})
test('retained callback and search cannot act after unmount', () => {
  const f = fixture()
  const task = f.request('old')!
  f.owner.unmount()
  task[1]()
  const size = f.queue.size
  f.search('late')
  expect(f.queue.size).toBe(size)
  expect(f.dispatch).not.toHaveBeenCalled()
})
test('deactivation retires callbacks across activation and allows only fresh searches', async () => {
  const f = fixture()
  const task = f.request('old')!
  f.active.value = false
  await nextTick()
  const size = f.queue.size
  f.search('inactive')
  expect(f.queue.size).toBe(size)
  f.active.value = true
  await nextTick()
  task[1]()
  expect(f.dispatch).not.toHaveBeenCalled()
  f.request('fresh')
  vi.advanceTimersByTime(50)
  expect(f.dispatch.mock.calls).toEqual([['fresh']])
})
test('unavailable commands do not create delayed work', () => {
  const f = fixture()
  f.available.value = false
  f.search('closed')
  expect(f.queue.size).toBe(0)
})
test('delay getter reentrant disposal cannot leave a timer behind', () => {
  const state: { retire?: () => void } = {}
  const f = fixture(() => {
    state.retire?.()
    return 50
  })
  state.retire = () => f.owner.unmount()
  f.search('retired')
  expect(f.queue.size).toBe(0)
})
test('dispatch reentry keeps the newly scheduled handle owned and cancellable', () => {
  const f = fixture()
  f.dispatch.mockImplementationOnce(() => f.search('new'))
  const old = f.request('old')!
  old[1]()
  f.available.value = false
  expect(f.cleared).toHaveBeenCalled()
  vi.advanceTimersByTime(50)
  expect(f.dispatch.mock.calls).toEqual([['old']])
})
