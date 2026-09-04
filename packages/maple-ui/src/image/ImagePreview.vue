<template>
  <mp-overlay
    v-model:open="mergedOpen"
    mp-image-preview-cover
    :class="n('popup')"
    :overlay-closable="overlayClosable"
    :esc-to-close="escToClose"
    :lock-scroll="lockScroll"
    :popup-container="popupContainer"
    :unmount-on-close="false"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @key-escape="$emit('keyEscape')"
  >
    <div
      :class="n('stage')"
      data-image-preview-stage
      mp-image-preview-cover
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      @click="onOverlayClick"
      @dblclick="onDoubleClick"
    >
      <div :class="n('backdrop')" data-image-preview-backdrop />
      <slot name="image" v-bind="{ src, scale, rotate, translateX, translateY, moving, previewedImgProps }">
        <div :class="n('image-frame')">
          <img
            v-bind="previewedImgProps"
            role="img"
            data-image-preview-image
            :src="src"
            :alt="previewedImgProps?.alt || src"
            :class="[
              previewedImgProps?.class,
              n('image'),
              { [n('image-moving')]: moving, [n('--prevent')]: imagePreventDefault },
            ]"
            :style="[
              previewedImgProps?.style,
              { transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})` },
            ]"
            :draggable="false"
            @click.stop
            @dragstart.prevent
            @contextmenu="imagePreventDefault && $event.preventDefault()"
          />
        </div>
      </slot>
    </div>

    <div
      v-if="showToolbar && mergedActions.length"
      :class="n('toolbar')"
      data-image-preview-toolbar
      mp-image-preview-cover
    >
      <button
        v-for="action in mergedActions"
        :key="action"
        type="button"
        :class="n('toolbar-action')"
        @click="runAction(action)"
      >
        {{ actionLabels[action] }}
      </button>
      <slot name="actions" />
    </div>

    <mp-icon
      v-if="closable"
      :class="n('close-icon')"
      data-image-preview-interactive
      mp-image-preview-cover
      @click="close"
    >
      <slot name="close-icon"><MIconCloseCircleFill /></slot>
    </mp-icon>
    <div v-if="$slots.overlay" :class="n('overlay')" data-image-preview-overlay><slot name="overlay" /></div>
    <div v-if="$slots.extra" :class="n('extra')"><slot name="extra" /></div>
  </mp-overlay>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { IconCloseCircleFill as MIconCloseCircleFill } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import MpOverlay from '../overlay'
import { createNamespace } from '../utils/components'
import type { ImagePreviewActionName } from './api'
import { usePreviewController } from './composables/usePreviewController'
import { imagePreviewProps } from './previewProps'

const { name, n } = createNamespace('image-preview')

export default defineComponent({
  name,
  components: { MIconCloseCircleFill, MpIcon, MpOverlay },
  inheritAttrs: false,
  props: imagePreviewProps,
  emits: ['update:open', 'openChange', 'open', 'opened', 'close', 'closed', 'keyEscape', 'longPress', 'prev', 'next'],
  setup(props, { emit }) {
    const refs = toRefs(props)
    const controller = usePreviewController({
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
        emit('openChange', open)
        props.onOpenChange?.(open)
      },
      onLongPress: () => emit('longPress'),
      onPrev: () => emit('prev'),
      onNext: () => emit('next'),
    })

    const desktopActions: ImagePreviewActionName[] = [
      'fullScreen',
      'rotateLeft',
      'rotateRight',
      'originalSize',
      'zoomOut',
      'zoomIn',
      'download',
    ]
    const mergedActions = computed(() => props.actionsLayout ?? (controller.isDesktop.value ? desktopActions : []))
    const actionLabels: Record<ImagePreviewActionName, string> = {
      prev: '‹',
      next: '›',
      fullScreen: '⛶',
      rotateLeft: '↶',
      rotateRight: '↷',
      originalSize: '1:1',
      zoomOut: '−',
      zoomIn: '+',
      download: '↓',
      close: '×',
    }

    function download() {
      if (!props.src) {
        return
      }
      const anchor = document.createElement('a')
      anchor.href = props.src
      anchor.download = ''
      anchor.click()
    }
    const toggleFullscreen = () =>
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    function runAction(action: ImagePreviewActionName) {
      const actions: Record<ImagePreviewActionName, () => void> = {
        prev: () => emit('prev'),
        next: () => emit('next'),
        fullScreen: toggleFullscreen,
        rotateLeft: controller.rotateLeft,
        rotateRight: controller.rotateRight,
        originalSize: controller.reset,
        zoomOut: controller.zoomOut,
        zoomIn: controller.zoomIn,
        download,
        close: controller.close,
      }
      actions[action]()
    }

    return { ...controller, n, mergedActions, actionLabels, runAction, toggleFullscreen }
  },
})
</script>
