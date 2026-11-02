import { onMounted, shallowReactive, watch } from 'vue'
import type { NavMenuKey } from './types'

export type NavMenuItemName = NavMenuKey | (() => NavMenuKey | undefined)

/** Validate the final rendered names so a batched swap does not look like a duplicate. */
export function useNavMenuItemNames() {
  let mounted = false
  onMounted(() => {
    mounted = true
  })
  const names = shallowReactive(new Map<symbol, () => NavMenuKey | undefined>())
  watch(
    () => [...names.values()].map((getName) => getName()),
    (values) => {
      const used = new Set<NavMenuKey>()
      for (const name of values) {
        if (name === undefined) {
          continue
        }
        if (used.has(name)) {
          throw new Error(`NavMenu.Item duplicate name: ${name}`)
        }
        used.add(name)
      }
    },
    { flush: 'post' },
  )
  function register(id: symbol, name?: NavMenuItemName) {
    const getName = typeof name === 'function' ? name : () => name
    const value = getName()
    const used = new Set([...names].filter(([key]) => key !== id).map(([, get]) => get()))
    if (!mounted && value !== undefined && used.has(value)) {
      throw new Error(`NavMenu.Item duplicate name: ${value}`)
    }
    names.set(id, getName)
    return () => {
      if (names.get(id) === getName) {
        names.delete(id)
      }
    }
  }
  return { register, clear: () => names.clear() }
}
