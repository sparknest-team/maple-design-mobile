import {
  cloneVNode,
  isVNode,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  shallowRef,
  watch,
  withDirectives,
  type ObjectDirective,
  type Ref,
  type VNode,
} from 'vue'
import type { CompatibleShallowRef } from '../_utils/compatible-shallow-ref'
import type { TriggerReferenceAttrs } from './props'
import { referenceOwnership, referenceValue, type ReferenceBaseline } from './reference-ownership'

export type TriggerElement = HTMLElement | SVGElement

// The observer needs the component placeholder; positioning needs the first mounted element.
function firstReferenceNode(nodes: VNode | VNode[] | null | undefined, resolveElement = false): VNode | undefined {
  if (Array.isArray(nodes)) {
    for (const node of nodes) {
      const first = firstReferenceNode(node, resolveElement)
      if (first) {
        return first
      }
    }
  } else if (isVNode(nodes)) {
    if (nodes.component) {
      return resolveElement ? firstReferenceNode(nodes.component.subTree, true) : nodes
    }
    if (typeof nodes.type === 'string' && (!resolveElement || nodes.el?.nodeType === 1)) {
      return nodes
    }
    if (Array.isArray(nodes.children)) {
      return firstReferenceNode(nodes.children as VNode[], resolveElement)
    }
  }
}

export function getTriggerElement(nodes: VNode | VNode[] | null | undefined): TriggerElement | undefined {
  return firstReferenceNode(nodes, true)?.el as TriggerElement | undefined
}

export function useTriggerReference(): {
  nodes: { value: VNode[] }
  element: CompatibleShallowRef<TriggerElement | undefined>
} {
  // Rendered VNodes stay non-reactive; only the resolved DOM target is reactive.
  const nodes: { value: VNode[] } = { value: [] }
  const element = shallowRef<TriggerElement>()
  let observedParent: Node | undefined
  let observer: MutationObserver | undefined
  let active = true
  function resolve() {
    if (!active) {
      return
    }
    const next = getTriggerElement(nodes.value)
    element.value = next
    // An async or stateful component can replace its root without updating Trigger.
    // Its original placeholder and subsequent roots share the same DOM parent.
    const first = firstReferenceNode(nodes.value)
    const parent: Node | undefined = first?.component ? ((next ?? first.el)?.parentNode ?? undefined) : undefined
    if (parent === observedParent) {
      return
    }
    observer?.disconnect()
    observedParent = parent
    const Observer = parent?.ownerDocument?.defaultView?.MutationObserver
    if (parent && Observer) {
      observer = new Observer(resolve)
      observer.observe(parent, { childList: true })
    }
  }
  function suspend() {
    active = false
    observer?.disconnect()
    observedParent = undefined
    element.value = undefined
  }
  onMounted(resolve)
  onUpdated(resolve)
  onActivated(() => {
    active = true
    resolve()
  })
  onDeactivated(suspend)
  onBeforeUnmount(suspend)
  return { nodes, element }
}

export function bindTriggerEvents(
  element: TriggerElement | undefined,
  handlers: Record<string, EventListener>,
): () => void {
  const entries = Object.entries(handlers)
  function listen(method: 'addEventListener' | 'removeEventListener') {
    for (const [event, handler] of entries) {
      element?.[method](event, handler)
    }
  }
  listen('addEventListener')
  return () => listen('removeEventListener')
}

export const referenceSsrMarker = 'data-design-ui-trigger-ssr'
const semanticAttribute = /^(?:aria|data)-[a-z0-9_.:-]+$/

export type Reference = string | TriggerElement

