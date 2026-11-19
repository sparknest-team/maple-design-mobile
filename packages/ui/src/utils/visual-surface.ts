import { inject, onActivated, onBeforeUnmount, onDeactivated, provide, ref, watchPostEffect } from 'vue'

type SyncLayers = (surfaces: Map<symbol, Surface>) => void
export interface Surface {
  node: HTMLElement
  ancestors: readonly symbol[]
  positioned: boolean
  createGroup?: (document: Document) => SyncLayers
  zIndex: number
}
interface Registry {
  surfaces: Map<symbol, Surface>
  sync?: SyncLayers
}
const ancestryKey = Symbol('visual-surface-ancestry')
const documents = new WeakMap<Document, Registry>()

/** Keep visible DOM roots ordered through their leave transitions, independently of Escape dispatch. */
export function useVisualSurface(
  root: () => HTMLElement | undefined | null,
  zIndex: () => number,
  strategy?: 'positioned' | ((document: Document) => SyncLayers),
) {
  const createGroup = typeof strategy === 'function' ? strategy : undefined
  const id = Symbol('visual-surface')
  const ancestors = inject<readonly symbol[]>(ancestryKey, [])
  provide(ancestryKey, [...ancestors, id])
  const enabled = ref(true)
  let previous: Registry | undefined
  function remove() {
    if (!previous) {
      return
    }
    const registry = previous
    previous = undefined
    registry.surfaces.delete(id)
    registry.sync?.(registry.surfaces)
    if (createGroup && ![...registry.surfaces.values()].some((surface) => surface.createGroup)) {
      registry.sync = undefined
    }
  }
  watchPostEffect(() => {
    const node = enabled.value && root()
    if (!node) {
      remove()
      return
    }
    let registry = documents.get(node.ownerDocument)
    if (!registry) {
      registry = { surfaces: new Map() }
      documents.set(node.ownerDocument, registry)
    }
    if (registry !== previous) {
      remove()
    }
    previous = registry
    registry.surfaces.set(id, { node, ancestors, createGroup, positioned: strategy === 'positioned', zIndex: zIndex() })
    if (createGroup) {
      registry.sync ??= createGroup(node.ownerDocument)
    }
    registry.sync?.(registry.surfaces)
  })
  onBeforeUnmount(remove)
  onDeactivated(() => {
    enabled.value = false
    remove()
  })
  onActivated(() => {
    enabled.value = true
  })
}
