import {
  cloneVNode,
  defineComponent,
  Fragment,
  getCurrentInstance,
  inject,
  InjectionKey,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  Ref,
  VNode,
  watch,
} from 'vue'
import { createNamespace } from '../../utils/components'

export const measurementVersionKey: InjectionKey<Ref<number>> = Symbol('virtual-list-measurement-version')

export const fragmentRowsKey: InjectionKey<Map<string | number, Set<Element>>> = Symbol('virtual-list-fragment-rows')

type FragmentChangeListener = (structureChanged: boolean, styledRoots: ReadonlySet<Node>, themeChanged: boolean) => void

// Share one observer per container and route changes to the affected row roots.
const fragmentParents = new WeakMap<Node, { observer: MutationObserver; listeners: Set<FragmentChangeListener> }>()

function observeFragmentParent(parent: Node, listener: FragmentChangeListener) {
  let entry = fragmentParents.get(parent)
  if (!entry) {
    const Observer = parent.ownerDocument?.defaultView?.MutationObserver
    if (!Observer) {
      return
    }
    const listeners = new Set<FragmentChangeListener>()
    const ancestors = new Set<Node>()
    let waitingForConnection = false
    const observer = new Observer((records) => {
      let structureChanged = false
      let pathChanged = waitingForConnection && parent.isConnected
      let themeChanged = false
      const styledRoots = new Set<Node>()
      for (const record of records) {
        if (record.type === 'childList') {
          if (record.target === parent) {
            structureChanged = true
          } else if (
            ancestors.has(record.target) &&
            Array.from(record.removedNodes).some((node) => ancestors.has(node))
          ) {
            pathChanged = true
          }
        } else if (record.target.parentNode === parent) {
          styledRoots.add(record.target)
        } else if (record.attributeName === 'class' && ancestors.has(record.target)) {
          themeChanged = true
        }
      }
      if (pathChanged) {
        observePath()
      }
      if (structureChanged || styledRoots.size || themeChanged || pathChanged) {
        for (const notify of listeners) {
          notify(structureChanged, styledRoots, themeChanged || pathChanged)
        }
      }
    })
    function observePath() {
      if (ancestors.size) {
        observer.disconnect()
      }
      ancestors.clear()
      let node: Node | null = parent
      while (node) {
        ancestors.add(node)
        observer.observe(
          node,
          node === parent
            ? { childList: true, subtree: true, attributeFilter: ['class', 'style'] }
            : { childList: true, attributeFilter: ['class'] },
        )
        node = node.parentNode ?? (node.nodeType === 11 ? ((node as ShadowRoot).host ?? null) : null)
      }
      // Inserting a previously detached tree does not mutate any of its own ancestors.
      waitingForConnection = !parent.isConnected
      if (waitingForConnection && parent.ownerDocument) {
        observer.observe(parent.ownerDocument, { childList: true, subtree: true })
      }
    }
    observePath()
    entry = { observer, listeners }
    fragmentParents.set(parent, entry)
  }
  const { observer, listeners } = entry
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (!listeners.size) {
      observer.disconnect()
      fragmentParents.delete(parent)
    }
  }
}

const { name } = createNamespace('virtual-list-item')

