import { ref } from 'vue'
import { describe, expect, test } from 'vitest'
import { useImagePreviewGroupState } from '../composables/useImagePreviewGroup'

describe('useImagePreviewGroupState', () => {
  test('previewByImageId opens preview at the clicked image index', () => {
    const group = useImagePreviewGroupState({
      images: ref(undefined),
    })

    group.registerImageUrl(0, 'https://maplejs.org/cat.jpg', true)
    group.registerImageUrl(1, 'https://maplejs.org/cat2.jpg', true)

    expect(group.previewImages.value).toEqual(['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'])

    group.previewByImageId(1)

    expect(group.mergedVisible.value).toBe(true)
    expect(group.mergedCurrent.value).toBe(1)
  })

  test('keeps registration order instead of sorting by id', () => {
    const group = useImagePreviewGroupState({
      images: ref(undefined),
    })

    group.registerImageUrl(5, 'https://maplejs.org/cat2.jpg', true)
    group.registerImageUrl(2, 'https://maplejs.org/cat.jpg', true)

    expect(group.previewImages.value).toEqual(['https://maplejs.org/cat2.jpg', 'https://maplejs.org/cat.jpg'])
  })
})
