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

export function containingFrame(document: Document) {
  try {
    return document.defaultView?.frameElement ?? null
  } catch {
    return null
  }
}

export function parentShadowRoot(element: Element) {
  const parent = element.parentNode
  return parent?.nodeType === 11 && 'host' in parent ? (parent as ShadowRoot) : undefined
}

/** Follow rendered ancestry within the current viewport. */
export function layoutParent(element: Element): Element | null {
  return element.assignedSlot ?? element.parentElement ?? parentShadowRoot(element)?.host ?? null
}

function boxMetrics(element: Element) {
  const rect = element.getBoundingClientRect()
  const { offsetWidth, offsetHeight } = element as HTMLElement
  return {
    rect,
    scaleX: offsetWidth ? rect.width / offsetWidth || 1 : 1,
    scaleY: offsetHeight ? rect.height / offsetHeight || 1 : 1,
  }
}

const transformProperties = ['transform', 'translate', 'rotate', 'scale', 'perspective', 'filter', 'backdrop-filter']

function establishesFixedBlock(style?: CSSStyleDeclaration) {
  if (!style) {
    return false
  }
  return (
    transformProperties.some((property) => {
      const value = style.getPropertyValue(property)
      return value && value !== 'none'
    }) ||
    /\b(layout|paint|strict|content)\b/.test(style.contain) ||
    style.willChange
      .split(',')
      .some((value) => transformProperties.includes(value.trim()) || value.trim() === 'contain') ||
    style.getPropertyValue('content-visibility') === 'auto'
  )
}

/** CSS coordinates belong to the actual containing block, not the Teleport target. */
export function getPositioningSpace(popup: HTMLElement, strategy?: 'absolute' | 'fixed'): PositioningSpace {
  const view = popup.ownerDocument.defaultView
  const fixed = strategy === 'fixed' || (!strategy && view?.getComputedStyle(popup).position === 'fixed')
  let parent: Element | null = popup.offsetParent
  if (fixed) {
    parent = layoutParent(popup)
    while (parent && !establishesFixedBlock(view?.getComputedStyle(parent))) {
      parent = layoutParent(parent)
    }
  }
  if (
    !parent ||
    (!fixed && parent === popup.ownerDocument.body && view?.getComputedStyle(parent).position === 'static')
  ) {
    return { x: fixed ? 0 : -(view?.scrollX ?? 0), y: fixed ? 0 : -(view?.scrollY ?? 0), scaleX: 1, scaleY: 1 }
  }
  const { rect, scaleX, scaleY } = boxMetrics(parent)
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
      const frame = containingFrame(current)
      if (!frame) {
        break
      }
      const { rect: bounds, scaleX, scaleY } = boxMetrics(frame)
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
  const [side, align] = position.split('-')
  const vertical = side === 'top' || side === 'bottom'
  const end = (align === 'end') !== (vertical && direction === 'rtl')
  const cross = align ? (end ? '100%' : '0') : '50%'
  const edge = side === 'top' || side === 'left' ? '100%' : '0'
  return vertical ? `${cross} ${edge}` : `${edge} ${cross}`
}
