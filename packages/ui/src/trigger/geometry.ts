import type { ReadingDirection } from '../_utils/direction'
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
export function getPositioningSpace(popup: HTMLElement, strategy?: 'absolute' | 'fixed'): PositioningSpace {
  const view = popup.ownerDocument.defaultView
  const fixed = strategy === 'fixed' || (!strategy && view?.getComputedStyle(popup).position === 'fixed')
  let parent = popup.offsetParent as HTMLElement | null
  if (fixed) {
    parent = popup.parentElement
    while (parent) {
      const style = view?.getComputedStyle(parent)
      const willChange = style?.willChange ?? ''
      if (
        (style?.transform && style.transform !== 'none') ||
        (style?.perspective && style.perspective !== 'none') ||
        (style?.filter && style.filter !== 'none') ||
        (style?.backdropFilter && style.backdropFilter !== 'none') ||
        /\b(layout|paint|strict|content)\b/.test(style?.contain ?? '') ||
        /\b(transform|perspective|filter|contain)\b/.test(willChange) ||
        style?.getPropertyValue('content-visibility') === 'auto'
      ) {
        break
      }
      parent = parent.parentElement
    }
  }
  if (
    !parent ||
    (!fixed && parent === popup.ownerDocument.body && view?.getComputedStyle(parent).position === 'static')
  ) {
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

/** Convert same-origin frame viewport coordinates into the popup document. */
export function translateRectBetweenDocuments(
  rect: Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>,
  source: Document,
  target: Document,
) {
  if (source === target) {
    return rect
  }
  function ancestors(document: Document) {
    const result = new Map<Document, PositioningSpace>()
    let current: Document | undefined = document
    let space: PositioningSpace = { x: 0, y: 0, scaleX: 1, scaleY: 1 }
    while (current) {
      result.set(current, space)
      let frame: HTMLElement | null = null
      try {
        frame = current.defaultView?.frameElement as HTMLElement | null
      } catch {
        break
      }
      if (!frame) {
        break
      }
      const bounds = frame.getBoundingClientRect()
      const scaleX = frame.offsetWidth ? bounds.width / frame.offsetWidth || 1 : 1
      const scaleY = frame.offsetHeight ? bounds.height / frame.offsetHeight || 1 : 1
      space = {
        x: bounds.left + (frame.clientLeft + space.x) * scaleX,
        y: bounds.top + (frame.clientTop + space.y) * scaleY,
        scaleX: space.scaleX * scaleX,
        scaleY: space.scaleY * scaleY,
      }
      current = frame.ownerDocument
    }
    return result
  }
  const from = ancestors(source)
  const to = ancestors(target)
  for (const [document, a] of from) {
    const b = to.get(document)
    if (b) {
      return {
        left: (a.x + rect.left * a.scaleX - b.x) / b.scaleX,
        top: (a.y + rect.top * a.scaleY - b.y) / b.scaleY,
        width: (rect.width * a.scaleX) / b.scaleX,
        height: (rect.height * a.scaleY) / b.scaleY,
      }
    }
  }
  return undefined
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
  direction: ReadingDirection = 'ltr',
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
      left =
        reference.scrollLeft + ((alignment === 'end') !== (direction === 'rtl') ? reference.width - popup.width : 0)
    }
  }
  return { left: left + translate[0], top: top + translate[1] }
}

export function getTransformOrigin(position: TriggerPlacement, direction: ReadingDirection = 'ltr') {
  if (direction === 'rtl' && /^(top|bottom)-(start|end)$/.test(position)) {
    position = position.replace(/(start|end)$/, (align) => (align === 'start' ? 'end' : 'start')) as TriggerPlacement
  }
  const x = /^(top|bottom)$/.test(position) ? '50%' : /^(left|top-end|bottom-end)/.test(position) ? '100%' : '0'
  const y = /^(left|right)$/.test(position) ? '50%' : /^(top|left-end|right-end)/.test(position) ? '100%' : '0'
  return `${x} ${y}`
}