/** Keep semantic attributes on the actual reference, including external references. */
export function useTriggerReferenceAttrs(
  element: Readonly<Ref<TriggerElement | undefined>>,
  slotElement: Readonly<Ref<TriggerElement | undefined>>,
  attrs: Readonly<Ref<TriggerReferenceAttrs>>,
) {
  // A hydrated reference already carries the server contribution. Keep the authored
  // baseline so releasing the reference restores the caller's own attributes.
  const baselines = new WeakMap<TriggerElement, ReferenceBaseline>()
  const directive: ObjectDirective<TriggerElement, ReferenceBaseline> = {
    getSSRProps: ({ value }) => Object.fromEntries([...value].map(([name, entry]) => [name, entry.rendered])),
    created(element, binding) {
      baselines.set(element, binding.value)
    },
    updated(target, binding) {
      if (target !== appliedElement) {
        return
      }
      for (const [name, entry] of binding.value) {
        if (entry.original !== binding.oldValue?.get(name)?.original) {
          ownership?.authored(name, entry.original)
        }
      }
    },
  }
  const owner = Symbol('Trigger')
  let appliedElement: TriggerElement | undefined
  let ownership: ReturnType<typeof referenceOwnership> | undefined
  const restore = () => {
    ownership?.update(owner, {})
    ownership = undefined
    appliedElement = undefined
  }
  function synchronize() {
    const target = element.value
    const next = attrs.value
    const active = target && Object.values(next).some((value) => value != null)
    if (!active || target !== appliedElement) {
      restore()
    }
    if (!target || !active) {
      return
    }
    appliedElement = target
    ownership ??= referenceOwnership(target)
    let baseline = baselines.get(target)
    for (let marker = referenceSsrMarker; target === slotElement.value; marker += '-') {
      const encoded = target.getAttribute(marker)
      if (encoded === null) {
        break
      }
      try {
        const entries: unknown = JSON.parse(encoded)
        if (
          Array.isArray(entries) &&
          entries.every(
            (row) =>
              Array.isArray(row) &&
              row.length === 3 &&
              typeof row[0] === 'string' &&
              semanticAttribute.test(row[0]) &&
              (row[1] === null || typeof row[1] === 'string') &&
              typeof row[2] === 'string',
          )
        ) {
          const remaining: [string, string | null, string][] = []
          baseline = new Map(baseline)
          for (const row of entries) {
            const [name, original, rendered] = row
            if (next[name] == null) {
              remaining.push(row)
              continue
            }
            const native = baseline.get(name)
            baseline.set(name, {
              original: native && native.rendered === original ? native.original : original,
              rendered,
            })
          }
          if (remaining.length < entries.length) {
            if (remaining.length) {
              target.setAttribute(marker, JSON.stringify(remaining))
            } else {
              target.removeAttribute(marker)
            }
          }
          break
        }
      } catch {
        /* A caller may also have supplied an ordinary data attribute. */
      }
    }
    ownership.update(owner, next, baseline)
    baselines.delete(target)
  }
  // Register even a short-lived hydrated node before the caller can replace it.
  watch(element, synchronize, { immediate: true, flush: 'sync' })
  watch(attrs, synchronize, { flush: 'post' })

  onBeforeUnmount(restore)
  onDeactivated(restore)

  return (node: VNode) => {
    const baseline: ReferenceBaseline = new Map()
    for (const [name, value] of Object.entries(attrs.value)) {
      // Native ARIA and data attributes serialize as strings in both DOM and SSR.
      if (value == null || !semanticAttribute.test(name)) {
        continue
      }
      const prop = node.props?.[name]
      const original = prop == null ? null : String(prop)
      baseline.set(name, { original, rendered: referenceValue(name, [String(value)], original)! })
    }
    if (!baseline.size) {
      return node
    }
    const reference = cloneVNode(node)
    if (node.dirs) {
      reference.dirs = [...node.dirs]
    }
    return withDirectives(reference, [[directive, baseline]])
  }
}

/** Resolve both slot roots and external references with one lifecycle contract. */
export function useTriggerTarget(
  slotElement: Readonly<Ref<TriggerElement | undefined>>,
  reference: () => Reference | undefined,
): {
  element: CompatibleShallowRef<TriggerElement | undefined>
  getReference: () => TriggerElement | undefined
  setReference: (target?: Reference) => void
} {
  const element = shallowRef<TriggerElement>()
  let override: Reference | undefined
  let active = false
  const resolve = () => {
    if (!active) {
      return
    }
    const target = override ?? reference() ?? slotElement.value
    element.value =
      typeof target === 'string'
        ? ((slotElement.value?.ownerDocument ?? document).querySelector<TriggerElement>(target) ?? undefined)
        : target
  }
  function activate() {
    active = true
    resolve()
  }
  function deactivate() {
    active = false
    element.value = undefined
  }
  watch([slotElement, reference], resolve, { flush: 'sync' })
  onMounted(activate)
  onUpdated(resolve)
  onActivated(activate)
  onDeactivated(deactivate)
  onBeforeUnmount(deactivate)
  return {
    element,
    getReference: () => element.value,
    setReference: (target?: Reference) => {
      override = target
      resolve()
    },
  }
}
