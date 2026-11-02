import { resolveDirection } from './direction'

const blocked = (element: HTMLElement) => element.matches(':disabled, [aria-disabled="true"]')
/** Move focus within the displayed grid; selection remains owned by Enter/Space. */
export function navigateTemporalGrid(event: KeyboardEvent, selector: string, columns: number, horizontal = true) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing || event.keyCode === 229) {
    return
  }
  const root = event.currentTarget as HTMLElement | null
  const target = event.target as HTMLElement | null
  const cell = target?.closest<HTMLElement>(selector)
  if (
    !root ||
    !cell ||
    !root.contains(cell) ||
    (target !== cell && target?.matches('input,textarea,select,[contenteditable]'))
  ) {
    return
  }
  const cells = Array.from(root.querySelectorAll<HTMLElement>(selector))
  const from = cells.indexOf(cell)
  if (from < 0) {
    return
  }
  const width = Math.max(1, columns)
  let to = from,
    step = 0,
    min = 0,
    max = cells.length - 1
  if (event.key === 'ArrowDown') {
    step = width
  } else if (event.key === 'ArrowUp') {
    step = -width
  } else if (horizontal && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    step = (event.key === 'ArrowRight') !== (resolveDirection(cell) === 'rtl') ? 1 : -1
  } else if (event.key === 'Home' || event.key === 'End') {
    min = horizontal ? Math.floor(from / width) * width : 0
    max = horizontal ? Math.min(cells.length - 1, min + width - 1) : cells.length - 1
    to = event.key === 'Home' ? min : max
    step = event.key === 'Home' ? 1 : -1
  } else {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  if (event.key !== 'Home' && event.key !== 'End') {
    to += step
  }
  while (to >= min && to <= max) {
    if (!blocked(cells[to])) {
      cells[to].focus()
      return
    }
    to += step
  }
}
/** Cross time columns in visible direction without changing their values. */
export function navigateTemporalColumns(event: KeyboardEvent, columnSelector: string, itemSelector?: string) {
  if (
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.isComposing ||
    event.keyCode === 229 ||
    !['ArrowLeft', 'ArrowRight'].includes(event.key)
  ) {
    return
  }
  const root = event.currentTarget as HTMLElement | null
  const cell = (event.target as HTMLElement | null)?.closest<HTMLElement>(columnSelector)
  if (!root || !cell) {
    return
  }
  const columns = Array.from(root.querySelectorAll<HTMLElement>(columnSelector)).filter((element) => !blocked(element))
  const from = columns.indexOf(cell)
  if (from < 0) {
    return
  }
  const step = (event.key === 'ArrowRight') !== (resolveDirection(cell) === 'rtl') ? 1 : -1
  const next = columns[from + step]
  if (!next) {
    return
  }
  const items = itemSelector
    ? Array.from(next.querySelectorAll<HTMLElement>(itemSelector)).filter((element) => !blocked(element))
    : []
  const target = itemSelector
    ? (items.find((element) => element.getAttribute('aria-selected') === 'true') ?? items[0])
    : next
  if (target) {
    event.preventDefault()
    event.stopPropagation()
    target.focus()
  }
}
