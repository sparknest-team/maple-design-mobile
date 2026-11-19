// Document selectors stop at shadow boundaries. Include the Card's own tree
// (even in a closed root) and open roots elsewhere in the same document.
export function* cardLayerTrees(roots: HTMLElement[]) {
  const document = roots[0].ownerDocument
  const trees = new Set<Document | ShadowRoot>([document])
  for (const element of roots) {
    let tree = element.getRootNode() as Document | ShadowRoot
    while ('host' in tree && !trees.has(tree)) {
      trees.add(tree)
      tree = tree.host.getRootNode() as Document | ShadowRoot
    }
  }
  for (const root of trees) {
    yield root
    const walker = document.createTreeWalker(root, 1 /* SHOW_ELEMENT */)
    for (let node = walker.nextNode() as Element | null; node; node = walker.nextNode() as Element | null) {
      if (node.shadowRoot) {
        trees.add(node.shadowRoot)
      }
    }
  }
}

// The panel requests isolation after handing off opening focus, and releases it
// synchronously before restoring the opener. Only a promoted panel can own it.
const expanded = new WeakSet<HTMLElement>()
const refresh = new WeakMap<HTMLElement, () => void>()

export function setCardBackgroundIsolation(panel: HTMLElement | null, active: boolean) {
  if (!panel || expanded.has(panel) === active) {
    return
  }
  if (active) {
    expanded.add(panel)
  } else {
    expanded.delete(panel)
  }
  refresh.get(panel)?.()
}

export function createBackgroundIsolation(document: Document) {
  let panels: HTMLElement[] = []
  let surfaces: HTMLElement[] = []
  const owned = new Set<Element>()
  const native = new Set<HTMLElement>()
  const trees = new Set<Document | ShadowRoot>()
  let observer: MutationObserver | undefined

  function onToggle(event: Event) {
    const target = event.target as HTMLElement
    if (!target.matches('[popover],dialog') || target.hasAttribute('data-card-top-layer')) {
      return
    }
    if (event.type === 'beforetoggle' && (event as ToggleEvent).newState === 'open') {
      native.add(target)
      reconcile()
      // A later listener may veto the opening, in which case no toggle fires.
      queueMicrotask(() => {
        if (!target.matches(':popover-open,:modal') && native.delete(target)) {
          reconcile()
        }
      })
    } else if (!target.matches(':popover-open,:modal') && native.delete(target)) {
      reconcile()
    }
  }

  function preserveAuthorInert(records: MutationRecord[]) {
    for (const record of records) {
      if (record.type === 'attributes') {
        owned.delete(record.target as Element)
      }
    }
  }

  function reconcile() {
    preserveAuthorInert(observer?.takeRecords() ?? [])
    observer?.disconnect()
    const roots = surfaces.length && expanded.has(surfaces[0]) ? surfaces : []
    const keep = new Set<Node>()
    const parents = new Set<ParentNode>()
    const activeTrees = new Set<Document | ShadowRoot>()
    const hidden = new Set<Element>()
    if (roots.length) {
      for (const tree of cardLayerTrees(roots)) {
        activeTrees.add(tree)
        for (const layer of Array.from(tree.querySelectorAll<HTMLElement>(':modal,:popover-open'))) {
          if (!layer.hasAttribute('data-card-top-layer')) {
            native.add(layer)
          }
        }
      }
      for (const panel of native) {
        if (panel.ownerDocument !== document || !panel.isConnected) {
          native.delete(panel)
        }
      }
      const visible = new Set([...roots, ...native])
      const shadowHosts = new Set<Element>()
      for (const panel of visible) {
        const path: Node[] = []
        for (
          let node: Node | null = panel;
          node;
          node = (node as Element).assignedSlot ?? node.parentNode ?? (node as ShadowRoot).host
        ) {
          path.push(node)
        }
        // An outer surface already keeps the entire nested surface interactive.
        if (path.slice(1).some((node) => visible.has(node as HTMLElement))) {
          continue
        }
        for (const node of path) {
          keep.add(node)
          if (node !== panel) {
            parents.add(node as ParentNode)
          }
          if ('host' in node) {
            shadowHosts.add((node as ShadowRoot).host)
          }
        }
      }
      observer ??= new document.defaultView!.MutationObserver((records) => {
        preserveAuthorInert(records)
        reconcile()
      })
      for (const parent of parents) {
        // The shadow root and its slots describe the host's rendered children.
        if (shadowHosts.has(parent as Element)) {
          continue
        }
        observer.observe(parent, { childList: true })
        const assigned = (parent as Element).localName === 'slot' ? (parent as HTMLSlotElement).assignedElements() : []
        const children = assigned.length ? assigned : parent.children
        for (const child of Array.from(children)) {
          if (!keep.has(child) && !child.matches('head,script,style,link')) {
            hidden.add(child)
          }
        }
      }
    } else {
      native.clear()
    }
    for (const tree of trees) {
      if (activeTrees.has(tree)) {
        continue
      }
      tree.removeEventListener('beforetoggle', onToggle, true)
      tree.removeEventListener('toggle', onToggle, true)
      tree.removeEventListener('slotchange', reconcile, true)
      trees.delete(tree)
    }
    for (const tree of activeTrees) {
      if (trees.has(tree)) {
        continue
      }
      tree.addEventListener('beforetoggle', onToggle, true)
      tree.addEventListener('toggle', onToggle, true)
      tree.addEventListener('slotchange', reconcile, true)
      trees.add(tree)
    }
    // Promotion may resume after the opening animation when a native layer closes.
    // Move focus off a branch we are about to disable, even on this delayed path.
    const moveFocus =
      !native.size &&
      [...hidden].some(
        (el) => !el.hasAttribute('inert') && el.contains((el.getRootNode() as Document | ShadowRoot).activeElement),
      )
    for (const el of owned) {
      if (!hidden.has(el)) {
        el.removeAttribute('inert')
        owned.delete(el)
      }
    }
    for (const el of hidden) {
      if (!el.hasAttribute('inert')) {
        el.setAttribute('inert', '')
        owned.add(el)
      }
      observer?.observe(el, { attributes: true, attributeFilter: ['inert'] })
    }
    if (moveFocus) {
      roots[0]?.focus({ preventScroll: true })
    }
  }

  return (cards: HTMLElement[], visible: HTMLElement[]) => {
    for (const panel of panels) {
      if (refresh.get(panel) === reconcile) {
        refresh.delete(panel)
      }
    }
    panels = cards
    surfaces = visible
    for (const panel of cards) {
      refresh.set(panel, reconcile)
    }
    reconcile()
  }
}
