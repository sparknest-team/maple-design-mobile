import { reactive } from 'vue'
import { expect, test } from 'vitest'
import { paginationProps } from '../props'
import { usePagination } from '../use-pagination'

test('caps unsafe totals and bounds page-window work', () => {
  const props = reactive({
    total: 1e20,
    defaultValue: 1e20,
    defaultPageSize: 1,
    bufferSize: 1e20,
    baseSize: 1e20,
    autoAdjust: true,
  })
  const state = usePagination(props as any, (() => {}) as any)
  expect(state.current.value).toBe(Number.MAX_SAFE_INTEGER)
  expect(state.pages.value).toBe(Number.MAX_SAFE_INTEGER)
  expect(state.pageList.value.length).toBeLessThanOrEqual(403)
  expect(state.pageList.value.every((item) => item.type !== 'page' || Number.isSafeInteger(item.pageNumber))).toBe(true)
  expect(paginationProps.total.validator(1e20)).toBe(false)
  expect(paginationProps.defaultValue.validator(1e20)).toBe(false)
})
