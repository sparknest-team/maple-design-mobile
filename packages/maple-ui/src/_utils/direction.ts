import type { PropType } from 'vue'
import { resolveDirection, type ReadingDirection } from '@maple-design/use'

export { useDirection, resolveDirection } from '@maple-design/use'
export type { ReadingDirection } from '@maple-design/use'

/** Distance from the physical left edge, including negative native RTL scrollLeft. */
export function physicalScrollLeft(element: HTMLElement): number {
  const max = Math.max(0, element.scrollWidth - element.clientWidth)
  const value = resolveDirection(element) === 'rtl' ? max + element.scrollLeft : element.scrollLeft
  return Math.max(0, Math.min(max, value))
}

/** Convert a physical scrollbar-thumb coordinate back to the native CSSOM coordinate. */
export function nativeScrollLeft(element: HTMLElement, physical: number): number {
  const max = Math.max(0, element.scrollWidth - element.clientWidth)
  const value = Math.max(0, Math.min(max, physical))
  return resolveDirection(element) === 'rtl' ? value - max : value
}

/** Reading direction for typed portal options; omitted values inherit their source scope. */
export const readingDirectionProp = { type: String as PropType<ReadingDirection> }

/** Nonnegative distance from the reading start; native RTL CSSOM values are negative. */
export function inlineScrollLeft(element: HTMLElement): number {
  const max = Math.max(0, element.scrollWidth - element.clientWidth)
  return Math.max(0, Math.min(max, resolveDirection(element) === 'rtl' ? -element.scrollLeft : element.scrollLeft))
}
export function setInlineScrollLeft(element: HTMLElement, offset: number): void {
  const max = Math.max(0, element.scrollWidth - element.clientWidth)
  const value = Math.max(0, Math.min(max, offset))
  element.scrollLeft = resolveDirection(element) === 'rtl' ? -value : value
}
