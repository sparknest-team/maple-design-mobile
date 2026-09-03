<template>
  <slot />
  <mp-image-preview
    v-if="previewImages.length"
    v-bind="previewProps"
    v-model:open="mergedOpen"
    :images="previewImages"
    :current="mergedCurrent"
    :loop="mergedLoop"
    :closable="mergedClosable"
    :mask-closable="mergedMaskClosable"
    :popup-container="mergedPopupContainer"
    :esc-to-close="mergedEscToClose"
    :lock-scroll="mergedLockScroll"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @change="onPreviewChange"
    @close="onPreviewClose"
    @closed="$emit('closed')"
    @key-escape="$emit('keyEscape')"
  >
    <template v-if="$slots.indicator" #indicator="slotProps">
      <slot name="indicator" v-bind="slotProps" />
    </template>
    <template v-if="$slots['close-icon']" #close-icon>
      <slot name="close-icon" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" :url="currentUrl" />
    </template>
  </mp-image-preview>
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
  emits: ['update:open', 'update:current', 'change', 'openChange', 'open', 'opened', 'close', 'closed', 'keyEscape'],
  setup(props, { emit }) {
    const groupState = useImagePreviewGroupState({
      images: toRef(props, 'images'),
      open: toRef(props, 'open'),
      defaultOpen: props.defaultOpen,
      current: toRef(props, 'current'),
      defaultCurrent: props.defaultCurrent,
      onOpenChange: (open) => {
        emit('update:open', open)
        emit('openChange', open)
        props.onOpenChange?.(open)
      },
      onCurrentChange: (index) => {
        emit('update:current', index)
        emit('change', index)
      },
    })

    const { mergedOpen, mergedCurrent, previewImages } = groupState
    const currentUrl = computed(() => previewImages.value[mergedCurrent.value])
    const mergedLoop = computed(() => props.loop ?? props.previewProps?.loop ?? imagePlatformConfig.defaultLoop)
    const mergedClosable = computed(
      () => props.closable ?? props.previewProps?.closable ?? imagePlatformConfig.defaultClosable,
    )
    const mergedMaskClosable = computed(
      () => props.maskClosable ?? props.previewProps?.maskClosable ?? imagePlatformConfig.defaultMaskClosable,
    )
    const mergedPopupContainer = computed(() => props.popupContainer ?? props.previewProps?.popupContainer)
    const mergedEscToClose = computed(() => props.escToClose ?? props.previewProps?.escToClose)
    const mergedLockScroll = computed(() => props.lockScroll ?? props.previewProps?.lockScroll)

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
      emit('close')
      mergedOpen.value = false
    }

    function to(index: number) {
      if (Number.isInteger(index) && index >= 0 && index < previewImages.value.length) {
        mergedCurrent.value = index
      }
    }

    function open(index = 0) {
      to(index)
      mergedOpen.value = true
    }

    function close() {
      mergedOpen.value = false
    }

    function prev() {
      const index = mergedCurrent.value - 1
      to(index >= 0 ? index : mergedLoop.value ? previewImages.value.length - 1 : index)
    }

    function next() {
      const index = mergedCurrent.value + 1
      to(index < previewImages.value.length ? index : mergedLoop.value ? 0 : index)
    }

    return {
      mergedOpen,
      mergedCurrent,
      previewImages,
      currentUrl,
      mergedLoop,
      mergedClosable,
      mergedMaskClosable,
      mergedPopupContainer,
      mergedEscToClose,
      mergedLockScroll,
      previewProps: toRef(props, 'previewProps'),
      onPreviewChange,
      onPreviewClose,
      open,
      close,
      prev,
      next,
      to,
    }
  },
})
</script>