export default defineComponent({
  name,
  props: {
    index: Number,
    canMeasureZero: Function,
    hasItemSize: {
      type: Function,
      required: true,
    },
    setItemSize: {
      type: Function,
      required: true,
    },
  },
  setup(props, { slots }) {
    const item = getCurrentInstance()!
    const key = item.vnode.key as string | number
    const elements = new Map<number, HTMLElement>()
    const componentRefs = new Map<number, { $el: unknown }>()
    const refCallbacks = new Map<number, (value: object | null) => void>()
    let observer: ResizeObserver | undefined

    const bindElement = (index: number, value: unknown) => {
      const element =
        value && typeof value === 'object' && 'nodeType' in value && value.nodeType === 1
          ? (value as HTMLElement)
          : undefined
      if (element) {
        elements.set(index, element)
      } else {
        elements.delete(index)
      }
    }

    const refFor = (index: number) => {
      if (!refCallbacks.has(index)) {
        refCallbacks.set(index, (value) => {
          if (value && '$el' in value) {
            componentRefs.set(index, value)
            bindElement(index, value.$el)
          } else {
            componentRefs.delete(index)
            bindElement(index, value)
          }
        })
      }
      return refCallbacks.get(index)!
    }

    const fragmentRows = inject(fragmentRowsKey, undefined)
    let observed = new Set<Element>()
    let fragmentParent: Node | null = null
    let stopObservingParent: (() => void) | undefined
    let previousContent: Node[] | undefined

    const readFragmentContent = (): Node[] | undefined => {
      const { el, anchor } = item.subTree
      if (!el?.parentNode || !anchor || el.parentNode !== anchor.parentNode) {
        return
      }
      const content: Node[] = []
      let node = el.nextSibling
      for (; node && node !== anchor; node = node.nextSibling) {
        if (node.nodeType === 1 || (node.nodeType === 3 && node.nodeValue)) {
          content.push(node)
        }
      }
      if (node === anchor) {
        return content
      }
    }

    const onFragmentChange: FragmentChangeListener = (structureChanged, styledRoots, themeChanged) => {
      if (
        previousContent &&
        previousContent.length > 1 &&
        (themeChanged || previousContent.some((node) => styledRoots.has(node)))
      ) {
        measureAndObserve()
        return
      }
      if (!structureChanged) {
        return
      }
      const content = readFragmentContent()
      if (
        fragmentParent !== item.subTree.el?.parentNode ||
        content?.length !== previousContent?.length ||
        content?.some((node, index) => node !== previousContent?.[index])
      ) {
        measureAndObserve()
      }
    }

    const measureAndObserve = () => {
      // Descendants can change their roots without rendering the virtual item again.
      let hasFragmentRoot = false
      componentRefs.forEach((instance, index) => {
        bindElement(index, instance.$el)
        if (!elements.has(index)) {
          hasFragmentRoot = true
        }
      })
      const roots = new Set<Element>(elements.values())
      const multipleRoots = hasFragmentRoot || roots.size > 1
      let content = multipleRoots || !roots.size ? readFragmentContent() : undefined
      for (const node of content ?? []) {
        if (node.nodeType === 1) {
          roots.add(node as Element)
        }
      }
      if (hasFragmentRoot) {
        fragmentRows?.set(key, roots)
      } else {
        fragmentRows?.delete(key)
      }
      if (!observer) {
        const Observer = roots.values().next().value?.ownerDocument.defaultView?.ResizeObserver
        if (Observer) {
          observer = new Observer(measureAndObserve)
        }
      }
      if (observer) {
        for (const element of observed) {
          if (!roots.has(element)) {
            observer.unobserve(element)
          }
        }
        for (const element of roots) {
          if (!observed.has(element)) {
            observer.observe(element)
          }
        }
        observed = roots
      }
      const rects = Array.from(roots, (element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ element, rect }) => rect.width !== 0 || rect.height !== 0 || element.getClientRects().length > 0)
        .map(({ rect }) => rect)
      const height = rects.length
        ? Math.max(...rects.map((rect) => rect.bottom)) - Math.min(...rects.map((rect) => rect.top))
        : 0
      // A single fallback can be replaced without a size notification when
      // its height is zero or the browser has no ResizeObserver.
      const watchReplacement = componentRefs.size > 0 && (!observer || height === 0)
      if (watchReplacement && !content) {
        content = readFragmentContent()
      }
      const parent = content && (multipleRoots || watchReplacement) ? (item.subTree.el?.parentNode ?? null) : null
      if (parent !== fragmentParent) {
        stopObservingParent?.()
        fragmentParent = parent
        stopObservingParent = parent ? observeFragmentParent(parent, onFragmentChange) : undefined
      }
      previousContent = content
      if (height) {
        props.setItemSize(key, height)
      } else if ((roots.size > 0 || (content?.length === 0 && props.hasItemSize(key))) && props.canMeasureZero?.()) {
        props.setItemSize(key, 0, true)
      }
    }

    const measurementVersion = inject(measurementVersionKey, undefined)
    if (measurementVersion) {
      watch(measurementVersion, measureAndObserve, { flush: 'post' })
    }
    onMounted(measureAndObserve)
    onUpdated(measureAndObserve)
    onBeforeUnmount(() => {
      measureAndObserve()
      fragmentRows?.delete(key)
      stopObservingParent?.()
      observer?.disconnect()
    })

    return () => {
      let index = 0
      const preserve = (nodes: VNode[]): VNode[] =>
        nodes.map((node) => {
          if (Array.isArray(node)) {
            return preserve(node) as unknown as VNode
          }
          if (!node || typeof node !== 'object') {
            return node
          }
          if (node.type === Fragment && Array.isArray(node.children)) {
            const fragment = cloneVNode(node)
            fragment.children = preserve(node.children as VNode[])
            ;(fragment as VNode & { dynamicChildren: VNode[] | null }).dynamicChildren = null
            return fragment
          }
          if (typeof node.type === 'string' || typeof node.type === 'object' || typeof node.type === 'function') {
            const position = index++
            const bind = refFor(position)
            const attrs = { ref: bind, 'data-virtual-list-index': props.index }
            if (typeof node.type === 'string') {
              return cloneVNode(node, attrs, true)
            }
            return cloneVNode(
              node,
              {
                ...attrs,
                onVnodeUpdated(current: VNode) {
                  const root = current.el?.nodeType === 1 ? current.el : undefined
                  if (root && root === elements.get(position)) {
                    return
                  }
                  bindElement(position, root)
                  measureAndObserve()
                },
              },
              true,
            )
          }
          return node
        })
      return preserve(slots.default?.() ?? [])
    }
  },
})
