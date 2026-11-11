import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { useAsyncData, type AsyncDataLoader, type AsyncDataOptions } from '../../../../use/src/useAsyncData'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.useRealTimers()
})
function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
function setup<T>(loader: AsyncDataLoader<T>, options: AsyncDataOptions<T>) {
  let state!: ReturnType<typeof useAsyncData<T>>
  const owner = mount({
    setup() {
      state = useAsyncData(loader, options)
      return () => h('div')
    },
  })
  owners.push(owner)
  return { state, owner }
}

test('a reusable zero-argument loader initializes once per owner and never runs on rerender', async () => {
  const loader = vi.fn(async () => ['Alice'])
  const first = setup(loader, { initialData: [] as string[] })
  const second = setup(loader, { initialData: [] as string[] })
  await flushPromises()
  first.owner.vm.$forceUpdate()
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(2)
  expect(first.state.data.value).toEqual(['Alice'])
  first.state.data.value = ['Only here']
  expect(second.state.data.value).toEqual(['Alice'])
})
test('manual execute before mount prevents a duplicate initial request', async () => {
  const loader = vi.fn(async () => 1)
  const owner = mount({
    setup() {
      void useAsyncData(loader, { initialData: 0 }).execute()
      return () => h('div')
    },
  })
  owners.push(owner)
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(1)
})
test('immediate false starts idle; manual execution exposes success', async () => {
  const loader = vi.fn(async () => 5)
  const { state } = setup(loader, { initialData: 0, immediate: false })
  expect(loader).not.toHaveBeenCalled()
  expect(await state.execute()).toEqual({ status: 'success', data: 5 })
  expect(state.data.value).toBe(5)
})
test('new executions abort the previous signal and ignore late responses even if transport ignores cancellation', async () => {
  const old = deferred<string[]>(),
    fresh = deferred<string[]>()
  let signal!: AbortSignal
  const { state } = setup(
    ({ signal: input }) => {
      signal = input
      return old.promise
    },
    { initialData: [] as string[], immediate: false },
  )
  const first = state.execute()
  const second = state.execute({ loader: () => fresh.promise })
  expect(signal.aborted).toBe(true)
  expect(await first).toEqual({ status: 'cancelled' })
  fresh.resolve(['fresh'])
  await second
  old.resolve(['obsolete'])
  await flushPromises()
  expect(state.data.value).toEqual(['fresh'])
  expect(state.loading.value).toBe(false)
})
test('cancellation settles immediately even when the loader never settles', async () => {
  const { state } = setup(() => new Promise<number>(() => {}), { initialData: 0, immediate: false })
  const pending = state.execute()
  state.cancel()
  expect(await pending).toEqual({ status: 'cancelled' })
  expect(state.loading.value).toBe(false)
  expect(state.error.value).toBeUndefined()
})
test('unmount cancels active and queued work and prevents future calls', async () => {
  const task = deferred<number>()
  let signal!: AbortSignal
  const loader = vi.fn(({ signal: input }: { signal: AbortSignal }) => {
    signal = input
    return task.promise
  })
  const { state, owner } = setup(loader, { initialData: 0 })
  owner.unmount()
  expect(signal.aborted).toBe(true)
  task.resolve(9)
  await flushPromises()
  expect(state.data.value).toBe(0)
  expect(await state.execute()).toEqual({ status: 'cancelled' })
  expect(loader).toHaveBeenCalledTimes(1)
})
test('debounce coalesces manual searches and cancels queued promises; initialization is immediate', async () => {
  vi.useFakeTimers()
  const loader = vi.fn(async () => ['initial'])
  const { state } = setup(loader, { initialData: [] as string[], debounce: 100 })
  await flushPromises()
  expect(loader).toHaveBeenCalledTimes(1)
  const stale = vi.fn(async () => ['stale']),
    fresh = vi.fn(async () => ['fresh'])
  const first = state.execute({ loader: stale }),
    second = state.execute({ loader: fresh })
  expect(state.loading.value).toBe(true)
  expect(await first).toEqual({ status: 'cancelled' })
  vi.advanceTimersByTime(100)
  await second
  expect(stale).not.toHaveBeenCalled()
  expect(fresh).toHaveBeenCalledTimes(1)
  expect(state.data.value).toEqual(['fresh'])
})
test('cancel and unmount also remove debounce timers', async () => {
  vi.useFakeTimers()
  const loader = vi.fn(async () => 1)
  const { state, owner } = setup(loader, { initialData: 0, immediate: false, debounce: 100 })
  const first = state.execute()
  state.cancel()
  expect(await first).toEqual({ status: 'cancelled' })
  const second = state.execute()
  owner.unmount()
  expect(await second).toEqual({ status: 'cancelled' })
  vi.advanceTimersByTime(100)
  expect(loader).not.toHaveBeenCalled()
})
test('sync throws and async errors settle without unhandled rejections; refresh retries', async () => {
  const cause = new Error('Offline')
  const loader = vi
    .fn((): number | Promise<number> => 8)
    .mockImplementationOnce(() => {
      throw cause
    })
    .mockRejectedValueOnce(cause)
    .mockResolvedValue(8)
  const { state } = setup(loader, { initialData: 0, immediate: false })
  expect(await state.execute()).toEqual({ status: 'error', error: cause })
  expect(state.error.value).toBe(cause)
  expect((await state.execute()).status).toBe('error')
  expect(state.data.value).toBe(0)
  await state.refresh()
  expect(state.error.value).toBeUndefined()
  expect(state.data.value).toBe(8)
})
test('cache is opt-in, per-instance, keyed explicitly and refresh bypasses it', async () => {
  const loader = vi.fn(async () => 1),
    query = vi.fn(async () => 2)
  const { state } = setup(loader, { initialData: 0, immediate: false, cacheTime: 1000 })
  await state.execute()
  await state.execute()
  expect(loader).toHaveBeenCalledTimes(1)
  await state.execute({ loader: query, cacheKey: 'team:a' })
  await state.execute({ loader: query, cacheKey: 'team:a' })
  expect(query).toHaveBeenCalledTimes(1)
  await state.refresh()
  expect(query).toHaveBeenCalledTimes(2)
  await state.execute({ loader: query, cacheKey: 'team:b' })
  expect(query).toHaveBeenCalledTimes(3)
  const other = setup(loader, { initialData: 0, cacheTime: 1000 })
  await flushPromises()
  expect(other.state.data.value).toBe(1)
  expect(loader).toHaveBeenCalledTimes(2)
  state.clearCache()
  await state.execute({ loader: query, cacheKey: 'team:a' })
  expect(query).toHaveBeenCalledTimes(4)
})
test('expired cache is refetched; overriding a loader without a key never reuses cache', async () => {
  vi.useFakeTimers()
  const loader = vi.fn(async () => 1)
  const { state } = setup(loader, { initialData: 0, immediate: false, cacheTime: 100 })
  await state.execute()
  vi.advanceTimersByTime(101)
  await state.execute()
  expect(loader).toHaveBeenCalledTimes(2)
  await state.execute({ loader })
  await state.execute({ loader })
  expect(loader).toHaveBeenCalledTimes(4)
})
test('default cache disabled; empty arrays are valid results', async () => {
  const loader = vi.fn(async () => [] as string[])
  const { state } = setup(loader, { initialData: ['old'], immediate: false })
  await state.execute()
  await state.execute()
  expect(loader).toHaveBeenCalledTimes(2)
  expect(state.data.value).toEqual([])
})

