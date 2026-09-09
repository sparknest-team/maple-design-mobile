<template>
  <mp-popup
    v-if="!unmountOnClose || computedOpen || mounted"
    :class="n('popup')"
    mp-dialog-cover
    :open="computedOpen"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :overlay-transition="overlayAnimationName"
    :lock-scroll="lockScroll"
    :overlay-closable="false"
    :esc-to-close="false"
    :popup-container="popupContainer"
    :transition="dialogAnimationName"
    :z-index="zIndex"
    role="presentation"
    :aria-modal="undefined"
    @open="emit('open')"
    @close="emit('close')"
    @closed="handleClosed"
    @opened="handleOpened"
    @key-escape="handleKeyEscape"
    @route-change="close"
    @click-overlay="handleClickOverlay"
  >
    <div
      ref="dialogRef"
      data-modal-focus-root
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      :aria-label="ariaLabel || (!$slots.title ? title : undefined)"
      :class="dialogClasses"
      :style="mergedDialogStyle"
      v-bind="$attrs"
    >
      <div
        v-if="!hideTitle && ($slots.title || title || closable)"
        :class="classes(n('title'), n(`title--${titleAlign}`))"
        @pointerdown="handlePointerDown"
      >
        <div v-if="$slots.title || title" :class="n('title-content')">
          <mp-icon v-if="type" :class="n('title-icon')" :size="20">
            <MIconInfoCircleFill v-if="type === 'info'" />
            <MIconCheckboxMarkedCircleFill v-else-if="type === 'success'" />
            <MIconWarning v-else-if="type === 'warning'" />
            <MIconError v-else />
          </mp-icon>
          <slot name="title">{{ title }}</slot>
        </div>
        <button
          v-if="closable"
          type="button"
          :aria-label="closeButtonAriaLabel"
          :class="n('close-button')"
          @click="handleClose"
        >
          <MIconClose />
        </button>
      </div>

      <div :class="[n('message'), bodyClass]" :style="mergedBodyStyle">
        <slot>{{ message }}</slot>
      </div>

      <slot v-if="showFooter" name="footer" :cancel="handleCancel" :confirm="handleConfirm" :close="handleClose">
        <div :class="n('actions')">
          <mp-button
            v-if="cancelButton"
            v-bind="cancelButtonNormalizedProps"
            :class="classes(n('button'), n('cancel-button'), [cancelButtonProps != null, n('--with-button-props')])"
            mp-dialog-cover
            @click="handleCancel"
          >
            {{ cancelButtonText ?? (pt ? pt : t)('dialogCancelButtonText') }}
          </mp-button>
          <mp-button
            v-if="confirmButton"
            v-bind="confirmButtonNormalizedProps"
            :class="classes(n('button'), n('confirm-button'), [confirmButtonProps != null, n('--with-button-props')])"
            mp-dialog-cover
            @click="handleConfirm"
          >
            {{ confirmButtonText ?? (pt ? pt : t)('dialogConfirmButtonText') }}
          </mp-button>
        </div>
      </slot>
    </div>
  </mp-popup>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, useSlots, watch, type CSSProperties } from 'vue'
import {
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconClose as MIconClose,
  IconError as MIconError,
  IconInfoCircleFill as MIconInfoCircleFill,
  IconWarning as MIconWarning,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import MpButton from '../button'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { dialogProps } from './props'
import type { DialogAction, DialogBeforeCloseRefs } from './types'

defineOptions({ name: createNamespace('dialog').name, inheritAttrs: false })

const { n, classes } = createNamespace('dialog')
const props = defineProps(dialogProps)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'confirm' | 'cancel', value?: Event): void
  (event: 'click-overlay', value?: Event): void
  (event: 'key-escape', value?: KeyboardEvent): void
}>()
const slots = useSlots()
const { t: pt } = injectLocaleProvider()

const internalOpen = ref(props.defaultOpen)
const computedOpen = computed(() => props.open ?? internalOpen.value)
const mounted = ref(computedOpen.value)
const dialogRef = ref<HTMLElement>()
const dragX = ref(0)
const dragY = ref(0)
const confirmButtonLoading = ref(false)
const cancelButtonLoading = ref(false)
const confirmButtonDisabled = ref(false)
const cancelButtonDisabled = ref(false)
let removeDragListeners: (() => void) | undefined

