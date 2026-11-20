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

export function getTriggerElement(nodes: VNode | VNode[] | null | undefined): TriggerElement | undefined {
  if (Array.isArray(nodes)) {
    for (const node of nodes) {
      const element = getTriggerElement(node)
      if (element) {
        return element
      }
    }
    return undefined
  }
  if (!nodes || !isVNode(nodes)) {
    return undefined
  }
  // Walk component subtrees before $el: fragment components have a text anchor.
  if (nodes.component) {
    return getTriggerElement(nodes.component.subTree)
  }
  if (typeof nodes.type === 'string' && nodes.el?.nodeType === 1) {
    return nodes.el as TriggerElement
  }
  return Array.isArray(nodes.children) ? getTriggerElement(nodes.children as VNode[]) : undefined
}

function firstReferenceNode(nodes: VNode[]): VNode | undefined {
  for (const node of nodes) {
    if (!isVNode(node)) {
      continue
    }
    if (typeof node.type === 'string' || node.component) {
      return node
    }
    if (Array.isArray(node.children)) {
      const first = firstReferenceNode(node.children as VNode[])
      if (first) {
        return first
      }
    }
  }
}

export function useTriggerReference(onChange?: (element?: TriggerElement) => void): {
  nodes: { value: VNode[] }
  element: CompatibleShallowRef<TriggerElement | undefined>
} {
  // Rendered VNodes stay non-reactive; only the resolved DOM target is reactive.
  const nodes: { value: VNode[] } = { value: [] }
  const element = shallowRef<TriggerElement>()
  const update = (next?: TriggerElement) => {
    if (element.value === next) {
      return
    }
    element.value = next
    onChange?.(next)
  }
  let observedParent: Node | undefined
  let observer: MutationObserver | undefined
  let active = true
  function resolve() {
    if (!active) {
      return
    }
    const next = getTriggerElement(nodes.value)
    update(next)
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
    update()
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
  for (const [event, handler] of Object.entries(handlers)) {
    element?.addEventListener(event, handler)
  }
  return () => {
    for (const [event, handler] of Object.entries(handlers)) {
      element?.removeEventListener(event, handler)
    }
  }
}

export type Reference = string | TriggerElement

/** Keep semantic attributes on the actual reference, including external references. */
export function useTriggerReferenceAttrs(
  element: Readonly<Ref<TriggerElement | undefined>>,
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
  watch(
    [element, attrs],
    ([target, next]) => {
      const active = target && Object.values(next).some((value) => value != null)
      if (!active || target !== appliedElement) {
        restore()
      }
      if (!target || !active) {
        return
      }
      appliedElement = target
      ownership ??= referenceOwnership(target)
      ownership.update(owner, next, baselines.get(target))
      baselines.delete(target)
    },
    { immediate: true, flush: 'post' },
  )

  onBeforeUnmount(restore)
  onDeactivated(restore)

  return (node: VNode) => {
    const baseline: ReferenceBaseline = new Map()
    for (const [name, value] of Object.entries(attrs.value)) {
      // Native ARIA and data attributes serialize as strings in both DOM and SSR.
      if (value == null || !/^(?:aria|data)-[a-z0-9_.:-]+$/.test(name)) {
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
  let mounted = false
  let suspended = false
  const resolve = () => {
    if (!mounted || suspended) {
      return
    }
    const target = override ?? reference() ?? slotElement.value
    element.value =
      typeof target === 'string'
        ? ((slotElement.value?.ownerDocument ?? document).querySelector<TriggerElement>(target) ?? undefined)
        : target
  }
  watch([slotElement, reference], resolve, { flush: 'sync' })
  onMounted(() => {
    mounted = true
    resolve()
  })
  onUpdated(resolve)
  onActivated(() => {
    suspended = false
    resolve()
  })
  onDeactivated(() => {
    suspended = true
    element.value = undefined
  })
  onBeforeUnmount(() => {
    mounted = false
    element.value = undefined
  })
  return {
    element,
    getReference: () => element.value,
    setReference: (target?: Reference) => {
      override = target
      resolve()
    },
  }
}
