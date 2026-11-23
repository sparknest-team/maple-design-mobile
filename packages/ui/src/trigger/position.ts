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
    // Convert page coordinates to the client coordinates used by DOMRect.
    // During keyboard panning WKWebView can include window scroll in offsetTop.
    left: view && viewport?.pageLeft != null ? viewport.pageLeft - view.scrollX : (viewport?.offsetLeft ?? 0),
    top: view && viewport?.pageTop != null ? viewport.pageTop - view.scrollY : (viewport?.offsetTop ?? 0),
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
    if (!context.keepVerticalAnchor) {
      offset.top = Math.max(-originTop, Math.min(offset.top, height - popup.height - originTop))
    }
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
  keepVerticalAnchor?: boolean
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

function containingFrame(document: Document) {
  try {
    return document.defaultView?.frameElement ?? null
  } catch {
    return null
  }
}

function parentShadowRoot(element: Element) {
  const parent = element.parentNode
  return parent?.nodeType === 11 && 'host' in parent ? (parent as ShadowRoot) : undefined
}

export function positionParent(element: Element): Element | null {
  return (
    element.assignedSlot ??
    element.parentElement ??
    parentShadowRoot(element)?.host ??
    containingFrame(element.ownerDocument)
  )
}

export function getScrollElements(element: HTMLElement | SVGElement | undefined) {
  const result: HTMLElement[] = []
  const visited = new Set<Element>()
  let current: Element | null | undefined = element
  while (current && !visited.has(current)) {
    visited.add(current)
    const parent = positionParent(current)
    // The document scrolls through its window. On crossing a frame, begin
    // with the frame's parent as with the original reference.
    if (parent && parent.ownerDocument === current.ownerDocument && parent !== parent.ownerDocument.documentElement) {
      const style = parent.ownerDocument.defaultView?.getComputedStyle(parent)
      const overflow = `${style?.overflow ?? ''}${style?.overflowX ?? ''}${style?.overflowY ?? ''}`
      if (/(auto|scroll|overlay)/.test(overflow)) {
        result.push(parent as HTMLElement)
      }
    }
    current = parent
  }
  return result
}

export function getSlotChangeRoots(element: Element | undefined) {
  const roots: ShadowRoot[] = []
  const visited = new Set<Element>()
  let current: Element | null | undefined = element
  while (current && !visited.has(current)) {
    visited.add(current)
    const root = current.parentElement?.shadowRoot ?? parentShadowRoot(current)
    if (root) {
      roots.push(root)
    }
    current = positionParent(current)
  }
  return roots
}

export function getScrollViews(element: Element | undefined) {
  const result: Window[] = []
  let document = element?.ownerDocument
  const visited = new Set<Document>()
  while (document && !visited.has(document)) {
    visited.add(document)
    if (document.defaultView) {
      result.push(document.defaultView)
    }
    document = containingFrame(document)?.ownerDocument
  }
  return result
}
