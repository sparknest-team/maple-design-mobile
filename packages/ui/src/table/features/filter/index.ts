import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Filters } from '../../types'
import { leafColumns } from '../columns'
import { useFilter } from './state'
import type { FilterStateColumn } from './state'

export interface TableFilterColumn extends FilterStateColumn {
  children?: TableFilterColumn[]
}

export interface TableFiltersOptions {
  columns: Readonly<Ref<TableFilterColumn[]>>
  onChange?: (field: string, requested: string[], effective: Filters) => void
}

/** Headless state only. No filter algorithm or desktop panel is imported. */
export function useTableFilters(options: TableFiltersOptions) {
  const columns = computed(() => leafColumns(options.columns.value))
  const setFilter = (field: string, requested: string[]) => {
    state._filters.value = { ...state.computedFilters.value, [field]: requested }
    options.onChange?.(field, requested, state.computedFilters.value)
  }
  const state = useFilter({ columns, onFilterChange: setFilter })
  return {
    filters: state.computedFilters,
    setFilter,
    resetFilters: state.resetFilters,
    clearFilters: state.clearFilters,
  }
}

export type { Filters as TableFilters } from '../../types'
