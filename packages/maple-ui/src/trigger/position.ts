import type { CSSProperties } from 'vue'
import type { TriggerPlacement } from './contract'
import { getPlacementOffset } from './geometry'
import type { TriggerPopupTranslate, TriggerStrategy } from './types'

interface ElementRect {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

interface RelativeRect extends ElementRect {
  scrollTop: number
  scrollBottom: number
  scrollLeft: number
  scrollRight: number
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
) {
  return getPlacementOffset(placement, reference, popup, distance, resolveTranslate(placement, translate))
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
  const overflowsMain =
    (side === 'top' && current.top < 0) ||
    (side === 'bottom' && current.bottom < 0) ||
    (side === 'left' && current.left < 0) ||
    (side === 'right' && current.right < 0)

  if (overflowsMain) {
    const opposite = oppositePlacement(placement)
    const candidate = popupOffset(opposite, reference, popup, context.distance, context.translate)
    const candidateBoundary = boundaries(candidate)
    const candidateSide = basePlacement(opposite)
    const candidateFits =
      (candidateSide === 'top' && candidateBoundary.top >= 0) ||
      (candidateSide === 'bottom' && candidateBoundary.bottom >= 0) ||
      (candidateSide === 'left' && candidateBoundary.left >= 0) ||
      (candidateSide === 'right' && candidateBoundary.right >= 0)
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
  return { offset, placement: position }
}

export interface PositionContext {
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
  const initial = popupOffset(placement, reference, popup, context.distance, context.translate)
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
  let current = element?.parentElement ?? undefined
  while (current && current !== current.ownerDocument.documentElement) {
    const style = current.ownerDocument.defaultView?.getComputedStyle(current)
    const overflow = `${style?.overflow ?? ''}${style?.overflowX ?? ''}${style?.overflowY ?? ''}`
    if (/(auto|scroll|overlay)/.test(overflow)) {
      result.push(current)
    }
    current = current.parentElement ?? undefined
  }
  return result
}
