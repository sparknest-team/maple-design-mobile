import { getCurrentInstance, getCurrentScope, onMounted, onScopeDispose, readonly, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'
import type { CompatibleShallowRef as ShallowRef } from './_utils/compatible-shallow-ref'

export interface AsyncDataContext {
  signal: AbortSignal
}
/** A zero-argument business function is also accepted; mapping stays in the loader. */
export type AsyncDataLoader<T> = (context: AsyncDataContext) => T | Promise<T>
export type AsyncDataResult<T> =
  { status: 'success'; data: T } | { status: 'cancelled' } | { status: 'error'; error: unknown }
export interface AsyncDataOptions<T> {
  initialData: T
  /** Run once on client mount. Changing the loader does not rerun it. */
  immediate?: boolean
  /** Milliseconds; applies to manual execute calls, not initial loading or refresh. */
  debounce?: number
  /** Per-instance TTL in milliseconds. Disabled by default; at most 50 entries. */
  cacheTime?: number
}
export interface AsyncDataExecuteOptions<T> {
  loader?: AsyncDataLoader<T>
  /** Explicitly distinguish query, tenant, permissions, etc. Never inferred from a function. */
  cacheKey?: string
  force?: boolean
}

export interface AsyncDataReturn<T> {
  data: ShallowRef<T>
  loading: Readonly<Ref<boolean>>
  error: Readonly<ShallowRef<unknown>>
  execute: (request?: AsyncDataExecuteOptions<T>) => Promise<AsyncDataResult<T>>
  refresh: () => Promise<AsyncDataResult<T>>
  cancel: () => void
  clearCache: () => void
}

/** Array/object agnostic async state. Each invocation owns its state and cache. */
export function useAsyncData<T>(loader: AsyncDataLoader<T>, options: AsyncDataOptions<T>): AsyncDataReturn<T> {
  const data = shallowRef<T>(options.initialData)
  const loading = ref(false)
  const error = shallowRef<unknown>()
  const initialKey = Symbol('initial')
  const cache = new Map<string | symbol, { data: T; expires: number }>()
  let active:
    | {
        controller: AbortController
        timer?: ReturnType<typeof setTimeout>
        settle: (result: AsyncDataResult<T>) => void
      }
    | undefined
  let last: AsyncDataExecuteOptions<T> = {}
  let disposed = false
  let started = false

  function cancel() {
    const task = active
    active = undefined
    if (task) {
      clearTimeout(task.timer)
      task.controller.abort()
      task.settle({ status: 'cancelled' })
    }
    loading.value = false
  }

  function run(request: AsyncDataExecuteOptions<T>, delay: number): Promise<AsyncDataResult<T>> {
    cancel()
    if (disposed) {
      return Promise.resolve({ status: 'cancelled' })
    }
    started = true
    last = request
    error.value = undefined
    const currentLoader = request.loader ?? loader
    const key = request.cacheKey ?? (request.loader ? undefined : initialKey)
    const ttl = options.cacheTime ?? 0
    const cached = key === undefined ? undefined : cache.get(key)
    if (!request.force && ttl > 0 && cached && cached.expires > Date.now()) {
      data.value = cached.data
      return Promise.resolve({ status: 'success', data: cached.data })
    }
    if (key !== undefined) {
      cache.delete(key)
    }
    loading.value = true
    return new Promise((settle) => {
      const task = {
        controller: new AbortController(),
        settle,
        timer: undefined as ReturnType<typeof setTimeout> | undefined,
      }
      active = task
      const start = async () => {
        try {
          const value = await currentLoader({ signal: task.controller.signal })
          if (active !== task) {
            return
          }
          data.value = value
          if (ttl > 0 && key !== undefined) {
            if (cache.size >= 50) {
              cache.delete(cache.keys().next().value!)
            }
            cache.set(key, { data: value, expires: Date.now() + ttl })
          }
          settle({ status: 'success', data: value })
        } catch (cause) {
          if (active !== task) {
            return
          }
          error.value = cause
          settle({ status: 'error', error: cause })
        } finally {
          if (active === task) {
            active = undefined
            loading.value = false
          }
        }
      }
      if (delay > 0) {
        task.timer = setTimeout(start, delay)
      } else {
        void start()
      }
    })
  }

  const execute = (request: AsyncDataExecuteOptions<T> = {}) => run(request, options.debounce ?? 0)
  const refresh = () => run({ ...last, force: true }, 0)
  const initialize = () => {
    if (!started && !disposed && options.immediate !== false) {
      void run({}, 0)
    }
  }
  // SSR never starts a client request. Manual use in an effect scope is also supported.
  if (getCurrentInstance()) {
    onMounted(initialize)
  } else {
    initialize()
  }
  if (getCurrentScope()) {
    onScopeDispose(() => {
      disposed = true
      cancel()
      cache.clear()
    })
  }

  return {
    data,
    loading: readonly(loading),
    error: readonly(error),
    execute,
    refresh,
    cancel,
    clearCache: () => cache.clear(),
  }
}
