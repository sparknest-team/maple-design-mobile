import type { GridItemData } from '../types'
import { normalizeGridScalar, resolveGridCols, resolveGridRows } from '../validation'

export function resolveItemData(cols: number, props: GridItemData): GridItemData {
  cols = resolveGridCols(cols)
  const rawSpan = normalizeGridScalar(props.span, 1)
  if (!(rawSpan > 0)) {
    return { span: 0, offset: 0, suffix: !!props.suffix }
  }
  const offset = Math.min(Math.max(0, Math.floor(normalizeGridScalar(props.offset, 0))), cols)
  const span = Math.min(Math.max(0, Math.floor(rawSpan)) + offset, cols)
  return { span, offset: Math.min(offset, Math.max(0, span - 1)), suffix: !!props.suffix }
}
export function setItemVisible({
  cols,
  collapsed,
  collapsedRows,
  itemDataList,
}: {
  cols: number
  collapsed: boolean
  collapsedRows: number
  itemDataList: GridItemData[]
}) {
  if (!collapsed) {
    return { overflow: false, displayIndexList: itemDataList.map((_, i) => i) }
  }
  cols = resolveGridCols(cols)
  collapsedRows = resolveGridRows(collapsedRows)
  const suffix = itemDataList.flatMap((item, i) => (item.suffix ? [i] : []))
  const displayIndexList: number[] = []
  const fits = (indices: number[]) => {
    const selected = new Set(indices)
    let row = 1,
      used = 0
    // CSS auto-placement follows actual DOM order, including positioned suffixes.
    for (let i = 0; i < itemDataList.length; i++) {
      if (!selected.has(i)) {
        continue
      }
      const span = itemDataList[i].span
      if (!span) {
        continue
      }
      if (used + span > cols) {
        row++
        used = 0
      }
      used = itemDataList[i].suffix ? cols : used + span
    }
    return row <= collapsedRows
  }
  for (let i = 0; i < itemDataList.length; i++) {
    if (itemDataList[i].suffix) {
      continue
    }
    if (!fits([...displayIndexList, i, ...suffix])) {
      break
    }
    displayIndexList.push(i)
  }
  displayIndexList.push(...suffix)
  return {
    overflow: itemDataList.some((item, i) => item.span > 0 && !item.suffix && !displayIndexList.includes(i)),
    displayIndexList,
  }
}
