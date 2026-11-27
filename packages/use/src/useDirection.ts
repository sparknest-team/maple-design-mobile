import {
  computed,
  getCurrentInstance,
  inject,
  onActivated,
  onDeactivated,
  onMounted,
  provide,
  ref,
  shallowReactive,
  shallowRef,
  triggerRef,
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

function shadowHost(node: Node): Element | undefined {
  return node.nodeType === 11 ? (node as ShadowRoot).host : undefined
}

function directionParent(node: Node): Node | undefined {
  return (node as Element).assignedSlot ?? node.parentNode ?? shadowHost(node)
}

function directionSource(element?: Element | null): ReadingDirection | Element | undefined {
  for (let node: Node | undefined = element ?? undefined; node; node = directionParent(node)) {
    if (node.nodeType !== 1) {
      continue
    }
    const scope = node as Element
    const value = scope.getAttribute('dir')?.toLowerCase()
    if (value === 'ltr' || value === 'rtl') {
      return value
    }
    if (value === 'auto' || (scope.localName === 'bdi' && scope.namespaceURI === 'http://www.w3.org/1999/xhtml')) {
      return scope
    }
  }
}

function nativeDirection(scope: Element): ReadingDirection {
  return scope.ownerDocument.defaultView?.getComputedStyle(scope).direction === 'rtl' ? 'rtl' : 'ltr'
}

export function resolveDirection(element?: Element | null, fallback: ReadingDirection = 'ltr'): ReadingDirection {
  const source = directionSource(element)
  return typeof source === 'object' ? nativeDirection(source) : (source ?? fallback)
}

// Share one direction observer for each document or shadow root.
const roots = new WeakMap<Node, { observer: MutationObserver; users: number }>()

const watchedAncestors = new WeakMap<Node, Set<(attributeOnly?: boolean) => void>>()
const pendingChecks = new Set<() => void>()
let checkTimer: ReturnType<typeof setInterval> | undefined
function pollChanges(check: () => void) {
  pendingChecks.add(check)
  if (checkTimer === undefined) {
    checkTimer = setInterval(() => {
      Array.from(pendingChecks).forEach((run) => run())
    }, 250)
  }
  return () => {
    pendingChecks.delete(check)
    if (!pendingChecks.size) {
      clearInterval(checkTimer)
      checkTimer = undefined
    }
  }
}
// Share native direction reads and cleanup when several fields inherit the same auto scope.
const automatic = /* @__PURE__ */ shallowReactive(new WeakMap<Element, ReturnType<typeof observeAutomatic>>())
function observeAutomatic(scope: Element) {
  const direction = ref<ReadingDirection>('ltr')
  const read = () => {
    direction.value = nativeDirection(scope)
  }
  let bind: (() => void) | undefined
  const view = scope.ownerDocument.defaultView
  let stop: (() => void) | undefined
  if (scope.localName === 'input' || scope.localName === 'textarea') {
    const input = scope as HTMLInputElement | HTMLTextAreaElement
    let last = input.value
    const changed = () => {
      if (last !== input.value) {
        last = input.value
        read()
      }
    }
    // Assigning .value directly does not dispatch an input event.
    const unsubscribe = pollChanges(changed)
    input.addEventListener('input', changed)
    stop = () => {
      unsubscribe()
      input.removeEventListener('input', changed)
    }
  } else if (view?.MutationObserver) {
    const observer = new view.MutationObserver(read)
    bind = () => {
      observer.disconnect()
      for (let node: Element | undefined = scope; node; node = shadowHost(node.getRootNode())) {
        observer.observe(node, {
          subtree: true,
          characterData: true,
          childList: true,
          attributes: true,
          attributeFilter: ['dir', 'slot', 'name'],
        })
      }
    }
    stop = () => observer.disconnect()
  }
  return { direction, read, bind, users: 0, stop }
}

function notifyAncestor(node: Node, attributeOnly = false) {
  watchedAncestors.get(node)?.forEach((refresh) => refresh(attributeOnly))
}

function slotChanged(event: Event) {
  const root = event.currentTarget as ShadowRoot
  notifyAncestor(root.host)
}

/** DOM scopes take precedence over injection, so native nested dir containers work too. */
export function useDirection(target?: () => Element | null | undefined, explicit?: () => unknown) {
  const inherited = inject(readingDirectionKey, undefined)
  const instance = getCurrentInstance()
  const element = shallowRef<Element>()
  function explicitDirection() {
    const value = explicit?.()
    return value === 'ltr' || value === 'rtl' ? value : undefined
  }
  // Mounted/activated state also invalidates the ancestry subscription after a move.
  const topology = shallowRef(false)
  let relocated = false
  function moved(attributeOnly = false) {
    if (!attributeOnly) {
      relocated = true
    }
    triggerRef(attributeOnly ? element : topology)
  }

  function currentElement(): Element | undefined {
    const node = target ? target() : (instance?.vnode.el as Node | null | undefined)
    return node?.nodeType === 1 ? (node as Element) : (node?.parentElement ?? undefined)
  }
  function start() {
    element.value = currentElement()
    topology.value = true
  }
  onMounted(start)
  onActivated(start)
  onDeactivated(() => {
    topology.value = false
  })
  watchPostEffect((cleanup) => {
    // Rebind after slot reassignment, DOM moves, or a detached node reconnecting.
    if (!topology.value) {
      return
    }
    const node = currentElement()
    element.value = node
    if (explicitDirection()) {
      return
    }
    const Observer = node?.ownerDocument.defaultView?.MutationObserver
    if (!node || !Observer) {
      return
    }

    const observed = new Set<Node>([node.ownerDocument.documentElement])
    const ancestors: Array<Set<typeof moved>> = []
    for (let current: Node | undefined = node; current; current = directionParent(current)) {
      const projectionRoot = current.parentElement?.shadowRoot
      if (projectionRoot) {
        observed.add(projectionRoot)
      }
      if (!current.parentNode && current.nodeType !== 9) {
        observed.add(current)
      }
      let callbacks = watchedAncestors.get(current)
      if (!callbacks) {
        callbacks = new Set()
        watchedAncestors.set(current, callbacks)
      }
      callbacks.add(moved)
      ancestors.push(callbacks)
    }
    for (const root of observed) {
      let state = roots.get(root)
      if (!state) {
        const observer = new Observer((records) => {
          for (const record of records) {
            if (record.type === 'attributes') {
              notifyAncestor(record.target, true)
            } else {
              for (const node of record.addedNodes) {
                notifyAncestor(node)
              }
              for (const node of record.removedNodes) {
                notifyAncestor(node)
              }
            }
          }
        })
        observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['dir'] })
        if (shadowHost(root)) {
          root.addEventListener('slotchange', slotChanged)
        }
        state = { observer, users: 0 }
        roots.set(root, state)
      }
      state.users++
    }
    triggerRef(element)
    const stopPolling = node.isConnected
      ? undefined
      : pollChanges(() => {
          if (node.isConnected) {
            moved()
          }
        })
    cleanup(() => {
      stopPolling?.()
      for (const subscribers of ancestors) {
        subscribers.delete(moved)
      }
      for (const root of observed) {
        const subscription = roots.get(root)!
        if (--subscription.users === 0) {
          subscription.observer.disconnect()
          if (shadowHost(root)) {
            root.removeEventListener('slotchange', slotChanged)
          }
          roots.delete(root)
        }
      }
    })
  })

  const source = computed(() => {
    // Subscribe to native ancestor changes, including html and the component itself.
    return explicitDirection() ?? directionSource(element.value) ?? inherited?.value ?? 'ltr'
  })
  watchPostEffect((cleanup) => {
    const scope = source.value
    if (!topology.value || typeof scope !== 'object') {
      return
    }
    // Adoption or ancestor direction can change the native result without editing the text.
    void element.value
    const state = automatic.get(scope) ?? observeAutomatic(scope)
    // Projected text can live outside the auto scope on a different host after a move.
    if (!state.users || relocated) {
      state.bind?.()
    }
    relocated = false
    state.read()
    automatic.set(scope, state)
    state.users++
    cleanup(() => {
      if (--state.users === 0) {
        state.stop?.()
        automatic.delete(scope)
      }
    })
  })
  const dir = computed<ReadingDirection>(() => {
    const scope = source.value
    if (typeof scope !== 'object') {
      return scope
    }
    return automatic.get(scope)?.direction.value ?? nativeDirection(scope)
  })
  return { dir, isRtl: computed(() => dir.value === 'rtl') }
}
