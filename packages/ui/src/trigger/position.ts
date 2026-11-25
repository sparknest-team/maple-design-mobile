import type { CSSProperties } from 'vue'
import type { ReadingDirection } from '../_utils/direction'
import { oppositeSide, type PlacementSide, type TriggerPlacement } from './contract'
import { containingFrame, getPlacementOffset, layoutParent, parentShadowRoot } from './geometry'
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
  const offsetFor = (value: TriggerPlacement) => {
    const translate = context.translate
    const adjustment = Array.isArray(translate)
      ? translate
      : (translate as Partial<Record<TriggerPlacement, readonly [number, number]>> | undefined)?.[value]
    return getPlacementOffset(value, reference, popup, context.distance, adjustment, context.direction)
  }
  let offset = offsetFor(placement)
  if (context.autoFitPosition) {
    const viewport = getViewport(context.view)
    const width = viewport.width / context.scaleX
    const height = viewport.height / context.scaleY
    const originLeft = context.origin.left - viewport.left / context.scaleX
    const originTop = context.origin.top - viewport.top / context.scaleY
    function available(side: PlacementSide, point: PositionOffset) {
      const left = originLeft + point.left
      const top = originTop + point.top
      switch (side) {
        case 'top':
          return top
        case 'bottom':
          return height - (top + popup.height)
        case 'left':
          return left
        case 'right':
          return width - (left + popup.width)
      }
    }
    const side = placement.split('-')[0] as PlacementSide
    if (available(side, offset) < 0) {
      const opposite = oppositeSide[side]
      const candidate = (opposite + placement.slice(side.length)) as TriggerPlacement
      const flipped = offsetFor(candidate)
      if (available(opposite, flipped) >= 0) {
        placement = candidate
        offset = flipped
      }
    }
    // Pin oversized axes to the visible start so the beginning of the content stays reachable.
    offset.left = Math.max(-originLeft, Math.min(offset.left, width - popup.width - originLeft))
    if (!context.keepVerticalAnchor || side === 'left' || side === 'right') {
      offset.top = Math.max(-originTop, Math.min(offset.top, height - popup.height - originTop))
    }
  }
  return {
    placement,
    style: {
      ...context.customStyle,
      position: context.strategy,
      left: `${offset.left}px`,
      top: `${offset.top}px`,
    } as CSSProperties,
  }
}

export function positionParent(element: Element): Element | null {
  return layoutParent(element) ?? containingFrame(element.ownerDocument)
}

/** Walk the shared layout ancestry once, including slot hosts and containing frames. */
export function positionAncestors(elements: Array<Element | undefined>, includeScroll: boolean) {
  const targets = new Set<HTMLElement | Window>()
  const roots = new Set<ShadowRoot>()
  const documents = new Set<Document>()
  const visited = new Set<Element>()
  for (const element of elements) {
    let current: Element | null | undefined = element
    while (current && !visited.has(current)) {
      visited.add(current)
      const document: Document = current.ownerDocument
      if (document.defaultView) {
        documents.add(document)
      }
      const root = current.parentElement?.shadowRoot ?? parentShadowRoot(current)
      if (root) {
        roots.add(root)
      }
      const parent = positionParent(current)
      if (
        includeScroll &&
        parent?.ownerDocument === document &&
        parent !== document.documentElement &&
        !targets.has(parent as HTMLElement)
      ) {
        const style = document.defaultView?.getComputedStyle(parent)
        if (style && /(auto|scroll|overlay)/.test(style.overflow + style.overflowX + style.overflowY)) {
          targets.add(parent as HTMLElement)
        }
      }
      current = parent
    }
  }
  for (const document of documents) {
    targets.add(document.defaultView!)
  }
  return { targets: [...targets], roots: [...roots], documents }
}
