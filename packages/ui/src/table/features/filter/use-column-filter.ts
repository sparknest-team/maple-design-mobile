import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import { isArray } from '../../../_utils/is'
import type { TableColumnData } from '../../types'
import type { TableContext } from '../../context'

export const useColumnFilter = ({
  column,
  tableCtx,
}: {
  column: Ref<TableColumnData>
  tableCtx: Partial<TableContext>
}) => {
  const filterValue = computed(() => {
    if (column.value.dataIndex && tableCtx.filters?.[column.value.dataIndex]) {
      return tableCtx.filters[column.value.dataIndex]
    }
    return []
  })

  const filterOpen = ref(false)
  const isFilterActive = computed(() => filterValue.value.length > 0)
  const isMultipleFilter = computed(() => Boolean(column.value.filterable?.multiple))
  const columnFilterValue = ref<string[]>(filterValue.value)

  watch(filterValue, (value) => {
    if (isArray(value) && String(value) !== String(columnFilterValue.value)) {
      columnFilterValue.value = value
    }
  })

  const handleFilterOpenChange = (value: boolean) => {
    filterOpen.value = value
  }

  const setFilterValue = (filterValue: string[]) => {
    columnFilterValue.value = filterValue
  }

  const handleCheckboxFilterChange = (values: string[]) => {
    setFilterValue(values)
  }

  const handleRadioFilterChange = (value: string) => {
    setFilterValue([value])
  }

  const handleFilterConfirm = (ev: Event) => {
    if (column.value.dataIndex) {
      tableCtx.onFilterChange?.(column.value.dataIndex, columnFilterValue.value, ev)
    }
    handleFilterOpenChange(false)
  }

  const handleFilterReset = (ev: Event) => {
    setFilterValue([])
    if (column.value.dataIndex) {
      tableCtx.onFilterChange?.(column.value.dataIndex, columnFilterValue.value, ev)
    }
    handleFilterOpenChange(false)
  }

  return {
    filterOpen,
    isFilterActive,
    isMultipleFilter,
    columnFilterValue,
    handleFilterOpenChange,
    setFilterValue,
    handleCheckboxFilterChange,
    handleRadioFilterChange,
    handleFilterConfirm,
    handleFilterReset,
  }
}
