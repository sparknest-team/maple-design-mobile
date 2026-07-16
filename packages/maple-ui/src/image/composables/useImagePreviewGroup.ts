// @sync-with: cedar-ui/src/image/composables/useImagePreviewGroup.ts

import { computed, ref, watch, type Ref } from 'vue'
import type { ImageUrlRecord } from '../types'

export interface UseImagePreviewGroupOptions {
  images?: Ref<string[] | undefined>
  visible?: Ref<boolean | undefined>
  defaultVisible?: boolean
  current?: Ref<number | undefined>
  defaultCurrent?: number
  onVisibleChange?: (visible: boolean) => void
  onCurrentChange?: (index: number) => void
}

export function useImagePreviewGroupState(options: UseImagePreviewGroupOptions) {
  const imageUrlMap = ref(new Map<number, ImageUrlRecord>())
  const localVisible = ref(options.defaultVisible ?? false)
  const localCurrent = ref(options.defaultCurrent ?? 0)

  const propImages = computed(() => options.images?.value ?? [])
  const isDataMode = computed(() => propImages.value.length > 0)

  const previewImages = computed(() => {
    if (isDataMode.value) {
      return propImages.value
    }

    return Array.from(imageUrlMap.value.entries())
      .filter(([, record]) => record.canPreview)
      .map(([, record]) => record.url)
  })

  const mergedVisible = computed({
    get() {
      return options.visible?.value ?? localVisible.value
    },
    set(value: boolean) {
      if (options.visible?.value !== undefined) {
        options.visible.value = value
      } else {
        localVisible.value = value
      }

      options.onVisibleChange?.(value)
    },
  })

  const mergedCurrent = computed({
    get() {
      return options.current?.value ?? localCurrent.value
    },
    set(value: number) {
      if (options.current?.value !== undefined) {
        options.current.value = value
      } else {
        localCurrent.value = value
      }

      options.onCurrentChange?.(value)
    },
  })

  watch(propImages, (images) => {
    if (images.length > 0) {
      imageUrlMap.value = new Map(images.map((url, index) => [index, { url, canPreview: true }]))
    }
  })

  function registerImageUrl(id: number, url: string, canPreview: boolean) {
    if (isDataMode.value) {
      return () => undefined
    }

    imageUrlMap.value.set(id, { url, canPreview })

    return () => {
      imageUrlMap.value.delete(id)
    }
  }

  function previewByImageId(imageId: number) {
    const record = imageUrlMap.value.get(imageId)

    if (!record?.canPreview) {
      return
    }

    const previewableEntries = Array.from(imageUrlMap.value.entries()).filter(([, item]) => item.canPreview)
    const index = previewableEntries.findIndex(([id]) => id === imageId)

    if (index >= 0) {
      mergedCurrent.value = index
      mergedVisible.value = true
    }
  }

  function open(index = 0) {
    mergedCurrent.value = index
    mergedVisible.value = true
  }

  function close() {
    mergedVisible.value = false
  }

  return {
    previewImages,
    mergedVisible,
    mergedCurrent,
    registerImageUrl,
    previewByImageId,
    open,
    close,
    isDataMode,
  }
}
