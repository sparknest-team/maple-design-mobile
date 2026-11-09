<template>
  <div
    ref="imageRoot"
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
    v-bind="rootAttrs()"
  >
    <div :class="n('content')">
      <img
        v-bind="mergedImgProps"
        :role="canPreview ? 'button' : mergedImgProps.role"
        :tabindex="canPreview ? (mergedImgProps.tabindex ?? 0) : mergedImgProps.tabindex"
        :aria-label="previewLabel"
        :class="n('image')"
        :src="displaySrc"
        :loading="lazy ? 'lazy' : undefined"
        :alt="resolvedAlt"
        :title="title"
        :style="[mergedImgProps.style, { objectFit, objectPosition }]"
        @keydown="handlePreviewKeydown"
        @keyup="handlePreviewKeyup"
        @blur="cancelPreviewKey"
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
    >
      <template v-if="$slots['preview-actions']" #actions>
        <slot name="preview-actions" />
      </template>
    </ImagePreview>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes, SlotsType } from 'vue'
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import type { ImageSlots } from './api'
import { PreviewGroupInjectionKey } from './context'
import ImageFooter from './ImageFooter.vue'
import ImagePreview from './ImagePreview.vue'
import { DefaultLoader, ImageErrorIcon, toSizeUnit, useImagePreviewLabel } from './platform'
import { imageProps } from './props'

const { name, n, classes } = createNamespace('image')

let imageId = 0

export default defineComponent({
  name,
  slots: Object as SlotsType<ImageSlots>,
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
    const rootAttrs = () => ({ class: attrs.class, style: attrs.style }) as Pick<HTMLAttributes, 'class' | 'style'>
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
    const resolvedAlt = computed(
      () => props.alt ?? props.imgProps?.alt ?? props.description ?? props.loadDescription ?? '',
    )
    const basePreviewLabel = useImagePreviewLabel()
    const canPreview = computed(
      () => previewEnabled.value && !!previewUrl.value && !isError.value && (groupContext?.canPreviewImage?.() ?? true),
    )
    const previewLabel = computed(() => {
      const explicit = mergedImgProps.value['aria-label']
      if (!canPreview.value || explicit != null || mergedImgProps.value['aria-labelledby']) {
        return explicit
      }
      return resolvedAlt.value ? `${basePreviewLabel.value}: ${resolvedAlt.value}` : basePreviewLabel.value
    })
    let spacePressed = false
    function cancelPreviewKey() {
      spacePressed = false
    }
    watch(canPreview, (enabled) => {
      if (!enabled) {
        cancelPreviewKey()
      }
    })
    function handlePreviewKeydown(event: KeyboardEvent) {
      if (
        !canPreview.value ||
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return
      }
      if (event.key === 'Enter' && !event.repeat) {
        event.preventDefault()
        ;(event.currentTarget as HTMLElement).click()
      } else if (event.key === ' ') {
        event.preventDefault()
        if (!event.repeat) {
          spacePressed = true
        }
      }
    }
    function handlePreviewKeyup(event: KeyboardEvent) {
      if (event.key !== ' ' || !spacePressed) {
        return
      }
      spacePressed = false
      if (event.defaultPrevented || event.isComposing) {
        return
      }
      event.preventDefault()
      if (
        canPreview.value &&
        event.currentTarget === (event.currentTarget as HTMLElement).ownerDocument.activeElement
      ) {
        ;(event.currentTarget as HTMLElement).click()
      }
    }
    const showStandalonePreview = computed(() => previewEnabled.value && !groupContext && !!previewUrl.value)

    watch(
      () => [props.src, props.fallbackSrc, props.lazy],
      () => {
        usingFallback.value = false
        loadStatus.value = 'loading'
      },
    )

    const imageRoot = ref<HTMLElement | null>(null)
    const element = () => imageRoot.value
    const unregister = groupContext?.registerImageUrl(currentImageId, previewUrl.value, previewEnabled.value, element)
    watch([previewUrl, previewEnabled], ([url, enabled]) => {
      groupContext?.registerImageUrl(currentImageId, url, enabled, element)
    })
    onMounted(() => groupContext?.refreshOrder?.())
    onUpdated(() => groupContext?.refreshOrder?.())
    onBeforeUnmount(() => unregister?.())

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
      imageRoot,
      canPreview,
      resolvedAlt,
      previewLabel,
      handlePreviewKeydown,
      handlePreviewKeyup,
      cancelPreviewKey,
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
      rootAttrs,
      handleLoad,
      handleError,
      handleClick,
      showPreview,
      click: showPreview,
    }
  },
})
</script>
