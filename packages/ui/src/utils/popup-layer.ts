import { getCurrentInstance, inject, provide, shallowReactive, watch, type Ref } from 'vue'
import { onActiveLifecycle } from './active-target'

interface Layer {
  id: symbol
  zIndex: Readonly<Ref<number>>
  ancestors: readonly symbol[]
  yieldToDescendants: boolean
  modal: boolean
}
interface Registry {
  layers: Set<Layer>
  events: WeakMap<Event, symbol | null>
}
const ancestryKey = Symbol('popup-layer-ancestry')
const registries = new WeakMap<Document, Registry>()

function registryFor(document: Document) {
  let registry = registries.get(document)
  if (!registry) {
    registry = { layers: shallowReactive(new Set<Layer>()), events: new WeakMap() }
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
  for (const layer of registryFor(ownerDocument).layers) {
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
  const ancestors = inject<readonly symbol[]>(ancestryKey, [])
  const layer: Layer = { id, zIndex, ancestors, yieldToDescendants, modal }
  provide(ancestryKey, [...ancestors, id])
  let registry: Registry | undefined
  let enabled = false

  const resolveOwnerDocument = () =>
    ownerDocument?.() ??
    (instance?.vnode.el as Node | undefined)?.ownerDocument ??
    (typeof document === 'undefined' ? undefined : document)
  const remove = () => registry?.layers.delete(layer)
  const sync = () => {
    if (!enabled) {
      return
    }
    const owner = resolveOwnerDocument()
    const nextRegistry = owner ? registryFor(owner) : undefined
    if (registry !== nextRegistry) {
      remove()
      registry = nextRegistry
    }
    if (active()) {
      registry?.layers.add(layer)
    } else {
      remove()
    }
  }
  watch(active, sync, { flush: 'sync' })
  if (ownerDocument) {
    watch(ownerDocument, sync, { flush: 'post' })
  }
  function enable() {
    enabled = true
    sync()
  }
  function disable() {
    enabled = false
    remove()
  }
  onActiveLifecycle(enable, disable)

  function isTop(modalsOnly: boolean, event?: Event) {
    if (!registry?.layers.has(layer) || !active()) {
      return false
    }
    if (event && registry.events.has(event)) {
      return registry.events.get(event) === id
    }
    const ancestorsWithChildren = new Set<symbol>()
    if (!modalsOnly) {
      for (const candidate of registry.layers) {
        for (const ancestor of candidate.ancestors) {
          ancestorsWithChildren.add(ancestor)
        }
      }
    }
    // Set iteration follows registration order, so the newest equal-ranked layer wins.
    let highest: Layer | undefined
    for (const candidate of registry.layers) {
      if (modalsOnly ? !candidate.modal : candidate.yieldToDescendants && ancestorsWithChildren.has(candidate.id)) {
        continue
      }
      if (
        !highest ||
        (candidate.zIndex.value - highest.zIndex.value || candidate.ancestors.length - highest.ancestors.length) >= 0
      ) {
        highest = candidate
      }
    }
    const top = highest?.id ?? null
    // Snapshot the recipient for the whole dispatch, even if it synchronously unmounts.
    if (event) {
      registry.events.set(event, top)
    }
    return top === id
  }
  return {
    onStackTop: (event?: Event) => isTop(false, event),
    onModalStackTop: () => isTop(true),
    syncOwner: sync,
  }
}
