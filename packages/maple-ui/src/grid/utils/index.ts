import type { GridItemData } from '../types'

export function resolveItemData(cols: number, props: GridItemData): GridItemData {
  if (!(props.span > 0)) {
    return { span: 0, offset: 0, suffix: !!props.suffix }
  }
  const offset = Math.min(Math.max(0, Math.floor(props.offset || 0)), cols)
  const span = Math.min(Math.max(0, Math.floor(props.span || 0)) + offset, cols)
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
  const suffix = itemDataList.flatMap((item, i) => (item.suffix ? [i] : []))
  const displayIndexList: number[] = []
  const fits = (indices: number[]) => {
    let row = 1,
      used = 0
    for (const i of indices) {
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
    return row <= Math.max(1, collapsedRows)
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
