import * as Vue from 'vue'

// Share one counter across duplicate Maple module formats within an app.
// Separate platform namespaces prevent their async render orders from interfering.
const counterKey = Symbol.for('@maple-design/vue-id-counter/v1')
const fallbackCounters = new WeakMap<object, { value: number }>()
const fallbackRegistryKey = Symbol.for('@maple-design/vue-id-fallback-registry/v1')

function getFallbackCounters(): WeakMap<object, { value: number }> {
  let registry = Reflect.get(globalThis, fallbackRegistryKey) as WeakMap<object, { value: number }> | undefined
  if (!registry) {
    registry = fallbackCounters
    if (Object.isExtensible(globalThis)) {
      try {
        Object.defineProperty(globalThis, fallbackRegistryKey, { value: registry })
      } catch {
        // A hardened global may reject writes even when it reports extensible.
      }
    }
  }
  return registry
}

/** Native IDs on Vue 3.5+; earlier versions use an app counter that can differ across asynchronous SSR hydration. */
export function useId(): string {
  const native = Reflect.get(Vue, 'useId') as (() => string) | undefined
  if (native) {
    return native()
  }
  const instance = Vue.getCurrentInstance()
  if (!instance) {
    throw new Error('useId must be called during component setup')
  }
  const context = instance.appContext
  let counter = Reflect.get(context, counterKey) as { value: number } | undefined
  if (!counter) {
    if (Object.isExtensible(context)) {
      counter = { value: 0 }
      Object.defineProperty(context, counterKey, { value: counter })
    } else {
      const fallback = getFallbackCounters()
      counter = fallback.get(context) ?? { value: 0 }
      fallback.set(context, counter)
    }
  }
  const count = counter.value++
  return `mp-v-${count}`
}