test('SSR does not start initialization requests', async () => {
  const loader = vi.fn(async () => 1)
  await renderToString(
    createSSRApp({
      setup() {
        useAsyncData(loader, { initialData: 0 })
        return () => h('div')
      },
    }),
  )
  expect(loader).not.toHaveBeenCalled()
})
test('refresh bypasses debounce and retries the most recently requested loader', async () => {
  vi.useFakeTimers()
  const initial = vi.fn(async () => 1),
    query = vi.fn(async () => 2)
  const { state } = setup(initial, { initialData: 0, immediate: false, debounce: 100 })
  const pending = state.execute({ loader: query })
  expect(await state.refresh()).toEqual({ status: 'success', data: 2 })
  expect(await pending).toEqual({ status: 'cancelled' })
  expect(initial).not.toHaveBeenCalled()
  expect(query).toHaveBeenCalledTimes(1)
})
test('a cancelled request rejection does not overwrite a later success or leak an error', async () => {
  const stale = deferred<number>()
  const { state } = setup(() => stale.promise, { initialData: 0, immediate: false })
  const first = state.execute()
  await state.execute({ loader: () => 2 })
  stale.reject(new Error('Late rejection'))
  await flushPromises()
  expect(await first).toEqual({ status: 'cancelled' })
  expect(state.data.value).toBe(2)
  expect(state.error.value).toBeUndefined()
})

test('cache bounds evict the oldest entry after fifty successful keys', async () => {
  const loader = vi.fn(async () => 1)
  const { state } = setup(loader, { initialData: 0, immediate: false, cacheTime: 10000 })
  for (let key = 0; key < 51; key++) {
    await state.execute({ loader, cacheKey: String(key) })
  }
  await state.execute({ loader, cacheKey: '50' })
  expect(loader).toHaveBeenCalledTimes(51)
  await state.execute({ loader, cacheKey: '0' })
  expect(loader).toHaveBeenCalledTimes(52)
})
