import { useParent } from '@maplejs/maple-use'
import { ROW_BIND_COL_KEY, type RowProvider } from './row-provide'

export type { ColSizeDescriptor } from './col-props'

export function useParentRow() {
  const { index, bindParent, parentProvider } = useParent<RowProvider, null>(ROW_BIND_COL_KEY)

  return {
    index,
    row: parentProvider,
    bindCol: bindParent,
  }
}
