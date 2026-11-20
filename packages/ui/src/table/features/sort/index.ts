import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Sorter, TableColumnData } from '../../types'
import { leafColumns } from '../columns'
import { useSorter } from './state'

export type TableSortDirection = NonNullable<Sorter>['direction'] | ''
export interface TableSortingOptions {
  columns: Readonly<Ref<TableColumnData[]>>
  onChange?: (field: string, direction: TableSortDirection, effective: Sorter | undefined) => void
}

/** Headless state only; client sorting is a separate explicit entry. */
export function useTableSorting(options: TableSortingOptions) {
  const columns = computed(() => leafColumns(options.columns.value))
  const setSorter = (field: string, direction: TableSortDirection) => {
    state._sorter.value = direction ? { field, direction } : undefined
    options.onChange?.(field, direction, state.computedSorter.value)
  }
  const state = useSorter({ columns, onSorterChange: setSorter })
  return { sorter: state.computedSorter, setSorter, resetSorters: state.resetSorters, clearSorters: state.clearSorters }
}

export type { Sorter as TableSorter } from '../../types'
