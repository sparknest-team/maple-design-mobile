import {
  computed,
  getCurrentInstance,
  inject,
  onActivated,
  onDeactivated,
  onMounted,
  onScopeDispose,
  provide,
  ref,
  shallowRef,
  watchPostEffect,
  type InjectionKey,
  type Ref,
} from 'vue'

export type ReadingDirection = 'ltr' | 'rtl'
export const readingDirectionKey: InjectionKey<Readonly<Ref<ReadingDirection | undefined>>> =
  Symbol('reading-direction')

/** Provide reading direction without changing the direction of the document. */
export function provideDirection(direction: Readonly<Ref<ReadingDirection | undefined>>) {
  provide(readingDirectionKey, direction)
}

export function resolveDirection(element?: Element | null, fallback: ReadingDirection = 'ltr'): ReadingDirection {
  let current = element ?? undefined
  while (current) {
    const scope = current.closest('[dir]')
    if (scope) {
      const value = scope.getAttribute('dir')?.toLowerCase()
      if (value === 'ltr' || value === 'rtl') {
        return value
      }
      if (value === 'auto') {
        return scope.ownerDocument.defaultView?.getComputedStyle(scope).direction === 'rtl' ? 'rtl' : 'ltr'
      }
      if (scope.parentElement) {
        current = scope.parentElement
        continue
      }
    }
    const root = (scope ?? current).getRootNode()
    current = 'host' in root ? (root as ShadowRoot).host : undefined
  }
  return fallback
}

// Share one direction observer for each document or shadow root.
const roots = new WeakMap<Node, { version: Ref<number>; observer: MutationObserver; users: number }>()

const watchedAncestors = new WeakMap<Node, Set<() => void>>()
const detachedChecks = new Set<() => void>()
let detachedTimer: ReturnType<typeof setInterval> | undefined
function watchDetached(check: () => void) {
  detachedChecks.add(check)
  if (detachedTimer === undefined) {
    detachedTimer = setInterval(() => {
      Array.from(detachedChecks).forEach((run) => run())
    }, 250)
  }
  return () => {
    detachedChecks.delete(check)
    if (!detachedChecks.size && detachedTimer !== undefined) {
      clearInterval(detachedTimer)
      detachedTimer = undefined
    }
  }
}
function watchAncestors(node: Node, callback: () => void) {
  const ancestors: Node[] = []
  let current: Node | null = node
  while (current) {
    ancestors.push(current)
    let watchers = watchedAncestors.get(current)
    if (!watchers) {
      watchers = new Set()
      watchedAncestors.set(current, watchers)
    }
    watchers.add(callback)
    current = current.parentNode ?? ('host' in current ? (current as ShadowRoot).host : null)
  }
  return () =>
    ancestors.forEach((ancestor) => {
      const watchers = watchedAncestors.get(ancestor)
      watchers?.delete(callback)
      if (!watchers?.size) {
        watchedAncestors.delete(ancestor)
      }
    })
}

/** DOM scopes take precedence over injection, so native nested dir containers work too. */
export function useDirection(target?: () => Element | null | undefined, explicit?: () => unknown) {
  const inherited = inject(readingDirectionKey, undefined)
  const instance = getCurrentInstance()
  const element = shallowRef<Element>()
  const versions = shallowRef<Ref<number>[]>([])
  let release: (() => void) | undefined
  let active = false

  function observe(node?: Element | null, force = false) {
    if (!force && node === element.value && release) {
      return
    }
    release?.()
    release = undefined
    element.value = node ?? undefined
    versions.value = []
    const doc = node?.ownerDocument
    const Observer = doc?.defaultView?.MutationObserver
    if (!doc || !Observer) {
      return
    }
    const observed = new Set<Node>([doc.documentElement])
    let current: Element | undefined = node ?? undefined
    while (current) {
      const root = current.getRootNode()
      observed.add(root === doc ? doc.documentElement : root)
      current = 'host' in root ? (root as ShadowRoot).host : undefined
    }
    const releases: Array<() => void> = []
    const counters: Ref<number>[] = []
    for (const root of observed) {
      let state = roots.get(root)
      if (!state) {
        const counter = ref(0)
        const observer = new Observer((records) => {
          const moved = new Set<() => void>()
          for (const record of records) {
            if (record.type === 'attributes') {
              counter.value++
            } else {
              for (const changed of [...Array.from(record.addedNodes), ...Array.from(record.removedNodes)]) {
                watchedAncestors.get(changed)?.forEach((callback) => moved.add(callback))
              }
            }
          }
          moved.forEach((callback) => callback())
        })
        observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['dir'] })
        state = { version: counter, observer, users: 0 }
        roots.set(root, state)
      }
      state.users++
      counters.push(state.version)
      const currentState = state
      releases.push(() => {
        if (--currentState.users === 0) {
          currentState.observer.disconnect()
          roots.delete(root)
        }
      })
    }
    versions.value = counters
    const unwatch = node ? watchAncestors(node, () => observe(node, true)) : undefined
    const unwatchDetached =
      node && !node.isConnected
        ? watchDetached(() => {
            if (node.isConnected) {
              observe(node, true)
            }
          })
        : undefined
    release = () => {
      unwatch?.()
      unwatchDetached?.()
      releases.forEach((dispose) => dispose())
    }
  }
  function refresh() {
    const node = target ? target() : instance?.vnode.el
    observe(node?.nodeType === 1 ? (node as Element) : node?.parentElement)
  }
  function start() {
    active = true
    refresh()
  }
  function stop() {
    active = false
    release?.()
    release = undefined
    versions.value = []
  }
  onMounted(start)
  onActivated(start)
  onDeactivated(stop)
  onScopeDispose(stop)
  watchPostEffect(() => {
    // Read the target even before mounting so ref replacement remains reactive.
    const node = target?.()
    if (active) {
      if (target) {
        observe(node)
      } else {
        refresh()
      }
    }
  })

  const dir = computed<ReadingDirection>(() => {
    // Subscribe to native ancestor changes, including html and the component itself.
    versions.value.forEach((version) => {
      void version.value
    })
    const value = explicit?.()
    if (value === 'ltr' || value === 'rtl') {
      return value
    }
    return resolveDirection(element.value, inherited?.value ?? 'ltr')
  })
  return { dir, isRtl: computed(() => dir.value === 'rtl') }
}
