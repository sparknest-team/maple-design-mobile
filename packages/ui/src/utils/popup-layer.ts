import {
  getCurrentInstance,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  shallowReactive,
  watch,
  type Ref,
} from 'vue'

interface Layer {
  id: symbol
  zIndex: Readonly<Ref<number>>
  order: number
  depth: number
  ancestors: readonly symbol[]
  yieldToDescendants: boolean
  modal: boolean
}
interface Registry {
  layers: Map<symbol, Layer>
  events: WeakMap<Event, symbol | null>
  sequence: number
}
const depthKey = Symbol('popup-layer-depth')
const ancestryKey = Symbol('popup-layer-ancestry')
const registries = new WeakMap<Document, Registry>()

function registryFor(document: Document) {
  let registry = registries.get(document)
  if (!registry) {
    registry = { layers: shallowReactive(new Map<symbol, Layer>()), events: new WeakMap(), sequence: 0 }
    registries.set(document, registry)
  }
  return registry
}

/** Read visual layers without joining focus or Escape dispatch. */
export function getHighestPopupZIndex(ownerDocument: Document | undefined): number {
  if (!ownerDocument) {
    return 0
  }
  let highest = 0
  for (const layer of registryFor(ownerDocument).layers.values()) {
    if (Number.isFinite(layer.zIndex.value)) {
      highest = Math.max(highest, layer.zIndex.value)
    }
  }
  return highest
}

/** Each library owns its registry. Layers never register during server rendering. */
export function usePopupLayer(
  active: () => boolean,
  zIndex: Readonly<Ref<number>>,
  ownerDocument?: () => Document | undefined,
  yieldToDescendants = false,
  modal = false,
) {
  const instance = getCurrentInstance()
  const id = Symbol('popup-layer')
  const depth = inject(depthKey, 0) + 1
  const ancestors = inject<readonly symbol[]>(ancestryKey, [])
  provide(depthKey, depth)
  provide(ancestryKey, [...ancestors, id])
  let registry: Registry | undefined
  let mounted = false
  let suspended = false

  const resolveOwnerDocument = () =>
    ownerDocument?.() ??
    (instance?.vnode.el as Node | undefined)?.ownerDocument ??
    (typeof document === 'undefined' ? undefined : document)
  const remove = () => registry?.layers.delete(id)
  const sync = () => {
    if (!mounted || suspended) {
      return
    }
    const owner = resolveOwnerDocument()
    const nextRegistry = owner ? registryFor(owner) : undefined
    if (registry !== nextRegistry) {
      remove()
      registry = nextRegistry
    }
    if (!registry) {
      return
    }
    if (!active()) {
      registry.layers.delete(id)
    } else if (!registry.layers.has(id)) {
      registry.layers.set(id, { id, zIndex, depth, ancestors, yieldToDescendants, modal, order: ++registry.sequence })
    }
  }
  watch(active, sync, { flush: 'sync' })
  if (ownerDocument) {
    watch(ownerDocument, sync, { flush: 'post' })
  }
  onMounted(() => {
    mounted = true
    sync()
  })
  onActivated(() => {
    suspended = false
    sync()
  })
  onDeactivated(() => {
    suspended = true
    remove()
  })
  onBeforeUnmount(() => {
    mounted = false
    remove()
  })

  function onStackTop(event?: Event) {
    if (!registry || !active() || suspended || !registry.layers.has(id)) {
      return false
    }
    if (event && registry.events.has(event)) {
      return registry.events.get(event) === id
    }
    const layers = [...registry.layers.values()]
    const top =
      layers
        .filter((layer) => !layer.yieldToDescendants || !layers.some((other) => other.ancestors.includes(layer.id)))
        .sort((a, b) => a.zIndex.value - b.zIndex.value || a.depth - b.depth || a.order - b.order)
        .at(-1)?.id ?? null
    // Snapshot the recipient for the whole dispatch, even if it synchronously unmounts.
    if (event) {
      registry.events.set(event, top)
    }
    return top === id
  }
  function onModalStackTop() {
    if (!registry || !active() || suspended || !registry.layers.has(id)) {
      return false
    }
    const top = [...registry.layers.values()]
      .filter((layer) => layer.modal)
      .sort((a, b) => a.zIndex.value - b.zIndex.value || a.depth - b.depth || a.order - b.order)
      .at(-1)
    return top?.id === id
  }
  return { onStackTop, onModalStackTop, syncOwner: sync }
}
