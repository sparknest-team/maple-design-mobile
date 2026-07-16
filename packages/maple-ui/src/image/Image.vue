<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="classes(n(), n('$--box'), [!block, n('$--inline-block')])"
    :style="{
      width: toSizeUnit(width),
      height: toSizeUnit(height),
      borderRadius: toSizeUnit(radius),
    }"
  >
    <img
      v-if="lazy && !showErrorSlot"
      v-lazy="src ?? ''"
      role="img"
      :class="n('image')"
      :alt="alt"
      :title="title"
      :referrerpolicy="referrerpolicy"
      :lazy-loading="loading"
      :lazy-error="error"
      :style="{ objectFit: fit, objectPosition: position }"
      @load="handleLoad"
      @click="handleClick"
    />

    <img
      v-if="!lazy && !showErrorSlot"
      role="img"
      :class="n('image')"
      :alt="alt"
      :title="title"
      :referrerpolicy="referrerpolicy"
      :style="{ objectFit: fit, objectPosition: position }"
      :src="src"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />

    <slot v-if="showErrorSlot" name="error" />

    <mp-image-preview
      v-if="showStandalonePreview"
      v-model:visible="previewVisibleState"
      :images="[previewUrl]"
      v-bind="previewProps"
      @close="handlePreviewClose"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch, watchEffect } from 'vue'
import { call } from '@maplejs/maple-shared'
import Lazy, { type LazyHTMLElement } from '../lazy'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { PreviewGroupInjectionKey } from './context'
import MpImagePreview from './ImagePreview.vue'
import { props } from './props'

const { name, n, classes } = createNamespace('image')

let imageId = 0

export default defineComponent({
  name,
  components: {
    MpImagePreview,
  },
  directives: {
    Lazy,
    Ripple,
  },
  props,
  emits: ['update:previewVisible', 'preview-visible-change'],
  setup(props, { slots, emit }) {
    const showErrorSlot = ref(false)
    const groupContext = inject(PreviewGroupInjectionKey, undefined)
    const localPreviewVisible = ref(props.defaultPreviewVisible)
    const currentImageId = imageId++

    const previewVisibleState = computed({
      get() {
        return props.previewVisible ?? localPreviewVisible.value
      },
      set(value: boolean) {
        if (props.previewVisible !== undefined) {
          call(props['onUpdate:previewVisible'], value)
          emit('update:previewVisible', value)
        } else {
          localPreviewVisible.value = value
        }

        call(props.onPreviewVisibleChange, value)
        emit('preview-visible-change', value)
      },
    })

    const previewUrl = computed(() => props.previewSrc || props.src || '')

    const showStandalonePreview = computed(() => props.preview && !groupContext && !!previewUrl.value)

    watch(
      () => props.src,
      () => {
        showErrorSlot.value = false
      },
    )

    watchEffect((onInvalidate) => {
      if (!groupContext) {
        return
      }

      const unregister = groupContext.registerImageUrl(currentImageId, previewUrl.value, props.preview)

      onInvalidate(() => {
        unregister?.()
      })
    })

    function handleError(e: Event) {
      showErrorSlot.value = !!slots.error
      call(props.onError, e)
    }

    function handleLoad(e: Event) {
      const el: LazyHTMLElement = e.currentTarget as LazyHTMLElement

      if (props.lazy) {
        if (el._lazy.state === 'success') {
          call(props.onLoad, e)
          return
        }

        if (el._lazy.state === 'error') {
          handleError(e)
        }
      } else {
        call(props.onLoad, e)
      }
    }

    function handleClick(e: Event) {
      call(props.onClick, e)

      if (!props.preview || showErrorSlot.value) {
        return
      }

      if (groupContext?.preview) {
        groupContext.preview(currentImageId)
        return
      }

      previewVisibleState.value = true
    }

    function handlePreviewClose() {
      previewVisibleState.value = false
    }

    return {
      showErrorSlot,
      showStandalonePreview,
      previewVisibleState,
      previewUrl,
      previewProps: computed(() => props.previewProps),
      n,
      classes,
      toSizeUnit,
      handleLoad,
      handleError,
      handleClick,
      handlePreviewClose,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import './image';
</style>
