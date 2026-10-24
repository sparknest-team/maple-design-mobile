// @sync-with: cedar-ui/src/image/composables/useImagePreviewGroup.ts

import { computed, ref, watch, type Ref } from 'vue'

interface ImageUrlRecord {
  url: string
  canPreview: boolean
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

  const mergedOpen = computed({
    get() {
      return options.open?.value ?? localOpen.value
    },
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

  const mergedCurrent = computed({
    get() {
      return options.modelValue?.value !== undefined ? options.modelValue.value - 1 : localCurrent.value
    },
    set(value: number) {
      if (value === mergedCurrent.value) {
        return
      }
      if (options.modelValue?.value === undefined) {
        localCurrent.value = value
      }

      options.onCurrentChange?.(value + 1)
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
    previewByImageId,
    open,
    close,
    isDataMode,
  }
}
