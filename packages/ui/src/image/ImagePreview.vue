<template>
  <Overlay
    ref="overlayRef"
    v-model:open="mergedOpen"
    :class="n()"
    :style="wrapperStyles"
    :overlay-closable="overlayClosable"
    :esc-to-close="escToClose"
    :lock-scroll="lockScroll"
    :popup-container="popupContainer"
    :unmount-on-close="false"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @key-escape="$emit('key-escape')"
  >
    <div
      ref="refWrapper"
      :class="n('stage')"
      data-image-preview-stage
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      @click="onOverlayClick"
      @dblclick="onDoubleClick"
    >
      <div :class="n('backdrop')" data-image-preview-backdrop />
      <div
        :class="n('image-container')"
        data-image-preview-container
        @load.capture="handlePreviewSettled"
        @error.capture="handlePreviewSettled"
      >
        <slot name="image" v-bind="{ src, scale, rotate, translateX, translateY, moving, previewedImgProps }">
          <div :class="n('image-frame')">
            <img
              v-bind="previewedImgProps"
              data-image-preview-image
              :src="src"
              :alt="previewedImgProps?.alt ?? src"
              :draggable="false"
              :class="[
                previewedImgProps?.class,
                n('image'),
                { [n('image-moving')]: moving, [n('--prevent')]: imagePreventDefault },
              ]"
              :style="[
                previewedImgProps?.style,
                { transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})` },
              ]"
              @click.stop
              @load="isPreviewLoading = false"
              @error="isPreviewLoading = false"
              @dragstart.prevent
              @contextmenu="imagePreventDefault && $event.preventDefault()"
            />
          </div>
        </slot>
      </div>
      <div v-if="isPreviewLoading" :class="n('loading')">
        <ImageLoadingIcon />
      </div>
      <PreviewToolbar v-if="showToolbar && mergedActions.length" :actions="actions" :actions-layout="mergedActions">
        <slot name="actions" />
      </PreviewToolbar>
      <button
        v-if="closable"
        type="button"
        :aria-label="labels.close"
        :class="n('close-btn')"
        data-image-preview-close
        data-image-preview-interactive
        @click="close"
      >
        <slot name="close-icon"><PreviewCloseIcon /></slot>
      </button>
      <slot name="overlay" />
      <slot name="extra" />
    </div>
  </Overlay>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, toRefs, watch, type CSSProperties, type SlotsType } from 'vue'
import { useDirection } from '../_utils/direction'
import Overlay from '../overlay'
import { createNamespace } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import type { ImagePreviewActionName, ImagePreviewSlots } from './api'
import { usePreviewController } from './composables/usePreviewController'
import PreviewToolbar, { type ActionType } from './ImagePreviewToolbar.vue'
import {
  IconDownload,
  IconFullscreen,
  IconNext,
  IconOriginalSize,
  IconPrev,
  IconRotateLeft,
  IconRotateRight,
  IconZoomIn,
  IconZoomOut,
  ImageLoadingIcon,
  PreviewCloseIcon,
  useActionLabels,
} from './platform'
import { imagePreviewProps } from './previewProps'

const { name, n } = createNamespace('image-preview')

export default defineComponent({
  name,
  slots: Object as SlotsType<ImagePreviewSlots>,
  components: { Overlay, PreviewToolbar, ImageLoadingIcon, PreviewCloseIcon },
  inheritAttrs: false,
  props: imagePreviewProps,
  emits: [
    'update:open',
    'open-change',
    'open',
    'opened',
    'close',
    'closed',
    'key-escape',
    'long-press',
    'prev',
    'next',
  ],
  setup(props, { emit }) {
    const refs = toRefs(props)
    const refWrapper = ref<HTMLElement>()
    const overlayRef = ref<{ _isTopLayer: (event?: Event) => boolean }>()
    let focusBeforeOpen: HTMLElement | null = null
    const { isRtl } = useDirection(() => refWrapper.value)
    const controller = usePreviewController({
      canHandleKeyboard: (event) => overlayRef.value?._isTopLayer(event) ?? false,
      isRtl,
      open: refs.open,
      defaultOpen: props.defaultOpen,
      src: refs.src,
      interaction: refs.interaction,
      defaultScale: refs.defaultScale,
      minScale: refs.minScale,
      maxScale: refs.maxScale,
      scaleStep: refs.scaleStep,
      wheelZoom: refs.wheelZoom,
      keyboard: refs.keyboard,
      draggable: refs.draggable,
      keepDragOffset: refs.keepDragOffset,
      overlayClosable: refs.overlayClosable,
      onOpenChange: (open) => {
        emit('update:open', open)
        emit('open-change', open)
      },
      onLongPress: () => emit('long-press'),
      onPrev: () => emit('prev'),
      onNext: () => emit('next'),
    })
    watch(
      controller.mergedOpen,
      (open, previous) => {
        const owner = refWrapper.value?.ownerDocument ?? (typeof document !== 'undefined' ? document : undefined)
        if (open) {
          focusBeforeOpen =
            owner?.activeElement && 'focus' in owner.activeElement ? (owner.activeElement as HTMLElement) : null
        } else if (previous && owner) {
          const target = focusBeforeOpen
          const active = owner.activeElement
          if (target?.isConnected && (active === owner.body || refWrapper.value?.contains(active))) {
            nextTick(() => {
              if (
                !controller.mergedOpen.value &&
                target.isConnected &&
                (owner.activeElement === active || owner.activeElement === owner.body)
              ) {
                target.focus({ preventScroll: true })
              }
            })
          }
          focusBeforeOpen = null
        }
      },
      { flush: 'sync', immediate: true },
    )

    const isPreviewLoading = ref(Boolean(props.src))
    function handlePreviewSettled(event: Event) {
      const image = event.target as HTMLImageElement
      if (image.getAttribute('src') === props.src) {
        isPreviewLoading.value = false
      }
    }
    const popupTarget = usePopupContainer(() => props.popupContainer)
    const wrapperStyles = computed<CSSProperties>(() => ({
      position:
        props.popupContainer === false
          ? 'absolute'
          : popupTarget.value === 'body' || (typeof document !== 'undefined' && popupTarget.value === document.body)
            ? 'fixed'
            : 'absolute',
    }))
    const labels = useActionLabels()
    const desktopActions: ImagePreviewActionName[] = [
      'fullScreen',
      'rotateRight',
      'rotateLeft',
      'zoomIn',
      'zoomOut',
      'originalSize',
      'download',
    ]
    const mergedActions = computed(() => props.actionsLayout ?? (controller.isDesktop.value ? desktopActions : []))
    const toggleFullscreen = () => {
      const element = refWrapper.value
      const owner = element?.ownerDocument
      if (!element || !owner) {
        return undefined
      }
      return owner.fullscreenElement ? owner.exitFullscreen?.() : element.requestFullscreen?.()
    }
    const download = () => {
      if (!props.src) {
        return
      }
      const anchor = document.createElement('a')
      anchor.href = props.src
      anchor.download = ''
      anchor.click()
    }
    const actions = computed<ActionType[]>(() => [
      { key: 'prev', name: labels.value.prev, content: IconPrev, onClick: () => emit('prev') },
      { key: 'next', name: labels.value.next, content: IconNext, onClick: () => emit('next') },
      { key: 'fullScreen', name: labels.value.fullScreen, content: IconFullscreen, onClick: toggleFullscreen },
      { key: 'rotateLeft', name: labels.value.rotateLeft, content: IconRotateLeft, onClick: controller.rotateLeft },
      { key: 'rotateRight', name: labels.value.rotateRight, content: IconRotateRight, onClick: controller.rotateRight },
      { key: 'originalSize', name: labels.value.originalSize, content: IconOriginalSize, onClick: controller.reset },
      { key: 'zoomOut', name: labels.value.zoomOut, content: IconZoomOut, onClick: controller.zoomOut },
      { key: 'zoomIn', name: labels.value.zoomIn, content: IconZoomIn, onClick: controller.zoomIn },
      { key: 'download', name: labels.value.download, content: IconDownload, onClick: download },
      { key: 'close', name: labels.value.close, content: PreviewCloseIcon, onClick: controller.close },
    ])

    watch(
      () => props.src,
      () => {
        isPreviewLoading.value = Boolean(props.src)
        // A group keeps its slides mounted; cached images do not emit load again.
        const images = refWrapper.value?.querySelectorAll<HTMLImageElement>('[data-image-preview-image]')
        if (images && Array.from(images).some((image) => image.getAttribute('src') === props.src && image.complete)) {
          isPreviewLoading.value = false
        }
      },
      { flush: 'post' },
    )

    return {
      ...controller,
      n,
      refWrapper,
      overlayRef,
      wrapperStyles,
      isPreviewLoading,
      handlePreviewSettled,
      mergedActions,
      labels,
      actions,
      toggleFullscreen,
    }
  },
})
</script>
