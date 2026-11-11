import {
  isVNode,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  shallowRef,
  watch,
  type Ref,
  type VNode,
} from 'vue'
import type { TriggerReferenceAttrs } from './props'

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

export function useTriggerReference(onChange?: (element?: TriggerElement) => void) {
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
  const resolve = () => update(getTriggerElement(nodes.value))
  onMounted(resolve)
  onUpdated(resolve)
  onActivated(resolve)
  onDeactivated(() => update())
  onBeforeUnmount(() => update())
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
  let appliedElement: TriggerElement | undefined
  let originals = new Map<string, string | null>()

  const restore = () => {
    if (!appliedElement) {
      return
    }
    for (const [name, value] of originals) {
      if (value === null) {
        appliedElement.removeAttribute(name)
      } else {
        appliedElement.setAttribute(name, value)
      }
    }
    appliedElement = undefined
    originals = new Map()
  }

  watch(
    [element, attrs],
    ([nextElement, nextAttrs]) => {
      restore()
      if (!nextElement) {
        return
      }
      appliedElement = nextElement
      for (const [name, value] of Object.entries(nextAttrs)) {
        if (value == null) {
          continue
        }
        const original = nextElement.getAttribute(name)
        originals.set(name, original)
        if (name === 'aria-describedby') {
          const ids = `${original ?? ''} ${String(value)}`.trim().split(/\s+/).filter(Boolean)
          nextElement.setAttribute(name, [...new Set(ids)].join(' '))
        } else {
          nextElement.setAttribute(name, String(value))
        }
      }
    },
    { immediate: true, flush: 'post' },
  )

  onBeforeUnmount(restore)
  onDeactivated(restore)
}

/** Resolve both slot roots and external references with one lifecycle contract. */
export function useTriggerTarget(
  slotElement: Readonly<Ref<TriggerElement | undefined>>,
  reference: () => Reference | undefined,
) {
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
