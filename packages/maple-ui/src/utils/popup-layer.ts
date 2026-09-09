import {
  getCurrentInstance,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  watch,
  type Ref,
} from 'vue'

interface Layer {
  id: symbol
  zIndex: Readonly<Ref<number>>
  order: number
  depth: number
}
interface Registry {
  layers: Map<symbol, Layer>
  events: WeakMap<Event, symbol | null>
  sequence: number
}
const depthKey = Symbol('popup-layer-depth')
const registries = new WeakMap<Document, Registry>()

function registryFor(document: Document) {
  let registry = registries.get(document)
  if (!registry) {
    registry = { layers: new Map(), events: new WeakMap(), sequence: 0 }
    registries.set(document, registry)
  }
  return registry
}

/** Each library owns its registry. Layers never register during server rendering. */
export function usePopupLayer(active: () => boolean, zIndex: Readonly<Ref<number>>) {
  const instance = getCurrentInstance()
  const id = Symbol('popup-layer')
  const depth = inject(depthKey, 0) + 1
  provide(depthKey, depth)
  let registry: Registry | undefined
  let mounted = false
  let suspended = false

  const sync = () => {
    if (!mounted || suspended || !registry) {
      return
    }
    if (!active()) {
      registry.layers.delete(id)
    } else if (!registry.layers.has(id)) {
      registry.layers.set(id, { id, zIndex, depth, order: ++registry.sequence })
    }
  }
  const remove = () => registry?.layers.delete(id)
  watch(active, sync, { flush: 'sync' })
  onMounted(() => {
    mounted = true
    const owner =
      (instance?.vnode.el as Node | undefined)?.ownerDocument ??
      (typeof document === 'undefined' ? undefined : document)
    if (owner) {
      registry = registryFor(owner)
    }
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
    const top =
      [...registry.layers.values()]
        .sort((a, b) => a.zIndex.value - b.zIndex.value || a.depth - b.depth || a.order - b.order)
        .at(-1)?.id ?? null
    // Snapshot the recipient for the whole dispatch, even if it synchronously unmounts.
    if (event) {
      registry.events.set(event, top)
    }
    return top === id
  }
  return { onStackTop }
}
