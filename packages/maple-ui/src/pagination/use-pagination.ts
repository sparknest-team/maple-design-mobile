import { computed, ref, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'
import type { paginationProps } from './props'
import type { PageListItem } from './types'
import { getLegalPage, positiveInteger } from './utils'

type Emit = {
  (event: 'update:modelValue', value: number): void
  (event: 'change', value: number): void
  (event: 'update:pageSize', value: number): void
  (event: 'page-size-change', value: number): void
}

export function usePagination(props: Readonly<ExtractPropTypes<typeof paginationProps>>, emit: Emit) {
  const innerCurrent = ref(positiveInteger(props.defaultValue, 1))
  const innerPageSize = ref(positiveInteger(props.defaultPageSize, 10))
  const current = computed(() => positiveInteger(props.modelValue ?? innerCurrent.value, 1))
  const pageSize = computed(() => positiveInteger(props.pageSize ?? innerPageSize.value, 10))
  const total = computed(() =>
    Number.isFinite(props.total) ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.trunc(props.total))) : 0,
  )
  const pages = computed(() => Math.ceil(total.value / pageSize.value))
  const buffer = computed(() =>
    Number.isFinite(props.bufferSize) ? Math.min(100, Math.max(0, Math.trunc(props.bufferSize))) : 2,
  )
  const notifyCurrent = (page: number) => {
    if (page === current.value) {
      return
    }
    innerCurrent.value = page
    emit('update:modelValue', page)
    emit('change', page)
  }
  const changeCurrent = (page: number) => {
    if (props.disabled || !Number.isFinite(page)) {
      return
    }
    notifyCurrent(getLegalPage(page, { min: 1, max: pages.value }))
  }
  const changePageSize = (value: number) => {
    if (props.disabled || !Number.isFinite(value) || value <= 0) {
      return
    }
    const next = positiveInteger(value, 10)
    if (next === pageSize.value) {
      return
    }
    innerPageSize.value = next
    emit('update:pageSize', next)
    emit('page-size-change', next)
  }
  // One watcher resolves page size + total updates together, avoiding duplicate
  // current events in controlled mode when both boundaries change in one tick.
  watch(
    [pageSize, total, () => props.modelValue],
    ([nextSize, nextTotal, nextCurrent], [oldSize, oldTotal, oldCurrent]) => {
      if ((nextSize === oldSize && nextTotal === oldTotal) || nextCurrent !== oldCurrent) {
        return
      }
      if (!props.autoAdjust) {
        return
      }
      const next = nextSize === oldSize ? current.value : Math.ceil(((current.value - 1) * oldSize + 1) / nextSize)
      notifyCurrent(getLegalPage(next, { min: 1, max: pages.value }))
    },
  )
  const pageList = computed(() => {
    const list: PageListItem[] = []
    const b = buffer.value
    if (pages.value < Math.min(201, positiveInteger(props.baseSize, 6)) + b * 2) {
      for (let page = 1; page <= pages.value; page++) {
        list.push({ type: 'page', key: page, pageNumber: page })
      }
      return list
    }
    const active = getLegalPage(current.value, { min: 1, max: pages.value })
    const hasLeft = active > 2 + b
    const hasRight = active < pages.value - b - 1
    const left = hasLeft ? Math.min(active - b, pages.value - b * 2) : 1
    const right = hasRight ? Math.max(active + b, b * 2 + 1) : pages.value
    if (hasLeft) {
      list.push({ type: 'page', key: 1, pageNumber: 1 }, { type: 'more', key: 'left', step: -(b * 2 + 1) })
    }
    for (let page = left; page <= right; page++) {
      list.push({ type: 'page', key: page, pageNumber: page })
    }
    if (hasRight) {
      list.push(
        { type: 'more', key: 'right', step: b * 2 + 1 },
        { type: 'page', key: pages.value, pageNumber: pages.value },
      )
    }
    return list
  })
  return { current, pageSize, total, pages, buffer, pageList, changeCurrent, changePageSize }
}
