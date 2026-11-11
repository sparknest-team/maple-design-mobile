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
  const scope = element?.closest('[dir]')
  const value = scope?.getAttribute('dir')?.toLowerCase()
  if (value === 'ltr' || value === 'rtl') {
    return value
  }
  if (value === 'auto' && scope) {
    return scope.ownerDocument.defaultView?.getComputedStyle(scope).direction === 'rtl' ? 'rtl' : 'ltr'
  }
  return fallback
}

// One observer per owner document, independent of the number of mounted components.
const documents = new WeakMap<Document, { version: Ref<number>; observer: MutationObserver; users: number }>()

/** DOM scopes take precedence over injection, so native nested dir containers work too. */
export function useDirection(target?: () => Element | null | undefined, explicit?: () => unknown) {
  const inherited = inject(readingDirectionKey, undefined)
  const instance = getCurrentInstance()
  const element = shallowRef<Element>()
  const version = shallowRef<Ref<number>>()
  let release: (() => void) | undefined
  let active = false

  function observe(node?: Element | null) {
    if (node === element.value && release) {
      return
    }
    release?.()
    release = undefined
    element.value = node ?? undefined
    version.value = undefined
    const doc = node?.ownerDocument
    const Observer = doc?.defaultView?.MutationObserver
    if (!doc || !Observer) {
      return
    }
    let state = documents.get(doc)
    if (!state) {
      const counter = ref(0)
      const observer = new Observer(() => {
        counter.value++
      })
      observer.observe(doc.documentElement, { subtree: true, attributes: true, attributeFilter: ['dir'] })
      state = { version: counter, observer, users: 0 }
      documents.set(doc, state)
    }
    state.users++
    version.value = state.version
    const current = state
    release = () => {
      if (--current.users === 0) {
        current.observer.disconnect()
        documents.delete(doc)
      }
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
    version.value = undefined
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
    void version.value?.value
    const value = explicit?.()
    if (value === 'ltr' || value === 'rtl') {
      return value
    }
    return resolveDirection(element.value, inherited?.value ?? 'ltr')
  })
  return { dir, isRtl: computed(() => dir.value === 'rtl') }
}
