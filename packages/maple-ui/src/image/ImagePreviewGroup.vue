<template>
  <slot />
  <mp-image-preview
    v-if="previewImages.length"
    v-model:visible="mergedVisible"
    :images="previewImages"
    :current="mergedCurrent"
    :loop="mergedLoop"
    :closable="mergedClosable"
    :mask-closable="mergedMaskClosable"
    :teleport="teleport"
    @change="onPreviewChange"
    @close="onPreviewClose"
  />
</template>

<script lang="ts">
import { computed, defineComponent, provide, toRef, watch } from 'vue'
import { call } from '@maplejs/maple-shared'
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
  emits: ['update:visible', 'update:current', 'change', 'preview-visible-change'],
  setup(props, { emit }) {
    const groupState = useImagePreviewGroupState({
      images: toRef(props, 'images'),
      visible: toRef(props, 'visible'),
      defaultVisible: props.defaultVisible,
      current: toRef(props, 'current'),
      defaultCurrent: props.defaultCurrent,
      onVisibleChange: (visible) => {
        call(props['onUpdate:visible'], visible)
        call(props.onPreviewVisibleChange, visible)
        emit('update:visible', visible)
        emit('preview-visible-change', visible)
      },
      onCurrentChange: (index) => {
        call(props['onUpdate:current'], index)
        call(props.onChange, index)
        emit('update:current', index)
        emit('change', index)
      },
    })

    const { mergedVisible, mergedCurrent, previewImages } = groupState
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
      () => props.visible,
      (visible) => {
        if (visible !== undefined) {
          mergedVisible.value = visible
        }
      },
    )

    function onPreviewChange(index: number) {
      mergedCurrent.value = index
    }

    function onPreviewClose() {
      mergedVisible.value = false
    }

    return {
      mergedVisible,
      mergedCurrent,
      previewImages,
      mergedLoop,
      mergedClosable,
      mergedMaskClosable,
      teleport: toRef(props, 'teleport'),
      onPreviewChange,
      onPreviewClose,
    }
  },
})
</script>
