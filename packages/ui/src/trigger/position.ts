import type { CSSProperties } from 'vue'
import type { ReadingDirection } from '../_utils/direction'
import type { TriggerPlacement } from './contract'
import { getPlacementOffset } from './geometry'
import type { TriggerPopupTranslate, TriggerStrategy } from './types'

interface RelativeRect {
  width: number
  height: number
  scrollTop: number
  scrollLeft: number
}

interface PositionOffset {
  left: number
  top: number
}

type BasePlacement = 'top' | 'bottom' | 'left' | 'right'

function getViewport(view: Window | null | undefined) {
  const viewport = view?.visualViewport
  return {
    width: viewport?.width ?? view?.innerWidth ?? 0,
    height: viewport?.height ?? view?.innerHeight ?? 0,
    left: viewport?.offsetLeft ?? 0,
    top: viewport?.offsetTop ?? 0,
  }
}

function basePlacement(placement: TriggerPlacement): BasePlacement {
  return placement.split('-')[0] as BasePlacement
}

function oppositePlacement(placement: TriggerPlacement): TriggerPlacement {
  const [side, align] = placement.split('-')
  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[side]!
  return `${opposite}${align ? `-${align}` : ''}` as TriggerPlacement
}

function resolveTranslate(placement: TriggerPlacement, translate?: TriggerPopupTranslate) {
  if (!translate) {
    return [0, 0] as const
  }
  if (Array.isArray(translate)) {
    return translate as readonly [number, number]
  }
  return (translate as Partial<Record<TriggerPlacement, readonly [number, number]>>)[placement] ?? [0, 0]
}

function popupOffset(
  placement: TriggerPlacement,
  reference: RelativeRect,
  popup: RelativeRect,
  distance: number,
  translate?: TriggerPopupTranslate,
  direction?: ReadingDirection,
) {
  return getPlacementOffset(placement, reference, popup, distance, resolveTranslate(placement, translate), direction)
}

function fitPosition(
  placement: TriggerPlacement,
  initial: PositionOffset,
  reference: RelativeRect,
  popup: RelativeRect,
  context: PositionContext,
) {
  const viewport = getViewport(context.view)
  const width = viewport.width / context.scaleX
  const height = viewport.height / context.scaleY
  const originLeft = context.origin.left - viewport.left / context.scaleX
  const originTop = context.origin.top - viewport.top / context.scaleY
  let position = placement
  let offset = initial

  const boundaries = (value: PositionOffset) => ({
    top: originTop + value.top,
    bottom: height - (originTop + value.top + popup.height),
    left: originLeft + value.left,
    right: width - (originLeft + value.left + popup.width),
  })
  const current = boundaries(offset)
  const side = basePlacement(placement)
  const overflowsMain = current[side] < 0

  if (overflowsMain) {
    const opposite = oppositePlacement(placement)
    const candidate = popupOffset(opposite, reference, popup, context.distance, context.translate, context.direction)
    const candidateBoundary = boundaries(candidate)
    const candidateSide = basePlacement(opposite)
    const candidateFits = candidateBoundary[candidateSide] >= 0
    if (candidateFits) {
      position = opposite
      offset = candidate
    }
  }

  const finalBoundary = boundaries(offset)
  const finalSide = basePlacement(position)
  if (finalSide === 'top' || finalSide === 'bottom') {
    if (finalBoundary.left < 0) {
      offset.left -= finalBoundary.left
    } else if (finalBoundary.right < 0) {
      offset.left += finalBoundary.right
    }
  } else {
    if (finalBoundary.top < 0) {
      offset.top -= finalBoundary.top
    } else if (finalBoundary.bottom < 0) {
      offset.top += finalBoundary.bottom
    }
  }
  // When neither side fits, keep the main axis inside the visual viewport too.
  // Oversized popups are pinned to its start; their content owns scrolling.
  if (finalSide === 'top' || finalSide === 'bottom') {
    offset.top = Math.max(-originTop, Math.min(offset.top, height - popup.height - originTop))
  } else {
    offset.left = Math.max(-originLeft, Math.min(offset.left, width - popup.width - originLeft))
  }
  return { offset, placement: position }
}

export interface PositionContext {
  direction?: ReadingDirection
  origin: { left: number; top: number }
  scaleX: number
  scaleY: number
  distance: number
  translate?: TriggerPopupTranslate
  autoFitPosition: boolean
  strategy: TriggerStrategy
  customStyle?: CSSProperties
  view?: Window | null
}

export function calculatePopupPosition(
  placement: TriggerPlacement,
  reference: RelativeRect,
  popup: RelativeRect,
  context: PositionContext,
) {
  const initial = popupOffset(placement, reference, popup, context.distance, context.translate, context.direction)
  const result = context.autoFitPosition
    ? fitPosition(placement, initial, reference, popup, context)
    : { offset: initial, placement }
  return {
    placement: result.placement,
    style: {
      ...context.customStyle,
      position: context.strategy,
      left: `${result.offset.left}px`,
      top: `${result.offset.top}px`,
    } as CSSProperties,
  }
}

export function getScrollElements(element: HTMLElement | SVGElement | undefined) {
  const result: HTMLElement[] = []
  let root: Element | undefined = element
  const visited = new Set<Document>()
  while (root && !visited.has(root.ownerDocument)) {
    visited.add(root.ownerDocument)
    const parent = (node: Element): Element | null => {
      if (node.assignedSlot) {
        return node.assignedSlot
      }
      if (node.parentElement) {
        return node.parentElement
      }
      const tree = node.getRootNode()
      return tree.nodeType === 11 && 'host' in tree ? (tree as ShadowRoot).host : null
    }
    let current = parent(root)
    const ancestors = new Set<Element>()
    while (current && current !== current.ownerDocument.documentElement) {
      if (ancestors.has(current)) {
        break
      }
      ancestors.add(current)
      const style = current.ownerDocument.defaultView?.getComputedStyle(current)
      const overflow = `${style?.overflow ?? ''}${style?.overflowX ?? ''}${style?.overflowY ?? ''}`
      if (/(auto|scroll|overlay)/.test(overflow)) {
        result.push(current as HTMLElement)
      }
      current = parent(current)
    }
    try {
      root = root.ownerDocument.defaultView?.frameElement ?? undefined
    } catch {
      root = undefined
    }
  }
  return result
}

export function getSlotChangeRoots(element: Element | undefined) {
  const roots: ShadowRoot[] = []
  const visited = new Set<Element>()
  let current: Element | null | undefined = element
  while (current && !visited.has(current)) {
    visited.add(current)
    const parentShadow = current.parentElement?.shadowRoot
    if (parentShadow) {
      roots.push(parentShadow)
    }
    if (current.assignedSlot) {
      current = current.assignedSlot
    } else if (current.parentElement) {
      current = current.parentElement
    } else {
      const tree = current.getRootNode()
      if (tree.nodeType === 11 && 'host' in tree) {
        roots.push(tree as ShadowRoot)
        current = (tree as ShadowRoot).host
      } else {
        try {
          current = current.ownerDocument.defaultView?.frameElement
        } catch {
          current = undefined
        }
      }
    }
  }
  return roots
}

export function getScrollViews(element: Element | undefined) {
  const result: Window[] = []
  let document = element?.ownerDocument
  const visited = new Set<Document>()
  while (document && !visited.has(document)) {
    visited.add(document)
    const view = document.defaultView
    if (view) {
      result.push(view)
    }
    try {
      document = view?.frameElement?.ownerDocument
    } catch {
      break
    }
  }
  return result
}
