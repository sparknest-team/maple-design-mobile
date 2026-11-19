import type { Surface } from '../utils/visual-surface'
import { cardLayerTrees, createBackgroundIsolation } from './background-isolation'
import { cycleCardTab } from './tab-scope'

function orderedRoots(entries: Map<symbol, Surface>, document: Document) {
  const surfaces = [...entries.entries()].filter(([, surface]) => surface.node.ownerDocument === document)
  // Among eligible siblings respect z-index and insertion order. A teleported
  // descendant still belongs above the surface that owns it.
  surfaces.sort((a, b) => a[1].zIndex - b[1].zIndex)
  const roots: Surface[] = []
  let aboveCard = false
  while (surfaces.length) {
    const index = surfaces.findIndex(([, entry]) => !surfaces.some(([id]) => entry.ancestors.includes(id)))
    const [, surface] = surfaces.splice(index, 1)[0]
    aboveCard ||= !!surface.createGroup
    // A nested Card must escape its own transformed ancestors. Other roots
    // inherit the last promoted surface only when they are actually inside it.
    if (aboveCard && surface.node.isConnected && (surface.createGroup || !roots.at(-1)?.node.contains(surface.node))) {
      roots.push(surface)
    }
  }
  return roots
}

function blockingLayer(roots: HTMLElement[], owned: HTMLElement[]) {
  for (const tree of cardLayerTrees(roots)) {
    for (const node of Array.from(tree.querySelectorAll<HTMLElement>(':modal,:popover-open'))) {
      if (!owned.includes(node)) {
        return node
      }
    }
  }
}

/** Promote in place so form ownership, Vue ancestry and the focused DOM node survive. */
export function createCardLayerGroup(document: Document) {
  const isolate = createBackgroundIsolation(document)
  const promoted: HTMLElement[] = []
  let focusRoots: HTMLElement[] = []
  function onTab(event: KeyboardEvent) {
    if (
      event.key !== 'Tab' ||
      event.defaultPrevented ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.isComposing
    ) {
      return
    }
    const visible = focusRoots.filter((root) => promoted.includes(root))
    if (visible.length && !blockingLayer(visible, promoted)) {
      cycleCardTab(event, visible)
    }
  }
  let rejected: HTMLElement[] = []
  let moves: MutationObserver | undefined
  let stopWaiting: (() => void) | undefined
  function release(start: number) {
    for (const node of promoted.splice(start).reverse()) {
      if (node.popover === 'manual') {
        node.removeAttribute('popover')
      }
      node.removeAttribute('data-card-top-layer')
    }
  }
  return function sync(entries: Map<symbol, Surface>) {
    document.removeEventListener('keydown', onTab)
    moves?.disconnect()
    moves = undefined
    const ordered = orderedRoots(entries, document)
    const roots = ordered.map((surface) => surface.node)
    stopWaiting?.()
    stopWaiting = undefined
    const view = document.defaultView
    if (!view?.CSS?.supports('selector(:popover-open)') || !view.CSS.supports('selector(:modal)')) {
      isolate([], [])
      release(0)
      return
    }
    if (rejected.length && rejected.length === roots.length && rejected.every((node, index) => node === roots[index])) {
      return
    }
    rejected = []
    if (
      roots.some(
        (node) => typeof node.showPopover !== 'function' || (node.hasAttribute('popover') && !promoted.includes(node)),
      )
    ) {
      isolate([], [])
      release(0)
      return
    }
    // Moving a connected popover with appendChild removes it from the native
    // top layer without changing its Vue ref. Observe only the live branches.
    if (roots.length) {
      const branch = new Set<Node>()
      moves = new view.MutationObserver((changes) => {
        if (changes.some((change) => Array.from(change.removedNodes).some((node) => branch.has(node)))) {
          sync(entries)
        }
      })
      for (const root of roots) {
        let node: Node | null = root
        while (node && !branch.has(node)) {
          branch.add(node)
          node = node.parentNode ?? (node as ShadowRoot).host ?? null
          if (node) {
            moves.observe(node, { childList: true })
          }
        }
      }
    }
    let prefix = 0
    while (
      prefix < promoted.length &&
      promoted[prefix] === roots[prefix] &&
      promoted[prefix].matches(':popover-open')
    ) {
      prefix++
    }
    release(prefix)
    const lastCard = ordered.map((surface) => !!surface.createGroup).lastIndexOf(true)
    focusRoots = roots.slice(lastCard)
    if (roots.length) {
      document.addEventListener('keydown', onTab)
    }
    const updateIsolation = () =>
      isolate(
        ordered.filter((surface) => surface.createGroup).map((surface) => surface.node),
        focusRoots.filter((root) => promoted.includes(root)),
      )
    if (prefix === roots.length) {
      updateIsolation()
      return
    }
    const blocker = blockingLayer(roots, promoted)
    if (blocker) {
      updateIsolation()
      const resume = () => {
        if (!blocker.isConnected || blocker.ownerDocument !== document || !blocker.matches(':modal,:popover-open')) {
          sync(entries)
        }
      }
      const observer = new view.MutationObserver(resume)
      let tree = blocker.getRootNode() as Document | ShadowRoot
      for (;;) {
        observer.observe(tree, { subtree: true, childList: true })
        if (!('host' in tree)) {
          break
        }
        tree = tree.host.getRootNode() as Document | ShadowRoot
      }
      blocker.addEventListener('close', resume)
      blocker.addEventListener('toggle', resume)
      stopWaiting = () => {
        observer.disconnect()
        blocker.removeEventListener('close', resume)
        blocker.removeEventListener('toggle', resume)
      }
      return
    }
    for (const node of roots.slice(prefix)) {
      node.setAttribute('data-card-top-layer', ordered[promoted.length].positioned ? 'positioned' : '')
      promoted.push(node)
      node.popover = 'manual'
      try {
        node.showPopover()
        if (node.matches(':popover-open')) {
          continue
        }
      } catch (error) {
        if ((error as DOMException).name !== 'InvalidStateError') {
          isolate([], [])
          release(0)
          throw error
        }
      }
      isolate([], [])
      release(0)
      rejected = roots
      return
    }
    updateIsolation()
  }
}
