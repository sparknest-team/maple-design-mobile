import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import { isString } from '../../../_utils/is'
import { isEqual } from '../../../_utils/is-equal'
import type { Sorter, TableColumnData } from '../../types'

export const useSorter = ({
  columns,
  onSorterChange,
}: {
  columns: Ref<TableColumnData[]>
  onSorterChange: (dataIndex: string, direction: 'ascend' | 'descend' | '') => void
}) => {
  const _sorter = ref<Sorter | undefined>(getDefaultSorter(columns.value))

  // Rebuilding visual columns (RTL or resize) must not reset uncontrolled state.
  // Only a change to the declared defaults starts a new default-state transaction.
  watch(
    () => getDefaultSorter(columns.value),
    (next, previous) => {
      if (!isEqual(next, previous)) {
        _sorter.value = next
      }
    },
  )

  const computedSorter = computed<Sorter | undefined>(() => {
    for (const item of columns.value) {
      if (item.dataIndex && item.sortable) {
        // Take the first existing collation
        const direction = isString(item.sortable.sortOrder)
          ? item.sortable.sortOrder
          : _sorter.value?.field === item.dataIndex
            ? _sorter.value.direction
            : ''
        if (direction) {
          return {
            field: item.dataIndex,
            direction,
          }
        }
      }
    }
    return undefined
  })

  const resetSorters = () => {
    let sorter: Sorter | undefined
    for (const item of columns.value) {
      if (item.dataIndex && item.sortable) {
        if (!sorter && item.sortable.defaultSortOrder) {
          sorter = {
            field: item.dataIndex,
            direction: item.sortable.defaultSortOrder,
          }
        }
        onSorterChange(item.dataIndex, item.sortable.defaultSortOrder ?? '')
      }
    }
    _sorter.value = sorter
  }

  const clearSorters = () => {
    for (const item of columns.value) {
      if (item.dataIndex && item.sortable) {
        onSorterChange(item.dataIndex, '')
      }
    }
  }

  return {
    _sorter,
    computedSorter,
    resetSorters,
    clearSorters,
  }
}

const getDefaultSorter = (columns: TableColumnData[]): Sorter | undefined => {
  for (const item of columns) {
    // get first enabled sorter
    if (item.dataIndex && item.sortable?.defaultSortOrder) {
      return {
        field: item.dataIndex,
        direction: item.sortable.defaultSortOrder,
      }
    }
  }
  return undefined
}
