<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="
      classes(
        n(),
        [!block, n('--inline')],
        [isLoading, n('--loading')],
        [isError, n('--loading-error')],
        [showFooter && footerPosition === 'inner', n('--with-footer-inner')],
        [showFooter && footerPosition === 'outer', n('--with-footer-outer')],
      )
    "
    :style="{
      width: toSizeUnit(width),
      height: toSizeUnit(height),
      borderRadius: toSizeUnit(radius),
    }"
  >
    <div :class="n('content')">
      <img
        v-bind="mergedImgProps"
        role="img"
        :class="n('image')"
        :src="displaySrc"
        :loading="lazy ? 'lazy' : undefined"
        :alt="alt || description || loadDescription"
        :title="title"
        :style="[mergedImgProps.style, { objectFit, objectPosition }]"
        @load="handleLoad"
        @error="handleError"
        @click="handleClick"
      />

      <div v-if="!isLoaded" :class="n('overlay')">
        <slot v-if="isError" name="error">
          <div :class="n('error')">
            <div :class="n('error-icon')">
              <slot name="error-icon">
                <ImageErrorIcon />
              </slot>
            </div>
            <div v-if="alt || description" :class="n('error-alt')">
              {{ alt || description }}
            </div>
          </div>
        </slot>
        <slot v-if="isLoading && $slots.placeholder" name="placeholder" />
        <slot v-else-if="isLoading && (showLoader || $slots.loader)" name="loader">
          <DefaultLoader />
        </slot>
      </div>

      <ImageFooter
        v-if="showFooter && footerPosition === 'inner'"
        :class="footerClass"
        :title="title"
        :description="description"
      >
        <template v-if="$slots.extra" #extra><slot name="extra" /></template>
      </ImageFooter>
    </div>

    <ImageFooter
      v-if="showFooter && footerPosition === 'outer'"
      :class="footerClass"
      :title="title"
      :description="description"
    >
      <template v-if="$slots.extra" #extra><slot name="extra" /></template>
    </ImageFooter>

    <ImagePreview
      v-if="showStandalonePreview"
      v-model:open="previewOpenState"
      :src="previewUrl"
      v-bind="previewProps"
      :previewed-img-props="previewedImgProps"
      :popup-container="mergedPopupContainer"
      @close="handlePreviewClose"
    >
      <template v-if="$slots['preview-actions']" #actions>
        <slot name="preview-actions" />
      </template>
    </ImagePreview>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch, watchEffect } from 'vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { PreviewGroupInjectionKey } from './context'
import ImageFooter from './ImageFooter.vue'
import ImagePreview from './ImagePreview.vue'
import { DefaultLoader, ImageErrorIcon, toSizeUnit } from './platform'
import { imageProps } from './props'

const { name, n, classes } = createNamespace('image')

let imageId = 0

export default defineComponent({
  name,
  components: {
    ImagePreview,
    ImageFooter,
    ImageErrorIcon,
    DefaultLoader,
  },
  directives: {
    Ripple,
  },
  inheritAttrs: false,
  props: imageProps,
  emits: ['update:open', 'open-change', 'click', 'load', 'error'],
  setup(props, { attrs, emit, slots }) {
    const loadStatus = ref<'loading' | 'loaded' | 'error'>('loading')
    const isLoading = computed(() => loadStatus.value === 'loading')
    const isLoaded = computed(() => loadStatus.value === 'loaded')
    const isError = computed(() => loadStatus.value === 'error')
    const usingFallback = ref(false)
    const displaySrc = computed(() => (usingFallback.value ? props.fallbackSrc : props.src))
    const groupContext = inject(PreviewGroupInjectionKey, undefined)
    const localPreviewOpen = ref(props.defaultOpen)
    const currentImageId = imageId++

    const previewOpenState = computed({
      get() {
        return props.open ?? localPreviewOpen.value
      },
      set(value: boolean) {
        if (props.open === undefined) {
          localPreviewOpen.value = value
        }
        emit('update:open', value)
        emit('open-change', value)
      },
    })

    const previewUrl = computed(() => props.previewSrc || props.src || '')
    const mergedPopupContainer = computed(() => props.popupContainer ?? props.previewProps?.popupContainer)
    const mergedImgProps = computed(() => {
      const { class: _className, style: _style, ...restAttrs } = attrs
      return { ...restAttrs, ...props.imgProps }
    })

    const showFooter = computed(() => {
      if (!(props.title || props.description || slots.extra)) {
        return false
      }
      if (props.hideFooter === 'never') {
        return true
      }
      return !props.hideFooter && isLoaded.value
    })

    const previewEnabled = computed(() => !props.previewDisabled)
    const showStandalonePreview = computed(() => previewEnabled.value && !groupContext && !!previewUrl.value)

    watch(
      () => [props.src, props.fallbackSrc, props.lazy],
      () => {
        usingFallback.value = false
        loadStatus.value = 'loading'
      },
    )

    watchEffect((onInvalidate) => {
      if (!groupContext) {
        return
      }
      const unregister = groupContext.registerImageUrl(currentImageId, previewUrl.value, previewEnabled.value)
      onInvalidate(() => {
        unregister?.()
      })
    })

    function handleError(e: Event) {
      if (!usingFallback.value && props.fallbackSrc && props.fallbackSrc !== props.src) {
        usingFallback.value = true
        loadStatus.value = 'loading'
        emit('error', e)
        return
      }
      loadStatus.value = 'error'
      emit('error', e)
    }

    function handleLoad(e: Event) {
      loadStatus.value = 'loaded'
      emit('load', e)
    }

    function handleClick(e: Event) {
      emit('click', e)
      if (!previewEnabled.value || isError.value) {
        return
      }
      if (groupContext?.preview) {
        groupContext.preview(currentImageId)
        return
      }
      previewOpenState.value = true
    }

    function handlePreviewClose() {
      previewOpenState.value = false
    }

    function showPreview() {
      if (!previewEnabled.value || isError.value) {
        return
      }
      if (groupContext?.preview) {
        groupContext.preview(currentImageId)
      } else {
        previewOpenState.value = true
      }
    }

    return {
      n,
      classes,
      toSizeUnit,
      isLoading,
      isLoaded,
      isError,
      displaySrc,
      showFooter,
      showStandalonePreview,
      mergePreview: showStandalonePreview,
      previewOpenState,
      previewUrl,
      mergedPopupContainer,
      mergedImgProps,
      handleLoad,
      handleError,
      handleClick,
      handlePreviewClose,
      showPreview,
      click: showPreview,
    }
  },
})
</script>
