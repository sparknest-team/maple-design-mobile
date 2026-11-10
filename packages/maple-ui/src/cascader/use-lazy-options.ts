import { onActivated, onBeforeUnmount, onDeactivated, shallowReactive, watch } from 'vue'
import type { CascaderFieldNames, CascaderOption, CascaderOptionInfo } from './types'

type LazyLoader = (option: CascaderOption, done: (children?: CascaderOption[]) => void) => void
/** Callback-only lazy children, shared by the field and standalone panel. */
export function useLazyOptions(config: {
  options: () => readonly CascaderOption[] | undefined
  loader: () => LazyLoader | undefined
  fieldNames: () => CascaderFieldNames | undefined
  blocked: () => boolean
  cache: Record<string, CascaderOption[]>
}) {
  const pending = shallowReactive(new Map<string, { task: Promise<void>; cancel: () => void }>())
  let active = true
  function invalidate(clearCache = false) {
    const entries = [...pending.values()]
    pending.clear()
    entries.forEach((entry) => entry.cancel())
    if (clearCache) {
      Object.keys(config.cache).forEach((key) => delete config.cache[key])
    }
  }
  watch([config.options, config.loader, config.fieldNames], () => invalidate(true), { deep: true, flush: 'sync' })
  watch(
    config.blocked,
    (blocked) => {
      if (blocked) {
        invalidate()
      }
    },
    { flush: 'sync' },
  )
  onActivated(() => {
    active = true
  })
  onDeactivated(() => {
    active = false
    invalidate()
  })
  onBeforeUnmount(() => {
    active = false
    invalidate(true)
  })
  const load = (option: CascaderOptionInfo): Promise<void> => {
    const loader = config.loader()
    if (!active || config.blocked() || option.disabled || option.isLeaf || option.children || !loader) {
      return Promise.resolve()
    }
    const existing = pending.get(option.key)
    if (existing) {
      return existing.task
    }
    let resolve!: () => void, reject!: (error: unknown) => void
    const task = new Promise<void>((accept, fail) => {
      resolve = accept
      reject = fail
    })
    const entry = { task, cancel: resolve }
    pending.set(option.key, entry)
    const current = () => active && pending.get(option.key) === entry
    const done = (children?: CascaderOption[]) => {
      if (!current()) {
        return
      }
      pending.delete(option.key)
      try {
        if (children) {
          config.cache[option.key] = children
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    }
    try {
      // Return values are deliberately ignored: only done(children)/done() settle this protocol.
      loader(option.raw, done)
    } catch (error) {
      if (current()) {
        pending.delete(option.key)
        reject(error)
      } else {
        // A synchronous exception after done still belongs to the caller's error path.
        return task.then(() => {
          throw error
        })
      }
    }
    return task
  }
  return Object.assign(load, { isPending: (key: string) => pending.has(key) })
}