const beforeCloseRefs: DialogBeforeCloseRefs = {
  confirmButtonLoading,
  cancelButtonLoading,
  confirmButtonDisabled,
  cancelButtonDisabled,
}
const showFooter = computed(() => props.footer && (props.confirmButton || props.cancelButton || Boolean(slots.footer)))
const dialogClasses = computed(() =>
  classes(
    n('$--box'),
    n(),
    props.dialogClass as any,
    [props.type, n(`--type-${props.type}`)],
    [props.simple, n('--simple')],
    [props.alignCenter, n('--align-center')],
    [props.draggable && !props.fullscreen, n('--draggable')],
    [props.fullscreen, n('--fullscreen')],
  ),
)
const mergedBodyStyle = computed(() => ({ textAlign: props.messageAlign, ...normalizeStyle(props.bodyStyle) }))
const mergedDialogStyle = computed<CSSProperties>(() => ({
  width: props.fullscreen ? undefined : toSizeUnit(props.width),
  top: !props.alignCenter && !props.fullscreen ? toSizeUnit(props.top) : undefined,
  transform: dragX.value || dragY.value ? `translate(${dragX.value}px, ${dragY.value}px)` : undefined,
  ...props.dialogStyle,
}))
const confirmButtonNormalizedProps = computed(() => ({
  variant: 'text' as const,
  ...props.confirmButtonProps,
  loading: props.confirmButtonLoading || confirmButtonLoading.value || props.confirmButtonProps?.loading,
  disabled: props.confirmButtonDisabled || confirmButtonDisabled.value || props.confirmButtonProps?.disabled,
}))
const cancelButtonNormalizedProps = computed(() => ({
  variant: 'text' as const,
  ...props.cancelButtonProps,
  loading: props.cancelButtonLoading || cancelButtonLoading.value || props.cancelButtonProps?.loading,
  disabled: props.cancelButtonDisabled || cancelButtonDisabled.value || props.cancelButtonProps?.disabled,
}))

watch(
  computedOpen,
  (open) => {
    internalOpen.value = open
    if (open) {
      mounted.value = true
    }
  },
  { immediate: true },
)

function normalizeStyle(style: unknown): CSSProperties {
  return style && !Array.isArray(style) && typeof style === 'object' ? (style as CSSProperties) : {}
}

function resetTransientState() {
  confirmButtonLoading.value = false
  cancelButtonLoading.value = false
  confirmButtonDisabled.value = false
  cancelButtonDisabled.value = false
}

function commitClose(action: DialogAction, event?: Event) {
  resetTransientState()
  internalOpen.value = false
  if (action === 'confirm') {
    emit('confirm', event)
  }
  if (action === 'cancel') {
    emit('cancel', event)
  }
  emit('update:open', false)
}

function requestClose(action: DialogAction, event?: Event) {
  if (!props.beforeClose) {
    commitClose(action, event)
    return
  }
  let completed = false
  call(
    props.beforeClose,
    action,
    () => {
      if (!completed) {
        completed = true
        commitClose(action, event)
      }
    },
    beforeCloseRefs,
  )
}

function close() {
  commitClose('close')
}
function handleClose(event?: Event) {
  requestClose('close', event)
}
function handleConfirm(event?: Event) {
  requestClose('confirm', event)
}
function handleCancel(event?: Event) {
  requestClose('cancel', event)
}
function handleClickOverlay(event?: Event) {
  emit('click-overlay', event)
  if (props.overlayClosable) {
    handleClose(event)
  }
}
function handleKeyEscape(event?: KeyboardEvent) {
  emit('key-escape', event)
  if (props.escToClose) {
    handleClose(event)
  }
}
function handleOpened() {
  if (!computedOpen.value) {
    return
  }
  emit('opened')
}
function handleClosed() {
  if (computedOpen.value) {
    return
  }
  if (props.unmountOnClose) {
    mounted.value = false
  }
  dragX.value = 0
  dragY.value = 0
  emit('closed')
}
function handlePointerDown(event: PointerEvent) {
  if (!props.draggable || props.fullscreen || event.button !== 0) {
    return
  }
  const startX = event.clientX - dragX.value
  const startY = event.clientY - dragY.value
  const move = (next: PointerEvent) => {
    dragX.value = next.clientX - startX
    dragY.value = next.clientY - startY
  }
  const stop = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', stop)
    removeDragListeners = undefined
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', stop)
  removeDragListeners = stop
}

onBeforeUnmount(() => {
  removeDragListeners?.()
})
defineExpose({ close, confirm: handleConfirm, cancel: handleCancel })
</script>
