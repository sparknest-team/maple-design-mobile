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
