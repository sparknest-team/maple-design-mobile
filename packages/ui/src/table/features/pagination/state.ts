import { computed, ref } from 'vue'
import { TableProps } from '../../types'
import { isObject } from '../../../_utils/is'

export const usePagination = (props: TableProps, emit: any) => {
  const _page = ref(isObject(props.pagination) ? (props.pagination.defaultValue ?? 1) : 1)
  const _pageSize = ref(isObject(props.pagination) ? (props.pagination.defaultPageSize ?? 10) : 10)

  const pageSize = computed(() =>
    isObject(props.pagination) ? (props.pagination.pageSize ?? _pageSize.value) : _pageSize.value,
  )
  const page = computed(() => (isObject(props.pagination) ? (props.pagination.modelValue ?? _page.value) : _page.value))

  const handlePageChange = (page: number) => {
    _page.value = page
    emit('page-change', page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    _pageSize.value = pageSize
    emit('page-size-change', pageSize)
  }

  return {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  }
}
