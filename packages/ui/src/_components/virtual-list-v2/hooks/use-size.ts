import { computed, onMounted, Ref, ref, shallowReactive, watch } from 'vue'

export const useSize = ({
  dataKeys,
  contentRef,
  fixedSize,
  estimatedSize,
  buffer,
  viewportHeight,
  scrollOffset,
}: {
  dataKeys: Ref<(string | number)[]>
  contentRef: Ref<HTMLElement | undefined>
  fixedSize: Ref<boolean>
  estimatedSize: Ref<number | undefined>
  buffer: Ref<number>
  viewportHeight?: Ref<number>
  scrollOffset?: Ref<number>
}) => {
  const firstRangeAverageSize = ref(0)
  // Measurements must invalidate padding as well as imperative offsets.
  const sizeMap = shallowReactive(new Map<string | number, number>())
  const activeKeys = computed(() => new Set(dataKeys.value))
  watch(activeKeys, (keys) => {
    for (const key of sizeMap.keys()) {
      if (!keys.has(key)) {
        sizeMap.delete(key)
      }
    }
    if (sizeMap.size === 0) {
      firstRangeAverageSize.value = 0
    }
  })

  const total = computed(() => dataKeys.value.length)
  const start = ref(0)
  const safeBuffer = computed(() => (Number.isFinite(buffer.value) && buffer.value >= 0 ? Math.floor(buffer.value) : 0))
  const end = computed(() => {
    if (!viewportHeight || !scrollOffset) {
      return Math.min(total.value, start.value + safeBuffer.value * 3)
    }
    const viewHeight = Number.isFinite(viewportHeight.value) && viewportHeight.value > 0 ? viewportHeight.value : 1
    let offset = getOffset(0, start.value)
    const target = Math.max(offset, scrollOffset.value) + viewHeight
    let index = start.value
    while (index < total.value && offset < target) {
      offset += getItemSize(index)
      index++
    }
    return Math.min(total.value, index + safeBuffer.value)
  })
  const maxStart = computed(() => {
    if (!viewportHeight) {
      return Math.max(0, total.value - safeBuffer.value * 3)
    }
    let remaining = Number.isFinite(viewportHeight.value) && viewportHeight.value > 0 ? viewportHeight.value : 1
    let index = total.value
    while (index > 0 && remaining > 0) {
      index--
      remaining -= getItemSize(index)
    }
    return Math.max(0, index - safeBuffer.value)
  })

  const setStart = (index: number) => {
    index = Number.isFinite(index) ? Math.floor(index) : 0
    if (index < 0) {
      start.value = 0
    } else if (index > maxStart.value) {
      start.value = maxStart.value
    } else {
      start.value = index
    }
  }

  const isFixed = fixedSize
  const _estimatedSize = computed(() => {
    const estimate = estimatedSize.value
    if (typeof estimate !== 'number' || !Number.isFinite(estimate) || estimate <= 0) {
      return 30
    }
    if (estimate !== 30) {
      return estimate
    }
    return firstRangeAverageSize.value || estimatedSize.value || 30
  })

  const setItemSize = (key: string | number, size: number) => {
    if (activeKeys.value.has(key) && Number.isFinite(size) && size > 0) {
      sizeMap.set(key, size)
    }
  }

  const getItemSize = (index: number) => {
    if (isFixed.value) {
      return _estimatedSize.value
    }

    const _key = dataKeys.value[index]
    return sizeMap.get(_key) ?? _estimatedSize.value
  }

  const hasItemSize = (key: string | number) => {
    return sizeMap.has(key)
  }

  onMounted(() => {
    const firstRangeTotalSize = Array.from(sizeMap.values()).reduce((pre, value) => pre + value, 0)
    if (firstRangeTotalSize > 0) {
      firstRangeAverageSize.value = firstRangeTotalSize / sizeMap.size
    }
  })

  const getScrollOffset = (index: number) => {
    if (isFixed.value) {
      return _estimatedSize.value * index
    }
    return getOffset(0, index)
  }

  const getOffset = (start: number, end: number) => {
    if (isFixed.value) {
      return (end - start) * _estimatedSize.value
    }
    let offset = 0

    for (let i = start; i < end; i++) {
      offset += getItemSize(i)
    }

    return offset
  }

  const frontPadding = computed(() => {
    if (isFixed.value) {
      return _estimatedSize.value * start.value
    }
    return getOffset(0, start.value)
  })

  const getStartByScroll = (offset: number) => {
    const target = Number.isFinite(offset) ? Math.max(0, offset) : 0
    if (scrollOffset) {
      scrollOffset.value = target
    }
    let index = 0
    if (isFixed.value) {
      index = Math.floor(target / _estimatedSize.value)
    } else {
      let remaining = target
      while (index < total.value && remaining >= getItemSize(index)) {
        remaining -= getItemSize(index)
        index++
      }
    }
    return Math.min(maxStart.value, Math.max(0, index - safeBuffer.value))
  }

  const behindPadding = computed(() => {
    if (isFixed.value) {
      return _estimatedSize.value * (total.value - end.value)
    }
    return getOffset(end.value, total.value)
  })

  return {
    frontPadding,
    behindPadding,
    start,
    end,
    getStartByScroll,
    setItemSize,
    hasItemSize,
    setStart,
    getScrollOffset,
  }
}
