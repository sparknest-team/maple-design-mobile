import * as Vue from 'vue'

// Each SSR request / client app owns its counter; never use a process-global ID.
const appCounters = new WeakMap<object, number>()

/** Native IDs on Vue 3.5+, deterministic app-scoped IDs on earlier Vue 3. */
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
  const count = appCounters.get(context) ?? 0
  appCounters.set(context, count + 1)
  return `v-${count}`
}
