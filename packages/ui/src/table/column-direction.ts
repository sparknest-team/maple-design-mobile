import type { ReadingDirection } from '../_utils/direction'

/** Stable visual partitions: public fixed sides are physical, normal columns retain reading order. */
export function orderPhysicalColumns<T>(items: T[], fixed: (item: T) => 'left' | 'right' | undefined, dir: ReadingDirection = 'ltr'): T[] {
  if (dir !== 'rtl') return items
  return [...items.filter(item => fixed(item) === 'right'), ...items.filter(item => !fixed(item)), ...items.filter(item => fixed(item) === 'left')]
}
