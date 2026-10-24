import type { TriggerPlacement } from './contract'

export interface TriggerSize {
  width: number
  height: number
}
export interface PositioningSpace {
  x: number
  y: number
  scaleX: number
  scaleY: number
}

/** CSS coordinates belong to the actual containing block, not the Teleport target. */
export function getPositioningSpace(popup: HTMLElement): PositioningSpace {
  const parent = popup.offsetParent as HTMLElement | null
  const view = popup.ownerDocument.defaultView
  if (!parent || (parent === popup.ownerDocument.body && view?.getComputedStyle(parent).position === 'static')) {
    const fixed = view?.getComputedStyle(popup).position === 'fixed'
    return { x: fixed ? 0 : -(view?.scrollX ?? 0), y: fixed ? 0 : -(view?.scrollY ?? 0), scaleX: 1, scaleY: 1 }
  }
  const rect = parent.getBoundingClientRect()
  const scaleX = parent.offsetWidth ? rect.width / parent.offsetWidth || 1 : 1
  const scaleY = parent.offsetHeight ? rect.height / parent.offsetHeight || 1 : 1
  return {
    x: rect.left + (parent.clientLeft - parent.scrollLeft) * scaleX,
    y: rect.top + (parent.clientTop - parent.scrollTop) * scaleY,
    scaleX,
    scaleY,
  }
}

export function getRelativeRect(rect: Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>, space: PositioningSpace) {
  const { x, y, scaleX, scaleY } = space
  return {
    scrollTop: (rect.top - y) / scaleY,
    scrollLeft: (rect.left - x) / scaleX,
    width: rect.width / scaleX,
    height: rect.height / scaleY,
  }
}

/** Screen-axis offsets remain screen-axis offsets even after a placement flips. */
export function getTriggerPosition(
  placement: TriggerPlacement,
  x: number,
  y: number,
  reference: TriggerSize,
  cover = false,
) {
  const horizontal = /^(left|right)/.test(placement)
  const negative = /^(left|top)/.test(placement)
  return {
    placement,
    skidding: horizontal ? y : x,
    distance:
      (horizontal ? x : y) * (negative ? -1 : 1) - (cover ? (horizontal ? reference.width : reference.height) : 0),
  }
}

export function getPlacementOffset(
  placement: TriggerPlacement,
  reference: { scrollLeft: number; scrollTop: number; width: number; height: number },
  popup: TriggerSize,
  distance = 0,
  translate: readonly number[] = [0, 0],
) {
  const [side, alignment] = placement.split('-')
  const horizontal = side === 'left' || side === 'right'
  let left = reference.scrollLeft + (reference.width - popup.width) / 2
  let top = reference.scrollTop + (reference.height - popup.height) / 2
  if (horizontal) {
    left =
      side === 'left'
        ? reference.scrollLeft - popup.width - distance
        : reference.scrollLeft + reference.width + distance
    if (alignment) {
      top = reference.scrollTop + (alignment === 'end' ? reference.height - popup.height : 0)
    }
  } else {
    top =
      side === 'top' ? reference.scrollTop - popup.height - distance : reference.scrollTop + reference.height + distance
    if (alignment) {
      left = reference.scrollLeft + (alignment === 'end' ? reference.width - popup.width : 0)
    }
  }
  return { left: left + translate[0], top: top + translate[1] }
}

export function getTransformOrigin(position: TriggerPlacement) {
  const x = /^(top|bottom)$/.test(position) ? '50%' : /^(left|top-end|bottom-end)/.test(position) ? '100%' : '0'
  const y = /^(left|right)$/.test(position) ? '50%' : /^(top|left-end|right-end)/.test(position) ? '100%' : '0'
  return `${x} ${y}`
}
