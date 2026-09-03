<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="
      classes(n(), n('$--box'), [!block, n('$--inline-block')], [showFooter, n(`--with-footer-${footerPosition}`)])
    "
    :style="{
      width: toSizeUnit(width),
      height: toSizeUnit(height),
      borderRadius: toSizeUnit(radius),
    }"
  >
    <div :class="n('content')">
      <img
        v-if="lazy"
        v-lazy="src ?? ''"
        role="img"
        :class="n('image')"
        :alt="alt || description"
        :title="title"
        :referrerpolicy="referrerPolicy"
        :lazy-loading="loadingSrc"
        :lazy-error="errorSrc"
        :style="{ objectFit: fit, objectPosition: position }"
        @load="handleLoad"
        @click="handleClick"
      />

      <img
        v-if="!lazy"
        role="img"
        :class="n('image')"
        :alt="alt || description"
        :title="title"
        :referrerpolicy="referrerPolicy"
        :style="{ objectFit: fit, objectPosition: position }"
        :src="src"
        @load="handleLoad"
        @error="handleError"
        @click="handleClick"
      />

      <div v-if="!isLoaded" :class="n('overlay')">
        <slot v-if="isError" name="error">
          <div :class="n('error')">
            <div :class="n('error-icon')">
              <slot name="error-icon">
                <span aria-hidden="true">×</span>
              </slot>
            </div>
            <div v-if="alt || description" :class="n('error-alt')">
              {{ alt || description }}
            </div>
          </div>
        </slot>
        <slot v-if="isLoading && (showLoader || $slots.loader)" name="loader">
          <div :class="n('loader')" aria-hidden="true" />
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

    <mp-image-preview
      v-if="showStandalonePreview"
      v-model:open="previewOpenState"
      :images="[previewUrl]"
      v-bind="previewProps"
      :popup-container="mergedPopupContainer"
      @close="handlePreviewClose"
    >
      <template v-if="$slots['preview-actions']" #actions>
        <slot name="preview-actions" />
      </template>
    </mp-image-preview>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch, watchEffect } from 'vue'
import Lazy, { type LazyHTMLElement } from '../lazy'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { PreviewGroupInjectionKey } from './context'
import ImageFooter from './ImageFooter.vue'
import MpImagePreview from './ImagePreview.vue'
import { props } from './props'

const { name, n, classes } = createNamespace('image')

let imageId = 0

export default defineComponent({
  name,
  components: {
    MpImagePreview,
    ImageFooter,
  },
  directives: {
    Lazy,
    Ripple,
  },
  props,
  emits: ['update:previewOpen', 'previewOpenChange', 'click', 'load', 'error'],
  setup(props, { emit, slots }) {
    const loadStatus = ref<'loading' | 'loaded' | 'error'>('loading')
    const isLoading = computed(() => loadStatus.value === 'loading')
    const isLoaded = computed(() => loadStatus.value === 'loaded')
    const isError = computed(() => loadStatus.value === 'error')
    const groupContext = inject(PreviewGroupInjectionKey, undefined)
    const localPreviewOpen = ref(props.defaultPreviewOpen)
    const currentImageId = imageId++

    const previewOpenState = computed({
      get() {
        return props.previewOpen ?? localPreviewOpen.value
      },
      set(value: boolean) {
        if (props.previewOpen === undefined) {
          localPreviewOpen.value = value
        }

        emit('update:previewOpen', value)
        emit('previewOpenChange', value)
      },
    })

    const previewUrl = computed(() => props.previewSrc || props.src || '')
    const mergedPopupContainer = computed(() => props.popupContainer ?? props.previewProps?.popupContainer ?? 'body')

    const showFooter = computed(() => {
      if (!(props.title || props.description || slots.extra)) {
        return false
      }
      if (props.hideFooter === 'never') {
        return true
      }
      return !props.hideFooter && isLoaded.value
    })

    const showStandalonePreview = computed(() => isLoaded.value && props.preview && !groupContext && !!previewUrl.value)

    watch(
      () => props.src,
      () => {
        loadStatus.value = 'loading'
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
      loadStatus.value = 'error'
      emit('error', e)
    }

    function handleLoad(e: Event) {
      const el: LazyHTMLElement = e.currentTarget as LazyHTMLElement

      if (props.lazy) {
        if (el._lazy.state === 'success') {
          loadStatus.value = 'loaded'
          emit('load', e)
          return
        }

        if (el._lazy.state === 'error') {
          handleError(e)
        }
      } else {
        loadStatus.value = 'loaded'
        emit('load', e)
      }
    }

    function handleClick(e: Event) {
      emit('click', e)

      if (!props.preview || isError.value) {
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

    return {
      isLoading,
      isLoaded,
      isError,
      showFooter,
      showStandalonePreview,
      previewOpenState,
      previewUrl,
      mergedPopupContainer,
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
