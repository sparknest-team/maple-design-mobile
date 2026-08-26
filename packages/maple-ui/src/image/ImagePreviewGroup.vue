<template>
  <slot />
  <mp-image-preview
    v-if="previewImages.length"
    v-model:open="mergedOpen"
    :images="previewImages"
    :current="mergedCurrent"
    :loop="mergedLoop"
    :closable="mergedClosable"
    :mask-closable="mergedMaskClosable"
    :popup-container="popupContainer"
    @change="onPreviewChange"
    @close="onPreviewClose"
  />
</template>

<script lang="ts">
import { computed, defineComponent, provide, toRef, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { useImagePreviewGroupState } from './composables/useImagePreviewGroup'
import { PreviewGroupInjectionKey } from './context'
import { imagePreviewGroupProps } from './groupProps'
import MpImagePreview from './ImagePreview.vue'
import { imagePlatformConfig } from './platform.config'

const { name } = createNamespace('image-preview-group')

export default defineComponent({
  name,
  components: {
    MpImagePreview,
  },
  inheritAttrs: false,
  props: imagePreviewGroupProps,
  emits: ['update:open', 'update:current', 'change', 'open-change'],
  setup(props, { emit }) {
    const groupState = useImagePreviewGroupState({
      images: toRef(props, 'images'),
      open: toRef(props, 'open'),
      defaultOpen: props.defaultOpen,
      current: toRef(props, 'current'),
      defaultCurrent: props.defaultCurrent,
      onOpenChange: (open) => {
        emit('update:open', open)
        emit('open-change', open)
      },
      onCurrentChange: (index) => {
        emit('update:current', index)
        emit('change', index)
      },
    })

    const { mergedOpen, mergedCurrent, previewImages } = groupState
    const mergedLoop = computed(() => props.loop ?? imagePlatformConfig.defaultLoop)
    const mergedClosable = computed(() => props.closable ?? imagePlatformConfig.defaultClosable)
    const mergedMaskClosable = computed(() => props.maskClosable ?? imagePlatformConfig.defaultMaskClosable)

    provide(PreviewGroupInjectionKey, {
      registerImageUrl: groupState.registerImageUrl,
      preview: (imageId: number) => {
        groupState.previewByImageId(imageId)
      },
    })

    watch(
      () => props.open,
      (open) => {
        if (open !== undefined) {
          mergedOpen.value = open
        }
      },
    )

    function onPreviewChange(index: number) {
      mergedCurrent.value = index
    }

    function onPreviewClose() {
      mergedOpen.value = false
    }

    return {
      mergedOpen,
      mergedCurrent,
      previewImages,
      mergedLoop,
      mergedClosable,
      mergedMaskClosable,
      popupContainer: toRef(props, 'popupContainer'),
      onPreviewChange,
      onPreviewClose,
    }
  },
})
</script>
