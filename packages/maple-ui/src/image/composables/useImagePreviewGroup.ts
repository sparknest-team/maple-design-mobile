// @sync-with: cedar-ui/src/image/composables/useImagePreviewGroup.ts
import { computed, ref, watch, type Ref } from 'vue'

interface ImageUrlRecord {
  url: string
  canPreview: boolean
  element?: () => HTMLElement | null | undefined
}

export interface UseImagePreviewGroupOptions {
  images?: Ref<string[] | undefined>
  open?: Ref<boolean | undefined>
  defaultOpen?: boolean
  modelValue?: Ref<number | undefined>
  defaultValue?: number
  onOpenChange?: (open: boolean) => void
  onCurrentChange?: (imageNumber: number) => void
}

export function useImagePreviewGroupState(options: UseImagePreviewGroupOptions) {
  const imageUrlMap = ref(new Map<number, ImageUrlRecord>())
  const localOpen = ref(options.defaultOpen ?? false)
  const localCurrent = ref((options.defaultValue ?? 1) - 1)
  const orderVersion = ref(0)
  let lastOrder: number[] = []
  const isDataMode = computed(() => options.images?.value !== undefined)

  function orderedEntries() {
    return Array.from(imageUrlMap.value.entries())
      .filter(([, record]) => record.canPreview)
      .sort((a, b) => {
        const first = a[1].element?.(),
          second = b[1].element?.()
        if (!first || !second || first === second || first.ownerDocument !== second.ownerDocument) {
          return 0
        }
        const position = first.compareDocumentPosition(second)
        if (position & 1) {
          return 0
        }
        return position & 4 ? -1 : position & 2 ? 1 : 0
      })
  }
  function refreshOrder() {
    const order = orderedEntries().map(([id]) => id)
    if (order.length !== lastOrder.length || order.some((id, index) => id !== lastOrder[index])) {
      lastOrder = order
      orderVersion.value++
    }
  }
  const registeredEntries = computed(() => {
    void orderVersion.value
    return orderedEntries()
  })
  const previewImages = computed(() =>
    isDataMode.value ? [...(options.images?.value ?? [])] : registeredEntries.value.map(([, record]) => record.url),
  )

  const mergedOpen = computed({
    get: () => options.open?.value ?? localOpen.value,
    set(value: boolean) {
      if (value === mergedOpen.value) {
        return
      }
      if (options.open?.value === undefined) {
        localOpen.value = value
      }
      options.onOpenChange?.(value)
    },
  })
  const rawCurrent = () => (options.modelValue?.value !== undefined ? options.modelValue.value - 1 : localCurrent.value)
  const clamp = (value: number, length: number) =>
    Math.min(Math.max(Number.isFinite(value) ? Math.trunc(value) : 0, 0), Math.max(0, length - 1))
  const mergedCurrent = computed({
    get: () => clamp(rawCurrent(), previewImages.value.length),
    set(value: number) {
      const next = clamp(value, previewImages.value.length)
      if (next === mergedCurrent.value) {
        return
      }
      if (options.modelValue?.value === undefined) {
        localCurrent.value = next
      }
      options.onCurrentChange?.(next + 1)
    },
  })

  watch([previewImages, registeredEntries, isDataMode], ([images, entries, dataMode], previous) => {
    const [oldImages, oldEntries, oldDataMode] = previous
    if (
      dataMode &&
      oldDataMode &&
      images.length === oldImages.length &&
      images.every((url, index) => url === oldImages[index])
    ) {
      return
    }
    const raw = rawCurrent()
    let next = clamp(raw, images.length)
    if (!dataMode && !oldDataMode && oldImages.length && images.length) {
      const selected = oldEntries[clamp(raw, oldEntries.length)]?.[0]
      const retained = entries.findIndex(([id]) => id === selected)
      if (retained >= 0) {
        next = retained
      }
    }
    if (options.modelValue?.value === undefined) {
      localCurrent.value = next
    } else if (images.length && next !== raw) {
      options.onCurrentChange?.(next + 1)
    }
  })

  function registerImageUrl(
    id: number,
    url: string,
    canPreview: boolean,
    element?: () => HTMLElement | null | undefined,
  ) {
    imageUrlMap.value.set(id, { url, canPreview, element })
    refreshOrder()
    return () => {
      imageUrlMap.value.delete(id)
      refreshOrder()
    }
  }
  function previewByImageId(imageId: number) {
    if (isDataMode.value) {
      return
    }
    const index = registeredEntries.value.findIndex(([id]) => id === imageId)
    if (index >= 0) {
      mergedCurrent.value = index
      mergedOpen.value = true
    }
  }
  function open(imageNumber = 1) {
    const index = imageNumber - 1
    if (!Number.isInteger(index) || index < 0 || index >= previewImages.value.length) {
      return
    }
    mergedCurrent.value = index
    mergedOpen.value = true
  }
  function close() {
    mergedOpen.value = false
  }
  return {
    previewImages,
    mergedOpen,
    mergedCurrent,
    registerImageUrl,
    refreshOrder,
    previewByImageId,
    open,
    close,
    isDataMode,
  }
}
